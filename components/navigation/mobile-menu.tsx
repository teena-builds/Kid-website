"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import {
  primaryNavItems,
  programsMenu,
  shopMegaMenuColumns
} from "@/lib/navigation-data";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

type AccordionKey = "programs" | "shop" | null;

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [activeAccordion, setActiveAccordion] = useState<AccordionKey>(null);

  useEffect(() => {
    // Drawer can always be dismissed quickly via Escape for better accessibility.
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu overlay"
            className="fixed inset-0 z-50 bg-brand-ink/35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed right-0 top-0 z-[60] h-full w-[88vw] max-w-md overflow-y-auto bg-white p-6"
          >
            <div className="mb-7 flex items-center justify-between">
              <p className="font-[var(--font-display)] text-2xl font-bold text-brand-ink">
                KidNest Menu
              </p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-slate-200 p-2 text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="space-y-1">
              {primaryNavItems.map((item) => {
                if (!item.menu) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className="block rounded-2xl px-4 py-3 text-base font-normal text-brand-ink transition-colors hover:bg-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
                    >
                      {item.label}
                    </Link>
                  );
                }

                const isOpen = activeAccordion === item.menu;
                return (
                  <div key={item.label} className="rounded-2xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveAccordion(isOpen ? null : (item.menu as AccordionKey))
                      }
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between px-4 py-3 text-left font-normal text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden border-t border-slate-200 bg-brand-cream/45"
                        >
                          <div className="space-y-2 p-3">
                            {item.menu === "programs" &&
                              programsMenu.map((sub) => (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  onClick={onClose}
                                  className="block rounded-xl bg-white px-3 py-2 text-sm font-normal text-slate-700"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            {item.menu === "shop" && (
                              // Mobile keeps the same category grouping as desktop mega menu.
                              <div className="grid gap-2">
                                {shopMegaMenuColumns.flat().map((sub) => (
                                  <Link
                                    key={sub.id}
                                    href={sub.href}
                                    onClick={onClose}
                                    className="rounded-xl bg-white px-3 py-2.5"
                                  >
                                    <span className="block text-sm font-normal text-brand-ink">
                                      {sub.id} {sub.title}
                                    </span>
                                    <span className="block text-xs text-slate-600">
                                      {sub.subtitle}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <Link
              href="#cta"
              onClick={onClose}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-brand-coral px-5 py-3 text-sm font-extrabold text-white shadow-soft transition-colors hover:bg-[#e96f5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral"
            >
              Admission Open
            </Link>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
