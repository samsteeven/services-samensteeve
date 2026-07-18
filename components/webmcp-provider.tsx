"use client";

import { useEffect } from "react";
import { services } from "@/lib/service-registry";

interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => Promise<Record<string, unknown>>;
}

interface ModelContext {
  registerTool: (tool: WebMcpTool) => void;
}

const BASE = "https://services.samensteeve.com";

function getSiteMetadata() {
  return {
    baseUrl: BASE,
    endpoints: {
      llmsTxt: `${BASE}/llms.txt`,
      sitemap: `${BASE}/sitemap.xml`,
      robotsTxt: `${BASE}/robots.txt`,
      authMd: `${BASE}/auth.md`,
      agentSkills: `${BASE}/.well-known/agent-skills/index.json`,
      mcpServerCard: `${BASE}/.well-known/mcp/server-card.json`,
      apiCatalog: `${BASE}/.well-known/api-catalog`,
      oauthProtectedResource: `${BASE}/.well-known/oauth-protected-resource`,
      oauthAuthorizationServer: `${BASE}/.well-known/oauth-authorization-server`,
      dnsAid: `${BASE}/.well-known/dns-aid`,
    },
  };
}

const tools: WebMcpTool[] = [
  {
    name: "get_services",
    description:
      "List all available services: software engineering, cloud architecture, application pentesting, and AI automation.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
    execute: async () => ({
      services: services.map((s) => ({
        slug: s.slug,
        title: s.mcp.title,
        description: s.mcp.description,
      })),
    }),
  },
  {
    name: "get_service_detail",
    description: "Get detailed information about a specific service by slug.",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description: `Service slug (${services.map((s) => `'${s.slug}'`).join(", ")})`,
        },
        lang: {
          type: "string",
          enum: ["fr", "en"],
          description: "Language code (default: fr)",
        },
      },
      required: ["slug"],
    },
    execute: async (input: Record<string, unknown>) => {
      const slug = input.slug as string;
      const lang = (input.lang as string) || "fr";
      const service = services.find((s) => s.slug === slug);
      return {
        slug,
        lang,
        title: service?.mcp.title ?? slug,
        url: `${BASE}/${lang}/services/${slug}`,
        note: "Fetch the page for full details, or use Accept: text/markdown header for markdown content.",
      };
    },
  },
  {
    name: "get_case_studies",
    description: "List published case studies (réalisations) with titles and taglines.",
    inputSchema: {
      type: "object",
      properties: {
        lang: {
          type: "string",
          enum: ["fr", "en"],
          description: "Language code (default: fr)",
        },
      },
      required: [],
    },
    execute: async (input: Record<string, unknown>) => {
      const lang = (input.lang as string) || "fr";
      return {
        lang,
        url: `${BASE}/${lang}/realisations`,
        note: "Fetch the page for the full list of case studies with links.",
      };
    },
  },
  {
    name: "get_blog_posts",
    description: "List technical blog posts with titles and excerpts.",
    inputSchema: {
      type: "object",
      properties: {
        lang: {
          type: "string",
          enum: ["fr", "en"],
          description: "Language code (default: fr)",
        },
      },
      required: [],
    },
    execute: async (input: Record<string, unknown>) => {
      const lang = (input.lang as string) || "fr";
      return {
        lang,
        url: `${BASE}/${lang}/blog`,
        note: "Fetch the blog index for full post listings.",
      };
    },
  },
  {
    name: "start_project",
    description:
      "Get information about starting a project. Returns the project intake form URL and describes the 6-step process.",
    inputSchema: {
      type: "object",
      properties: {
        lang: {
          type: "string",
          enum: ["fr", "en"],
          description: "Language code (default: fr)",
        },
      },
      required: [],
    },
    execute: async (input: Record<string, unknown>) => {
      const lang = (input.lang as string) || "fr";
      return {
        lang,
        formUrl: `${BASE}/${lang}/demarrer-un-projet`,
        process: "6-step project intake: context, goals, budget, timeline, technical details, recap.",
        responseTime: "24h with technical analysis and concrete proposal.",
        note: "Agents must not submit the form unless explicitly instructed by a human user.",
      };
    },
  },
  {
    name: "get_site_metadata",
    description: "Get site metadata: llms.txt, sitemap, robots.txt, agent discovery endpoints.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
    execute: async () => getSiteMetadata(),
  },
];

export function WebMcpProvider() {
  useEffect(() => {
    const mc = (navigator as unknown as { modelContext?: ModelContext }).modelContext;
    if (!mc?.registerTool) return;

    for (const tool of tools) {
      try {
        mc.registerTool({
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema,
          execute: tool.execute,
        });
      } catch {
        // WebMCP not supported in this browser — fail silently
      }
    }
  }, []);

  return null;
}
