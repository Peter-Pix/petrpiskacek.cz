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
    name: "4rap.cz",
    result: "1699 entit · 9281 vazeb",
    description: "Největší znalostní databáze české rapové scény. D3 interaktivní grafy, full-text search, Schema.org SEO. Běží na Next.js + MDX, buildí 1200+ stránek.",
    link: "https://petrpiskacek.online#projekty",
    linkLabel: "Příběh na .online",
  },
  {
    name: "Karel Robot",
    result: "AI e-mailovej admin",
    description: "Analyze, třídí a odpovídá na emaily. Vite + React + Ollama cloud. Běží na Vercel, live na karel.petrpiskacek.cloud.",
    link: "https://karel.petrpiskacek.cloud",
    linkLabel: "Vyzkoušet →",
  },
  {
    name: "Sparring",
    result: "AI konzultant na projekty",
    description: "Napíšeš nápad, AI se doptá, nacení, navrhne stack a časovej plán. Běží na petrpiskacek.cloud/challenge.",
    link: "https://petrpiskacek.cloud/challenge",
    linkLabel: "Vyzkoušet →",
  },
];

export default function Projects() {
  return (
    <section id="proof" className="section-apple">
      <div className="container-apple">
        <p className="eyebrow mb-3 text-center">Důkaz</p>
        <h2 className="headline-lg mb-4 text-center">
          Tohle už stojí.
        </h2>
        <p className="subhead mx-auto mb-16 max-w-xl text-center">
          Každej projekt běží naostro. Žádný figma mockupy, žádný "brzy".
        </p>

        <div className="grid gap-5 md:grid-cols-3">
          {caseStudies.map((cs) => (
            <div
              key={cs.name}
              className="glass-card group relative flex flex-col p-7"
            >
              <div className="mb-3">
                <h3 className="text-xl font-semibold">{cs.name}</h3>
                <p className="mt-1 text-sm" style={{ color: "var(--gold)" }}>
                  {cs.result}
                </p>
              </div>

              <p className="mb-6 flex-1 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
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
          ))}
        </div>
      </div>
    </section>
  );
}
