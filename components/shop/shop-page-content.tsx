import Image from "next/image";
import { CheckCircle2, Clock3, Music2, Palette, ShieldCheck, Sparkles } from "lucide-react";
import { InnerBanner } from "@/components/shop/inner-banner";
import { ShopFaqAccordion } from "@/components/shop/shop-faq-accordion";
import { shopPageMeta, type ShopPageKey } from "@/data/shop-pages-data";

type ShopPageContentProps = {
  pageKey: ShopPageKey;
};

function SectionTitle({
  label,
  title,
  desc
}: {
  label: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-medium uppercase tracking-[0.14em] text-brand-coral">
        {label}
      </p>
      <h2 className="mt-3 font-[var(--font-display)] text-5xl font-semibold text-brand-ink">
        {title}
      </h2>
      <p className="mt-3 text-lg leading-relaxed text-slate-600">{desc}</p>
    </div>
  );
}

function IntroSplit({
  image,
  imageAlt,
  title,
  description,
  bullets
}: {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  bullets: string[];
}) {
  return (
    <section className="bg-[#fffaf1] py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:px-8">
        <div className="relative h-[340px] overflow-hidden rounded-[2rem] shadow-soft sm:h-[420px]">
          <Image src={image} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-500 hover:scale-[1.03]" />
        </div>
        <div>
          <h2 className="font-[var(--font-display)] text-5xl font-semibold text-brand-ink">
            {title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">{description}</p>
          <ul className="mt-6 space-y-3">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-3 text-lg text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-brand-teal" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function PlayGroupSections() {
  const cards = [
    { title: "Social Circle Time", text: "Guided group games that improve sharing and confidence." },
    { title: "Sensory Discovery", text: "Textures, sounds, and color play designed for toddlers." },
    { title: "Language Moments", text: "Rhymes and short stories that build early communication." }
  ];
  const routine = [
    ["08:30 AM", "Welcome play and free exploration"],
    ["10:00 AM", "Circle songs and language activities"],
    ["11:00 AM", "Snack break and movement games"],
    ["12:00 PM", "Quiet storytelling and pickup"]
  ];

  return (
    <>
      <IntroSplit
        image="https://images.pexels.com/photos/8613021/pexels-photo-8613021.jpeg?auto=compress&cs=tinysrgb&w=1400"
        imageAlt="Toddlers enjoying play group activities"
        title="A joyful first school experience"
        description="Our Play Group is thoughtfully designed for toddlers who are beginning their social and learning journey. Every session balances comfort, curiosity, and guided play."
        bullets={[
          "Small class groups for individual attention",
          "Warm transitions for first-time learners",
          "Play-led learning through daily routines"
        ]}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionTitle
            label="Fun Learning"
            title="Program Highlights"
            desc="Every activity supports growth through movement, interaction, and imagination."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {cards.map((card, idx) => (
              <article key={card.title} className={`rounded-3xl p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft ${["bg-[#ecfbfa]", "bg-[#fff4ea]", "bg-[#f4f0ff]"][idx]}`}>
                <Sparkles className="h-7 w-7 text-brand-coral" />
                <h3 className="mt-4 font-[var(--font-display)] text-3xl font-semibold text-brand-ink">{card.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eefaf8] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionTitle
            label="Daily Routine"
            title="A Calm and Predictable Day"
            desc="Our routine helps toddlers feel secure while exploring new activities."
          />
          <div className="mx-auto mt-10 max-w-4xl space-y-4">
            {routine.map(([time, text]) => (
              <div key={time} className="flex flex-col rounded-2xl bg-white px-6 py-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
                <p className="font-[var(--font-display)] text-3xl font-semibold text-brand-teal">{time}</p>
                <p className="text-lg text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function NurserySections() {
  const cards = [
    { title: "Literacy Readiness", text: "Letter sounds, vocabulary, and guided reading prep." },
    { title: "Number Sense", text: "Counting, matching, and playful numeracy practice." },
    { title: "Curiosity Labs", text: "Hands-on projects for observation and exploration." }
  ];
  const timetable = [
    ["Monday", "Language + Music"],
    ["Tuesday", "Math + Art Studio"],
    ["Wednesday", "Story Lab + Nature Walk"],
    ["Thursday", "Creative Writing + Movement"],
    ["Friday", "Revision Games + Celebration Circle"]
  ];

  return (
    <>
      <IntroSplit
        image="https://images.pexels.com/photos/8423024/pexels-photo-8423024.jpeg?auto=compress&cs=tinysrgb&w=1400"
        imageAlt="Nursery children in guided classroom session"
        title="Building strong foundations"
        description="Nursery Program introduces structured learning while keeping joy at the center. Children build confidence through language, numbers, creativity, and interaction."
        bullets={[
          "Balanced learning and play throughout the week",
          "Teacher-supported activities for every pace",
          "Progress updates shared regularly with parents"
        ]}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {cards.map((card, idx) => (
              <article key={card.title} className={`rounded-3xl p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft ${["bg-[#eaf9ff]", "bg-[#fff4ea]", "bg-[#ecfbf6]"][idx]}`}>
                <h3 className="font-[var(--font-display)] text-3xl font-semibold text-brand-ink">{card.title}</h3>
                <p className="mt-3 text-base text-slate-600">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7fbff] py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="rounded-3xl bg-white p-8 shadow-card">
            <h3 className="font-[var(--font-display)] text-4xl font-semibold text-brand-ink">
              Way to Learn
            </h3>
            <ul className="mt-5 space-y-4 text-lg text-slate-600">
              <li className="flex gap-3"><Sparkles className="mt-0.5 h-5 w-5 text-brand-coral" />Theme-based weekly learning</li>
              <li className="flex gap-3"><Sparkles className="mt-0.5 h-5 w-5 text-brand-coral" />Interactive worksheets and storytelling</li>
              <li className="flex gap-3"><Sparkles className="mt-0.5 h-5 w-5 text-brand-coral" />Continuous classroom observation</li>
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-card">
            <h3 className="font-[var(--font-display)] text-4xl font-semibold text-brand-ink">
              Weekly Timetable
            </h3>
            <div className="mt-5 space-y-3">
              {timetable.map(([day, item]) => (
                <div key={day} className="flex items-center justify-between rounded-2xl bg-[#f8fafc] px-4 py-3">
                  <span className="font-medium text-brand-ink">{day}</span>
                  <span className="text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function JuniorKgSections() {
  const faq = [
    {
      question: "How is Junior KG different from Nursery?",
      answer:
        "Junior KG introduces stronger pre-academic structure with literacy, writing readiness, and independent task completion."
    },
    {
      question: "How do teachers support shy children?",
      answer:
        "Teachers use small-group instruction and personalized encouragement to build confidence in speaking and participation."
    },
    {
      question: "Do you share monthly progress reports?",
      answer:
        "Yes, we provide parent updates with skill milestones, classroom participation, and next-focus learning areas."
    }
  ];

  return (
    <>
      <IntroSplit
        image="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1400"
        imageAlt="Junior KG children writing and learning"
        title="Early academics with joyful structure"
        description="Junior KG bridges playful learning and academic readiness through teacher-guided sessions, practical activities, and strong communication support."
        bullets={[
          "Phonics and word-building practice",
          "Number operations through visual methods",
          "Confidence-focused classroom participation"
        ]}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Reading Readiness",
              "Writing Control",
              "Math Foundations"
            ].map((skill, idx) => (
              <article key={skill} className={`rounded-3xl p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft ${["bg-[#eef8ff]", "bg-[#fff5ea]", "bg-[#edfdfa]"][idx]}`}>
                <h3 className="font-[var(--font-display)] text-3xl font-semibold text-brand-ink">{skill}</h3>
                <p className="mt-3 text-base text-slate-600">
                  Carefully designed practice activities help children master {skill.toLowerCase()} with confidence.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff8ef] py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="rounded-3xl bg-white p-8 shadow-card">
            <h3 className="font-[var(--font-display)] text-4xl font-semibold text-brand-ink">
              Teacher-Guided Growth
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Every class is led with clear goals, activity blocks, and reflection time so children learn how to think, express, and solve confidently.
            </p>
            <div className="mt-6 space-y-4 text-base text-slate-700">
              <p className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-brand-teal" />Personal attention in small learning groups</p>
              <p className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-brand-teal" />Active feedback loop with parents</p>
            </div>
          </div>
          <div>
            <ShopFaqAccordion items={faq} />
          </div>
        </div>
      </section>
    </>
  );
}

function SeniorKgSections() {
  const stats = [
    { label: "Reading readiness", value: "96%" },
    { label: "Math confidence", value: "92%" },
    { label: "School transition success", value: "98%" }
  ];
  const outcomes = [
    "Confident communication and expression",
    "Early problem-solving and reasoning skills",
    "Independent classroom habits and discipline",
    "Strong kindergarten-to-primary transition readiness"
  ];

  return (
    <>
      <IntroSplit
        image="https://images.pexels.com/photos/8423026/pexels-photo-8423026.jpeg?auto=compress&cs=tinysrgb&w=1400"
        imageAlt="Senior KG students working on learning tasks"
        title="Ready for the next school step"
        description="Senior KG prepares children for primary school through structured academics, social confidence building, and clear progress tracking."
        bullets={[
          "Goal-based classroom planning",
          "Writing, reading, and number fluency focus",
          "School-readiness outcomes shared with families"
        ]}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((item, idx) => (
              <article key={item.label} className={`rounded-3xl p-7 text-center shadow-card ${["bg-[#ecfbf7]", "bg-[#fff4ea]", "bg-[#edf4ff]"][idx]}`}>
                <p className="font-[var(--font-display)] text-6xl font-semibold text-brand-ink">{item.value}</p>
                <p className="mt-2 text-lg text-slate-600">{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7fbff] py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-white shadow-card">
            <h3 className="bg-brand-teal px-6 py-5 font-[var(--font-display)] text-4xl font-semibold text-white">
              Detailed Timetable
            </h3>
            <div className="divide-y divide-slate-100 px-6 py-4 text-base">
              {[
                ["Language & Writing", "Mon / Wed / Fri"],
                ["Math & Logic", "Tue / Thu"],
                ["Project Learning", "Friday"],
                ["Communication Workshop", "Daily short module"]
              ].map(([topic, days]) => (
                <div key={topic} className="flex items-center justify-between py-3">
                  <span className="font-medium text-brand-ink">{topic}</span>
                  <span className="text-slate-600">{days}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-card">
            <h3 className="font-[var(--font-display)] text-4xl font-semibold text-brand-ink">
              Learning Outcomes
            </h3>
            <ul className="mt-5 space-y-3 text-lg text-slate-700">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-brand-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function ActivityClassesSections() {
  const activities = [
    { title: "Art Studio", icon: Palette, desc: "Drawing, clay modeling, and texture art." },
    { title: "Music Circle", icon: Music2, desc: "Rhythm, percussion, and melody play." },
    { title: "Dance & Movement", icon: Sparkles, desc: "Body coordination and expression sessions." },
    { title: "Craft Lab", icon: Palette, desc: "Paper craft, collage, and creative building." }
  ];
  const timings = [
    ["Art Studio", "Mon & Wed", "4:00 PM - 5:00 PM"],
    ["Music Circle", "Tue & Thu", "4:30 PM - 5:30 PM"],
    ["Dance Class", "Friday", "4:00 PM - 5:15 PM"]
  ];

  return (
    <>
      <section className="bg-[#fff9ef] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionTitle
            label="Creative Programs"
            title="Learn Through Art and Expression"
            desc="Our activity classes help children discover talents, gain confidence, and express ideas joyfully."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {activities.map((item, idx) => (
              <article key={item.title} className={`rounded-3xl p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft ${["bg-[#ecfbf8]", "bg-[#eef7ff]", "bg-[#fff0f6]", "bg-[#fff4ea]"][idx]}`}>
                <item.icon className="h-7 w-7 text-brand-coral" />
                <h3 className="mt-4 font-[var(--font-display)] text-3xl font-semibold text-brand-ink">{item.title}</h3>
                <p className="mt-3 text-base text-slate-600">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2">
            {[
              "https://images.pexels.com/photos/8471827/pexels-photo-8471827.jpeg?auto=compress&cs=tinysrgb&w=1000",
              "https://images.pexels.com/photos/8613213/pexels-photo-8613213.jpeg?auto=compress&cs=tinysrgb&w=1000",
              "https://images.pexels.com/photos/8471709/pexels-photo-8471709.jpeg?auto=compress&cs=tinysrgb&w=1000",
              "https://images.pexels.com/photos/8612877/pexels-photo-8612877.jpeg?auto=compress&cs=tinysrgb&w=1000"
            ].map((src, idx) => (
              <div key={src} className={`group relative overflow-hidden rounded-3xl ${idx === 0 ? "md:col-span-2 md:row-span-2 h-[340px]" : "h-[160px] md:h-auto"}`}>
                <Image src={src} alt="Activity class moment" fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef9f8] py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <SectionTitle label="Class Schedule" title="Weekly Timing Cards" desc="Flexible evening timing for parents and children." />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {timings.map(([title, days, time]) => (
              <article key={title} className="rounded-3xl bg-white p-6 shadow-card">
                <Clock3 className="h-6 w-6 text-brand-teal" />
                <h3 className="mt-3 font-[var(--font-display)] text-2xl font-semibold text-brand-ink">{title}</h3>
                <p className="mt-2 text-base text-slate-600">{days}</p>
                <p className="mt-1 text-sm text-brand-coral">{time}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function DayCareSections() {
  const faq = [
    {
      question: "How do you ensure child safety all day?",
      answer:
        "Our day care includes secured entry, supervised zones, trained caregivers, and real-time parent communication."
    },
    {
      question: "Can parents choose flexible timings?",
      answer:
        "Yes. We offer half-day and full-day options with structured routines based on your family schedule."
    },
    {
      question: "What support is available for meals and naps?",
      answer:
        "Caregivers follow parent-approved meal and nap routines to maintain consistency and comfort."
    }
  ];

  return (
    <>
      <IntroSplit
        image="https://images.pexels.com/photos/3933243/pexels-photo-3933243.jpeg?auto=compress&cs=tinysrgb&w=1400"
        imageAlt="Caregiver supporting child in day care room"
        title="A safe second home for your child"
        description="Day Care program is built for working families who want dependable care, meaningful routines, and emotional warmth throughout the day."
        bullets={[
          "Safe facilities with supervised play zones",
          "Healthy routine with nap and meal planning",
          "Daily updates for parents and guardians"
        ]}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Safety First", desc: "Secured access, CCTV monitoring, and emergency-trained staff.", icon: ShieldCheck },
              { title: "Warm Care", desc: "Emotion-focused caregiving with age-appropriate comfort.", icon: Sparkles },
              { title: "Daily Communication", desc: "Meal, nap, and activity updates shared with families.", icon: CheckCircle2 }
            ].map((item, idx) => (
              <article key={item.title} className={`rounded-3xl p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft ${["bg-[#ecfbf8]", "bg-[#fff4ea]", "bg-[#edf4ff]"][idx]}`}>
                <item.icon className="h-7 w-7 text-brand-coral" />
                <h3 className="mt-4 font-[var(--font-display)] text-3xl font-semibold text-brand-ink">{item.title}</h3>
                <p className="mt-3 text-base text-slate-600">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7fbff] py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionTitle label="Routine" title="A Structured and Calm Day" desc="Children stay engaged, rested, and cared for with balanced routines." />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              ["Morning Welcome", "Guided free-play and healthy breakfast support."],
              ["Learning Window", "Age-suitable reading, craft, and social activities."],
              ["Rest & Recharge", "Quiet nap period in monitored comfort zones."],
              ["Evening Wind-Down", "Storytime, pick-up prep, and parent handover updates."]
            ].map(([title, desc]) => (
              <article key={title} className="rounded-3xl bg-white p-6 shadow-card">
                <h3 className="font-[var(--font-display)] text-3xl font-semibold text-brand-ink">{title}</h3>
                <p className="mt-3 text-base text-slate-600">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff8ef] py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <SectionTitle label="Parent FAQ" title="Know More About Day Care" desc="Transparent care policy and clear communication for every family." />
          <div className="mt-10">
            <ShopFaqAccordion items={faq} />
          </div>
        </div>
      </section>
    </>
  );
}

export function ShopPageContent({ pageKey }: ShopPageContentProps) {
  const meta = shopPageMeta[pageKey];

  return (
    <>
      <InnerBanner banner={meta.banner} />

      {pageKey === "play-group" && <PlayGroupSections />}
      {pageKey === "nursery-program" && <NurserySections />}
      {pageKey === "junior-kg" && <JuniorKgSections />}
      {pageKey === "senior-kg" && <SeniorKgSections />}
      {pageKey === "activity-classes" && <ActivityClassesSections />}
      {pageKey === "day-care" && <DayCareSections />}
    </>
  );
}
