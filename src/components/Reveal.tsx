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
  /** Only fire once (default: true) */
  once?: boolean;
};

const directionStyles: Record<string, string> = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
  none: "",
};

/**
 * Wrapper that fades + slides in when the element scrolls into view.
 * Apple-style: subtle, smooth, one-time.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  scale = false,
  once = true,
}: Props) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({ once });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        isVisible
          ? "translate-y-0 translate-x-0 opacity-100 scale-100"
          : `${directionStyles[direction]} opacity-0 ${scale ? "scale-[0.98]" : "scale-100"}`
      } ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
