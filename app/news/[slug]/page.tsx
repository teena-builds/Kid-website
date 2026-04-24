import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { InnerBanner } from "@/components/shop/inner-banner";
import { BlogPostFeed } from "@/components/news-detail/blog-post-feed";
import type { NewsPost } from "@/data/news-data";
import { getAllPosts, getPostBySlug } from "@/lib/wordpress";

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return [];
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

  return (
    <>
      <Header />
      <main>
        <InnerBanner banner={detailBanner} />
        <BlogPostFeed slug={slug} initialPost={initialPost} initialPosts={initialPosts} />
      </main>
      <Footer />
    </>
  );
}
