import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "KidNest Play Center | Thank You",
  description:
    "Thank you for contacting KidNest Play Center. Our parent support team will respond soon about admissions, programs, or visits.",
  path: "/thank-you"
});

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="bg-[#fffaf1]">
        <section className="mx-auto flex min-h-[58vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
          <CheckCircle2 className="h-14 w-14 text-[#14bdb6]" aria-hidden="true" />
          <p className="mt-5 text-xs uppercase tracking-[0.18em] text-[#f79a1e]">
            Message Received
          </p>
          <h1 className="mt-3 text-4xl leading-tight text-[#103f47] sm:text-5xl">
            Thank You
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Your message has been submitted. Our team will get back to you soon.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-[var(--btn-color)] px-7 py-3 text-xs uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--btn-color-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral"
          >
            Back To Home
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
