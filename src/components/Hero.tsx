"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const photo = photoRef.current;
    const text = textRef.current;
    if (!photo || !text) return;

    function handleScroll() {
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;
      const progress = Math.min(scrollY / viewportH, 1);

      if (photo) {
        const photoOpacity = Math.max(1 - progress * 2.5, 0);
        const photoScale = Math.max(1 - progress * 0.2, 0.75);
        const photoTranslate = Math.min(scrollY * 0.2, 60);
        photo.style.transform = `translateY(${photoTranslate}px) scale(${photoScale})`;
        photo.style.opacity = String(photoOpacity);
      }

      if (text) {
        const textOpacity = Math.max(1 - progress * 1.4, 0);
        const textBlur = Math.min(progress * 12, 8);
        const textTranslate = Math.min(scrollY * 0.15, 50);
        text.style.transform = `translateY(${-textTranslate}px)`;
        text.style.opacity = String(textOpacity);
        text.style.filter = `blur(${textBlur}px)`;
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
            transition: "transform 0.1s linear, opacity 0.1s linear",
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

        <div
          ref={textRef}
          style={{ willChange: "transform, opacity, filter", transition: "transform 0.1s linear, opacity 0.1s linear, filter 0.1s linear" }}
        >
          <p className="eyebrow mb-4 animate-fade-in-up" style={{ color: "var(--gold)" }}>
            AI &times; Psychologie &times; Code
          </p>

          <h1
            className="headline-xl mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Petr Piskáček
          </h1>

          <p
            className="subhead mx-auto mb-8 max-w-2xl animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Stavím věci, co fungujou. Místo PowerPoint prezentací.
          </p>

          <p
            className="mb-10 text-sm animate-fade-in-up"
            style={{ color: "var(--text-muted)", animationDelay: "0.3s" }}
          >
            20 let v IT. Psychologie. Rap. Žádný korporát.
          </p>

          <div
            className="flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <a href="#projects" className="btn-apple btn-apple-primary w-full sm:w-auto">
              Prohlédnout projekty
            </a>
            <a href="#contact" className="btn-apple btn-apple-secondary w-full sm:w-auto">
              Nezávazně se spojit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
