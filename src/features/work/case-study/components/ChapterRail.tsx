"use client";

import { useEffect, useState } from "react";
import { cn } from "@/design/utilities/cn";
import type { PublicationChapter } from "../types";

type ChapterRailProps = {
  chapters: PublicationChapter[];
  className?: string;
};

/**
 * Subtle chapter index — jump links, current chapter highlighted.
 * Desktop only; does not compete with content.
 */
export function ChapterRail({ chapters, className }: ChapterRailProps) {
  const [active, setActive] = useState(chapters[0]?.id ?? "");

  useEffect(() => {
    const nodes = chapters
      .map((c) => document.getElementById(`chapter-${c.id}`))
      .filter(Boolean) as HTMLElement[];

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          );
        const id = visible[0]?.target.id.replace("chapter-", "");
        if (id) setActive(id);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [chapters]);

  return (
    <nav
      className={cn(
        "pointer-events-none fixed inset-y-0 start-0 z-30 hidden w-14 xl:block",
        className,
      )}
      aria-label="فصول مطالعه"
    >
      <ul className="flex h-full flex-col items-center justify-center gap-2">
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <a
              href={`#chapter-${chapter.id}`}
              className={cn(
                "pointer-events-auto type-number block px-1 py-0.5 transition-colors duration-base ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                active === chapter.id ? "text-accent" : "text-subtle hover:text-muted",
              )}
              aria-current={active === chapter.id ? "true" : undefined}
              title={chapter.title}
            >
              {chapter.index}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
