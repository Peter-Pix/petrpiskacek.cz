"use client";

import { MailIcon } from "./icons";

const email = "ppix50@gmail.com";
const bookingUrl = "https://calendly.com/ppix50";

export default function Contact() {

  return (
    <section id="contact" className="section-apple">
      <div className="container-narrow text-center">
        <p className="eyebrow mb-3">Kontakt</p>
        <h2 className="headline-lg mb-6">
          Pojďme to probrat.
        </h2>
        <p className="subhead mx-auto mb-10 max-w-xl">
          Řekni mi, co potřebuješ. Domluvíme se, jestli si sedneme, a já ti pošlu návrh.
        </p>

        <div className="mb-10 inline-flex items-center gap-2 rounded-full border px-4 py-2"
          style={{ borderColor: "rgba(16, 185, 129, 0.25)", backgroundColor: "rgba(16, 185, 129, 0.08)" }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-emerald-400">Aktuálně dostupný pro nový projekty</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-apple btn-apple-primary inline-flex items-center gap-2"
          >
            Rezervovat 20min konzultaci
          </a>
          <a
            href={`mailto:${email}`}
            className="glass-card group inline-flex items-center gap-3 px-6 py-4 text-sm font-medium"
          >
            <MailIcon size={20} className="text-gold transition-transform group-hover:scale-110" />
            {email}
          </a>
        </div>

        <p className="mt-6 text-xs" style={{ color: "var(--text-muted)" }}>
          Průměrná odpověď: do 24 hodin
        </p>
      </div>
    </section>
  );
}
