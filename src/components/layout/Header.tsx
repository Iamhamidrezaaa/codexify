"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Grid } from "@/components/layout/Grid";

const NAV_LINKS = [
  { href: "/work", label: "آثار" },
  { href: "/studio", label: "استودیو" },
  { href: "/contact", label: "تماس" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[var(--z-header)] transition-colors duration-base ease-out",
        scrolled || menuOpen ? "bg-canvas/92" : "bg-transparent",
      )}
    >
      <Grid as="div" className="items-center py-[var(--space-5)] md:py-[var(--space-6)]">
        <div className="col-span-2 md:col-span-3 lg:col-span-4">
          <Link
            href="/"
            className="type-title text-[1.125rem] font-semibold text-ink transition-opacity duration-base ease-out hover:opacity-[var(--opacity-hover)]"
            onClick={() => setMenuOpen(false)}
          >
            کدکسیفای
          </Link>
        </div>

        <nav
          className="hidden items-center justify-end gap-[var(--space-8)] md:col-span-5 md:flex lg:col-span-8"
          aria-label="منوی اصلی"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative type-nav text-ink"
            >
              {link.label}
              <span
                className="absolute -bottom-1 inset-inline-start-0 h-px w-0 bg-accent transition-all duration-base ease-out group-hover:w-full"
                aria-hidden
              />
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="col-span-2 flex flex-col items-start justify-center gap-1.5 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={cn(
              "block h-px w-6 bg-ink transition-all duration-base ease-out",
              menuOpen && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-ink transition-all duration-base ease-out",
              menuOpen && "-translate-y-[3.5px] -rotate-45",
            )}
          />
        </button>
      </Grid>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 top-[72px] z-[var(--z-overlay)] bg-canvas transition-opacity duration-base ease-out md:hidden",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        <nav
          className="flex h-full flex-col justify-center gap-[var(--space-6)] px-[var(--margin-mobile)]"
          aria-label="منوی موبایل"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="type-heading text-ink"
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
