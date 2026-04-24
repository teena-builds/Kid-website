import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featureCards } from "@/data/home-data";
import { Reveal } from "@/components/ui/reveal";

export function FeatureCards() {
  const featuredIndex = Math.floor(featureCards.length / 2);

  return (
    <section className="mt-16 pb-20 lg:mt-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-coral">
            Our Offerings
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-4xl text-brand-ink sm:text-5xl">
            Fun Ways To Learn
          </h2>
          <p className="mt-3 text-slate-600">
            Multi-level programs crafted for joyful learning, confidence, and
            early childhood development.
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3 lg:items-end">
          {featureCards.map((item, index) => {
            const isFeatured = index === featuredIndex;

            return (
              <Reveal key={item.title} delay={index * 0.08}>
                <article
                  className={`group relative overflow-hidden rounded-[2rem] border p-7 transition-all duration-300 ease-out ${
                    isFeatured
                      ? "lg:-translate-y-5 border-white/50 bg-gradient-to-br from-[#22bdb7] via-[#18b4ae] to-[#0ea39d] text-white shadow-[0_28px_60px_-34px_rgba(12,127,123,0.75)] lg:hover:-translate-y-8 lg:hover:scale-[1.02] lg:hover:shadow-[0_34px_74px_-34px_rgba(12,127,123,0.85)]"
                      : "border-[#f0d8cf] bg-gradient-to-br text-brand-ink shadow-[0_20px_48px_-36px_rgba(32,48,58,0.4)] hover:-translate-y-2 hover:shadow-[0_24px_52px_-34px_rgba(32,48,58,0.5)]"
                  } ${item.color}`}
                >
                  {/* Decorative layers keep cards from feeling flat/template-like. */}
                  <div
                    className={`pointer-events-none absolute -right-7 -top-7 h-28 w-28 rounded-full blur-xl ${
                      isFeatured ? "bg-white/25" : "bg-white/60"
                    }`}
                  />
                  <div
                    className={`pointer-events-none absolute -bottom-10 -left-8 h-24 w-24 rounded-full blur-2xl ${
                      isFeatured ? "bg-black/10" : "bg-brand-mustard/25"
                    }`}
                  />

                  <span
                    className={`relative inline-flex h-24 w-24 items-center justify-center rounded-full ${
                      isFeatured ? "bg-[#ffa31f] text-white" : "bg-white text-brand-ink"
                    }`}
                  >
                    <item.icon
                      className={`h-10 w-10 transition-transform duration-300 ${
                        isFeatured ? "group-hover:-translate-y-0.5" : "group-hover:-translate-y-1"
                      }`}
                    />
                  </span>

                  <h3
                    className={`mt-8 font-[var(--font-display)] text-[2rem] leading-tight ${
                      isFeatured ? "text-white" : "text-brand-ink"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-3 text-lg leading-relaxed ${
                      isFeatured ? "text-white/90" : "text-slate-600"
                    }`}
                  >
                    {item.description}
                  </p>

                  <Link
                    href={item.href}
                    className={`mt-7 inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 ${
                      isFeatured
                        ? "border-white/75 text-white hover:bg-white hover:text-[#0c7f7b] focus-visible:ring-white"
                        : "border-[#f5a146] bg-white text-brand-ink hover:border-brand-coral hover:text-brand-coral focus-visible:ring-brand-coral"
                    }`}
                  >
                    View Details <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
