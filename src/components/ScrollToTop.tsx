"use client";

import { useEffect, useState } from "react";
import type Lenis from "lenis";

/**
 * فقط روی اسلاید آخر (Contact): فلش بالا، پایین راست.
 * با کلیک → اسلاید اول و محو شدن.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");

    const measure = () => {
      if (!contact) {
        setVisible(false);
        return;
      }
      const vh = window.innerHeight;
      const top = contact.getBoundingClientRect().top;
      setVisible(top < vh * 0.55);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    const off = lenis?.on?.("scroll", measure);

    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      off?.();
    };
  }, []);

  const goTop = () => {
    setVisible(false);
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo("#top", { offset: 0, duration: 1.4 });
    } else {
      document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      aria-label="بازگشت به ابتدای صفحه"
      onClick={goTop}
      tabIndex={visible ? 0 : -1}
      className={`pointer-events-auto fixed bottom-6 right-5 z-[46] grid size-11 place-items-center rounded-full border border-white/35 bg-bg/80 text-white/70 backdrop-blur-sm transition-all duration-500 md:bottom-8 md:right-8 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      } hover:border-lime hover:text-lime`}
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <path
          d="M12 19V7M6 11l6-6 6 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
