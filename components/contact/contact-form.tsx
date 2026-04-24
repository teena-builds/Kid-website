export function ContactForm() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#fff6eb] p-6 shadow-soft sm:p-8">
      <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#14bdb6]/10" />
      <div className="pointer-events-none absolute -bottom-10 -left-8 h-36 w-36 rounded-full bg-[#f79a1e]/10" />

      <h2 className="relative z-10 font-[var(--font-display)] text-4xl font-semibold text-brand-ink sm:text-5xl">
        Contact Us Right Here
      </h2>
      <p className="relative z-10 mt-3 text-base leading-relaxed text-slate-600">
        We are happy to answer your questions about admissions, programs, and daily care.
      </p>

      <form className="relative z-10 mt-8 space-y-5" aria-label="Contact form">
        <div>
          <label htmlFor="contact-full-name" className="mb-2 block text-sm font-semibold text-brand-ink">
            Full Name
          </label>
          <input
            id="contact-full-name"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            className="h-12 w-full rounded-xl border border-[#ead9c7] bg-white px-4 text-base text-brand-ink outline-none transition focus-visible:ring-2 focus-visible:ring-brand-teal"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-brand-ink">
              Email Address
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="h-12 w-full rounded-xl border border-[#ead9c7] bg-white px-4 text-base text-brand-ink outline-none transition focus-visible:ring-2 focus-visible:ring-brand-teal"
            />
          </div>
          <div>
            <label htmlFor="contact-phone" className="mb-2 block text-sm font-semibold text-brand-ink">
              Phone Number
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              placeholder="+1 (212) 555-0000"
              className="h-12 w-full rounded-xl border border-[#ead9c7] bg-white px-4 text-base text-brand-ink outline-none transition focus-visible:ring-2 focus-visible:ring-brand-teal"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-subject" className="mb-2 block text-sm font-semibold text-brand-ink">
            Subject
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            placeholder="How can we help?"
            className="h-12 w-full rounded-xl border border-[#ead9c7] bg-white px-4 text-base text-brand-ink outline-none transition focus-visible:ring-2 focus-visible:ring-brand-teal"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-brand-ink">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            placeholder="Share your question and preferred callback time."
            className="w-full rounded-xl border border-[#ead9c7] bg-white px-4 py-3 text-base text-brand-ink outline-none transition focus-visible:ring-2 focus-visible:ring-brand-teal"
          />
        </div>

        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input
            type="checkbox"
            name="privacyPolicy"
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-teal focus:ring-brand-teal"
          />
          <span>I agree to privacy policy</span>
        </label>

        <button
          type="submit"
          className="inline-flex rounded-full bg-[#f79a1e] px-8 py-3 text-base font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ee8f14] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral"
        >
          Send Now
        </button>
      </form>
    </section>
  );
}
