import type { Metadata } from "next";
import ScrollProgress from "@/components/ScrollProgress";
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
  title: "Petr Piskáček — AI, psychologie a kód.",
  description:
    "Stavím AI systémy, které něco dělají. 20 let v IT, psychologie a praktické zkušenosti s generativní AI. Od voice cloningu po sub-agentní architektury.",
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
    "generativní AI",
    "psychologie",
    "Willy Tea",
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
      "Stavím AI systémy, které něco dělají. 20 let v IT, psychologie a generativní AI.",
    type: "website",
    locale: "cs_CZ",
    url: defaultUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Petr Piskáček — AI, psychologie a kód",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Petr Piskáček — AI, psychologie a kód",
    description: "Stavím AI systémy, které něco dělají. 20 let v IT.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-gold/30 selection:text-white">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
