import Image from "next/image";
import Link from "next/link";
import {
  Clock3,
  ChevronLeft,
  ChevronRight,
  Grid2X2,
  Share2,
  UserRound
} from "lucide-react";
import { BlogCard } from "@/components/news/blog-card";
import { TocNav } from "@/components/news-detail/toc-nav";
import type { NewsPost } from "@/data/news-data";

type NewsDetailContentProps = {
  post: NewsPost;
  allPosts: NewsPost[];
};

type TocHeading = {
  id: string;
  text: string;
};

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
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});

  const currentIndex = allPosts.findIndex((item) => item.slug === post.slug);
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex >= 0 && currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : null;

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
                className="prose prose-slate max-w-none prose-headings:prose-headings:text-brand-ink prose-p:leading-relaxed prose-li:text-slate-700 prose-p:text-slate-600 prose-a:text-brand-teal hover:prose-a:text-brand-coral prose-img:rounded-2xl [&_h1]:mb-4 [&_h1]:mt-8 [&_h2]:scroll-mt-32 [&_h2]:mb-4 [&_h2]:mt-8 [&_h3]:mb-3 [&_h3]:mt-7 [&_h4]:mb-3 [&_h4]:mt-6 [&_h5]:mb-2 [&_h5]:mt-5 [&_h6]:mb-2 [&_h6]:mt-5 [&_p]:mb-4 [&_p]:mt-0 [&_ul]:mb-5 [&_ul]:mt-3 [&_ol]:mb-5 [&_ol]:mt-3 [&_li]:mb-1 [&_blockquote]:my-6 [&_blockquote]:rounded-xl [&_blockquote]:border-l-4 [&_blockquote]:border-[#f79a1e] [&_blockquote]:bg-[#fff6eb] [&_blockquote]:px-4 [&_blockquote]:py-3 [&_figure]:my-6 [&_img]:my-5 [&>*:first-child]:mt-0"
                dangerouslySetInnerHTML={{ __html: htmlWithIds }}
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
                {["Facebook", "Twitter", "LinkedIn"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-label={`Share on ${item}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#eef8f7] text-brand-teal transition-colors duration-300 hover:bg-brand-teal hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
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
                  <div key={name} className="flex items-center justify-between text-sm text-slate-700">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand-teal" />
                      {name}
                    </span>
                    <span>{String(count).padStart(2, "0")}</span>
                  </div>
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
