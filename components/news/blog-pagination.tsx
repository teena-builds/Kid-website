"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type BlogPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function BlogPagination({ page, totalPages, onPageChange }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#edf1f4] text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e3e9ee] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {Array.from({ length: totalPages }).map((_, idx) => {
        const pageNumber = idx + 1;
        const isActive = pageNumber === page;

        return (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal ${
              isActive
                ? "bg-brand-teal text-white"
                : "bg-[#edf1f4] text-slate-700 hover:-translate-y-0.5 hover:bg-[#e3e9ee]"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Next page"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#edf1f4] text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e3e9ee] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
