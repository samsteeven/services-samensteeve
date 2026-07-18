import type { ComponentType } from "react";
import type { Language } from "@/lib/i18n";
import type { getT } from "@/lib/i18n";

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

export interface FormActions {
  data: FormData;
  submitError: boolean;
  setStep: (step: number | ((prev: number) => number)) => void;
  toggleType: (type: string) => void;
  toggleGoal: (goal: string) => void;
  updateField: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  updateServiceDetail: (type: string, value: string) => void;
  updateContextAnswer: (key: string, value: string) => void;
}

export interface StepProps {
  form: FormActions;
  t: ReturnType<typeof getT>;
  lang: Language;
  getContactTypeIcon: (type: string) => ComponentType<{ className?: string }>;
}
