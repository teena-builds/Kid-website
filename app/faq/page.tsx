import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FaqPageContent } from "@/components/faq/faq-page-content";
import { faqItems } from "@/data/faq-data";
import { breadcrumbSchema, createPageMetadata, jsonLdProps } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "KidNest Play Center | Frequently Asked Questions",
  description:
    "Answers for parents about KidNest admissions, class timings, curriculum, safety, fees, trial classes, and parent communication.",
  path: "/faq"
});

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: stripHtml(item.answer)
    }
  }))
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <script {...jsonLdProps(faqSchema)} />
        <script
          {...jsonLdProps(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "FAQ", path: "/faq" }
            ])
          )}
        />
        <FaqPageContent />
      </main>
      <Footer />
    </>
  );
}
