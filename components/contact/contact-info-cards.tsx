import { Mail, MapPin, Phone } from "lucide-react";

const contactInfoCards = [
  {
    label: "Call Us",
    value: "907-200-3462",
    href: "tel:+19072003462",
    icon: Phone,
    iconWrapClass: "rounded-full bg-[#14bdb6] text-white"
  },
  {
    label: "Visit Us",
    value: "14/A, Kilix Home Tower",
    href: "https://maps.google.com/?q=14%2FA+Kilix+Home+Tower+NYC",
    icon: MapPin,
    iconWrapClass: "rounded-[44%_56%_61%_39%/47%_39%_61%_53%] bg-[#f79a1e] text-white"
  },
  {
    label: "Email Us",
    value: "support@kindedo.com",
    href: "mailto:support@kindedo.com",
    icon: Mail,
    iconWrapClass: "rounded-full bg-[#f45584] text-white"
  }
];

export function ContactInfoCards() {
  return (
    <section className="bg-[#fffaf1] pb-12 pt-16 lg:pb-14 lg:pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contactInfoCards.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.label === "Visit Us" ? "_blank" : undefined}
              rel={item.label === "Visit Us" ? "noreferrer noopener" : undefined}
              className="group flex min-h-[250px] flex-col items-center justify-center rounded-3xl border border-[#f2d8b6] bg-[#ffffff] p-8 text-center shadow-[0_16px_34px_-28px_rgba(35,43,50,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
              aria-label={`${item.label}: ${item.value}`}
            >
              <span
                className={`mx-auto inline-flex h-24 w-24 items-center justify-center transition-transform duration-300 group-hover:scale-[1.04] ${item.iconWrapClass}`}
                role="img"
                aria-label={item.label}
              >
                <item.icon className="h-10 w-10" aria-hidden="true" />
              </span>
              <p className="sr-only">{item.label}</p>
              <p className="mt-9 max-w-[280px] text-[1.2rem] leading-normal text-brand-ink">
                {item.value}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
