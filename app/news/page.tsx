import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogFeed } from "@/components/news/blog-feed";
import { InnerBanner } from "@/components/shop/inner-banner";

const newsBanner = {
  title: "News",
  breadcrumb: "Home / News",
  image: "/newsletter.jpg",
  imageAlt: "Children and teacher in a classroom activity"
};

export default function NewsPage() {
  return (
    <>
      <Header />
      <main>
        <InnerBanner banner={newsBanner} />
        <BlogFeed initialPosts={[]} />
      </main>
      <Footer />
    </>
  );
}
