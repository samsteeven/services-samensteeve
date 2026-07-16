import { BASE_URL } from "@/lib/metadata";

export const dynamic = "force-static";

export function GET() {
  const body = [
    "# Samen Steeve Services — auth.md",
    "",
    `Agent registration manifest for ${BASE_URL}.`,
    "This is a public services website. All marketing pages, case studies, blog posts, and discovery endpoints are publicly readable.",
    "",
    "## Agent Audience",
    "",
    "The target audience for this auth.md is AI agents and automated tools that wish to:",
    "",
    "- Read service descriptions and positioning",
    "- Browse case studies and technical articles",
    "- Understand project intake requirements before contacting Samen Steeve",
    "",
    "## Registration Methods",
    "",
    "### Anonymous",
    "",
    "No registration required. Public content is accessible without tokens.",
    "",
    "1. Discover metadata via `/.well-known/oauth-authorization-server`",
    "2. Use identity type `anonymous` and credential type `none`",
    "3. Request public pages directly, or request Markdown with `Accept: text/markdown`",
    "4. Use scope `public:read` only",
    "",
    "## Credential Usage",
    "",
    "Agents may:",
    "",
    "- Index public pages and structured metadata",
    "- Read `llms.txt`, sitemap, robots.txt, and well-known discovery endpoints",
    "- Read page summaries through `/api/md/...` or content negotiation",
    "- Submit the public contact form only when explicitly instructed by a human user",
    "",
    "Agents must not fabricate availability, pricing, guarantees, certifications, or client claims not present on the site.",
    "",
    "## Contact",
    "",
    "For inquiries about agent access or commercial use: contact@samensteeve.com",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
