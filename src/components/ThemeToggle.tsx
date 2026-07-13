"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "petr-p…heme";

/**
 * Dark/light mode toggle with elegant crossfade animation.
 * Default: dark. Persists to localStorage.
 * Adds/removes `.light` class on `<html>`.
 */
export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);
  const transitioning = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const light = stored === "light";
    setIsLight(light);
    document.documentElement.classList.toggle("light", light);
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    if (transitioning.current) return;
    transitioning.current = true;

    const next = !isLight;

    // Add transition overlay class
    document.documentElement.classList.add("theme-transitioning");

    // After a brief delay, switch theme
    setTimeout(() => {
      setIsLight(next);
      document.documentElement.classList.toggle("light", next);
      localStorage.setItem(STORAGE_KEY, next ? "light" : "dark");

      // Remove overlay after animation completes
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
        transitioning.current = false;
      }, 600);
    }, 50);
  }, [isLight]);

  // Avoid hydration mismatch
  if (!mounted) {
    return <div className="h-9 w-9" />;
  }

  return (
    <button
      onClick={toggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors hover:bg-white/5"
      style={{ color: "var(--text-secondary)" }}
      aria-label={isLight ? "Přepnout na tmavý režim" : "Přepnout na světlý režim"}
      title={isLight ? "Tmavý režim" : "Světlý režim"}
    >
      {isLight ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
    </button>
  );
}
