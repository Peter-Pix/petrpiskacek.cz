import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

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
  title: "Petr Piskáček — praktické zkušenosti s AI.",
  description:
    "Většina developerů neumí vysvětlit, co dělají. Já ano. Technologie není cíl, je to nástroj.",
  keywords: [
    "Petr Piskáček",
    "AI konzultant",
    "AI Solutions Architect",
    "full-stack developer",
    "Next.js",
    "React",
    "TypeScript",
    "AI",
    "automatizace",
    "voice cloning",
    "sub-agents",
    "Czech developer",
    "psychologie",
    "AI spesialist",
  ],
  authors: [{ name: "Petr Piskáček" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Petr Piskáček — AI, psychologie a kód.",
    description:
      "Většina developerů neumí vysvětlit, co dělají. Já ano. Technologie není cíl, je to nástroj.",
    type: "website",
    locale: "cs_CZ",
    url: defaultUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Petr Piskáček — AI, IT, DevOps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Petr Piskáček — AI, IT, DevOps",
    description: "Stavím AI systémy, co pomáhají.",
  },
};

import JsonLd from "@/components/JsonLd";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-gold/30 selection:text-white">
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        <ScrollProgress />
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
