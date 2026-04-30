import { ShopPageContent } from "@/components/shop/shop-page-content";
import { shopPageMeta } from "@/data/shop-pages-data";
import { createPageMetadata } from "@/lib/seo";

const page = shopPageMeta["play-group"];

export const metadata = createPageMetadata({
  title: page.seoTitle,
  description: page.seoDescription,
  path: "/shop/play-group",
  image: page.banner.image
});

export default function PlayGroupPage() {
  return <ShopPageContent pageKey="play-group" />;
}
