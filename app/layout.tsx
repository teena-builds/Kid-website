import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import {
  createPageMetadata,
  jsonLdProps,
  organizationSchema,
  siteConfig,
  websiteSchema
} from "@/lib/seo";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...createPageMetadata({
    title: "KidNest Play Center | Preschool, Day Care & Kids Activities",
    description:
      "Safe preschool, day care, activity classes, and playful early learning programs for children with expert teachers and parent-friendly support.",
    path: "/"
  })
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} bg-brand-cream text-brand-ink antialiased`}
      >
        <script {...jsonLdProps(organizationSchema())} />
        <script {...jsonLdProps(websiteSchema())} />
        {children}
      </body>
    </html>
  );
}
