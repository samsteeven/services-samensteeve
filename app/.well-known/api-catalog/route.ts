import { BASE_URL } from "@/lib/metadata";

export const dynamic = "force-static";

export function GET() {
  const linkset = [
    {
      anchor: BASE_URL,
      rel: "service-doc",
      href: `${BASE_URL}/fr/services`,
    },
    {
      anchor: BASE_URL,
      rel: "describedby",
      href: `${BASE_URL}/llms.txt`,
      type: "text/markdown",
    },
    {
      anchor: BASE_URL,
      rel: "item",
      href: `${BASE_URL}/fr/realisations`,
      type: "text/html",
    },
    {
      anchor: BASE_URL,
      rel: "item",
      href: `${BASE_URL}/fr/blog`,
      type: "text/html",
    },
  ];

  return Response.json({ linkset }, {
    headers: {
      "Content-Type": "application/linkset+json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
