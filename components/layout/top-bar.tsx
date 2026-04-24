import Link from "next/link";
import { utilityMeta } from "@/lib/navigation-data";

export function TopBar() {
  return (
    <div className="hidden border-b border-[#1fa7a2] bg-[#23b9b3] md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-sm text-white/90 lg:px-8">
        <p className="font-semibold text-white">
          Admission open for the new session. Book a campus visit today.
        </p>
        <div className="flex items-center gap-6">
          {utilityMeta.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                <span className="font-semibold">{item.label}:</span> {item.value}
              </Link>
            ) : (
              <p key={item.label}>
                <span className="font-semibold">{item.label}:</span> {item.value}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
