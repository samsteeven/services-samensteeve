import type { FormData } from "./types";

export interface ContactApiAdapter {
  submit(data: FormData, lang: string): Promise<{ ok: boolean; error?: string }>;
}

export class FetchContactApiAdapter implements ContactApiAdapter {
  async submit(data: FormData, lang: string): Promise<{ ok: boolean; error?: string }> {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          description: buildDescription(data),
          lang,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        return { ok: false, error: body?.error ?? "Submission failed" };
      }

      return { ok: true };
    } catch {
      return { ok: false, error: "Network error" };
    }
  }
}

function buildDescription(data: FormData): string {
  const parts: string[] = [];
  if (data.description) parts.push(data.description.trim());
  if (data.types.length) parts.push(`Types: ${data.types.join(", ")}`);
  if (data.goals.length) parts.push(`Goals: ${data.goals.join(", ")}`);
  if (data.timeline) parts.push(`Timeline: ${data.timeline}`);
  if (data.budget) parts.push(`Budget: ${data.budget}`);
  return parts.join("\n\n");
}
