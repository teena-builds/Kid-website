"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type TocHeading = {
  id: string;
  text: string;
};

type TocNavProps = {
  headings: TocHeading[];
};

export function TocNav({ headings }: TocNavProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");
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

  return (
    <div className="rounded-2xl border border-[#ece3d6] bg-white p-5 shadow-card">
      <h3 className="font-[var(--font-display)] text-2xl text-brand-ink">Table of Contents</h3>
      <nav className="mt-4" aria-label="Table of contents">
        <ul className="space-y-1.5">
          {headings.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    const section = document.getElementById(item.id);
                    if (!section) return;
                    const top = section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
                    window.scrollTo({ top, behavior: "smooth" });
                    setActiveId(item.id);
                    window.history.replaceState(null, "", `#${item.id}`);
                  }}
                  className={`block line-clamp-2 rounded-lg border-l-2 px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal ${
                    isActive
                      ? "border-brand-teal bg-[#dcf6f4] font-semibold text-brand-teal"
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
