import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";
import { hashIp } from "@/lib/crypto";

type GeoHit = { country?: string; city?: string } | null;

function lookupGeo(ip: string): GeoHit {
  try {
    // Lazy require keeps geoip data files out of the Turbopack graph.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const geoip = require("geoip-lite") as {
      lookup: (ip: string) => GeoHit;
    };
    return geoip.lookup(ip);
  } catch {
    return null;
  }
}

export async function getRequestContext() {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    h.get("cf-connecting-ip") ||
    "0.0.0.0";
  const userAgent = h.get("user-agent") || "";
  const referrer = h.get("referer") || h.get("referrer") || "";
  const countryHeader = h.get("cf-ipcountry") || h.get("x-vercel-ip-country");
  const cityHeader = h.get("x-vercel-ip-city");
  const geo = lookupGeo(ip);
  const parsed = UAParser(userAgent);
  const browser = parsed.browser;
  const os = parsed.os;
  const device = parsed.device;

  const deviceType =
    device.type ||
    (/(tablet|ipad)/i.test(userAgent)
      ? "tablet"
      : /(mobi|iphone|android)/i.test(userAgent)
        ? "mobile"
        : "desktop");

  return {
    ip,
    ipHash: hashIp(ip),
    userAgent,
    referrer,
    country:
      countryHeader && countryHeader !== "XX"
        ? countryHeader
        : geo?.country || null,
    city: cityHeader || geo?.city || null,
    browser: [browser.name, browser.version].filter(Boolean).join(" ") || null,
    os: [os.name, os.version].filter(Boolean).join(" ") || null,
    device: deviceType,
  };
}
