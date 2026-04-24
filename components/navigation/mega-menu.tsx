import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { shopMegaMenuColumns } from "@/lib/navigation-data";

type MegaMenuProps = {
  panelId: string;
  onClose: () => void;
  className?: string;
};

export function MegaMenu({ panelId, onClose, className = "" }: MegaMenuProps) {
  return (
    <motion.div
      id={panelId}
      role="menu"
      aria-label="Shop categories"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`absolute z-[90] mt-5 w-[min(95vw,1040px)] max-w-[calc(100vw-40px)] overflow-hidden rounded-3xl bg-[#5ccfca] p-6 shadow-soft xl:p-8 ${className}`}
    >
      {/* 2-column program cards + 1 promotional panel to create a mini-landing mega menu. */}
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr_1.1fr]">
        {shopMegaMenuColumns.map((column, index) => (
          <div key={index} className="space-y-4">
            {column.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                role="menuitem"
                onClick={onClose}
                className="group flex rounded-2xl bg-white/85 p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/70"
              >
                <span className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#dbf8f6] text-brand-ink">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-[var(--font-display)] text-xl font-semibold text-brand-ink">
                    {item.id} {item.title}
                  </span>
                  <span className="mt-1 block text-sm text-slate-600">
                    {item.subtitle}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        ))}

        <article className="relative min-h-72 overflow-hidden rounded-3xl bg-gradient-to-br from-[#f8c259] via-[#f7a35b] to-[#ef7f6d] p-6 text-white shadow-soft">
          <Image
            src="https://images.pexels.com/photos/8613111/pexels-photo-8613111.jpeg?auto=compress&cs=tinysrgb&w=900"
            alt="Children learning numbers in a classroom"
            fill
            sizes="(max-width: 1024px) 100vw, 360px"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-end">
            <p className="mb-2 text-xs uppercase tracking-[0.22em] text-white/85">
              New Season
            </p>
            <h3 className="font-[var(--font-display)] text-4xl font-bold leading-tight">
              Join New Program
            </h3>
            <p className="mt-3 text-sm text-white/90">
              Reserve your child&apos;s spot in our guided activity tracks.
            </p>
            <Link
              href="#programs"
              onClick={onClose}
              className="mt-5 inline-flex w-fit items-center rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand-ink transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              View More
            </Link>
          </div>
        </article>
      </div>
    </motion.div>
  );
}
