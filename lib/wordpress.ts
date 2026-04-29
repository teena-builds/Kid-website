import type { NewsPost } from "@/data/news-data";

const DEFAULT_IMAGE = "/newsletter.jpg";
const REQUEST_TIMEOUT_MS = 3500;
type JsonRecord = Record<string, unknown>;

function normalizeBaseUrl(input: string) {
  return input.trim().replace(/\/+$/, "");
}

function resolvePostsEndpoint() {
  const configured = process.env.WORDPRESS_API_URL;
  if (!configured) {
    throw new Error("Missing WORDPRESS_API_URL environment variable.");
  }

  const base = normalizeBaseUrl(configured);

  if (base.includes("/wp-json/wp/v2/posts")) return base;
  if (base.includes("/wp/v2/sites/") && base.endsWith("/posts")) return base;
  if (base.includes("/wp-json/wp/v2")) return `${base}/posts`;
  if (base.includes("/wp/v2/sites/")) return `${base}/posts`;

  return `${base}/wp-json/wp/v2/posts`;
}

function appendQuery(baseUrl: string, params: Record<string, string | number>) {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });
  return url.toString();
}

async function fetchWithTimeout<T>(url: string): Promise<T> {
  let attempt = 0;
  let lastError: unknown;

  while (attempt < 2) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS + attempt * 2000);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        next: { revalidate: 300 }
      });

      if (!response.ok) {
        throw new Error(`WordPress API request failed: ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
      attempt += 1;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError instanceof Error ? lastError : new Error("WordPress request failed.");
}

function decodeEntities(text: string) {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&#160;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "-")
    .replace(/&amp;/g, "&")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtml(html: string) {
  return decodeEntities(html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function estimateReadingTimeMinutes(contentHtml: string, excerptHtml: string) {
  const source = stripHtml(contentHtml || excerptHtml);
  const words = source.length > 0 ? source.split(/\s+/).filter(Boolean).length : 0;
  const wordsPerMinute = 200;
  if (words === 0) return 1;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${String(date.getUTCDate()).padStart(2, "0")} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

function pickCategory(title: string, excerpt: string, categoryNames: string[]): NewsPost["category"] {
  const combined = `${title} ${excerpt} ${categoryNames.join(" ")}`.toLowerCase();
  if (combined.includes("daycare") || combined.includes("day care")) return "Daycare";
  if (combined.includes("kindergarten")) return "Kindergarten";
  if (combined.includes("preschool")) return "Preschool";
  return "Children";
}

function asRecord(value: unknown): JsonRecord | null {
  if (value && typeof value === "object") return value as JsonRecord;
  return null;
}

function getString(record: JsonRecord | null, key: string): string {
  const value = record?.[key];
  return typeof value === "string" ? value : "";
}

function getNumber(record: JsonRecord | null, key: string): number | null {
  const value = record?.[key];
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  }
  return null;
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

function extractEmbeddedFeaturedMediaUrl(post: JsonRecord): string {
  const embedded = asRecord(post._embedded);
  const embeddedMediaArray = Array.isArray(embedded?.["wp:featuredmedia"])
    ? embedded?.["wp:featuredmedia"]
    : null;
  const firstMedia = embeddedMediaArray && embeddedMediaArray.length > 0
    ? asRecord(embeddedMediaArray[0])
    : null;

  return getString(firstMedia, "source_url");
}

function extractFeaturedImage(post: JsonRecord): string {
  const candidates = [
    extractEmbeddedFeaturedMediaUrl(post),
    getString(post, "featured_media_url")
  ];

  for (const candidate of candidates) {
    const directImage = normalizeDirectWordPressImageUrl(candidate);
    if (directImage) {
      return directImage;
    }
  }

  return DEFAULT_IMAGE;
}

function extractAuthor(post: JsonRecord): string {
  const embedded = asRecord(post._embedded);
  const embeddedAuthorArray = Array.isArray(embedded?.author)
    ? embedded?.author
    : null;
  const firstAuthor = embeddedAuthorArray && embeddedAuthorArray.length > 0
    ? asRecord(embeddedAuthorArray[0])
    : null;
  const embeddedAuthor = getString(firstAuthor, "name");
  if (typeof embeddedAuthor === "string" && embeddedAuthor.length > 0) return embeddedAuthor;
  const authorName = getString(post, "author_name");
  if (authorName.length > 0) return authorName;
  return "KidNest Team";
}

function extractCategoryNames(post: JsonRecord): string[] {
  const embedded = asRecord(post._embedded);
  const wpTerms = embedded?.["wp:term"];
  if (Array.isArray(wpTerms)) {
    const categoryTerms = wpTerms.flat().map((item) => asRecord(item)).filter((term) => {
      if (!term) return false;
      return getString(term, "taxonomy") === "category" && getString(term, "name").length > 0;
    });
    if (categoryTerms.length > 0) {
      return categoryTerms.map((term) => getString(term, "name"));
    }
  }

  return [];
}

function extractCommentsCount(post: JsonRecord): number {
  const commentsObject = asRecord(post.comments);
  const candidates = [
    getNumber(post, "comment_count"),
    getNumber(post, "jetpack_comment_count"),
    getNumber(commentsObject, "count")
  ];
  for (const item of candidates) {
    if (item !== null && item >= 0) {
      return item;
    }
  }
  return 0;
}

function normalizePost(rawPost: unknown): NewsPost {
  const post = asRecord(rawPost) ?? {};
  const titleObject = asRecord(post.title);
  const excerptObject = asRecord(post.excerpt);
  const contentObject = asRecord(post.content);

  const titleHtml = getString(titleObject, "rendered") || getString(post, "title");
  const excerptHtml = getString(excerptObject, "rendered");
  const contentHtml = getString(contentObject, "rendered");
  const titleText = stripHtml(titleHtml);
  const excerptText = stripHtml(excerptHtml);
  const categoryNames = extractCategoryNames(post);
  const inferredCategory = pickCategory(titleText, excerptText, categoryNames);
  const primaryCategory = categoryNames[0]?.trim() || inferredCategory;
  const normalizedCategories =
    categoryNames.length > 0
      ? Array.from(new Set(categoryNames.map((name) => name.trim()).filter((name) => name.length > 0)))
      : [primaryCategory];

  const idValue = getNumber(post, "id");
  const slug = getString(post, "slug");
  const dateValue = getString(post, "date") || getString(post, "modified");

  return {
    id: String(idValue ?? slug ?? titleText),
    slug,
    title: titleText || "Untitled Post",
    excerptHtml: excerptHtml || `<p>${excerptText}</p>`,
    contentHtml: contentHtml || `<p>${excerptText}</p>`,
    date: formatDate(dateValue),
    author: extractAuthor(post),
    comments: extractCommentsCount(post),
    readingTimeMinutes: estimateReadingTimeMinutes(contentHtml, excerptHtml),
    category: primaryCategory,
    categories: normalizedCategories,
    image: extractFeaturedImage(post),
    imageAlt: titleText || "Blog featured image"
  };
}

function normalizePostsPayload(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  const record = asRecord(payload);
  if (record && Array.isArray(record.posts)) return record.posts;
  return [];
}

export async function getAllPosts(): Promise<NewsPost[]> {
  const postsUrl = appendQuery(resolvePostsEndpoint(), {
    _embed: 1,
    per_page: 20,
    orderby: "date",
    order: "desc"
  });
  const payload = await fetchWithTimeout<unknown>(postsUrl);
  const rawPosts = normalizePostsPayload(payload);
  return rawPosts
    .map(normalizePost)
    .filter((post) => post.slug.length > 0);
}

export async function getPostBySlug(slug: string): Promise<NewsPost | null> {
  const postsUrl = appendQuery(resolvePostsEndpoint(), {
    _embed: 1,
    slug,
    per_page: 1
  });

  const payload = await fetchWithTimeout<unknown>(postsUrl);
  const rawPosts = normalizePostsPayload(payload);
  if (rawPosts.length === 0) return null;
  return normalizePost(rawPosts[0]);
}
