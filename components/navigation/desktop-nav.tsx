"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  eventsMenu,
  primaryNavItems,
  programsMenu
} from "@/lib/navigation-data";
import { MegaMenu } from "./mega-menu";

type MenuType = "programs" | "events" | "shop" | null;

const SIMPLE_DROPDOWNS = {
  programs: programsMenu,
  events: eventsMenu
};

export function DesktopNav() {
  const [openMenu, setOpenMenu] = useState<MenuType>(null);
  const [focusedTrigger, setFocusedTrigger] = useState<HTMLButtonElement | null>(
    null
  );
  const navRef = useRef<HTMLUListElement>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const shopPanelId = "shop-panel";

  const clearTimer = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  const scheduleClose = () => {
    clearTimer();
    closeTimeout.current = setTimeout(() => setOpenMenu(null), 140);
  };

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        navRef.current &&
        event.target instanceof Node &&
        !navRef.current.contains(event.target)
      ) {
        setOpenMenu(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        focusedTrigger?.focus();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      clearTimer();
    };
  }, [focusedTrigger]);

  return (
    <ul
      ref={navRef}
      className="relative hidden items-center gap-1 lg:flex"
      onMouseLeave={scheduleClose}
      onMouseEnter={clearTimer}
      aria-label="Main navigation"
    >
      {primaryNavItems.map((item) => {
        if (!item.menu) {
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className="rounded-full px-4 py-2.5 font-medium text-[16px] text-brand-ink transition-colors hover:text-brand-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
              >
                {item.label}
              </Link>
            </li>
          );
        }

        const isOpen = openMenu === item.menu;
        const panelId = item.menu === "shop" ? shopPanelId : `${item.menu}-panel`;

        return (
          <li key={item.label} className="relative">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              aria-haspopup="menu"
              onMouseEnter={() => setOpenMenu(item.menu)}
              onFocus={(event) => {
                setFocusedTrigger(event.currentTarget);
                setOpenMenu(item.menu);
              }}
              onClick={() => setOpenMenu(isOpen ? null : item.menu)}
              className="inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-[16px] text-brand-ink transition-colors hover:text-brand-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
            >
              {item.label}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isOpen && item.menu !== "shop" && (
                <motion.div
                  id={panelId}
                  role="menu"
                  aria-label={`${item.label} menu`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-0 top-full z-50 mt-4 min-w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-soft"
                >
                  {SIMPLE_DROPDOWNS[item.menu].map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      role="menuitem"
                      onClick={() => setOpenMenu(null)}
                      className="block rounded-xl font-medium px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-brand-cream hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
                    >
                      {child.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

          </li>
        );
      })}

      <AnimatePresence>
        {openMenu === "shop" && (
          // Desktop-only alignment: anchor mega menu to nav container center, not trigger edge.
          <MegaMenu
            panelId={shopPanelId}
            onClose={() => setOpenMenu(null)}
            className="top-full"
          />
        )}
      </AnimatePresence>
    </ul>
  );
}
