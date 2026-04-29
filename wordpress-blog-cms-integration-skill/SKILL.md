---
name: wordpress-blog-cms-integration
description: Reusable Next.js App Router skill for connecting existing blog listing/detail UIs to Headless WordPress (self-hosted or WordPress.com) with normalized data, server/API routes, hydration-safe stale cache fallback, HTML rendering, image host handling, and deployment troubleshooting.
---

# Headless WordPress Blog CMS Integration Skill

Use this skill to connect any existing Next.js blog UI to WordPress without redesigning cards, spacing, typography, or layout.

## Prompt to use this skill in your project

```text
Use the reusable skill at wordpress-blog-cms-integration-skill/SKILL.md and connect my existing Next.js blog listing + detail pages to WordPress Headless CMS.

Rules:
- Do not redesign UI.
- Do not change layout, spacing, cards, or typography.
- Replace only the blog data source.
- Support both self-hosted WP and WordPress.com API URL formats.
- Use WORDPRESS_API_URL from .env.local / Vercel env only.
- Add stale-while-refresh cache behavior for list/detail.
- Keep hydration-safe behavior (localStorage only in useEffect).
- Render WordPress HTML content as real HTML.
- Add next/image host support for WordPress domains.
- Normalize direct WordPress upload image URLs and use `unoptimized` for external WP images when needed.
- Keep internal WordPress content links opening in the same tab.
- Provide changed files, env vars, and test checklist.
```

## Goal

Keep frontend UI exactly the same, and swap static/local blog data with WordPress API data for:

- Blog listing
- Blog detail by slug
- Featured image
- Publish date
- Excerpt
- Full HTML content
- Categories (dynamic if UI supports filtering)

## API URL Support (Auto-Compatible)

Support both:

1. Self-hosted:
`https://example.com/wp-json/wp/v2/posts`

2. WordPress.com:
`https://public-api.wordpress.com/wp/v2/sites/example.wordpress.com/posts`

The helper must auto-resolve endpoint variants from `WORDPRESS_API_URL`.

## Required Files/Patterns

```text
lib/wordpress.ts
app/api/blog-posts/route.ts
app/api/blog-posts/[slug]/route.ts
components/news/blog-feed.tsx              (or equivalent list wrapper)
components/news-detail/blog-post-feed.tsx  (or equivalent detail wrapper)
```

## 1) Reusable WordPress Helper (`lib/wordpress.ts`)

Create reusable functions:

- `getAllPosts()`
- `getPostBySlug(slug)`
- `normalizePost(raw)`
- `fetchWithTimeout(url)`
- `retryFetch(url, attempts)`

Requirements:

- Use env var only:
  - `WORDPRESS_API_URL`
- No hardcoded WordPress URL
- Timeout around `6000ms`
- Retry attempts: `2`
- Parse `_embedded` featured media when available
- Prefer standard WordPress featured media from `_embedded["wp:featuredmedia"].source_url`, then `featured_media_url` if available
- Normalize WordPress.com upload URLs to `https://i0.wp.com/<host>/<wp-content/uploads path>`
- Ignore non-direct or non-image media URLs and fall back to `DEFAULT_IMAGE`
- Return normalized shape used by existing UI
- Keep HTML fields (`excerpt.rendered`, `content.rendered`) as HTML

Reference pattern:

```ts
// lib/wordpress.ts
import type { NewsPost } from "@/data/news-data";

const DEFAULT_IMAGE = "/newsletter.jpg";
const REQUEST_TIMEOUT_MS = 6000;

type JsonRecord = Record<string, unknown>;

function normalizeBaseUrl(input: string) {
  return input.trim().replace(/\/+$/, "");
}

function resolvePostsEndpoint() {
  const configured = process.env.WORDPRESS_API_URL;
  if (!configured) throw new Error("Missing WORDPRESS_API_URL.");
  const base = normalizeBaseUrl(configured);

  if (base.includes("/wp-json/wp/v2/posts")) return base;
  if (base.includes("/wp/v2/sites/") && base.endsWith("/posts")) return base;
  if (base.includes("/wp-json/wp/v2")) return `${base}/posts`;
  if (base.includes("/wp/v2/sites/")) return `${base}/posts`;
  return `${base}/wp-json/wp/v2/posts`;
}

function appendQuery(baseUrl: string, params: Record<string, string | number>) {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  return url.toString();
}

async function fetchWithTimeout<T>(url: string, timeoutMs = REQUEST_TIMEOUT_MS): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { cache: "no-store", signal: controller.signal });
    if (!response.ok) throw new Error(`WP request failed: ${response.status}`);
    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

async function retryFetch<T>(url: string, attempts = 2): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i += 1) {
    try {
      return await fetchWithTimeout<T>(url, REQUEST_TIMEOUT_MS + i * 2000);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("WP request failed.");
}

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" ? (value as JsonRecord) : null;
}

function getString(record: JsonRecord | null, key: string) {
  const value = record?.[key];
  return typeof value === "string" ? value : "";
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
}

function normalizeDirectWordPressImageUrl(value: string): string | null {
  if (!value.includes("/wp-content/uploads/")) return null;

  try {
    const url = new URL(value);
    if (!/\.(?:jpe?g|png|webp)$/i.test(url.pathname)) return null;
    if (url.hostname.endsWith(".wordpress.com")) {
      return `https://i0.wp.com/${url.hostname}${url.pathname}`;
    }
    return `${url.origin}${url.pathname}`;
  } catch {
    return null;
  }
}

