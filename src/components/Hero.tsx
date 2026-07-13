"use client";

import { useEffect, useRef } from "react";
import { ChevronDownIcon } from "./icons";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  // Subtle parallax: background moves slightly slower than scroll
  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    function handleScroll() {
      const scrollY = window.scrollY;
      const maxOffset = 120;
      const offset = Math.min(scrollY * 0.3, maxOffset);
      if (el) el.style.transform = `translateY(${offset}px)`;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="top"
      className="hero-bg relative flex min-h-[100svh] flex-col items-center justify-center px-5 pt-20 text-center sm:px-6"
    >
      <div ref={bgRef} className="hero-grid" aria-hidden="true" style={{ willChange: "transform" }} />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-1">
        <p className="section-label mb-4 sm:mb-6 animate-fade-in-up">
          AI Solutions Architect &amp; Full‑Stack Developer
        </p>
        <h1
          className="hero-title mb-4 text-[2.5rem] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl animate-fade-in-up"
          style={{ animationDelay: "0.1s", color: "var(--text)" }}
        >
          Petr Piskáček
        </h1>
        <p
          className="hero-subtitle mx-auto mb-8 max-w-[90%] text-base leading-relaxed sm:max-w-xl sm:text-xl sm:leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.2s", color: "var(--text-secondary)" }}
        >
          Pomáhám firmám zavádět AI, automatizovat procesy
          a stavět moderní webové aplikace, které přinášejí
          reálné výsledky.
        </p>

        <p
          className="mx-auto mb-8 max-w-lg text-sm leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.25s", color: "var(--text-muted)" }}
        >
          20+ let zkušeností v IT. Od mikroprocesorů až po generativní AI.
        </p>

        <div
          className="flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <a
            href="#projects"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3 btn-primary text-sm sm:w-auto"
          >
            Prohlédnout projekty
            <ChevronDownIcon size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3 btn-secondary text-sm sm:w-auto"
          >
            Nezávazně se spojit
          </a>
        </div>

        <p
          className="mt-6 text-xs animate-fade-in-up"
          style={{ animationDelay: "0.4s", color: "var(--text-muted)" }}
        >
          💬 Máš otázky? Zeptej se Doofyho — mýho AI asistenta vpravo dole
        </p>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-float sm:bottom-8">
        <a
          href="#about"
          className="inline-flex flex-col items-center gap-1 text-xs transition-colors hover:text-gold"
          style={{ color: "var(--text-muted)" }}
        >
          <span className="font-mono uppercase tracking-widest">Scroll</span>
          <ChevronDownIcon size={20} />
        </a>
      </div>
    </section>
  );
}
