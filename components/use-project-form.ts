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
  serviceDetails: Record<string, string>;
  contextAnswers: Record<string, string>;
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

const SERVICE_GOAL_KEYS: Record<string, string[]> = {
  web: ["web_mvp", "web_platform", "web_api", "web_refactor"],
  cloud: ["cloud_migration", "cloud_resilience", "cloud_cost", "cloud_observability"],
  security: ["security_pentest", "security_remediation", "security_compliance", "security_hardening"],
  ai: ["ai_workflow", "ai_agent", "ai_data", "ai_integration"],
  other: ["other_scope", "other_prioritize", "other_architecture", "other_roadmap"],
};

const SERVICE_CONTEXT_KEYS: Record<string, string[]> = {
  web: ["stage", "codebase", "users", "integration"],
  cloud: ["current", "provider", "criticality", "operations"],
  security: ["target", "environment", "authorization", "constraints"],
  ai: ["process", "data", "humanReview", "systems"],
  other: ["clarity", "constraint", "decision", "stakeholders"],
};

const EMPTY_FORM: FormData = {
  types: [],
  description: "",
  hasCodebase: "",
  timeline: "",
  teamSize: "",
  budget: "",
  goals: [],
  serviceDetails: {},
  contextAnswers: {},
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
    || Object.values(data.serviceDetails).some((detail) => detail.trim() !== "")
    || Object.values(data.contextAnswers).some((answer) => answer.trim() !== "")
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
    if (draft) {
      // If URL has a service param, override the draft's types
      if (resolvedInitialType) {
        return { ...draft.data, types: [resolvedInitialType] };
      }
      return draft.data;
    }
    return { ...EMPTY_FORM, types: resolvedInitialType ? [resolvedInitialType] : [] };
  });

  const getInitialData = useCallback((): FormData => ({
    ...EMPTY_FORM,
    types: resolvedInitialType ? [resolvedInitialType] : [],
  }), [resolvedInitialType]);

  useEffect(() => {
    if (submitted) {
      clearDraft();
      return;
    }
    saveDraft(step, data);
  }, [step, data, submitted]);

  const goalKeysForTypes = (types: string[]) => {
    const keys = new Set<string>();
    types.forEach((type) => {
      SERVICE_GOAL_KEYS[type]?.forEach((goal) => keys.add(goal));
    });
    return keys;
  };

  const contextKeysForTypes = (types: string[]) => {
    const keys = new Set<string>();
    types.forEach((type) => {
      SERVICE_CONTEXT_KEYS[type]?.forEach((key) => keys.add(`${type}.${key}`));
    });
    return keys;
  };

  const buildDescription = (formData: FormData) => {
    return formData.types
      .map((type) => formData.serviceDetails[type]?.trim())
      .filter(Boolean)
      .join("\n\n");
  };

  const toggleType = (type: string) => {
    setData((prev) => {
      const nextTypes = prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type];

      const allowedGoals = goalKeysForTypes(nextTypes);
      const allowedContextKeys = contextKeysForTypes(nextTypes);

      return {
        ...prev,
        types: nextTypes,
        goals: prev.goals.filter((goal) => allowedGoals.has(goal)),
        hasCodebase: "",
        teamSize: "",
        serviceDetails: Object.fromEntries(
          Object.entries(prev.serviceDetails).filter(([key]) => nextTypes.includes(key)),
        ),
        contextAnswers: Object.fromEntries(
          Object.entries(prev.contextAnswers).filter(([key]) => allowedContextKeys.has(key)),
        ),
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

  const updateServiceDetail = (type: string, value: string) => {
    setData((prev) => ({
      ...prev,
      serviceDetails: {
        ...prev.serviceDetails,
        [type]: value,
      },
      description: buildDescription({
        ...prev,
        serviceDetails: {
          ...prev.serviceDetails,
          [type]: value,
        },
      }),
    }));
  };

  const updateContextAnswer = (key: string, value: string) => {
    setData((prev) => ({
      ...prev,
      contextAnswers: {
        ...prev.contextAnswers,
        [key]: value,
      },
    }));
  };

  const updateTurnstileToken = useCallback((token: string) => {
    setData((prev) => ({ ...prev, turnstileToken: token }));
  }, []);

  const canNext = (): boolean => {
    if (step === 1) return data.types.length > 0;
    if (step === 2) return data.timeline !== "" && data.budget !== "" && data.goals.length > 0;
    if (step === 3) {
      const requiredKeys = Array.from(contextKeysForTypes(data.types));
      return requiredKeys.every((key) => (data.contextAnswers[key] ?? "").trim() !== "");
    }
    if (step === 4) return true;
    if (step === 5) return data.name.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    if (step === 6) return !turnstileEnabled || data.turnstileToken.trim() !== "";
    return false;
  };

  const clearCurrentStep = () => {
    setSubmitError(false);
    setData((prev) => {
      if (step === 1) return { ...prev, types: [], goals: [], hasCodebase: "", teamSize: "", serviceDetails: {}, contextAnswers: {} };
      if (step === 2) return { ...prev, timeline: "", budget: "", goals: [] };
      if (step === 3) return { ...prev, hasCodebase: "", teamSize: "", contextAnswers: {} };
      if (step === 4) return { ...prev, description: "", serviceDetails: {}, links: [""] };
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
    setData(getInitialData());
    setTurnstileResetSignal((value) => value + 1);
  };

  const startNewRequest = () => {
    clearDraft();
    setStep(1);
    setSubmitError(false);
    setSubmitted(false);
    setData(getInitialData());
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
        body: JSON.stringify({ ...data, description: buildDescription(data), lang }),
      });
      if (!res.ok) throw new Error("Failed");
      clearDraft();
      setStep(1);
      setData(getInitialData());
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
    updateServiceDetail,
    updateContextAnswer,
    updateTurnstileToken,
    clearCurrentStep,
    resetForm,
    startNewRequest,
    canNext,
    handleSubmit,
  };
}
