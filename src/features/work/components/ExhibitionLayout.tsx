"use client";

import { useReducedMotion } from "framer-motion";
import { ExhibitionNavigation } from "@/features/work/components/ExhibitionNavigation";
import { ProjectPreview } from "@/features/work/components/ProjectPreview";
import { exhibitionProjects } from "@/features/work/data";
import { useActiveIndex } from "@/lib/useActiveIndex";

type ExhibitionLayoutProps = {
  intro: React.ReactNode;
};

/**
 * Exhibition shell — stacked full-viewport bays + sticky index.
 * Scroll is the primary navigation.
 */
export function ExhibitionLayout({ intro }: ExhibitionLayoutProps) {
  const prefersReducedMotion = useReducedMotion();
  const { activeIndex, setItemRef } = useActiveIndex(
    exhibitionProjects.length,
    !prefersReducedMotion,
  );

  return (
    <div className="relative">
      <ExhibitionNavigation activeIndex={activeIndex} />

      <div className="border-b border-border">{intro}</div>

      <div>
        {exhibitionProjects.map((project, i) => (
          <ProjectPreview
            key={project.id}
            project={project}
            active={prefersReducedMotion || i === activeIndex}
            setRef={setItemRef(i)}
          />
        ))}
      </div>
    </div>
  );
}
