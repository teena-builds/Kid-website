import { ShopPageContent } from "@/components/shop/shop-page-content";
import { shopPageMeta } from "@/data/shop-pages-data";
import { createPageMetadata } from "@/lib/seo";

const page = shopPageMeta["activity-classes"];

export const metadata = createPageMetadata({
  title: page.seoTitle,
  description: page.seoDescription,
  path: "/shop/activity-classes",
  image: page.banner.image
});

export default function ActivityClassesPage() {
  return <ShopPageContent pageKey="activity-classes" />;
}
