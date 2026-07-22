"use client";

import { useEffect, useId, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          language?: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
    onCodexifyTurnstileLoad?: () => void;
  }
}

const SCRIPT_ID = "cf-turnstile-script";
const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onCodexifyTurnstileLoad";

type Props = {
  onToken: (token: string) => void;
  onExpire?: () => void;
  resetSignal?: number;
};

export function TurnstileWidget({ onToken, onExpire, resetSignal = 0 }: Props) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
  const hostRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const onExpireRef = useRef(onExpire);
  const reactId = useId();

  onTokenRef.current = onToken;
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!siteKey || !hostRef.current) return;

    const render = () => {
      if (!hostRef.current || !window.turnstile) return;
      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* ignore */
        }
        widgetIdRef.current = null;
        hostRef.current.innerHTML = "";
      }

      widgetIdRef.current = window.turnstile.render(hostRef.current, {
        sitekey: siteKey,
        theme: "dark",
        language: "fa",
        callback: (token) => onTokenRef.current(token),
        "expired-callback": () => {
          onTokenRef.current("");
          onExpireRef.current?.();
        },
        "error-callback": () => {
          onTokenRef.current("");
        },
      });
    };

    window.onCodexifyTurnstileLoad = () => render();

    const existing = document.getElementById(SCRIPT_ID);
    if (existing && window.turnstile) {
      render();
    } else if (!existing) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else {
      // script loading
      window.onCodexifyTurnstileLoad = () => render();
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
  }, [siteKey, reactId]);

  useEffect(() => {
    if (!resetSignal || !widgetIdRef.current || !window.turnstile) return;
    try {
      window.turnstile.reset(widgetIdRef.current);
      onTokenRef.current("");
    } catch {
      /* ignore */
    }
  }, [resetSignal]);

  if (!siteKey) return null;

  return (
    <div className="mb-3 flex justify-center md:mb-4" dir="ltr">
      <div ref={hostRef} />
    </div>
  );
}
