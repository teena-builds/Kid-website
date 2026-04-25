import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { InnerBanner } from "@/components/shop/inner-banner";
import { ContactInfoCards } from "@/components/contact/contact-info-cards";
import { ContactForm } from "@/components/contact/contact-form";
import Image from "next/image";
import { BookOpen, Headphones, Lightbulb, Mail } from "lucide-react";
import Link from "next/link";

const contactBanner = {
  title: "Contact Us",
  breadcrumb: "Home / Contact Us",
  image:
    "https://images.pexels.com/photos/8613100/pexels-photo-8613100.jpeg?auto=compress&cs=tinysrgb&w=1600",
  imageAlt: "Children and teacher in a bright kindergarten classroom"
};

const supportCards = [
  {
    title: "Parent Support",
    text: "Get help with admissions, programs, and everything you need to start your child’s journey with us.",
    button: "Contact Us",
    href: "/contact",
    icon: Headphones,
    className: "bg-[#14bdb6] shadow-[0_24px_54px_-32px_rgba(20,189,182,0.85)]",
    buttonClass: "text-[#0f8f89]"
  },
  {
    title: "Admission Help",
    text: "Have questions about enrollment or process? Our team will guide you step-by-step.",
    button: "Start Inquiry",
    href: "/contact#form",
    icon: Mail,
    className: "bg-[#f79a1e] shadow-[0_24px_54px_-32px_rgba(247,154,30,0.85)]",
    buttonClass: "text-[#c96f08]"
  },
  {
    title: "Explore Programs",
    text: "Discover our learning programs designed to nurture creativity, growth, and confidence.",
    button: "View Programs",
    href: "/programs",
    icon: BookOpen,
    className: "bg-[#78c850] shadow-[0_24px_54px_-32px_rgba(120,200,80,0.85)]",
    buttonClass: "text-[#4c9c2d]"
  }
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <InnerBanner banner={contactBanner} />
        <ContactInfoCards />

        <section className="relative overflow-hidden py-16 pb-32 md:py-0">
          <Image
            src="https://images.pexels.com/photos/8088086/pexels-photo-8088086.jpeg?auto=compress&cs=tinysrgb&w=2200"
            alt=""
            fill
            aria-hidden="true"
            sizes="100vw"
            className="z-0 object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 z-10 bg-[#0d7f8e]/45" />
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#0b6f82]/45 via-[#0b6f82]/20 to-transparent" />

          <svg
            aria-hidden="true"
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-[-1px] z-20 h-[54px] w-full text-[#fffaf1] sm:h-[72px]"
            fill="currentColor"
          >
            <path d="M0 0h1440v40c-150 26-302 36-456 28-156-8-284-34-452-24-181 11-338 41-532 16V0Z" />
          </svg>

          <div className="relative z-30 mx-auto flex min-h-0 max-w-7xl items-start px-6 pt-10 md:min-h-[520px] md:pt-[128px] lg:min-h-[600px] lg:px-8 lg:pt-[150px]">
            <div className="w-full max-w-[550px]">
              <ContactForm />
            </div>
          </div>

          <svg
            aria-hidden="true"
            viewBox="0 0 1440 170"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-20 h-[70px] w-full text-white sm:h-[88px] lg:h-[100px]"
            fill="currentColor"
          >
            <path d="M0 92c30-24 74-24 104-1 22-44 91-45 115 1 28-55 116-57 148-1 26-31 78-30 103 1 30-58 124-59 156-1 28-38 91-38 119 1 27-50 108-50 136 0 27-31 79-31 106 0 31-59 124-57 155 0 24-27 71-27 95 0 27-46 100-46 128 0 25-21 61-21 85 0v78H0V92Z" />
          </svg>
        </section>

        <section className="relative bg-white pb-20 pt-10 lg:pb-28 lg:pt-14">
          <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
            <div className="relative mx-auto max-w-3xl">
              <p className="text-xs uppercase tracking-[0.18em] text-[#f79a1e]">
                Need More Support?
              </p>
              <h2 className="mt-3 text-4xl leading-tight text-[#103f47] sm:text-5xl">
                Need Extra Guidance? Our Team is Ready
              </h2>
              <Lightbulb
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -top-6 h-12 w-12 rotate-12 text-[#f79a1e]/65 sm:-right-12 sm:h-14 sm:w-14"
              />
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {supportCards.map((card) => (
                <article
                  key={card.title}
                  className={`group rounded-xl p-5 text-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_32px_66px_-32px_rgba(18,40,46,0.6)] ${card.className}`}
                >
                  <div className="rounded-lg border-2 border-dashed border-white/70 px-6 py-10">
                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#103f47] shadow-sm transition-transform duration-300 group-hover:scale-[1.04]">
                      <card.icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-2xl">
                      {card.title}
                    </h3>
                    <p className="mx-auto mt-3 flex min-h-[4.875rem] max-w-xs items-center justify-center text-sm leading-relaxed text-white/78">
                      {card.text}
                    </p>
                    <Link
                      href={card.href}
                      className={`mt-7 inline-flex rounded-full bg-white px-6 py-2 text-xs uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${card.buttonClass}`}
                    >
                      {card.button}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
