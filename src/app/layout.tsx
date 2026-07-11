import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

const defaultUrl = "https://petrpiskacek.cz";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Petr Piskáček — IT specialista, psycholog, AI builder",
  description:
    "Portfolio Petra Piskáčka: full-stack vývojář, psycholog a rapový umělec Willy Tea. Staví Next.js aplikace, AI asistenty a kreativní nástroje pro rapery.",
  keywords: [
    "Petr Piskáček",
    "Willy Tea",
    "Next.js",
    "React",
    "TypeScript",
    "AI",
    "Ollama",
    "4rap.cz",
    "Czech rap",
    "portfolio",
  ],
  authors: [{ name: "Petr Piskáček" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Petr Piskáček — IT specialista, psycholog, AI builder",
    description:
      "Full-stack vývojář, psycholog a rapový umělec. Staví Next.js aplikace, AI asistenty a kreativní nástroje.",
    type: "website",
    locale: "cs_CZ",
    url: defaultUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Petr Piskáček — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Petr Piskáček — Portfolio",
    description: "IT specialista, psycholog, AI builder",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className="scroll-smooth">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-gold/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
