"use client";

import { useEffect, useRef, useState } from "react";
import { useMouseParallax } from "@/hooks/useMouseParallax";

const LINES = [
  "Chcete to mít.",
  "Mávnu křídly.",
];

const TYPE_SPEED = 80;
const PAUSE_AFTER_LINE = 2500;
const BLINK_COUNT = 4;
const BLINK_DURATION = 150;
const BLINK_GAP = 150;
const BLUR_FADE_DURATION = 1000;
const PAUSE_BEFORE_NEXT = 800;

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const parallax = useMouseParallax(8);
  const [text, setText] = useState("");
  const [fading, setFading] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const currentLineRef = useRef(0);
  const cancelledRef = useRef(false);
  const runningRef = useRef(false);

  const startTyping = useRef<() => void>(() => {});

  startTyping.current = () => {
    if (runningRef.current) return;
    runningRef.current = true;
    cancelledRef.current = false;

    const line = LINES[currentLineRef.current];
    if (!line) { runningRef.current = false; return; }

    let pos = 0;

    const typeChar = () => {
      if (cancelledRef.current) return;
      if (pos < line.length) {
        pos++;
        setText(line.slice(0, pos));
        setTimeout(typeChar, TYPE_SPEED);
      } else {
        setTimeout(() => {
          if (cancelledRef.current) return;
          let blinkCount = 0;
          const doBlink = () => {
            if (cancelledRef.current) return;
            if (blinkCount >= BLINK_COUNT) {
              // Wrap-around: po posledním řádku pokračuj od začátku (nekonečná rotace).
              setFading(true);
              setTimeout(() => {
                if (cancelledRef.current) return;
                setText("");
                setFading(false);
                setTimeout(() => {
                  if (cancelledRef.current) return;
                  currentLineRef.current = (currentLineRef.current + 1) % LINES.length;
                  runningRef.current = false;
                  setTimeout(() => startTyping.current(), 50);
                }, PAUSE_BEFORE_NEXT);
              }, BLUR_FADE_DURATION);
              return;
            }
            blinkCount++;
            setTimeout(doBlink, BLINK_GAP);
          };
          setTimeout(doBlink, 200);
        }, PAUSE_AFTER_LINE);
      }
    };

    setTimeout(typeChar, 100);
  };

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (reducedMotion) {
      setText(LINES.join(" | "));
      return;
    }
    const timer = setTimeout(() => startTyping.current(), 500);
    return () => { cancelledRef.current = true; clearTimeout(timer); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll parallax
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    function handleScroll() {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(scrollY / vh, 1);

      if (el) {
        el.style.transform = `translateY(${-Math.min(scrollY * 0.15, 50)}px)`;
        el.style.opacity = String(Math.max(1 - progress * 1.4, 0));
        el.style.filter = `blur(${Math.min(progress * 12, 8)}px)`;
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
        {/* Text block */}
        <div
          ref={textRef}
          style={{
            willChange: "transform, opacity, filter",
            transition: "transform 0.1s linear, opacity 0.1s linear, filter 0.1s linear",
            transform: `translate(${parallax.x}px, ${parallax.y}px)`,
          }}
        >
          <p className="eyebrow mb-4 animate-fade-in-up" style={{ color: "var(--gold)" }}>
            Konec experimentů.
          </p>

          <div className="mb-8 sm:mb-12">
            <h1
              className="headline-xl text-center"
              style={{
                minHeight: "1.4em",
                filter: fading ? "blur(8px)" : "blur(0px)",
                opacity: fading ? 0 : 1,
                transition: `filter ${BLUR_FADE_DURATION}ms ease-out, opacity ${BLUR_FADE_DURATION}ms ease-out`,
              }}
            >
              {text}
              {text && !fading && (
                <span className="terminal-cursor" />
              )}
            </h1>
          </div>

          <p
            className="mb-12 max-w-xl mx-auto text-base leading-relaxed sm:text-lg text-center animate-fade-in-up"
            style={{ color: "var(--text-secondary)", animationDelay: "0.4s" }}
          >
            Inteligentní design, který dělá věci samostatně.
          </p>

          <div
            className="flex animate-fade-in-up flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "0.3s" }}
          >
            <a href="#about" className="btn-apple btn-apple-primary w-full sm:w-auto">
              S čím pomůžu
            </a>
            <a
              href="https://petrpiskacek.cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-apple btn-apple-secondary w-full sm:w-auto"
            >
              Živé projekty
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
