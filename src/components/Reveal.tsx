"use client";

import { type ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Props = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before animation starts */
  delay?: number;
  /** Slide direction */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Scale effect: 0.98 → 1 */
  scale?: boolean;
  /** Add blur(8px) → blur(0) effect */
  blur?: boolean;
  /** Only fire once (default: true) */
  once?: boolean;
};

const directionStyles: Record<string, string> = {
  up: "translate-y-6",
  down: "-translate-y-6",
  left: "translate-x-6",
  right: "-translate-x-6",
  none: "",
};

/**
 * Wrapper that fades + slides + (optional) blurs in when the element scrolls into view.
 * Apple-style: subtle, smooth, one-time.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  scale = false,
  blur = false,
  once = true,
}: Props) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px",
    once,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
        isVisible
          ? "translate-y-0 translate-x-0 opacity-100 scale-100 blur-0"
          : `${directionStyles[direction]} opacity-0 ${scale ? "scale-[0.98]" : "scale-100"} ${blur ? "blur-[8px]" : ""}`
      } ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
