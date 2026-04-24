import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { eventCards } from "@/data/home-data";
import { Reveal } from "@/components/ui/reveal";

export function EventsSection() {
  return (
    <section id="events" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-coral">
            Events and Celebrations
          </p>
          <h2 className="mt-3 max-w-3xl font-[var(--font-display)] text-4xl text-brand-ink sm:text-5xl">
            Premium weekly events designed for fun, learning, and family moments.
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {eventCards.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.06}>
              <article className="group overflow-hidden rounded-[1.8rem] border border-slate-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                <div className="overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1000}
                    height={720}
                    loading={idx === 0 ? "eager" : "lazy"}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-6">
                  <p className="inline-flex items-center gap-2 rounded-full bg-[#fff5ea] px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-coral">
                    <Calendar className="h-3.5 w-3.5" /> {item.date}
                  </p>
                  <h3 className="mt-4 font-[var(--font-display)] text-3xl leading-tight text-brand-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-bold text-brand-sky">{item.ageGroup}</p>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                  <Link
                    href="#cta"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-brand-ink transition-colors hover:text-brand-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
                  >
                    Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
