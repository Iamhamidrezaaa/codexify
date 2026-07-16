"use client";

import { useReducedMotion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/design/utilities/cn";

type MarqueeProps = {
  items: string[];
  className?: string;
  speed?: "slow" | "medium";
};

export function Marquee({ items, className, speed = "slow" }: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const duration = speed === "slow" ? "70s" : "45s";
  const track = [...items, ...items, ...items];

  return (
    <div
      className={cn("overflow-hidden border-y border-border", className)}
      role="presentation"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={cn(
          "flex w-max items-center py-[var(--space-6)] md:py-[var(--space-7)]",
          !prefersReducedMotion && "animate-marquee",
        )}
        style={
          !prefersReducedMotion
            ? {
                animationDuration: duration,
                animationPlayState: paused ? "paused" : "running",
              }
            : undefined
        }
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="type-overline flex shrink-0 items-center whitespace-nowrap text-muted"
          >
            <span className="px-[var(--space-6)] md:px-[var(--space-8)]">
              {item}
            </span>
            <span className="text-[0.5rem] text-border-strong" aria-hidden>
              ●
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
