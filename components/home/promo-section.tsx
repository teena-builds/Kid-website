"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { faqSection } from "@/data/home-data";
import { Reveal } from "@/components/ui/reveal";
import { AboutArtCanvas } from "./about-art-canvas";
import { FloatingScribble } from "./floating-scribble";

export function PromoSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="learning-highlights"
      className="scroll-mt-32 bg-white py-20 lg:py-28"
      aria-label="Frequently asked questions"
    >
      <span id="promo" className="block scroll-mt-32" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14 lg:px-8">
        <Reveal className="order-2 lg:order-1">
          <h2 className="max-w-xl text-5xl leading-[1.08] text-[#171b21] sm:text-6xl">
            Know More
            <br />
            About Kindedo
          </h2>

          <div className="mt-10 space-y-4">
            {faqSection.items.map((item, index) => {
              const isOpen = index === openIndex;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-trigger-${index}`;

              return (
                <article
                  key={item.question}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-[#f89a1f]/90 bg-[#f89a1f] text-white shadow-[0_16px_34px_-24px_rgba(248,154,31,0.95)]"
                      : "border-slate-200 bg-white text-[#161b22] shadow-[0_12px_28px_-24px_rgba(22,27,34,0.35)] hover:shadow-[0_16px_32px_-24px_rgba(22,27,34,0.45)]"
                  }`}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
                    >
                      <span>{item.question}</span>
                      <span
                        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          isOpen ? "bg-white/25 text-white" : "border border-slate-300 text-[#161b22]"
                        }`}
                      >
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-xl leading-relaxed text-white/95">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-[620px]">
            <div className="relative aspect-[10/7] overflow-hidden rounded-[58%_42%_57%_43%/48%_58%_42%_52%] shadow-soft ring-1 ring-white/80">
              <Image
                src={faqSection.image}
                alt={faqSection.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover"
              />
            </div>
            <FloatingScribble className="pointer-events-none absolute -bottom-11 right-4 h-24 w-44">
              <AboutArtCanvas variant="scribble" className="h-full w-full" />
            </FloatingScribble>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
