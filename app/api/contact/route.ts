import { Resend } from "resend";
import { NextResponse } from "next/server";
import { validatePayload, type ContactPayload } from "@/lib/contact/validation";
import { renderContactEmail } from "@/lib/contact/email";
import { CONTACT_EMAIL } from "@/lib/constants";
import { getTursoClient, saveContactSubmission, initializeDatabase } from "@/lib/db/turso";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const isTurnstileRequired = process.env.NODE_ENV === "production";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const requestCounts = new Map<string, { count: number; resetAt: number }>();

interface TurnstileVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
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

  let payload: ContactPayload;

  try {
    payload = await request.json() as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validationError = validatePayload(payload, isTurnstileRequired);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 422 });
  }

  const turnstileOk = await verifyTurnstile(payload.turnstileToken ?? "", ip);
  if (!turnstileOk) {
    return NextResponse.json({ error: "Verification failed" }, { status: 403 });
  }

  // Sauvegarder dans Turso
  try {
    await initializeDatabase();
    await saveContactSubmission({
      name: payload.name,
      email: payload.email,
      company: payload.company,
      role: payload.role,
      whatsapp: payload.whatsapp,
      source: payload.source,
      lang: payload.lang,
      website: payload.website,
      types: payload.types,
      description: payload.description,
      hasCodebase: payload.hasCodebase,
      timeline: payload.timeline,
      teamSize: payload.teamSize,
      budget: payload.budget,
      goals: payload.goals,
      serviceDetails: payload.serviceDetails,
      contextAnswers: payload.contextAnswers,
      links: payload.links,
      ipAddress: ip,
      userAgent: request.headers.get("user-agent") || undefined,
    });
  } catch (err) {
    console.error("[api/contact] Turso save error:", err);
    // On continue quand même avec l'email si Turso échoue
  }

  // Envoyer l'email de notification
  if (!resend) {
    console.error("[api/contact] RESEND_API_KEY is not configured");
    return NextResponse.json({ error: "Email service unavailable" }, { status: 503 });
  }

  const { subject, html } = renderContactEmail(payload, payload.serviceDetails);

  try {
    await resend.emails.send({
      from: `Samen Steeve Services <${CONTACT_EMAIL}>`,
      to: ["samendjiaha@gmail.com"],
      replyTo: payload.email.trim(),
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact] Resend error:", err);
    return NextResponse.json({ error: "Email send failed" }, { status: 500 });
  }
}
