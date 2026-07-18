"use client";

import { AlertTriangle, Pencil } from "lucide-react";
import type { StepProps } from "./types";

export function StepRecap({ form, t, getContactTypeIcon }: StepProps) {
  const { fields, buttons, error } = t.contact;

  const getGoalLabel = (goal: string) => {
    for (const type of form.data.types) {
      const options = fields.serviceGoals[type as keyof typeof fields.serviceGoals]?.options;
      const label = options?.[goal as keyof typeof options];
      if (label) return label;
    }
    const generic = fields.goalsOptions[goal as keyof typeof fields.goalsOptions];
    if (generic) return generic;
    return goal;
  };

  const getContextAnswerLabel = (type: string, questionKey: string, value: string) => {
    const group = fields.contextGroups[type as keyof typeof fields.contextGroups];
    const question = group?.questions.find((item) => item.key === questionKey);
    const option = question?.options.find((item) => item.value === value);
    return option?.label ?? value;
  };

  const renderEditButton = (targetStep: number) => (
    <button
      type="button"
      onClick={() => form.setStep(targetStep)}
      className="flex items-center gap-1 rounded-full border border-line px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-ink-soft transition hover:border-accent/40 hover:text-accent"
    >
      <Pencil className="h-2.5 w-2.5" />
      {buttons.edit}
    </button>
  );

  const stepLabels = [
    t.contact.steps.step1,
    t.contact.steps.step2,
    t.contact.steps.step3,
    t.contact.steps.step4,
    t.contact.steps.step5,
    t.contact.steps.step6,
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-line bg-paper-raised/15 p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[9px] uppercase tracking-widest text-ink-soft/40">
              {stepLabels[0]}
            </span>
            {renderEditButton(1)}
          </div>
          <div className="flex flex-wrap gap-2">
            {form.data.types.map((type) => {
              const Icon = getContactTypeIcon(type);
              const label = fields.types[type as keyof typeof fields.types];
              return (
                <span key={type} className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/4 px-3 py-1 font-mono text-[10px] text-accent">
                  <Icon className="h-3 w-3" />
                  {label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 border-t border-line/40 pt-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-ink-soft/40">
                {t.contact.recapLabels.goals}
              </span>
              {renderEditButton(2)}
            </div>
            <ul className="text-xs text-ink list-disc pl-4 flex flex-col gap-0.5 font-medium">
              {form.data.goals.map((g) => (
                <li key={g}>{getGoalLabel(g)}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-widest text-ink-soft/40">
              {t.contact.recapLabels.budget}
            </span>
            <span className="text-xs font-bold text-accent">
              {fields.budgetOptions[form.data.budget as keyof typeof fields.budgetOptions]}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-widest text-ink-soft/40">
              {t.contact.recapLabels.timeline}
            </span>
            <span className="text-xs font-medium text-ink">
              {fields.timelineOptions[form.data.timeline as keyof typeof fields.timelineOptions]}
            </span>
          </div>
        </div>

        <div className="border-t border-line/40 pt-4">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[9px] uppercase tracking-widest text-ink-soft/40">
              {t.contact.recapLabels.context}
            </span>
            {renderEditButton(3)}
          </div>
          <div className="mt-3 grid gap-3">
            {form.data.types.map((type) => {
              const group = fields.contextGroups[type as keyof typeof fields.contextGroups];
              if (!group) return null;

              return (
                <div key={type} className="rounded-xl border border-line/40 bg-paper-raised/15 p-3">
                  <p className="mb-2 text-xs font-bold text-ink">{group.title}</p>
                  <div className="grid gap-1.5 text-xs text-ink-soft/85">
                    {group.questions.map((question) => {
                      const answerKey = `${type}.${question.key}`;
                      const answer = form.data.contextAnswers[answerKey];
                      if (!answer) return null;
                      return (
                        <p key={answerKey}>
                          <span className="text-ink-soft/55">{question.label}: </span>
                          <span className="font-semibold text-ink">{getContextAnswerLabel(type, question.key, answer)}</span>
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-line/40 pt-4">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[9px] uppercase tracking-widest text-ink-soft/40">
              {stepLabels[3]}
            </span>
            {renderEditButton(4)}
          </div>
          <div className="mt-3 grid gap-3">
            {form.data.types.some((type) => form.data.serviceDetails[type]?.trim()) ? form.data.types.map((type) => {
              const config = fields.serviceContext[type as keyof typeof fields.serviceContext];
              const detail = form.data.serviceDetails[type]?.trim();
              if (!detail) return null;

              return (
                <div key={type} className="rounded-xl border border-line/40 bg-paper-raised/20 p-4">
                  <p className="mb-1 text-xs font-bold text-ink">{config?.title ?? fields.types[type as keyof typeof fields.types]}</p>
                  <p className="whitespace-pre-wrap text-xs leading-relaxed text-ink-soft/85">
                    {detail}
                  </p>
                </div>
              );
            }) : (
              <p className="rounded-xl border border-line/40 bg-paper-raised/20 p-4 text-xs leading-relaxed text-ink-soft/75">
                {t.contact.recapLabels.noDetails}
              </p>
            )}
          </div>
          {form.data.links.some(l => l.trim() !== "") && (
            <div className="mt-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-ink-soft/40">
                Links
              </span>
              <div className="mt-2 flex flex-col gap-1 font-mono text-[10px] text-accent">
                {form.data.links.filter(l => l.trim() !== "").map((l, idx) => (
                  <a key={idx} href={l} target="_blank" rel="noopener noreferrer" className="hover:underline truncate max-w-xs block">
                    {l}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-line/40 pt-4 flex flex-col gap-1">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[9px] uppercase tracking-widest text-ink-soft/40">
              Contact
            </span>
            {renderEditButton(5)}
          </div>
          <span className="text-xs text-ink font-semibold">
            {form.data.name} · <span className="font-normal text-ink-soft/70">{form.data.email}</span>
            {form.data.company && ` · ${form.data.company}`}
            {form.data.role && ` (${form.data.role})`}
            {form.data.whatsapp && <span className="block text-[11px] text-ink-soft font-normal mt-0.5">WhatsApp: {form.data.whatsapp}</span>}
          </span>
        </div>
      </div>

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
  );
}
