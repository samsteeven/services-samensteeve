import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummykey");

interface ContactPayload {
  types: string[];
  description: string;
  hasCodebase: string;
  timeline: string;
  teamSize: string;
  name: string;
  email: string;
  whatsapp: string;
  source: string;
  lang: string;
}

const typeLabels: Record<string, string> = {
  web: "Développement Web",
  cloud: "Architecture Cloud",
  security: "Audit Sécurité",
  ai: "Automatisation IA",
  other: "Autre / Pas encore défini",
};

const timelineLabels: Record<string, string> = {
  urgent: "Urgent (< 1 mois)",
  short: "Court terme (1-3 mois)",
  medium: "Moyen terme (3-6 mois)",
  flexible: "Flexible / Sans contrainte",
};

const teamLabels: Record<string, string> = {
  solo: "Aucun développeur (solo)",
  small: "Petite équipe (2-5 pers.)",
  medium: "Équipe moyenne (5-15 pers.)",
  large: "Grande équipe (15+)",
};

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json() as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { types, description, hasCodebase, timeline, teamSize, name, email, whatsapp, source, lang } = payload;

  // Basic server-side validation
  if (!name?.trim() || !email?.trim() || !description?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 422 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  const typeList = (types ?? []).map((t) => typeLabels[t] ?? t).join(", ") || "Non précisé";

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
    <div class="value"><strong>${name}</strong> &lt;${email}&gt;${whatsapp ? `<br>WhatsApp : ${whatsapp}` : ""}</div>
  </div>

  <div class="section">
    <div class="label">Type(s) de projet</div>
    <div class="value">${typeList}</div>
  </div>

  <div class="section">
    <div class="label">Description du projet</div>
    <div class="value" style="white-space: pre-wrap">${description}</div>
  </div>

  <hr class="divider">

  <div class="section">
    <div class="label">Base de code existante</div>
    <div class="value">${hasCodebase === "yes" ? "Oui, projet existant" : "Non, démarrage de zéro"}</div>
  </div>

  <div class="section">
    <div class="label">Délai souhaité</div>
    <div class="value">${timelineLabels[timeline] ?? timeline}</div>
  </div>

  <div class="section">
    <div class="label">Taille de l'équipe technique</div>
    <div class="value">${teamLabels[teamSize] ?? teamSize}</div>
  </div>

  ${source ? `<div class="section">
    <div class="label">Comment ils m'ont trouvé</div>
    <div class="value">${source}</div>
  </div>` : ""}
</div>
</body>
</html>
  `;

  try {
    await resend.emails.send({
      from: "Samen Steeve Services <noreply@samensteeve.com>",
      to: ["samendjiaha@gmail.com"],
      replyTo: email,
      subject: `[Services] Nouveau projet — ${name} (${typeList})`,
      html: htmlContent,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact] Resend error:", err);
    return NextResponse.json({ error: "Email send failed" }, { status: 500 });
  }
}
