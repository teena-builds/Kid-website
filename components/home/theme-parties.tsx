import { themeParties } from "@/data/home-data";
import { Reveal } from "@/components/ui/reveal";

const partyCardStyles = [
  {
    border: "border-[#78bdf2] hover:border-[#4fa9ec]",
    bg: "bg-[#f2f9ff]",
    title: "text-[#348fd6]",
    iconBg: "#d8efff",
    primary: "#5fb4ed",
    secondary: "#f8c36b",
    watermark: "#5fb4ed",
    icon: "cap"
  },
  {
    border: "border-[#7bd6a7] hover:border-[#4cc985]",
    bg: "bg-[#f3fff8]",
    title: "text-[#35a96d]",
    iconBg: "#dff8e9",
    primary: "#63c98f",
    secondary: "#88d9ce",
    watermark: "#63c98f",
    icon: "board"
  },
  {
    border: "border-[#f4a174] hover:border-[#ee7d4d]",
    bg: "bg-[#fff6f1]",
    title: "text-[#e66d45]",
    iconBg: "#ffe2d4",
    primary: "#f18b61",
    secondary: "#f6c76e",
    watermark: "#f18b61",
    icon: "school"
  },
  {
    border: "border-[#9aa8f4] hover:border-[#7687ea]",
    bg: "bg-[#f6f7ff]",
    title: "text-[#6b7de0]",
    iconBg: "#e4e8ff",
    primary: "#8494ee",
    secondary: "#9bded6",
    watermark: "#8494ee",
    icon: "globe"
  }
];

const partyCardOffsets = ["md:translate-y-0", "md:translate-y-6 xl:translate-y-10", "md:translate-y-0", "md:translate-y-6 xl:translate-y-10"];

function PartyIllustration({
  type,
  primary,
  secondary,
  iconBg
}: {
  type: string;
  primary: string;
  secondary: string;
  iconBg: string;
}) {
  return (
    <svg viewBox="0 0 96 96" className="h-20 w-20 transition-transform duration-300 group-hover:scale-[1.05]" fill="none">
      <circle cx="48" cy="48" r="37" fill={iconBg} />
      {type === "cap" && (
        <>
          <path d="M20 39 48 27l28 12-28 13-28-13Z" fill={primary} />
          <path d="M34 49v12c8 7 20 7 28 0V49" fill={secondary} />
          <path d="M70 43v15" stroke={primary} strokeWidth="4" strokeLinecap="round" />
          <circle cx="70" cy="64" r="4" fill={secondary} />
        </>
      )}
      {type === "board" && (
        <>
          <rect x="24" y="27" width="48" height="34" rx="7" fill={primary} />
          <path d="M32 40h19M32 49h30" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".85" />
          <path d="M39 68h18M48 61v7" stroke={secondary} strokeWidth="5" strokeLinecap="round" />
        </>
      )}
      {type === "school" && (
        <>
          <path d="M25 44 48 27l23 17v28H25V44Z" fill={primary} />
          <path d="M35 72V52h26v20" fill={secondary} />
          <path d="M43 72V58h10v14" fill="#fff" opacity=".85" />
          <circle cx="48" cy="42" r="6" fill="#fff" opacity=".8" />
        </>
      )}
      {type === "globe" && (
        <>
          <circle cx="48" cy="45" r="22" fill={primary} />
          <path d="M29 45h38M48 23c8 8 8 36 0 44M48 23c-8 8-8 36 0 44" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".8" />
          <path d="M34 72h28M48 67v5" stroke={secondary} strokeWidth="5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

function PartyWatermark({ color }: { color: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 150 150" className="pointer-events-none absolute -bottom-9 -right-8 h-32 w-32 opacity-[0.08]" fill="none">
      <path d="M31 94c26-41 59-52 97-27" stroke={color} strokeWidth="12" strokeLinecap="round" />
      <path d="M35 73c18-25 40-33 67-23" stroke={color} strokeWidth="10" strokeLinecap="round" />
      <circle cx="43" cy="41" r="12" fill={color} />
      <path d="m102 92 8 18 20 2-15 13 5 19-18-10-17 10 4-19-15-13 20-2 8-18Z" fill={color} />
    </svg>
  );
}

export function ThemeParties() {
  return (
    <section
      id="theme-activities"
      className="section-surface scroll-mt-32 overflow-hidden bg-[#f8fcff] py-20 lg:py-28"
    >
      <span id="theme-parties" className="block scroll-mt-32" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-coral">
            Theme Parties and Events
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl leading-tight text-brand-ink sm:text-5xl">
            Curated celebrations designed for laughter, movement, and memorable fun.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {themeParties.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.06}>
              <article
                className={`group relative overflow-hidden rounded-2xl border-2 border-dashed p-7 text-center shadow-[0_18px_42px_-34px_rgba(26,41,58,0.45)] transition-[box-shadow,border-color,transform] duration-300 hover:shadow-[0_24px_54px_-32px_rgba(26,41,58,0.55)] hover:scale-[1.01] ${partyCardOffsets[idx % partyCardOffsets.length]} ${partyCardStyles[idx % partyCardStyles.length].border} ${partyCardStyles[idx % partyCardStyles.length].bg}`}
              >
                <PartyWatermark color={partyCardStyles[idx % partyCardStyles.length].watermark} />
                <div className="relative z-10 mx-auto flex justify-center">
                  <PartyIllustration
                    type={partyCardStyles[idx % partyCardStyles.length].icon}
                    primary={partyCardStyles[idx % partyCardStyles.length].primary}
                    secondary={partyCardStyles[idx % partyCardStyles.length].secondary}
                    iconBg={partyCardStyles[idx % partyCardStyles.length].iconBg}
                  />
                </div>
                <h3
                  className={`relative z-10 mt-5 text-2xl ${partyCardStyles[idx % partyCardStyles.length].title}`}
                >
                  {item.title}
                </h3>
                <p className="relative z-10 mx-auto mt-2 max-w-[15rem] text-sm leading-relaxed text-slate-600">
                  {item.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
