"use client";

import { useEffect, useState } from "react";
import { NewsDetailContent } from "@/components/news-detail/news-detail-content";
import type { NewsPost } from "@/data/news-data";

const BLOG_LIST_CACHE_KEY = "blog-posts:v1";
const BLOG_DETAIL_CACHE_PREFIX = "blog-post:";

let memoryListCache: NewsPost[] | null = null;
const memoryDetailCache = new Map<string, NewsPost>();

type BlogPostFeedProps = {
  slug: string;
  initialPost: NewsPost | null;
  initialPosts: NewsPost[];
};

export function BlogPostFeed({ slug, initialPost, initialPosts }: BlogPostFeedProps) {
  const [post, setPost] = useState<NewsPost | null>(initialPost);
  const [allPosts, setAllPosts] = useState<NewsPost[]>(initialPosts);

  useEffect(() => {
    if (initialPosts.length > 0) {
      memoryListCache = initialPosts;
      localStorage.setItem(BLOG_LIST_CACHE_KEY, JSON.stringify(initialPosts));
    } else if (memoryListCache && memoryListCache.length > 0) {
      setAllPosts(memoryListCache);
    } else {
      const cachedList = localStorage.getItem(BLOG_LIST_CACHE_KEY);
      if (cachedList) {
        try {
          const parsed = JSON.parse(cachedList) as NewsPost[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            memoryListCache = parsed;
            setAllPosts(parsed);
          }
        } catch {
          // Ignore invalid local cache.
        }
      }
    }
  }, [initialPosts]);

  useEffect(() => {
    const detailKey = `${BLOG_DETAIL_CACHE_PREFIX}${slug}`;

    if (initialPost) {
      memoryDetailCache.set(slug, initialPost);
      localStorage.setItem(detailKey, JSON.stringify(initialPost));
      return;
    }

    const inMemory = memoryDetailCache.get(slug);
    if (inMemory) {
      setPost(inMemory);
      return;
    }

    const local = localStorage.getItem(detailKey);
    if (!local) return;
    try {
      const parsed = JSON.parse(local) as NewsPost;
      if (parsed?.slug === slug) {
        memoryDetailCache.set(slug, parsed);
        setPost(parsed);
      }
    } catch {
      // Ignore invalid local cache.
    }
  }, [initialPost, slug]);

  useEffect(() => {
    let isMounted = true;
    const detailKey = `${BLOG_DETAIL_CACHE_PREFIX}${slug}`;

    async function refreshDetail() {
      try {
        const response = await fetch(`/api/blog-posts/${slug}`, { cache: "no-store" });
        if (!response.ok) return;

        const payload = (await response.json()) as { post?: NewsPost };
        if (!isMounted || !payload.post) return;

        memoryDetailCache.set(slug, payload.post);
        localStorage.setItem(detailKey, JSON.stringify(payload.post));
        setPost(payload.post);
      } catch {
        // Keep stale detail visible when API fails.
      }
    }

    async function refreshList() {
      try {
        const response = await fetch("/api/blog-posts", { cache: "no-store" });
        if (!response.ok) return;

        const payload = (await response.json()) as { posts?: NewsPost[] };
        if (!isMounted || !Array.isArray(payload.posts) || payload.posts.length === 0) return;

        memoryListCache = payload.posts;
        localStorage.setItem(BLOG_LIST_CACHE_KEY, JSON.stringify(payload.posts));
        setAllPosts(payload.posts);
      } catch {
        // Keep stale listing visible when API fails.
      }
    }

    refreshDetail();
    refreshList();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (!post) {
    return (
      <section className="bg-[#fffaf1] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl border border-[#efe6da] bg-white p-8 text-center text-slate-600 shadow-card">
            Post not available right now. Please try again shortly.
          </div>
        </div>
      </section>
    );
  }

  const postsForLayout =
    allPosts.length > 0
      ? allPosts
      : [post];

  return <NewsDetailContent post={post} allPosts={postsForLayout} />;
}
