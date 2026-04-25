import Image from "next/image";
import { galleryImages } from "@/data/home-data";
import { Reveal } from "@/components/ui/reveal";

export function GallerySection() {
  return (
    <section id="gallery-preview" className="scroll-mt-32 bg-white py-20 lg:py-28">
      <span id="gallery" className="block scroll-mt-32" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-coral">
            Gallery
          </p>
          <h2 className="mt-3 text-4xl text-brand-ink sm:text-5xl">
            Visual highlights from our spaces and events.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, idx) => (
            <Reveal key={image} delay={idx * 0.05}>
              <div className="group relative overflow-hidden rounded-[1.65rem] shadow-card ring-1 ring-slate-100">
                <Image
                  src={image}
                  alt="KidNest gallery highlight"
                  width={900}
                  height={900}
                  loading={idx > 2 ? "lazy" : "eager"}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
