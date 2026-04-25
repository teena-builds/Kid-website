"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Clock3, UserRound } from "lucide-react";
import type { NewsPost } from "@/data/news-data";

type BlogCardProps = {
  post: NewsPost;
};

function getExcerptText(excerptHtml: string) {
  return excerptHtml
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeText(text: string) {
  return text
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function BlogCard({ post }: BlogCardProps) {
  const [imageSrc, setImageSrc] = useState(post.image);
  const excerptText = getExcerptText(post.excerptHtml);
  const titleText = normalizeText(post.title);

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#ece4d8] bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft">
      <Link
        href={`/news/${post.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={imageSrc}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageSrc("/newsletter.jpg")}
          />
          <span className="absolute bottom-3 left-3 rounded-lg bg-[#f79a1e] px-3 py-1 text-xs text-white">
            {post.date}
          </span>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
            <p className="inline-flex items-center gap-1.5">
              <UserRound className="h-4 w-4 text-brand-teal" aria-hidden="true" />
              by {post.author}
            </p>
            <p className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4 text-brand-teal" aria-hidden="true" />
              {post.readingTimeMinutes} min read
            </p>
          </div>

          <h3 className="mt-3 line-clamp-2 text-xl leading-tight text-brand-ink transition-colors duration-300 group-hover:text-brand-teal">
            {titleText}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {excerptText}
          </p>
        </div>
      </Link>
    </article>
  );
}
