"use client";

import { useState } from "react";
import { getT, type Language } from "@/lib/i18n";
import { services } from "@/lib/services";
import { ScrollReveal } from "./scroll-reveal";
import Link from "next/link";
import { ArrowRight, Code2, Cloud, ShieldCheck, Cpu, Layers, Wrench } from "lucide-react";

// ── SVG Icon Map ──────────────────────────────────────────────────────────
const TOOL_ICONS: Record<string, React.ReactNode> = {
  // Ingénierie Logicielle
  "Laravel": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9l-6 8M9 9v8M15 9v3" />
    </svg>
  ),
  "React": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  "Angular": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <polygon points="12 2 3 5 4.5 17 12 21 19.5 17 21 5 12 2" />
      <path d="M12 6L7.5 15h2l.9-2h3.2l.9 2h2L12 6zm-1 5l1-2.2 1 2.2h-2z" />
    </svg>
  ),
  "TypeScript": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M10 9v8M7 9h6M14 17c1 0 2-.5 2-1.5s-1-1.5-2-2-2-1-2-2 1-1.5 2-1.5 2 .5 2 1" />
    </svg>
  ),
  "Node.js": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M12 2.5L3.5 7.4v9.2L12 21.5l8.5-4.9V7.4L12 2.5z" />
      <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    </svg>
  ),
  "PostgreSQL": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  ),
  "Redis": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polygon points="2 12 12 17 22 12" />
      <polygon points="2 17 12 22 22 17" />
    </svg>
  ),
  "Docker": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M4 13h2v2H4zm3 0h2v2H7zm3 0h2v2h-2zm3 0h2v2h-2zm-9-3h2v2H4zm3 0h2v2H7zm3 0h2v2h-2zm3 0h2v2h-2zm3 0h2v2h-2zm-6-3h2v2h-2zm3 0h2v2h-2z" />
      <path d="M2 16c2 2 6 3 10 3s8-1 10-3c1-2-1-4-3-4h-2" />
    </svg>
  ),
  "GitHub Actions": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),
  "Playwright": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M5 3l14 9-14 9V3z" />
    </svg>
  ),
  "OpenAPI": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="12" cy="12" r="3" />
      <path d="M3 12h6m6 0h6M12 3v6m0 6v6" />
    </svg>
  ),

  // Cloud & Infra
  "AWS": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M6 15c4 3 8 3 12 0M18 13l2 2-2 2" />
      <path d="M6 9l2-4 2 4M14 9l2-4 2 4" />
    </svg>
  ),
  "Azure": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M4 19l4-14h5l-3.5 12h8.5l-2.5 4H4z" />
    </svg>
  ),
  "Terraform": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <polygon points="12 2 4 6.5 4 15.5 12 20 20 15.5 20 6.5 12 2" />
      <line x1="12" y1="2" x2="12" y2="20" />
      <line x1="4" y1="6.5" x2="20" y2="15.5" />
      <line x1="20" y1="6.5" x2="4" y2="15.5" />
    </svg>
  ),
  "Kubernetes": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  "Veeam": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M4 4l8 16L20 4" />
    </svg>
  ),
  "FortiGate": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9h6v6H9z" />
    </svg>
  ),
  "pfSense": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  "IPSec VPN": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  "Microsoft 365": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="3" y="3" width="8" height="8" />
      <rect x="13" y="3" width="8" height="8" />
      <rect x="3" y="13" width="8" height="8" />
      <rect x="13" y="13" width="8" height="8" />
    </svg>
  ),
  "Zabbix": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  "Grafana": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),

  // Audit Sécurité
  "Burp Suite": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2zm0-8h-2V7h2z" />
    </svg>
  ),
  "OWASP ZAP": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  "Nmap": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  ),
  "Nuclei": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  "ffuf": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M4 17l6-6-6-6M12 19h8" />
    </svg>
  ),
  "Metasploit": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  "Wireshark": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M2 12h20M12 2v20" />
    </svg>
  ),
  "Kali Linux": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M4 17l6-6-6-6M12 19h8" />
    </svg>
  ),
  "Semgrep": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  ),
  "Trivy": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  "MobSF": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  "CIS Benchmarks": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),

  // Automatisation IA
  "n8n": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M6 9v6a3 3 0 0 0 3 3h6" />
    </svg>
  ),
  "LangGraph": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <line x1="6" y1="8" x2="12" y2="16" />
      <line x1="18" y1="8" x2="12" y2="16" />
    </svg>
  ),
  "MCP": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
    </svg>
  ),
  "OpenAI API": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
  "Claude": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <polygon points="12 2 2 19 22 19 12 2" />
    </svg>
  ),
  "OpenRouter": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  "Tavily API": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  "Turso": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
    </svg>
  ),
};