function extractEmbeddedFeaturedMediaUrl(post: JsonRecord) {
  const embedded = asRecord(post._embedded);
  const mediaArray = Array.isArray(embedded?.["wp:featuredmedia"]) ? embedded?.["wp:featuredmedia"] : null;
  const firstMedia = mediaArray?.length ? asRecord(mediaArray[0]) : null;
  return getString(firstMedia, "source_url");
}

function extractFeaturedImage(post: JsonRecord) {
  const candidates = [
    extractEmbeddedFeaturedMediaUrl(post),
    getString(post, "featured_media_url")
  ];

  for (const candidate of candidates) {
    const directImage = normalizeDirectWordPressImageUrl(candidate);
    if (directImage) return directImage;
  }

  return DEFAULT_IMAGE;
}

function normalizePostsPayload(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  const record = asRecord(payload);
  if (record && Array.isArray(record.posts)) return record.posts;
  return [];
}

export function normalizePost(rawPost: unknown): NewsPost {
  const post = asRecord(rawPost) ?? {};
  const titleObj = asRecord(post.title);
  const excerptObj = asRecord(post.excerpt);
  const contentObj = asRecord(post.content);

  const titleHtml = getString(titleObj, "rendered") || getString(post, "title");
  const excerptHtml = getString(excerptObj, "rendered");
  const contentHtml = getString(contentObj, "rendered");
  const title = stripHtml(titleHtml) || "Untitled Post";
  const slug = getString(post, "slug");

  return {
    id: String(post.id ?? slug ?? title),
    slug,
    title,
    excerptHtml: excerptHtml || "<p></p>",
    contentHtml: contentHtml || excerptHtml || "<p></p>",
    date: formatDate(getString(post, "date") || getString(post, "modified")),
    author: "KidNest Team",
    comments: 0,
    readingTimeMinutes: Math.max(1, Math.ceil(stripHtml(contentHtml || excerptHtml).split(/\s+/).filter(Boolean).length / 200)),
    category: "Children",
    categories: [],
    image: extractFeaturedImage(post),
    imageAlt: title
  };
}

export async function getAllPosts(): Promise<NewsPost[]> {
  const url = appendQuery(resolvePostsEndpoint(), {
    _embed: 1,
    per_page: 20,
    orderby: "date",
    order: "desc"
  });
  const payload = await retryFetch<unknown>(url, 2);
  return normalizePostsPayload(payload).map(normalizePost).filter((p) => Boolean(p.slug));
}

export async function getPostBySlug(slug: string): Promise<NewsPost | null> {
  const url = appendQuery(resolvePostsEndpoint(), {
    _embed: 1,
    slug,
    per_page: 1
  });
  const payload = await retryFetch<unknown>(url, 2);
  const posts = normalizePostsPayload(payload);
  return posts.length ? normalizePost(posts[0]) : null;
}
```

## 2) Internal API Routes

Create:

- `app/api/blog-posts/route.ts`
- `app/api/blog-posts/[slug]/route.ts`

Pattern:

```ts
// app/api/blog-posts/route.ts
import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/wordpress";

