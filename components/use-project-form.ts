"use client";

import { useCallback, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getContactTypeFromSlug } from "@/lib/services";

export interface FormData {
  types: string[];
  description: string;
  hasCodebase: string;
  timeline: string;
  teamSize: string;
  budget: string;
  goals: string[];
  links: string[];
  name: string;
  email: string;
  company: string;
  role: string;
  whatsapp: string;
  source: string;
  turnstileToken: string;
}

const STORAGE_KEY = "project-form-draft";
const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

const EMPTY_FORM: FormData = {
  types: [],
  description: "",
  hasCodebase: "",
  timeline: "",
  teamSize: "",
  budget: "",
  goals: [],
  links: [""],
  name: "",
  email: "",
  company: "",
  role: "",
  whatsapp: "",
  source: "",
  turnstileToken: "",
};

function loadDraft(): { step: number; data: FormData } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.step === "number" && parsed.data) {
      return { step: parsed.step, data: { ...EMPTY_FORM, ...parsed.data } };
    }
  } catch {}
  return null;
}

function saveDraft(step: number, data: FormData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      step,
      data: { ...data, turnstileToken: "" },
    }));
  } catch {}
}

function clearDraft() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

function hasMeaningfulData(data: FormData): boolean {
  return data.types.length > 0
    || data.description.trim() !== ""
    || data.hasCodebase !== ""
    || data.timeline !== ""
    || data.teamSize !== ""
    || data.budget !== ""
    || data.goals.length > 0
    || data.links.some((link) => link.trim() !== "")
    || data.name.trim() !== ""
    || data.email.trim() !== ""
    || data.company.trim() !== ""
    || data.role.trim() !== ""
    || data.whatsapp.trim() !== ""
    || data.source.trim() !== "";
}

export function useProjectForm(lang: string) {
  const searchParams = useSearchParams();

  const resolvedInitialType = (() => {
    const slug = searchParams.get("service");
    return slug ? (getContactTypeFromSlug(slug) ?? null) : null;
  })();

  const [step, setStep] = useState(() => {
    const draft = loadDraft();
    return draft?.step ?? 1;
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const [data, setData] = useState<FormData>(() => {
    const draft = loadDraft();
    if (draft) return draft.data;
    return { ...EMPTY_FORM, types: resolvedInitialType ? [resolvedInitialType] : [] };
  });

  useEffect(() => {
    if (submitted) {
      clearDraft();
      return;
    }
    saveDraft(step, data);
  }, [step, data, submitted]);

  const toggleType = (type: string) => {
    setData((prev) => {
      const nextTypes = prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type];

      // Auto-select logical goals if the user hasn't manually selected any goals yet
      let nextGoals = [...prev.goals];
      if (prev.goals.length === 0 || prev.goals.every(g => ["launch", "automate", "secure", "scale"].includes(g))) {
        const tempGoals = new Set<string>();
        if (nextTypes.includes("web")) tempGoals.add("launch");
        if (nextTypes.includes("cloud")) tempGoals.add("scale");
        if (nextTypes.includes("security")) tempGoals.add("secure");
        if (nextTypes.includes("ai")) tempGoals.add("automate");
        nextGoals = Array.from(tempGoals);
      }

      // Auto-suggest codebase context based on service types
      let nextHasCodebase = prev.hasCodebase;
      if (nextTypes.includes("security") || nextTypes.includes("cloud")) {
        nextHasCodebase = "yes";
      } else if (nextTypes.includes("web") && nextTypes.length === 1) {
        nextHasCodebase = "no";
      }

      return {
        ...prev,
        types: nextTypes,
        goals: nextGoals,
        hasCodebase: nextHasCodebase,
      };
    });
  };

  const toggleGoal = (goal: string) => {
    setData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const updateTurnstileToken = useCallback((token: string) => {
    setData((prev) => ({ ...prev, turnstileToken: token }));
  }, []);

  const canNext = (): boolean => {
    if (step === 1) return data.types.length > 0;
    if (step === 2) return data.description.trim().length > 20;
    if (step === 3) return data.timeline !== "" && data.budget !== "" && data.goals.length > 0;
    if (step === 4) return data.hasCodebase !== "" && data.teamSize !== "";
    if (step === 5) return data.name.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    if (step === 6) return !turnstileEnabled || data.turnstileToken.trim() !== "";
    return false;
  };

  const clearCurrentStep = () => {
    setSubmitError(false);
    setData((prev) => {
      if (step === 1) return { ...prev, types: [], goals: [], hasCodebase: "" };
      if (step === 2) return { ...prev, description: "" };
      if (step === 3) return { ...prev, timeline: "", budget: "", goals: [] };
      if (step === 4) return { ...prev, hasCodebase: "", teamSize: "", links: [""] };
      if (step === 5) {
        return {
          ...prev,
          name: "",
          email: "",
          company: "",
          role: "",
          whatsapp: "",
          source: "",
        };
      }
      return prev;
    });
  };

  const resetForm = () => {
    clearDraft();
    setStep(1);
    setSubmitError(false);
    setSubmitted(false);
    setData({ ...EMPTY_FORM, types: resolvedInitialType ? [resolvedInitialType] : [] });
    setTurnstileResetSignal((value) => value + 1);
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
      setTurnstileResetSignal((value) => value + 1);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    step,
    setStep,
    submitting,
    submitted,
    submitError,
    data,
    hasDraftData: hasMeaningfulData(data),
    turnstileResetSignal,
    toggleType,
    toggleGoal,
    updateField,
    updateTurnstileToken,
    clearCurrentStep,
    resetForm,
    canNext,
    handleSubmit,
  };
}
