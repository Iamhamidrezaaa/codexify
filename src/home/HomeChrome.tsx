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
    const onScroll = () => setSolid(window.scrollY > 48);
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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,opacity] duration-500",
        solid
          ? "border-b border-ink/10 bg-[#F7F6F2]/95 opacity-100"
          : "border-b border-transparent bg-transparent opacity-40 hover:opacity-90",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[96rem] items-center justify-between px-[var(--margin-mobile)] py-5 md:px-[var(--margin-desktop)] md:py-6",
          !solid && "mix-blend-difference",
        )}
      >
        <Link
          href="/"
          className={cn("type-wordmark", solid ? "text-ink" : "text-white")}
          aria-current="page"
          onClick={() => setOpen(false)}
        >
          کدکسیفای
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex lg:gap-10"
          aria-label="منوی اصلی"
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "type-nav transition-opacity hover:opacity-60",
                solid ? "text-ink" : "text-white",
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
              solid ? "bg-ink" : "bg-white",
              open && "translate-y-[3px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px w-5 transition-transform",
              solid ? "bg-ink" : "bg-white",
              open && "-translate-y-[3px] -rotate-45",
            )}
          />
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 top-[3.5rem] bg-[#F7F6F2] transition-opacity md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <nav
          className="flex h-full flex-col justify-center gap-8 px-[var(--margin-mobile)]"
          aria-label="منوی موبایل"
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="type-heading text-ink"
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
