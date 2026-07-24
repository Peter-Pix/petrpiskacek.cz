"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  "Stavím řešení",
  "AI, která maká",
  "Čas šetřit čas",
  "Dělám věci jinak",
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
  const photoRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
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
              setCursorVisible(false);
              setFading(true);
              setTimeout(() => {
                if (cancelledRef.current) return;
                setText("");
                setFading(false);
                setTimeout(() => {
                  if (cancelledRef.current) return;
                  currentLineRef.current = (currentLineRef.current + 1) % LINES.length;
                  setCursorVisible(true);
                  runningRef.current = false;
                  setTimeout(() => startTyping.current(), 50);
                }, PAUSE_BEFORE_NEXT);
              }, BLUR_FADE_DURATION);
              return;
            }
            setCursorVisible(false);
            setTimeout(() => {
              if (cancelledRef.current) return;
              setCursorVisible(true);
              blinkCount++;
              setTimeout(doBlink, BLINK_GAP);
            }, BLINK_DURATION);
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

  useEffect(() => {
    if (reducedMotion || fading || !text) return;
    const interval = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(interval);
  }, [reducedMotion, fading, text]);

  // Parallax
  useEffect(() => {
    const el = textRef.current;
    const photo = photoRef.current;
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
      if (photo) {
        photo.style.transform = `translateY(${Math.min(scrollY * 0.2, 60)}px) scale(${Math.max(1 - progress * 0.2, 0.75)})`;
        photo.style.opacity = String(Math.max(1 - progress * 2.5, 0));
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
        {/* Photo */}
        <div
          ref={photoRef}
          className="mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full sm:mb-8 sm:h-36 sm:w-36"
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

        {/* Text block */}
        <div
          ref={textRef}
          style={{
            willChange: "transform, opacity, filter",
            transition: "transform 0.1s linear, opacity 0.1s linear, filter 0.1s linear",
          }}
        >
          <p className="eyebrow mb-4 animate-fade-in-up" style={{ color: "var(--gold)" }}>
            Petr Piskáček
          </p>

          <div
            className="relative mb-8 flex items-center justify-center sm:mb-12"
            style={{ minHeight: "6rem" }}
          >
            <h1
              className="headline-xl text-center"
              style={{
                filter: fading ? "blur(8px)" : "blur(0px)",
                opacity: fading ? 0 : 1,
                transition: `filter ${BLUR_FADE_DURATION}ms ease-out, opacity ${BLUR_FADE_DURATION}ms ease-out`,
              }}
            >
              {text}
              {text && !fading && (
                <span
                  className="inline-block w-[3px] h-[0.8em] ml-1 align-middle transition-opacity duration-100"
                  style={{
                    backgroundColor: "var(--gold)",
                    opacity: cursorVisible ? 1 : 0,
                  }}
                />
              )}
            </h1>
          </div>

          <p
            className="subhead mx-auto mb-8 max-w-lg animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            20 let programuju. 8 live projektů. 0 výmluv.
          </p>

          <div
            className="flex animate-fade-in-up flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "0.3s" }}
          >
            <a href="#about" className="btn-apple btn-apple-primary w-full sm:w-auto">
              Kdo jsem a co umím
            </a>
            <a
              href="https://petrpiskacek.cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-apple btn-apple-secondary w-full sm:w-auto"
            >
              Mrknout na projekty →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
