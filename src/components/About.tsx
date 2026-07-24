"use client";

import { CodeIcon, BrainIcon, MusicIcon, CheckIcon, ArrowRightIcon } from "./icons";

const stats = [
  { value: "20+", label: "let programuju" },
  { value: "5+", label: "let AI a ML" },
  { value: "8", label: "live projektů" },
  { value: "100%", label: "autonomně" },
];

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
        <p className="subhead mx-auto mb-16 max-w-xl text-center">
          Většina developerů neumí vysvětlit, co dělají. Já ano. Technologie není cíl, je to nástroj.
        </p>

        {/* Stats row */}
        <div className="mx-auto mb-20 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold sm:text-4xl" style={{ color: "var(--gold)" }}>
                {s.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Problem → Solution cards */}
        <div className="mx-auto mb-20 max-w-3xl space-y-5">
          <h3 className="headline-md mb-8 text-center">Tohle řeším</h3>
          {problems.map((item, i) => (
            <div
              key={i}
              className="glass-card overflow-hidden p-6 sm:p-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                {/* Problem */}
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-950/50 text-xs font-bold" style={{ color: "var(--text-muted)" }}>
                      {i + 1}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                      Problém
                    </span>
                  </div>
                  <p className="text-base font-medium leading-relaxed sm:text-lg">
                    {item.problem}
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden sm:flex sm:items-center sm:pt-8">
                  <ArrowRightIcon size={20} style={{ color: "var(--gold)" }} />
                </div>

                {/* Solution */}
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/10 text-xs font-bold" style={{ color: "var(--gold)" }}>
                      <CheckIcon size={12} />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--gold)" }}>
                      Řešení
                    </span>
                  </div>
                  <p className="text-base font-medium leading-relaxed sm:text-lg" style={{ color: "var(--text-secondary)" }}>
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mini case study */}
        <div className="mx-auto mb-16 max-w-3xl">
          <div className="glass-card overflow-hidden p-6 sm:p-8 text-center">
            <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>Důkaz</p>
            <p className="text-lg font-semibold mb-1">4rap.cz</p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Největší znalostní databáze české rapové scény</p>
            <div className="mt-4 flex justify-center gap-8">
              <div><span className="text-2xl font-bold" style={{ color: "var(--gold)" }}>1699</span><p className="text-xs" style={{ color: "var(--text-muted)" }}>entit</p></div>
              <div><span className="text-2xl font-bold" style={{ color: "var(--gold)" }}>9281</span><p className="text-xs" style={{ color: "var(--text-muted)" }}>vazeb</p></div>
              <div><span className="text-2xl font-bold" style={{ color: "var(--gold)" }}>1200+</span><p className="text-xs" style={{ color: "var(--text-muted)" }}>stránek</p></div>
            </div>
            <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>Postaveno za 3 měsíce. Sám. Next.js + MDX + D3.</p>
          </div>
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
