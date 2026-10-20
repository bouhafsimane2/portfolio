import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Imane Bouhafs — AI, Data Science & Full-Stack",
  description: "Imane Bouhafs — AI & Data Science Engineer, Full-Stack and UX/UI Design.",
  openGraph: {
    title: "Imane Bouhafs",
    description: "From AI models to full-stack code, elevated by avant-garde design.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0F19",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
