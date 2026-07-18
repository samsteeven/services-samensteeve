import type { MetadataRoute } from "next";
import { blogMetadata } from "@/content/blog/index";
import { caseStudies } from "@/lib/case-studies";
import { services } from "@/lib/services";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;
  const langs = ["fr", "en"];

  // Static pages
  const staticRoutes = [
    { path: "", priority: 1.0 as const, freq: "weekly" as const },
    { path: "/services", priority: 0.9 as const, freq: "monthly" as const },
    { path: "/comment-ca-marche", priority: 0.8 as const, freq: "monthly" as const },
    { path: "/realisations", priority: 0.9 as const, freq: "monthly" as const },
    { path: "/blog", priority: 0.8 as const, freq: "weekly" as const },
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
    services.map((s) => ({
      url: `${baseUrl}/${lang}/services/${s.slug}`,
      lastModified: new Date(),
      priority: 0.8 as const,
      changeFrequency: "monthly" as const,
    }))
  );

  // Case study pages
  const caseStudyEntries = langs.flatMap((lang) =>
    caseStudies.map((cs) => ({
      url: `${baseUrl}/${lang}/realisations/${cs.slug}`,
      lastModified: new Date(),
      priority: 0.8 as const,
      changeFrequency: "monthly" as const,
    }))
  );

  const blogEntries = blogMetadata.map((post) => ({
    url: `${baseUrl}/${post.lang}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.7 as const,
    changeFrequency: "monthly" as const,
  }));

  return [...staticEntries, ...serviceEntries, ...caseStudyEntries, ...blogEntries];
}
