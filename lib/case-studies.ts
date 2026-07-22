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
      tagline: "Refonte technique et audit sécurité d'une plateforme legaltech en production — 41 vulnérabilités fermées, 0 interruption de service.",
      role: "Tech Lead & Project Manager",
      period: "Novembre 2025 — en cours",
      stack: ["Laravel", "Angular", "Next.js", "Redis", "Docker", "Laravel Reverb", "Typesense"],
      services: ["Ingénierie logicielle", "Pentest & Sécurité applicative"],
      summary:
        "TribuneJustice connecte des clients à des avocats certifiés, avec paiements en escrow et suivi de dossiers en temps réel. Quand je suis arrivé en tant que Tech Lead, la plateforme était en production avec une dette technique critique : un composant Angular de 594 lignes gérant tout le frontend, des sessions sans TTL, des endpoints exposés à SSRF. La mission : refactorer sans interrompre, sécuriser sans reconstruire depuis zéro.",
      challenges: [
        "Une plateforme en production avec des clients actifs — chaque changement architectural risque de casser un parcours utilisateur en cours",
        "41 vulnérabilités détectées dont des SSRF exploitables et des sessions persistantes sans expiration — les corriger sans modifier le comportement fonctionnel visible",
        "Les paiements en escrow impliquent une double intégrité : données financières cohérentes ET transitions d'état irréversibles — les deux doivent être atomiques",
      ],
      solutions: [
        "Verrouillage pessimiste (lockForUpdate) sur les transitions d'état des dossiers — une requête concurrente ne peut pas corrompre un paiement en cours, même sous charge",
        "Découpage Angular en 4 services spécialisés avec injection de dépendances TypeScript strict — chaque service déployable et testable indépendamment",
        "Audit OWASP Top 10 complet : headers CSP/HSTS ajoutés, sessions bornées, endpoints SSRF corrigés par liste blanche d'URLs autorisées",
        "Intégration Typesense : index facetté avec filtres par spécialité, ville et disponibilité — remplace une recherche SQL lente et non-scalable",
      ],
      results: [
        "0 incident de sécurité en production depuis le déploiement du patch complet",
        "Temps de recherche d'un avocat réduit de 73% — de 8 secondes SQL à < 300ms Typesense",
        "Architecture découplée : 3 modules ajoutés depuis sans toucher au code existant",
      ],
    },
    en: {
      title: "TribuneJustice",
      tagline: "Security audit and technical refactor of a live legaltech platform — 41 vulnerabilities closed, zero service interruption.",
      role: "Tech Lead & Project Manager",
      period: "November 2025 — ongoing",
      stack: ["Laravel", "Angular", "Next.js", "Redis", "Docker", "Laravel Reverb", "Typesense"],
      services: ["Software Engineering", "Application Pentest & Security"],
      summary:
        "TribuneJustice connects clients with certified lawyers, handling escrow payments and real-time case tracking. When I joined as Tech Lead, the platform was already in production with active users — and 41 open vulnerabilities, a 594-line monolithic Angular component, and TTL-less sessions. The mandate: refactor without breaking, secure without rebuilding.",
      challenges: [
        "A live platform with active users — every architectural change risks disrupting an ongoing user journey",
        "41 detected vulnerabilities including exploitable SSRF and persistent sessions with no expiration — patching them without altering visible functional behavior",
        "Escrow payments require dual integrity: consistent financial data AND irreversible state transitions — both must be atomic",
      ],
      solutions: [
        "Pessimistic locking (lockForUpdate) on case state transitions — concurrent requests cannot corrupt an in-progress payment, even under load",
        "Angular split into 4 specialized services with strict TypeScript dependency injection — each independently deployable and testable",
        "Full OWASP Top 10 audit: CSP/HSTS headers added, sessions bounded, SSRF endpoints patched with URL allowlists",
        "Typesense integration: faceted index with filters by specialty, city, and availability — replacing a slow, non-scalable SQL search",
      ],
      results: [
        "Zero security incidents in production since the full patch deployment",
        "Lawyer search time reduced by 73% — from 8s SQL to under 300ms with Typesense",
        "Decoupled architecture: 3 modules added since without modifying existing code",
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
      tagline: "5 microservices pour une agro-industrie camerounaise — conçus pour des agents terrain sans internet et une traçabilité inviolable de la parcelle au marché.",
      role: "Architecte Solutions & Ingénieur logiciel",
      period: "Mai 2026 — Juin 2026",
      stack: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "Docker", "Kubernetes", "Terraform", "AWS", "Azure", "Hyperledger Fabric", "GitHub Actions"],
      services: ["Architecture Cloud & Hybride", "Ingénierie logicielle"],
      summary:
        "AGROCAM S.A. gérait l'intégralité de son opération agro-industrielle sur un système monolithique vieillissant. Le problème n'était pas la scalabilité technique — c'était que les agents terrain en zone rurale n'avaient aucun moyen d'enregistrer leurs opérations sans connexion internet. Et que la chaîne d'approvisionnement n'avait aucune traçabilité immuable, pourtant obligatoire pour la conformité alimentaire. L'objectif : un système distribué pensé pour les contraintes africaines réelles, pas pour un datacenter européen.",
      challenges: [
        "Des agents terrain en zones 2G/3G intermittentes : toute architecture nécessitant une connexion permanente est inutilisable sur le terrain",
        "La loi camerounaise n°2010/012 interdit de stocker les données RH et financières hors du territoire — le 100% cloud public est illégal",
        "La filière alimentaire exige une traçabilité lot-par-lot inaltérable — un enregistrement modifiable après coup est une faille de conformité",
      ],
      solutions: [
        "Module Supply Chain offline-first : les agents saisissent hors ligne, la sync par batch se déclenche automatiquement dès que le signal revient — avec déduplication par offline_id côté serveur",
        "Blockchain Hyperledger Fabric privée : chaque mouvement de lot est enregistré de façon immuable via chaincode — verifyChainIntegrity() valide la continuité de toute la chaîne",
        "Infrastructure hybride Terraform : AWS af-south-1 pour les workloads web, Azure pour l'identité d'entreprise, on-premise Douala pour les données réglementées — déployée par code, 0 intervention manuelle",
      ],
      results: [
        "0 perte de données terrain sur les 3 premiers mois de pilote — y compris lors de coupures réseau prolongées",
        "Provisioning d'un nouvel environnement : de 3 jours à 45 minutes grâce à Terraform",
        "Conformité légale complète : données RH et financières sur site à Douala, auditables à tout moment",
      ],
      repoUrl: "https://github.com/samsteeven/digitram-cm-microservices",
    },
    en: {
      title: "DIGITRANS-CM (AGROCAM S.A.)",
      tagline: "5 microservices for a Cameroonian agro-industrial group — built for offline field agents and tamper-proof traceability from farm to market.",
      role: "Solution Architect & Software Engineer",
      period: "May 2026 — June 2026",
      stack: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "Docker", "Kubernetes", "Terraform", "AWS", "Azure", "Hyperledger Fabric", "GitHub Actions"],
      services: ["Cloud & Hybrid Architecture", "Software Engineering"],
      summary:
        "AGROCAM S.A. ran its entire agro-industrial operation on an aging monolith. The real problem wasn't scalability — it was that field agents working in rural areas had no way to log operations without internet. And the supply chain had no immutable audit trail, a critical compliance gap for a food-grade producer. The goal: a distributed system designed for real African operational constraints, not a European datacenter.",
      challenges: [
        "Field agents in 2G/3G intermittent zones: any architecture requiring a live connection is unusable in the field",
        "Cameroonian law n°2010/012 prohibits storing HR and financial data outside the country — public cloud-only is illegal",
        "Food supply chains require per-batch immutable traceability — a modifiable record is a compliance liability",
      ],
      solutions: [
        "Offline-first Supply Chain module: agents capture data offline, batch sync triggers automatically when signal returns — with server-side deduplication via offline_id",
        "Private Hyperledger Fabric blockchain: every batch movement is immutably recorded via chaincode — verifyChainIntegrity() validates the entire chain",
        "Terraform hybrid infrastructure: AWS af-south-1 for web workloads, Azure for enterprise identity, on-premise Douala for regulated data — deployed as code, zero manual intervention",
      ],
      results: [
        "Zero field data loss over the first 3 months of pilot — including during extended network outages",
        "New environment provisioning: from 3 days to 45 minutes with Terraform",
        "Full legal compliance: HR and financial data on-premises in Douala, auditable at any time",
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
      tagline: "Migration zéro-interruption vers une infrastructure cloud hybride pour un e-commerce 3 sites — RTO validé à 1h45 au lieu des 3 jours estimés avec l'ancienne architecture.",
      role: "Architecte Cloud",
      period: "Avril 2026 — Juin 2026",
      stack: ["Azure", "Active Directory", "Microsoft 365", "Veeam", "FortiGate", "pfSense", "MPLS", "IPSec VPN", "Terraform", "Zabbix", "Grafana"],
      services: ["Architecture Cloud & Hybride"],
      summary:
        "ShopNow gérait toute son activité e-commerce depuis un serveur unique à Douala. Chaque pic de trafic menaçait le site. Chaque coupure électrique déclenchait une restauration manuelle. Et 3 sites physiques (Douala, Yaoundé, Bafoussam) fonctionnaient en quasi-isolation — les équipes s'échangeaient des fichiers par email. Contrainte ferme de la direction : zéro minute d'interruption pendant la migration. Le vrai enjeu : redonner confiance à une équipe qui avait subi trop d'incidents.",
      challenges: [
        "Un datacenter unique à Douala sans redondance : une coupure prolongée arrête toute l'activité — et les coupures sont fréquentes",
        "Migrer 47 utilisateurs vers Microsoft 365 en maintenant la continuité de service — un seul fichier perdu détruit la confiance de la direction",
        "Interconnecter 3 sites avec des liens MPLS coûteux tout en garantissant un failover automatique en cas de panne du lien principal",
      ],
      solutions: [
        "Lien MPLS primaire + failover IPSec VPN automatique (FortiGate/pfSense) : bascule en < 30 secondes, testée et documentée",
        "Migration M365 en 6 phases indépendantes sur 8 semaines — chaque phase annulable sans impacter les autres : 0 minute d'interruption réelle",
        "Segmentation 7 VLANs (SI, Commerce, RH, Finance, Serveurs, Invités, IoT) — isolation par domaine, un incident réseau Invités n'atteint pas les serveurs",
        "Sauvegarde Veeam locale + réplication automatique Azure Blob : RTO réel 1h45 / RPO réel 28min — validés lors d'un test grandeur nature",
      ],
      results: [
        "RTO de reprise d'activité : 1h45 validé en test — contre 2 à 3 jours estimés avec l'ancienne configuration",
        "–30% de charge administrative IT dès le 3e mois après migration M365",
        "Budget première année : 56M FCFA (~86K€) — conforme aux estimations, sans surprise",
      ],
    },
    en: {
      title: "ShopNow — Hybrid Cloud Infrastructure",
      tagline: "Zero-downtime migration to a hybrid cloud infrastructure for a 3-site e-commerce company — validated RTO of 1h45 vs. 3 days estimated with the old setup.",
      role: "Cloud Architect",
      period: "April 2026 — June 2026",
      stack: ["Azure", "Active Directory", "Microsoft 365", "Veeam", "FortiGate", "pfSense", "MPLS", "IPSec VPN", "Terraform", "Zabbix", "Grafana"],
      services: ["Cloud & Hybrid Architecture"],
      summary:
        "ShopNow ran its entire e-commerce operation from a single server in Douala. Every traffic spike threatened the site. Every power outage triggered manual recovery. Three physical sites (Douala, Yaoundé, Bafoussam) operated in near-total isolation — teams shared files by email. Management's directive: zero minutes of downtime during the migration. The real challenge: restoring confidence in a team that had seen too many incidents.",
      challenges: [
        "Single datacenter in Douala with no redundancy: any prolonged outage halts the entire business — and outages are frequent",
        "Migrating 47 users to Microsoft 365 while maintaining service continuity — a single lost file destroys management trust",
        "Interconnecting 3 sites with expensive MPLS links while guaranteeing automatic failover if the primary link fails",
      ],
      solutions: [
        "Primary MPLS + automatic IPSec VPN failover (FortiGate/pfSense): switch in under 30 seconds, tested and documented",
        "M365 migration in 6 independent phases over 8 weeks — each phase reversible without impacting others: 0 real downtime",
        "7-VLAN segmentation (IT, Commerce, HR, Finance, Servers, Guest, IoT) — domain isolation, a guest network incident can't reach servers",
        "Veeam local backup + automatic Azure Blob replication: actual RTO 1h45 / actual RPO 28min — validated in a full-scale recovery test",
      ],
      results: [
        "Business recovery RTO: 1h45 validated in test — vs. estimated 2 to 3 days with the previous setup",
        "30% reduction in IT administrative workload by month 3 after M365 migration",
        "Year-1 budget: 56M XAF (~€86K) — on target, no surprises",
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
      tagline: "Un agent IA autonome qualifie chaque prospect en < 30 secondes — enrichissement web, scoring 1-10 et email personnalisé envoyé automatiquement, déployé en production sur ce site.",
      role: "Architecte IA & Ingénieur logiciel",
      period: "Juillet 2026",
      stack: ["n8n", "Claude Haiku 4.5", "Tavily API", "OpenRouter", "TypeScript", "Next.js", "Turso", "MCP"],
      services: ["Automatisation IA", "Ingénierie logicielle"],
      summary:
        "Avant cet agent, chaque formulaire de contact attendait ma réponse manuelle. Certains prospects ne recevaient de retour qu'après 24-48h — et les leads froids ne convertissent pas. L'agent n8n intercepte maintenant chaque soumission via webhook sécurisé, recherche l'entreprise du prospect sur le web avec Tavily, compare ses besoins au catalogue de services, lui attribue un score de 1 à 10, puis rédige et envoie un email de qualification personnalisé en français ou anglais. Tout ça en moins de 30 secondes, sans intervention humaine.",
      challenges: [
        "Un agent IA peut halluciner ou produire des réponses incohérentes — une réponse automatique mal calibrée nuit directement à la réputation",
        "L'enrichissement des données entreprise doit être fiable pour que le scoring ait du sens — sans données, le score est du bruit",
        "L'agent doit survivre aux erreurs réseau, timeouts API et réponses LLM malformées sans jamais bloquer silencieusement",
      ],
      solutions: [
        "Structured Output Parser avec schéma JSON strict : l'agent ne peut pas retourner de réponse libre — la structure est imposée, les hallucinations structurelles sont impossibles",
        "Tavily API pour l'enrichissement en temps réel : recherche web ciblée sur l'entreprise du prospect, résultats injectés dans le contexte de l'agent",
        "Knowledge Base intégrée comme outil : le catalogue de services est injecté en contexte — l'agent matche les besoins déclarés avec les offres réelles",
        "Gestion d'erreur explicite : onError → continueErrorOutput + log dans la table CRM — chaque échec est tracé, aucun lead n'est perdu silencieusement",
      ],
      results: [
        "Temps de réponse : de 24-48h à < 30 secondes pour 100% des leads entrants",
        "100% des prospects enrichis avec données entreprise et score de maturité avant tout contact humain",
        "Zéro lead perdu silencieusement : les erreurs d'agent sont loggées et escaladées automatiquement",
      ],
    },
    en: {
      title: "AI Lead Qualification Agent",
      tagline: "An autonomous AI agent qualifies every inbound lead in < 30 seconds — web enrichment, 1-10 scoring, and personalized email sent automatically, live in production on this site.",
      role: "AI Architect & Software Engineer",
      period: "July 2026",
      stack: ["n8n", "Claude Haiku 4.5", "Tavily API", "OpenRouter", "TypeScript", "Next.js", "Turso", "MCP"],
      services: ["AI Automation", "Software Engineering"],
      summary:
        "Before this agent, every contact form waited for my manual reply. Some prospects wouldn't hear back for 24-48 hours — and cold leads don't convert. The n8n agent now intercepts every submission via secured webhook, researches the prospect's company on the web with Tavily, matches their needs against the service catalog, scores them from 1 to 10, then drafts and sends a personalized qualification email in French or English. All in under 30 seconds, with no human in the loop.",
      challenges: [
        "An AI agent can hallucinate or produce incoherent responses — a miscalibrated automated reply directly damages reputation",
        "Company data enrichment must be reliable for scoring to be meaningful — without data, the score is noise",
        "The agent must survive network errors, API timeouts, and malformed LLM responses without silently blocking",
      ],
      solutions: [
        "Structured Output Parser with strict JSON schema: the agent cannot return free-form responses — structure is enforced, structural hallucinations are impossible",
        "Tavily API for real-time enrichment: targeted web search on the prospect's company, results injected into agent context",
        "Integrated Knowledge Base as an agent tool: the service catalog is injected as context — the agent matches declared needs to real offerings",
        "Explicit error handling: onError → continueErrorOutput + CRM table logging — every failure is tracked, no lead is silently lost",
      ],
      results: [
        "Response time: from 24-48h to < 30 seconds for 100% of inbound leads",
        "100% of prospects enriched with company data and maturity score before any human contact",
        "Zero silently lost leads: agent failures are logged and automatically escalated",
      ],
    },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
