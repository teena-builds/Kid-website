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

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
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
