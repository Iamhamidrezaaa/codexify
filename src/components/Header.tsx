"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, SITE, WHATSAPP_URL } from "@/lib/constants";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
        <div
          className={`pointer-events-auto mx-auto flex max-w-[1400px] items-center justify-between gap-3 rounded-full border px-3 py-2 transition-colors duration-300 md:px-4 ${
            scrolled
              ? "border-white/12 bg-black/75 backdrop-blur-xl"
              : "border-white/10 bg-[#111]/90 backdrop-blur-md"
          }`}
        >
          <a href="#top" className="flex shrink-0 items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-md bg-lime text-black">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 7h5.2c2.3 0 3.8 1.3 3.8 3.2 0 1.3-.7 2.3-1.9 2.8L16.8 17h-2.7l-3.2-3.6H8.5V17H6V7Zm2.5 2v2.8h2.4c1.1 0 1.7-.5 1.7-1.4S12 9 10.9 9H8.5Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-white">
              {SITE.name}
            </span>
          </a>

          {/* Bookmarks stay in the pill bar (Navbar Digital) — hamburger only on very small screens */}
          <nav
            className="hidden min-[720px]:flex items-center gap-4 lg:gap-7"
            aria-label="اصلی"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="whitespace-nowrap text-[12px] text-white/55 transition-colors duration-200 hover:text-lime lg:text-[13px]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-lime px-3.5 py-2 text-[13px] font-semibold text-lime-ink transition duration-200 hover:bg-white hover:text-lime-ink md:px-4"
            >
              ارتباط با ما
              <span aria-hidden>↗</span>
            </a>

            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-white/10 text-white min-[720px]:hidden"
              aria-label={open ? "بستن منو" : "باز کردن منو"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3.5 w-4">
                <span
                  className={`absolute inset-x-0 top-0 h-px bg-current transition ${open ? "top-1.5 rotate-45" : ""}`}
                />
                <span
                  className={`absolute inset-x-0 top-1.5 h-px bg-current transition ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute inset-x-0 top-3 h-px bg-current transition ${open ? "top-1.5 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 px-6 pt-24 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav className="flex flex-col gap-5">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-3xl font-semibold text-white transition-colors duration-200 hover:text-lime"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
