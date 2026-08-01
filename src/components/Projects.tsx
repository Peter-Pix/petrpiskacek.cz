"use client";

import Reveal from "./Reveal";
import { ExternalLinkIcon } from "./icons";

type CaseStudy = {
  name: string;
  result: string;
  description: string;
  link: string;
  linkLabel: string;
  status: "Běží" | "Beta";
};

const caseStudies: CaseStudy[] = [
  {
    name: "Sparring",
    result: "AI konzultant na projekty",
    description:
      "Napíšete nápad. AI se doptá. Dostanete stack, cenu a plán. Ne vágní rady — konkrétní čtyři bloky, které jdou rovnou do akce.",
    link: "https://petrpiskacek.cloud/challenge",
    linkLabel: "Vyzkoušet",
    status: "Běží",
  },
  {
    name: "Karel Robot",
    result: "AI e-mailový admin",
    description:
      "Přijde e-mail, Karel se stará. Rozpozná, co je důležité. Roztřídí, co není. Odpoví, když vy nemůžete. Sekretář bez výmluv.",
    link: "https://karel.petrpiskacek.cloud",
    linkLabel: "Vyzkoušet",
    status: "Běží",
  },
  {
    name: "4rap.cz",
    result: "Znalostní graf českého rapu",
    description:
      "Znalostní graf. Pořádek v chaosu. Indexujtu rap.",
    link: "https://petrpiskacek.online#projekty",
    linkLabel: "Přečíst příběh",
    status: "Běží",
  },
  {
    name: "Dashboard",
    result: "Real-time přehled systémů",
    description:
      "Latence, vytížení, stav modelů. Všechno na jednom místě v reálném čase. Víte, kdy něco přestane fungovat — dřív než uživatelé.",
    link: "https://dashboard.petrpiskacek.cloud",
    linkLabel: "Otevřít",
    status: "Běží",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-apple">
      <div className="container-apple">
        <Reveal>
          <p
            className="eyebrow mb-3 text-center"
            style={{ color: "var(--gold)" }}
          >
            Projekty
          </p>
          <h2 className="headline-lg mb-4 text-center">Co běží naostro.</h2>
          <p
            className="subhead mx-auto mb-16 max-w-xl text-center"
            style={{ color: "var(--text-secondary)" }}
          >
            Jede to live, vše funguje.
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.name} delay={i * 0.08} blur>
              <a
                href={cs.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card group block h-full p-8 transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: "var(--border)",
                }}
              >
                {/* Status badge */}
                <div className="mb-6 flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: "var(--gold)" }}
                    />
                    {cs.status}
                  </span>
                  <ExternalLinkIcon
                    size={14}
                    style={{ color: "var(--text-muted)" }}
                  />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-2xl font-semibold leading-tight">
                  {cs.name}
                </h3>

                {/* Subtitle */}
                <p
                  className="mb-6 text-sm font-medium uppercase tracking-[0.12em]"
                  style={{ color: "var(--gold)" }}
                >
                  {cs.result}
                </p>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {cs.description}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
