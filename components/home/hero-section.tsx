"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/home-data";

type SlideDirection = 1 | -1;
type FloatAnimation = {
  x?: number[];
  y?: number[];
  rotate?: number[];
};

const FLOAT_TRANSITIONS = [
  { duration: 2.8, y: [0, -8, 0], x: [0, 12, 0] },
  { duration: 2.9, y: [0, -10, 0], x: [0, -10, 0] },
  { duration: 2.7, y: [0, -6, 0], x: [0, 11, 0] },
  { duration: 3.0, y: [0, -9, 0], x: [0, -9, 0] }
];

const DECOR_ASSETS = {
  balloon: "/hero-decor/balloon-1.svg",
  butterfly: "/hero-decor/butterfly.svg",
  car: "/hero-decor/car-ic.svg",
  contact: "/hero-decor/icon-contact1.svg",
  crown: "/hero-decor/crown.png",
  sun: "/hero-decor/sun-h1.svg"
};

function floatingAnimation(reducedMotion: boolean | null, animation: FloatAnimation) {
  if (reducedMotion) {
    return { x: 0, y: 0, rotate: 0 };
  }

  return animation;
}

function FloatingDecor({
  children,
  className,
  duration,
  animation
}: {
  children: ReactNode;
  className: string;
  duration: number;
  animation: FloatAnimation;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      initial={false}
      animate={floatingAnimation(reducedMotion, animation)}
      transition={{
        duration,
        repeat: reducedMotion ? 0 : Infinity,
        ease: "easeInOut"
      }}
      className={`pointer-events-none absolute ${className}`}
    >
      {children}
    </motion.div>
  );
}

function DecorAsset({ src }: { src: string }) {
  return (
    <span className="relative block h-full w-full">
      <Image src={src} alt="" fill sizes="160px" className="object-contain" />
    </span>
  );
}

