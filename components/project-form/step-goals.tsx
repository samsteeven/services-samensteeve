"use client";

import { Check } from "lucide-react";
import type { StepProps } from "./types";

export function StepGoals({ form, t, getContactTypeIcon }: StepProps) {
  const { fields } = t.contact;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft block mb-3.5">
          {fields.goalsLabel}
        </label>
        <div className="grid gap-4">
          {form.data.types.map((type) => {
            const Icon = getContactTypeIcon(type);
            const group = fields.serviceGoals[type as keyof typeof fields.serviceGoals];
            if (!group) return null;

            return (
              <div key={type} className="rounded-2xl border border-line bg-paper-raised/15 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
                  <Icon className="h-4 w-4 text-accent" />
                  {group.title}
                </div>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {Object.entries(group.options).map(([key, label]) => {
                    const isSelected = form.data.goals.includes(key);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => form.toggleGoal(key)}
                        className={`group flex items-start gap-3 rounded-xl border p-3.5 text-left text-xs font-semibold leading-relaxed transition-all duration-200 ${
                          isSelected
                            ? "border-accent bg-accent/5 text-ink"
                            : "border-line bg-paper-raised/15 text-ink-soft hover:border-accent/40 hover:text-ink hover:bg-paper-raised/30"
                        }`}
                      >
                        <div className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition-all ${
                          isSelected ? "border-accent bg-accent text-white scale-105" : "border-line bg-transparent"
                        }`}>
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                        <span className="flex-1">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft block mb-3.5">
          {fields.budgetLabel}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(fields.budgetOptions).map(([key, label]) => {
            const isSelected = form.data.budget === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => form.updateField("budget", key)}
                className={`rounded-xl border px-3 py-3 text-center text-xs font-bold transition-all duration-200 ${
                  isSelected
                    ? "border-accent bg-accent/5 text-accent shadow-sm"
                    : "border-line bg-paper-raised/15 text-ink-soft hover:border-accent/40 hover:text-ink hover:bg-paper-raised/30"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft block mb-3.5">
          {fields.timelineLabel}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(fields.timelineOptions).map(([key, label]) => {
            const isSelected = form.data.timeline === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => form.updateField("timeline", key)}
                className={`rounded-xl border px-4 py-3 text-left text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? "border-accent bg-accent/5 text-ink"
                    : "border-line bg-paper-raised/15 text-ink-soft hover:border-accent/40 hover:text-ink hover:bg-paper-raised/30"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
