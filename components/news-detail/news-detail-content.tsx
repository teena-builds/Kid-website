import Image from "next/image";
import Link from "next/link";
import {
  Clock3,
  ChevronLeft,
  ChevronRight,
  Grid2X2,
  UserRound
} from "lucide-react";
import { BlogCard } from "@/components/news/blog-card";
import { TocNav } from "@/components/news-detail/toc-nav";
import type { NewsPost } from "@/data/news-data";
import { absoluteUrl } from "@/lib/seo";

type NewsDetailContentProps = {
  post: NewsPost;
  allPosts: NewsPost[];
};

type TocHeading = {
  id: string;
  text: string;
};

const shareIconClassName = "h-4 w-4";

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={shareIconClassName} fill="currentColor">
      <path d="M12.04 3.5a8.45 8.45 0 0 0-7.17 12.92L3.88 20l3.68-.96A8.46 8.46 0 1 0 12.04 3.5Zm0 1.55a6.91 6.91 0 1 1 0 13.82 6.85 6.85 0 0 1-3.52-.96l-.25-.15-2.18.57.58-2.12-.16-.27a6.91 6.91 0 0 1 5.53-10.89Zm-2.9 3.67c-.15 0-.39.06-.6.29-.2.22-.78.76-.78 1.86 0 1.1.8 2.16.91 2.31.11.15 1.55 2.48 3.84 3.37 1.9.75 2.29.6 2.7.56.41-.04 1.33-.54 1.52-1.07.19-.52.19-.97.13-1.07-.06-.1-.21-.16-.44-.28-.23-.11-1.33-.66-1.54-.73-.2-.08-.35-.11-.5.11-.15.23-.58.73-.71.88-.13.15-.26.17-.49.06-.23-.12-.96-.36-1.84-1.14-.68-.6-1.14-1.35-1.27-1.58-.13-.23-.01-.35.1-.47.1-.1.23-.26.34-.39.11-.13.15-.23.23-.38.08-.15.04-.28-.02-.39-.06-.11-.5-1.21-.69-1.66-.18-.44-.36-.38-.5-.39h-.43Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={shareIconClassName} fill="currentColor">
      <path d="M13.45 20.5v-7.73h2.6l.39-3.01h-2.99V7.83c0-.87.24-1.46 1.49-1.46h1.59v-2.7a21.39 21.39 0 0 0-2.32-.12c-2.3 0-3.87 1.4-3.87 3.98v2.23h-2.6v3.01h2.6v7.73h3.11Z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={shareIconClassName} fill="currentColor">
      <path d="M18.24 3.5h2.86l-6.25 7.14 7.35 9.72h-5.75l-4.5-5.89-5.16 5.89H3.93l6.69-7.65L3.57 3.5h5.9l4.07 5.38 4.7-5.38Zm-1 15.15h1.59L8.61 5.12H6.9l10.34 13.53Z" />
    </svg>
  );
}

