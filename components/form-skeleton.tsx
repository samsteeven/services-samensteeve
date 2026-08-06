"use client";

import { Loader2 } from "lucide-react";
import { getT, type Language } from "@/lib/i18n";

interface FormSkeletonProps {
  lang: Language;
}

export function FormSkeleton({ lang }: FormSkeletonProps) {
  const t = getT(lang);
  const loadingText = t.contact.recapLabels.loading;

  return (
    <div className="mx-auto max-w-3xl w-full animate-in fade-in duration-300 select-none">
      {/* Top Stepper Skeleton */}
      <div className="mb-10">
        {/* Circles & lines */}
        <div className="flex items-center">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-mono text-[10px] font-bold text-accent ${i === 0 ? "ring-2 ring-accent/30" : "opacity-40"}`}>
                {i + 1}
              </div>
              {i < 5 && (
                <div className="flex-1 mx-2 h-px bg-line/30" />
              )}
            </div>
          ))}
        </div>

        {/* Labels below */}
        <div className="mt-4 flex items-center justify-between">
          <div className="h-3.5 w-32 rounded-md bg-line/30 animate-pulse" />
          <div className="h-3.5 w-12 rounded-md bg-line/30 animate-pulse" />
        </div>

        {/* Progress line */}
        <div className="mt-2 h-0.5 w-full rounded-full bg-line/20 overflow-hidden">
          <div className="h-full w-1/6 rounded-full bg-accent/60 animate-pulse" />
        </div>
      </div>

      {/* Title & Subtitle Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-3/4 max-w-md rounded-xl bg-line/30 animate-pulse mb-3" />
        <div className="h-4 w-1/2 max-w-xs rounded-lg bg-line/20 animate-pulse" />
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-line/40 bg-paper-raised/20 p-5 flex items-start gap-4"
          >
            <div className="h-10 w-10 shrink-0 rounded-xl bg-accent/10 border border-accent/20 animate-pulse" />
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="h-4 w-3/4 rounded-md bg-line/30 animate-pulse mb-2.5" />
              <div className="h-3 w-full rounded-md bg-line/15 animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Bar Skeleton & Center Loader */}
      <div className="pt-6 border-t border-line/40 flex items-center justify-between gap-4">
        <div className="h-11 w-28 rounded-xl bg-line/20 animate-pulse" />

        {/* Badge & Loader indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-line/40 bg-paper-raised/40 backdrop-blur-sm">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-soft">
            {loadingText}
          </span>
        </div>

        <div className="h-11 w-36 rounded-xl bg-accent/20 border border-accent/30 animate-pulse" />
      </div>
    </div>
  );
}
