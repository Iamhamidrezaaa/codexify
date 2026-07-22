"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement | string,
        options: Record<string, unknown>,
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
      ready: (cb: () => void) => void;
    };
  }
}

type Props = {
  siteKey: string;
  onToken: (token: string) => void;
  onExpire?: () => void;
  resetSignal?: number;
};

export function TurnstileWidget({
  siteKey,
  onToken,
  onExpire,
  resetSignal = 0,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const onExpireRef = useRef(onExpire);
  const [scriptReady, setScriptReady] = useState(false);
  const [failed, setFailed] = useState(false);

  onTokenRef.current = onToken;
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!siteKey || !scriptReady || !hostRef.current || !window.turnstile) {
      return;
    }

    const el = hostRef.current;

    try {
      if (widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
      el.innerHTML = "";

      widgetIdRef.current = window.turnstile.render(el, {
        sitekey: siteKey,
        theme: "dark",
        language: "fa",
        size: "normal",
        callback: (token: string) => onTokenRef.current(token),
        "expired-callback": () => {
          onTokenRef.current("");
          onExpireRef.current?.();
        },
        "error-callback": () => {
          onTokenRef.current("");
          setFailed(true);
        },
      });
      setFailed(false);
    } catch (error) {
      console.error("[turnstile] render failed", error);
      setFailed(true);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* ignore */
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, scriptReady]);

  useEffect(() => {
    if (!resetSignal || !widgetIdRef.current || !window.turnstile) return;
    try {
      window.turnstile.reset(widgetIdRef.current);
      onTokenRef.current("");
      setFailed(false);
    } catch {
      /* ignore */
    }
  }, [resetSignal]);

  if (!siteKey) return null;

  return (
    <div className="mb-3 md:mb-4" dir="ltr">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onError={() => setFailed(true)}
      />
      <div className="flex min-h-[65px] justify-center">
        <div ref={hostRef} className="cf-turnstile" />
      </div>
      {failed ? (
        <p className="mt-2 text-center text-xs text-red-300">
          بارگذاری تأیید امنیتی ناموفق بود. VPN/ادبلاکر را خاموش کنید یا CSP
          nginx را برای challenges.cloudflare.com باز کنید.
        </p>
      ) : null}
    </div>
  );
}
