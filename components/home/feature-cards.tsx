"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { featureCards } from "@/data/home-data";
import { Reveal } from "@/components/ui/reveal";

const CARD_ART = [
  {
    card: "border-[#f2aebc] bg-[linear-gradient(135deg,#ffd8e0_0%,#ffe8dd_52%,#ffc9d5_100%)]",
    halo: "#fffaf4",
    blob: "#f4aab8",
    blobSoft: "#ffd4aa",
    accent: "#e98fa2",
    accentSoft: "#edae5e",
    accentCool: "#9edfd6",
    icon: "sun",
    mainIcon: "blocks"
  },
  {
    card: "border-[#88d8cc] bg-[linear-gradient(135deg,#bfeee5_0%,#d9f8ef_48%,#aee4dc_100%)]",
    halo: "#ffffff",
    blob: "#87d2c7",
    blobSoft: "#bfe9a4",
    accent: "#64bfb4",
    accentSoft: "#e9bb60",
    accentCool: "#bda8ef",
    icon: "cloud",
    mainIcon: "book"
  },
  {
    card: "border-[#f2cf77] bg-[linear-gradient(135deg,#ffe99a_0%,#fff2bd_46%,#ffd69f_100%)]",
    halo: "#ffffff",
    blob: "#efc46f",
    blobSoft: "#d9f3ff",
    accent: "#dba950",
    accentSoft: "#e9928f",
    accentCool: "#8fcfe9",
    icon: "rainbow",
    mainIcon: "crayon"
  },
  {
    card: "border-[#8fc9ef] bg-gradient-to-br from-[#bbe4fb] via-[#d8f1ff] to-[#acd9f5]",
    halo: "#ffffff",
    blob: "#8ec9eb",
    blobSoft: "#f8dce8",
    accent: "#68add9",
    accentSoft: "#e7b55f",
    accentCool: "#d2b9f4",
    icon: "cloud",
    mainIcon: "pencil"
  },
  {
    card: "border-[#c5b5ef] bg-gradient-to-br from-[#ded3ff] via-[#eee8ff] to-[#d2c4f5]",
    halo: "#ffffff",
    blob: "#bfaef0",
    blobSoft: "#ffe3ec",
    accent: "#a28bdb",
    accentSoft: "#e898ad",
    accentCool: "#94d9d0",
    icon: "circle",
    mainIcon: "flower"
  }
];

function FloatingCardIcon({
  type,
  color,
  secondColor,
  className,
  duration,
  delay = 0
}: {
  type: string;
  color: string;
  secondColor: string;
  className: string;
  duration: number;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      initial={false}
      animate={reducedMotion ? { x: 0, y: 0 } : { y: [0, -4, 0], x: [0, 4, 0] }}
      transition={{
        duration,
        delay,
        repeat: reducedMotion ? 0 : Infinity,
        ease: "easeInOut"
      }}
      className={`pointer-events-none absolute ${className}`}
    >
      {type === "sun" && (
        <svg viewBox="0 0 72 72" className="h-full w-full" fill="none">
          <circle cx="36" cy="36" r="13" fill={secondColor} opacity=".82" />
          <path
            d="M36 6v10M36 56v10M6 36h10M56 36h10M15 15l7 7M50 50l7 7M57 15l-7 7M22 50l-7 7"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            opacity=".62"
          />
        </svg>
      )}
      {type === "balloon" && (
        <svg viewBox="0 0 72 72" className="h-full w-full" fill="none">
          <path
            d="M37 8c12 0 21 9 21 21 0 15-12 26-21 31-9-5-21-16-21-31C16 17 25 8 37 8Z"
            fill={color}
            opacity=".62"
          />
          <path d="M37 60c-2 3-1 5 3 7M35 60c1 5-3 6-7 8" stroke={secondColor} strokeWidth="3" strokeLinecap="round" opacity=".7" />
          <circle cx="30" cy="22" r="5" fill="#fff" opacity=".55" />
        </svg>
      )}
      {type === "butterfly" && (
        <svg viewBox="0 0 72 72" className="h-full w-full" fill="none">
          <path d="M33 35c-9-16-25-18-27-5-2 11 12 16 27 8v-3Z" fill={color} opacity=".52" />
          <path d="M39 35c9-16 25-18 27-5 2 11-12 16-27 8v-3Z" fill={secondColor} opacity=".58" />
          <path d="M34 33c-7-15-20-26-25-14-4 10 8 16 25 17v-3Z" fill={secondColor} opacity=".42" />
          <path d="M38 33c7-15 20-26 25-14 4 10-8 16-25 17v-3Z" fill={color} opacity=".44" />
          <path d="M36 29v22M29 18c3 0 6 3 7 8M43 18c-3 0-6 3-7 8" stroke="#8bbfb8" strokeWidth="3" strokeLinecap="round" opacity=".65" />
        </svg>
      )}
      {type === "star" && (
        <svg viewBox="0 0 72 72" className="h-full w-full" fill="none">
          <path
            d="m36 8 7 19 20 2-15 13 5 20-17-11-17 11 5-20L9 29l20-2 7-19Z"
            fill={secondColor}
            opacity=".82"
          />
          <circle cx="14" cy="52" r="5" fill={color} opacity=".45" />
          <circle cx="59" cy="15" r="4" fill={color} opacity=".35" />
        </svg>
      )}
      {type === "rainbow" && (
        <svg viewBox="0 0 90 62" className="h-full w-full" fill="none">
          <path d="M12 51c0-18 15-33 33-33s33 15 33 33" stroke={secondColor} strokeWidth="8" strokeLinecap="round" opacity=".78" />
          <path d="M25 51c0-11 9-20 20-20s20 9 20 20" stroke={color} strokeWidth="8" strokeLinecap="round" opacity=".75" />
          <path d="M37 51c0-4 4-8 8-8s8 4 8 8" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" opacity=".9" />
        </svg>
      )}
      {type === "cloud" && (
        <svg viewBox="0 0 90 62" className="h-full w-full" fill="none">
          <path
            d="M20 48h43c10 0 17-6 17-15 0-8-7-15-16-15-4 0-8 1-11 4-5-8-14-12-24-9-8 2-15 9-16 18-2-1-4-1-7-1-8 0-14 5-14 11 0 5 6 7 18 7Z"
            fill="#ffffff"
            opacity=".86"
          />
          <path d="M23 48h38c10 0 16-5 17-13" stroke={color} strokeWidth="4" strokeLinecap="round" opacity=".38" />
        </svg>
      )}
      {type === "circle" && (
        <svg viewBox="0 0 72 72" className="h-full w-full" fill="none">
          <circle cx="35" cy="36" r="21" stroke={color} strokeWidth="7" opacity=".45" />
          <circle cx="35" cy="36" r="9" fill={secondColor} opacity=".55" />
          <path d="M12 14c10 7 18-7 28 1 7 5 9 15 20 11" stroke={secondColor} strokeWidth="5" strokeLinecap="round" opacity=".45" />
        </svg>
      )}
    </motion.div>
  );
}

