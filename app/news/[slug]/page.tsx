import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { InnerBanner } from "@/components/shop/inner-banner";
import { BlogPostFeed } from "@/components/news-detail/blog-post-feed";
import type { NewsPost } from "@/data/news-data";
import { getAllPosts, getPostBySlug } from "@/lib/wordpress";
import { absoluteUrl, breadcrumbSchema, createPageMetadata, jsonLdProps, siteConfig } from "@/lib/seo";

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return [];
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function truncate(value: string, maxLength = 158) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 3).trim()}...`;
}

export async function generateMetadata({ params }: NewsDetailPageProps) {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);
    if (post) {
      const description = truncate(stripHtml(post.excerptHtml || post.contentHtml));
      return createPageMetadata({
        title: `KidNest Play Center | ${post.title}`,
        description:
          description ||
          "Read KidNest Play Center blog insights for parents on preschool learning, day care, child development, and activities.",
        path: `/news/${slug}`,
        image: post.image,
        type: "article"
      });
    }
  } catch {
    // Fall back to generic metadata when WordPress is unavailable.
  }

  return createPageMetadata({
    title: "KidNest Play Center | Blog Article",
    description:
      "Read KidNest Play Center blog insights for parents on preschool learning, day care, child development, activities, and school readiness.",
    path: `/news/${slug}`,
    type: "article"
  });
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  let initialPost: NewsPost | null = null;
  let initialPosts: NewsPost[] = [];
  let postLookupFailed = false;

  try {
    initialPost = await getPostBySlug(slug);
  } catch {
    postLookupFailed = true;
  }

  try {
    initialPosts = await getAllPosts();
  } catch {
    initialPosts = [];
  }

  if (!initialPost && !postLookupFailed) notFound();

  const detailBanner = {
    title: "News Details",
    breadcrumb: "Home / News Details",
    image: "/newsletter.jpg",
    imageAlt: "Children and teacher in classroom activity"
  };
  const blogPostingSchema = initialPost
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: initialPost.title,
        description: truncate(stripHtml(initialPost.excerptHtml || initialPost.contentHtml)),
        image: initialPost.image.startsWith("http") ? initialPost.image : absoluteUrl(initialPost.image),
        url: absoluteUrl(`/news/${slug}`),
        author: {
          "@type": "Person",
          name: initialPost.author
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          logo: {
            "@type": "ImageObject",
            url: absoluteUrl("/logo-kidnest.svg")
          }
        },
        datePublished: initialPost.date,
        dateModified: initialPost.date,
        mainEntityOfPage: absoluteUrl(`/news/${slug}`)
      }
    : null;

  return (
    <>
      <Header />
      <main>
        {blogPostingSchema ? <script {...jsonLdProps(blogPostingSchema)} /> : null}
        <script
          {...jsonLdProps(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/news" },
              { name: initialPost?.title || "Blog Article", path: `/news/${slug}` }
            ])
          )}
        />
        <InnerBanner banner={detailBanner} />
        <BlogPostFeed slug={slug} initialPost={initialPost} initialPosts={initialPosts} />
      </main>
      <Footer />
    </>
  );
}
