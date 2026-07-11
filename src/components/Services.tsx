"use client";

import { BotIcon, CodeIcon, GearIcon, BookIcon } from "./icons";

const services = [
  {
    icon: BotIcon,
    title: "AI Integrace & Chatboty",
    description:
      "Implementace inteligentních asistentů a automatizace procesů. Propojení LLM s vašimi systémy.",
  },
  {
    icon: CodeIcon,
    title: "Moderní Web & App Vývoj",
    description:
      "Rychlé, škálovatelné a bezpečné webové aplikace v Next.js, React a TypeScript.",
  },
  {
    icon: GearIcon,
    title: "Automatizace Workflow",
    description:
      "Zefektivnění firemních procesů pomocí skriptů, AI nástrojů a pipeline automatizace.",
  },
  {
    icon: BookIcon,
    title: "AI Konzultace & Školení",
    description:
      "Naučím váš tým využívat AI nástroje efektivně — od prompt engineeringu po vlastní modely.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="section-label mb-3">Služby pro firmy</p>
        <h2 className="mb-14 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Jak můžu pomoct
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="glass flex items-start gap-5 rounded-2xl p-6 card-hover"
            >
              <div className="shrink-0 rounded-xl bg-gold/10 p-3 text-gold">
                <service.icon size={24} />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}