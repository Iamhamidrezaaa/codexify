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
  const duration = speed === "slow" ? "55s" : "35s";
  const repeated = [...items, ...items];

  return (
    <div
      className={cn("overflow-hidden border-y border-border", className)}
      aria-hidden={prefersReducedMotion ? undefined : true}
    >
      <div
        className={cn(
          "flex w-max items-center gap-[var(--space-9)] py-[var(--space-5)]",
          !prefersReducedMotion && "animate-marquee",
        )}
        style={
          !prefersReducedMotion ? { animationDuration: duration } : undefined
        }
      >
        {repeated.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="type-overline whitespace-nowrap text-muted"
          >
            {item}
            <span className="mx-[var(--space-9)] text-accent" aria-hidden>
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
