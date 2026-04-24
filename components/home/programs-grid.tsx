import Image from "next/image";
import { programShowcaseCards } from "@/data/home-data";
import { Reveal } from "@/components/ui/reveal";

export function ProgramsGrid() {
  return (
    <section
      id="program-overview"
      className="scroll-mt-32 bg-gradient-to-r from-[#faf6ee] via-[#f5f7f3] to-[#ebf9ff] py-20 lg:py-28"
    >
      <span id="programs" className="block scroll-mt-32" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-coral">
            Programs
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-4xl text-[#171b21] sm:text-5xl">
            Our Programs
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Our multi-level kindergarten programs cater to the age group of 2-5 years
            with a curriculum focused on confidence, creativity, and joyful learning.
          </p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-7l gap-6 md:grid-cols-2 xl:grid-cols-3">
          {programShowcaseCards.map((card, idx) => (
            <Reveal key={card.title} delay={idx * 0.07}>
              <article className="group rounded-[1.7rem] bg-white p-5 shadow-[0_22px_44px_-34px_rgba(24,45,61,0.42)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_32px_58px_-32px_rgba(24,45,61,0.56)]">
                <div className="overflow-hidden rounded-[1.4rem]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={1000}
                    height={650}
                    loading={idx === 0 ? "eager" : "lazy"}
                    className="h-64 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="px-1 pb-1 pt-5">
                  <h3 className="font-[var(--font-display)] text-[2rem] leading-tight text-[#161b22] sm:text-[1.8]">
                    {card.title}
                  </h3>
                  <p className="mt-3 min-h-[3.7rem] text-base leading-relaxed text-slate-600 sm:text-lg">
                    {card.description}
                  </p>
                </div>

                {/* Unified rounded info strip with equal columns and vertical separators. */}
                <div
                  className={`mt-5 grid grid-cols-3 divide-x divide-white/35 overflow-hidden rounded-full text-white ${card.stripColor}`}
                >
                  <div className="px-3 py-4 text-center">
                    <p className="font-[var(--font-display)] text-xl leading-none">{card.age}</p>
                    <p className="mt-1 text-sm font-semibold">age</p>
                  </div>
                  <div className="px-3 py-4 text-center">
                    <p className="font-[var(--font-display)] text-xl leading-none">{card.days}</p>
                    <p className="mt-1 text-sm font-semibold">weekly</p>
                  </div>
                  <div className="px-3 py-4 text-center">
                    <p className="font-[var(--font-display)] text-xl leading-none">{card.hours}</p>
                    <p className="mt-1 text-sm font-semibold">period</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
