import type { NextConfig } from "next";

function wordpressRemotePatterns() {
  const patterns = [
    { protocol: "https" as const, hostname: "images.pexels.com" },
    { protocol: "https" as const, hostname: "i0.wp.com" },
    { protocol: "https" as const, hostname: "i1.wp.com" },
    { protocol: "https" as const, hostname: "i2.wp.com" },
    { protocol: "https" as const, hostname: "secure.gravatar.com" }
  ];

  const wpUrl = process.env.WORDPRESS_API_URL;
  if (wpUrl) {
    try {
      const parsed = new URL(wpUrl);
      if (parsed.protocol === "https:") {
        patterns.push({
          protocol: "https",
          hostname: parsed.hostname
        });
      }

      // WordPress.com API URLs can include a site slug/domain in the path:
      // /wp/v2/sites/<site>/posts
      const siteMatch = parsed.pathname.match(/\/sites\/([^/]+)/);
      const siteToken = siteMatch?.[1] ? decodeURIComponent(siteMatch[1]) : "";
      if (siteToken.includes(".")) {
        patterns.push({
          protocol: "https",
          hostname: siteToken
        });
      }
    } catch {
      // Keep defaults when WORDPRESS_API_URL is not a valid URL during local setup.
    }
  }

  return patterns;
}

const nextConfig: NextConfig = {
  // Keep dev and production artifacts isolated to avoid stale chunk/runtime mismatches.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next-new",
  images: {
    remotePatterns: wordpressRemotePatterns()
  }
};

export default nextConfig;
