"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/design/utilities/cn";
import { indexCrossfade } from "@/design/motion";
import { exhibitionProjects } from "@/features/work/data";

type ExhibitionNavigationProps = {
  activeIndex: number;
  className?: string;
};

/**
 * ONE memorable interaction on /work:
 * A quiet sticky index (۰۱–۰۶) that morphs as each project
 * reaches the optical center — exhibition wayfinding, not a TOC widget.
 */
export function ExhibitionNavigation({
  activeIndex,
  className,
}: ExhibitionNavigationProps) {
  const prefersReducedMotion = useReducedMotion();
  const active = exhibitionProjects[activeIndex] ?? exhibitionProjects[0];

  return (
    <nav
      className={cn(
        "pointer-events-none fixed inset-y-0 end-0 z-40 hidden w-[4.5rem] lg:block",
        className,
      )}
      aria-label="فهرست نمایشگاه"
    >
      <div className="flex h-full flex-col items-center justify-center gap-[var(--space-3)]">
        {exhibitionProjects.map((project, i) => (
          <a
            key={project.id}
            href={`#${project.id}`}
            className={cn(
              "pointer-events-auto type-number transition-colors duration-base ease-out",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              i === activeIndex ? "text-accent" : "text-subtle hover:text-muted",
            )}
            aria-current={i === activeIndex ? "true" : undefined}
          >
            {project.number}
          </a>
        ))}
      </div>

      {/* Morphing watermark — the memorable cue */}
      <div
        className="pointer-events-none absolute bottom-[12vh] end-[var(--space-4)] select-none"
        aria-hidden
      >
        {prefersReducedMotion ? (
          <span className="block text-[4.5rem] font-bold leading-none text-ink/[0.05]">
            {active.number}
          </span>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={active.number}
              variants={indexCrossfade}
              initial="enter"
              animate="center"
              exit="exit"
              className="block text-[4.5rem] font-bold leading-none text-ink/[0.06]"
            >
              {active.number}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
    </nav>
  );
}
