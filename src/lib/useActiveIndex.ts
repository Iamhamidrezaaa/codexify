"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks which item in a list is closest to the vertical optical center.
 * Used for Services sticky index discovery.
 */
export function useActiveIndex(itemCount: number, enabled = true) {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!enabled || itemCount === 0) return;

    const elements = itemRefs.current.filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top + a.boundingClientRect.height / 2 - window.innerHeight / 2) -
              Math.abs(b.boundingClientRect.top + b.boundingClientRect.height / 2 - window.innerHeight / 2),
          );

        if (visible[0]?.target) {
          const index = elements.indexOf(visible[0].target as HTMLElement);
          if (index >= 0) setActiveIndex(index);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [itemCount, enabled]);

  const setItemRef = (index: number) => (el: HTMLElement | null) => {
    itemRefs.current[index] = el;
  };

  return { activeIndex, setItemRef };
}
