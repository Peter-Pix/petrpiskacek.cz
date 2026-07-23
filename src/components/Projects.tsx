"use client";

import { ExternalLinkIcon, SparklesIcon } from "./icons";

type Project = {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  href: string | null;
};

const projects: Project[] = [
  {
    name: "4rap.cz",
    tagline: "Czech Rap Knowledge Platform",
    description: "Největší znalostní databáze české rapové scény. 1699 entit, 9281 vztahů, D3 grafy, SEO.",
    tags: ["Next.js", "MDX", "D3.js", "SEO"],
    href: "https://4rap.cz",
  },
  {
    name: "VocalBrain",
    tagline: "Voice → Projects",
    description: "Lokální hlasový asistent. Mluvíš, on přepíše a vytvoří strukturované projekty s akčními body.",
    tags: ["AI", "Speech", "LLM", "TypeScript"],
    href: null,
  },
  {
    name: "AI CharStudio",
    tagline: "Lokální AI dashboard",
    description: "Unifikovaný dashboard pro ComfyUI a LLM. Správa modelů, pipeline editor, real-time náhledy.",
    tags: ["React 19", "ComfyUI", "Gemini SDK"],
    href: null,
  },
  {
    name: "StyleMorph",
    tagline: "AI redesign webů",
    description: "Analýza struktury HTML a generování moderního redesignu přes Gemini a Ollama.",
    tags: ["React", "TailwindCSS", "Gemini AI"],
    href: "https://github.com/Peter-Pix/StyleMorph",
  },
  {
    name: "AutoBlog Publisher",
    tagline: "Automatizace SEO obsahu",
    description: "Pipeline, která propojuje LLM s CMS — generuje, optimalizuje a publikuje obsah.",
    tags: ["Python", "LLM API", "Automation", "SEO"],
    href: "https://github.com/Peter-Pix/AutoBlog-Publisher",
  },
  {
    name: "Scrollo.cz",
    tagline: "Nástroje bez reklam",
    description: "Kolekce užitečných nástrojů — client-side, PWA, bez reklam a bez trackingu.",
    tags: ["Vanilla JS", "HTML5", "PWA"],
    href: "https://scrollo.cz",
  },
  {
    name: "APHB",
    tagline: "Exekutivní nástroj pro správu ega",
    description: "Satirická SPA, která gamifikuje absolutní nicnedělání. Ghost text, RPM gauge, síň slávy, dev konzole. Prokrastinace jako umění.",
    tags: ["Vanilla JS", "SPA", "Gamification", "Humor"],
    href: "https://github.com/Peter-Pix/APHB",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-apple">
      <div className="container-apple">
        <p className="eyebrow mb-3">Projekty</p>
        <h2 className="headline-lg mb-16">Věci, které stavím.</h2>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, i) => (
            <div
              key={project.name}
              className={`glass-card group relative flex flex-col p-7 ${i === 0 ? "md:col-span-2" : ""}`}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">{project.name}</h3>
                  <p className="mt-1 text-sm" style={{ color: "var(--gold)" }}>{project.tagline}</p>
                </div>
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-gold hover:opacity-80 shrink-0"
                  >
                    <ExternalLinkIcon size={16} />
                    <span className="hidden sm:inline">Link</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 text-sm shrink-0" style={{ color: "var(--text-muted)" }}>
                    <SparklesIcon size={16} />
                    Internal
                  </span>
                )}
              </div>

              <p className="mb-6 flex-1 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {project.description}
              </p>

              <div className="mt-auto flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-wider"
                    style={{ borderColor: "var(--tag-border)", backgroundColor: "var(--tag-bg)", color: "var(--tag-text)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
