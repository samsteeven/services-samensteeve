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
          appearance?: "always" | "execute" | "interaction-only";
          execution?: "render" | "execute";
          retry?: "auto" | "never";
          "retry-interval"?: number;
          "refresh-expired"?: "auto" | "manual" | "never";
          "refresh-timeout"?: "auto" | "manual" | "never";
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
const MAX_SCRIPT_RETRIES = 3;
const RETRY_DELAY_MS = 1500;

export function TurnstileWidget({ onTokenChange, resetSignal }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [scriptAttempt, setScriptAttempt] = useState(0);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    return () => {
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!siteKey || !scriptReady || !containerRef.current || widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile?.render(containerRef.current, {
      sitekey: siteKey,
      theme: "auto",
      appearance: "always",
      execution: "render",
      retry: "auto",
      "retry-interval": 8000,
      "refresh-expired": "auto",
      "refresh-timeout": "auto",
      callback: (token) => {
        setLoadFailed(false);
        onTokenChange(token);
      },
      "expired-callback": () => {
        onTokenChange("");
      },
      "error-callback": () => {
        onTokenChange("");
        setLoadFailed(true);
      },
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
    setLoadFailed(false);
    onTokenChange("");
    window.turnstile?.reset(widgetIdRef.current);
  }, [onTokenChange, resetSignal]);

  if (!siteKey) return null;

  return (
    <>
      <Script
        key={scriptAttempt}
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => {
          setLoadFailed(false);
          setScriptReady(true);
        }}
        onError={() => {
          setScriptReady(false);
          onTokenChange("");
          if (scriptAttempt >= MAX_SCRIPT_RETRIES) {
            setLoadFailed(true);
            return;
          }
          retryTimerRef.current = setTimeout(() => {
            setScriptAttempt((attempt) => attempt + 1);
          }, RETRY_DELAY_MS);
        }}
      />
      <div ref={containerRef} className="min-h-[65px]" />
      {loadFailed && (
        <div className="mt-2 max-w-sm rounded-xl border border-red-400/30 bg-red-500/5 p-3 text-xs text-red-400">
          <p className="font-semibold">La vérification anti-bot n'a pas pu se charger.</p>
          <button
            type="button"
            onClick={() => {
              setLoadFailed(false);
              onTokenChange("");
              if (widgetIdRef.current) {
                window.turnstile?.reset(widgetIdRef.current);
                return;
              }
              setScriptReady(false);
              setScriptAttempt((attempt) => attempt + 1);
            }}
            className="mt-2 font-mono text-[10px] font-bold uppercase tracking-widest text-red-400 underline underline-offset-4"
          >
            Réessayer la vérification
          </button>
        </div>
      )}
    </>
  );
}
