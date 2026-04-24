import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Youtube
} from "lucide-react";
import { footerContact, footerLinks } from "@/data/home-data";

export function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[linear-gradient(100.88deg,#EBFFFE_0.6%,#FFF6EB)] -rotate-180" />

      <div className="relative mx-auto max-w-7xl px-6 pb-10 lg:px-8">
        {/* Floating newsletter card to create the premium layered footer composition. */}
        <section
          id="newsletter"
          className="relative -mt-10 overflow-hidden rounded-[2rem] px-6 py-12 text-center shadow-soft sm:px-10 lg:px-16 lg:py-14"
        >
          <Image
            src="/newsletter.jpg"
            alt=""
            fill
            aria-hidden="true"
            className="object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-[#14bdb6]/80" />
          <div className="pointer-events-none absolute -left-12 top-10 h-44 w-44 rounded-full bg-white/8 blur-xl" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 h-28 w-28 rounded-[2rem] bg-white/10" />

          <h2 className="relative z-10 font-[var(--font-display)] text-4xl font-semibold text-white sm:text-5xl">
            Join Our Newsletter
          </h2>
          <p className="relative z-10 mx-auto mt-3 max-w-2xl text-base text-white/85 sm:text-lg">
            Subscribe our newsletter to get our latest update and news.
          </p>

          <form
            className="relative z-10 mx-auto mt-8 flex w-full max-w-2xl flex-col items-center gap-3 sm:flex-row"
            aria-label="Newsletter subscription"
          >
            <label htmlFor="footer-newsletter-email" className="sr-only">
              Your email
            </label>
            <input
              id="footer-newsletter-email"
              type="email"
              required
              placeholder="Your email"
              className="h-14 w-full rounded-full border border-transparent bg-white px-6 text-base text-brand-ink placeholder:text-slate-500 outline-none transition focus-visible:ring-2 focus-visible:ring-white/80"
            />
            <button
              type="submit"
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#f79a1e] px-7 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ee8f14] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white w-[40%]"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Subscribe Now
            </button>
          </form>
        </section>

        <div className="grid gap-10 px-1 pb-4 pt-14 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
          <div>
            <Link
              href="/"
              aria-label="KidNest home"
              className="inline-flex items-center gap-2"
            >
              <Image
                src="/logo-kidnest.svg"
                alt="KidNest logo"
                width={44}
                height={44}
              />
              <span>
                <span className="block font-[var(--font-display)] text-4xl font-semibold leading-none text-brand-ink">
                  KidNest
                </span>
                <span className="text-sm text-slate-600">Best School</span>
              </span>
            </Link>

            <p className="mt-6 max-w-xs text-base leading-relaxed text-slate-600">
              In our adult participation programs, for most students, it is
              their first program in Kindedo.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {[
                { href: "#", label: "Facebook", icon: Facebook },
                { href: "#", label: "Twitter", icon: Twitter },
                { href: "#", label: "YouTube", icon: Youtube }
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#14bdb6] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0faea8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-[var(--font-display)] text-lg font-semibold text-brand-ink">
              Quick links
            </h4>
            <ul className="mt-5 space-y-3">
              {footerLinks.quick.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base text-slate-600 transition-colors duration-300 hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-[var(--font-display)] text-lg font-semibold text-brand-ink">
              Programs
            </h4>
            <ul className="mt-5 space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base text-slate-600 transition-colors duration-300 hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-[var(--font-display)] text-lg font-semibold text-brand-ink">
              Contact Us
            </h4>
            <ul className="mt-5 space-y-4 text-base text-slate-600">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-teal" />
                <span>{footerContact.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-brand-teal" />
                <a
                  href={`tel:${footerContact.phone}`}
                  className="transition-colors hover:text-brand-teal"
                >
                  {footerContact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-brand-teal" />
                <a
                  href={`mailto:${footerContact.email}`}
                  className="transition-colors hover:text-brand-teal"
                >
                  {footerContact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-300/70 py-5">
          <div className="flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>(c) 2026 Kindedo. All rights reserved.</p>
            <Link href="#" className="transition-colors hover:text-brand-teal">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
