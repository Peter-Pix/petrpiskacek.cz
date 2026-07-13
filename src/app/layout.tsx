import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

const defaultUrl = "https://petrpiskacek.cz";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Petr Piskáček — AI Solutions Architect & Full‑Stack Developer",
  description:
    "AI konzultant a full-stack vývojář. 20+ let v IT, specializace na AI integrace, automatizaci procesů a moderní webové aplikace. Next.js, React, TypeScript, LLM.",
  keywords: [
    "Petr Piskáček",
    "AI konzultant",
    "AI Solutions Architect",
    "full-stack developer",
    "Next.js",
    "React",
    "TypeScript",
    "AI automatizace",
    "LLM integrace",
    "Ollama",
    "4rap.cz",
    "Willy Tea",
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
    title: "Petr Piskáček — AI Solutions Architect & Full‑Stack Developer",
    description:
      "AI konzultant a full-stack vývojář. 20+ let v IT, specializace na AI integrace, automatizaci a moderní webové aplikace.",
    type: "website",
    locale: "cs_CZ",
    url: defaultUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Petr Piskáček — AI Solutions Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Petr Piskáček — AI Solutions Architect",
    description: "AI konzultant a full-stack vývojář. 20+ let v IT.",
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
