import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { shopPageMeta } from "@/data/shop-pages-data";
import { getAllPosts } from "@/lib/wordpress";

const staticRoutes = ["/", "/about", "/contact", "/faq", "/news", "/thank-you"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const now = new Date();
  let blogRoutes: string[] = [];

  try {
    const posts = await getAllPosts();
    blogRoutes = posts.map((post) => `/news/${post.slug}`);
  } catch {
    blogRoutes = [];
  }

  const shopRoutes = Object.keys(shopPageMeta).map((key) => `/shop/${key}`);
  const routes = [...staticRoutes, ...shopRoutes, ...blogRoutes];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route.startsWith("/news/") ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/shop/") ? 0.85 : 0.7
  }));
}