// Default fallback icon
const FALLBACK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// ── Categorized Sub-groups Mapping ─────────────────────────────────────────
interface SubGroup {
  label: string;
  tools: string[];
}

const SERVICE_SUBGROUPS: Record<string, SubGroup[]> = {
  "ingenierie-logicielle": [
    {
      label: "Frameworks & Backend Core",
      tools: ["Laravel", "Next.js", "React", "Angular", "TypeScript", "Node.js"]
    },
    {
      label: "Bases de Données & Cache",
      tools: ["PostgreSQL", "Redis"]
    },
    {
      label: "DevOps, Tests & Spécifications",
      tools: ["Docker", "GitHub Actions", "Playwright", "OpenAPI"]
    }
  ],
  "architecture-cloud": [
    {
      label: "Cloud Providers & IaC",
      tools: ["AWS", "Azure", "Terraform", "Kubernetes", "Docker"]
    },
    {
      label: "Réseau, Sécurité & Continuité",
      tools: ["FortiGate", "pfSense", "IPSec VPN", "Veeam", "Microsoft 365"]
    },
    {
      label: "Supervision & Métriques",
      tools: ["Zabbix", "Grafana"]
    }
  ],
  "audit-securite": [
    {
      label: "Audit Web, API & Proxy",
      tools: ["Burp Suite", "OWASP ZAP", "ffuf", "Nuclei"]
    },
    {
      label: "Analyse Réseau & Pentest System",
      tools: ["Nmap", "Metasploit", "Wireshark", "Kali Linux"]
    },
    {
      label: "Code, Containers & Mobile",
      tools: ["Semgrep", "Trivy", "MobSF", "CIS Benchmarks"]
    }
  ],
  "automatisation-ia": [
    {
      label: "Orchestration & Frameworks Agents",
      tools: ["n8n", "LangGraph", "MCP"]
    },
    {
      label: "Modèles & APIs LLM",
      tools: ["OpenAI API", "Claude", "OpenRouter", "Tavily API"]
    },
    {
      label: "Persistance & Context",
      tools: ["Redis", "Turso", "PostgreSQL", "TypeScript", "Docker"]
    }
  ]
};

