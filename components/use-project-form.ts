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
  name: string;
  email: string;
  whatsapp: string;
  source: string;
}

const EMPTY_FORM: FormData = {
  types: [],
  description: "",
  hasCodebase: "",
  timeline: "",
  teamSize: "",
  name: "",
  email: "",
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
    setData((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
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

  return {
    step,
    setStep,
    submitting,
    submitted,
    submitError,
    data,
    toggleType,
    updateField,
    canNext,
    handleSubmit,
  };
}
