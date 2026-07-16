import { BASE_URL } from "@/lib/metadata";

export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    "# Content Signals — AI content usage preferences (IETF draft-romm-aipref-contentsignals)",
    "Content-Signal: ai-train=no, search=yes, ai-input=no",
    "",
    "# Specific agent user-agents",
    "User-agent: GPTBot",
    "Content-Signal: ai-train=no, search=yes, ai-input=no",
    "",
    "User-agent: ChatGPT-User",
    "Content-Signal: ai-train=no, search=yes, ai-input=no",
    "",
    "User-agent: CCBot",
    "Content-Signal: ai-train=no",
    "",
    "User-agent: anthropic-ai",
    "Content-Signal: ai-train=no, search=yes, ai-input=no",
    "",
    "User-agent: ClaudeBot",
    "Content-Signal: ai-train=no, search=yes, ai-input=no",
    "",
    "User-agent: Google-Extended",
    "Content-Signal: ai-train=no",
    "",
    "User-agent: PerplexityBot",
    "Content-Signal: search=yes, ai-input=no",
    "",
    "User-agent: Applebot-Extended",
    "Content-Signal: ai-train=no",
    "",
    "# AI agent crawlers — allowed for discovery, no training",
    "User-agent: *-agent",
    "Allow: /",
    "Content-Signal: search=yes, ai-input=no",
    "",
    `Sitemap: ${BASE_URL}/sitemap.xml`,
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
