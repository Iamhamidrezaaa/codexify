"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/design/utilities/cn";
import { Grid } from "@/components/layout/Grid";
import { ProjectTransition } from "@/features/work/components/ProjectTransition";
import { ProjectVisual } from "@/features/work/components/ProjectVisual";
import type { ExhibitionProject } from "@/features/work/types";

type ProjectPreviewProps = {
  project: ExhibitionProject;
  active?: boolean;
  setRef?: (el: HTMLElement | null) => void;
};

/**
 * One exhibition bay — nearly a full viewport.
 * Number · Name · Industry · Statement · Visual.
 * No buttons, badges, tags, or stacks.
 */
export function ProjectPreview({
  project,
  active = false,
  setRef,
}: ProjectPreviewProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <article
      id={project.id}
      ref={setRef}
      className="scroll-mt-24"
      aria-labelledby={`${project.id}-title`}
    >
      <ProjectTransition reveal={project.reveal}>
        <Link
          href={`/work/${project.slug}`}
          className={cn(
            "group/project block outline-none",
            "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas",
          )}
        >
          <Grid className="min-h-[88svh] items-center gap-y-[var(--space-8)] py-[clamp(4rem,12vh,8rem)] lg:min-h-[100svh] lg:gap-y-0">
            <div className="col-span-4 flex flex-col justify-center md:col-span-3 lg:col-span-4">
              <p className="type-number mb-[var(--space-5)]">{project.number}</p>
              <h2
                id={`${project.id}-title`}
                className={cn(
                  "type-heading text-ink transition-[font-weight,color] duration-500 ease-out",
                  !prefersReducedMotion &&
                    "group-hover/project:font-bold group-focus-visible/project:font-bold",
                )}
              >
                <span className="font-latin tracking-tight">{project.name}</span>
              </h2>
              <p className="type-overline mt-[var(--space-4)]">{project.industry}</p>
              <p className="type-body-lg mt-[var(--space-6)] max-w-[var(--measure-narrow)] text-muted">
                {project.statement}
              </p>
            </div>

            <div className="col-span-4 md:col-span-5 md:col-start-4 lg:col-span-7 lg:col-start-6">
              <div
                className={cn(
                  "overflow-hidden transition-opacity duration-700 ease-out",
                  active || prefersReducedMotion ? "opacity-100" : "opacity-55",
                )}
              >
                <ProjectVisual
                  project={project}
                  active={Boolean(active && !prefersReducedMotion)}
                />
              </div>
            </div>
          </Grid>
        </Link>
      </ProjectTransition>
    </article>
  );
}
