import { BASE_URL } from "@/lib/metadata";

export const dynamic = "force-static";

export function GET() {
  const metadata = {
    resource: BASE_URL,
    authorization_servers: [BASE_URL],
    scopes_supported: ["public:read"],
    bearer_methods_supported: ["header"],
    resource_documentation: `${BASE_URL}/fr/services`,
  };

  return Response.json(metadata, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}
