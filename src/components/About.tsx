"use client";

import { CodeIcon, BrainIcon, MusicIcon } from "./icons";

const cards = [
  {
    icon: CodeIcon,
    title: "IT & Engineering",
    description:
      "20+ let v IT, od mikroprocesorů po generativní AI. Dnes stavím full-stack aplikace v Next.js, integruji AI modely a automatizuji procesy. GPU akcelerace (RTX 5090), local-first, first-principles.",
  },
  {
    icon: BrainIcon,
    title: "Psychologie & lidské chování",
    description:
      "Studium psychologie mi dalo nástroj rozumět motivaci, rozhodování a chování uživatelů. Výhoda v UX designu, produktovém myšlení a návrhu interakcí s AI. Umím debugovat kód i lidi.",
  },
  {
    icon: MusicIcon,
    title: "Hudba & Kreativita",
    description:
      "Jako rapový umělec Willy Tea tvořím hip-hop, trap a grime s minimalistickou produkcí. Autentické, vrstvené texty, ironie, společenské postřehy. Hudbu beru jako vážné umění, ne koníčka.",
  },
];

const timeline = [
  {
    period: "2023 – 2025",
    title: "AI CharStudio & ComfyUI Workflows",
    description: "Lokální dashboard pro generativní AI workflows a automatizace.",
    tags: ["TypeScript", "React 19", "ComfyUI API"],
  },
  {
    period: "2024 – 2025",
    title: "Ollama Web Builder",
    description: "AI-powered webový editor pro real-time generování kódu.",
    tags: ["Vanilla JS", "Python", "Ollama API"],
  },
  {
    period: "2023 – 2025",
    title: "Multi-Environment ComfyUI Setup",
    description: "Správa izolovaných prostředí pro AI experimenty.",
    tags: ["DevOps", "Python", "Batch Scripting"],
  },
  {
    period: "2023 – 2025",
    title: "AI Voice Cloning & Syntéza",
    description: "Rok a půl intenzivního vývoje AI hlasových modelů. Studiové nahrávání, klonování hlasu, 7. generace vlastního klonu — k nerozeznání od originálu. Modely umí zpívat i rapovat.",
    tags: ["Python", "TTS", "Voice Cloning", "Audio Engineering"],
  },
  {
    period: "2021 – 2023",
    title: "Technik (CEB) – ČSOB",
    description: "Technická podpora pro firemní klienty a interní týmy.",
    tags: ["Tech Support", "Komunikace", "Jira"],
  },
  {
    period: "2016 – 2021",
    title: "Web Developer (OSVČ)",
    description: "Full-stack vývoj webů a aplikací na zakázku.",
    tags: ["HTML/CSS", "JavaScript", "PHP"],
  },
];

