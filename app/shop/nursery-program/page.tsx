import { ShopPageContent } from "@/components/shop/shop-page-content";
import { shopPageMeta } from "@/data/shop-pages-data";
import { createPageMetadata } from "@/lib/seo";

const page = shopPageMeta["nursery-program"];

export const metadata = createPageMetadata({
  title: page.seoTitle,
  description: page.seoDescription,
  path: "/shop/nursery-program",
  image: page.banner.image
});

export default function NurseryProgramPage() {
  return <ShopPageContent pageKey="nursery-program" />;
}
