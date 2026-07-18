const MAX_DESCRIPTION_LENGTH = 4_000;
const MAX_SERVICE_DETAIL_LENGTH = 1_200;
const MAX_CONTEXT_ANSWER_LENGTH = 80;
const MAX_TEXT_LENGTH = 200;
const MAX_LINKS = 5;
const MAX_LINK_LENGTH = 500;

export interface ContactPayload {
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
  company?: string;
  role?: string;
  whatsapp: string;
  source: string;
  lang: string;
  website?: string;
  turnstileToken?: string;
}

const VALID_TYPES = new Set(["web", "cloud", "security", "ai", "other"]);
const VALID_TIMELINES = new Set(["urgent", "short", "medium", "flexible"]);
const VALID_BUDGETS = new Set(["small", "medium", "large", "enterprise"]);
const VALID_GOALS = new Set([
  "launch", "automate", "secure", "scale", "team",
  "web_mvp", "web_platform", "web_api", "web_refactor",
  "cloud_migration", "cloud_resilience", "cloud_cost", "cloud_observability",
  "security_pentest", "security_remediation", "security_compliance", "security_hardening",
  "ai_workflow", "ai_agent", "ai_data", "ai_integration",
  "other_scope", "other_prioritize", "other_architecture", "other_roadmap",
]);
const VALID_TEAM_SIZES = new Set(["solo", "small", "medium", "large"]);
const VALID_CODEBASE = new Set(["yes", "no"]);
const VALID_LANGUAGES = new Set(["fr", "en"]);

const SERVICE_CONTEXT_KEYS: Record<string, string[]> = {
  web: ["stage", "codebase", "users", "integration"],
  cloud: ["current", "provider", "criticality", "operations"],
  security: ["target", "environment", "authorization", "constraints"],
  ai: ["process", "data", "humanReview", "systems"],
  other: ["clarity", "constraint", "decision", "stakeholders"],
};

export { SERVICE_CONTEXT_KEYS };

function isShortText(value: unknown, required = false): value is string {
  if (!required && value == null) return true;
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (required && !trimmed) return false;
  return trimmed.length <= MAX_TEXT_LENGTH;
}

function isValidChoiceArray(value: unknown, allowed: Set<string>, min = 0): value is string[] {
  return Array.isArray(value)
    && value.length >= min
    && value.length <= allowed.size
    && value.every((item) => typeof item === "string" && allowed.has(item));
}

function isValidLinks(value: unknown): value is string[] {
  return Array.isArray(value)
    && value.length <= MAX_LINKS
    && value.every((link) => typeof link === "string" && link.length <= MAX_LINK_LENGTH);
}

function isValidServiceDetails(value: unknown, selectedTypes: string[]): value is Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  const entries = Object.entries(value);
  return entries.every(([key, detail]) =>
    VALID_TYPES.has(key)
    && selectedTypes.includes(key)
    && typeof detail === "string"
    && detail.trim().length <= MAX_SERVICE_DETAIL_LENGTH,
  );
}

function isValidContextAnswers(value: unknown, selectedTypes: string[]): value is Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const allowedKeys = new Set(
    selectedTypes.flatMap((type) => (SERVICE_CONTEXT_KEYS[type] ?? []).map((key) => `${type}.${key}`)),
  );
  const entriesAreValid = Object.entries(value).every(([key, answer]) =>
    allowedKeys.has(key)
    && typeof answer === "string"
    && answer.trim().length > 0
    && answer.trim().length <= MAX_CONTEXT_ANSWER_LENGTH,
  );
  const requiredAnswersExist = Array.from(allowedKeys).every((key) => {
    const answer = (value as Record<string, unknown>)[key];
    return typeof answer === "string" && answer.trim().length > 0;
  });
  return entriesAreValid && requiredAnswersExist;
}

export function validatePayload(payload: ContactPayload, isTurnstileRequired: boolean): string | null {
  if (payload.website?.trim()) return "Spam rejected";
  if (!isValidChoiceArray(payload.types, VALID_TYPES, 1)) return "Invalid project types";
  if (!isValidChoiceArray(payload.goals, VALID_GOALS, 1)) return "Invalid goals";
  if (!VALID_TIMELINES.has(payload.timeline)) return "Invalid timeline";
  if (!VALID_BUDGETS.has(payload.budget)) return "Invalid budget";
  if (payload.teamSize && !VALID_TEAM_SIZES.has(payload.teamSize)) return "Invalid team size";
  if (payload.hasCodebase && !VALID_CODEBASE.has(payload.hasCodebase)) return "Invalid codebase value";
  if (!VALID_LANGUAGES.has(payload.lang)) return "Invalid language";
  if (!isShortText(payload.name, true)) return "Invalid name";
  if (!isShortText(payload.email, true)) return "Invalid email";
  if (!isShortText(payload.company)) return "Invalid company";
  if (!isShortText(payload.role)) return "Invalid role";
  if (!isShortText(payload.whatsapp)) return "Invalid WhatsApp";
  if (!isShortText(payload.source)) return "Invalid source";
  if (!isValidLinks(payload.links)) return "Invalid links";
  if (!isValidServiceDetails(payload.serviceDetails, payload.types)) return "Invalid service details";
  if (!isValidContextAnswers(payload.contextAnswers, payload.types)) return "Invalid context answers";
  if (!isTurnstileRequired && !payload.turnstileToken) return null;
  if (typeof payload.turnstileToken !== "string" || payload.turnstileToken.length > 2048) {
    return "Invalid verification token";
  }
  if (!payload.turnstileToken.trim()) return "Missing verification token";
  if (typeof payload.description !== "string") return "Invalid description";
  const description = payload.description.trim();
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return "Invalid description length";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
    return "Invalid email";
  }
  return null;
}
