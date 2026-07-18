import { getT, type Language } from "@/lib/i18n";
import type { ContactPayload } from "./validation";

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function resolveGoalLabel(t: ReturnType<typeof getT>, goalKey: string): string {
  const generic = t.contact.fields.goalsOptions[goalKey as keyof typeof t.contact.fields.goalsOptions];
  if (generic) return generic;

  for (const serviceGoals of Object.values(t.contact.fields.serviceGoals)) {
    const label = serviceGoals.options[goalKey as keyof typeof serviceGoals.options];
    if (label) return label;
  }

  return goalKey;
}

function resolveContextAnswerLabels(
  t: ReturnType<typeof getT>,
  contextAnswers: Record<string, string>,
): string {
  return Object.entries(contextAnswers)
    .map(([key, value]) => {
      const [type, questionKey] = key.split(".");
      const group = t.contact.fields.contextGroups[type as keyof typeof t.contact.fields.contextGroups];
      const question = group?.questions.find((q) => q.key === questionKey);
      const questionLabel = question?.label ?? key;
      const option = question?.options.find((o) => o.value === value);
      const optionLabel = option?.label ?? value;
      return `<p style="margin: 0 0 8px;"><strong>${escapeHtml(questionLabel)}</strong> : ${escapeHtml(optionLabel)}</p>`;
    })
    .join("");
}

export function renderContactEmail(
  payload: ContactPayload,
  serviceDetails: Record<string, string>,
): { subject: string; html: string } {
  const t = getT(payload.lang as Language);
  const {
    types, description, timeline, budget, goals,
    contextAnswers, links, name, email, company,
    role, whatsapp, source, lang,
  } = payload;

  const typeList = (types ?? []).map((key) => t.contact.fields.types[key as keyof typeof t.contact.fields.types] ?? escapeHtml(key)).join(", ") || "Non précisé";
  const goalList = (goals ?? []).map((g) => resolveGoalLabel(t, g)).join(", ") || "Non précisé";
  const linksList = (links ?? [])
    .map((l) => l.trim())
    .filter(Boolean)
    .map(escapeHtml)
    .join("<br>") || "Aucun lien fourni";

  const serviceDetailsList = (types ?? [])
    .map((type) => {
      const label = t.contact.fields.types[type as keyof typeof t.contact.fields.types] ?? escapeHtml(type);
      const detail = escapeHtml(serviceDetails[type]?.trim() ?? "");
      if (!detail) return "";
      return `<p style="margin: 0 0 14px;"><strong>${label}</strong><br><span style="white-space: pre-wrap;">${detail}</span></p>`;
    })
    .filter(Boolean)
    .join("") || "Non précisé";

  const contextAnswersList = Object.keys(contextAnswers ?? {}).length > 0
    ? resolveContextAnswerLabels(t, contextAnswers)
    : "Non précisé";

  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeDescription = escapeHtml(description.trim());
  const safeCompany = company ? escapeHtml(company.trim()) : "";
  const safeRole = role ? escapeHtml(role.trim()) : "";
  const safeWhatsapp = whatsapp ? escapeHtml(whatsapp.trim()) : "";
  const safeSource = source ? escapeHtml(source.trim()) : "";
  const timelineLabel = t.contact.fields.timelineOptions[timeline as keyof typeof t.contact.fields.timelineOptions] ?? escapeHtml(timeline);
  const budgetLabel = t.contact.fields.budgetOptions[budget as keyof typeof t.contact.fields.budgetOptions] ?? `Non précisé (${escapeHtml(budget)})`;
  const subjectName = name.trim().replace(/[\r\n]+/g, " ");
  const subjectTypes = typeList.replace(/[\r\n]+/g, " ");

  const html = `
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
    <div class="label">Contexte spécifique par service</div>
    <div class="value">${serviceDetailsList}</div>
  </div>

  <div class="section">
    <div class="label">Réponses techniques ciblées</div>
    <div class="value">${contextAnswersList}</div>
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
    <div class="label">Quand commencer</div>
    <div class="value">${timelineLabel}</div>
  </div>

  ${safeSource ? `<div class="section">
    <div class="label">Comment ils m'ont trouvé</div>
    <div class="value">${safeSource}</div>
  </div>` : ""}
</div>
</body>
</html>
  `;

  return {
    subject: `[Services] Nouveau projet — ${subjectName} (${subjectTypes})`,
    html,
  };
}
