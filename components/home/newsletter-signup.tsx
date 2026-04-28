import { Reveal } from "@/components/ui/reveal";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";

export function NewsletterSignup() {
  return (
    <section className="pb-10 pt-20 lg:pt-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-white/90 bg-gradient-to-br from-[#fff8ef] via-white to-[#eef8ff] p-8 shadow-card lg:p-10">
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-lavender/25 blur-xl" />
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-coral">
                Newsletter
              </p>
              <h2 className="mt-3 text-4xl text-brand-ink sm:text-5xl">
                Get events, tips, and early program updates.
              </h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                Receive a monthly digest tailored for parents, including upcoming
                workshops, seasonal activities, and family offers.
              </p>
            </div>
            <NewsletterForm
              formClassName="relative flex flex-col gap-3 sm:flex-row"
              inputId="newsletter-email"
              placeholder="Enter your email"
              inputClassName="h-12 flex-1 rounded-full border border-slate-300 px-5 text-sm outline-none transition focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/35 disabled:cursor-not-allowed disabled:opacity-70"
              buttonClassName="h-12 rounded-full bg-[var(--btn-color)] px-6 text-sm text-white transition-colors hover:bg-[var(--btn-color-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink disabled:cursor-not-allowed disabled:opacity-70"
              buttonLabel="Subscribe"
              ariaLabel="Newsletter signup"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
