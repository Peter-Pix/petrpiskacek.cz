"use client";

import Reveal from "./Reveal";
import { ArrowRightIcon } from "./icons";

export default function About() {
  return (
    <section id="about" className="section-apple">
      <div className="mx-auto max-w-2xl px-6">
        {/* === Kdo jsem === */}
        <Reveal>
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--gold)" }}
          >
            Kdo jsem
          </p>
          <h2 className="mb-4 text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
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

        {/* === Úspěch není o kódu === */}
        <Reveal delay={0.1}>
          <div className="mt-20">
            <p
              className="mb-8 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--gold)" }}
            >
              Úspěch není o kódu.
            </p>

            <div className="space-y-10">
              <div>
                <p
                  className="mb-2 text-base leading-snug"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Skvělý nápad na papíře?
                </p>
                <p className="text-xl font-semibold leading-snug sm:text-2xl">
                  Proměníme nápad v produkt.
                </p>
              </div>

              <div>
                <p
                  className="mb-2 text-base leading-snug"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Na co dalšího chatbota?
                </p>
                <p className="text-xl font-semibold leading-snug sm:text-2xl">
                  Vytvoříme AI zaměstnance.
                </p>
              </div>

              <div>
                <p
                  className="mb-2 text-base leading-snug"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Závislost na platformě?
                </p>
                <p className="text-xl font-semibold leading-snug sm:text-2xl">
                  Postavíme AI přímo pro vás.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* === Proč to dělám === */}
        <Reveal delay={0.2}>
          <div className="mt-20">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--gold)" }}
            >
              Proč to dělám
            </p>
            <h3 className="mb-8 text-2xl font-semibold leading-tight sm:text-3xl">
              Příběh za projekty.
            </h3>

            <div className="space-y-4">
              <p
                className="text-base leading-relaxed sm:text-lg"
                style={{ color: "var(--text-secondary)" }}
              >
                Všecko má nějaký příběh.
              </p>
              <p
                className="text-base leading-relaxed sm:text-lg"
                style={{ color: "var(--text-secondary)" }}
              >
                Za příběhem stojí důvod.
              </p>
              <p
                className="text-base leading-relaxed sm:text-lg"
                style={{ color: "var(--text-secondary)" }}
              >
                Důvod a jasnej cíl.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="https://petrpiskacek.online"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: "var(--gold)" }}
              >
                Přečíst příběh <ArrowRightIcon size={14} />
              </a>
            </div>
          </div>
        </Reveal>

        {/* === Zeptám se přímo. Máte cíl? === */}
        <Reveal delay={0.3}>
          <div className="mt-20">
            <p
              className="mb-2 text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Zeptám se přímo.
            </p>
            <h2
              className="mb-8 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
              style={{ color: "var(--gold)" }}
            >
              Máte cíl?
            </h2>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="https://petrpiskacek.online"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-apple btn-apple-secondary"
              >
                Přečíst příběh →
              </a>
              <a href="#contact" className="btn-apple btn-apple-primary">
                Rezervovat konzultaci
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
