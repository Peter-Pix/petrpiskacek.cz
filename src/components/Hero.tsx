"use client";

import { ChevronDownIcon } from "./icons";

export default function Hero() {
  return (
    <section
      id="top"
      className="hero-bg relative flex min-h-[100svh] flex-col items-center justify-center px-5 pt-20 text-center sm:px-6"
    >
      <div className="hero-grid" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-1">
        <p className="section-label mb-4 sm:mb-6 animate-fade-in-up">
          Portfolio • Base44 Partner
        </p>
        <h1
          className="hero-title mb-4 text-[2.5rem] font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Petr Piskáček
        </h1>
        <p
          className="hero-subtitle mx-auto mb-8 max-w-[90%] text-base leading-relaxed text-zinc-400 sm:max-w-xl sm:text-xl sm:leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          IT specialista <span className="text-gold">•</span> Psycholog{" "}
          <span className="text-gold">•</span> Rap artist{" "}
          <span className="text-gold">•</span> AI builder
        </p>

        <div
          className="flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <a
            href="#about"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3 btn-primary text-sm sm:w-auto"
          >
            Profilovat si mě
            <ChevronDownIcon size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3 btn-secondary text-sm sm:w-auto"
          >
            Napiš mi
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-float sm:bottom-8">
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
