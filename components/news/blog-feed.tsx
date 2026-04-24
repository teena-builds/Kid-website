"use client";

import { useEffect, useMemo, useState } from "react";
import { BlogCard } from "@/components/news/blog-card";
import { BlogPagination } from "@/components/news/blog-pagination";
import { BlogToolbar } from "@/components/news/blog-toolbar";
import type { NewsCategory, NewsPost } from "@/data/news-data";
import { Reveal } from "@/components/ui/reveal";

const ITEMS_PER_PAGE = 6;
const BLOG_LIST_CACHE_KEY = "blog-posts:v1";
let memoryPostsCache: NewsPost[] | null = null;

type BlogFeedProps = {
  initialPosts: NewsPost[];
};

export function BlogFeed({ initialPosts }: BlogFeedProps) {
  const [posts, setPosts] = useState<NewsPost[]>(initialPosts);
  const [loading, setLoading] = useState(initialPosts.length === 0);
  const [keyword, setKeyword] = useState("");
  const [activeCategory, setActiveCategory] = useState<NewsCategory>("All");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (initialPosts.length > 0) {
      setLoading(false);
      memoryPostsCache = initialPosts;
      localStorage.setItem(BLOG_LIST_CACHE_KEY, JSON.stringify(initialPosts));
      return;
    }

    if (memoryPostsCache && memoryPostsCache.length > 0) {
      setPosts(memoryPostsCache);
      setLoading(false);
      return;
    }

    const cachedRaw = localStorage.getItem(BLOG_LIST_CACHE_KEY);
    if (!cachedRaw) return;

    try {
      const cachedPosts = JSON.parse(cachedRaw) as NewsPost[];
      if (Array.isArray(cachedPosts) && cachedPosts.length > 0) {
        memoryPostsCache = cachedPosts;
        setPosts(cachedPosts);
        setLoading(false);
      }
    } catch {
      // Ignore invalid cache payload and continue.
    }
  }, [initialPosts]);

  useEffect(() => {
    let isMounted = true;

    async function refreshPosts() {
      try {
        const response = await fetch("/api/blog-posts", { cache: "no-store" });
        if (!response.ok) return;

        const payload = (await response.json()) as { posts?: NewsPost[] };
        if (!isMounted || !Array.isArray(payload.posts) || payload.posts.length === 0) return;

        memoryPostsCache = payload.posts;
        localStorage.setItem(BLOG_LIST_CACHE_KEY, JSON.stringify(payload.posts));
        setPosts(payload.posts);
      } catch {
        // Keep stale data visible on network/API failure.
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    refreshPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPosts = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    return posts.filter((post) => {
      const postCategorySet = new Set([
        post.category,
        ...post.categories
      ].filter((category) => category.trim().length > 0));
      const matchesCategory = activeCategory === "All" || postCategorySet.has(activeCategory);
      const matchesKeyword =
        normalizedKeyword.length === 0 ||
        post.title.toLowerCase().includes(normalizedKeyword) ||
        post.author.toLowerCase().includes(normalizedKeyword) ||
        Array.from(postCategorySet).some((category) =>
          category.toLowerCase().includes(normalizedKeyword)
        );

      return matchesCategory && matchesKeyword;
    });
  }, [activeCategory, keyword, posts]);

  const dynamicCategories = useMemo<NewsCategory[]>(() => {
    const wpCategories = new Set<string>();
    posts.forEach((post) => {
      post.categories.forEach((category) => {
        if (category.trim().length > 0) wpCategories.add(category.trim());
      });
    });

    if (wpCategories.size === 0) {
      posts.forEach((post) => {
        if (post.category.trim().length > 0) wpCategories.add(post.category.trim());
      });
    }

    return ["All", ...Array.from(wpCategories).sort((a, b) => a.localeCompare(b))];
  }, [posts]);

  useEffect(() => {
    if (!dynamicCategories.includes(activeCategory)) {
      setActiveCategory("All");
      setPage(1);
    }
  }, [activeCategory, dynamicCategories]);

  const hasActiveFilters = keyword.trim().length > 0 || activeCategory !== "All";

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    setPage(1);
  };

  const handleCategoryChange = (category: NewsCategory) => {
    setActiveCategory(category);
    setPage(1);
  };

  return (
    <>
      <BlogToolbar
        keyword={keyword}
        onKeywordChange={handleKeywordChange}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        categories={dynamicCategories}
      />

      <section className="bg-[#fffaf1] pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {paginatedPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {paginatedPosts.map((post, idx) => (
                <Reveal key={post.id} delay={idx * 0.05}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          ) : loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-label="Loading posts">
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <div
                  key={index}
                  className="h-[360px] animate-pulse rounded-2xl border border-[#ece4d8] bg-white shadow-card"
                >
                  <div className="h-48 bg-slate-100" />
                  <div className="space-y-4 p-5">
                    <div className="h-4 w-2/3 rounded-full bg-slate-100" />
                    <div className="h-6 w-full rounded-full bg-slate-100" />
                    <div className="h-4 w-5/6 rounded-full bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#efe6da] bg-white p-8 text-center text-slate-600 shadow-card">
              {hasActiveFilters ? "No posts found for your search." : "No posts available yet."}
            </div>
          )}

          <BlogPagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </section>
    </>
  );
}
