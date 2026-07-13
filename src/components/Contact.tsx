"use client";

import { useEffect, useState } from "react";
import { MailIcon, GithubIcon, ExternalLinkIcon } from "./icons";

const email = "ppix50@gmail.com";
const github = "https://github.com/Peter-Pix";
const website = "https://4rap.cz";

export default function Contact() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <section id="contact" className="relative px-5 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-label mb-3">Kontakt</p>
        <h2 className="mb-6 text-[1.75rem] font-semibold leading-tight tracking-tight text-white sm:text-4xl">
          Máte nápad nebo problém, který chcete vyřešit?
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-[0.95rem] leading-relaxed text-zinc-400 sm:text-base">
          Ať už potřebujete AI asistenta, automatizaci procesu nebo webovou aplikaci,
          rád se podívám na možnosti řešení.
        </p>

        {/* Availability badge */}
        <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-emerald-400">
            Aktuálně dostupný pro konzultace
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`mailto:${email}`}
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl glass px-5 py-3.5 text-sm font-medium transition-colors hover:border-gold/40 sm:w-auto sm:px-6 sm:py-4"
            style={{ color: "var(--text)" }}
          >
            <MailIcon size={20} className="text-gold" />
            {email}
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl glass px-5 py-3.5 text-sm font-medium transition-colors hover:border-gold/40 sm:w-auto sm:px-6 sm:py-4"
            style={{ color: "var(--text)" }}
          >
            <GithubIcon size={20} className="text-gold" />
            GitHub
          </a>
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl glass px-5 py-3.5 text-sm font-medium transition-colors hover:border-gold/40 sm:w-auto sm:px-6 sm:py-4"
            style={{ color: "var(--text)" }}
          >
            <ExternalLinkIcon size={20} className="text-gold" />
            4rap.cz
          </a>
        </div>

        <p className="mt-6 text-xs text-zinc-500">
          Průměrná odpověď: do 24 hodin
        </p>

        <p className="mt-12 text-xs text-zinc-600">
          © {year} Petr Piskáček. Built with Next.js & Tailwind.
        </p>
      </div>
    </section>
  );
}
