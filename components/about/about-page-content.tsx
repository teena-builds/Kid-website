import Image from "next/image";
import Link from "next/link";
import { Award, BadgeCheck, Clock3, ShieldCheck, Sparkles, Users2 } from "lucide-react";
import { InnerBanner } from "@/components/shop/inner-banner";
import { Reveal } from "@/components/ui/reveal";
import { Testimonials } from "@/components/home/testimonials";
import {
  aboutBanner,
  aboutIntro,
  aboutStats,
  friendlyAtmosphere,
  teachers,
  whyBestFeatures
} from "@/data/about-page-data";
import { AboutArtCanvas } from "@/components/home/about-art-canvas";

function SectionHeading({
  label,
  title,
  description,
  labelClassName,
  titleClassName,
  descriptionClassName
}: {
  label: string;
  title: string;
  description: string;
  labelClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p
        className={`text-sm uppercase tracking-[0.16em] text-brand-coral ${labelClassName ?? ""}`}
      >
        {label}
      </p>
      <h2
        className={`mt-3 text-5xl text-brand-ink sm:text-6xl ${titleClassName ?? ""}`}
      >
        {title}
      </h2>
      <p className={`mt-3 text-lg leading-relaxed text-slate-600 ${descriptionClassName ?? ""}`}>
        {description}
      </p>
    </div>
  );
}

function AboutIntroSplit() {
  return (
    <section className="bg-[#f5f5f3] py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[48%_52%] lg:items-center lg:gap-14 lg:px-8">
        <Reveal className="relative">
          <div className="relative aspect-[10/8] overflow-hidden rounded-[58%_42%_55%_45%/47%_57%_43%_53%] shadow-soft ring-1 ring-white/80">
            <AboutArtCanvas
              variant="blob"
              className="absolute inset-0 -z-10 h-full w-full"
            />
            <Image
              src={aboutIntro.image}
              alt={aboutIntro.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
          <div className="absolute -bottom-10 right-3 h-24 w-44">
            <AboutArtCanvas variant="scribble" className="h-full w-full" />
          </div>
        </Reveal>

        <Reveal>
          <h2 className="text-5xl leading-[1.08] text-brand-ink sm:text-6xl">
            {aboutIntro.heading}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            {aboutIntro.description}
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            {aboutIntro.supporting}
          </p>

          <ul className="mt-7 space-y-3">
            {aboutIntro.bullets.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-700">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#d8f4f2] text-[#14b7b1]">
                  <BadgeCheck className="h-4 w-4" />
                </span>
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href={aboutIntro.primaryCta.href}
              className="inline-flex rounded-full bg-[var(--btn-color)] px-8 py-3 text-lg text-white shadow-[0_14px_32px_-20px_rgba(248,154,31,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--btn-color-hover)] hover:shadow-[0_18px_34px_-20px_rgba(248,154,31,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f89a1f]"
            >
              {aboutIntro.primaryCta.label}
            </Link>
            <p className="rounded-full border border-[#f1d8bb] bg-white px-4 py-2 text-sm text-slate-600">
              {aboutIntro.secondaryLabel}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhyBestSection() {
  const icons = [Sparkles, ShieldCheck, Clock3, Users2];

  return (
    <section className="relative overflow-hidden bg-[#17bdb6] py-20 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            label="Why Choose Us"
            title="Why KidNest Best"
            description="Parents trust us for safe routines, caring guidance, and a smooth day-to-day experience."
            labelClassName="text-white/90"
            titleClassName="text-white"
            descriptionClassName="text-white/85"
          />
        </Reveal>

        <div className="mt-12 rounded-3xl border border-white/30 bg-white/10 p-3 backdrop-blur-sm">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {whyBestFeatures.map((item, idx) => {
              const Icon = icons[idx];

              return (
                <Reveal key={item.title} delay={idx * 0.06}>
                  <article className="h-full rounded-3xl bg-white/95 p-6 text-center text-brand-ink shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                    <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dbf8f6] text-brand-teal">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="mt-4 text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 overflow-hidden">
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
      </div>
    </section>
  );
}

function FriendlyAtmosphereSection() {
  return (
    <section className="bg-[#fffaf1] py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[52%_48%] lg:items-center lg:gap-14 lg:px-8">
        <Reveal>
          <h2 className="text-5xl leading-[1.08] text-brand-ink sm:text-6xl">
            {friendlyAtmosphere.heading}
          </h2>
          {friendlyAtmosphere.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-lg leading-relaxed text-slate-600">
              {paragraph}
            </p>
          ))}

          <div className="mt-8 flex flex-wrap gap-3">
            {friendlyAtmosphere.pills.map((pill) => (
              <div
                key={pill}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#eaf8f7] px-4 py-2.5 text-sm text-brand-ink shadow-card"
              >
                <Sparkles className="h-4 w-4 text-brand-coral" />
                {pill}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="relative">
          <div className="relative aspect-[10/8] overflow-hidden rounded-[43%_57%_54%_46%/54%_45%_55%_46%] shadow-soft ring-1 ring-white/90">
            <Image
              src={friendlyAtmosphere.image}
              alt={friendlyAtmosphere.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
          <div className="absolute -bottom-10 left-3 h-24 w-44">
            <AboutArtCanvas variant="scribble" className="h-full w-full" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TeachersAndStatsSection() {
  return (
    <section className="bg-[#fff8ef] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            label="Our Team"
            title="Our Best Teachers"
            description="Experienced and joyful educators who nurture confidence, creativity, and kindness in every child."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {teachers.map((teacher, idx) => (
            <Reveal key={teacher.name} delay={idx * 0.07}>
              <article className="group overflow-hidden rounded-3xl bg-white p-5 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                <div className="relative mx-auto h-64 w-full overflow-hidden rounded-2xl">
                  <Image
                    src={teacher.image}
                    alt={teacher.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 text-3xl text-brand-ink">
                  {teacher.name}
                </h3>
                <p className="mt-1 text-base text-slate-600">{teacher.role}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {aboutStats.map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 0.05}>
              <article className="rounded-2xl bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#e3f8f6] text-brand-teal">
                  {idx === 0 && <Clock3 className="h-5 w-5" />}
                  {idx === 1 && <Users2 className="h-5 w-5" />}
                  {idx === 2 && <Award className="h-5 w-5" />}
                </div>
                <p className="mt-4 text-5xl text-brand-ink">
                  {stat.value}
                </p>
                <p className="mt-1 text-base text-slate-600">{stat.label}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutPageContent() {
  return (
    <>
      <InnerBanner banner={aboutBanner} />
      <AboutIntroSplit />
      <WhyBestSection />
      <FriendlyAtmosphereSection />
      <Testimonials />
      <TeachersAndStatsSection />
    </>
  );
}