function MainCardIcon({
  type,
  color,
  secondColor,
  coolColor
}: {
  type: string;
  color: string;
  secondColor: string;
  coolColor: string;
}) {
  if (type === "book") {
    return (
      <svg viewBox="0 0 86 86" className="h-12 w-12 transition-transform duration-300 group-hover:-translate-y-1" fill="none">
        <path d="M14 21c12-5 20-3 29 4v43c-9-7-18-9-29-4V21Z" fill={coolColor} opacity=".84" />
        <path d="M72 21c-12-5-20-3-29 4v43c9-7 18-9 29-4V21Z" fill={secondColor} opacity=".84" />
        <path d="M43 25v43M23 33c6-1 10 0 14 3M51 36c4-3 8-4 13-3" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity=".9" />
      </svg>
    );
  }

  if (type === "crayon") {
    return (
      <svg viewBox="0 0 86 86" className="h-12 w-12 transition-transform duration-300 group-hover:-translate-y-1" fill="none">
        <path d="M24 62 58 28l10 10-34 34-13 3 3-13Z" fill={color} opacity=".85" />
        <path d="m58 28 5-5c3-3 8-3 11 0s3 8 0 11l-5 5-11-11Z" fill={secondColor} opacity=".86" />
        <path d="m24 62 10 10-13 3 3-13Z" fill="#fff8ec" />
        <path d="M18 25c9-8 18 4 28-4" stroke={coolColor} strokeWidth="5" strokeLinecap="round" opacity=".72" />
      </svg>
    );
  }

  if (type === "pencil") {
    return (
      <svg viewBox="0 0 86 86" className="h-12 w-12 transition-transform duration-300 group-hover:-translate-y-1" fill="none">
        <path d="M22 58 58 22l12 12-36 36-15 4 3-16Z" fill={secondColor} opacity=".86" />
        <path d="m58 22 4-4c3-3 8-3 11 0s3 8 0 11l-4 4-11-11Z" fill={color} opacity=".82" />
        <path d="M22 58 34 70" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".8" />
      </svg>
    );
  }

  if (type === "flower") {
    return (
      <svg viewBox="0 0 86 86" className="h-12 w-12 transition-transform duration-300 group-hover:-translate-y-1" fill="none">
        <circle cx="43" cy="43" r="8" fill={secondColor} />
        <path d="M43 16c9 8 9 19 0 27-9-8-9-19 0-27Z" fill={color} opacity=".72" />
        <path d="M43 70c-9-8-9-19 0-27 9 8 9 19 0 27Z" fill={color} opacity=".72" />
        <path d="M16 43c8-9 19-9 27 0-8 9-19 9-27 0Z" fill={coolColor} opacity=".72" />
        <path d="M70 43c-8 9-19 9-27 0 8-9 19-9 27 0Z" fill={coolColor} opacity=".72" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 86 86" className="h-12 w-12 transition-transform duration-300 group-hover:-translate-y-1" fill="none">
      <rect x="13" y="42" width="25" height="25" rx="7" fill={color} opacity=".82" />
      <rect x="48" y="37" width="25" height="30" rx="8" fill={coolColor} opacity=".82" />
      <rect x="30" y="17" width="27" height="27" rx="8" fill={secondColor} opacity=".86" />
      <circle cx="43" cy="31" r="5" fill="#fff" opacity=".72" />
      <path d="M21 54h8M56 51h9" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".78" />
    </svg>
  );
}

function CardBackgroundArt({
  index,
  isFeatured
}: {
  index: number;
  isFeatured: boolean;
}) {
  const art = CARD_ART[index % CARD_ART.length];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <svg
        viewBox="0 0 420 360"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M-10 254c44 18 78 28 119 7 42-21 82 4 98 39 13 28 57 31 96 32 36 1 66 12 95 37H-10V254Z"
          fill={art.blob}
          opacity={isFeatured ? ".56" : ".62"}
        />
        <path
          d="M-14 300c49 14 76 5 111-13 40-20 73 8 89 34 14 23 56 22 91 26 20 2 38 8 55 20H-14v-67Z"
          fill={art.blobSoft}
          opacity=".32"
        />
       
      </svg>

      <FloatingCardIcon
        type={art.icon}
        color={art.accent}
        secondColor={art.accentSoft}
        className="right-7 top-7 h-10 w-10 opacity-72"
        duration={3}
      />
    </div>
  );
}

