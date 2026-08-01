"use client";

import { useEffect, useState } from "react";

type Position = { x: number; y: number };

/**
 * Mouse parallax hook — desktop only.
 * Returns normalized (-1 to 1) x/y offset from viewport center.
 * Stays at {0,0} on touch devices.
 */
export function useMouseParallax(strength: number = 8): Position {
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    // Disable on touch / coarse pointer devices
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = ((e.clientX - cx) / cx) * strength;
      targetY = ((e.clientY - cy) / cy) * strength;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      // Smooth easing (lerp)
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      // Stop loop when close enough
      if (
        Math.abs(targetX - currentX) < 0.05 &&
        Math.abs(targetY - currentY) < 0.05
      ) {
        currentX = targetX;
        currentY = targetY;
        raf = 0;
      } else {
        raf = requestAnimationFrame(tick);
      }

      setPos({ x: currentX, y: currentY });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return pos;
}
