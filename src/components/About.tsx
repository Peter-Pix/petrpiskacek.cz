"use client";

import { ArrowRightIcon } from "./icons";

const problems = [
  {
    problem: "Skvělý nápad na papíře.",
    solution: "Proměním nápad ve funkční produkt.",
  },
  {
    problem: "Nikdo nechce dalšího chatbota.",
    solution: "Vytvořím AI zaměstnance, co pracuje za tebe.",
  },
  {
    problem: "Závislost na jedné platformě.",
    solution: "Postavím otevřené, škálovatelné řešení s důrazem na flexibilitu.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-apple">
      <div className="container-apple">
        {/* Eyebrow */}
        <p className="eyebrow mb-3 text-center">Kdo jsem</p>
        <h2 className="headline-lg mb-6 text-center">
          Programátor, co rozumí lidem.
        </h2>
        <p className="subhead mx-auto mb-20 max-w-xl text-center">
          Většina developerů neumí vysvětlit, co dělají. Já ano. Technologie
          není cíl, je to nástroj.
        </p>

        {/* Tohle řeším — přepracováno */}
        <div className="mx-auto mb-24 max-w-5xl">
          <h3 className="headline-md mb-12 text-center">Tohle řeším</h3>
          <div className="grid gap-0 md:grid-cols-3">
            {problems.map((item, i) => (
              <div
                key={i}
                className="group relative border p-8 transition-all duration-500 hover:z-10 md:p-10"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "linear-gradient(180deg, rgba(200,150,46,0.03) 0%, transparent 100%)",
                }}
              >
                {/* Číslo — velké, průhledné, jako watermark */}
                <div
                  className="mb-6 select-none text-[6rem] font-black leading-none transition-all duration-500 group-hover:opacity-30"
                  style={{
                    color: "var(--gold)",
                    opacity: 0.08,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Problém */}
                <div className="mb-6">
                  <p
                    className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Problém
                  </p>
                  <p className="text-lg font-medium leading-snug">
                    {item.problem}
                  </p>
                </div>

                {/* Dělicí linka */}
                <div
                  className="mb-6 h-px w-12 transition-all duration-500 group-hover:w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--gold) 0%, transparent 100%)",
                  }}
                />

                {/* Řešení */}
                <div>
                  <p
                    className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: "var(--gold)" }}
                  >
                    Řešení
                  </p>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Co zařídím — nová sekce, storytelling gateway */}
        <div className="mx-auto mb-24 max-w-3xl text-center">
          <p className="eyebrow mb-3">Co zařídím</p>
          <h3 className="headline-md mb-6">Není to jen o kódu.</h3>
          <p
            className="subhead mx-auto mb-10 max-w-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Každej projekt má příběh. Proč vznikl, jak rostl, co jsem se při
            něm naučil. A hlavně — co to znamená pro tebe.
          </p>
          <a
            href="https://petrpiskacek.online"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-apple btn-apple-primary inline-flex items-center gap-2"
          >
            Přečíst příběh <ArrowRightIcon size={16} />
          </a>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="mb-6 text-sm" style={{ color: "var(--text-muted)" }}>
            Chceš vědět víc? Přečti si celej příběh nebo rovnou napiš.
          </p>
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
