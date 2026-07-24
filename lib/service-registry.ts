import {
  Code2,
  Cloud,
  ShieldCheck,
  Cpu,
  Laptop2,
  BrainCircuit,
  HelpCircle,
} from "lucide-react";
import type { ComponentType } from "react";

export type ServiceSlug =
  | "ingenierie-logicielle"
  | "architecture-cloud"
  | "audit-securite"
  | "automatisation-ia";

export type ContactTypeKey = "web" | "cloud" | "security" | "ai" | "other";

export interface ServiceConfig {
  slug: ServiceSlug;
  icon: ComponentType<{ className?: string }>;
  contactType: ContactTypeKey;
  formIcon: ComponentType<{ className?: string }>;
  relatedCaseStudy: string | null;
  mcp: {
    title: string;
    description: string;
  };
}

export const services: ServiceConfig[] = [
  {
    slug: "ingenierie-logicielle",
    icon: Code2,
    contactType: "web",
    formIcon: Laptop2,
    relatedCaseStudy: "tribunejustice",
    mcp: {
      title: "Ingénierie Logicielle",
      description: "Conception, développement et industrialisation de logiciels de production robustes : architecture, APIs, backends critiques et interfaces métier.",
    },
  },
  {
    slug: "architecture-cloud",
    icon: Cloud,
    contactType: "cloud",
    formIcon: Cloud,
    relatedCaseStudy: "shopnow",
    mcp: {
      title: "Architecture Cloud & Hybride",
      description: "Infrastructures cloud et hybrides résilientes (AWS/Azure) : interconnexion multi-sites, basculement automatique, tolérance aux coupures et maîtrise des coûts.",
    },
  },
  {
    slug: "audit-securite",
    icon: ShieldCheck,
    contactType: "security",
    formIcon: ShieldCheck,
    relatedCaseStudy: "tribunejustice",
    mcp: {
      title: "Audit Sécurité & Pentest",
      description: "Analyse d'exposition, tests d'intrusion (infra/applicatif) et audit cloud (AWS/Azure/GCP) orientés décision et remédiation.",
    },
  },
  {
    slug: "automatisation-ia",
    icon: Cpu,
    contactType: "ai",
    formIcon: BrainCircuit,
    relatedCaseStudy: "lead-qualification-agent",
    mcp: {
      title: "Automatisation IA",
      description: "Automatisation de processus réels : agents IA supervisables (MCP, LangGraph) connectés à vos outils et données métier.",
    },
  },
];

export const OTHER_CONTACT_TYPE = {
  key: "other" as const,
  icon: HelpCircle,
};

export function getServiceBySlug(slug: string): ServiceConfig | undefined {
  return services.find((s) => s.slug === slug);
}

export function getContactTypeFromSlug(slug: string): ContactTypeKey | undefined {
  return getServiceBySlug(slug)?.contactType;
}

export function getContactTypeIcon(
  contactType: ContactTypeKey,
): ComponentType<{ className?: string }> {
  if (contactType === "other") return OTHER_CONTACT_TYPE.icon;
  return (
    services.find((s) => s.contactType === contactType)?.formIcon ?? OTHER_CONTACT_TYPE.icon
  );
}
