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
  | "developpement-web"
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
    slug: "developpement-web",
    icon: Code2,
    contactType: "web",
    formIcon: Laptop2,
    relatedCaseStudy: "tribunejustice",
    mcp: {
      title: "Ingénierie logicielle",
      description: "Conception, développement et maintenance de systèmes logiciels robustes.",
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
      description: "Conception d'architectures cloud scalables et résilientes.",
    },
  },
  {
    slug: "audit-securite",
    icon: ShieldCheck,
    contactType: "security",
    formIcon: ShieldCheck,
    relatedCaseStudy: "tribunejustice",
    mcp: {
      title: "Pentest & Sécurité applicative",
      description: "Audit de sécurité, tests de pénétration et recommandations.",
    },
  },
  {
    slug: "automatisation-ia",
    icon: Cpu,
    contactType: "ai",
    formIcon: BrainCircuit,
    relatedCaseStudy: "digitrans-cm",
    mcp: {
      title: "Automatisation IA",
      description: "Intégration d'agents IA et d'automatisations intelligentes.",
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
