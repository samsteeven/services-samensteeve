import { BASE_URL } from "@/lib/metadata";

export const dynamic = "force-static";

export function GET() {
  const index = {
    $schema: "https://agentskills.io/schema.json",
    skills: [
      {
        name: "services-positioning",
        type: "reading",
        description: "Read Samen Steeve's service positioning and offers",
        url: `${BASE_URL}/fr/services`,
        sha256: "",
      },
      {
        name: "services-case-studies",
        type: "reading",
        description: "Browse production case studies aligned with the service offers",
        url: `${BASE_URL}/fr/realisations`,
        sha256: "",
      },
      {
        name: "services-field-notes",
        type: "reading",
        description: "Read technical field notes about software, cloud, security, and AI automation",
        url: `${BASE_URL}/fr/blog`,
        sha256: "",
      },
      {
        name: "project-intake",
        type: "action",
        description: "Open the public project intake form; submit only with explicit human approval",
        url: `${BASE_URL}/fr/demarrer-un-projet`,
        sha256: "",
      },
    ],
  };

  return Response.json(index, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}
