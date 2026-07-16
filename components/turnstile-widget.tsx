"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          theme?: "auto" | "light" | "dark";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileWidgetProps {
  onTokenChange: (token: string) => void;
  resetSignal: number;
}

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function TurnstileWidget({ onTokenChange, resetSignal }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!siteKey || !scriptReady || !containerRef.current || widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile?.render(containerRef.current, {
      sitekey: siteKey,
      theme: "auto",
      callback: onTokenChange,
      "expired-callback": () => onTokenChange(""),
      "error-callback": () => onTokenChange(""),
    }) ?? null;

    return () => {
      if (widgetIdRef.current) {
        window.turnstile?.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [onTokenChange, scriptReady]);

  useEffect(() => {
    if (!widgetIdRef.current) return;
    onTokenChange("");
    window.turnstile?.reset(widgetIdRef.current);
  }, [onTokenChange, resetSignal]);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
      <div ref={containerRef} className="min-h-[65px]" />
    </>
  );
}
