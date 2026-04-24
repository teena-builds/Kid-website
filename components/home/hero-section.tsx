"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/home-data";

type SlideDirection = 1 | -1;

const FLOAT_TRANSITIONS = [
  { duration: 2.8, y: [0, -8, 0], x: [0, 12, 0] },
  { duration: 2.9, y: [0, -10, 0], x: [0, -10, 0] },
  { duration: 2.7, y: [0, -6, 0], x: [0, 11, 0] },
  { duration: 3.0, y: [0, -9, 0], x: [0, -9, 0] }
];

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState<SlideDirection>(1);
  const [paused, setPaused] = useState(false);

  const nextSlide = () => {
    setDirection(1);
    setSlideIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const jumpToSlide = (nextIndex: number) => {
    if (nextIndex === slideIndex) return;
    setDirection(nextIndex > slideIndex ? 1 : -1);
    setSlideIndex(nextIndex);
  };

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(nextSlide, 9000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const transition = useMemo(
    () => ({
      duration: reducedMotion ? 0.01 : 0.42,
      ease: [0.22, 1, 0.36, 1] as const
    }),
    [reducedMotion]
  );

  const textContainerVariants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: reducedMotion
          ? { staggerChildren: 0.03, delayChildren: 0 }
          : { staggerChildren: 0.06, delayChildren: 0 }
      }
    }),
    [reducedMotion]
  );

  const textItemVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: reducedMotion ? 0 : 14
      },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: reducedMotion ? 0.16 : 0.34,
          ease: "easeOut" as const
        }
      }
    }),
    [reducedMotion]
  );

  return (
    <section
      role="region"
      aria-label="Hero carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") nextSlide();
        if (event.key === "ArrowLeft") prevSlide();
      }}
      tabIndex={0}
      className="relative isolate overflow-hidden"
    >
      <div className="relative min-h-[78svh]">
        {heroSlides.map((slide, idx) => {
          const isActive = idx === slideIndex;

          return (
            <motion.article
              key={slide.id}
              aria-hidden={!isActive}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : direction > 0 ? -20 : 20,
                scale: isActive ? 1 : 0.992
              }}
              transition={transition}
              className={`absolute inset-0 ${isActive ? "z-10" : "z-0 pointer-events-none"} bg-gradient-to-r ${slide.bgClass}`}
            >
              <div className="mx-auto grid min-h-[78svh] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_1.02fr] lg:gap-14 lg:px-8">
                <div className="max-w-xl">
                  {isActive ? (
                    <motion.div
                      key={`hero-text-${slideIndex}`}
                      initial="hidden"
                      animate="show"
                      variants={textContainerVariants}
                    >
                      <motion.p
                        variants={textItemVariants}
                        className="text-lg font-semibold text-brand-teal"
                      >
                        {slide.tag}
                      </motion.p>

                      <motion.h1
                        variants={textItemVariants}
                        className="mt-4 font-[var(--font-display)] text-6xl font-bold leading-[0.98] tracking-tight text-[#17191d] sm:text-7xl lg:text-8xl"
                      >
                        {slide.heading}
                      </motion.h1>

                      <motion.p
                        variants={textItemVariants}
                        className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600"
                      >
                        {slide.description}
                      </motion.p>

                      <motion.div variants={textItemVariants} className="mt-9">
                        <Link
                          href={slide.primaryCta.href}
                          className="inline-flex rounded-full bg-[#f79a1e] px-9 py-4 text-base font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ee8f14] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink"
                        >
                          {slide.primaryCta.label}
                        </Link>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <div aria-hidden="true" className="opacity-0">
                      <p className="text-lg font-semibold text-brand-teal">{slide.tag}</p>
                      <h1 className="mt-4 font-[var(--font-display)] text-6xl font-bold leading-[0.98] tracking-tight text-[#17191d] sm:text-7xl lg:text-8xl">
                        {slide.heading}
                      </h1>
                      <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
                        {slide.description}
                      </p>
                      <div className="mt-9">
                        <Link
                          href={slide.primaryCta.href}
                          tabIndex={-1}
                          className="inline-flex rounded-full bg-[#f79a1e] px-9 py-4 text-base font-semibold text-white shadow-soft transition-all duration-300"
                        >
                          {slide.primaryCta.label}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <motion.div
                  initial={false}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, delay: 0 }}
                  className="relative mx-auto w-full max-w-[620px] pb-2"
                >
                  <div className="relative aspect-[1.05/0.95] w-full overflow-hidden bg-white/40 shadow-soft [clip-path:polygon(16%_8%,46%_0%,66%_8%,92%_30%,100%_56%,88%_86%,58%_100%,26%_96%,8%_78%,0%_50%,6%_22%)]">
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      quality={92}
                      priority={idx < 2}
                      loading={idx < 2 ? "eager" : "lazy"}
                      sizes="(max-width: 1024px) 90vw, 620px"
                      className="object-cover"
                    />
                  </div>

                  <motion.span
                    aria-hidden="true"
                    animate={
                      reducedMotion
                        ? { y: 0, x: 0 }
                        : { y: FLOAT_TRANSITIONS[0].y, x: FLOAT_TRANSITIONS[0].x }
                    }
                    transition={{
                      duration: FLOAT_TRANSITIONS[0].duration,
                      repeat: reducedMotion ? 0 : Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -left-4 top-16 h-16 w-16 rounded-full border-4 border-brand-teal/35"
                  />
                  <motion.span
                    aria-hidden="true"
                    animate={
                      reducedMotion
                        ? { y: 0, x: 0 }
                        : { y: FLOAT_TRANSITIONS[1].y, x: FLOAT_TRANSITIONS[1].x }
                    }
                    transition={{
                      duration: FLOAT_TRANSITIONS[1].duration,
                      repeat: reducedMotion ? 0 : Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -right-6 top-10 h-14 w-14 rounded-full border-4 border-brand-mustard/40"
                  />
                  <motion.span
                    aria-hidden="true"
                    animate={
                      reducedMotion
                        ? { y: 0, x: 0 }
                        : { y: FLOAT_TRANSITIONS[2].y, x: FLOAT_TRANSITIONS[2].x }
                    }
                    transition={{
                      duration: FLOAT_TRANSITIONS[2].duration,
                      repeat: reducedMotion ? 0 : Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -bottom-5 left-[8%] h-10 w-10 rounded-full border-4 border-brand-coral/35"
                  />
                  <motion.span
                    aria-hidden="true"
                    animate={
                      reducedMotion
                        ? { y: 0, x: 0 }
                        : { y: FLOAT_TRANSITIONS[3].y, x: FLOAT_TRANSITIONS[3].x }
                    }
                    transition={{
                      duration: FLOAT_TRANSITIONS[3].duration,
                      repeat: reducedMotion ? 0 : Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute bottom-2 right-8 h-12 w-12 rounded-full border-4 border-brand-mustard/40"
                  />
                  <motion.svg
                    aria-hidden="true"
                    viewBox="0 0 88 42"
                    className="absolute right-1/2 top-1 h-10 w-20 translate-x-16 text-[#ef8f16]"
                    animate={
                      reducedMotion
                        ? { y: 0 }
                        : { y: [0, -7, 0], x: [0, 8, 0] }
                    }
                    transition={{
                      duration: 2.8,
                      repeat: reducedMotion ? 0 : Infinity,
                      ease: "easeInOut"
                    }}
                    fill="none"
                  >
                    <path
                      d="M3 25c8 9 16-2 16-10s10-12 16-4c5 7 10 9 17 0"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </motion.svg>

                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-6 left-1/2 h-auto w-32 -translate-x-1/2"
                    animate={
                      reducedMotion
                        ? { x: 0, y: 0 }
                        : { x: [0, 12, 0], y: [0, -8, 0] }
                    }
                    transition={{
                      duration: 2.8,
                      ease: "easeInOut",
                      repeat: reducedMotion ? 0 : Infinity
                    }}
                  >
                    <svg viewBox="0 0 140 54" className="h-auto w-full" fill="none">
                      <path
                        d="M7 16c19-13 37 2 56-7 12-6 18-17 28-9"
                        stroke="#23b9b3"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6 30c25-10 47 6 73-4 17-6 26-18 39-11"
                        stroke="#23b9b3"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8 45c22-14 43-1 64-8 16-6 27-20 46-12"
                        stroke="#23b9b3"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-white/90 text-brand-ink transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-white/90 text-brand-ink transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div
          role="tablist"
          aria-label="Hero slide pagination"
          className="pointer-events-auto flex items-center gap-2 rounded-full border border-slate-300 bg-white/85 px-3 py-2"
        >
          {heroSlides.map((slide, idx) => {
            const isActive = idx === slideIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${idx + 1}: ${slide.heading}`}
                onClick={() => jumpToSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink ${
                  isActive ? "w-8 bg-brand-ink" : "w-2.5 bg-slate-400 hover:bg-slate-500"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
