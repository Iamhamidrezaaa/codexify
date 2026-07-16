"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Grid } from "@/components/layout/Grid";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
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
        "fixed inset-x-0 top-0 z-50 transition-colors duration-400",
        scrolled || menuOpen
          ? "bg-canvas/90 backdrop-blur-sm"
          : "bg-transparent",
      )}
    >
      <Grid
        as="div"
        className="items-center py-6 md:py-8"
      >
        <div className="col-span-2 md:col-span-4 lg:col-span-6">
          <Link
            href="/"
            className="font-serif text-lg tracking-tight text-ink transition-opacity duration-400 hover:opacity-60"
            onClick={() => setMenuOpen(false)}
          >
            Codexify
          </Link>
        </div>

        <nav
          className="hidden items-center justify-end gap-10 md:col-span-4 md:flex lg:col-span-6"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative font-mono text-caption uppercase tracking-widest text-ink"
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-400 ease-premium group-hover:w-full"
                aria-hidden
              />
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="col-span-2 flex flex-col items-end justify-center gap-1.5 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={cn(
              "block h-px w-6 bg-ink transition-all duration-400 ease-premium",
              menuOpen && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-ink transition-all duration-400 ease-premium",
              menuOpen && "-translate-y-[3.5px] -rotate-45",
            )}
          />
        </button>
      </Grid>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 top-[72px] z-40 bg-canvas transition-opacity duration-400 md:hidden",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        <nav
          className="flex h-full flex-col justify-center gap-8 px-5"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-serif text-display-md text-ink"
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
