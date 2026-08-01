"use client";

import { ExternalLinkIcon } from "./icons";

type CaseStudy = {
  name: string;
  result: string;
  description: string;
  link: string;
  linkLabel: string;
};

const caseStudies: CaseStudy[] = [
  {
    name: "Sparring",
    result: "AI konzultant na projekty",
    description:
      "Napíšeš nápad, AI se doptá, nacení, navrhne stack a časovej plán. Běží na petrpiskacek.cloud/challenge.",
    link: "https://petrpiskacek.cloud/challenge",
    linkLabel: "Vyzkoušet →",
  },
  {
    name: "Karel Robot",
    result: "AI e-mailovej admin",
    description:
      "Analyze, třídí a odpovídá na emaily. Vite + React + Ollama cloud. Běží na Vercel, live na karel.petrpiskacek.cloud.",
    link: "https://karel.petrpiskacek.cloud",
    linkLabel: "Vyzkoušet →",
  },
  {
    name: "4rap.cz",
    result: "1699 entit · 9281 vazeb",
    description:
      "Největší znalostní databáze české rapové scény. D3 interaktivní grafy, full-text search, Schema.org SEO. Běží na Next.js + MDX, buildí 1200+ stránek.",
    link: "https://petrpiskacek.online#projekty",
    linkLabel: "Příběh na .online",
  },
];

export default function Projects() {
  return (
    <section id="proof" className="section-apple">
      <div className="container-apple">
        <p className="eyebrow mb-3 text-center">Důkaz</p>
        <h2 className="headline-lg mb-4 text-center">Tohle už stojí.</h2>
        <p className="subhead mx-auto mb-16 max-w-xl text-center">
          Každej projekt běží naostro. Žádný figma mockupy, žádný &bdquo;brzy&rdquo;.
        </p>

        <div className="mx-auto max-w-5xl space-y-8">
          {caseStudies.map((cs, i) => (
            <div
              key={cs.name}
              className="glass-card group relative overflow-hidden p-8 sm:p-10"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
                {/* Číslo */}
                <div
                  className="hidden text-[10rem] font-black leading-none sm:block"
                  style={{
                    color: "var(--border)",
                    opacity: 0.15,
                    lineHeight: 0.8,
                    marginTop: "-0.2em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-2xl font-semibold sm:text-3xl">
                      {cs.name}
                    </h3>
                    <p
                      className="mt-2 text-sm font-medium uppercase tracking-wider"
                      style={{ color: "var(--gold)" }}
                    >
                      {cs.result}
                    </p>
                  </div>

                  <p
                    className="mb-6 max-w-lg text-base leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {cs.description}
                  </p>

                  <a
                    href={cs.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
                    style={{ color: "var(--gold)" }}
                  >
                    <ExternalLinkIcon size={14} />
                    {cs.linkLabel}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
