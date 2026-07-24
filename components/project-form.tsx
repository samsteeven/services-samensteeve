"use client";

import { useState, useEffect, useRef } from "react";
import { getT, type Language } from "@/lib/i18n";
import {
  Check,
  CheckCircle2,
  ArrowLeft,
  Send,
  ChevronRight,
} from "lucide-react";
import { getContactTypeIcon } from "@/lib/services";
import { useProjectForm } from "./use-project-form";
import { TurnstileWidget } from "./turnstile-widget";
import {
  StepService,
  StepGoals,
  StepContext,
  StepDetails,
  StepContact,
  StepRecap,
} from "./project-form/index";

interface Props {
  lang: Language;
}

const TOTAL_STEPS = 6;

export function ProjectForm({ lang }: Props) {
  const t = getT(lang);
  const { buttons, steps, success, questions } = t.contact;
  const form = useProjectForm(lang);
  const [hydrated, setHydrated] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      setHydrated(true);
    }
  }, []);

  const displayStep = hydrated ? form.step : 1;

  const stepLabels = [
    steps.step1,
    steps.step2,
    steps.step3,
    steps.step4,
    steps.step5,
    steps.step6,
  ];

  const questionLabels = [
    questions.step1,
    questions.step2,
    questions.step3,
    questions.step4,
    questions.step5,
    questions.step6,
  ];

  const formActions = {
    data: form.data,
    submitError: form.submitError,
    setStep: form.setStep,
    toggleType: form.toggleType,
    toggleGoal: form.toggleGoal,
    updateField: form.updateField,
    updateServiceDetail: form.updateServiceDetail,
    updateContextAnswer: form.updateContextAnswer,
  };

  const getIcon = (type: string) => getContactTypeIcon(type as Parameters<typeof getContactTypeIcon>[0]);

  // success view
  if (form.submitted) {
    return (
      <div className="mx-auto max-w-2xl py-12">
        <div className="rounded-3xl border border-accent/25 bg-paper-raised/30 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.16)] sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent shadow-sm">
              <CheckCircle2 className="h-7 w-7" />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-accent shadow-[0_0_0_4px_var(--paper-raised)]" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent">
                {success.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {success.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">
                {success.message}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 border-t border-line/50 pt-6 sm:grid-cols-3">
            {success.nextSteps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-line/60 bg-paper/55 p-4">
                <span className="font-mono text-[10px] font-bold text-accent/75 tabular-nums">
                  0{index + 1}
                </span>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={form.startNewRequest}
              className="inline-flex min-h-10 items-center justify-center rounded-xl border border-line px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-widest text-ink-soft transition-colors duration-200 hover:border-accent/40 hover:text-accent active:scale-[0.96]"
            >
              {success.newRequest}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl w-full">
      {/* ── SDEN-Style Step Indicator ───────────────────────────────────────── */}
      <div className="mb-10">
        {/* Row of circles and connector lines */}
        <div className="flex items-center">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const num = i + 1;
            const isDone = num < displayStep;
            const isActive = num === displayStep;
            return (
              <div key={num} className="flex items-center flex-1 last:flex-none">
                {/* Circle */}
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] font-bold transition-all duration-300 ${
                  isDone
                    ? "border-accent bg-accent text-white"
                    : isActive
                      ? "border-accent text-accent bg-accent/10"
                      : "border-line text-ink-soft/30 bg-transparent"
                }`}>
                  {isDone ? <Check className="h-3 w-3" /> : num}
                </div>
                {/* Connector line */}
                {i < TOTAL_STEPS - 1 && (
                  <div className="flex-1 mx-2 h-px bg-line/40 relative overflow-hidden">
                    {isDone && (
                      <div className="absolute inset-0 bg-accent/50 transition-all duration-500" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Labels below */}
        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
            {stepLabels[displayStep - 1]}
          </span>
          <div className="flex items-center gap-3">
            {hydrated && form.hasDraftData && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(buttons.resetConfirm)) form.resetForm();
                }}
                className="font-mono text-[10px] uppercase tracking-widest text-ink-soft/45 transition hover:text-red-400"
              >
                {buttons.resetAll}
              </button>
            )}
            <span className="font-mono text-[10px] text-ink-soft/40 tabular-nums">
              {displayStep} / {TOTAL_STEPS}
            </span>
          </div>
        </div>

        {/* Progress line */}
        <div className="mt-2 h-0.5 w-full rounded-full bg-line/20 overflow-hidden">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${((displayStep - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Active Step Header ────────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {questionLabels[displayStep - 1]}
          </h2>
          {displayStep < TOTAL_STEPS && (
            <button
              type="button"
              onClick={form.clearCurrentStep}
              className="self-start font-mono text-[10px] uppercase tracking-widest text-ink-soft transition hover:text-accent"
            >
              {buttons.clearStep}
            </button>
          )}
        </div>
      </div>

      {/* ── Step Content ──────────────────────────────────────────────────── */}
      {form.step === 1 && <StepService form={formActions} t={t} lang={lang} getContactTypeIcon={getIcon} />}
      {form.step === 2 && <StepGoals form={formActions} t={t} lang={lang} getContactTypeIcon={getIcon} />}
      {form.step === 3 && <StepContext form={formActions} t={t} lang={lang} getContactTypeIcon={getIcon} />}
      {form.step === 4 && <StepDetails form={formActions} t={t} lang={lang} getContactTypeIcon={getIcon} />}
      {form.step === 5 && <StepContact form={formActions} t={t} lang={lang} getContactTypeIcon={getIcon} />}
      {form.step === 6 && <StepRecap form={formActions} t={t} lang={lang} getContactTypeIcon={getIcon} />}

      {form.step === 6 && (
        <div className="mt-6 rounded-2xl border border-line bg-paper-raised/15 p-4">
          <p className="mb-3 font-mono text-[9px] uppercase tracking-widest text-ink-soft/45">
            {buttons.verification}
          </p>
          <TurnstileWidget
            onTokenChange={form.updateTurnstileToken}
            resetSignal={form.turnstileResetSignal}
            loadingLabel={buttons.verificationLoading}
            errorLabel={buttons.verificationError}
            retryLabel={buttons.verificationRetry}
          />
        </div>
      )}

      {/* ── Navigation Actions ──────────────────────────────────────────────── */}
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
            className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 font-mono text-[11px] uppercase font-bold tracking-widest text-white transition duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 hover:brightness-110 active:scale-[0.96] disabled:hover:scale-100 shadow-lg shadow-accent/20"
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

    </div>
  );
}
