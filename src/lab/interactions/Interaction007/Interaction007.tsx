"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/design/utilities/cn";

export type StickyStoryProps = {
  chapters: { title: string; body: string }[];
  className?: string;
};

/**
 * Interaction007 — Sticky Story Section
 * Left (RTL start) sticky title column; chapters scroll beside it.
 */
export function Interaction007({ chapters, className }: StickyStoryProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "grid gap-[var(--space-8)] md:grid-cols-12 md:gap-[var(--space-6)]",
        className,
      )}
    >
      <div className="md:col-span-4">
        <div
          className={cn(
            "border-b border-border pb-[var(--space-4)] md:border-b-0 md:pb-0",
            !prefersReducedMotion && "md:sticky md:top-[28vh]",
          )}
        >
          <p className="type-overline mb-[var(--space-3)]">داستان</p>
          <p className="type-title text-ink">اسکرول، روایت است.</p>
        </div>
      </div>

      <div className="flex flex-col gap-[min(40vh,16rem)] md:col-span-7 md:col-start-6">
        {chapters.map((chapter, i) => (
          <article
            key={chapter.title}
            className="max-w-[var(--measure)] border-t border-border pt-[var(--space-6)]"
          >
            <p className="type-number mb-[var(--space-3)]">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="type-title mb-[var(--space-4)] text-ink">
              {chapter.title}
            </h3>
            <p className="type-body-lg text-muted">{chapter.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
