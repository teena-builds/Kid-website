import type { Metadata } from "next";

export const siteConfig = {
  name: "KidNest Play Center",
  shortName: "KidNest",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kidnest.example.com",
  description:
    "KidNest Play Center offers safe preschool, day care, activity classes, and parent-friendly early learning programs for young children.",
  phone: "907-200-3462",
  email: "support@kindedo.com",
  address: "14/A, Kilix Home Tower, NYC"
};

export function absoluteUrl(path = "/") {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path,
  image = "/newsletter.jpg",
  type = "website"
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: "en_US",
      type
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo-kidnest.svg"),
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address
    },
    sameAs: []
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/news")}?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function jsonLdProps(data: unknown) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data).replace(/</g, "\\u003c")
    }
  };
}
