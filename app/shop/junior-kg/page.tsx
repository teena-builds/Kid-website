import { ShopPageContent } from "@/components/shop/shop-page-content";
import { shopPageMeta } from "@/data/shop-pages-data";
import { createPageMetadata } from "@/lib/seo";

const page = shopPageMeta["junior-kg"];

export const metadata = createPageMetadata({
  title: page.seoTitle,
  description: page.seoDescription,
  path: "/shop/junior-kg",
  image: page.banner.image
});

export default function JuniorKgPage() {
  return <ShopPageContent pageKey="junior-kg" />;
}
