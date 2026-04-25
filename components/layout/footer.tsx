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
import { FooterTopWave } from "@/components/shared/footer-top-wave";
import { getAllPosts } from "@/lib/wordpress";
import type { NewsPost } from "@/data/news-data";

type FooterBlogPost = Pick<NewsPost, "id" | "slug" | "title" | "date" | "image" | "imageAlt">;

const fallbackFooterPosts: FooterBlogPost[] = [
  {
    id: "footer-kindergarten-routines",
    slug: "kindergarten-routines",
    title: "Simple routines that help preschoolers feel confident",
    date: "12 Apr 2026",
    image: "/newsletter.jpg",
    imageAlt: "Children enjoying a preschool activity"
  },
  {
    id: "footer-creative-play",
    slug: "creative-play",
    title: "Creative play ideas for growing curious young minds",
    date: "05 Apr 2026",
    image: "/newsletter.jpg",
    imageAlt: "Kids learning through creative play"
  },
  {
    id: "footer-preschool-learning",
    slug: "preschool-learning",
    title: "How playful learning builds early classroom confidence",
    date: "28 Mar 2026",
    image: "/newsletter.jpg",
    imageAlt: "Preschool children learning together"
  }
];

async function getFooterBlogPosts(): Promise<FooterBlogPost[]> {
  try {
    const posts = await getAllPosts();
    const latestPosts = posts.slice(0, 3).map(({ id, slug, title, date, image, imageAlt }) => ({
      id,
      slug,
      title,
      date,
      image,
      imageAlt
    }));

    return latestPosts.length > 0 ? latestPosts : fallbackFooterPosts;
  } catch {
    return fallbackFooterPosts;
  }
}

function FooterDecorations() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <svg
        viewBox="0 0 640 520"
        className="absolute bottom-0 left-0 h-auto w-[58%] min-w-[360px] -translate-x-[20%] translate-y-[30%] opacity-[0.16]"
        fill="none"
      >
        <path d="M58 514C58 263 262 59 513 59" stroke="#f5a999" strokeWidth="42" strokeLinecap="round" />
        <path d="M120 514c0-217 176-393 393-393" stroke="#f4d37c" strokeWidth="42" strokeLinecap="round" />
        <path d="M182 514c0-183 148-331 331-331" stroke="#a8dccd" strokeWidth="42" strokeLinecap="round" />
        <path d="M244 514c0-148 121-269 269-269" stroke="#9ccdeb" strokeWidth="42" strokeLinecap="round" />
        <path d="M306 514c0-114 93-207 207-207" stroke="#c9b7e8" strokeWidth="42" strokeLinecap="round" />
      </svg>

      <svg viewBox="0 0 90 90" className="absolute left-[6%] top-[33%] h-20 w-20 text-[#7ebfe4] opacity-[0.22]" fill="none">
        <circle cx="45" cy="45" r="8" fill="currentColor" />
        <path d="M45 10c10 10 10 25 0 35-10-10-10-25 0-35Z" fill="currentColor" />
        <path d="M45 80c-10-10-10-25 0-35 10 10 10 25 0 35Z" fill="currentColor" />
        <path d="M10 45c10-10 25-10 35 0-10 10-25 10-35 0Z" fill="currentColor" />
        <path d="M80 45c-10 10-25 10-35 0 10-10 25-10 35 0Z" fill="currentColor" />
      </svg>

      <svg viewBox="0 0 82 82" className="absolute right-[8%] top-[34%] h-16 w-16 text-[#ee8f82] opacity-[0.22]" fill="none">
        <path d="m41 9 7 20 21 2-16 13 5 21-17-11-18 11 6-21-16-13 21-2 7-20Z" fill="currentColor" />
      </svg>

      <svg viewBox="0 0 120 76" className="absolute left-[31%] top-[28%] h-20 w-28 text-[#e9ba53] opacity-[0.2]" fill="none">
        <path d="M12 57 25 18l20 35 17-42 23 45 23-31" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <svg viewBox="0 0 78 92" className="absolute right-[18%] top-[49%] h-20 w-16 text-[#b7a0df] opacity-[0.2]" fill="none">
        <path d="M43 13v42c0 9-8 16-18 16S7 64 7 55s8-16 18-16c5 0 9 2 13 5V13h5Z" fill="currentColor" />
        <path d="M43 13c9 13 18 13 28 8v13c-10 5-19 5-28-8V13Z" fill="currentColor" />
      </svg>

      <svg viewBox="0 0 142 70" className="absolute bottom-[12%] right-[6%] h-20 w-36 text-[#ee8f82] opacity-[0.18]" fill="none">
        <path d="M8 35c18 22 38-17 58 0 16 14 6 38 31 24 15-8 25-33 39-19" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      </svg>

    
    </div>
  );
}

export async function Footer() {
  const latestPosts = await getFooterBlogPosts();

  return (
    <footer id="footer" className="relative overflow-hidden bg-white pt-44 sm:pt-52 lg:pt-60">
      <div className="absolute inset-0 bg-[#fdebd5] -rotate-180" />
      <FooterTopWave />
      <FooterDecorations />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-10 lg:px-8">
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

          <h2 className="relative z-10 text-4xl text-white sm:text-5xl">
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
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[var(--btn-color)] px-7 text-base text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--btn-color-hover)] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
                <span className="block text-4xl leading-none text-brand-ink">
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
            <h4 className="text-lg text-brand-ink">
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
            <h4 className="text-lg text-brand-ink">
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

          <div>
            <h4 className="text-lg text-brand-ink">
              Latest Blog
            </h4>
            <div className="mt-5 space-y-4">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/news/${post.slug}`}
                  className="group flex items-start gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
                >
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white shadow-sm">
                    <Image
                      src={post.image || "/newsletter.jpg"}
                      alt={post.imageAlt}
                      fill
                      sizes="64px"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="line-clamp-2 text-sm leading-snug text-slate-600 transition-colors duration-300 group-hover:text-brand-teal">
                      {post.title}
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      {post.date}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
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
