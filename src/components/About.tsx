"use client";

import { ArrowRightIcon } from "./icons";

const problems = [
  {
    problem: "Skvělý nápad na papíře?",
    solution: "Proměníme nápad v produkt.",
  },
  {
    problem: "Na co dalšího chatbota?",
    solution: "Vytvoříme AI zaměstnance.",
  },
  {
    problem: "Závislost na platformě?",
    solution: "Postavíme AI přímo pro vás.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-apple">
      <div className="container-apple">
        {/* === Kdo jsem === */}
        <p className="eyebrow mb-3 text-center">Kdo jsem</p>
        <h2 className="headline-lg mb-6 text-center">
          Programátor, co rozumí lidem.
        </h2>
        <p className="subhead mx-auto mb-32 max-w-xl text-center">
          Většina developerů neumí vysvětlit, co dělají. Já ano. Technologie
          není cíl, je to nástroj.
        </p>

        {/* === Úspěch není o kódu === */}
        <div className="mx-auto mb-32 max-w-5xl">
          <h3 className="headline-md mb-16 text-center">
            Úspěch není o kódu.
          </h3>

          <div className="mx-auto max-w-3xl space-y-16">
            {problems.map((item, i) => (
              <div key={i} className="space-y-4">
                {/* Problém */}
                <div className="text-center">
                  <p
                    className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Problém
                  </p>
                  <p className="text-lg font-medium italic leading-snug sm:text-xl">
                    {item.problem}
                  </p>
                </div>

                {/* Dělicí linka — zlatá, krátká, centrovaná */}
                <div className="flex justify-center">
                  <div
                    className="h-px w-12"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, var(--gold), transparent)",
                    }}
                  />
                </div>

                {/* Řešení */}
                <div className="text-center">
                  <p
                    className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em]"
                    style={{ color: "var(--gold)" }}
                  >
                    Řešení
                  </p>
                  <p
                    className="text-xl font-semibold leading-snug sm:text-2xl"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === Proč to dělám === */}
        <div className="mx-auto mb-32 max-w-3xl text-center">
          <p className="eyebrow mb-3">Proč to dělám</p>
          <h3 className="headline-md mb-12">Příběh za projekty.</h3>

          <div className="space-y-6">
            <p
              className="text-lg font-medium leading-relaxed sm:text-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Všecko má nějaký příběh.
            </p>

            <div className="flex justify-center">
              <div
                className="h-px w-8"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--gold), transparent)",
                }}
              />
            </div>

            <p
              className="text-lg font-medium leading-relaxed sm:text-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Za příběhem stojí důvod.
            </p>

            <div className="flex justify-center">
              <div
                className="h-px w-8"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--gold), transparent)",
                }}
              />
            </div>

            <p
              className="text-lg font-medium leading-relaxed sm:text-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Důvod a jasnej cíl.
            </p>
          </div>

          <div className="mt-12">
            <a
              href="https://petrpiskacek.online"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-apple btn-apple-primary inline-flex items-center gap-2"
            >
              Přečíst příběh <ArrowRightIcon size={16} />
            </a>
          </div>
        </div>

        {/* === Zeptám se přímo. Máte cíl? === */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <div
              className="h-px w-24"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--gold), transparent)",
              }}
            />
          </div>

          <p
            className="mb-4 text-lg font-medium tracking-wide sm:text-xl"
            style={{ color: "var(--text-muted)" }}
          >
            Zeptám se přímo.
          </p>
          <h2
            className="headline-xl mb-12"
            style={{ color: "var(--gold)" }}
          >
            Máte cíl?
          </h2>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
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
      </div>
    </section>
  );
}
