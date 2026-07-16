import { BASE_URL } from "@/lib/metadata";

export const dynamic = "force-static";

export function GET() {
  const card = {
    $schema: "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json",
    name: "com.samensteeve/services",
    version: "1.0.0",
    description: "Services site for software engineering, cloud architecture, application pentesting, and AI automation.",
    title: "Samen Steeve Services",
    websiteUrl: BASE_URL,
    remotes: [
      {
        type: "streamable-http",
        url: BASE_URL,
      },
    ],
  };

  return Response.json(card, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}
