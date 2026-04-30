"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type TocHeading = {
  id: string;
  text: string;
};

type TocNavProps = {
  headings: TocHeading[];
};

export function TocNav({ headings }: TocNavProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const activeIdRef = useRef(activeId);
  const HEADER_OFFSET = 120;

  const headingIds = useMemo(() => headings.map((item) => item.id), [headings]);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    if (headingIds.length === 0) return;

    const orderedElements = headingIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (orderedElements.length === 0) return;

    let isTicking = false;
    let sectionOffsets = orderedElements.map((el) => ({
      id: el.id,
      top: el.offsetTop
    }));

    const recomputeOffsets = () => {
      sectionOffsets = orderedElements.map((el) => ({
        id: el.id,
        top: el.offsetTop
      }));
    };

    const setActiveIfNeeded = (id: string) => {
      if (id && id !== activeIdRef.current) {
        activeIdRef.current = id;
        setActiveId(id);
      }
    };

    const pickActiveFromScroll = () => {
      const marker = window.scrollY + HEADER_OFFSET + 12;
      let nextActive = sectionOffsets[0]?.id ?? "";

      for (let index = 0; index < sectionOffsets.length; index += 1) {
        if (sectionOffsets[index].top <= marker) {
          nextActive = sectionOffsets[index].id;
        } else {
          break;
        }
      }

      setActiveIfNeeded(nextActive);
    };

    const onScroll = () => {
      if (isTicking) return;
      isTicking = true;
      window.requestAnimationFrame(() => {
        pickActiveFromScroll();
        isTicking = false;
      });
    };

    const onResize = () => {
      recomputeOffsets();
      pickActiveFromScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    recomputeOffsets();
    pickActiveFromScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    };
  }, [headingIds]);

  if (headings.length === 0) return null;

  const activeHeading = headings.find((item) => item.id === activeId) ?? headings[0];

  const handleTocClick = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
    setIsMobileOpen(false);
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="rounded-2xl border border-[#ece3d6] bg-white p-5 shadow-card">
      <h3 className="text-2xl text-brand-ink">Table of Contents</h3>
      <div className="mt-4 lg:hidden">
        <button
          type="button"
          aria-expanded={isMobileOpen}
          aria-controls="mobile-table-of-contents"
          onClick={() => setIsMobileOpen((current) => !current)}
          className="flex h-12 w-full min-w-0 items-center justify-between gap-3 rounded-2xl border border-[#e4ddd3] bg-white px-4 text-left text-sm text-slate-700 shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-brand-teal"
        >
          <span className="min-w-0 truncate">{activeHeading.text}</span>
          <ChevronDown
            aria-hidden="true"
            className={`h-4 w-4 shrink-0 text-brand-teal transition-transform duration-200 ${
              isMobileOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {isMobileOpen ? (
          <div
            id="mobile-table-of-contents"
            className="mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-[#e4ddd3] bg-white p-1.5 shadow-card"
          >
            {headings.map((item) => {
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTocClick(item.id)}
                  className={`flex w-full min-w-0 items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal ${
                    isActive
                      ? "bg-[#dcf6f4] text-brand-teal"
                      : "text-slate-700 hover:bg-[#eef9f8] hover:text-brand-teal"
                  }`}
                >
                  <span className="min-w-0 truncate">{item.text}</span>
                  {isActive ? <Check aria-hidden="true" className="h-4 w-4 shrink-0" /> : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <nav className="mt-4 hidden lg:block" aria-label="Table of contents">
        <ul className="space-y-1.5">
          {headings.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleTocClick(item.id);
                  }}
                  className={`block line-clamp-2 rounded-lg border-l-2 px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal ${
                    isActive
                      ? "border-brand-teal bg-[#dcf6f4] text-brand-teal"
                      : "border-transparent text-slate-600 hover:bg-[#eef9f8] hover:text-brand-teal"
                  }`}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
