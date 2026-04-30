"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { InnerBanner } from "@/components/shop/inner-banner";
import { faqBanner, faqItems } from "@/data/faq-data";

export function FaqPageContent() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <InnerBanner banner={faqBanner} />

      <section className="section-surface relative overflow-hidden bg-[#fffaf1] py-16 sm:py-20 lg:py-24">
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Parent Help Center
            </p>
            <h2 className="mt-3 text-4xl leading-tight text-brand-ink sm:text-5xl">
              Everything Parents Ask Before Joining
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Clear, friendly answers about admissions, classrooms, safety, and daily life at KidNest.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const triggerId = `faq-trigger-${index}`;

              return (
                <article
                  key={item.question}
                  className="overflow-hidden rounded-xl border border-brand-teal/18 bg-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-teal/35"
                >
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-brand-ink transition-colors duration-300 hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-6"
                  >
                    <span className="text-lg font-semibold leading-snug sm:text-xl">
                      {item.question}
                    </span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-cream text-brand-teal transition-colors duration-300">
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-5 w-5 transition-transform duration-300 ease-in-out ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-base leading-relaxed text-slate-600 sm:px-6 sm:pb-6">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12 rounded-xl border border-brand-teal/20 bg-white px-6 py-8 text-center shadow-soft sm:px-10">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-teal/12 text-brand-teal">
              <MessageCircleQuestion className="h-7 w-7" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-3xl text-brand-ink">
              Still have questions?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-600">
              Our team is happy to help you choose the right program and understand the next steps.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--btn-color)] px-7 py-3 text-base font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--btn-color-hover)] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:ring-offset-2"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
