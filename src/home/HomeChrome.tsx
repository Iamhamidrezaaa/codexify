"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/design/utilities/cn";

const LINKS = [
  { href: "/work", label: "آثار" },
  { href: "/process", label: "فرآیند" },
  { href: "/studio", label: "استودیو" },
  { href: "mailto:hello@codexify.studio", label: "تماس" },
] as const;

export function HomeChrome() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 64);
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
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto flex max-w-[96rem] items-start justify-between px-[var(--margin-mobile)] pt-6 transition-all duration-500 md:px-[var(--margin-desktop)] md:pt-8",
          solid
            ? "border-b border-ink/8 bg-[#F7F6F2]/90 py-4 pt-4 backdrop-blur-sm"
            : "mix-blend-difference",
        )}
      >
        <Link
          href="/"
          className={cn(
            "type-wordmark transition-opacity duration-300",
            solid ? "text-ink opacity-100" : "text-white opacity-50 hover:opacity-100",
          )}
          aria-current="page"
          onClick={() => setOpen(false)}
        >
          کدکسیفای
        </Link>

        <nav
          className="hidden flex-col items-end gap-3 md:flex"
          aria-label="منوی اصلی"
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[0.68rem] tracking-[0.12em] transition-opacity hover:opacity-50",
                solid ? "text-ink" : "text-white opacity-50 hover:opacity-100",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex flex-col gap-[5px] md:hidden"
          aria-expanded={open}
          aria-label={open ? "بستن منو" : "باز کردن منو"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={cn(
              "block h-px w-5 transition-transform",
              solid ? "bg-ink" : "bg-white opacity-60",
              open && "translate-y-[3px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px w-5 transition-transform",
              solid ? "bg-ink" : "bg-white opacity-60",
              open && "-translate-y-[3px] -rotate-45",
            )}
          />
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 top-0 z-40 bg-[#F4F1EA] transition-opacity md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <nav
          className="flex h-full flex-col justify-center gap-10 px-[var(--margin-mobile)]"
          aria-label="منوی موبایل"
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-3xl font-semibold text-ink"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