const reasons = [
  {
    num: "01",
    title: "Technická expertíza",
    description:
      "20+ let s IT, od mikroprocesorů po generativní AI. Zkušenosti s GPU akcelerací (RTX 5090) a optimalizací workflows.",
  },
  {
    num: "02",
    title: "Komunikace",
    description:
      "Schopnost vysvětlit složité technologie srozumitelně. Bilingvní (CZ/EN) pro mezinárodní projekty.",
  },
  {
    num: "03",
    title: "Inovace",
    description:
      "Kombinuji analytické myšlení s praktickým řešením. Rychlá adaptace na nové technologie (LLM integrace).",
  },
  {
    num: "04",
    title: "Out of the box",
    description:
      "Typ osobnosti Logik (INTP-T). Hledám nekonvenční a efektivní řešení problémů.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="section-label mb-3">O mně</p>
        <h2 className="mb-10 text-[1.75rem] font-semibold leading-tight tracking-tight text-white sm:text-4xl">
          Tech, psyche a tvorba
        </h2>

        {/* Story */}
        <div className="mb-16 max-w-2xl space-y-5 text-[0.95rem] leading-relaxed text-zinc-400 sm:text-base">
          <p>
            Pocházím ze Šumavy. Dnes pendluju mezi Prachaticemi, Pardubicemi a Prahou a pracuju odkudkoliv.
          </p>
          <p>
            K programování jsem se dostal náhodou. V osmi letech jsem v knihovně objevil tlustou knihu o Delphi. Netušil jsem, co dělám, jen jsem jedním prstem přepisoval kód. Po hodinách zkoušení se na obrazovce objevilo první <span className="font-semibold text-gold">Hello World</span>. V tu chvíli jsem věděl, že jsem v tom až po uši.
          </p>
          <p>
            Za víc než 20 let v IT jsem prošel cestu od mikroprocesorů přes webové aplikace až ke generativní AI. Nejvíc mě baví stavět produkty na pomezí technologií, psychologie a kreativity. Neřeším jen, jestli něco funguje, ale hlavně proč to budou lidé chtít používat.
          </p>
          <p>
            Poslední roky jsem se ponořil do AI – od lokálních modelů a GPU až po automatizaci workflow. Rok a půl jsem intenzivně pracoval na AI voice modelech: klonování hlasu, nahrávání ve studiových podmínkách, ladění přirozenosti. Nahrával jsem hluboké i vysoké polohy, variace, všechny souhlásky a samohlásky — aby model nezněl uměle, ale přesně jako ten člověk. Dostal jsem se k sedmé generaci vlastního hlasového klonu. V tu chvíli už jsem nepoznal, jestli mluvím já, nebo můj model. Moje modely umí zpívat a rapovat. Jsou tracky, který jsem takhle udělal — a nikdo nepozná, který.
          </p>
          <p>
            Dnes mě ale víc táhnou cloudové AI platformy. Umožňují stavět větší systémy, propojovat služby a měnit nápady ve funkční produkty mnohem rychleji.
          </p>
          <p>
            Ať už jde o software, AI nebo hudbu, pořád mě žene stejná věc jako tehdy v osmi letech: radost z toho, že z ničeho může vzniknout něco, co dává smysl.
          </p>
        </div>

        {/* Three pillars */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="glass rounded-2xl p-6 card-hover"
            >
              <div className="mb-5 inline-flex rounded-xl bg-gold/10 p-3 text-gold">
                <card.icon size={28} />
              </div>
              <h3 className="mb-3 text-[1.1rem] font-semibold leading-snug text-white">
                {card.title}
              </h3>
              <p className="text-[0.9rem] leading-relaxed text-zinc-400 sm:text-sm">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Personal details */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="glass rounded-xl p-5">
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">Věk</p>
            <p className="mt-1 text-base text-white sm:text-lg">39 let</p>
          </div>
          <div className="glass rounded-xl p-5">
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">Lokalita</p>
            <p className="mt-1 text-base leading-tight text-white sm:text-lg">Prachatice / Pardubice / Praha</p>
          </div>
          <div className="glass rounded-xl p-5">
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">Role</p>
            <p className="mt-1 text-base text-white sm:text-lg">AI Specialist</p>
          </div>
          <div className="glass rounded-xl p-5">
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">MBTI</p>
            <p className="mt-1 text-base text-white sm:text-lg">Logik (INTP-T)</p>
          </div>
          <div className="glass rounded-xl p-5 border-gold/20">
            <p className="text-xs font-mono uppercase tracking-wider text-gold/60">Partner</p>
            <p className="mt-1 text-base text-gold sm:text-lg">Base44.com</p>
          </div>
        </div>

        {/* Work timeline */}
        <div className="mt-16">
          <h3 className="mb-8 text-[1.1rem] font-semibold text-white">Profesní cesta</h3>
          <div className="relative border-l border-white/10 pl-6">
            {timeline.map((item, i) => (
              <div key={i} className="mb-8 relative">
                <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-gold/60 ring-4 ring-gold/10" />
                <p className="text-xs font-mono uppercase tracking-wider text-gold/70 mb-1">
                  {item.period}
                </p>
                <h4 className="text-[0.95rem] font-semibold leading-snug text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-[0.85rem] text-zinc-400 mb-2 sm:text-sm">{item.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-16">
          <h3 className="mb-8 text-[1.1rem] font-semibold text-white">Vzdělání</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-xl p-5">
              <p className="text-xs font-mono uppercase tracking-wider text-gold/70 mb-1">2002 – 2006</p>
              <h4 className="text-[0.95rem] font-semibold leading-snug text-white mb-1">SPŠ Písek — IT / Automatizační systémy</h4>
              <p className="text-[0.85rem] leading-relaxed text-zinc-400 sm:text-sm">Programování mikroprocesorů, vzdálené ovládání systémů. AutoCAD, WebControl, Pascal, Delphi, C++, Assembler. Maturitní vysvědčení.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <p className="text-xs font-mono uppercase tracking-wider text-gold/70 mb-1">2011 – 2012</p>
              <h4 className="text-[0.95rem] font-semibold leading-snug text-white mb-1">New College Nottingham — ESOL Level 2</h4>
              <p className="text-[0.85rem] leading-relaxed text-zinc-400 sm:text-sm">Dvouleté studium angličtiny pro nerodilé mluvčí. Certificate Level 2.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <p className="text-xs font-mono uppercase tracking-wider text-gold/70 mb-1">2011 – 2012</p>
              <h4 className="text-[0.95rem] font-semibold leading-snug text-white mb-1">NVQ Level 2 — Customer Service</h4>
              <p className="text-[0.85rem] leading-relaxed text-zinc-400 sm:text-sm">National Vocational Qualification v zákaznickém servisu. Praxe ve 4★ hotelu Mercure v centru Nottinghamu.</p>
            </div>
          </div>
        </div>

        {/* Why work with me */}
        <div className="mt-16">
          <h3 className="mb-8 text-[1.1rem] font-semibold text-white">Proč spolupracovat?</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => (
              <div key={reason.num} className="glass rounded-xl p-5">
                <p className="text-2xl font-bold text-gold/30 mb-2">{reason.num}</p>
                <h4 className="text-sm font-semibold leading-snug text-white mb-2">{reason.title}</h4>
                <p className="text-[0.8rem] leading-relaxed text-zinc-400 sm:text-xs">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}