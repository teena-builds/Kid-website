import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AboutPageContent } from "@/components/about/about-page-content";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutPageContent />
      </main>
      <Footer />
    </>
  );
}
