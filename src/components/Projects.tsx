"use client";

import { ExternalLinkIcon, SparklesIcon } from "./icons";

type Project = {
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  result: string;
  metrics?: string[];
  tags: string[];
  href: string | null;
};

const projects: Project[] = [
  {
    name: "VocalBrain",
    tagline: "AI hlasový asistent s vlastní osobností",
    problem: "Existující AI asistenti jsou generičtí, bez paměti a bez charakteru.",
    solution: "Hlasový asistent s kontextovou pamětí, přirozenou konverzací a vlastní osobností. Local-first, open-source.",
    result: "Aktivně vyvíjeno — funkční prototyp s pamětí, rozpoznáváním řeči a přirozenými odpověďmi.",
    tags: ["AI", "Speech Recognition", "LLM", "TypeScript", "Active"],
    href: null,
  },
  {
    name: "4rap.cz",
    tagline: "Největší znalostní databáze české rapové scény",
    problem: "Česká rapová scéna nemá centralizovaný zdroj informací — data jsou roztříštěná po webech, fórech a sociálních sítích.",
    solution: "Next.js + MDX platforma s 1699 entitami, 9281 vztahy, D3-force síťovými grafy a SEO optimalizací.",
    result: "✓ 1699 entit • ✓ 9281 vztahů • ✓ Interaktivní graf znalostí • ✓ SEO-optimalizovaná architektura",
    metrics: ["1699 entit", "9281 vztahů", "Schema.org JSON-LD"],
    tags: ["Next.js", "MDX", "D3.js", "SEO", "JSON-LD"],
    href: "https://4rap.cz",
  },
  {
    name: "4Rap Studio",
    tagline: "Kreativní nástroje pro textaře",
    problem: "Rap textaři nemají specializované nástroje — používají textové editory, které nepodporují strukturu skladeb ani flow.",
    solution: "4Bars — editor textů s AI asistentem, drag-and-drop sekcí, undo/redo, počítadlem slabik. 4Flow — vizualizátor flow s beat-gridem a tap-tempem.",
    result: "Funkční prototyp s AI asistencí, českým počítáním slabik a vizualizací flow.",
    tags: ["Next.js", "React", "AI", "Web Audio", "UX"],
    href: null,
  },
  {
    name: "AI CharStudio",
    tagline: "Lokální dashboard pro generativní AI",
    problem: "Práce s ComfyUI a LLM vyžaduje přepínání mezi nástroji — žádné jednotné rozhraní.",
    solution: "Unifikovaný dashboard pro Stable Diffusion (ComfyUI) a LLM. Správa modelů, pipeline editor a real-time náhledy.",
    result: "Funkční lokální prostředí pro AI workflows bez závislosti na cloudu.",
    tags: ["React 19", "TypeScript", "ComfyUI API", "Gemini SDK"],
    href: null,
  },
  {
    name: "StyleMorph",
    tagline: "AI redesign HTML stránek",
    problem: "Zastaralé weby potřebují redesign, ale ruční přepis je časově náročný.",
    solution: "AI nástroj, který analyzuje strukturu HTML a generuje moderní redesign pomocí Gemini a Ollama.",
    result: "Open-source nástroj na GitHubu. Stačí zadat URL a AI vygeneruje nový vzhled.",
    tags: ["React", "TypeScript", "TailwindCSS", "Gemini AI"],
    href: "https://github.com/Peter-Pix/StyleMorph",
  },
  {
    name: "AutoBlog Publisher",
    tagline: "Automatizace SEO obsahu",
    problem: "Tvorba SEO článků je časově náročná a opakující se práce.",
    solution: "Pipeline, která propojuje LLM s CMS — generuje, optimalizuje a publikuje obsah bez manuální práce.",
    result: "Open-source. Roboti dělají robotí práci, lidé se věnují kreativě.",
    tags: ["Python", "LLM API", "Automation", "SEO"],
    href: "https://github.com/Peter-Pix/AutoBlog-Publisher",
  },
  {
    name: "Scrollo.cz",
    tagline: "Webové nástroje zdarma, bez reklam, bez trackingu",
    problem: "Většina online nástrojů je přeplácaná reklamami a sledováním.",
    solution: "Kolekce užitečných nástrojů — kalkulačky, konvertory, generátory. Vše client-side, PWA, bez reklam.",
    result: "Funkční PWA s čistým designem a respektováním soukromí.",
    tags: ["Vanilla JS", "HTML5", "CSS3", "PWA"],
    href: "https://scrollo.vercel.app/",
  },
  {
    name: "Local AI Assistants",
    tagline: "Agentní architektura na lokálních modelech",
    problem: "Cloudové AI služby jsou drahé, pomalé a ohrožují soukromí dat.",
    solution: "Vlastní AI asistenti na Ollama a open-source modelech. Agentní architektury, MCP servery, paměťové systémy a knowledge graphy.",
    result: "Funkční runtime (OpenClaw) s lokálními modely, MCP integrací a perzistentní pamětí.",
    tags: ["Ollama", "MCP", "Knowledge Graph", "SQLite"],
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
              {/* Header */}
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[1.15rem] font-semibold leading-snug text-white">
                    {project.name}
                  </h3>
                  <p className="text-xs text-gold/70 mt-0.5">{project.tagline}</p>
                </div>
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-gold hover:underline shrink-0"
                  >
                    <ExternalLinkIcon size={14} />
                    <span className="hidden sm:inline">Link</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-zinc-500 shrink-0">
                    <SparklesIcon size={14} />
                    Internal
                  </span>
                )}
              </div>

              {/* Problem → Solution → Result */}
              <div className="mb-4 space-y-2.5">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-red-400/60">Problém</p>
                  <p className="text-[0.85rem] leading-relaxed text-zinc-400 sm:text-sm">{project.problem}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-gold/60">Řešení</p>
                  <p className="text-[0.85rem] leading-relaxed text-zinc-400 sm:text-sm">{project.solution}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/60">Výsledek</p>
                  <p className="text-[0.85rem] leading-relaxed text-zinc-300 sm:text-sm">{project.result}</p>
                </div>
              </div>

              {/* Metrics */}
              {project.metrics && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.metrics.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-gold/20 bg-gold/5 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-gold/80"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}

              {/* Tags */}
              <div className="mt-auto flex flex-wrap gap-2">
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
