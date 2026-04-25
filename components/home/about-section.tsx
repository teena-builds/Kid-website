import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Play } from "lucide-react";
import { aboutShowcase } from "@/data/home-data";
import { Reveal } from "@/components/ui/reveal";
import { AboutArtCanvas } from "./about-art-canvas";
import { FloatingScribble } from "./floating-scribble";

export function AboutSection() {
  return (
    <section id="why-choose-us" className="scroll-mt-32 bg-[#ffffff] py-20 lg:py-28">
      <span id="about" className="block scroll-mt-32" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[48%_52%] lg:items-center lg:gap-14 lg:px-8">
        <Reveal className="relative">
          {/* Canvas blobs add premium abstract depth without heavy runtime cost. */}
          <div className="relative">
            <div className="relative aspect-[10/8] overflow-hidden rounded-[58%_42%_55%_45%/47%_57%_43%_53%] shadow-soft ring-1 ring-white/80">
              <AboutArtCanvas
                variant="blob"
                className="absolute inset-0 -z-10 h-full w-full"
              />
              <Image
                src={aboutShowcase.image}
                alt={aboutShowcase.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
            <FloatingScribble className="pointer-events-none absolute -bottom-11 right-2 h-24 w-44">
              <AboutArtCanvas variant="scribble" className="h-full w-full" />
            </FloatingScribble>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="text-5xl leading-[1.08] text-[#1b1f25] sm:text-6xl">
            {aboutShowcase.heading}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            {aboutShowcase.description}
          </p>

          <div className="mt-7 rounded-[1.7rem] bg-[#14b7b1] p-4 text-white shadow-soft">
            {/* Single connected stats strip with separators for a premium metric bar. */}
            <div className="grid gap-3 sm:grid-cols-3 sm:divide-x sm:divide-white/30">
              {aboutShowcase.stats.map((stat) => (
                <div key={stat.label} className="px-3 py-1.5">
                  <p className="text-5xl leading-none">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-white/95">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <ul className="mt-7 space-y-3">
            {aboutShowcase.bullets.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-700">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#d8f4f2] text-[#14b7b1]">
                  <ChevronRight className="h-4 w-4" />
                </span>
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              href={aboutShowcase.primaryCta.href}
              className="inline-flex rounded-full bg-[var(--btn-color)] px-8 py-3 text-lg text-white shadow-[0_14px_32px_-20px_rgba(248,154,31,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--btn-color-hover)] hover:shadow-[0_18px_34px_-20px_rgba(248,154,31,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f89a1f]"
            >
              {aboutShowcase.primaryCta.label}
            </Link>

            <Link
              href={aboutShowcase.videoCta.href}
              aria-label={aboutShowcase.videoCta.label}
              className="group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14b7b1]"
            >
              <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#f0c689] bg-white text-[#f89a1f] transition-transform duration-300 group-hover:scale-[1.04]">
                <span className="absolute inset-[-8px] rounded-full border border-[#f5d7aa]" />
                <span className="absolute inset-[-16px] rounded-full border border-[#f7e5c8]" />
                <Play className="h-5 w-5 fill-current" />
              </span>
              <span className="text-lg text-[#4c5563]">
                {aboutShowcase.videoCta.label}
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
