"use client";

import { useEffect, useState } from "react";

type HintMode = "keep" | "arrow" | "hidden";

/**
 * اسلاید ۱ (Hero): مخفی
 * اسلاید ۲ (#scene): [Keep Scrolling]
 * اسلاید ۳ به بعد: فقط فلش پایین — تا قبل از Contact
 */
export function ScrollHint() {
  const [mode, setMode] = useState<HintMode>("hidden");

  useEffect(() => {
    const contact = document.getElementById("contact");
    const story = document.getElementById("scene");
    const services = document.getElementById("services");

    const measure = () => {
      const vh = window.innerHeight;
      const nearContact = contact
        ? contact.getBoundingClientRect().top < vh * 0.72
        : false;
      if (nearContact) {
        setMode("hidden");
        return;
      }

      const servicesTop = services?.getBoundingClientRect().top ?? Infinity;
      if (servicesTop < vh * 0.55) {
        setMode("arrow");
        return;
      }

      const storyTop = story?.getBoundingClientRect().top ?? Infinity;
      /* از لحظهٔ ورود اسلاید ۲ */
      if (storyTop < vh * 0.85) {
        setMode("keep");
        return;
      }

      setMode("hidden");
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    const lenis = (
      window as Window & {
        __lenis?: { on: (e: string, cb: () => void) => () => void };
      }
    ).__lenis;
    const off = lenis?.on?.("scroll", measure);

    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      off?.();
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed bottom-2.5 left-1/2 z-[45] -translate-x-1/2 transition-opacity duration-500 ${
        mode === "hidden" ? "opacity-0" : "opacity-100"
      }`}
    >
      {mode === "keep" ? (
        <p className="scroll-hint-keep font-mono text-[11px] tracking-[0.16em] text-white/50 uppercase">
          [ Keep Scrolling ]
        </p>
      ) : mode === "arrow" ? (
        <svg
          className="scroll-hint-arrow h-5 w-5 text-white/50"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M12 5v12M6 13l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </div>
  );
}
