"use client";

import { useCountUp } from "@/hooks/useCountUp";

type Props = {
  end: number;
  suffix?: string;
  label: string;
  description: string;
  className?: string;
};

export default function StatCounter({
  end,
  suffix = "",
  label,
  description,
  className = "",
}: Props) {
  const [ref, displayValue] = useCountUp<HTMLDivElement>({ end, suffix });

  return (
    <div ref={ref} className={`glass-card p-6 ${className}`}>
      <p className="text-3xl font-bold text-gold">{displayValue}</p>
      <p className="mt-2 text-xs font-mono uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{label}</p>
      <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>{description}</p>
    </div>
  );
}
