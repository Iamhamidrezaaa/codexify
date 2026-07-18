"use client";

import { useEffect, useState } from "react";

/**
 * Minimal custom cursor — hidden on coarse pointers / touch.
 */
export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(Boolean(t?.closest("a, button, [data-cursor='hover']")));
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-[width,height] duration-200 ${
          hover ? "h-10 w-10" : "h-3 w-3"
        }`}
      />
    </div>
  );
}
