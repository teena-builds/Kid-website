import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";

export function CtaBand() {
  return (
    <section id="admission-details" className="scroll-mt-32 relative isolate overflow-hidden">
      <span id="cta" className="block scroll-mt-32" aria-hidden="true" />
      <div className="relative min-h-[360px] sm:min-h-[420px]">
        <Image
          src="https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Children running and playing together"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-brand-teal/80" />

        <Reveal className="relative z-10 flex min-h-[360px] items-center justify-center px-6 py-20 text-center sm:min-h-[420px] lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-[var(--font-display)] text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl">
              Join Our New Session
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
              Kindedo believes that good questions drive great answers. Whether
              it&apos;s a query about the world around us or a challenge.
            </p>
            <Link
              href="#newsletter"
              className="mt-8 inline-flex rounded-full bg-brand-coral px-9 py-3.5 text-base font-medium text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-brand-coral/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-teal"
            >
              Apply Now
            </Link>
          </div>
        </Reveal>

        <svg
          className="pointer-events-none absolute left-[8%] top-1/3 hidden h-16 w-16 text-white/85 md:block"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8 38c8 8 16 2 16-6s8-10 12-4"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className="pointer-events-none absolute right-[8%] top-2/3 hidden h-20 w-20 -translate-y-1/2 text-white/85 md:block"
          viewBox="0 0 72 72"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8 45c10 10 18 0 18-8s8-12 14-6"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="h-1.5 w-full bg-brand-orange" aria-hidden="true" />
    </section>
  );
}
