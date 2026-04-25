"use client";

import { Search } from "lucide-react";
import type { NewsCategory } from "@/data/news-data";

type BlogToolbarProps = {
  keyword: string;
  onKeywordChange: (value: string) => void;
  activeCategory: NewsCategory;
  onCategoryChange: (category: NewsCategory) => void;
  categories: NewsCategory[];
};

export function BlogToolbar({
  keyword,
  onKeywordChange,
  activeCategory,
  onCategoryChange,
  categories
}: BlogToolbarProps) {
  return (
    <section className="bg-[#fffaf1] pb-10 pt-14 lg:pt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 rounded-3xl bg-[#f4fbfa] p-6 shadow-card lg:grid-cols-[35%_60%] lg:items-end lg:gap-10 lg:p-8">
          <div>
            <h2 className="text-sm uppercase tracking-[0.14em] text-brand-ink">
              Search by Keyword
            </h2>
            <div className="mt-3 flex items-center overflow-hidden rounded-2xl border border-[#e4ddd3] bg-white shadow-sm">
              <label htmlFor="news-search" className="sr-only">
                Search news posts
              </label>
              <input
                id="news-search"
                type="text"
                value={keyword}
                onChange={(event) => onKeywordChange(event.target.value)}
                placeholder="Type here..."
                className="h-12 w-full px-4 text-base text-brand-ink placeholder:text-slate-500 outline-none"
              />
              <button
                type="button"
                aria-label="Search posts"
                className="m-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--btn-color)] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--btn-color-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-sm uppercase tracking-[0.14em] text-brand-ink">
              By Category
            </h2>
            <div className="mt-3 flex flex-wrap gap-2 rounded-2xl border border-[#e4ddd3] bg-white p-2">
              {categories.map((category) => {
                const isActive = category === activeCategory;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => onCategoryChange(category)}
                    aria-pressed={isActive}
                    className={`rounded-full px-4 py-2 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal ${
                      isActive
                        ? "bg-[#dcf6f4] text-brand-teal"
                        : "bg-white text-slate-600 hover:bg-[#eef9f8] hover:text-brand-teal"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
