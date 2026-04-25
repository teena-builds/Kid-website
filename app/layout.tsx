import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  title: "KidNest Play Center",
  description:
    "Premium kids play center, events, day care, and joyful learning experiences."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} bg-brand-cream text-brand-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