function RainbowDoodle() {
  return (
    <svg viewBox="0 0 150 94" className="h-full w-full" fill="none">
      <path d="M21 75c0-29 24-53 54-53s54 24 54 53" stroke="#f45584" strokeWidth="10" strokeLinecap="round" />
      <path d="M38 75c0-20 17-37 37-37s37 17 37 37" stroke="#f79a1e" strokeWidth="10" strokeLinecap="round" />
      <path d="M55 75c0-11 9-20 20-20s20 9 20 20" stroke="#23b9b3" strokeWidth="10" strokeLinecap="round" />
      <path d="M24 79h102" stroke="#fff8ed" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

function StarsAndCircles() {
  return (
    <svg viewBox="0 0 130 130" className="h-full w-full" fill="none">
      <path d="m66 12 6 16 17 2-13 11 4 17-14-9-15 9 5-17-14-11 17-2 7-16Z" fill="#f79a1e" opacity=".72" />
      <path d="m103 67 4 10 10 1-8 7 3 10-9-5-9 5 3-10-8-7 10-1 4-10Z" fill="#f45584" opacity=".55" />
      <circle cx="31" cy="86" r="13" stroke="#23b9b3" strokeWidth="5" opacity=".45" />
      <circle cx="101" cy="32" r="7" fill="#23b9b3" opacity=".35" />
      <circle cx="25" cy="35" r="5" fill="#f79a1e" opacity=".45" />
    </svg>
  );
}

function CloudPuffs() {
  return (
    <svg viewBox="0 0 180 82" className="h-full w-full" fill="none">
      <path d="M43 63h89c17 0 29-10 29-24 0-13-11-23-25-23-7 0-13 2-18 6C109 10 96 4 81 7 66 9 55 20 52 34c-3-1-7-2-11-2-14 0-25 8-25 18 0 8 10 13 27 13Z" fill="#fffdf7" opacity=".78" />
      <path d="M48 61h80c16 0 27-9 27-22" stroke="#23b9b3" strokeWidth="4" strokeLinecap="round" opacity=".22" />
    </svg>
  );
}

function PlayfulDots() {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" fill="none">
      <circle cx="18" cy="21" r="5" fill="#23b9b3" opacity=".48" />
      <circle cx="55" cy="16" r="4" fill="#f45584" opacity=".42" />
      <circle cx="91" cy="31" r="6" fill="#f79a1e" opacity=".45" />
      <circle cx="28" cy="69" r="4" fill="#f79a1e" opacity=".4" />
      <circle cx="74" cy="75" r="5" fill="#23b9b3" opacity=".45" />
      <circle cx="105" cy="98" r="4" fill="#f45584" opacity=".38" />
      <path d="M34 101c14-14 28 7 45-8 9-8 15-10 25-5" stroke="#f45584" strokeWidth="4" strokeLinecap="round" opacity=".42" />
    </svg>
  );
}

function SoftBlob() {
  return (
    <svg viewBox="0 0 190 170" className="h-full w-full" fill="none">
      <path d="M144 19c24 19 34 55 22 84-13 32-50 51-87 48-34-3-63-23-66-52-3-27 20-50 42-66 26-18 63-34 89-14Z" fill="#23b9b3" opacity=".14" />
      <path d="M50 41c22-19 54-23 78-4" stroke="#f79a1e" strokeWidth="6" strokeLinecap="round" opacity=".32" />
    </svg>
  );
}

function RingsAndDoodles() {
  return (
    <svg viewBox="0 0 150 150" className="h-full w-full" fill="none">
      <circle cx="76" cy="76" r="45" stroke="#23b9b3" strokeWidth="7" opacity=".28" />
      <circle cx="76" cy="76" r="25" stroke="#f45584" strokeWidth="6" opacity=".24" />
      <path d="M18 40c13 10 24-9 37 1 10 8 11 23 26 14 7-5 14-13 24-9" stroke="#f79a1e" strokeWidth="5" strokeLinecap="round" opacity=".45" />
      <circle cx="123" cy="117" r="8" fill="#f79a1e" opacity=".36" />
    </svg>
  );
}

function HeroBackgroundDecorations({ slideIndex }: { slideIndex: number }) {
  if (slideIndex === 0) {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <FloatingDecor className="left-[5%] top-[12%] h-24 w-24 opacity-55 sm:h-32 sm:w-32" duration={4.8} animation={{ y: [0, -8, 0], x: [0, 6, 0], rotate: [0, 2, 0] }}>
          <StarsAndCircles />
        </FloatingDecor>
        <FloatingDecor className="right-[7%] top-[8%] h-20 w-20 opacity-55 sm:h-28 sm:w-28" duration={5.2} animation={{ y: [0, -9, 0], x: [0, -7, 0], rotate: [0, -2, 0] }}>
          <DecorAsset src={DECOR_ASSETS.sun} />
        </FloatingDecor>
        <FloatingDecor className="bottom-[18%] left-[8%] hidden h-24 w-36 opacity-50 md:block" duration={5.8} animation={{ y: [0, -7, 0], x: [0, 10, 0], rotate: [0, 1, 0] }}>
          <RainbowDoodle />
        </FloatingDecor>
        <FloatingDecor className="right-[40%] top-[11%] h-16 w-16 opacity-60" duration={4.4} animation={{ y: [0, -8, 0], x: [0, 8, 0], rotate: [0, 2, 0] }}>
          <DecorAsset src={DECOR_ASSETS.crown} />
        </FloatingDecor>
      </div>
    );
  }

  if (slideIndex === 1) {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <FloatingDecor className="left-[4%] top-[10%] h-20 w-44 opacity-65 sm:h-24 sm:w-52" duration={5.7} animation={{ y: [0, -8, 0], x: [0, 9, 0], rotate: [0, 1, 0] }}>
          <CloudPuffs />
        </FloatingDecor>
        <FloatingDecor className="right-[6%] top-[18%] h-16 w-36 opacity-55 md:h-20 md:w-44" duration={6} animation={{ y: [0, -10, 0], x: [0, -8, 0], rotate: [0, -1, 0] }}>
          <CloudPuffs />
        </FloatingDecor>
        <FloatingDecor className="bottom-[18%] left-[6%] h-24 w-24 opacity-60 sm:h-28 sm:w-28" duration={4.2} animation={{ y: [0, -7, 0], x: [0, 7, 0], rotate: [0, 2, 0] }}>
          <PlayfulDots />
        </FloatingDecor>
        <FloatingDecor className="right-[38%] top-[8%] h-20 w-20 opacity-60" duration={4.8} animation={{ y: [0, -9, 0], x: [0, 6, 0], rotate: [0, 3, 0] }}>
          <DecorAsset src={DECOR_ASSETS.butterfly} />
        </FloatingDecor>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <FloatingDecor className="left-[3%] top-[11%] h-32 w-36 opacity-70 sm:h-40 sm:w-44" duration={5.5} animation={{ y: [0, -10, 0], x: [0, 8, 0], rotate: [0, 2, 0] }}>
        <SoftBlob />
      </FloatingDecor>
      <FloatingDecor className="right-[5%] top-[9%] h-24 w-24 opacity-55 sm:h-32 sm:w-32" duration={4.7} animation={{ y: [0, -8, 0], x: [0, -9, 0], rotate: [0, -2, 0] }}>
        <RingsAndDoodles />
      </FloatingDecor>
      <FloatingDecor className="bottom-[16%] left-[7%] hidden h-24 w-36 opacity-50 md:block" duration={5.9} animation={{ y: [0, -7, 0], x: [0, 11, 0], rotate: [0, 1, 0] }}>
        <RainbowDoodle />
      </FloatingDecor>
      <FloatingDecor className="right-[39%] top-[12%] h-16 w-20 opacity-55 sm:h-20 sm:w-24" duration={4.5} animation={{ y: [0, -8, 0], x: [0, 7, 0], rotate: [0, 2, 0] }}>
        <DecorAsset src={DECOR_ASSETS.car} />
      </FloatingDecor>
      <FloatingDecor className="bottom-[12%] right-[9%] hidden h-24 w-24 opacity-45 lg:block" duration={5.2} animation={{ y: [0, -11, 0], x: [0, -7, 0], rotate: [0, -2, 0] }}>
        <DecorAsset src={DECOR_ASSETS.balloon} />
      </FloatingDecor>
    </div>
  );
}

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
      <div className="relative min-h-[860px] sm:min-h-[820px] md:min-h-[780px] lg:min-h-[78svh]">
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
              <HeroBackgroundDecorations slideIndex={idx} />

              <div className="relative z-10 mx-auto grid min-h-[860px] max-w-7xl items-center gap-8 px-6 pb-28 pt-12 sm:min-h-[820px] sm:gap-10 md:min-h-[780px] lg:min-h-[78svh] lg:grid-cols-[1fr_1.02fr] lg:gap-14 lg:px-8 lg:py-16">
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
                        className="text-lg text-brand-teal"
                      >
                        {slide.tag}
                      </motion.p>

                      <motion.h1
                        variants={textItemVariants}
                        className="mt-4 text-4xl leading-[0.98] tracking-tight text-[#17191d] sm:text-7xl lg:text-6xl"
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
                          className="inline-flex rounded-full bg-[var(--btn-color)] px-9 py-4 text-base text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--btn-color-hover)] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink"
                        >
                          {slide.primaryCta.label}
                        </Link>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <div aria-hidden="true" className="opacity-0">
                      <p className="text-lg text-brand-teal">{slide.tag}</p>
                      <h2 className="mt-4 text-4xl leading-[0.98] tracking-tight text-[#17191d] sm:text-7xl lg:text-8xl">
                        {slide.heading}
                      </h2>
                      <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
                        {slide.description}
                      </p>
                      <div className="mt-9">
                        <Link
                          href={slide.primaryCta.href}
                          tabIndex={-1}
                          className="inline-flex rounded-full bg-[var(--btn-color)] px-9 py-4 text-base text-white shadow-soft transition-all duration-300"
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
                  className="relative mx-auto w-full z-2 max-w-[460px] pb-8 sm:max-w-[540px] lg:max-w-[620px] lg:pb-2"
                >
                  <div className="relative aspect-[0.92/1] w-full overflow-hidden bg-white/40 shadow-soft sm:aspect-[1.05/0.95] [clip-path:polygon(16%_8%,46%_0%,66%_8%,92%_30%,100%_56%,88%_86%,58%_100%,26%_96%,8%_78%,0%_50%,6%_22%)]">
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      quality={92}
                      priority={idx === 0}
                      loading={idx === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 1024px) 90vw, 620px"
                      className="object-cover object-bottom sm:object-center"
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
