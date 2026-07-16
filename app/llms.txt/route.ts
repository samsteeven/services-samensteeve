import { blogMetadata } from "@/content/blog/index";
import { BASE_URL } from "@/lib/metadata";
import { caseStudies } from "@/lib/case-studies";
import { services } from "@/lib/services";
import { getT } from "@/lib/translations";

export const dynamic = "force-static";

export function GET() {
  const t = getT("fr");
  const serviceLines = services.map((service) => {
    const item = t.services.items[service.slug];
    return `- [${item.title}](${BASE_URL}/fr/services/${service.slug}): ${item.shortDesc}`;
  });
  const caseStudyLines = caseStudies.map((caseStudy) => {
    return `- [${caseStudy.fr.title}](${BASE_URL}/fr/realisations/${caseStudy.slug}): ${caseStudy.fr.tagline}`;
  });
  const blogLines = blogMetadata
    .filter((post) => post.lang === "fr")
    .map((post) => `- [${post.title}](${BASE_URL}/fr/blog/${post.slug}): ${post.excerpt}`);

  const body = [
    "# Samen Steeve — Services",
    "",
    "> Ingénierie logicielle, architecture cloud hybride, pentest applicatif et automatisation IA pour systèmes de production.",
    "> Site vitrine public, bilingue FR/EN, lisible par humains, moteurs de recherche et agents IA.",
    "",
    "## Services",
    "",
    ...serviceLines,
    "",
    "## Réalisations",
    "",
    ...caseStudyLines,
    "",
    "## Notes techniques",
    "",
    ...blogLines,
    "",
    "## Agent Discovery",
    "",
    `- [Auth.md](${BASE_URL}/auth.md): Agent registration manifest`,
    `- [Agent Skills](${BASE_URL}/.well-known/agent-skills/index.json): Available reading capabilities`,
    `- [MCP Server Card](${BASE_URL}/.well-known/mcp/server-card.json): Model Context Protocol server metadata`,
    `- [API Catalog](${BASE_URL}/.well-known/api-catalog): REST API catalog following RFC 9727`,
    `- [OAuth Protected Resource](${BASE_URL}/.well-known/oauth-protected-resource): Resource metadata for OAuth agents`,
    `- [OAuth Authorization Server](${BASE_URL}/.well-known/oauth-authorization-server): Authorization server metadata with agent_auth`,
    `- [HTTP Message Signatures Directory](${BASE_URL}/.well-known/http-message-signatures-directory): Web Bot Auth key directory`,
    "",
    "## Contact",
    "",
    "For project inquiries: contact@samensteeve.com",
    "",
    "---",
    "",
    `Canonical site: [services.samensteeve.com](${BASE_URL}/fr).`,
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
