import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AboutPageContent } from "@/components/about/about-page-content";
import { breadcrumbSchema, createPageMetadata, jsonLdProps } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "KidNest Play Center | About Our Early Learning Center",
  description:
    "Learn about KidNest Play Center, our safe classrooms, caring teachers, child-first values, and parent-friendly early learning approach.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <script
          {...jsonLdProps(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" }
            ])
          )}
        />
        <AboutPageContent />
      </main>
      <Footer />
    </>
  );
}
