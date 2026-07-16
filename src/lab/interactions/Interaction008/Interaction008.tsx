"use client";

import { useRef } from "react";
import { cn } from "@/design/utilities/cn";

export type HorizontalGalleryProps = {
  items: { id: string; label: string; tone: string }[];
  className?: string;
};

/**
 * Interaction008 — Horizontal Gallery
 * Native overflow scroll + snap. Keyboard scrollable container.
 */
export function Interaction008({ items, className }: HorizontalGalleryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cn("relative", className)}>
      <div
        ref={scrollerRef}
        tabIndex={0}
        className="flex gap-[var(--space-4)] overflow-x-auto pb-[var(--space-4)] outline-none snap-x snap-mandatory scroll-smooth focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
        aria-label="گالری افقی"
        style={{ scrollbarWidth: "thin" }}
      >
        {items.map((item) => (
          <figure
            key={item.id}
            className="relative h-48 w-[min(70vw,20rem)] shrink-0 snap-start border border-border"
            style={{ backgroundColor: item.tone }}
          >
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between px-[var(--space-4)] py-[var(--space-3)] type-caption text-canvas mix-blend-difference">
              <span>{item.label}</span>
              <span className="font-latin">{item.id}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="type-caption mt-[var(--space-3)]">
        اسکرول افقی · Shift + چرخ · فوکوس با کیبورد
      </p>
    </div>
  );
}
