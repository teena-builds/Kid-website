"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { testimonialPanel, testimonials } from "@/data/home-data";

const AUTO_DELAY_MS = 7000;

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = testimonials.length;

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalSlides);
    }, AUTO_DELAY_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, totalSlides]);

  const activeSlide = useMemo(
    () => testimonials[activeIndex],
    [activeIndex]
  );

  const goToSlide = (index: number) => setActiveIndex(index);
  const goNext = () => setActiveIndex((current) => (current + 1) % totalSlides);
  const goPrev = () =>
    setActiveIndex((current) => (current - 1 + totalSlides) % totalSlides);

  return (
    <section
      aria-label="Parent testimonials"
      className="overflow-hidden bg-[#f7fbfc]"
    >
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[360px] lg:min-h-[620px]">
          <Image
            src={testimonialPanel.image}
            alt={testimonialPanel.imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>

        <div
          className="relative isolate flex min-h-[420px] flex-col justify-center overflow-hidden bg-[#17bdb6] px-6 py-14 text-white sm:px-10 lg:min-h-[620px] lg:px-14"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setIsPaused(false);
            }
          }}
        >
          {/* Decorative layered surfaces for premium depth without distracting contrast. */}
          <div className="pointer-events-none absolute -right-24 -top-8 h-72 w-72 rounded-[4rem] bg-[#0fb0a8]/30 blur-[2px]" />
          <div className="pointer-events-none absolute bottom-10 right-10 h-52 w-52 rounded-[3rem] bg-[#13a8a1]/30" />
          <div className="pointer-events-none absolute bottom-24 left-10 h-24 w-24 rounded-[2rem] bg-white/10" />

          <div
            className="relative z-10"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") goNext();
              if (event.key === "ArrowLeft") goPrev();
            }}
          >
            <h2 className="text-4xl leading-tight sm:text-5xl">
              {testimonialPanel.heading}
            </h2>

            <div className="mt-5 flex items-center gap-1 text-brand-mustard">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className="h-5 w-5 fill-current"
                  aria-hidden="true"
                />
              ))}
              <span className="sr-only">5 star rating</span>
            </div>

            <div className="relative mt-20 min-h-[190px]">
              {testimonials.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <article
                    key={item.name}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 transition-all duration-500 ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0"
                    }`}
                  >
                    <p className="max-w-xl text-xl leading-relaxed text-white/95 sm:text-[1.75rem] sm:leading-relaxed">
                      “{item.quote}”
                    </p>

                    <div className="mt-8 flex items-center gap-3 sm:mt-10">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        width={56}
                        height={56}
                        loading="lazy"
                        className="h-14 w-14 rounded-full object-cover ring-2 ring-white/35"
                      />
                      <div>
                        <p className="text-2xl leading-tight text-white">
                          {item.name}
                        </p>
                        <p className="text-sm text-white/80">{item.role}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-20 flex items-center">
              <div className="flex items-center gap-2">
                {testimonials.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      aria-label={`Go to testimonial ${idx + 1}`}
                      aria-current={isActive ? "true" : "false"}
                      onClick={() => goToSlide(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                        isActive
                          ? "w-8 bg-white"
                          : "w-4 bg-white/65 hover:bg-white/85"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <Quote
            aria-hidden="true"
            className="pointer-events-none absolute bottom-16 right-12 h-16 w-16 text-white/70 sm:h-20 sm:w-20"
          />
        </div>
      </div>

      <div className="sr-only" aria-live="polite">
        Showing testimonial {activeIndex + 1} of {totalSlides}: {activeSlide.name}
      </div>
    </section>
  );
}
