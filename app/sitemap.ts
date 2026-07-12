import type { MetadataRoute } from "next";
import { caseStudiesList } from "@/lib/case-studies";
import { servicesList } from "@/lib/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://services.samensteeve.com";
  const langs = ["fr", "en"];

  // Static pages
  const staticRoutes = [
    { path: "", priority: 1.0 as const, freq: "weekly" as const },
    { path: "/services", priority: 0.9 as const, freq: "monthly" as const },
    { path: "/comment-ca-marche", priority: 0.8 as const, freq: "monthly" as const },
    { path: "/realisations", priority: 0.9 as const, freq: "monthly" as const },
    { path: "/demarrer-un-projet", priority: 0.9 as const, freq: "monthly" as const },
  ];

  const staticEntries = langs.flatMap((lang) =>
    staticRoutes.map((route) => ({
      url: `${baseUrl}/${lang}${route.path}`,
      lastModified: new Date(),
      priority: route.priority,
      changeFrequency: route.freq,
    }))
  );

  // Service pages
  const serviceEntries = langs.flatMap((lang) =>
    servicesList.map((s) => ({
      url: `${baseUrl}/${lang}/services/${s.slug}`,
      lastModified: new Date(),
      priority: 0.8 as const,
      changeFrequency: "monthly" as const,
    }))
  );

  // Case study pages
  const caseStudyEntries = langs.flatMap((lang) =>
    caseStudiesList.map((cs) => ({
      url: `${baseUrl}/${lang}/realisations/${cs.slug}`,
      lastModified: new Date(),
      priority: 0.8 as const,
      changeFrequency: "monthly" as const,
    }))
  );

  return [...staticEntries, ...serviceEntries, ...caseStudyEntries];
}
