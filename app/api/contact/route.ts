import { Resend } from "resend";
import { NextResponse } from "next/server";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const isTurnstileRequired = process.env.NODE_ENV === "production";

const MAX_DESCRIPTION_LENGTH = 4_000;
const MAX_TEXT_LENGTH = 200;
const MAX_LINKS = 5;
const MAX_LINK_LENGTH = 500;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const requestCounts = new Map<string, { count: number; resetAt: number }>();

interface ContactPayload {
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
  company?: string;
  role?: string;
  whatsapp: string;
  source: string;
  lang: string;
  website?: string;
  turnstileToken?: string;
}

interface TurnstileVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
}

const typeLabels: Record<string, string> = {
  web: "Ingénierie logicielle",
  cloud: "Architecture Cloud",
  security: "Pentest & Sécurité",
  ai: "Automatisation IA",
  other: "Autre / Pas encore défini",
};

const timelineLabels: Record<string, string> = {
  urgent: "Dès que possible / Urgent",
  short: "Sous 1 à 3 mois",
  medium: "Sous 3 à 6 mois",
  flexible: "J'explore simplement",
};

const budgetLabels: Record<string, string> = {
  small: "2 000 € à 5 000 €",
  medium: "5 000 € à 10 000 €",
  large: "10 000 € à 20 000 €",
  enterprise: "20 000 €+",
};

const goalLabels: Record<string, string> = {
  launch: "Lancer un nouveau produit (SaaS, MVP)",
  automate: "Remplacer ou automatiser des tâches manuelles",
  secure: "Sécuriser des systèmes et données critiques",
  scale: "Passer à l'échelle / améliorer la performance",
  team: "Renforcer et accompagner l'équipe technique",
};

const teamLabels: Record<string, string> = {
  solo: "Aucun développeur (solo)",
  small: "Petite équipe (2-5 pers.)",
  medium: "Équipe moyenne (5-15 pers.)",
  large: "Grande équipe (15+)",
};

const allowedTypes = new Set(Object.keys(typeLabels));
const allowedTimelines = new Set(Object.keys(timelineLabels));
const allowedBudgets = new Set(Object.keys(budgetLabels));
const allowedGoals = new Set(Object.keys(goalLabels));
const allowedTeamSizes = new Set(Object.keys(teamLabels));
const allowedCodebaseValues = new Set(["yes", "no"]);
const allowedLanguages = new Set(["fr", "en"]);

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const current = requestCounts.get(ip);
  if (!current || current.resetAt <= now) {
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) return true;
  current.count += 1;
  return false;
}

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

function validatePayload(payload: ContactPayload): string | null {
  if (payload.website?.trim()) return "Spam rejected";
  if (!isValidChoiceArray(payload.types, allowedTypes, 1)) return "Invalid project types";
  if (!isValidChoiceArray(payload.goals, allowedGoals, 1)) return "Invalid goals";
  if (!allowedTimelines.has(payload.timeline)) return "Invalid timeline";
  if (!allowedBudgets.has(payload.budget)) return "Invalid budget";
  if (!allowedTeamSizes.has(payload.teamSize)) return "Invalid team size";
  if (!allowedCodebaseValues.has(payload.hasCodebase)) return "Invalid codebase value";
  if (!allowedLanguages.has(payload.lang)) return "Invalid language";
  if (!isShortText(payload.name, true)) return "Invalid name";
  if (!isShortText(payload.email, true)) return "Invalid email";
  if (!isShortText(payload.company)) return "Invalid company";
  if (!isShortText(payload.role)) return "Invalid role";
  if (!isShortText(payload.whatsapp)) return "Invalid WhatsApp";
  if (!isShortText(payload.source)) return "Invalid source";
  if (!isValidLinks(payload.links)) return "Invalid links";
  if (!isTurnstileRequired && !payload.turnstileToken) return null;
  if (typeof payload.turnstileToken !== "string" || payload.turnstileToken.length > 2048) {
    return "Invalid verification token";
  }
  if (!payload.turnstileToken.trim()) return "Missing verification token";
  if (typeof payload.description !== "string") return "Invalid description";
  const description = payload.description.trim();
  if (description.length < 20 || description.length > MAX_DESCRIPTION_LENGTH) {
    return "Invalid description length";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
    return "Invalid email";
  }
  return null;
}

