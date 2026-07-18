"use client";

import { Plus, X } from "lucide-react";
import type { StepProps } from "./types";

export function StepDetails({ form, t, getContactTypeIcon }: StepProps) {
  const { fields } = t.contact;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4">
        {form.data.types.map((type) => {
          const Icon = getContactTypeIcon(type);
          const config = fields.serviceContext[type as keyof typeof fields.serviceContext];
          const label = fields.types[type as keyof typeof fields.types];
          const value = form.data.serviceDetails[type] ?? "";

          return (
            <div key={type} className="rounded-2xl border border-line bg-paper-raised/15 p-4">
              <div className="mb-3 flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/5 text-accent">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-ink">{config?.title ?? label}</p>
                  {config?.prompts && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {config.prompts.map((prompt) => (
                        <span key={prompt} className="rounded-full border border-line/70 bg-paper/40 px-2 py-1 font-mono text-[9px] text-ink-soft">
                          {prompt}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <textarea
                value={value}
                onChange={(e) => form.updateServiceDetail(type, e.target.value)}
                placeholder={config?.placeholder}
                rows={4}
                className="min-h-[130px] w-full resize-y rounded-xl border border-line bg-paper-raised/20 px-4 py-3 text-sm leading-relaxed text-ink placeholder:text-ink-soft/35 outline-none transition duration-200 focus:border-accent/40 focus:bg-paper-raised/30 focus:ring-2 focus:ring-accent/5"
              />
              <p className="mt-2 text-right font-mono text-[10px] text-ink-soft/35">
                {value.trim().length > 0
                  ? t.contact.recapLabels.detailAdded
                  : t.contact.recapLabels.optional}
              </p>
            </div>
          );
        })}
      </div>

      <div>
        <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft block mb-2">
          {fields.linksLabel}
        </label>
        <div className="flex flex-col gap-2">
          {form.data.links.map((link, idx) => (
            <div key={idx} className="relative flex items-center gap-2">
              <input
                type="url"
                value={link}
                onChange={(e) => {
                  const newLinks = [...form.data.links];
                  newLinks[idx] = e.target.value;
                  form.updateField("links", newLinks);
                }}
                placeholder="https://..."
                className="w-full rounded-xl border border-line bg-paper-raised/20 px-4 py-2.5 text-xs text-ink placeholder:text-ink-soft/30 outline-none focus:border-accent/40 focus:bg-paper-raised/30 focus:ring-2 focus:ring-accent/5 transition duration-200"
              />
              {form.data.links.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const newLinks = form.data.links.filter((_, i) => i !== idx);
                    form.updateField("links", newLinks);
                  }}
                  className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-paper-raised/20 text-ink-soft/40 hover:border-red-400/40 hover:text-red-400 hover:bg-red-400/5 transition duration-200"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              form.updateField("links", [...form.data.links, ""]);
            }}
            className="mt-1 self-start font-mono text-[10px] text-accent hover:underline flex items-center gap-1"
          >
            <Plus className="h-3.5 w-3.5" />
            {fields.addLink}
          </button>
        </div>
      </div>
    </div>
  );
}
