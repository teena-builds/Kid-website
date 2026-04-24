import { themeParties } from "@/data/home-data";
import { Reveal } from "@/components/ui/reveal";

export function ThemeParties() {
  return (
    <section
      id="theme-activities"
      className="section-surface scroll-mt-32 overflow-hidden bg-[#f8fcff] py-20 lg:py-28"
    >
      <span id="theme-parties" className="block scroll-mt-32" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-coral">
            Theme Parties and Events
          </p>
          <h2 className="mt-3 max-w-3xl font-[var(--font-display)] text-4xl leading-tight text-brand-ink sm:text-5xl">
            Curated celebrations designed for laughter, movement, and memorable fun.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {themeParties.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.06}>
              <article className="group rounded-[1.75rem] border border-white/80 bg-gradient-to-b from-white to-[#f9f5ff] p-6 shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-soft">
                <span className="inline-flex rounded-2xl bg-white p-3 shadow-sm">
                  <item.icon className="h-6 w-6 text-brand-ink" />
                </span>
                <h3 className="mt-4 font-[var(--font-display)] text-2xl text-brand-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
