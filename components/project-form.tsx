"use client";

import { useState } from "react";
import { getT, type Language } from "@/lib/translations";
import { Check, CheckCircle2, ArrowRight, ArrowLeft, Send, AlertTriangle } from "lucide-react";

interface Props {
  lang: Language;
}

interface FormData {
  types: string[];
  description: string;
  hasCodebase: string;
  timeline: string;
  teamSize: string;
  name: string;
  email: string;
  whatsapp: string;
  source: string;
}

const TOTAL_STEPS = 4;

export function ProjectForm({ lang }: Props) {
  const t = getT(lang);
  const { fields, buttons, steps, success, error } = t.contact;

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [data, setData] = useState<FormData>({
    types: [],
    description: "",
    hasCodebase: "",
    timeline: "",
    teamSize: "",
    name: "",
    email: "",
    whatsapp: "",
    source: "",
  });

  const toggleType = (type: string) => {
    setData((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const canNext = (): boolean => {
    if (step === 1) return data.types.length > 0;
    if (step === 2) return data.description.trim().length > 20;
    if (step === 3) return data.hasCodebase !== "" && data.timeline !== "" && data.teamSize !== "";
    if (step === 4) return data.name.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    return false;
  };

  const handleSubmit = async () => {
    if (!canNext()) return;
    setSubmitting(true);
    setSubmitError(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ──
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 border border-accent/30 mb-6">
          <CheckCircle2 className="h-8 w-8 text-accent" />
        </div>
        <h2 className="font-display text-2xl font-bold text-ink">{success.title}</h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">{success.message}</p>
      </div>
    );
  }

  const progressPct = ((step - 1) / TOTAL_STEPS) * 100;

  return (
    <div className="mx-auto max-w-2xl w-full">
      {/* Progress bar */}
      <div className="mb-12">
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft/60 mb-4">
          <span>{step === 1 ? steps.projectType : step === 2 ? steps.description : step === 3 ? steps.context : steps.contact}</span>
          <span>{step} / {TOTAL_STEPS}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-line overflow-hidden">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${progressPct + 25}%` }}
          />
        </div>
      </div>

      {/* ── Step 1 : Type ── */}
      {step === 1 && (
        <div className="flex flex-col gap-3">
          {Object.entries(fields.types).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleType(key)}
              className={`flex items-center gap-4 rounded-xl border px-6 py-4.5 text-left text-base font-semibold transition-all duration-200 ${
                data.types.includes(key)
                  ? "border-accent bg-accent/5 text-ink"
                  : "border-line bg-paper-raised/40 text-ink-soft hover:border-accent/40 hover:text-ink"
              }`}
            >
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                data.types.includes(key) ? "border-accent bg-accent" : "border-line"
              }`}>
                {data.types.includes(key) && (
                  <Check className="h-4 w-4 text-white" />
                )}
              </div>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* ── Step 2 : Description ── */}
      {step === 2 && (
        <div className="flex flex-col gap-4">
          <label className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-ink-soft">
            {fields.descLabel}
          </label>
          <textarea
            value={data.description}
            onChange={(e) => setData((p) => ({ ...p, description: e.target.value }))}
            placeholder={fields.descPlaceholder}
            rows={7}
            className="w-full resize-none rounded-xl border border-line bg-paper-raised/40 px-5 py-4 text-base text-ink placeholder:text-ink-soft/40 outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20 transition duration-200"
          />
          <p className="font-mono text-[10px] text-ink-soft/50">
            {data.description.trim().length < 20
              ? lang === "fr" ? "Encore quelques mots..." : "A few more words..."
              : lang === "fr" ? "✓ Description suffisante" : "✓ Description looks good"}
          </p>
        </div>
      )}

      {/* ── Step 3 : Context ── */}
      {step === 3 && (
        <div className="flex flex-col gap-8">
          {/* Has codebase */}
          <div>
            <label className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-ink-soft block mb-3">
              {fields.codebaseLabel}
            </label>
            <div className="flex flex-col gap-2">
              {Object.entries(fields.codebaseOptions).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setData((p) => ({ ...p, hasCodebase: val }))}
                  className={`flex items-center gap-4 rounded-xl border px-6 py-4.5 text-left text-base font-semibold transition-all duration-200 ${
                    data.hasCodebase === val
                      ? "border-accent bg-accent/5 text-ink"
                      : "border-line bg-paper-raised/40 text-ink-soft hover:border-accent/40 hover:text-ink"
                  }`}
                >
                  <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    data.hasCodebase === val ? "border-accent" : "border-line"
                  }`}>
                    {data.hasCodebase === val && <div className="h-2.5 w-2.5 rounded-full bg-accent" />}
                  </div>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <label className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-ink-soft block mb-3">
              {fields.timelineLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.entries(fields.timelineOptions).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setData((p) => ({ ...p, timeline: val }))}
                  className={`rounded-xl border px-5 py-4 text-left text-sm font-semibold transition-all duration-200 ${
                    data.timeline === val
                      ? "border-accent bg-accent/5 text-ink"
                      : "border-line bg-paper-raised/40 text-ink-soft hover:border-accent/40 hover:text-ink"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Team size */}
          <div>
            <label className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-ink-soft block mb-3">
              {fields.teamLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.entries(fields.teamOptions).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setData((p) => ({ ...p, teamSize: val }))}
                  className={`rounded-xl border px-5 py-4 text-left text-sm font-semibold transition-all duration-200 ${
                    data.teamSize === val
                      ? "border-accent bg-accent/5 text-ink"
                      : "border-line bg-paper-raised/40 text-ink-soft hover:border-accent/40 hover:text-ink"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Step 4 : Contact ── */}
      {step === 4 && (
        <div className="flex flex-col gap-6">
          {[
            { key: "name" as const, label: fields.nameLabel, placeholder: fields.namePlaceholder, type: "text", required: true },
            { key: "email" as const, label: fields.emailLabel, placeholder: fields.emailPlaceholder, type: "email", required: true },
            { key: "whatsapp" as const, label: fields.whatsappLabel, placeholder: fields.whatsappPlaceholder, type: "tel", required: false },
            { key: "source" as const, label: fields.sourceLabel, placeholder: fields.sourcePlaceholder, type: "text", required: false },
          ].map((field) => (
            <div key={field.key}>
              <label className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-ink-soft block mb-2">
                {field.label}
                {!field.required && (
                  <span className="ml-2 font-normal normal-case text-ink-soft/40">(optionnel)</span>
                )}
              </label>
              <input
                type={field.type}
                value={data[field.key]}
                onChange={(e) => setData((p) => ({ ...p, [field.key]: e.target.value }))}
                placeholder={field.placeholder}
                className="w-full rounded-xl border border-line bg-paper-raised/40 px-5 py-4 text-base text-ink placeholder:text-ink-soft/40 outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20 transition duration-200"
              />
            </div>
          ))}

          {/* Error message */}
          {submitError && (
            <div className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-500/5 p-4 text-sm text-red-400">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">{error.title}</p>
                <p className="mt-1 text-xs">{error.message}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-12 flex items-center justify-between gap-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex items-center gap-2.5 rounded-full border border-line px-6 py-3.5 font-mono text-[11px] uppercase font-bold tracking-widest text-ink-soft hover:text-ink hover:border-ink-soft transition duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            {buttons.prev}
          </button>
        ) : (
          <div />
        )}

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            disabled={!canNext()}
            onClick={() => setStep((s) => s + 1)}
            className="inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 font-mono text-[11px] uppercase font-bold tracking-widest text-paper hover:bg-accent hover:text-white transition duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-[0.96] disabled:hover:scale-100"
          >
            {buttons.next}
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            disabled={!canNext() || submitting}
            onClick={handleSubmit}
            className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 font-mono text-[11px] uppercase font-bold tracking-widest text-white hover:bg-ink transition duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-[0.96] disabled:hover:scale-100"
          >
            {submitting ? buttons.submitting : buttons.submit}
            <Send className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
