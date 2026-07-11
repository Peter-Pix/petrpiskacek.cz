"use client";

import { ChevronDownIcon } from "./icons";

export default function Hero() {
  return (
    <section
      id="top"
      className="hero-bg relative flex min-h-screen flex-col items-center justify-center px-4 pt-20 text-center"
    >
      <div className="hero-grid" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl">
        <p className="section-label mb-6 animate-fade-in-up">Portfolio • Base44 Partner</p>
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Petr Piskáček
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          IT specialista <span className="text-gold">•</span> Psycholog{" "}
          <span className="text-gold">•</span> Rap artist{" "}
          <span className="text-gold">•</span> AI builder
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 btn-primary text-sm"
          >
            Profilovat si mě
            <ChevronDownIcon size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 btn-secondary text-sm"
          >
            Napiš mi
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-float">
        <a
          href="#about"
          className="inline-flex flex-col items-center gap-1 text-xs text-zinc-500 transition-colors hover:text-gold"
        >
          <span className="font-mono uppercase tracking-widest">Scroll</span>
          <ChevronDownIcon size={20} />
        </a>
      </div>
    </section>
  );
}