export async function GET() {
  try {
    return NextResponse.json({ posts: await getAllPosts() }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to fetch blog posts." }, { status: 500 });
  }
}
```

```ts
// app/api/blog-posts/[slug]/route.ts
import { NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/wordpress";

type Context = { params: Promise<{ slug: string }> };

export async function GET(_: Request, context: Context) {
  const { slug } = await context.params;
  try {
    const post = await getPostBySlug(slug);
    if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });
    return NextResponse.json({ post }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to fetch blog post." }, { status: 500 });
  }
}
```

## 3) Listing Wrapper Pattern (Stale-While-Refresh)

Client wrapper behavior:

- Use server `initialPosts` first
- localStorage key: `blog-posts:v1`
- Read cache in `useEffect` only
- If API slow/fails, keep stale data visible
- Only empty state when no initial + no cache

Empty state:

- No filter: `No posts available yet.`
- With search/category filter: `No posts found for your search.`

## 4) Detail Wrapper Pattern (Stale-While-Refresh)

Client wrapper behavior:

- Use server `initialPost` first
- localStorage key: `blog-post:<slug>`
- Load stale cache in `useEffect` only
- Refresh `/api/blog-posts/[slug]` in background
- Keep stale on failure
- Show fallback only when nothing available

## 5) Hydration Safety Rules

Must follow:

- Never read `localStorage` during initial render
- Read browser cache in `useEffect` only
- First render from server props
- Avoid render-time `Date.now()`, `Math.random()`, locale-dependent mismatch

## 6) HTML Rendering

Use WP HTML safely in existing layout:

```tsx
<div
  className="prose prose-slate max-w-none"
  dangerouslySetInnerHTML={{ __html: post.contentHtml || post.excerptHtml }}
/>
```

No raw tags visible; keep headings/lists/links/images formatting.

### Internal content links

WordPress content may include absolute links back to the same WordPress site with `target="_blank"` or external `rel` attributes. Preserve external links, but normalize internal links so content navigation stays in the same tab.

Use this pattern in the detail content component before `dangerouslySetInnerHTML`:

```ts
function getWordPressHost() {
  const wpUrl = process.env.WORDPRESS_API_URL;
  if (!wpUrl) return "";

  try {
    const parsed = new URL(wpUrl);
    const siteMatch = parsed.pathname.match(/\/sites\/([^/]+)/);
    const siteToken = siteMatch?.[1] ? decodeURIComponent(siteMatch[1]) : "";
    return siteToken.includes(".") ? siteToken : parsed.hostname;
  } catch {
    return "";
  }
}

function isInternalContentLink(href: string) {
  const trimmedHref = href.trim();
  if (trimmedHref.startsWith("/") || trimmedHref.startsWith("#")) return true;

  try {
    const url = new URL(trimmedHref);
    const wordpressHost = getWordPressHost();
    return wordpressHost.length > 0 && url.hostname === wordpressHost;
  } catch {
    return false;
  }
}

function openInternalContentLinksInSameTab(html: string) {
  return html.replace(/<a\b([^>]*)>/gi, (anchor, attrs) => {
    const hrefMatch = String(attrs).match(/\shref\s*=\s*(['"])(.*?)\1/i);
    if (!hrefMatch || !isInternalContentLink(hrefMatch[2])) return anchor;

    const normalizedAttrs = String(attrs)
      .replace(/\starget\s*=\s*(['"]).*?\1/gi, "")
      .replace(/\srel\s*=\s*(['"]).*?\1/gi, "");

    return `<a${normalizedAttrs}>`;
  });
}
```

Then render:

```tsx
const normalizedContentHtml = openInternalContentLinksInSameTab(post.contentHtml || post.excerptHtml);

<div
  className="prose prose-slate max-w-none"
  dangerouslySetInnerHTML={{ __html: normalizedContentHtml }}
/>
```

## 7) `next.config.ts` Image Hosts

Allow:

- `i0.wp.com`
- `i1.wp.com`
- `i2.wp.com`
- `secure.gravatar.com`
- hostname from `WORDPRESS_API_URL`
- embedded site domain from `/sites/<domain>/posts` for WP.com

Pattern:

```ts
function wordpressRemotePatterns() {
  const patterns = [
    { protocol: "https" as const, hostname: "i0.wp.com" },
    { protocol: "https" as const, hostname: "i1.wp.com" },
    { protocol: "https" as const, hostname: "i2.wp.com" },
    { protocol: "https" as const, hostname: "secure.gravatar.com" }
  ];

  const wpUrl = process.env.WORDPRESS_API_URL;
  if (!wpUrl) return patterns;

  try {
    const parsed = new URL(wpUrl);
    if (parsed.protocol === "https:") {
      patterns.push({ protocol: "https", hostname: parsed.hostname });
    }
    const siteMatch = parsed.pathname.match(/\/sites\/([^/]+)/);
    const siteToken = siteMatch?.[1] ? decodeURIComponent(siteMatch[1]) : "";
    if (siteToken.includes(".")) {
      patterns.push({ protocol: "https", hostname: siteToken });
    }
  } catch {}

  return patterns;
}
```

Also add `unoptimized` to `next/image` usages that render external WordPress images if optimized image fetching fails locally, on Vercel, or with `i0.wp.com` URLs:

```tsx
<Image
  src={post.image}
  alt={post.imageAlt}
  fill
  sizes="(max-width: 768px) 100vw, 33vw"
  unoptimized
  className="object-cover"
/>
```

## 8) Runtime Stability Patch (Optional)

If you hit:
`__webpack_modules__[moduleId] is not a function`

Use:

- dev dist: `.next-dev`
- prod dist: `.next-new`

and script cleans:

```json
{
  "scripts": {
    "predev": "node -e \"try{require('fs').rmSync('.next-dev',{recursive:true,force:true})}catch(e){}\"",
    "dev": "next dev",
    "prebuild": "node -e \"try{require('fs').rmSync('.next-new',{recursive:true,force:true})}catch(e){}\"",
    "build": "next build"
  }
}
```

Also:
- close dev servers
- clear stale `.next*` folders
- restart dev
- kill lingering Node processes if needed

## 9) Environment Variables

Use `.env.local` for runtime:

```env
WORDPRESS_API_URL=
```

Examples:

```env
WORDPRESS_API_URL=https://example.com/wp-json/wp/v2/posts
WORDPRESS_API_URL=https://public-api.wordpress.com/wp/v2/sites/example.wordpress.com/posts
```

Notes:

- `.env.example` is reference only
- restart dev server after `.env.local` change

## 10) Vercel Variables

Add in:
`Vercel Project Settings > Environment Variables`

- `WORDPRESS_API_URL` for Production/Preview/Development as needed
- Redeploy after changes
- Check Function Logs for API route failures

## 11) Vercel Execution Flow

1. Server page fetches initial blog data
2. Internal API routes run as serverless functions
3. Client wrapper shows initial/stale cache immediately
4. Background refresh fetches fresh data
5. UI updates only when fresh data arrives

## 12) Common Issues + Fixes

- `.env.local` missing => empty blog
- using `.env.example` only => no runtime config
- dev server not restarted after env change
- timeout too short => raise to ~6000ms + retry(2)
- posts draft/private => not visible in public API
- raw HTML visible => render with `dangerouslySetInnerHTML`
- internal WordPress content links open new tab => strip `target`/`rel` for internal same-host links before rendering
- next/image host error => update `remotePatterns`
- external WP image URL still broken => normalize direct `/wp-content/uploads/` image URL and add `unoptimized`
- WP.com `/sites/<domain>/posts` domain not whitelisted
- hydration mismatch => localStorage read during render
- webpack stale chunk error => dist split + clean scripts
- Vercel env missing or no redeploy
- wrong API route path references

## 13) Testing Checklist

### Local

1. Add `WORDPRESS_API_URL` in `.env.local`
2. Stop dev server
3. Run `npm run dev`
4. Open blog list page
5. Open blog detail page
6. Verify featured images load
7. Verify HTML rendering in detail content
8. Verify internal links in WordPress detail content open in the same tab
9. Verify stale cache fallback by throttling/offline
10. Check `/api/blog-posts`
11. Check `/api/blog-posts/[slug]`

### Vercel

1. Add `WORDPRESS_API_URL` in Vercel env settings
2. Redeploy
3. Open production blog pages
4. Verify posts are visible
5. Check Function Logs if errors

## 14) Reuse Steps For Any New Next.js Project

1. Copy this skill file into project.
2. Add `lib/wordpress.ts`.
3. Add API routes.
4. Wrap existing blog list UI with `BlogFeed` stale-refresh pattern.
5. Wrap existing detail UI with `BlogPostFeed` stale-refresh pattern.
6. Keep current UI components untouched.
7. Add image domain support in `next.config.ts`.
8. Set `.env.local` + Vercel env.
9. Build and validate with checklist.

---

This skill is intentionally data-layer focused so your current UI system remains unchanged.
