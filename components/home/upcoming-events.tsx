import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { upcomingEvents } from "@/data/home-data";
import { Reveal } from "@/components/ui/reveal";

export function UpcomingEvents() {
  return (
    <section id="events" className="section-surface bg-[#fff8f3] py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-coral">
            Upcoming Events
          </p>
          <h2 className="mt-3 text-4xl text-brand-ink sm:text-5xl">
            Discover what&apos;s happening this month.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {upcomingEvents.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.07}>
              <article className="rounded-[1.75rem] bg-white p-6 shadow-card ring-1 ring-slate-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-soft">
                <p className="inline-flex items-center gap-2 rounded-full bg-brand-cream px-3 py-1 text-xs uppercase tracking-wide text-brand-coral">
                  <Calendar className="h-3.5 w-3.5" /> {item.date}
                </p>
                <h3 className="mt-4 text-3xl leading-tight text-brand-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-brand-sky">{item.ageGroup}</p>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                <Link
                  href="#cta"
                  className="mt-5 inline-flex items-center gap-2 text-sm text-brand-ink hover:text-brand-coral"
                >
                  Reserve Spot <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
