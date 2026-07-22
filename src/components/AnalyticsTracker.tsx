"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const VISITOR_KEY = "cx_vid";
const SESSION_KEY = "cx_sid";
const SESSION_TTL_MS = 30 * 60 * 1000;

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

function getOrCreate(key: string, prefix: string, ttlMs?: number) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw) as { id: string; at: number };
      if (!ttlMs || Date.now() - parsed.at < ttlMs) {
        if (ttlMs) {
          localStorage.setItem(key, JSON.stringify({ id: parsed.id, at: Date.now() }));
        }
        return parsed.id;
      }
    }
  } catch {
    /* ignore */
  }
  const id = uid(prefix);
  localStorage.setItem(key, JSON.stringify({ id, at: Date.now() }));
  return id;
}

function utmParams() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utmSource: p.get("utm_source") || undefined,
    utmMedium: p.get("utm_medium") || undefined,
    utmCampaign: p.get("utm_campaign") || undefined,
    utmTerm: p.get("utm_term") || undefined,
    utmContent: p.get("utm_content") || undefined,
  };
}

export function trackClientEvent(
  type: string,
  extra?: {
    label?: string;
    path?: string;
    meta?: Record<string, unknown>;
    durationMs?: number;
    scrollMax?: number;
  },
) {
  if (typeof window === "undefined") return;
  const visitorKey = getOrCreate(VISITOR_KEY, "v");
  const sessionKey = getOrCreate(SESSION_KEY, "s", SESSION_TTL_MS);
  const payload = {
    type,
    path: extra?.path || window.location.pathname + window.location.hash,
    title: document.title,
    label: extra?.label,
    referrer: document.referrer || undefined,
    durationMs: extra?.durationMs,
    scrollMax: extra?.scrollMax,
    visitorKey,
    sessionKey,
    screenSize: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    meta: extra?.meta,
    ...utmParams(),
  };

  const body = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/analytics/collect",
      new Blob([body], { type: "application/json" }),
    );
    return;
  }
  void fetch("/api/analytics/collect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  });
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const enteredAt = useRef(Date.now());
  const maxScroll = useRef(0);

  useEffect(() => {
    if (pathname?.startsWith("/admin") || pathname?.startsWith("/adminha")) {
      return;
    }

    enteredAt.current = Date.now();
    maxScroll.current = 0;
    trackClientEvent("PAGE_VIEW", { path: pathname || "/" });

    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      if (total <= 0) return;
      const pct = Math.min(100, Math.round((doc.scrollTop / total) * 100));
      if (pct > maxScroll.current) {
        maxScroll.current = pct;
        if ([25, 50, 75, 100].includes(pct)) {
          trackClientEvent("SCROLL_DEPTH", {
            path: pathname || "/",
            scrollMax: pct,
            label: `${pct}%`,
          });
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(
        "a,button,[data-track]",
      ) as HTMLElement | null;
      if (!target) return;

      const track = target.getAttribute("data-track");
      const href = target.getAttribute("href") || "";
      const label =
        track ||
        target.getAttribute("aria-label") ||
        target.textContent?.trim().slice(0, 80) ||
        href;

      if (track === "cta" || target.classList.contains("cta")) {
        trackClientEvent("CTA_CLICK", { label, path: pathname || "/" });
      } else if (href.includes("wa.me") || track === "whatsapp") {
        trackClientEvent("WHATSAPP_CLICK", { label, path: pathname || "/" });
      } else if (href.startsWith("tel:") || track === "phone") {
        trackClientEvent("PHONE_CLICK", { label, path: pathname || "/" });
      } else if (track === "service") {
        trackClientEvent("SERVICE_CLICK", { label, path: pathname || "/" });
      } else if (track === "portfolio") {
        trackClientEvent("PORTFOLIO_CLICK", { label, path: pathname || "/" });
      } else if (target.tagName === "A" && href.startsWith("#")) {
        trackClientEvent("NAV_CLICK", { label, path: pathname || "/" });
      } else if (target.tagName === "A" || target.tagName === "BUTTON") {
        trackClientEvent("CLICK", { label, path: pathname || "/" });
      }
    };

    const onUnload = () => {
      trackClientEvent("TIME_ON_PAGE", {
        path: pathname || "/",
        durationMs: Date.now() - enteredAt.current,
        scrollMax: maxScroll.current,
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    window.addEventListener("pagehide", onUnload);
    return () => {
      onUnload();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      window.removeEventListener("pagehide", onUnload);
    };
  }, [pathname]);

  return null;
}
