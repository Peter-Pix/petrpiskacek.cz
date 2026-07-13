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
    details:
      "Voice cloning 7. generace — vlastní hlasový klon k nerozeznání od originálu, modely umí zpívat i rapovat. Orchestrace lokálních i cloudových modelů, sub-agent architektury, MCP servery.",
  },
  {
    period: "2016 – 2026",
    title: "Full‑Stack Development",
    description: "Vývoj webových aplikací, SaaS produktů a interních systémů.",
    tags: ["Next.js", "React", "TypeScript", "Python"],
    details:
      "11 vlastních projektů — od 4rap.cz (1699 entit, 9281 vztahů) po 4Rap Studio, VocalBrain a StyleMorph. Žádné tutorial projekty.",
  },
  {
    period: "2021 – 2023",
    title: "Enterprise Support",
    description: "Technická podpora a řešení incidentů pro firemní klienty (ČSOB).",
    tags: ["Tech Support", "Jira", "Komunikace"],
    details:
      "L1 & L2 support, řešení komplexních incidentů, komunikace s klienty i interními týmy. Zvyklý dělat práci za dva — rychlejší udělat sám než posílat ticket dál.",
  },
  {
    period: "2010 – 2016",
    title: "Mezinárodní zkušenost",
    description: "10 let v Nottinghamu, UK. Senior FOH, Alliance Boots, Swiss Post.",
    tags: ["Anglie", "CZ/EN", "Customer Service"],
    details:
      "Bilingvní CZ/EN, mezinárodní prostředí. NVQ Level 2 v zákaznickém servisu, praxe ve 4★ hotelu Mercure v centru Nottinghamu.",
  },
];

export default function Timeline() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="relative border-l border-white/10 pl-6">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="mb-6 last:mb-0">
            <button
              onClick={() => toggle(i)}
              className="group relative w-full text-left focus:outline-none"
              aria-expanded={isOpen}
            >
              <div
                className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ring-4 transition-all duration-300 ${
                  isOpen
                    ? "bg-gold ring-gold/20 scale-110"
                    : "bg-gold/60 ring-gold/10"
                }`}
              />
              <p className="text-xs font-mono uppercase tracking-wider text-gold/70 mb-1">
                {item.period}
              </p>
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-[0.95rem] font-semibold leading-snug text-white group-hover:text-gold transition-colors">
                  {item.title}
                </h4>
                <ChevronDownIcon
                  size={16}
                  className={`shrink-0 text-zinc-500 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              <p className="text-[0.85rem] text-zinc-400 mt-1 sm:text-sm">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>

            {/* Expandable detail */}
            <div
              className={`overflow-hidden transition-all duration-400 ease-out ${
                isOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
              }`}
            >
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-[0.85rem] leading-relaxed text-zinc-400 sm:text-sm">
                {item.details}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
