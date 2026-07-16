import { BASE_URL } from "@/lib/metadata";

export const dynamic = "force-static";

export function GET() {
  const metadata = {
    issuer: BASE_URL,
    authorization_endpoint: "",
    token_endpoint: "",
    revocation_endpoint: "",
    jwks_uri: "",
    grant_types_supported: [],
    response_types_supported: [],
    subject_types_supported: [],
    id_token_signing_alg_values_supported: [],
    service_documentation: `${BASE_URL}/fr/services`,
    agent_auth: {
      skill: `${BASE_URL}/auth.md`,
      register_uri: `${BASE_URL}/auth.md`,
      identity_endpoint: "",
      claim_endpoint: `${BASE_URL}/auth.md`,
      events_endpoint: "",
      identity_types_supported: ["anonymous"],
      anonymous: {
        credential_types_supported: ["none"],
        claim_uri: `${BASE_URL}/auth.md`,
      },
      events_supported: ["agent.registered", "agent.accessed"],
      supported_methods: [
        {
          type: "anonymous",
          description: "No registration required. Access public content directly.",
          credential_type: "none",
        },
      ],
    },
  };

  return Response.json(metadata, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}
