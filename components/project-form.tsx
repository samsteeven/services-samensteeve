"use client";

import { getT, type Language } from "@/lib/translations";
import {
  Check,
  CheckCircle2,
  ArrowLeft,
  Send,
  AlertTriangle,
  CalendarDays,
  User,
  Mail,
  Phone,
  Search,
  ChevronRight,
  Plus,
  X,
  Briefcase,
  Building,
} from "lucide-react";
import { getContactTypeIcon, type ContactTypeKey } from "@/lib/services";
import { useProjectForm } from "./use-project-form";
import { TurnstileWidget } from "./turnstile-widget";

interface Props {
  lang: Language;
}

const TOTAL_STEPS = 6;

export function ProjectForm({ lang }: Props) {
  const t = getT(lang);
  const { fields, buttons, steps, success, error, questions } = t.contact;
  const form = useProjectForm(lang);

  const getDynamicPlaceholder = () => {
    const types = form.data.types;
    if (types.length === 0) return fields.descPlaceholder;
    
    if (types.length === 1) {
      const type = types[0];
      if (type === "web") {
        return lang === "fr"
          ? "Décrivez le logiciel, la plateforme métier, l'API ou le produit à concevoir, les rôles utilisateurs, les workflows et les contraintes de production..."
          : "Describe the software product, business platform, API, or system to build, user roles, workflows, and production constraints...";
      }
      if (type === "cloud") {
        return lang === "fr"
          ? "Décrivez votre infrastructure actuelle (on-premise ou cloud), les hébergeurs utilisés, et vos contraintes de résilience ou de migration..."
          : "Describe your current infrastructure (on-premise or cloud), hosting providers used, and resilience or migration constraints...";
      }
      if (type === "security") {
        return lang === "fr"
          ? "Décrivez la cible à tester (application, API, backoffice, portail client), les rôles disponibles, l'environnement autorisé et les risques déjà identifiés..."
          : "Describe the target to test (application, API, back office, customer portal), available roles, authorized environment, and risks already identified...";
      }
      if (type === "ai") {
        return lang === "fr"
          ? "Décrivez les processus manuels ou répétitifs à automatiser (ex: traitement de factures, qualification de leads), les outils utilisés et les API disponibles..."
          : "Describe the manual or repetitive processes to automate (e.g. invoice processing, lead scoring), tools used, and available APIs...";
      }
    }

    // Multiple selection logic
    const contains = (t: string) => types.includes(t);
    if (lang === "fr") {
      const parts = [];
      if (contains("web")) parts.push("le logiciel ou produit à construire");
      if (contains("ai")) parts.push("les processus IA à automatiser");
      if (contains("security")) parts.push("la cible à tester et sécuriser");
      if (contains("cloud")) parts.push("l'infrastructure cloud à migrer/concevoir");
      return `Décrivez votre projet global en couvrant à la fois : ${parts.join(", ")}. Spécifiez vos objectifs métier et les technos...`;
    } else {
      const parts = [];
      if (contains("web")) parts.push("the software product or system to build");
      if (contains("ai")) parts.push("the AI automation processes");
      if (contains("security")) parts.push("the target to test and secure");
      if (contains("cloud")) parts.push("the cloud infrastructure to design/migrate");
      return `Describe your overall project, covering: ${parts.join(", ")}. Specify your business goals and current stack...`;
    }
  };

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
            <a
              href="https://cal.com/samen-steeve/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-widest text-paper transition-transform duration-200 hover:bg-accent hover:text-white active:scale-[0.96]"
            >
              <CalendarDays className="h-3.5 w-3.5" />
              {success.bookCall}
            </a>
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

  return (
    <div className="mx-auto max-w-3xl w-full">
      {/* ── SDEN-Style Step Indicator ───────────────────────────────────────── */}
      <div className="mb-10">
        {/* Row of circles and connector lines */}
        <div className="flex items-center">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const num = i + 1;
            const isDone = num < form.step;
            const isActive = num === form.step;
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
            {stepLabels[form.step - 1]}
          </span>
          <div className="flex items-center gap-3">
            {form.hasDraftData && (
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
              {form.step} / {TOTAL_STEPS}
            </span>
          </div>
        </div>

        {/* Progress line */}
        <div className="mt-2 h-0.5 w-full rounded-full bg-line/20 overflow-hidden">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${((form.step - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Active Step Header ────────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {questionLabels[form.step - 1]}
          </h2>
          {form.step < TOTAL_STEPS && (
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

      {/* ── Step 1: Offer / Services ────────────────────────────────────────── */}
      {form.step === 1 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(fields.types).map(([key, label]) => {
            const Icon = getContactTypeIcon(key as ContactTypeKey);
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
      )}

      {/* ── Step 2: Scope / Description ──────────────────────────────────────── */}
      {form.step === 2 && (
        <div className="flex flex-col gap-4">
          <div className="relative">
            <textarea
              value={form.data.description}
              onChange={(e) => form.updateField("description", e.target.value)}
              placeholder={getDynamicPlaceholder()}
              rows={8}
              className="w-full resize-none rounded-2xl border border-line bg-paper-raised/20 px-5 py-4 text-sm leading-relaxed text-ink placeholder:text-ink-soft/30 outline-none focus:border-accent/40 focus:bg-paper-raised/30 focus:ring-2 focus:ring-accent/5 transition duration-200"
            />
            <div className="absolute bottom-3 right-4">
              <span className={`font-mono text-[10px] transition-colors ${
                form.data.description.trim().length < 20 ? "text-ink-soft/30" : "text-accent font-semibold"
              }`}>
                {form.data.description.trim().length < 20
                  ? `${form.data.description.trim().length}/20 min`
                  : lang === "fr" ? "✓ Suffisant" : "✓ Good"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 3: Goals & Success criteria ──────────────────────────────────── */}
      {form.step === 3 && (
        <div className="flex flex-col gap-8">
          {/* Target Outcomes (Value metrics) */}
          <div>
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft block mb-3.5">
              {fields.goalsLabel}
            </label>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {Object.entries(fields.goalsOptions).map(([key, label]) => {
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

          {/* Budget Range */}
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

          {/* Desired Timeline */}
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
      )}

      {/* ── Step 4: Context / Tech Details ────────────────────────────────────── */}
      {form.step === 4 && (
        <div className="flex flex-col gap-8">
          {/* Codebase */}
          <div>
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft block mb-3.5">
              {fields.codebaseLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.entries(fields.codebaseOptions).map(([val, label]) => {
                const isSelected = form.data.hasCodebase === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => form.updateField("hasCodebase", val)}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-xs font-bold transition-all duration-200 ${
                      isSelected
                        ? "border-accent bg-accent/5 text-ink shadow-sm"
                        : "border-line bg-paper-raised/15 text-ink-soft hover:border-accent/40 hover:text-ink hover:bg-paper-raised/30"
                    }`}
                  >
                    <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                      isSelected ? "border-accent scale-105" : "border-line"
                    }`}>
                      {isSelected && <div className="h-2 w-2 rounded-full bg-accent" />}
                    </div>
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Team Size */}
          <div>
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft block mb-3.5">
              {fields.teamLabel}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(fields.teamOptions).map(([val, label]) => {
                const isSelected = form.data.teamSize === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => form.updateField("teamSize", val)}
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

          {/* Links Input Stack */}
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
      )}

      {/* ── Step 5: Contact / Identity ───────────────────────────────────────── */}
      {form.step === 5 && (
        <div className="flex flex-col gap-5">
          {/* Identity Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft block mb-2">
                {fields.nameLabel}
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/40">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  value={form.data.name}
                  onChange={(e) => form.updateField("name", e.target.value)}
                  placeholder={fields.namePlaceholder}
                  className="w-full rounded-xl border border-line bg-paper-raised/20 pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink-soft/35 outline-none focus:border-accent/40 focus:bg-paper-raised/30 focus:ring-2 focus:ring-accent/5 transition duration-200"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft block mb-2">
                {fields.emailLabel}
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/40">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  value={form.data.email}
                  onChange={(e) => form.updateField("email", e.target.value)}
                  placeholder={fields.emailPlaceholder}
                  className="w-full rounded-xl border border-line bg-paper-raised/20 pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink-soft/35 outline-none focus:border-accent/40 focus:bg-paper-raised/30 focus:ring-2 focus:ring-accent/5 transition duration-200"
                />
              </div>
            </div>
          </div>

          {/* Company & Role */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft block mb-2">
                {fields.companyLabel}
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/40">
                  <Building className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  value={form.data.company}
                  onChange={(e) => form.updateField("company", e.target.value)}
                  placeholder={fields.companyPlaceholder}
                  className="w-full rounded-xl border border-line bg-paper-raised/20 pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink-soft/35 outline-none focus:border-accent/40 focus:bg-paper-raised/30 focus:ring-2 focus:ring-accent/5 transition duration-200"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft block mb-2">
                {fields.roleLabel}
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/40">
                  <Briefcase className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  value={form.data.role}
                  onChange={(e) => form.updateField("role", e.target.value)}
                  placeholder={fields.rolePlaceholder}
                  className="w-full rounded-xl border border-line bg-paper-raised/20 pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink-soft/35 outline-none focus:border-accent/40 focus:bg-paper-raised/30 focus:ring-2 focus:ring-accent/5 transition duration-200"
                />
              </div>
            </div>
          </div>

          {/* WhatsApp & Source */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft block mb-2">
                {fields.whatsappLabel}
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/40">
                  <Phone className="h-4 w-4" />
                </div>
                <input
                  type="tel"
                  value={form.data.whatsapp}
                  onChange={(e) => form.updateField("whatsapp", e.target.value)}
                  placeholder={fields.whatsappPlaceholder}
                  className="w-full rounded-xl border border-line bg-paper-raised/20 pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink-soft/35 outline-none focus:border-accent/40 focus:bg-paper-raised/30 focus:ring-2 focus:ring-accent/5 transition duration-200"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft block mb-2">
                {fields.sourceLabel}
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/40">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  value={form.data.source}
                  onChange={(e) => form.updateField("source", e.target.value)}
                  placeholder={fields.sourcePlaceholder}
                  className="w-full rounded-xl border border-line bg-paper-raised/20 pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink-soft/35 outline-none focus:border-accent/40 focus:bg-paper-raised/30 focus:ring-2 focus:ring-accent/5 transition duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 6: Summary / Recap ──────────────────────────────────────────── */}
      {form.step === 6 && (
        <div className="flex flex-col gap-6">
          {/* Main Recap Card */}
          <div className="rounded-2xl border border-line bg-paper-raised/15 p-6 flex flex-col gap-6">
            {/* Offer row */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-ink-soft/40">
                {stepLabels[0]}
              </span>
              <div className="flex flex-wrap gap-2">
                {form.data.types.map((type) => {
                  const Icon = getContactTypeIcon(type as ContactTypeKey);
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

            {/* Scope row */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-ink-soft/40">
                {stepLabels[1]}
              </span>
              <p className="text-xs text-ink-soft/85 leading-relaxed bg-paper-raised/20 rounded-xl p-4 border border-line/40 whitespace-pre-wrap italic">
                "{form.data.description}"
              </p>
            </div>

            {/* Goals & Budget row */}
            <div className="grid gap-4 sm:grid-cols-3 border-t border-line/40 pt-4">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] uppercase tracking-widest text-ink-soft/40">
                  {lang === "fr" ? "Objectifs" : "Goals"}
                </span>
                <ul className="text-xs text-ink list-disc pl-4 flex flex-col gap-0.5 font-medium">
                  {form.data.goals.map((g) => (
                    <li key={g}>{fields.goalsOptions[g as keyof typeof fields.goalsOptions]}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] uppercase tracking-widest text-ink-soft/40">
                  {lang === "fr" ? "Budget estimé" : "Budget range"}
                </span>
                <span className="text-xs font-bold text-accent">
                  {fields.budgetOptions[form.data.budget as keyof typeof fields.budgetOptions]}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] uppercase tracking-widest text-ink-soft/40">
                  {lang === "fr" ? "Démarrage" : "Timeline"}
                </span>
                <span className="text-xs font-medium text-ink">
                  {fields.timelineOptions[form.data.timeline as keyof typeof fields.timelineOptions]}
                </span>
              </div>
            </div>

            {/* Context row */}
            <div className="grid gap-4 sm:grid-cols-2 border-t border-line/40 pt-4">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] uppercase tracking-widest text-ink-soft/40">
                  {lang === "fr" ? "Code existant & Équipe" : "Existing Code & Team"}
                </span>
                <span className="text-xs text-ink font-medium leading-relaxed">
                  {fields.codebaseOptions[form.data.hasCodebase as keyof typeof fields.codebaseOptions]}
                  <br />
                  <span className="text-ink-soft">{fields.teamOptions[form.data.teamSize as keyof typeof fields.teamOptions]}</span>
                </span>
              </div>
              {form.data.links.some(l => l.trim() !== "") && (
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-ink-soft/40">
                    Links
                  </span>
                  <div className="flex flex-col gap-1 font-mono text-[10px] text-accent">
                    {form.data.links.filter(l => l.trim() !== "").map((l, idx) => (
                      <a key={idx} href={l} target="_blank" rel="noopener noreferrer" className="hover:underline truncate max-w-xs block">
                        {l}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact details */}
            <div className="border-t border-line/40 pt-4 flex flex-col gap-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-ink-soft/40">
                Contact
              </span>
              <span className="text-xs text-ink font-semibold">
                {form.data.name} · <span className="font-normal text-ink-soft/70">{form.data.email}</span>
                {form.data.company && ` · ${form.data.company}`}
                {form.data.role && ` (${form.data.role})`}
                {form.data.whatsapp && <span className="block text-[11px] text-ink-soft font-normal mt-0.5">WhatsApp: {form.data.whatsapp}</span>}
              </span>
            </div>
          </div>

          {/* Submission error message */}
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
