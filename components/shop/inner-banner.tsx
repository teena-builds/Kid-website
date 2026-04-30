import Image from "next/image";
import Link from "next/link";

export type InnerPageBannerData = {
  title: string;
  breadcrumb: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
};

type InnerBannerProps = {
  banner: InnerPageBannerData;
};

const breadcrumbHrefByLabel: Record<string, string> = {
  Home: "/",
  About: "/about",
  "Contact Us": "/contact",
  FAQ: "/faq",
  News: "/news",
  "News Details": "/news",
  Classes: "/shop/play-group",
  "Play Group": "/shop/play-group",
  "Nursery Program": "/shop/nursery-program",
  "Junior KG": "/shop/junior-kg",
  "Senior KG": "/shop/senior-kg",
  "Activity Classes": "/shop/activity-classes",
  "Day Care": "/shop/day-care"
};

function getBreadcrumbItems(value: string) {
  return value
    .split("/")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((label) => ({
      label,
      href: breadcrumbHrefByLabel[label] ?? "/"
    }));
}

export function InnerBanner({ banner }: InnerBannerProps) {
  const breadcrumbItems = getBreadcrumbItems(banner.breadcrumb);

  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[300px] sm:min-h-[340px]">
        <Image
          src={banner.image}
          alt={banner.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-brand-teal/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-teal/85 to-brand-sky/50" />

        <div className="relative z-10 mx-auto flex min-h-[300px] max-w-7xl flex-col items-center justify-center px-6 text-center sm:min-h-[340px] lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="rounded-full border border-white/35 bg-white/10 px-4 py-1 text-sm text-white/95"
          >
            <ol className="flex flex-wrap items-center justify-center gap-1.5">
              {breadcrumbItems.map((item, index) => (
                <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  <Link
                    href={item.href}
                    className="rounded-full px-1 transition-colors duration-300 hover:text-brand-mustard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="mt-5 text-3xl lg:text-5xl text-white sm:text-6xl">
            {banner.title}
          </h1>
          {banner.subtitle ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
              {banner.subtitle}
            </p>
          ) : null}
        </div>

        <span className="absolute left-[11%] top-14 h-8 w-8 rounded-full border-2 border-white/60" />
        <span className="absolute right-[14%] top-16 h-12 w-12 rounded-full border-2 border-brand-mustard/80" />
        <span className="absolute left-[18%] bottom-16 h-4 w-20 rounded-full border-2 border-white/70" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-6 bg-[#fffaf1]" />
        <svg
          viewBox="0 0 1440 120"
          className="banner-wave-slow absolute bottom-0 h-20 w-[200%] text-[#fffaf1]"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,74 C90,18 190,122 290,66 C390,10 500,118 610,62 C720,8 840,122 960,64 C1080,6 1220,116 1440,56 L1440,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
        <svg
          viewBox="0 0 1440 120"
          className="banner-wave-fast absolute bottom-0 h-16 w-[200%] text-[#fffaf1]"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,82 C70,22 170,118 250,74 C330,30 430,120 520,72 C610,24 700,116 800,70 C900,24 1010,116 1120,66 C1230,18 1320,100 1440,62 L1440,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
