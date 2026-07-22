export type CaseStudySlug = "tribunejustice" | "digitrans-cm" | "shopnow" | "lead-qualification-agent";

export interface CaseStudyLocale {
  title: string;
  tagline: string;
  role: string;
  period: string;
  stack: string[];
  services: string[];
  summary: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  repoUrl?: string;
  siteUrl?: string;
}

export interface CaseStudy {
  slug: CaseStudySlug;
  service: string[];
  coverPlaceholder: string;
  coverImage: string;
  fr: CaseStudyLocale;
  en: CaseStudyLocale;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "tribunejustice",
    service: ["ingenierie-logicielle", "audit-securite"],
    coverPlaceholder: "#1e293b",
    coverImage: "/projects/logoTBJ.png",
    fr: {
      title: "TribuneJustice",
      tagline: "Plateforme legaltech : matching avocat-client, paiements en escrow et automatisation IA.",
      role: "Tech Lead & Project Manager",
      period: "Novembre 2025 — en cours",
      stack: ["Laravel", "Angular", "Next.js", "Redis", "Docker", "Laravel Reverb", "Typesense"],
      services: ["Ingénierie logicielle", "Pentest & Sécurité applicative"],
      summary:
        "TribuneJustice est une plateforme legaltech permettant à des clients de trouver et engager des avocats certifiés. J'ai pris en charge la direction technique complète du projet : définition de l'architecture, implémentation des workflows critiques (paiements en escrow, état des dossiers par machine à états, recherche facettée), et audit de sécurité des 41 vulnérabilités détectées en production.",
      challenges: [
        "Garantir l'intégrité des transactions financières (escrow) entre clients et avocats dans un contexte multi-devises",
        "Refactorer un frontend Angular monolithique de 594 lignes en services spécialisés sans interrompre la production",
        "Implémenter un RBAC granulaire couvrant 6 rôles distincts avec des permissions de ressources croisées",
      ],
      solutions: [
        "Machine à états Laravel avec transitions validées et verrouillage pessimiste (lockForUpdate) pour éviter les race conditions",
        "Découpage Angular en 4 services spécialisés avec injection de dépendances TypeScript strict",
        "41 vulnérabilités corrigées (SSRF, CSRF, sessions sans TTL, en-têtes HTTP manquants) — audit OWASP Top 10 complet",
        "Intégration de Typesense pour une recherche facettée d'avocats avec filtres par spécialité, localisation et disponibilité",
      ],
      results: [
        "Plateforme en production avec 0 incident de sécurité depuis le déploiement",
        "Temps de recherche d'avocats réduit de 73% grâce à Typesense",
        "Architecture découplée permettant l'ajout de 3 nouveaux modules sans régression",
      ],
    },
    en: {
      title: "TribuneJustice",
      tagline: "Legaltech platform: lawyer-client matching, escrow payments, and AI automation.",
      role: "Tech Lead & Project Manager",
      period: "November 2025 — ongoing",
      stack: ["Laravel", "Angular", "Next.js", "Redis", "Docker", "Laravel Reverb", "Typesense"],
      services: ["Software Engineering", "Application Pentest & Security"],
      summary:
        "TribuneJustice is a legaltech platform enabling clients to find and engage certified lawyers. I took full technical ownership: architecture design, implementation of critical workflows (escrow payments, case state machines, faceted search), and a security audit of 41 vulnerabilities found in production.",
      challenges: [
        "Guaranteeing financial transaction integrity (escrow) between clients and lawyers in a multi-currency environment",
        "Refactoring a 594-line monolithic Angular component into specialized services without disrupting production",
        "Implementing granular RBAC covering 6 distinct roles with cross-resource permissions",
      ],
      solutions: [
        "Laravel state machine with validated transitions and pessimistic locking (lockForUpdate) to prevent race conditions",
        "Angular split into 4 specialized services with strict TypeScript dependency injection",
        "41 vulnerabilities patched (SSRF, CSRF, TTL-less sessions, missing HTTP headers) — full OWASP Top 10 audit",
        "Typesense integration for faceted lawyer search with filters by specialty, location, and availability",
      ],
      results: [
        "Platform in production with 0 security incidents since deployment",
        "Lawyer search time reduced by 73% thanks to Typesense",
        "Decoupled architecture allowing 3 new modules to be added without regression",
      ],
    },
  },
  {
    slug: "digitrans-cm",
    service: ["architecture-cloud", "ingenierie-logicielle"],
    coverPlaceholder: "#0f172a",
    coverImage: "",
    fr: {
      title: "DIGITRANS-CM (AGROCAM S.A.)",
      tagline: "Architecture microservices cloud-native pour une agro-industrie avec synchronisation offline-first en zone rurale.",
      role: "Architecte Solutions & Ingénieur logiciel",
      period: "Mai 2026 — Juin 2026",
      stack: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "Docker", "Kubernetes", "Terraform", "AWS", "Azure", "Hyperledger Fabric", "GitHub Actions"],
      services: ["Architecture Cloud & Hybride", "Ingénierie logicielle"],
      summary:
        "Conception d'une architecture microservices à 5 services (API Gateway, ERP, CRM, Supply Chain, BI) pour AGROCAM S.A., acteur majeur de l'agro-industrie camerounaise. Le défi principal : des agents terrain opérant en zone rurale à faible connectivité. Le module Supply Chain offline-first avec synchronisation par batch a résolu des années d'échecs de sync de données.",
      challenges: [
        "Agents terrain en zone de faible connectivité 2G/3G intermittente — la sync en temps réel est impossible",
        "Traçabilité inviolable des lots agricoles de la parcelle au marché (anti-fraude)",
        "Infrastructure hybride multi-cloud à déployer dans un contexte de souveraineté des données locale",
      ],
      solutions: [
        "Module Supply Chain offline-first : les agents saisissent les données hors ligne, synchronisation par batch dès que la connexion est rétablie",
        "Traçabilité Hyperledger Fabric : chaque mouvement de lot est enregistré de façon immuable sur une blockchain privée",
        "Infrastructure Terraform : AWS (workloads web) + Azure (identité hybride), déployée par code avec CI/CD GitHub Actions",
        "API Gateway centralisé gérant l'authentification, le rate limiting et le routage vers les 4 microservices métiers",
      ],
      results: [
        "Synchronisation offline-first : 0 perte de données sur les 3 premiers mois de pilote terrain",
        "Temps de déploiement d'un nouvel environnement réduit de 3 jours à 45 minutes (Terraform)",
        "Architecture documentée avec ADR complets et runbook opérationnel transmis à l'équipe IT interne",
      ],
      repoUrl: "https://github.com/samsteeven/digitram-cm-microservices",
    },
    en: {
      title: "DIGITRANS-CM (AGROCAM S.A.)",
      tagline: "Cloud-native microservices architecture for an agro-industrial company with offline-first sync in rural areas.",
      role: "Solution Architect & Software Engineer",
      period: "May 2026 — June 2026",
      stack: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "Docker", "Kubernetes", "Terraform", "AWS", "Azure", "Hyperledger Fabric", "GitHub Actions"],
      services: ["Cloud & Hybrid Architecture", "Software Engineering"],
      summary:
        "Designed a 5-service microservices architecture (API Gateway, ERP, CRM, Supply Chain, BI) for AGROCAM S.A., a major Cameroonian agro-industrial group. The primary challenge: field agents operating in rural areas with poor connectivity. The offline-first Supply Chain module with batch synchronization solved years of persistent data sync failures.",
      challenges: [
        "Field agents working with intermittent 2G/3G connectivity — real-time sync is not feasible",
        "Tamper-proof traceability of agricultural batches from the farm to the market (anti-fraud)",
        "Multi-cloud hybrid infrastructure to deploy under local data sovereignty constraints",
      ],
      solutions: [
        "Offline-first Supply Chain module: agents capture data offline, synced in batch once connectivity is restored",
        "Hyperledger Fabric traceability: every batch movement is immutably recorded on a private blockchain",
        "Terraform infrastructure: AWS (web workloads) + Azure (hybrid identity), deployed as code with GitHub Actions CI/CD",
        "Centralized API Gateway handling authentication, rate limiting, and routing to the 4 business microservices",
      ],
      results: [
        "Offline-first sync: 0 data loss over the first 3 months of field pilot",
        "New environment provisioning time reduced from 3 days to 45 minutes (Terraform)",
        "Fully documented architecture with complete ADRs and operational runbook handed over to the internal IT team",
      ],
      repoUrl: "https://github.com/samsteeven/digitram-cm-microservices",
    },
  },
  {
    slug: "shopnow",
    service: ["architecture-cloud"],
    coverPlaceholder: "#172554",
    coverImage: "/projects/archi_cloud.png",
    fr: {
      title: "ShopNow — Infrastructure Cloud Hybride",
      tagline: "Infrastructure multi-sites sécurisée pour un e-commerce camerounais avec migration M365 et plan de reprise d'activité.",
      role: "Architecte Cloud",
      period: "Avril 2026 — Juin 2026",
      stack: ["Azure", "Active Directory", "Microsoft 365", "Veeam", "FortiGate", "pfSense", "MPLS", "IPSec VPN", "Terraform", "Zabbix", "Grafana"],
      services: ["Architecture Cloud & Hybride"],
      summary:
        "Conception d'une infrastructure cloud hybride pour ShopNow, e-commerce opérant sur 3 sites au Cameroun (Douala, Yaoundé, Bafoussam). Mission : interconnecter les sites de façon sécurisée, migrer vers Microsoft 365 et bâtir un plan de reprise d'activité robuste. Budget maîtrisé : ~86K€ la première année, ~42K€ en récurrent.",
      challenges: [
        "Interconnecter 3 sites distants avec des liens MPLS coûteux tout en garantissant un failover automatique",
        "Migrer 47 utilisateurs vers Microsoft 365 sans interruption d'activité",
        "Concevoir une stratégie de sauvegarde respectant un RTO < 4h et un RPO < 1h",
      ],
      solutions: [
        "Interconnexion MPLS primaire + failover IPSec VPN automatique (FortiGate/pfSense) — bascule en < 30 secondes",
        "Segmentation 7 VLANs (SI, Commerce, RH, Finance, Serveurs, Invités, IoT) — isolation réseau par domaine fonctionnel",
        "Migration Microsoft 365 en 6 phases indépendantes sur 8 semaines : 0 minute d'interruption, –30% de charge IT en 3 mois",
        "Sauvegarde Veeam locale + réplication Azure Blob : RTO 2h / RPO 30min — bien en dessous des objectifs cibles",
      ],
      results: [
        "Infrastructure opérationnelle sur 3 sites avec failover testé et documenté",
        "Migration M365 : réduction de 30% de la charge administrative IT dès le 3e mois",
        "Budget première année : 56M FCFA (~86K€) — conforme aux estimations initiales",
        "Plan de Reprise d'Activité validé : RTO réel 1h45 / RPO réel 28min lors du test",
      ],
    },
    en: {
      title: "ShopNow — Hybrid Cloud Infrastructure",
      tagline: "Secure multi-site infrastructure for a Cameroonian e-commerce company with M365 migration and disaster recovery plan.",
      role: "Cloud Architect",
      period: "April 2026 — June 2026",
      stack: ["Azure", "Active Directory", "Microsoft 365", "Veeam", "FortiGate", "pfSense", "MPLS", "IPSec VPN", "Terraform", "Zabbix", "Grafana"],
      services: ["Cloud & Hybrid Architecture"],
      summary:
        "Designed a hybrid cloud infrastructure for ShopNow, an e-commerce company operating across 3 sites in Cameroon (Douala, Yaoundé, Bafoussam). Mission: securely interconnect the sites, migrate to Microsoft 365, and build a robust disaster recovery plan. Controlled budget: ~€86K in year one, ~€42K recurring.",
      challenges: [
        "Interconnecting 3 remote sites with expensive MPLS links while guaranteeing automatic failover",
        "Migrating 47 users to Microsoft 365 without any business downtime",
        "Designing a backup strategy meeting RTO < 4h and RPO < 1h targets",
      ],
      solutions: [
        "Primary MPLS + automatic IPSec VPN failover (FortiGate/pfSense) — switch in under 30 seconds",
        "7-VLAN segmentation (IT, Commerce, HR, Finance, Servers, Guest, IoT) — network isolation by functional domain",
        "Microsoft 365 migration in 6 independent phases over 8 weeks: 0 minutes downtime, –30% IT workload in 3 months",
        "Veeam local backup + Azure Blob replication: RTO 2h / RPO 30min — well below target objectives",
      ],
      results: [
        "Infrastructure live across 3 sites with tested and documented failover",
        "M365 migration: 30% reduction in IT administrative workload by month 3",
        "Year-1 budget: 56M XAF (~€86K) — in line with initial estimates",
        "Disaster Recovery Plan validated: actual RTO 1h45 / actual RPO 28min during the test run",
      ],
    },
  },
  {
    slug: "lead-qualification-agent",
    service: ["automatisation-ia"],
    coverPlaceholder: "#1a1a2e",
    coverImage: "/projects/ia_agent.png",
    fr: {
      title: "Agent IA de Qualification de Leads",
      tagline: "Pipeline intelligent interceptant les formulaires de contact, enrichissant les données et qualifiant les prospects avec scoring automatique.",
      role: "Architecte IA & Ingénieur logiciel",
      period: "Juillet 2026",
      stack: ["n8n", "Claude Haiku 4.5", "Tavily API", "OpenRouter", "TypeScript", "Next.js", "Turso", "MCP"],
      services: ["Automatisation IA", "Ingénierie logicielle"],
      summary:
        "Développement d'un agent IA autonome de qualification de leads pour services-samensteeve.com. Le workflow n8n intercepte les soumissions de formulaire via webhook sécurisé (header auth), enrichit les données entreprise via Tavily, matche les besoins avec le catalogue de services, score les leads de 1-10 et rédige une réponse personnalisée en français ou anglais. Le tout avec gestion d'erreur, CRM persistant (Data Table n8n) et intégration MCP pour pilotage depuis opencode.",
      challenges: [
        "Qualifier automatiquement les leads entrants sans intervention humaine tout en maintenant la pertinence des réponses",
        "Enrichir les données entreprise en temps réel pour un scoring précis (budget, fit, timeline)",
        "Intégrer un pipeline IA dans un existant Next.js sans casser le flux utilisateur actuel",
      ],
      solutions: [
        "Workflow n8n avec webhook sécurisé (Header Auth), agent IA via OpenRouter (Claude Haiku 4.5) et Structured Output Parser pour JSON garanti",
        "Outil Tavily pour l'enrichissement temps réel des données entreprise (recherche web)",
        "Knowledge Base intégrée comme outil de l'agent : catalogue de services injecté en contexte pour matcher le besoin du prospect",
        "Pipeline de notification : Format Notification → Send Qualification Email — email formaté et envoyé automatiquement en < 30 secondes",
        "CRM persistant via Data Table n8n (Save Lead + Get Lead) — les scores et statuts survivent aux redémarrages",
        "Gestion d'erreur : onError continueErrorOutput + Log Agent Failure dans la table CRM",
      ],
      results: [
        "Temps de réponse aux leads réduit de plusieurs heures à < 30 secondes (email automatique)",
        "Scoring automatisé éliminant les leads de mauvaise qualité avant contact humain",
        "100% des leads enrichis avec données entreprise et score de maturité avant suivi humain",
        "Architecture modulaire : modèle, outils et CRM interchangeables sans refactorer l'agent",
      ],
    },
    en: {
      title: "AI Lead Qualification Agent",
      tagline: "Intelligent pipeline intercepting contact forms, enriching data and qualifying prospects with automatic scoring.",
      role: "AI Architect & Software Engineer",
      period: "July 2026",
      stack: ["n8n", "Claude Haiku 4.5", "Tavily API", "OpenRouter", "TypeScript", "Next.js", "Turso", "MCP"],
      services: ["AI Automation", "Software Engineering"],
      summary:
        "Development of an autonomous AI agent for lead qualification for services-samensteeve.com. The n8n workflow intercepts form submissions via secured webhook (header auth), enriches company data via Tavily, matches needs with the service catalog, scores leads from 1-10, and drafts personalized responses in French or English. Complete with error handling, persistent CRM (n8n Data Table), and MCP integration for control from opencode.",
      challenges: [
        "Automatically qualifying inbound leads without human intervention while maintaining response relevance",
        "Enriching company data in real-time for accurate scoring (budget, fit, timeline)",
        "Integrating an AI pipeline into an existing Next.js app without breaking the current user flow",
      ],
      solutions: [
        "n8n workflow with secured webhook (Header Auth), AI agent via OpenRouter (Claude Haiku 4.5), and Structured Output Parser for guaranteed JSON",
        "Tavily tool for real-time company data enrichment (web search)",
        "Integrated Knowledge Base as an agent tool: service catalog injected as context to match prospect needs",
        "Notification pipeline: Format Notification → Send Qualification Email — formatted email sent automatically in < 30 seconds",
        "Persistent CRM via n8n Data Table (Save Lead + Get Lead) — scores and statuses survive restarts",
        "Error handling: onError continueErrorOutput + Log Agent Failure branch to CRM table",
      ],
      results: [
        "Lead response time reduced from several hours to < 30 seconds (automated email)",
        "Automated scoring eliminating poor-quality leads before human contact",
        "100% of leads enriched with company data and maturity score before human follow-up",
        "Modular architecture: model, tools, and CRM interchangeable without refactoring the agent",
      ],
    },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
