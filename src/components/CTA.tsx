"use client";

import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section id="contact" className="section-apple">
      <div className="container-apple">
        <Reveal blur>
          <div className="mx-auto max-w-2xl text-center">
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--gold)" }}
            >
              Napište mi
            </p>
            <h2 className="mb-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Chcete víc?
            </h2>
            <p
              className="mx-auto mb-10 max-w-md text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Třicet minut. Jasný plán, co za kolik.
            </p>
            <a
              href="mailto:ppix50@gmail.com?subject=Napište%20mi"
              className="btn-apple btn-apple-primary inline-flex items-center gap-2"
            >
              Jdeme na to
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
