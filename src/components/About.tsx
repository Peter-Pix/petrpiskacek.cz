"use client";

import StatCounter from "./StatCounter";
import Timeline from "./Timeline";
import { CodeIcon, BrainIcon, MusicIcon } from "./icons";

const cards = [
  {
    icon: CodeIcon,
    title: "IT & Engineering",
    description:
      "20+ let v IT, od mikroprocesorů po generativní AI. Next.js, AI modely, automatizace, GPU akcelerace.",
  },
  {
    icon: BrainIcon,
    title: "Psychologie & chování",
    description:
      "Rozumím motivaci, rozhodování a chování uživatelů. Umím debugovat kód i lidi.",
  },
  {
    icon: MusicIcon,
    title: "Hudba & kreativita",
    description:
      "Jako Willy Tea tvořím hip-hop, trap a grime. Autentické texty, ironie, společenské postřehy.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-apple">
      <div className="container-apple">
        <p className="eyebrow mb-3">O mně</p>
        <h2 className="headline-lg mb-12">Tři světy, jeden mozek.</h2>

        <div className="mb-20 max-w-3xl space-y-6 text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          <p>
            Pocházím ze Šumavy. Dnes pendluju mezi Prachaticemi, Pardubicemi a Prahou.
          </p>
          <p>
            V osmi letech jsem v knihovně objevil knihu o Delphi. Přepisoval jsem kód jedním prstem a po hodinách se na obrazovce objevilo první <span className="font-semibold" style={{ color: "var(--gold)" }}>Hello World</span>.
          </p>
          <p>
            Za 20 let v IT jsem prošel cestu od mikroprocesorů přes webové aplikace až ke generativní AI. Neřeším jen, jestli něco funguje, ale hlavně proč to lidé budou chtít používat.
          </p>
          <p>
            Poslední roky jsem se ponořil do AI. Rok a půl práce na voice clonech — sedmá generace mýho klonu už zněla k nerozeznání. Modely umí zpívat i rapovat.
          </p>
          <p>
            Dnes mě táhnou cloudové AI platformy. Umožňují stavět větší systémy a měnit nápady ve funkční produkty rychleji.
          </p>
        </div>

        <div className="bento-grid mb-20">
          {cards.map((card) => (
            <div
              key={card.title}
              className="glass-card p-6 sm:p-8"
            >
              <div className="mb-5 inline-flex rounded-2xl bg-gold/10 p-3 text-gold">
                <card.icon size={28} />
              </div>
              <h3 className="headline-md mb-3 text-xl">{card.title}</h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>{card.description}</p>
            </div>
          ))}
        </div>

        <div className="section-divider mb-20" />

        <div className="mb-6">
          <p className="eyebrow mb-3">Čísla</p>
          <h3 className="headline-md mb-10">V číslech.</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-20">
          <StatCounter end={20} suffix="+" label="Let v IT" description="Od mikroprocesorů po generativní AI" />
          <StatCounter end={10} suffix="+" label="AI projektů" description="Od voice cloningu po enterprise AI" />
          <StatCounter end={1000} suffix="+" label="Hodin s AI" description="Lokální modely, cloud, orchestrace" />
          <div className="glass-card p-6">
            <p className="text-3xl font-bold text-gold">3</p>
            <p className="mt-1 text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Města působnosti</p>
            <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>Prachatice / Pardubice / Praha</p>
          </div>
        </div>

        <div className="section-divider mb-20" />

        <div className="mb-6">
          <p className="eyebrow mb-3">Zkušenosti</p>
          <h3 className="headline-md mb-10">Kde jsem byl.</h3>
        </div>
        <Timeline />

        <div className="mt-20 section-divider mb-20" />

        <div className="mb-6">
          <p className="eyebrow mb-3">Vzdělání</p>
          <h3 className="headline-md mb-10">Co jsem studoval.</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="glass-card p-6">
            <p className="eyebrow mb-2" style={{ color: "var(--gold)" }}>2002 – 2006</p>
            <h4 className="text-lg font-semibold mb-2">SPŠ Písek</h4>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>IT / Automatizační systémy. Mikroprocesory, Pascal, Delphi, Assembler.</p>
          </div>
          <div className="glass-card p-6">
            <p className="eyebrow mb-2" style={{ color: "var(--gold)" }}>2011 – 2012</p>
            <h4 className="text-lg font-semibold mb-2">New College Nottingham</h4>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>ESOL Level 2 — angličtina pro nerodilé mluvčí.</p>
          </div>
          <div className="glass-card p-6">
            <p className="eyebrow mb-2" style={{ color: "var(--gold)" }}>2011 – 2012</p>
            <h4 className="text-lg font-semibold mb-2">NVQ Level 2</h4>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>Customer Service. Praxe v hotelu Mercure, Nottingham.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
