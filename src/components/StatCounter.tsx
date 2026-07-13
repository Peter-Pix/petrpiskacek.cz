"use client";

import { useCountUp } from "@/hooks/useCountUp";

type Props = {
  end: number;
  suffix?: string;
  label: string;
  description: string;
  className?: string;
};

/**
 * Animated statistic counter — counts up when scrolled into view.
 */
export default function StatCounter({
  end,
  suffix = "",
  label,
  description,
  className = "",
}: Props) {
  const [ref, displayValue] = useCountUp<HTMLDivElement>({ end, suffix });

  return (
    <div ref={ref} className={`glass rounded-xl p-5 ${className}`}>
      <p className="text-2xl font-bold text-gold sm:text-3xl">{displayValue}</p>
      <p className="mt-1 text-xs font-mono uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="mt-1 text-[0.8rem] text-zinc-400">{description}</p>
    </div>
  );
}
