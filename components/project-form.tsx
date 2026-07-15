"use client";

import { getT, type Language } from "@/lib/translations";
import {
  Check,
  CheckCircle2,
  ArrowLeft,
  Send,
  AlertTriangle,
  User,
  Mail,
  Phone,
  Search,
  ChevronRight,
} from "lucide-react";
import { getContactTypeIcon } from "@/lib/services";
import { useProjectForm } from "./use-project-form";

interface Props {
  lang: Language;
}

const TOTAL_STEPS = 4;

export function ProjectForm({ lang }: Props) {
  const t = getT(lang);
  const { fields, buttons, steps, success, error } = t.contact;
  const form = useProjectForm(lang);

  if (form.submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-accent/30 bg-accent/10 mb-8">
          <CheckCircle2 className="h-9 w-9 text-accent" />
          <span className="absolute inset-0 rounded-full animate-ping bg-accent/10" />
        </div>
        <h2 className="font-display text-2xl font-bold text-ink">{success.title}</h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">{success.message}</p>
      </div>
    );
  }

  const stepLabels = [steps.projectType, steps.description, steps.context, steps.contact];

  return (
    <div className="mx-auto max-w-2xl w-full">

      {/* Step Indicator */}
      <div className="mb-10">
        <div className="flex items-center">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const num = i + 1;
            const isDone = num < form.step;
            const isActive = num === form.step;
            return (
              <div key={num} className="flex items-center flex-1 last:flex-none">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[12px] font-bold transition-all duration-300 ${
                  isDone
                    ? "border-accent bg-accent text-white"
                    : isActive
                      ? "border-accent text-accent bg-accent/8"
                      : "border-line/50 text-ink-soft/30 bg-transparent"
                }`}>
                  {isDone ? <Check className="h-3.5 w-3.5" /> : num}
                </div>
                {i < TOTAL_STEPS - 1 && (
                  <div className="flex-1 mx-2 h-px bg-line/40 relative overflow-hidden">
                    {isDone && (
                      <div className="absolute inset-0 bg-accent/60 transition-all duration-500" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
            {stepLabels[form.step - 1]}
          </span>
          <span className="font-mono text-[10px] text-ink-soft/40 tabular-nums">
            {form.step} / {TOTAL_STEPS}
          </span>
        </div>

        <div className="h-1 w-full rounded-full bg-line/40 overflow-hidden">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${(form.step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Service Type */}
      {form.step === 1 && (
        <div className="flex flex-col gap-3">
          <p className="mb-2 font-mono text-[11px] text-ink-soft/60 uppercase tracking-widest">
            {lang === "fr" ? "Sélection multiple possible" : "Multiple selection allowed"}
          </p>
          {Object.entries(fields.types).map(([key, label]) => {
            const Icon = getContactTypeIcon(key as "web" | "cloud" | "security" | "ai" | "other");
            const isSelected = form.data.types.includes(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => form.toggleType(key)}
                className={`group flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-accent bg-accent/5 shadow-sm shadow-accent/10"
                    : "border-line bg-paper-raised/30 hover:border-accent/40 hover:bg-paper-raised/60"
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
                  isSelected ? "bg-accent text-white" : "bg-paper-raised text-ink-soft group-hover:bg-accent/10 group-hover:text-accent"
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`flex-1 text-sm font-semibold transition-colors ${
                  isSelected ? "text-ink" : "text-ink-soft group-hover:text-ink"
                }`}>
                  {label}
                </span>
                <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all duration-200 ${
                  isSelected ? "border-accent bg-accent scale-110" : "border-line bg-transparent"
                }`}>
                  {isSelected && <Check className="h-3 w-3 text-white" />}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Step 2: Description */}
      {form.step === 2 && (
        <div className="flex flex-col gap-4">
          <label className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-soft">
            {fields.descLabel}
          </label>
          <div className="relative">
            <textarea
              value={form.data.description}
              onChange={(e) => form.updateField("description", e.target.value)}
              placeholder={fields.descPlaceholder}
              rows={8}
              className="w-full resize-none rounded-2xl border border-line bg-paper-raised/30 px-5 py-4 text-sm leading-relaxed text-ink placeholder:text-ink-soft/35 outline-none focus:border-accent/50 focus:bg-paper-raised/60 focus:ring-2 focus:ring-accent/10 transition duration-200"
            />
            <div className="absolute bottom-3 right-4 flex items-center gap-2">
              <span className={`font-mono text-[10px] transition-colors ${
                form.data.description.trim().length < 20 ? "text-ink-soft/30" : "text-accent font-semibold"
              }`}>
                {form.data.description.trim().length < 20
                  ? `${form.data.description.trim().length}/20 min`
                  : lang === "fr" ? "✓ Suffisant" : "✓ Good"}
              </span>
            </div>
          </div>
          <p className="font-mono text-[10px] text-ink-soft/40 leading-relaxed">
            {lang === "fr"
              ? "Décrivez les objectifs, les fonctionnalités clés attendues et le problème métier à résoudre."
              : "Describe your goals, key expected features, and the business problem to solve."}
          </p>
        </div>
      )}

      {/* Step 3: Context */}
      {form.step === 3 && (
        <div className="flex flex-col gap-10">
          <div>
            <label className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-soft block mb-4">
              {fields.codebaseLabel}
            </label>
            <div className="flex flex-col gap-2.5">
              {Object.entries(fields.codebaseOptions).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => form.updateField("hasCodebase", val)}
                  className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left text-sm font-semibold transition-all duration-200 ${
                    form.data.hasCodebase === val
                      ? "border-accent bg-accent/5 text-ink shadow-sm shadow-accent/10"
                      : "border-line bg-paper-raised/30 text-ink-soft hover:border-accent/40 hover:text-ink hover:bg-paper-raised/60"
                  }`}
                >
                  <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                    form.data.hasCodebase === val ? "border-accent scale-110" : "border-line"
                  }`}>
                    {form.data.hasCodebase === val && <div className="h-2.5 w-2.5 rounded-full bg-accent" />}
                  </div>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-soft block mb-4">
              {fields.timelineLabel}
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {Object.entries(fields.timelineOptions).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => form.updateField("timeline", val)}
                  className={`rounded-2xl border px-4 py-4 text-left text-xs font-semibold leading-snug transition-all duration-200 ${
                    form.data.timeline === val
                      ? "border-accent bg-accent/5 text-ink shadow-sm shadow-accent/10"
                      : "border-line bg-paper-raised/30 text-ink-soft hover:border-accent/40 hover:text-ink hover:bg-paper-raised/60"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-soft block mb-4">
              {fields.teamLabel}
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {Object.entries(fields.teamOptions).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => form.updateField("teamSize", val)}
                  className={`rounded-2xl border px-4 py-4 text-left text-xs font-semibold leading-snug transition-all duration-200 ${
                    form.data.teamSize === val
                      ? "border-accent bg-accent/5 text-ink shadow-sm shadow-accent/10"
                      : "border-line bg-paper-raised/30 text-ink-soft hover:border-accent/40 hover:text-ink hover:bg-paper-raised/60"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Contact */}
      {form.step === 4 && (
        <div className="flex flex-col gap-5">
          {[
            { key: "name" as const, label: fields.nameLabel, placeholder: fields.namePlaceholder, type: "text", required: true, Icon: User },
            { key: "email" as const, label: fields.emailLabel, placeholder: fields.emailPlaceholder, type: "email", required: true, Icon: Mail },
            { key: "whatsapp" as const, label: fields.whatsappLabel, placeholder: fields.whatsappPlaceholder, type: "tel", required: false, Icon: Phone },
            { key: "source" as const, label: fields.sourceLabel, placeholder: fields.sourcePlaceholder, type: "text", required: false, Icon: Search },
          ].map((field) => (
            <div key={field.key}>
              <label className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-soft block mb-2">
                {field.label}
                {!field.required && (
                  <span className="ml-2 font-normal normal-case tracking-normal text-ink-soft/40">
                    {lang === "fr" ? "(optionnel)" : "(optional)"}
                  </span>
                )}
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/40">
                  <field.Icon className="h-4 w-4" />
                </div>
                <input
                  type={field.type}
                  value={form.data[field.key]}
                  onChange={(e) => form.updateField(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-2xl border border-line bg-paper-raised/30 pl-11 pr-5 py-4 text-sm text-ink placeholder:text-ink-soft/35 outline-none focus:border-accent/50 focus:bg-paper-raised/60 focus:ring-2 focus:ring-accent/10 transition duration-200"
                />
              </div>
            </div>
          ))}

          {form.submitError && (
            <div className="flex items-start gap-3 rounded-2xl border border-red-400/30 bg-red-500/5 p-4 text-sm text-red-400">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">{error.title}</p>
                <p className="mt-1 text-xs text-red-400/80">{error.message}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between gap-4">
        {form.step > 1 ? (
          <button
            type="button"
            onClick={() => form.setStep((s) => s - 1)}
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-[11px] uppercase font-bold tracking-widest text-ink-soft hover:text-ink hover:border-ink-soft/60 transition duration-200 active:scale-[0.96]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {buttons.prev}
          </button>
        ) : (
          <div />
        )}

        {form.step < TOTAL_STEPS ? (
          <button
            type="button"
            disabled={!form.canNext()}
            onClick={() => form.setStep((s) => s + 1)}
            className="inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 font-mono text-[11px] uppercase font-bold tracking-widest text-paper hover:bg-accent hover:text-white transition duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-[0.96] disabled:hover:scale-100"
          >
            {buttons.next}
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            disabled={!form.canNext() || form.submitting}
            onClick={form.handleSubmit}
            className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 font-mono text-[11px] uppercase font-bold tracking-widest text-white transition duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 hover:bg-ink active:scale-[0.96] disabled:hover:scale-100 shadow-lg shadow-accent/20"
          >
            {form.submitting ? (
              <>
                <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                {buttons.submitting}
              </>
            ) : (
              <>
                {buttons.submit}
                <Send className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Step recap */}
      {form.step === TOTAL_STEPS && form.data.types.length > 0 && (
        <div className="mt-8 rounded-2xl border border-line/40 bg-paper-raised/20 p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft/50 mb-3">
            {lang === "fr" ? "Récapitulatif de votre demande" : "Request summary"}
          </p>
          <div className="flex flex-wrap gap-2">
            {form.data.types.map((type) => {
              const Icon = getContactTypeIcon(type as "web" | "cloud" | "security" | "ai" | "other");
              const label = fields.types[type as keyof typeof fields.types];
              return (
                <span key={type} className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 font-mono text-[10px] text-accent">
                  <Icon className="h-3 w-3" />
                  {label}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
