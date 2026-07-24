"use client";

import { MailIcon } from "./icons";
import SparringEmbed from "./SparringEmbed";

const email = "ppix50@gmail.com";

export default function Contact() {
  return (
    <section id="contact" className="section-apple">
      <div className="container-narrow text-center">
        <p className="eyebrow mb-3">Kontakt</p>
        <h2 className="headline-lg mb-6">
          Pojďme to probrat.
        </h2>
        <p className="subhead mx-auto mb-10 max-w-xl">
          Než napíšeš, zkus Sparring — AI konzultant, kterej ti nacení nápad zadarmo.
        </p>

        {/* Sparring Embed */}
        <SparringEmbed />

        {/* Direct contact */}
        <div className="mt-16">
          <p className="mb-6 text-sm" style={{ color: "var(--text-muted)" }}>
            Už víš, co chceš? Napiš rovnou.
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

          <a
            href={`mailto:${email}`}
            className="btn-apple btn-apple-primary inline-flex items-center gap-2"
          >
            <MailIcon size={20} />
            {email}
          </a>

          <p className="mt-6 text-xs" style={{ color: "var(--text-muted)" }}>
            Průměrná odpověď: do 24 hodin
          </p>
        </div>
      </div>
    </section>
  );
}
