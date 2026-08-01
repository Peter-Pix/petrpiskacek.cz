"use client";

import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section id="contact" className="section-apple">
      <div className="container-apple">
        <Reveal blur>
          <div
            className="mx-auto max-w-3xl rounded-3xl p-12 text-center sm:p-16"
            style={{
              background:
                "linear-gradient(180deg, rgba(200,155,60,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--gold)" }}
            >
              Konzultace
            </p>
            <h2 className="mb-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Chcete vědět víc?
            </h2>
            <p
              className="mx-auto mb-10 max-w-md text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              30 minut. Žádný pitch. Jen jasný plán, co se dá udělat a za kolik.
            </p>
            <a
              href="mailto:ppix50@gmail.com?subject=Konzultace"
              className="btn-apple btn-apple-primary inline-flex items-center gap-2"
            >
              Rezervovat konzultaci →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
