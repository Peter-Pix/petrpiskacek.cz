"use client";

import { useState } from "react";

type Skill = {
  name: string;
  level: "expert" | "advanced" | "intermediate";
  description: string;
};

type SkillGroup = {
  category: string;
  skills: Skill[];
};

const skillGroups: SkillGroup[] = [
  {
    category: "AI & LLM",
    skills: [
      { name: "Ollama", level: "expert", description: "Lokální LLM runtime, správa modelů, API integrace" },
      { name: "OpenRouter", level: "expert", description: "Multi-model gateway, fallback orchestrace" },
      { name: "MCP", level: "advanced", description: "Model Context Protocol, agentní architektury" },
      { name: "Gemini SDK", level: "advanced", description: "Google AI API, multimodální modely" },
      { name: "Prompt Engineering", level: "expert", description: "System prompts, chain-of-thought, few-shot" },
      { name: "RAG", level: "advanced", description: "Retrieval-Augmented Generation, knowledge graphy" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "Next.js", level: "expert", description: "App Router, SSR/SSG/ISR, middleware" },
      { name: "React", level: "expert", description: "Hooks, Suspense, Server Components, Concurrent" },
      { name: "TypeScript", level: "expert", description: "Striktní typování, generiky, utility types" },
      { name: "Tailwind CSS", level: "expert", description: "Utility-first, custom design systemy" },
      { name: "D3.js", level: "advanced", description: "Force-directed grafy, canvas rendering" },
      { name: "Web Audio API", level: "intermediate", description: "Audio analýza, beat detekce" },
    ],
  },
  {
    category: "Backend & Data",
    skills: [
      { name: "Python", level: "expert", description: "Scripting, API, data processing, ML pipelines" },
      { name: "SQLite", level: "advanced", description: "Embedded DB, full-text search, optimalizace" },
      { name: "WebSocket", level: "advanced", description: "Real-time komunikace, streaming" },
      { name: "PWA", level: "advanced", description: "Service Workers, offline-first, manifest" },
      { name: "PHP", level: "intermediate", description: "Legacy systémy, WordPress" },
    ],
  },
  {
    category: "AI Infrastructure",
    skills: [
      { name: "CUDA", level: "advanced", description: "GPU akcelerace, CUDA 12.8, PyTorch" },
      { name: "RTX 5090", level: "expert", description: "Lokální inference, VRAM management" },
      { name: "ComfyUI", level: "expert", description: "Workflow editor, custom nodes, API" },
      { name: "Stable Diffusion", level: "advanced", description: "Image generation, fine-tuning, pipelines" },
      { name: "Voice Cloning", level: "expert", description: "TTS, syntéza, 7. generace vlastního klonu" },
    ],
  },
  {
    category: "Ostatní",
    skills: [
      { name: "Git", level: "expert", description: "Branching, rebase, CI/CD, GitHub" },
      { name: "SEO", level: "advanced", description: "Schema.org JSON-LD, sitemap, OG metadata" },
      { name: "UX Design", level: "advanced", description: "Psychologie + design, uživatelské testování" },
      { name: "Figma", level: "intermediate", description: "UI design, prototyping, design systems" },
      { name: "DevOps", level: "intermediate", description: "Python environments, batch scripting" },
    ],
  },
];

const levelColors: Record<string, string> = {
  expert: "bg-gold/15 text-gold border-gold/30 hover:bg-gold/25",
  advanced: "bg-white/5 text-zinc-200 border-white/10 hover:bg-white/10",
  intermediate: "bg-white/[0.03] text-zinc-400 border-white/5 hover:bg-white/5",
};

const levelLabels: Record<string, string> = {
  expert: "Expert",
  advanced: "Pokročilý",
  intermediate: "Střední",
};

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  return (
    <section id="skills" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="section-label mb-3">Skills</p>
        <h2 className="mb-14 text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-4xl"
          style={{ color: "var(--text)" }}>
          Technologie & expertíza
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="mb-4 text-xs font-mono uppercase tracking-wider text-gold/70">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`rounded-full border px-3 py-1.5 text-[0.8rem] font-medium transition-all duration-200 cursor-default sm:px-4 sm:py-2 sm:text-sm ${
                      levelColors[skill.level]
                    } ${
                      hoveredSkill?.name === skill.name
                        ? "scale-105 shadow-lg"
                        : ""
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Hover detail panel */}
        {hoveredSkill && (
          <div className="mt-8 glass rounded-xl p-5 max-w-md mx-auto text-center transition-all duration-300">
            <p className="text-sm font-semibold mb-1"
              style={{ color: "var(--text)" }}>{hoveredSkill.name}</p>
            <p className="text-xs mb-2"
              style={{ color: "var(--text-secondary)" }}>{hoveredSkill.description}</p>
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                hoveredSkill.level === "expert"
                  ? "bg-gold/15 text-gold"
                  : hoveredSkill.level === "advanced"
                    ? "bg-white/10 text-zinc-300"
                    : "bg-white/5 text-zinc-500"
              }`}
            >
              {levelLabels[hoveredSkill.level]}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
