"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none absolute inset-x-0 top-0 z-40 px-4 pt-5 md:px-8">
        <div className="pointer-events-auto mx-auto flex h-14 max-w-[1360px] items-center justify-between rounded-full border border-line/80 bg-[#101110]/[0.92] px-3 backdrop-blur-md md:h-16 md:px-5">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-[10px] bg-lime text-lime-ink">
              <span className="text-sm font-extrabold leading-none">C</span>
            </span>
            <span className="text-[17px] font-bold tracking-tight text-fg">
              Codexify
            </span>
          </a>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-lime px-4 py-2.5 text-sm font-bold text-lime-ink transition hover:brightness-110 md:px-5"
            >
              ارتباط با ما
            </a>
            <button
              type="button"
              aria-label={open ? "بستن منو" : "باز کردن منو"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-full border border-white/25 text-fg"
            >
              <span className="flex w-4 flex-col gap-1.5">
                <span
                  className={`h-px w-full bg-fg transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
                />
                <span
                  className={`h-px w-full bg-fg transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <nav className="fixed inset-0 z-50 flex flex-col bg-bg/95 px-8 pt-28 backdrop-blur-xl">
          <button
            type="button"
            className="absolute left-6 top-7 text-sm text-muted"
            onClick={() => setOpen(false)}
          >
            بستن
          </button>
          <ul className="flex flex-col gap-6 text-right">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-4xl font-extrabold tracking-tight text-fg transition hover:text-lime md:text-5xl"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
