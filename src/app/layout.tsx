import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
  openGraph: {
    title: "Petr Piskáček — IT specialista, psycholog, AI builder",
    description:
      "Full-stack vývojář, psycholog a rapový umělec. Staví Next.js aplikace, AI asistenty a kreativní nástroje.",
    type: "website",
    locale: "cs_CZ",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
