"use client";

import type { StepProps } from "./types";

export function StepContext({ form, t, getContactTypeIcon }: StepProps) {
  const { fields } = t.contact;

  return (
    <div className="flex flex-col gap-8">
      {form.data.types.map((type) => {
        const Icon = getContactTypeIcon(type);
        const group = fields.contextGroups[type as keyof typeof fields.contextGroups];
        if (!group) return null;

        return (
          <div key={type} className="rounded-2xl border border-line bg-paper-raised/15 p-4">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-ink">
              <Icon className="h-4 w-4 text-accent" />
              {group.title}
            </div>
            <div className="grid gap-5">
              {group.questions.map((question) => (
                <div key={question.key}>
                  <label className="mb-3 block font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft">
                    {question.label}
                  </label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {question.options.map((option) => {
                      const answerKey = `${type}.${question.key}`;
                      const isSelected = form.data.contextAnswers[answerKey] === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => form.updateContextAnswer(answerKey, option.value)}
                          className={`rounded-xl border px-4 py-3 text-left text-xs font-semibold leading-relaxed transition-all duration-200 ${
                            isSelected
                              ? "border-accent bg-accent/5 text-ink"
                              : "border-line bg-paper-raised/15 text-ink-soft hover:border-accent/40 hover:bg-paper-raised/30 hover:text-ink"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