function decodeHeadingText(text: string) {
  return text
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(html: string) {
  return html.replace(/<[^>]*>/g, " ");
}

function toKebabCase(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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

function normalizeDirectWordPressUploadMediaUrl(value: string): string | null {
  if (!value.includes("/wp-content/uploads/")) return null;

  try {
    const url = new URL(value.replace(/&amp;/g, "&"));
    const isImage = /\.(?:gif|jpe?g|png|webp)$/i.test(url.pathname);
    const isVideo = /\.(?:m4v|mov|mp4|ogg|ogv|webm)$/i.test(url.pathname);
    if (!isImage && !isVideo) return null;

    if (isImage && url.hostname.endsWith(".wordpress.com")) {
      return `https://i0.wp.com/${url.hostname}${url.pathname}`;
    }

    return `${url.origin}${url.pathname}`;
  } catch {
    return null;
  }
}

function normalizeWordPressSrcSet(value: string) {
  return value
    .split(",")
    .map((candidate) => {
      const trimmedCandidate = candidate.trim();
      const [urlPart, ...descriptorParts] = trimmedCandidate.split(/\s+/);
      const normalizedUrl = normalizeDirectWordPressUploadMediaUrl(urlPart);
      return normalizedUrl
        ? [normalizedUrl, ...descriptorParts].join(" ")
        : trimmedCandidate;
    })
    .join(", ");
}

function normalizeWordPressContentMediaUrls(html: string) {
  return html
    .replace(
      /\s(href|poster|src)\s*=\s*(['"])(.*?)\2/gi,
      (attribute, name, quote, value) => {
        const normalizedUrl = normalizeDirectWordPressUploadMediaUrl(String(value));
        return normalizedUrl ? ` ${name}=${quote}${normalizedUrl}${quote}` : attribute;
      }
    )
    .replace(/\ssrcset\s*=\s*(['"])(.*?)\1/gi, (_, quote, value) => {
      return ` srcset=${quote}${normalizeWordPressSrcSet(String(value))}${quote}`;
    });
}

function pointMediaWrapperLinksToDirectMedia(html: string) {
  return html.replace(/<a\b([^>]*)>([\s\S]*?<img\b[^>]*>[\s\S]*?)<\/a>/gi, (anchor, attrs, innerHtml) => {
    const hrefMatch = String(attrs).match(/\shref\s*=\s*(['"])(.*?)\1/i);
    const imageSrcMatch = String(innerHtml).match(/<img\b[^>]*\ssrc\s*=\s*(['"])(.*?)\1/i);
    if (!hrefMatch || !imageSrcMatch || !isInternalContentLink(hrefMatch[2])) {
      return anchor;
    }

    const normalizedImageUrl = normalizeDirectWordPressUploadMediaUrl(imageSrcMatch[2]);
    if (!normalizedImageUrl) {
      return anchor;
    }

    const normalizedAttrs = String(attrs).replace(
      /\shref\s*=\s*(['"]).*?\1/i,
      ` href=${hrefMatch[1]}${normalizedImageUrl}${hrefMatch[1]}`
    );

    return `<a${normalizedAttrs}>${innerHtml}</a>`;
  });
}

function openInternalContentLinksInSameTab(html: string) {
  return html.replace(/<a\b([^>]*)>/gi, (anchor, attrs) => {
    const hrefMatch = String(attrs).match(/\shref\s*=\s*(['"])(.*?)\1/i);
    if (!hrefMatch || !isInternalContentLink(hrefMatch[2])) {
      return anchor;
    }

    const normalizedAttrs = String(attrs)
      .replace(/\starget\s*=\s*(['"]).*?\1/gi, "")
      .replace(/\srel\s*=\s*(['"]).*?\1/gi, "");

    return `<a${normalizedAttrs}>`;
  });
}

function addIdsToH2Headings(html: string): { htmlWithIds: string; headings: TocHeading[] } {
  const usedIds = new Map<string, number>();
  const headings: TocHeading[] = [];
  let fallbackIndex = 0;

  const htmlWithIds = html.replace(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi, (_, attrs, innerHtml) => {
    const rawText = decodeHeadingText(stripTags(String(innerHtml)));
    const baseId = toKebabCase(rawText) || `section-${++fallbackIndex}`;
    const seen = usedIds.get(baseId) ?? 0;
    usedIds.set(baseId, seen + 1);
    const uniqueId = seen === 0 ? baseId : `${baseId}-${seen + 1}`;
    const label = rawText || `Section ${headings.length + 1}`;
    headings.push({ id: uniqueId, text: label });

    const attrsWithoutId = String(attrs).replace(/\sid\s*=\s*(['"]).*?\1/gi, "");
    return `<h2${attrsWithoutId} id="${uniqueId}">${innerHtml}</h2>`;
  });

  return { htmlWithIds, headings };
}

export function NewsDetailContent({ post, allPosts }: NewsDetailContentProps) {
  const latestPosts = allPosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const relatedPosts = allPosts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);
  const contentHtml = post.contentHtml || post.excerptHtml;
  const { htmlWithIds, headings } = addIdsToH2Headings(contentHtml);

  const categoriesCount = allPosts.reduce<Record<string, number>>((acc, item) => {
    const categories = item.categories.length > 0 ? item.categories : [item.category];
    categories.forEach((category) => {
      const name = category.trim();
      if (name.length === 0) return;
      acc[name] = (acc[name] ?? 0) + 1;
    });
    return acc;
  }, {});

  const currentIndex = allPosts.findIndex((item) => item.slug === post.slug);
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex >= 0 && currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : null;
  const contentHtmlWithNormalizedMedia = normalizeWordPressContentMediaUrls(htmlWithIds);
  const contentHtmlWithDirectMediaLinks = pointMediaWrapperLinksToDirectMedia(contentHtmlWithNormalizedMedia);
  const normalizedContentHtml = openInternalContentLinksInSameTab(contentHtmlWithDirectMediaLinks);
  const shareUrl = absoluteUrl(`/news/${post.slug}`);
  const shareTitle = post.title;
  const shareLinks = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`,
      icon: WhatsappIcon,
      className: "bg-[#25D366] text-white hover:bg-[#1fb456]"
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      icon: FacebookIcon,
      className: "bg-[#1877F2] text-white hover:bg-[#145dbd]"
    },
    {
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      icon: TwitterIcon,
      className: "bg-black text-white hover:bg-[#2b2b2b]"
    }
  ];

  return (
    <>
      <section className="bg-[#fffaf1] py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-6 lg:hidden">
            <TocNav headings={headings} />
          </div>

          <div className="grid gap-9 lg:grid-cols-[22%_50%_24%] lg:gap-8 xl:gap-5">
            <aside className="hidden lg:block lg:sticky lg:top-28 lg:self-start">
              <TocNav headings={headings} />
            </aside>

            <article>
            <div className="overflow-hidden rounded-3xl shadow-soft">
              <Image
                src={post.image || "/newsletter.jpg"}
                alt={post.imageAlt}
                width={1600}
                height={900}
                className="h-[360px] w-full object-cover sm:h-[460px]"
                priority
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
              <p className="inline-flex items-center gap-1.5">
                <UserRound className="h-4 w-4 text-brand-teal" aria-hidden="true" />
                by {post.author}
              </p>
              <p className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden="true" />
                {post.date}
              </p>
              <p className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4 text-brand-teal" aria-hidden="true" />
                {post.readingTimeMinutes} min read
              </p>
            </div>

            <h1 className="mt-4 text-2xl leading-tight text-brand-ink sm:text-4xl">
              {post.title}
            </h1>

            {/* WordPress HTML content is rendered as real markup, preserving headings/lists/links/images. */}
            <div className="mt-4 rounded-2xl bg-white p-6 shadow-card sm:p-8">
              <div
                className="prose prose-slate max-w-none prose-headings:prose-headings:text-brand-ink prose-p:leading-relaxed prose-li:text-slate-700 prose-p:text-slate-600 prose-a:text-brand-teal hover:prose-a:text-brand-coral prose-img:rounded-2xl [&_h1]:mb-4 [&_h1]:mt-8 [&_h2]:scroll-mt-32 [&_h2]:mb-4 [&_h2]:mt-8 [&_h3]:mb-3 [&_h3]:mt-7 [&_h4]:mb-3 [&_h4]:mt-6 [&_h5]:mb-2 [&_h5]:mt-5 [&_h6]:mb-2 [&_h6]:mt-5 [&_p]:mb-4 [&_p]:mt-0 [&_ul]:mb-5 [&_ul]:mt-3 [&_ol]:mb-5 [&_ol]:mt-3 [&_li]:mb-1 [&_blockquote]:my-6 [&_blockquote]:rounded-xl [&_blockquote]:border-l-4 [&_blockquote]:border-[#f79a1e] [&_blockquote]:bg-[#fff6eb] [&_blockquote]:px-4 [&_blockquote]:py-3 [&_figure]:my-6 [&_img]:my-5 [&_video]:my-5 [&_video]:w-full [&_video]:rounded-2xl [&>*:first-child]:mt-0"
                dangerouslySetInnerHTML={{ __html: normalizedContentHtml }}
              />
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-[#ebdfd1] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {(post.categories.length > 0 ? post.categories : [post.category]).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#e7ddcf] bg-white px-3 py-1 text-sm text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Share:</span>
                {shareLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Share this blog on ${item.label}`}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal ${item.className}`}
                  >
                    <item.icon />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[#ebdfd1] bg-white p-4 shadow-sm">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="min-w-0">
                  {previousPost ? (
                    <Link
                      href={`/news/${previousPost.slug}`}
                      className="inline-flex items-center gap-2 text-sm text-brand-ink transition-colors hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous Post
                    </Link>
                  ) : (
                    <span className="text-sm text-slate-400">Previous Post</span>
                  )}
                </div>
                <Grid2X2 className="h-5 w-5 text-slate-400" aria-hidden="true" />
                <div className="min-w-0 justify-self-end">
                  {nextPost ? (
                    <Link
                      href={`/news/${nextPost.slug}`}
                      className="inline-flex items-center gap-2 text-sm text-brand-ink transition-colors hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
                    >
                      Next Post
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span className="text-sm text-slate-400">Next Post</span>
                  )}
                </div>
              </div>
            </div>
            </article>

            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">

            <div className="rounded-2xl border border-[#ece3d6] bg-white p-5 shadow-card">
              <h3 className="text-3xl text-brand-ink">Latest Blog</h3>
              <div className="mt-4 space-y-4">
                {latestPosts.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/news/${item.slug}`}
                    className="flex gap-3 border-b border-[#f0e9dd] pb-3 last:border-b-0 last:pb-0"
                  >
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.image || "/newsletter.jpg"}
                        alt={item.imageAlt}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="line-clamp-2 text-sm leading-snug text-brand-ink transition-colors hover:text-brand-teal">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{item.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#ece3d6] bg-white p-5 shadow-card">
              <h3 className="text-3xl text-brand-ink">Categories</h3>
              <div className="mt-4 space-y-3">
                {Object.entries(categoriesCount).map(([name, count]) => (
                  <Link
                    key={name}
                    href={`/news?category=${encodeURIComponent(name)}`}
                    className="flex items-center justify-between rounded-lg py-0.5 text-sm text-slate-700 transition-colors duration-300 hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand-teal" />
                      {name}
                    </span>
                    <span>{String(count).padStart(2, "0")}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#ece3d6] bg-white p-5 shadow-card">
              <h3 className="text-3xl text-brand-ink">Tags</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {(post.categories.length > 0 ? post.categories : [post.category]).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="rounded-full bg-[#f4f8fb] px-3 py-1.5 text-xs text-slate-600 transition-colors duration-300 hover:bg-[#dcf6f4] hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.14em] text-brand-coral">
              Related Posts
            </p>
            <h2 className="mt-3 text-2xl text-brand-ink sm:text-5xl">
              More Related Blog
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Explore more articles for parenting support and early education guidance.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedPosts.map((item) => (
              <BlogCard key={item.slug} post={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