async function verifyTurnstile(token: string, remoteip: string): Promise<boolean> {
  const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY?.trim();

  if (!isTurnstileRequired && !turnstileSecretKey && !token) return true;

  if (!turnstileSecretKey) {
    const turnstileEnvKeys = Object.keys(process.env).filter((key) =>
      key.toLowerCase().includes("turnstile"),
    );
    console.error("[api/contact] TURNSTILE_SECRET_KEY is not configured", {
      nodeEnv: process.env.NODE_ENV,
      turnstileEnvKeys,
    });
    return false;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: turnstileSecretKey,
        response: token,
        remoteip,
      }),
      signal: controller.signal,
    });

    if (!response.ok) return false;
    const result = await response.json() as TurnstileVerifyResponse;
    return result.success;
  } catch (err) {
    console.error("[api/contact] Turnstile verification error:", err);
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  if (!resend) {
    console.error("[api/contact] RESEND_API_KEY is not configured");
    return NextResponse.json({ error: "Email service unavailable" }, { status: 503 });
  }

  let payload: ContactPayload;

  try {
    payload = await request.json() as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    types,
    description,
    hasCodebase,
    timeline,
    teamSize,
    budget,
    goals,
    links,
    name,
    email,
    company,
    role,
    whatsapp,
    source,
    lang,
    turnstileToken,
  } = payload;

  const validationError = validatePayload(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 422 });
  }

  const turnstileOk = await verifyTurnstile(turnstileToken ?? "", ip);
  if (!turnstileOk) {
    return NextResponse.json({ error: "Verification failed" }, { status: 403 });
  }

  const typeList = (types ?? []).map((t) => typeLabels[t] ?? escapeHtml(t)).join(", ") || "Non précisé";
  const goalList = (goals ?? []).map((g) => goalLabels[g] ?? escapeHtml(g)).join(", ") || "Non précisé";
  const linksList = (links ?? [])
    .map((l) => l.trim())
    .filter(Boolean)
    .map(escapeHtml)
    .join("<br>") || "Aucun lien fourni";

  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeDescription = escapeHtml(description.trim());
  const safeCompany = company ? escapeHtml(company.trim()) : "";
  const safeRole = role ? escapeHtml(role.trim()) : "";
  const safeWhatsapp = whatsapp ? escapeHtml(whatsapp.trim()) : "";
  const safeSource = source ? escapeHtml(source.trim()) : "";
  const timelineLabel = timelineLabels[timeline] ?? escapeHtml(timeline);
  const budgetLabel = budgetLabels[budget] ?? `Non précisé (${escapeHtml(budget)})`;
  const teamLabel = teamLabels[teamSize] ?? escapeHtml(teamSize);
  const subjectName = name.trim().replace(/[\r\n]+/g, " ");
  const subjectTypes = typeList.replace(/[\r\n]+/g, " ");

  const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
  body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #0f172a; background: #f4f6f9; padding: 20px; }
  .card { background: #fff; border-radius: 12px; padding: 32px; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; }
  .badge { display: inline-block; background: #4f46e5; color: #fff; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 4px 10px; border-radius: 999px; margin-bottom: 24px; }
  h1 { font-size: 22px; font-weight: 800; margin: 0 0 8px; }
  .meta { font-size: 12px; color: #475569; margin-bottom: 24px; }
  .section { margin: 20px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; }
  .label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 6px; }
  .value { font-size: 14px; color: #0f172a; line-height: 1.6; }
  .divider { border: none; border-top: 1px solid #e2e8f0; margin: 20px 0; }
  .highlight { background: #eef2ff; border-color: #818cf8; }
</style></head>
<body>
<div class="card">
  <div class="badge">services.samensteeve.com</div>
  <h1>🚀 Nouveau projet entrant</h1>
  <p class="meta">Reçu depuis le formulaire de contact · Langue : ${lang === "fr" ? "Français" : "English"}</p>

  <div class="section highlight">
    <div class="label">Contact</div>
    <div class="value">
      <strong>${safeName}</strong> &lt;${safeEmail}&gt;
      ${safeCompany ? `<br>Entreprise : ${safeCompany}` : ""}
      ${safeRole ? `<br>Rôle : ${safeRole}` : ""}
      ${safeWhatsapp ? `<br>WhatsApp : ${safeWhatsapp}` : ""}
    </div>
  </div>

  <div class="section">
    <div class="label">Type(s) de projet</div>
    <div class="value">${typeList}</div>
  </div>

  <div class="section">
    <div class="label">Description du projet</div>
    <div class="value" style="white-space: pre-wrap">${safeDescription}</div>
  </div>

  <div class="section">
    <div class="label">Objectifs clés visés</div>
    <div class="value">${goalList}</div>
  </div>

  <div class="section">
    <div class="label">Budget estimé</div>
    <div class="value">${budgetLabel}</div>
  </div>

  <div class="section">
    <div class="label">Liens fournis</div>
    <div class="value" style="word-break: break-all;">${linksList}</div>
  </div>

  <hr class="divider">

  <div class="section">
    <div class="label">Base de code existante</div>
    <div class="value">${hasCodebase === "yes" ? "Oui, projet existant" : "Non, démarrage de zéro"}</div>
  </div>

  <div class="section">
    <div class="label">Quand commencer</div>
    <div class="value">${timelineLabel}</div>
  </div>

  <div class="section">
    <div class="label">Taille de l'équipe technique</div>
    <div class="value">${teamLabel}</div>
  </div>

  ${safeSource ? `<div class="section">
    <div class="label">Comment ils m'ont trouvé</div>
    <div class="value">${safeSource}</div>
  </div>` : ""}
</div>
</body>
</html>
  `;

  try {
    await resend.emails.send({
      from: "Samen Steeve Services <contact@samensteeve.com>",
      to: ["samendjiaha@gmail.com"],
      replyTo: email.trim(),
      subject: `[Services] Nouveau projet — ${subjectName} (${subjectTypes})`,
      html: htmlContent,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact] Resend error:", err);
    return NextResponse.json({ error: "Email send failed" }, { status: 500 });
  }
}
