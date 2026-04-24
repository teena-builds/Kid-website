import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CtaBand } from "@/components/home/cta-band";
import { ProgramsGrid } from "@/components/home/programs-grid";

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>
        {children}
        <CtaBand />
        <ProgramsGrid />
      </main>
      <Footer />
    </>
  );
}