// ── Service Bento Card Styling Config ──────────────────────────────────────
const BENTO_THEMES: Record<string, {
  num: string;
  icon: typeof Code2;
  accentText: string;
  badgeBg: string;
  badgeBorder: string;
  cardBorder: string;
  cardBg: string;
  hoverBorder: string;
  glowColor: string;
  subGroupLabel: string;
}> = {
  "ingenierie-logicielle": {
    num: "01",
    icon: Code2,
    accentText: "text-violet-400 dark:text-violet-400",
    badgeBg: "bg-violet-500/10 dark:bg-violet-500/15",
    badgeBorder: "border-violet-500/30",
    cardBorder: "border-violet-500/20 dark:border-violet-500/20",
    cardBg: "bg-paper-raised/90 dark:bg-paper-raised/40",
    hoverBorder: "hover:border-violet-500/50",
    glowColor: "shadow-violet-500/5",
    subGroupLabel: "text-violet-400/90 dark:text-violet-400/80"
  },
  "architecture-cloud": {
    num: "02",
    icon: Cloud,
    accentText: "text-sky-400 dark:text-sky-400",
    badgeBg: "bg-sky-500/10 dark:bg-sky-500/15",
    badgeBorder: "border-sky-500/30",
    cardBorder: "border-sky-500/20 dark:border-sky-500/20",
    cardBg: "bg-paper-raised/90 dark:bg-paper-raised/40",
    hoverBorder: "hover:border-sky-500/50",
    glowColor: "shadow-sky-500/5",
    subGroupLabel: "text-sky-400/90 dark:text-sky-400/80"
  },
  "audit-securite": {
    num: "03",
    icon: ShieldCheck,
    accentText: "text-rose-400 dark:text-rose-400",
    badgeBg: "bg-rose-500/10 dark:bg-rose-500/15",
    badgeBorder: "border-rose-500/30",
    cardBorder: "border-rose-500/20 dark:border-rose-500/20",
    cardBg: "bg-paper-raised/90 dark:bg-paper-raised/40",
    hoverBorder: "hover:border-rose-500/50",
    glowColor: "shadow-rose-500/5",
    subGroupLabel: "text-rose-400/90 dark:text-rose-400/80"
  },
  "automatisation-ia": {
    num: "04",
    icon: Cpu,
    accentText: "text-emerald-400 dark:text-emerald-400",
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    badgeBorder: "border-emerald-500/30",
    cardBorder: "border-emerald-500/20 dark:border-emerald-500/20",
    cardBg: "bg-paper-raised/90 dark:bg-paper-raised/40",
    hoverBorder: "hover:border-emerald-500/50",
    glowColor: "shadow-emerald-500/5",
    subGroupLabel: "text-emerald-400/90 dark:text-emerald-400/80"
  }
};

