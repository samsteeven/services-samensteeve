import { BASE_URL } from "@/lib/metadata";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

export function GET() {
  const domain = new URL(SITE_URL).host;

  const dnsAid = {
    $schema: "https://isitagentready.com/schemas/dns-aid/v1",
    domain,
    description: "DNS for AI Discovery (DNS-AID) records for agent discovery on this domain.",
    draft: "https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/",
    records: [
      {
        type: "SVCB",
        name: `_index._agents.${domain}`,
        ttl: 3600,
        rdata: `1 ${domain} alpn="mcp,h2,h3" port=443 mandatory=alpn,port`,
        purpose: "Organizational agent index — entry point for agents to discover available services.",
      },
      {
        type: "SVCB",
        name: `_mcp._agents.${domain}`,
        ttl: 3600,
        rdata: `1 ${domain} alpn="mcp,h2,h3" port=443 mandatory=alpn,port`,
        purpose: "MCP agent endpoint — exposes Model Context Protocol tools via WebMCP.",
      },
      {
        type: "TXT",
        name: `_agents.${domain}`,
        ttl: 3600,
        rdata: `"v=dnsaid; proto=mcp; endpoint=${BASE_URL}/.well-known/mcp/server-card.json"`,
        purpose: "TXT fallback for DNS-AID discovery with protocol and endpoint metadata.",
      },
    ],
    dnssec: "Enable DNSSEC signing on the zone at your DNS provider (Cloudflare, Vercel, etc.) to ensure validating resolvers return authenticated data.",
    setup: {
      instructions: "Add these records at your DNS provider. The SVCB records require RFC 9460 support. If your provider does not support SVCB, use the TXT fallback record.",
      cloudflare: "DNS > Records > Add record. For SVCB, use type 'SVCB' if available, otherwise add as TXT.",
      verification: `POST ${BASE_URL}/api/scan with {"url": "${BASE_URL}"} and check checks.discoverability.dnsAid.status === "pass"`,
    },
  };

  return Response.json(dnsAid, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
