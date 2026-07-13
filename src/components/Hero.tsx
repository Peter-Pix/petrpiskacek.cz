"use client";

import { useEffect, useRef } from "react";
import { ChevronDownIcon } from "./icons";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  // Subtle parallax + photo float
  useEffect(() => {
    const bg = bgRef.current;
    const photo = photoRef.current;
    if (!bg) return;

    function handleScroll() {
      const scrollY = window.scrollY;
      const maxOffset = 120;
      const offset = Math.min(scrollY * 0.3, maxOffset);
      if (bg) bg.style.transform = `translateY(${offset}px)`;
      if (photo) {
        const photoOffset = Math.min(scrollY * 0.15, 60);
        photo.style.transform = `translateY(${photoOffset}px) scale(${Math.max(1 - scrollY * 0.0005, 0.92)})`;
      }
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

      {/* Floating orbs — subtle background movement */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-1">
        <p className="section-label mb-4 animate-fade-in-up sm:mb-6">
          AI Solutions Architect &amp; Full‑Stack Developer
        </p>

        {/* Photo + Name — side by side on desktop */}
        <div className="mx-auto mb-6 flex max-w-xl flex-col items-center gap-6 sm:flex-row sm:text-left">
          <div
            ref={photoRef}
            className="hero-photo h-28 w-28 flex-shrink-0 overflow-hidden rounded-full border-2 sm:h-32 sm:w-32"
            style={{
              borderColor: "var(--border)",
              boxShadow: "0 0 40px rgba(200, 150, 46, 0.15)",
              willChange: "transform",
            }}
          >
            <img
              src="/hero-photo.webp"
              alt="Petr Piskáček"
              width={600}
              height={600}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <div>
            <h1
              className="hero-title text-[2.5rem] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
              style={{ color: "var(--text)" }}
            >
              Petr Piskáček
            </h1>
            <p
              className="mt-2 text-base leading-relaxed sm:text-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Pomáhám firmám zavádět AI, automatizovat procesy
              a stavět moderní webové aplikace, které přinášejí
              reálné výsledky.
            </p>
          </div>
        </div>

        <p
          className="mx-auto mb-8 max-w-lg text-sm leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          20+ let zkušeností v IT. Od mikroprocesorů až po generativní AI.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
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
          className="mt-6 text-xs"
          style={{ color: "var(--text-muted)" }}
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
