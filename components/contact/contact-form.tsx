import { Send } from "lucide-react";

export function ContactForm() {
  return (
    <section className="relative max-w-[550px] overflow-hidden rounded-2xl bg-[#eefcff]/95 p-6 shadow-[0_24px_60px_-34px_rgba(4,56,68,0.7)] sm:p-7">
      <div className="pointer-events-none absolute inset-3 rounded-[1.35rem] border-2 border-dashed border-[#1fb8d3]/50" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-8 top-8 h-16 w-16 text-[#f79a1e]/25">
        <svg viewBox="0 0 70 70" className="h-full w-full" fill="none">
          <path d="m35 8 5 17 18 1-14 11 5 18-14-10-15 10 5-18-14-11 18-1 6-17Z" fill="currentColor" />
        </svg>
      </div>

      <p className="relative z-10 text-xs uppercase tracking-[0.16em] text-[#f79a1e]">
        Send Us A Message
      </p>
      <h2 className="relative z-10 mt-3 text-3xl leading-tight text-[#103f47] sm:text-4xl">
        Have Questions About Enrollment?
      </h2>

      <form className="relative z-10 mt-6 space-y-3.5" aria-label="Contact form">
        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-full-name" className="mb-2 block text-sm text-[#103f47]">
              Your Name
            </label>
            <input
              id="contact-full-name"
              name="fullName"
              type="text"
              placeholder="Enter Your Full Name"
              className="h-10 w-full rounded-lg border border-[#c8e5ea] bg-white px-3.5 text-sm text-brand-ink outline-none transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-brand-teal"
            />
          </div>
          <div>
            <label htmlFor="contact-company" className="mb-2 block text-sm text-[#103f47]">
              Company
            </label>
            <input
              id="contact-company"
              name="company"
              type="text"
              placeholder="Company"
              className="h-10 w-full rounded-lg border border-[#c8e5ea] bg-white px-3.5 text-sm text-brand-ink outline-none transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-brand-teal"
            />
          </div>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-phone" className="mb-2 block text-sm text-[#103f47]">
              Phone
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              placeholder="Enter Your Phone Number"
              className="h-10 w-full rounded-lg border border-[#c8e5ea] bg-white px-3.5 text-sm text-brand-ink outline-none transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-brand-teal"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-2 block text-sm text-[#103f47]">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="Enter Your Email Address"
              className="h-10 w-full rounded-lg border border-[#c8e5ea] bg-white px-3.5 text-sm text-brand-ink outline-none transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-brand-teal"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-subject" className="mb-2 block text-sm text-[#103f47]">
            Subject
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            placeholder="Tell Your Subject"
            className="h-10 w-full rounded-lg border border-[#c8e5ea] bg-white px-3.5 text-sm text-brand-ink outline-none transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-brand-teal"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-2 block text-sm text-[#103f47]">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            placeholder="Message"
            className="w-full rounded-lg border border-[#c8e5ea] bg-white px-3.5 py-2.5 text-sm text-brand-ink outline-none transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-brand-teal"
          />
        </div>

        <button
          type="submit"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--btn-color)] px-8 text-xs uppercase tracking-wide text-white shadow-[0_16px_34px_-22px_rgba(247,154,30,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--btn-color-hover)] hover:shadow-[0_20px_40px_-22px_rgba(247,154,30,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Send Message
        </button>
      </form>
    </section>
  );
}
