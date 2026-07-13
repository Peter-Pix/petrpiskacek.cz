"use client";

import { useEffect, useRef } from "react";
import { ChevronDownIcon } from "./icons";

export default function Hero() {
  const photoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const photo = photoRef.current;
    if (!photo) return;

    function handleScroll() {
      const scrollY = window.scrollY;
      const scale = Math.max(1 - scrollY * 0.0008, 0.8);
      const translateY = Math.min(scrollY * 0.25, 80);
      if (photo) {
        photo.style.transform = `translateY(${translateY}px) scale(${scale})`;
        photo.style.opacity = String(Math.max(1 - scrollY * 0.0015, 0.3));
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="top"
      className="hero-bg relative flex min-h-[100svh] flex-col items-center justify-center px-5 pt-20 text-center"
    >
      <div className="hero-grid" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      <div className="container-narrow relative z-10">
        <div
          ref={photoRef}
          className="hero-photo mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full sm:mb-8 sm:h-40 sm:w-40"
          style={{
            border: "1px solid var(--border)",
            boxShadow: "0 0 60px rgba(200, 150, 46, 0.15)",
            willChange: "transform, opacity",
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

        <p className="eyebrow mb-4 animate-fade-in-up" style={{ color: "var(--gold)" }}>
          AI Solutions Architect &amp; Full‑Stack Developer
        </p>

        <h1
          ref={titleRef}
          className="headline-xl mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Petr Piskáček
        </h1>

        <p
          className="subhead mx-auto mb-8 max-w-2xl animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Pomáhám firmám zavádět AI, automatizovat procesy
          a stavět moderní webové aplikace.
        </p>

        <p
          className="mb-10 text-sm animate-fade-in-up"
          style={{ color: "var(--text-muted)", animationDelay: "0.3s" }}
        >
          20+ let v IT. Od mikroprocesorů až po generativní AI.
        </p>

        <div
          className="flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <a href="#projects" className="btn-apple btn-apple-primary w-full sm:w-auto">
            Prohlédnout projekty
            <ChevronDownIcon size={16} />
          </a>
          <a href="#contact" className="btn-apple btn-apple-secondary w-full sm:w-auto">
            Nezávazně se spojit
          </a>
        </div>

        <p
          className="mt-8 text-xs animate-fade-in-up"
          style={{ color: "var(--text-muted)", animationDelay: "0.5s" }}
        >
          💬 Máš otázky? Zeptej se Doofyho vpravo dole.
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-float">
        <a
          href="#about"
          className="inline-flex flex-col items-center gap-1 text-xs transition-colors hover:text-gold"
          style={{ color: "var(--text-muted)" }}
        >
          <span className="eyebrow">Scroll</span>
          <ChevronDownIcon size={20} />
        </a>
      </div>
    </section>
  );
}
