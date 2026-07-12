export interface ServiceData {
  slug: "developpement-web" | "architecture-cloud" | "audit-securite" | "automatisation-ia";
  iconName: string;
}

export const servicesList: ServiceData[] = [
  { slug: "developpement-web", iconName: "Code2" },
  { slug: "architecture-cloud", iconName: "Cloud" },
  { slug: "audit-securite", iconName: "ShieldCheck" },
  { slug: "automatisation-ia", iconName: "Cpu" },
];
