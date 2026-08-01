"use client";

import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="section-apple">
      <div className="mx-auto max-w-2xl px-6">
        <Reveal>
          <div className="mb-12 flex justify-center">
            <div
              className="h-32 w-32 overflow-hidden rounded-full sm:h-40 sm:w-40"
              style={{
                border: "1px solid var(--border)",
                boxShadow: "0 0 60px rgba(200, 150, 46, 0.15)",
              }}
            >
              <img
                src="/hero-photo.webp"
                alt="Petr Piskáček"
                width={600}
                height={600}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-center"
            style={{ color: "var(--gold)" }}
          >
            Kdo jsem
          </p>
          <h2 className="mb-6 text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl text-center">
            Programátor, co rozumí lidem.
          </h2>
          <p
            className="text-base leading-relaxed sm:text-lg text-center"
            style={{ color: "var(--text-secondary)" }}
          >
            Většina developerů neumí vysvětlit, co dělají. Já ano.
          </p>
          <p
            className="text-base leading-relaxed sm:text-lg text-center"
            style={{ color: "var(--text-secondary)" }}
          >
            Technologie není cíl, je to nástroj.
          </p>
        </Reveal>

        <Reveal delay={0.2} blur>
          <div className="mt-24">
            <p
              className="mb-3 text-base leading-snug"
              style={{ color: "var(--text-secondary)" }}
            >
              Zeptám se přímo.
            </p>
            <h2
              className="mb-6 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
              style={{ color: "var(--gold)" }}
            >
              Máte cíl?
            </h2>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
