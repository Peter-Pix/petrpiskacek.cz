"use client";

import { MailIcon } from "./icons";
import SparringEmbed from "./SparringEmbed";

const email = "ppix50@gmail.com";

export default function Contact() {
  return (
    <section id="contact" className="section-apple">
      <div className="container-narrow text-center">
        {/* Sparring Embed */}
        <SparringEmbed />

        <div className="mt-16">
          <p className="eyebrow mb-3">Kontakt</p>
          <h2 className="headline-lg mb-6">
            Pojďme to probrat.
          </h2>


          <p className="mb-6 text-sm" style={{ color: "var(--text-muted)" }}>
            Už víš, co chceš? Napiš rovnou.
          </p>

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
