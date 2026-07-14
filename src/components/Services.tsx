"use client";

import { BotIcon, CodeIcon, GearIcon, BookIcon } from "./icons";

const services = [
  {
    icon: BotIcon,
    title: "AI, které něco dělá",
    description: "Ne ChatGPT. AI, která šetří čas, rozhoduje a pracuje s tvými daty. Postavím ti ji.",
  },
  {
    icon: CodeIcon,
    title: "Web, co se neztratí",
    description: "Next.js, React, TypeScript. Rychle, škálovatelně, bezpečně. Žádný WordPress.",
  },
  {
    icon: GearIcon,
    title: "Automatizace, co vrací hodiny",
    description: "Opakovaná práce do krabiček. Ušetřím ti hodiny týdně. Spočítej si to.",
  },
  {
    icon: BookIcon,
    title: "AI školení pro týmy",
    description: "Naučím tvůj tým používat AI reálně. Ne hrát si s prompty.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-apple">
      <div className="container-apple">
        <p className="eyebrow mb-3">Co zařídím</p>
        <h2 className="headline-lg mb-16">
          Co zařídím.
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
