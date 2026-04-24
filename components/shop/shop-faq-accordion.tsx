"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

type ShopFaqAccordionProps = {
  items: FaqItem[];
};

export function ShopFaqAccordion({ items }: ShopFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const isOpen = idx === openIndex;
        const panelId = `shop-faq-panel-${idx}`;
        return (
          <article
            key={item.question}
            className={`overflow-hidden rounded-2xl border transition-all ${
              isOpen
                ? "border-brand-mustard bg-brand-mustard text-white shadow-card"
                : "border-slate-200 bg-white"
            }`}
          >
            <button
              id={`shop-faq-trigger-${idx}`}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-xl font-medium">{item.question}</span>
              <span
                className={`grid h-9 w-9 place-items-center rounded-full ${
                  isOpen ? "bg-white text-brand-mustard" : "bg-brand-cream text-brand-ink"
                }`}
              >
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={`shop-faq-trigger-${idx}`}
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <p className="overflow-hidden px-6 pb-6 text-base leading-relaxed">
                {item.answer}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
