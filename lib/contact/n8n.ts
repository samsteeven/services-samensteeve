import { getT, type Language } from "@/lib/i18n";
import type { ContactPayload } from "./validation";

const SERVICE_LABELS: Record<string, Record<string, string>> = {
  fr: {
    web: "Ingénierie logicielle",
    cloud: "Architecture Cloud & Hybride",
    security: "Pentest & Sécurité",
    ai: "Automatisation IA",
    other: "Autre",
  },
  en: {
    web: "Software Engineering",
    cloud: "Cloud & Hybrid Architecture",
    security: "Pentest & Security",
    ai: "AI Automation",
    other: "Other",
  },
};

const TIMELINE_LABELS: Record<string, Record<string, string>> = {
  fr: { urgent: "Urgent (< 1 sem.)", short: "Court terme (1-2 mois)", medium: "Moyen terme (3-6 mois)", flexible: "Flexible" },
  en: { urgent: "Urgent (< 1 week)", short: "Short term (1-2 months)", medium: "Medium term (3-6 months)", flexible: "Flexible" },
};

const BUDGET_LABELS: Record<string, Record<string, string>> = {
  fr: { small: "< 1 000 €", medium: "1 000 – 5 000 €", large: "5 000 – 15 000 €", enterprise: "> 15 000 €" },
  en: { small: "< €1,000", medium: "€1,000 – €5,000", large: "€5,000 – €15,000", enterprise: "> €15,000" },
};

function resolveGoalLabels(lang: string, goals: string[]): string[] {
  const t = getT(lang as Language);
  const labels: string[] = [];
  for (const g of goals) {
    const generic = t.contact.fields.goalsOptions[g as keyof typeof t.contact.fields.goalsOptions];
    if (generic) { labels.push(generic); continue; }
    for (const serviceGoals of Object.values(t.contact.fields.serviceGoals)) {
      const label = serviceGoals.options[g as keyof typeof serviceGoals.options];
      if (label) { labels.push(label); break; }
    }
  }
  return labels;
}

function resolveContextLabels(lang: string, contextAnswers: Record<string, string>): string[] {
  const t = getT(lang as Language);
  return Object.entries(contextAnswers).map(([key, value]) => {
    const [type, questionKey] = key.split(".");
    const group = t.contact.fields.contextGroups[type as keyof typeof t.contact.fields.contextGroups];
    const question = group?.questions.find((q) => q.key === questionKey);
    const option = question?.options.find((o) => o.value === value);
    return `${question?.label ?? questionKey} → ${option?.label ?? value}`;
  });
}

export interface N8nPayload {
  submissionId?: number;
  submittedAt: string;
  contact: {
    name: string;
    email: string;
    company: string | undefined;
    role: string | undefined;
    whatsapp: string;
    lang: string;
  };
  project: {
    types: string[];
    typeLabels: string[];
    description: string;
    goals: string[];
    goalLabels: string[];
    timeline: string;
    timelineLabel: string;
    budget: string;
    budgetLabel: string;
    teamSize: string;
    hasCodebase: string;
    serviceDetails: Record<string, string>;
    contextAnswers: Record<string, string>;
    contextLabels: string[];
    links: string[];
  };
  meta: {
    source: string;
    ipAddress: string;
  };
  summary: string;
}

export function buildN8nPayload(
  payload: ContactPayload,
  ipAddress: string,
  submissionId?: number,
): N8nPayload {
  const lang = payload.lang || "fr";
  const typeLabels = payload.types.map((t) => SERVICE_LABELS[lang]?.[t] ?? t);
  const goalLabels = resolveGoalLabels(lang, payload.goals);
  const contextLabels = resolveContextLabels(lang, payload.contextAnswers);

  const summary = buildSummary(lang, {
    name: payload.name,
    company: payload.company,
    types: typeLabels,
    description: payload.description,
    goals: goalLabels,
    timeline: TIMELINE_LABELS[lang]?.[payload.timeline] ?? payload.timeline,
    budget: BUDGET_LABELS[lang]?.[payload.budget] ?? payload.budget,
    contextLabels,
  });

  return {
    submissionId,
    submittedAt: new Date().toISOString(),
    contact: {
      name: payload.name,
      email: payload.email,
      company: payload.company,
      role: payload.role,
      whatsapp: payload.whatsapp,
      lang,
    },
    project: {
      types: payload.types,
      typeLabels,
      description: payload.description,
      goals: payload.goals,
      goalLabels,
      timeline: payload.timeline,
      timelineLabel: TIMELINE_LABELS[lang]?.[payload.timeline] ?? payload.timeline,
      budget: payload.budget,
      budgetLabel: BUDGET_LABELS[lang]?.[payload.budget] ?? payload.budget,
      teamSize: payload.teamSize,
      hasCodebase: payload.hasCodebase,
      serviceDetails: payload.serviceDetails,
      contextAnswers: payload.contextAnswers,
      contextLabels,
      links: payload.links,
    },
    meta: {
      source: payload.source,
      ipAddress,
    },
    summary,
  };
}

export function getN8nHeaders(): Record<string, string> {
  const secret = process.env.N8N_WEBHOOK_SECRET;
  if (!secret) {
    console.warn("N8N_WEBHOOK_SECRET not set — webhook calls will fail authentication");
  }
  return {
    "Content-Type": "application/json",
    "X-Webhook-Secret": secret ?? "",
  };
}

function buildSummary(
  lang: string,
  data: {
    name: string;
    company: string | undefined;
    types: string[];
    description: string;
    goals: string[];
    timeline: string;
    budget: string;
    contextLabels: string[];
  },
): string {
  const isFr = lang === "fr";

  const lines = [
    isFr ? `Nouveau lead : ${data.name}` : `New lead: ${data.name}`,
    data.company ? `${isFr ? "Entreprise" : "Company"}: ${data.company}` : "",
    `${isFr ? "Service(s) demandé(s)" : "Requested service(s)"}: ${data.types.join(", ")}`,
    "",
    isFr ? "Description du projet :" : "Project description:",
    data.description,
    "",
    `${isFr ? "Objectifs" : "Goals"}: ${data.goals.join(", ")}`,
    `${isFr ? "Délai" : "Timeline"}: ${data.timeline}`,
    `${isFr ? "Budget" : "Budget"}: ${data.budget}`,
    "",
    data.contextLabels.length > 0
      ? `${isFr ? "Réponses techniques" : "Technical answers"}:\n${data.contextLabels.map((l) => `  - ${l}`).join("\n")}`
      : "",
  ];

  return lines.filter(Boolean).join("\n");
}
