"use client";

import { Check, CalendarDays } from "lucide-react";
import { CAL_URL } from "@/lib/constants";
import type { StepProps } from "./types";

export function StepService({ form, t, getContactTypeIcon }: StepProps) {
  const { fields } = t.contact;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-3 sm:grid-cols-2">
        {Object.entries(fields.types).map(([key, label]) => {
          const Icon = getContactTypeIcon(key);
          const isSelected = form.data.types.includes(key);
          const description = fields.typesDesc[key as keyof typeof fields.typesDesc];
          return (
            <button
              key={key}
              type="button"
              onClick={() => form.toggleType(key)}
              className={`group flex items-start gap-4 rounded-2xl border px-5 py-4.5 text-left transition-all duration-200 ${
                isSelected
                  ? "border-accent bg-accent/5 shadow-sm shadow-accent/5"
                  : "border-line bg-paper-raised/15 hover:border-accent/40 hover:bg-paper-raised/30"
              }`}
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                isSelected ? "bg-accent text-white" : "bg-paper-raised text-ink-soft group-hover:bg-accent/10 group-hover:text-accent"
              }`}>
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-bold transition-colors ${isSelected ? "text-ink" : "text-ink-soft group-hover:text-ink"}`}>
                  {label}
                </div>
                <div className="mt-1 text-xs text-ink-soft leading-relaxed font-normal">
                  {description}
                </div>
              </div>
              <div className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition-all duration-200 ${
                isSelected ? "border-accent bg-accent text-white scale-105" : "border-line bg-transparent"
              }`}>
                {isSelected && <Check className="h-3 w-3" />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-line bg-paper-raised/10 p-4 sm:flex sm:items-center sm:justify-between sm:gap-5">
        <div>
          <p className="text-sm font-bold text-ink">{t.contact.quickCall.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">
            {t.contact.quickCall.message}
          </p>
        </div>
        <a
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-line px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft transition hover:border-accent/40 hover:text-accent active:scale-[0.96] sm:mt-0"
        >
          <CalendarDays className="h-3.5 w-3.5" />
          {t.contact.quickCall.cta}
        </a>
      </div>
    </div>
  );
}
