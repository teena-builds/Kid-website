"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { TopBar } from "./top-bar";
import { DesktopNav } from "@/components/navigation/desktop-nav";
import { MobileMenu } from "@/components/navigation/mobile-menu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-[#f0ddd4] bg-white/95 shadow-[0_12px_35px_-28px_rgba(26,48,61,0.55)] backdrop-blur"
            : "bg-white"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
            aria-label="KidNest homepage"
          >
            {/* Replace /public/logo-kidnest.svg with your final brand mark when available. */}
            <Image
              src="/logo-kidnest.svg"
              alt="KidNest logo"
              width={44}
              height={44}
              priority
            />
            <span className="text-3xl text-brand-ink">
              KidNest
            </span>
          </Link>

          <DesktopNav />

          <div className="flex items-center gap-3">
            <Link
              href="#cta"
              className="hidden rounded-full bg-[var(--btn-color)] px-5 py-2.5 text-sm text-white shadow-soft transition-colors hover:bg-[var(--btn-color-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral lg:inline-flex"
            >
              Admission Open
            </Link>
            <button
              type="button"
              aria-label="Open mobile menu"
              onClick={() => setMobileOpen(true)}
              className="rounded-full border border-slate-200 p-2.5 text-slate-700 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
