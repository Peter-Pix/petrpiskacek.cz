"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  end: number;
  duration?: number; // ms
  suffix?: string;
  threshold?: number;
};

/**
 * Count-up animation triggered when element enters viewport.
 * Returns [ref, displayValue] — attach ref to the element.
 */
export function useCountUp<T extends HTMLElement = HTMLDivElement>(
  options: Options
) {
  const { end, duration = 1500, suffix = "", threshold = 0 } = options;
  const ref = useRef<T>(null);
  const [displayValue, setDisplayValue] = useState("0");
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasStarted) return;

        setHasStarted(true);
        observer.unobserve(el);

        const startTime = performance.now();

        function animate(currentTime: number) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * end);

          setDisplayValue(`${current}${suffix}`);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        }

        requestAnimationFrame(animate);
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, suffix, threshold, hasStarted]);

  return [ref, displayValue] as const;
}
