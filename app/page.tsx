import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { FeatureCards } from "@/components/home/feature-cards";
import { AboutSection } from "@/components/home/about-section";
import { PromoSection } from "@/components/home/promo-section";
import { EventsSection } from "@/components/home/events-section";
import { Testimonials } from "@/components/home/testimonials";
import { CtaBand } from "@/components/home/cta-band";
import { GallerySection } from "@/components/home/gallery-section";
import { ProgramsGrid } from "@/components/home/programs-grid";
import { ThemeParties } from "@/components/home/theme-parties";
import { breadcrumbSchema, createPageMetadata, jsonLdProps } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "KidNest Play Center | Preschool, Day Care & Kids Activities",
  description:
    "Safe preschool, day care, activity classes, and playful early learning programs for children with expert teachers and parent-friendly support.",
  path: "/"
});

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <script {...jsonLdProps(breadcrumbSchema([{ name: "Home", path: "/" }]))} />
        {/* Section sequence follows the requested narrative rhythm for homepage storytelling. */}
        <HeroSection />
        <FeatureCards />
        <AboutSection />
        <ProgramsGrid />
        <PromoSection />
        <ThemeParties />
        <CtaBand />
        <EventsSection />
        <Testimonials />
        <GallerySection />
      </main>
      <Footer />
    </>
  );
}
