"use client";

import { ExternalLinkIcon, SparklesIcon } from "./icons";

const projects = [
  {
    name: "VocalBrain",
    description:
      "AI-powered hlasový asistent s vlastním charakterem a pamětí. Rozpoznávání řeči, přirozená konverzace, kontextová paměť. Aktivně vyvíjeno — local-first, open-source.",
    tags: ["AI", "Speech Recognition", "LLM", "TypeScript", "Active"],
    href: null,
  },
  {
    name: "4rap.cz",
    description:
      "Czech Rap Knowledge Platform — “operační systém české rapové scény”. 1699 entit, 9281 vztahů, D3-force síťové grafy, taxonomie, SEO a Schema.org JSON-LD. Next.js + MDX, build pipeline, interaktivní graf.",
    tags: ["Next.js", "MDX", "D3.js", "SEO", "JSON-LD"],
    href: "https://4rap.cz",
  },
  {
    name: "4Rap Studio",
    description:
      "Kreativní nástroje pro textaře: 4Bars — editor textů s AI asistentem, drag-and-drop sekcí, undo/redo, počítadlo slabik; 4Flow — vizualizátor flow s beat-gridem, BPM a tap-tempem.",
    tags: ["Next.js", "React", "AI", "Web Audio", "UX"],
    href: null,
  },
  {
    name: "AI CharStudio",
    description:
      "Lokální dashboard pro generativní AI workflows. Unifikované rozhraní pro Stable Diffusion (ComfyUI) a LLM. Správa modelů, pipeline editor a real-time náhledy.",
    tags: ["React 19", "TypeScript", "ComfyUI API", "Gemini SDK"],
    href: null,
  },
  {
    name: "Ollama Web Builder",
    description:
      "AI-powered webový editor, který v reálném čase generuje kód a náhled aplikace pomocí lokálního LLM. WebSocket streaming, Python proxy, Ollama API.",
    tags: ["Vanilla JS", "Python", "Ollama API", "WebSocket"],
    href: null,
  },
  {
    name: "StyleMorph",
    description:
      "AI nástroj pro okamžitý redesign HTML stránek. Transformuje zastaralé weby do moderního vzhledu pomocí Gemini a Ollama. Analýza struktury + generování nového kódu.",
    tags: ["React", "TypeScript", "TailwindCSS", "Gemini AI"],
    href: "https://github.com/Peter-Pix/StyleMorph",
  },
  {
    name: "Scrollo.cz",
    description:
      "Kolekce užitečných webových nástrojů zdarma a bez reklam. Čistý design, respektování soukromí, PWA. Kalkulačky, konvertory, generátory — vše client-side.",
    tags: ["Vanilla JS", "HTML5", "CSS3", "PWA"],
    href: "https://scrollo.vercel.app/",
  },
  {
    name: "AutoBlog Publisher",
    description:
      "Automatizační pipeline pro tvorbu a publikování SEO optimalizovaných článků. Propojuje LLM s CMS systémy. Generuje, optimalizuje a publikuje obsah bez manuální práce.",
    tags: ["Python", "LLM API", "Automation", "SEO"],
    href: "https://github.com/Peter-Pix/AutoBlog-Publisher",
  },
  {
    name: "ComfyUI Environment Manager",
    description:
      "Sada nástrojů pro správu izolovaných Python prostředí a modelů pro AI generování obrazu. CUDA 12.8, PyTorch, batch operace. Multi-environment setup pro GPU akceleraci.",
    tags: ["Python", "CUDA 12.8", "PyTorch", "DevOps"],
    href: null,
  },
  {
    name: "Local AI Assistants",
    description:
      "Vlastní AI asistenti na Ollama a open-source modelech. Agentní architektury, MCP servery, paměťové systémy a knowledge graphy. OpenClaw runtime, local-first.",
    tags: ["Ollama", "MCP", "Knowledge Graph", "SQLite"],
    href: null,
  },
  {
    name: "AI Media & Virtual Characters",
    description:
      "AI-generovaná média a personalizované virtuální postavy. Experimenty s generativními modely, interaktivní obsah a charakter design.",
    tags: ["Generative AI", "Characters", "Media", "Python"],
    href: null,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="section-label mb-3">Projekty</p>
        <h2 className="mb-14 text-[1.75rem] font-semibold leading-tight tracking-tight text-white sm:text-4xl">
          Věci, které stavím
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.name}
              className="glass relative flex flex-col rounded-2xl p-6 card-hover"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <h3 className="text-[1.15rem] font-semibold leading-snug text-white">
                  {project.name}
                </h3>
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-gold hover:underline"
                  >
                    <ExternalLinkIcon size={14} />
                    <span className="hidden sm:inline">Link</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                    <SparklesIcon size={14} />
                    Internal
                  </span>
                )}
              </div>

              <p className="mb-6 flex-1 text-[0.9rem] leading-relaxed text-zinc-400 sm:text-sm">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-300"
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