export function FeatureCards() {
  const featuredIndex = Math.floor(featureCards.length / 2);

  return (
    <section className="bg-white pb-20 pt-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-coral">
            Our Offerings
          </p>
          <h2 className="mt-3 text-4xl text-brand-ink sm:text-5xl">
            Fun Ways To Learn
          </h2>
          <p className="mt-3 text-slate-600">
            Multi-level programs crafted for joyful learning, confidence, and
            early childhood development.
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3 lg:items-end mt-16">
          {featureCards.map((item, index) => {
            const isFeatured = index === featuredIndex;

            return (
              <Reveal key={item.title} delay={index * 0.08}>
                <article
                  className={`group relative overflow-hidden rounded-[2rem] border p-7 transition-all duration-300 ease-out ${
                    isFeatured
                      ? "lg:-translate-y-5 text-brand-ink shadow-[0_28px_60px_-34px_rgba(87,142,132,0.52)] lg:hover:-translate-y-8 lg:hover:scale-[1.02] lg:hover:shadow-[0_34px_74px_-34px_rgba(87,142,132,0.62)]"
                      : "text-brand-ink shadow-[0_20px_48px_-36px_rgba(32,48,58,0.4)] hover:-translate-y-2 hover:shadow-[0_24px_52px_-34px_rgba(32,48,58,0.5)]"
                  } ${CARD_ART[index % CARD_ART.length].card}`}
                >
                  <CardBackgroundArt index={index} isFeatured={isFeatured} />

                  <span
                    className={`relative z-10 inline-flex h-24 w-24 items-center justify-center rounded-full shadow-[0_14px_30px_-20px_rgba(22,27,34,0.45)] ${
                      isFeatured ? "bg-white/80 ring-1 ring-white/80" : "bg-white/90 ring-1 ring-white/75"
                    }`}
                  >
                    <MainCardIcon
                      type={CARD_ART[index % CARD_ART.length].mainIcon}
                      color={CARD_ART[index % CARD_ART.length].accent}
                      secondColor={CARD_ART[index % CARD_ART.length].accentSoft}
                      coolColor={CARD_ART[index % CARD_ART.length].accentCool}
                    />
                  </span>

                  <h3
                    className={`relative z-10 mt-8 text-[2rem] leading-tight ${
                      isFeatured ? "text-brand-ink" : "text-brand-ink"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`relative z-10 mt-3 text-lg leading-relaxed ${
                      isFeatured ? "text-slate-600" : "text-slate-600"
                    }`}
                  >
                    {item.description}
                  </p>

                  <Link
                    href={item.href}
                    className={`relative z-10 mt-7 inline-flex items-center gap-2 rounded-full font-medium border px-6 py-2.5 text-base transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 ${
                      isFeatured
                        ? "border-white/80 bg-white/75 text-brand-ink hover:bg-white hover:text-brand-coral focus-visible:ring-brand-coral"
                        : "border-[#f5a146] bg-white text-brand-ink hover:border-brand-coral hover:text-brand-coral focus-visible:ring-brand-coral"
                    }`}
                  >
                    View Details <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
