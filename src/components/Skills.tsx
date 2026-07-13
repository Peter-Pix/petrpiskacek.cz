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
      { name: "Ollama", level: "expert", description: "Lokální LLM runtime, správa modelů, API" },
      { name: "OpenRouter", level: "expert", description: "Multi-model gateway, fallback orchestrace" },
      { name: "MCP", level: "advanced", description: "Model Context Protocol, agentní architektury" },
      { name: "Gemini SDK", level: "advanced", description: "Google AI API, multimodální modely" },
      { name: "Prompt Engineering", level: "expert", description: "System prompts, chain-of-thought" },
      { name: "RAG", level: "advanced", description: "Retrieval-Augmented Generation" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "Next.js", level: "expert", description: "App Router, SSR, middleware" },
      { name: "React", level: "expert", description: "Hooks, Suspense, Server Components" },
      { name: "TypeScript", level: "expert", description: "Striktní typování, generiky" },
      { name: "Tailwind CSS", level: "expert", description: "Utility-first, design systemy" },
      { name: "D3.js", level: "advanced", description: "Force-directed grafy, canvas" },
      { name: "Web Audio API", level: "intermediate", description: "Audio analýza, beat detekce" },
    ],
  },
  {
    category: "Backend & Data",
    skills: [
      { name: "Python", level: "expert", description: "Scripting, API, ML pipelines" },
      { name: "SQLite", level: "advanced", description: "Embedded DB, full-text search" },
      { name: "WebSocket", level: "advanced", description: "Real-time komunikace" },
      { name: "PWA", level: "advanced", description: "Service Workers, offline-first" },
    ],
  },
  {
    category: "AI Infra",
    skills: [
      { name: "CUDA", level: "advanced", description: "GPU akcelerace, PyTorch" },
      { name: "RTX 5090", level: "expert", description: "Lokální inference, VRAM" },
      { name: "ComfyUI", level: "expert", description: "Workflow editor, custom nodes" },
      { name: "Stable Diffusion", level: "advanced", description: "Image generation" },
      { name: "Voice Cloning", level: "expert", description: "TTS, 7. generace klonu" },
    ],
  },
  {
    category: "Ostatní",
    skills: [
      { name: "Git", level: "expert", description: "Branching, CI/CD" },
      { name: "SEO", level: "advanced", description: "Schema.org, sitemap, OG" },
      { name: "UX Design", level: "advanced", description: "Psychologie + design" },
      { name: "DevOps", level: "intermediate", description: "Python envs, batch" },
    ],
  },
];

const levelLabels: Record<string, string> = {
  expert: "Expert",
  advanced: "Pokročilý",
  intermediate: "Střední",
};

export default function Skills() {
  const [hovered, setHovered] = useState<Skill | null>(null);

  return (
    <section id="skills" className="section-apple">
      <div className="container-apple">
        <p className="eyebrow mb-3">Skills</p>
        <h2 className="headline-lg mb-16">Technologie & expertíza.</h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.category} className="glass-card p-6 sm:p-8">
              <h3 className="eyebrow mb-5">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <button
                    key={skill.name}
                    onMouseEnter={() => setHovered(skill)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setHovered(hovered?.name === skill.name ? null : skill)}
                    className="rounded-full border px-3 py-1.5 text-sm font-medium transition-all hover:scale-105"
                    style={{
                      borderColor: skill.level === "expert" ? "rgba(200,150,46,0.35)" : "var(--border)",
                      backgroundColor: skill.level === "expert" ? "rgba(200,150,46,0.1)" : "var(--tag-bg)",
                      color: skill.level === "expert" ? "var(--gold)" : "var(--text-secondary)",
                    }}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {hovered && (
          <div className="glass-card mt-8 max-w-md mx-auto p-6 text-center">
            <p className="text-lg font-semibold mb-2">{hovered.name}</p>
            <p className="mb-3 text-sm" style={{ color: "var(--text-secondary)" }}>{hovered.description}</p>
            <span
              className="inline-block rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-wider"
              style={{
                backgroundColor: hovered.level === "expert" ? "rgba(200,150,46,0.15)" : "var(--tag-bg)",
                color: hovered.level === "expert" ? "var(--gold)" : "var(--text-muted)",
              }}
            >
              {levelLabels[hovered.level]}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
