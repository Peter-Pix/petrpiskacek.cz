"use client";

import StatCounter from "./StatCounter";
import Timeline from "./Timeline";
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

const reasons = [
  {
    num: "01",
    title: "Technické zkušenosti",
    description:
      "20+ let vývoje od embedded systémů po AI. GPU akcelerace (RTX 5090), lokální modely, cloud orchestrace.",
  },
  {
    num: "02",
    title: "Byznysové myšlení",
    description:
      "Nevytvářím technologie pro technologie. Řeším konkrétní problémy — ať už jde o automatizaci, AI asistenta nebo webovou aplikaci.",
  },
  {
    num: "03",
    title: "Rychlost",
    description:
      "Od nápadu k funkčnímu prototypu během dnů, ne měsíců. 11 vlastních projektů — žádné tutorial projekty.",
  },
  {
    num: "04",
    title: "AI expertise",
    description:
      "Praktické zkušenosti s LLM, automatizací, AI asistenty a workflow. Psychologie + IT = rozumím lidem i kódu.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="section-label mb-3">O mně</p>
        <h2 className="mb-10 text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-4xl"
          style={{ color: "var(--text)" }}>
          Tech, psyche a tvorba
        </h2>

        {/* Story */}
        <div className="mb-16 max-w-2xl space-y-5 text-[0.95rem] leading-relaxed sm:text-base"
          style={{ color: "var(--text-secondary)" }}>
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
              <h3 className="mb-3 text-[1.1rem] font-semibold leading-snug"
                style={{ color: "var(--text)" }}>
                {card.title}
              </h3>
              <p className="text-[0.9rem] leading-relaxed sm:text-sm"
                style={{ color: "var(--text-secondary)" }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats — animated counters */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCounter
            end={20}
            suffix="+"
            label="Let v IT"
            description="Od mikroprocesorů po generativní AI"
          />
          <StatCounter
            end={10}
            suffix="+"
            label="AI projektů"
            description="Od voice cloningu po enterprise AI"
          />
          <StatCounter
            end={1000}
            suffix="+"
            label="Hodin s AI"
            description="Lokální modely, cloud, orchestrace"
          />
          <div className="glass rounded-xl p-5 border-gold/20">
            <p className="text-2xl font-bold text-gold sm:text-3xl">3</p>
            <p className="mt-1 text-xs font-mono uppercase tracking-wider text-gold/60">Města působnosti</p>
            <p className="mt-1 text-[0.8rem] text-zinc-400">Prachatice / Pardubice / Praha</p>
          </div>
        </div>

        {/* Work timeline — interactive accordion */}
        <div className="mt-16">
          <h3 className="mb-8 text-[1.1rem] font-semibold"
            style={{ color: "var(--text)" }}>Klíčové zkušenosti</h3>
          <Timeline />
        </div>

        {/* Education */}
        <div className="mt-16">
          <h3 className="mb-8 text-[1.1rem] font-semibold"
            style={{ color: "var(--text)" }}>Vzdělání</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-xl p-5">
              <p className="text-xs font-mono uppercase tracking-wider text-gold/70 mb-1">2002 – 2006</p>
              <h4 className="text-[0.95rem] font-semibold leading-snug mb-1"
                style={{ color: "var(--text)" }}>SPŠ Písek — IT / Automatizační systémy</h4>
              <p className="text-[0.85rem] leading-relaxed sm:text-sm"
                style={{ color: "var(--text-secondary)" }}>Programování mikroprocesorů, vzdálené ovládání systémů. AutoCAD, WebControl, Pascal, Delphi, Assembler. Maturitní vysvědčení.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <p className="text-xs font-mono uppercase tracking-wider text-gold/70 mb-1">2011 – 2012</p>
              <h4 className="text-[0.95rem] font-semibold leading-snug mb-1"
                style={{ color: "var(--text)" }}>New College Nottingham — ESOL Level 2</h4>
              <p className="text-[0.85rem] leading-relaxed sm:text-sm"
                style={{ color: "var(--text-secondary)" }}>Dvouleté studium angličtiny pro nerodilé mluvčí. Certificate Level 2.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <p className="text-xs font-mono uppercase tracking-wider text-gold/70 mb-1">2011 – 2012</p>
              <h4 className="text-[0.95rem] font-semibold leading-snug mb-1"
                style={{ color: "var(--text)" }}>NVQ Level 2 — Customer Service</h4>
              <p className="text-[0.85rem] leading-relaxed sm:text-sm"
                style={{ color: "var(--text-secondary)" }}>National Vocational Qualification v zákaznickém servisu. Praxe ve 4★ hotelu Mercure v centru Nottinghamu.</p>
            </div>
          </div>
        </div>

        {/* Why hire me */}
        <div className="mt-16">
          <h3 className="mb-8 text-[1.1rem] font-semibold"
            style={{ color: "var(--text)" }}>Proč si mě firmy najímají</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => (
              <div key={reason.num} className="glass rounded-xl p-5">
                <p className="text-2xl font-bold text-gold/30 mb-2">{reason.num}</p>
                <h4 className="text-sm font-semibold leading-snug mb-2"
                  style={{ color: "var(--text)" }}>{reason.title}</h4>
                <p className="text-[0.8rem] leading-relaxed sm:text-xs"
                  style={{ color: "var(--text-secondary)" }}>{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}