"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  speed?: "slow" | "medium";
};

export function Marquee({ items, className, speed = "slow" }: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion();
  const duration = speed === "slow" ? "50s" : "30s";
  const repeated = [...items, ...items];

  return (
    <div
      className={cn("overflow-hidden border-y border-border", className)}
      aria-hidden={prefersReducedMotion ? undefined : true}
    >
      <div
        className={cn(
          "flex w-max items-center gap-12 py-5",
          !prefersReducedMotion && "animate-marquee",
        )}
        style={
          !prefersReducedMotion ? { animationDuration: duration } : undefined
        }
      >
        {repeated.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="font-mono text-caption uppercase tracking-widest text-muted whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
