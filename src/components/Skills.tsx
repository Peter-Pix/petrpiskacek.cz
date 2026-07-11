"use client";

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Python",
  "Tailwind CSS",
  "D3.js",
  "SQLite",
  "Ollama",
  "OpenRouter",
  "MCP",
  "SEO",
  "UX Design",
  "Psychology",
  "Music Production",
  "Rap Writing",
  "AI / LLM",
  "DevOps",
  "RTX 5090 GPU Opt.",
  "Figma",
  "ComfyUI",
  "Stable Diffusion",
  "Gemini SDK",
  "WebSocket",
  "PWA",
  "PHP",
  "CUDA",
  "PyTorch",
  "Delphi",
  "Assembler",
  "WordPress",
  "MySQL",
  "Git",
  "Čeština (rodilý)",
  "English (C1)",
  "Polština",
];

export default function Skills() {
  return (
    <section id="skills" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="section-label mb-3">Skills</p>
        <h2 className="mb-14 text-[1.75rem] font-semibold leading-tight tracking-tight text-white sm:text-4xl">
          Technologie & expertíza
        </h2>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-[0.85rem] font-medium text-gold transition-colors hover:bg-gold/20 sm:px-4 sm:py-2 sm:text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}