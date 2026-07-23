"use client";

import { BotIcon, CodeIcon, GearIcon } from "./icons";

const services = [
  {
    icon: BotIcon,
    title: "AI, která něco dělá",
    description: "Ne ChatGPT. AI, která šetří čas, rozhoduje a pracuje s tvými daty. Postavím ti ji na míru.",
    cta: "Chci AI na míru",
  },
  {
    icon: CodeIcon,
    title: "Web, co se neztratí",
    description: "Next.js, React, TypeScript. Rychle, škálovatelně, bezpečně. Žádný WordPress, žádný pomalý templaty.",
    cta: "Chci web",
  },
  {
    icon: GearIcon,
    title: "Automatizace, co vrací hodiny",
    description: "Opakovaná práce do krabiček. Ušetřím ti hodiny týdně. Spočítej si to.",
    cta: "Chci automatizaci",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-apple">
      <div className="container-apple">
        <p className="eyebrow mb-3 text-center">Co zařídím</p>
        <h2 className="headline-lg mb-16 text-center">
          Tohle ti postavím.
        </h2>

        <div className="grid gap-5 sm:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="glass-card group flex flex-col items-start gap-5 p-7"
            >
              <div className="shrink-0 rounded-2xl bg-gold/10 p-3 text-gold transition-transform group-hover:scale-110">
                <service.icon size={26} />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>{service.description}</p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: "var(--gold)" }}
              >
                {service.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
