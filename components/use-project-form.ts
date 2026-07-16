"use client";

import { useState } from "react";
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
}

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
};

export function useProjectForm(lang: string) {
  const searchParams = useSearchParams();

  const resolvedInitialType = (() => {
    const slug = searchParams.get("service");
    return slug ? (getContactTypeFromSlug(slug) ?? null) : null;
  })();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [data, setData] = useState<FormData>(() => ({
    ...EMPTY_FORM,
    types: resolvedInitialType ? [resolvedInitialType] : [],
  }));

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

  const canNext = (): boolean => {
    if (step === 1) return data.types.length > 0;
    if (step === 2) return data.description.trim().length > 20;
    if (step === 3) return data.timeline !== "" && data.budget !== "" && data.goals.length > 0;
    if (step === 4) return data.hasCodebase !== "" && data.teamSize !== "";
    if (step === 5) return data.name.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    if (step === 6) return true;
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

  return {
    step,
    setStep,
    submitting,
    submitted,
    submitError,
    data,
    toggleType,
    toggleGoal,
    updateField,
    canNext,
    handleSubmit,
  };
}
