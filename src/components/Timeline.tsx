"use client";

import { useState } from "react";
import { ChevronDownIcon } from "./icons";

type TimelineItem = {
  period: string;
  title: string;
  description: string;
  tags: string[];
  details?: string;
};

const items: TimelineItem[] = [
  {
    period: "2023 – 2026",
    title: "AI & Generativní systémy",
    description: "Vývoj AI workflow, hlasových modelů, LLM integrací a automatizace.",
    tags: ["AI/LLM", "Voice Cloning", "Ollama", "OpenRouter"],
    details: "Voice cloning 7. generace — vlastní hlasový klon k nerozeznání. Modely umí zpívat i rapovat. Orchestrace lokálních i cloudových modelů, sub-agent architektury, MCP servery.",
  },
  {
    period: "2016 – 2026",
    title: "Full‑Stack Development",
    description: "Vývoj webových aplikací, SaaS produktů a interních systémů.",
    tags: ["Next.js", "React", "TypeScript", "Python"],
    details: "11 vlastních projektů — od 4rap.cz po 4Rap Studio, VocalBrain a StyleMorph. Žádné tutorial projekty.",
  },
  {
    period: "2021 – 2023",
    title: "Enterprise Support",
    description: "Technická podpora a řešení incidentů pro firemní klienty.",
    tags: ["Tech Support", "Jira", "Komunikace"],
    details: "L1 & L2 support, řešení komplexních incidentů. Zvyklý dělat práci za dva — rychlejší sám než posílat ticket dál.",
  },
  {
    period: "2010 – 2016",
    title: "Mezinárodní zkušenost",
    description: "10 let v Nottinghamu, UK. Senior FOH, Alliance Boots, Swiss Post.",
    tags: ["Anglie", "CZ/EN", "Customer Service"],
    details: "Bilingvní CZ/EN, mezinárodní prostředí. NVQ Level 2 v zákaznickém servisu, praxe v hotelu Mercure.",
  },
];

export default function Timeline() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="relative border-l pl-8" style={{ borderColor: "var(--border)" }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="mb-8 last:mb-0">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="group relative w-full text-left focus:outline-none"
              aria-expanded={isOpen}
            >
              <div
                className={`absolute -left-[37px] top-2 h-3.5 w-3.5 rounded-full ring-4 transition-all duration-300 ${
                  isOpen ? "bg-gold ring-gold/20 scale-110" : "bg-gold/60 ring-gold/10"
                }`}
              />
              <p className="eyebrow mb-2" style={{ color: "var(--gold)" }}>{item.period}</p>
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-lg font-semibold transition-colors group-hover:text-gold"
                  style={{ color: "var(--text)" }}
                >
                  {item.title}
                </h4>
                <ChevronDownIcon
                  size={18}
                  className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  style={{ color: "var(--text-muted)" }}
                />
              </div>
              <p className="mt-1 text-base" style={{ color: "var(--text-secondary)" }}>{item.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider"
                    style={{ borderColor: "var(--tag-border)", backgroundColor: "var(--tag-bg)", color: "var(--tag-text)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
              }`}
            >
              <div className="rounded-2xl border p-5 text-base leading-relaxed"
                style={{ borderColor: "var(--muted-border)", backgroundColor: "var(--surface)", color: "var(--text-secondary)" }}
              >
                {item.details}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
