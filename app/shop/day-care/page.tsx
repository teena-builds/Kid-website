import { ShopPageContent } from "@/components/shop/shop-page-content";
import { shopPageMeta } from "@/data/shop-pages-data";
import { createPageMetadata } from "@/lib/seo";

const page = shopPageMeta["day-care"];

export const metadata = createPageMetadata({
  title: page.seoTitle,
  description: page.seoDescription,
  path: "/shop/day-care",
  image: page.banner.image
});

export default function DayCarePage() {
  return <ShopPageContent pageKey="day-care" />;
}
