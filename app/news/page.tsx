import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogFeed } from "@/components/news/blog-feed";
import { InnerBanner } from "@/components/shop/inner-banner";
import { breadcrumbSchema, createPageMetadata, jsonLdProps } from "@/lib/seo";
import { getAllPosts } from "@/lib/wordpress";
import type { NewsPost } from "@/data/news-data";

export const metadata = createPageMetadata({
  title: "KidNest Play Center | Blog & Parenting Tips",
  description:
    "Read KidNest blog articles on preschool learning, child development, day care routines, activities, parenting tips, and school readiness.",
  path: "/news"
});

const newsBanner = {
  title: "News",
  breadcrumb: "Home / News",
  image: "/newsletter.jpg",
  imageAlt: "Children and teacher in a classroom activity"
};

type NewsPageProps = {
  searchParams?: Promise<{
    category?: string;
  }>;
};

export default async function NewsPage({ searchParams }: NewsPageProps) {
  let initialPosts: NewsPost[] = [];
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const initialCategory = resolvedSearchParams.category
    ? decodeURIComponent(resolvedSearchParams.category)
    : "All";

  try {
    initialPosts = await getAllPosts();
  } catch {
    initialPosts = [];
  }

  return (
    <>
      <Header />
      <main>
        <script
          {...jsonLdProps(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/news" }
            ])
          )}
        />
        <InnerBanner banner={newsBanner} />
        <BlogFeed initialPosts={initialPosts} initialCategory={initialCategory} />
      </main>
      <Footer />
    </>
  );
}
