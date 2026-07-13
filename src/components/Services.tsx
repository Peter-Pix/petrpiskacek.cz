"use client";

import { BotIcon, CodeIcon, GearIcon, BookIcon } from "./icons";

const services = [
  {
    icon: BotIcon,
    title: "AI Integrace & Chatboty",
    description: "Inteligentní asistenti a automatizace procesů. Propojení LLM s vašimi systémy.",
  },
  {
    icon: CodeIcon,
    title: "Moderní Web & App Vývoj",
    description: "Rychlé, škálovatelné a bezpečné aplikace v Next.js, React a TypeScript.",
  },
  {
    icon: GearIcon,
    title: "Automatizace Workflow",
    description: "Zefektivnění firemních procesů skripty, AI nástroji a pipeline automatizace.",
  },
  {
    icon: BookIcon,
    title: "AI Konzultace & Školení",
    description: "Prompt engineering, vlastní modely a efektivní využití AI ve vašem týmu.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-apple">
      <div className="container-apple">
        <p className="eyebrow mb-3">Služby</p>
        <h2 className="headline-lg mb-16">
          Jak můžu pomoct.
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="glass-card group flex items-start gap-5 p-7"
            >
              <div className="shrink-0 rounded-2xl bg-gold/10 p-3 text-gold transition-transform group-hover:scale-110">
                <service.icon size={26} />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
