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
    <section id="contact" className="section-apple">
      <div className="container-narrow text-center">
        <p className="eyebrow mb-3">Kontakt</p>
        <h2 className="headline-lg mb-6">
          Pojďme to probrat.
        </h2>
        <p className="subhead mx-auto mb-10 max-w-xl">
          Hledáš někoho, kdo spojí AI s byznysem? Jsi tady správně.
        </p>

        <div className="mt-10 inline-flex items-center gap-2 rounded-full border px-4 py-2"
          style={{ borderColor: "rgba(16, 185, 129, 0.25)", backgroundColor: "rgba(16, 185, 129, 0.08)" }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-emerald-400">Aktuálně dostupný pro konzultace</span>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`mailto:${email}`}
            className="glass-card group flex w-full items-center justify-center gap-3 px-6 py-4 text-sm font-medium sm:w-auto"
          >
            <MailIcon size={20} className="text-gold transition-transform group-hover:scale-110" />
            {email}
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card group flex w-full items-center justify-center gap-3 px-6 py-4 text-sm font-medium sm:w-auto"
          >
            <GithubIcon size={20} className="text-gold transition-transform group-hover:scale-110" />
            GitHub
          </a>
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card group flex w-full items-center justify-center gap-3 px-6 py-4 text-sm font-medium sm:w-auto"
          >
            <ExternalLinkIcon size={20} className="text-gold transition-transform group-hover:scale-110" />
            4rap.cz
          </a>
        </div>

        <p className="mt-8 text-xs" style={{ color: "var(--text-muted)" }}>
          Průměrná odpověď: do 24 hodin
        </p>

        {/* CTA na cloud a online */}
        <div className="mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6">
          <a
            href="https://petrpiskacek.cloud"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-opacity hover:opacity-70 underline underline-offset-2"
            style={{ color: "var(--text-muted)" }}
          >
            petrpiskacek.cloud — AI infrastruktura
          </a>
          <a
            href="https://petrpiskacek.online"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-opacity hover:opacity-70 underline underline-offset-2"
            style={{ color: "var(--text-muted)" }}
          >
            petrpiskacek.online — příběh a vize
          </a>
        </div>

        <p className="mt-12 text-xs" style={{ color: "var(--text-muted)" }}>
          © {year} Petr Piskáček. Designed with Apple in mind.
        </p>
      </div>
    </section>
  );
}
