import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { InnerBanner } from "@/components/shop/inner-banner";
import { ContactInfoCards } from "@/components/contact/contact-info-cards";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactMap } from "@/components/contact/contact-map";

const contactBanner = {
  title: "Contact Us",
  breadcrumb: "Home / Contact Us",
  image:
    "https://images.pexels.com/photos/8613100/pexels-photo-8613100.jpeg?auto=compress&cs=tinysrgb&w=1600",
  imageAlt: "Children and teacher in a bright kindergarten classroom"
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <InnerBanner banner={contactBanner} />
        <ContactInfoCards />

        <section className="bg-[#fffaf1] pb-20 pt-8 lg:pb-24 lg:pt-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-7 lg:grid-cols-[1fr_0.95fr]">
              <ContactForm />
              <ContactMap />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
