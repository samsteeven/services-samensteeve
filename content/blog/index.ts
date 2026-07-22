import { BlogPost, PostMeta } from "./types";

// Import all posts dynamically or directly.
// To keep things simple and typed, we define the metadata here and dynamic/static imports for content.

export const blogMetadata: PostMeta[] = [
  // ─── FRENCH POSTS ───
  {
    slug: "n8n-deploiement-vps-production",
    title: "Déployer n8n en production sur un VPS partagé : retour d'expérience",
    excerpt: "Comment j'ai auto-hébergé n8n sur un VPS déjà en production sans rien casser : isolation Docker, reverse proxy nginx, HTTPS, et les trois incidents de debugging que les tutoriels ne mentionnent pas.",
    date: "2026-07-21",
    tags: ["DevOps", "Docker", "Automatisation", "n8n", "Infrastructure"],
    readTime: 7,
    lang: "fr"
  },
  {
    slug: "securiser-agent-mcp-bdd",
    title: "Injection de prompt applicatif : sécuriser un agent MCP avec accès BDD",
    excerpt: "Comment protéger un agent autonome utilisant le protocole MCP (Model Context Protocol) contre l'exécution de requêtes malveillantes directes sur vos bases PostgreSQL/MySQL.",
    date: "2026-07-12",
    tags: ["IA", "Sécurité", "SQL"],
    readTime: 6,
    lang: "fr"
  },
  {
    slug: "langgraph-destruction-staging",
    title: "Pourquoi mon agent LangGraph a détruit 48h de données de staging",
    excerpt: "Retour d'expérience sur une boucle infinie de décisions d'agent qui a nettoyé nos tables de staging. Analyse de la faille de boucle et de la mise en place de barrières d'isolation.",
    date: "2026-06-28",
    tags: ["IA", "DevOps", "PostgreSQL"],
    readTime: 5,
    lang: "fr"
  },
  {
    slug: "double-facturation-concurrence",
    title: "Anatomie d'une double facturation : concurrence et transactions SQL",
    excerpt: "Comment deux requêtes simultanées de paiement ont contourné nos validations applicatives, le coût réel en production et la mise en œuvre de verrous de ligne lockForUpdate().",
    date: "2026-05-15",
    tags: ["Logiciel", "SQL", "Fintech"],
    readTime: 5,
    lang: "fr"
  },
  {
    slug: "refus-microservices-laravel",
    title: "Pourquoi j'ai refusé de découper ce monolithe Laravel — L'ADR",
    excerpt: "Étude d'une décision d'architecture : pourquoi le passage aux microservices aurait ralenti les livraisons et comment nous avons opté pour un monolithe modulaire hautement performant.",
    date: "2026-04-10",
    tags: ["Logiciel", "Architecture"],
    readTime: 6,
    lang: "fr"
  },
  {
    slug: "migration-mpls-cloud-douala",
    title: "Migration MPLS vers cloud hybride : journal de 6 mois depuis Douala",
    excerpt: "Retour d'expérience sur l'interconnexion de sites distants au Cameroun, la gestion des latences MPLS, les VPN IPSec de secours et la transition progressive vers Azure.",
    date: "2026-03-05",
    tags: ["Cloud", "Réseau", "Terrain"],
    readTime: 7,
    lang: "fr"
  },
  {
    slug: "offline-first-connectivite-60",
    title: "Offline-first avec 60% de SLA réseau : ce que la doc ne dit pas",
    excerpt: "Concevoir des synchronisations de données résilientes pour les agents de terrain dans des zones à faible connectivité. Stratégie de conflits et base de données embarquée.",
    date: "2026-02-18",
    tags: ["Logiciel", "Mobile", "Terrain"],
    readTime: 6,
    lang: "fr"
  },
  {
    slug: "ssrf-webhook-gateway-interne",
    title: "SSRF via webhook : comment un handler HTTP a failli exposer notre réseau",
    excerpt: "Analyse technique d'une vulnérabilité SSRF (Server-Side Request Forgery) sur un service d'intégration et les mesures de filtrage IP et DNS mises en œuvre.",
    date: "2026-01-22",
    tags: ["Sécurité", "Réseau"],
    readTime: 5,
    lang: "fr"
  },
  {
    slug: "audit-owasp-fintech-cameroun",
    title: "Audit de sécurité Fintech : retours sur 3 jours d'analyse offensive",
    excerpt: "Ce que j'ai découvert en auditant une API transactionnelle en Afrique centrale : failles logiques de contournement, injection SQL et défauts de contrôle d'accès.",
    date: "2025-12-10",
    tags: ["Sécurité", "Fintech", "Audit"],
    readTime: 7,
    lang: "fr"
  },

  // ─── ENGLISH POSTS ───
  {
    slug: "n8n-vps-production-deployment",
    title: "Deploying n8n in Production on a Shared VPS: Field Retrospective",
    excerpt: "How I self-hosted n8n on a production VPS without breaking anything: Docker isolation, Nginx reverse proxy, HTTPS, and real-world debugging lessons.",
    date: "2026-07-21",
    tags: ["DevOps", "Docker", "Automation", "n8n", "Infrastructure"],
    readTime: 7,
    lang: "en"
  },
  {
    slug: "securing-mcp-agent-database",
    title: "Application Prompt Injection: Securing an MCP Agent with DB Access",
    excerpt: "How to protect an autonomous agent using the Model Context Protocol (MCP) from executing malicious direct queries on your PostgreSQL/MySQL databases.",
    date: "2026-07-12",
    tags: ["AI", "Security", "SQL"],
    readTime: 6,
    lang: "en"
  },
  {
    slug: "langgraph-staging-data-destruction",
    title: "Why My LangGraph Agent Destroyed 48h of Staging Data",
    excerpt: "A post-mortem on an infinite agent decision loop that cleared our staging tables. Deep dive into the loop failure mode and how we set up isolation barriers.",
    date: "2026-06-28",
    tags: ["AI", "DevOps", "PostgreSQL"],
    readTime: 5,
    lang: "en"
  },
  {
    slug: "concurrent-double-billing-bug",
    title: "Anatomy of a Double Billing: Concurrency & SQL Transactions",
    excerpt: "How two simultaneous payment requests bypassed our application layer validation, the real production cost, and implementing lockForUpdate() row locks.",
    date: "2026-05-15",
    tags: ["Software", "SQL", "Fintech"],
    readTime: 5,
    lang: "en"
  },
  {
    slug: "refusing-laravel-microservices",
    title: "Why I Refused to Split This Laravel Monolith — The ADR",
    excerpt: "An architectural case study: why moving to microservices would have slowed down shipping, and how we structured a high-performing modular monolith instead.",
    date: "2026-04-10",
    tags: ["Software", "Architecture"],
    readTime: 6,
    lang: "en"
  },
  {
    slug: "mpls-hybrid-cloud-migration-douala",
    title: "MPLS to Hybrid Cloud Migration: A 6-Month Log From Douala",
    excerpt: "Lessons learned interconnecting remote branch offices in Cameroon, managing MPLS latency, IPSec VPN failovers, and transitioning to Azure.",
    date: "2026-03-05",
    tags: ["Cloud", "Network", "Field"],
    readTime: 7,
    lang: "en"
  },
  {
    slug: "offline-first-60-percent-connectivity",
    title: "Offline-First with 60% Network SLA: What the Docs Don't Tell You",
    excerpt: "Designing resilient data sync for field agents operating in low-connectivity areas. Conflict resolution strategies and local embedded databases.",
    date: "2026-02-18",
    tags: ["Software", "Mobile", "Field"],
    readTime: 6,
    lang: "en"
  },
  {
    slug: "ssrf-webhook-internal-gateway",
    title: "SSRF via Webhook: How an HTTP Handler Almost Exposed Our Private Network",
    excerpt: "Technical walkthrough of a Server-Side Request Forgery vulnerability found on an integration service, and the IP and DNS level mitigations deployed.",
    date: "2026-01-22",
    tags: ["Security", "Network"],
    readTime: 5,
    lang: "en"
  },
  {
    slug: "owasp-audit-cameroon-fintech",
    title: "Fintech Security Audit: Insights from 3 Days of Offensive Testing",
    excerpt: "What I uncovered auditing a transactional API in Central Africa: logical bypasses, SQL injections, and broken object-level authorization (BOLA) defects.",
    date: "2025-12-10",
    tags: ["Security", "Fintech", "Audit"],
    readTime: 7,
    lang: "en"
  }
];

export async function getPostBySlug(slug: string, lang: "fr" | "en"): Promise<BlogPost | null> {
  const meta = blogMetadata.find(p => p.slug === slug && p.lang === lang);
  if (!meta) return null;

  try {
    const mod = await import(`./posts/${lang}/${slug}`);
    return { meta, Content: mod.default };
  } catch (err) {
    console.error(`Error importing blog post: ${slug} (${lang})`, err);
    return null;
  }
}