// ── Interactive Bento Tool Item ───────────────────────────────────────────
function BentoToolItem({
  toolName,
  accentTextClass
}: {
  toolName: string;
  accentTextClass: string;
}) {
  const icon = TOOL_ICONS[toolName] ?? FALLBACK_ICON;

  return (
    <div
      className="group/tool relative flex items-center gap-2.5 rounded-xl border border-line/60 bg-paper px-3 py-2 transition-all duration-200 hover:scale-[1.03] hover:border-line hover:bg-paper-raised hover:shadow-md"
    >
      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-paper-raised/80 ${accentTextClass} transition-colors group-hover/tool:scale-110`}>
        {icon}
      </div>
      <span className="font-mono text-[11px] font-semibold text-ink group-hover/tool:text-accent transition-colors whitespace-nowrap">
        {toolName}
      </span>
    </div>
  );
}

// ── Main ToolsIUse Bento Grid Component ──────────────────────────────────
export function ToolsIUse({ lang }: { lang: Language }) {
  const t = getT(lang);
  const section = t.servicesPage.toolsIUse;
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const displayedServices = activeFilter
    ? services.filter(s => s.slug === activeFilter)
    : services;

  return (
    <section
      id="tools-i-use"
      className="border-t border-line/40 bg-paper py-20 transition-all duration-300 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        {/* ── Section Header ─────────────────────────────────────────────── */}
        <ScrollReveal>
          <div className="flex flex-col gap-6 border-b border-line/30 pb-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                <Wrench className="h-3.5 w-3.5" />
                {section.eyebrow}
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl">
                {section.title}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink-soft md:text-base">
              {section.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* ── Service Filter Nav ────────────────────────────────────────── */}
        <ScrollReveal delay={60}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveFilter(null)}
              className={`rounded-full border px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                activeFilter === null
                  ? "border-accent bg-accent text-white shadow-md shadow-accent/20"
                  : "border-line bg-paper-raised text-ink-soft hover:border-accent/40 hover:text-ink"
              }`}
            >
              Tous les services ({services.length})
            </button>
            {services.map(service => {
              const item = t.services.items[service.slug];
              const theme = BENTO_THEMES[service.slug];
              const isSelected = activeFilter === service.slug;

              return (
                <button
                  key={service.slug}
                  onClick={() => setActiveFilter(isSelected ? null : service.slug)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                    isSelected
                      ? `${theme.badgeBorder} ${theme.badgeBg} ${theme.accentText} shadow-md`
                      : "border-line bg-paper-raised text-ink-soft hover:border-accent/40 hover:text-ink"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-current" : "bg-ink-soft/40"}`} />
                  {item.title}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* ── Bento Grid 2x2 ───────────────────────────────────────────── */}
        <div className={`mt-10 grid grid-cols-1 gap-6 ${activeFilter ? "grid-cols-1" : "md:grid-cols-2"}`}>
          {displayedServices.map((service, index) => {
            const item = t.services.items[service.slug];
            const group = section.groups[service.slug];
            const theme = BENTO_THEMES[service.slug];
            const Icon = theme.icon;
            const subGroups = SERVICE_SUBGROUPS[service.slug] ?? [
              { label: "Outils Principaux", tools: group.tools as unknown as string[] }
            ];

            return (
              <ScrollReveal key={service.slug} delay={index * 80}>
                <div
                  id={`tools-${service.slug}`}
                  className={`group relative flex h-full flex-col justify-between rounded-2xl border ${theme.cardBorder} ${theme.cardBg} p-6 sm:p-8 backdrop-blur-md transition-all duration-300 ${theme.hoverBorder} hover:shadow-xl ${theme.glowColor}`}
                >
                  <div>
                    {/* Bento Header */}
                    <div className="flex items-start justify-between gap-4 border-b border-line/30 pb-5">
                      <div className="flex items-center gap-3.5">
                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${theme.badgeBorder} ${theme.badgeBg} ${theme.accentText}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`font-mono text-[10px] font-bold tracking-widest ${theme.accentText}`}>
                              [{theme.num}]
                            </span>
                            <h3 className="font-display text-xl font-extrabold tracking-tight text-ink">
                              {item.title}
                            </h3>
                          </div>
                          <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-ink-soft">
                            {group.tools.length} outils qualifiés
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/${lang}/services/${service.slug}`}
                        className="rounded-full border border-line p-2 text-ink-soft hover:border-accent hover:text-accent transition-colors"
                        title={`Voir le service ${item.title}`}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>

                    {/* Philosophy description */}
                    <p className="mt-4 text-xs leading-relaxed text-ink-soft font-normal">
                      {group.description}
                    </p>

                    {/* Sub-categorized Tool Groups */}
                    <div className="mt-6 space-y-6">
                      {subGroups.map((sub, sIdx) => (
                        <div key={sIdx} className="space-y-2.5">
                          <div className="flex items-center gap-2">
                            <Layers className={`h-3 w-3 ${theme.accentText}`} />
                            <span className={`font-mono text-[10px] font-bold uppercase tracking-widest ${theme.subGroupLabel}`}>
                              {sub.label}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {sub.tools.map(toolName => (
                              <BentoToolItem
                                key={toolName}
                                toolName={toolName}
                                accentTextClass={theme.accentText}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Link */}
                  <div className="mt-8 border-t border-line/20 pt-4 flex items-center justify-between">
                    <Link
                      href={`/${lang}/services/${service.slug}`}
                      className={`inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider ${theme.accentText} hover:underline underline-offset-4`}
                    >
                      <span>Explorer l'offre {item.title}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
        <ScrollReveal delay={120}>
          <div className="mt-12 flex flex-col gap-5 rounded-2xl border border-line bg-paper-raised p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <h4 className="font-display text-base font-bold text-ink">
                Une stack sur mesure adaptée à vos contraintes
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                {section.note}
              </p>
            </div>
            <Link
              href={`/${lang}/demarrer-un-projet`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-widest text-paper hover:bg-accent hover:text-white transition-all duration-200 hover:scale-105 active:scale-[0.96]"
            >
              {t.nav.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
