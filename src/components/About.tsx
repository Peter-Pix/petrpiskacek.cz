"use client";

import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="section-apple">
      <div className="mx-auto max-w-2xl px-6">
        <Reveal>
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--gold)" }}
          >
            Kdo jsem
          </p>
          <h2 className="mb-6 text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
            Programátor, co rozumí lidem.
          </h2>
          <p
            className="text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Většina developerů neumí vysvětlit, co dělají. Já ano. Technologie
            není cíl, je to nástroj.
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
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Napište. 30 minut, jasný plán, žádný pitch.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
