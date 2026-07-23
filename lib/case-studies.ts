export type CaseStudySlug = "tribunejustice" | "digitrans-cm" | "shopnow" | "lead-qualification-agent";

export interface CaseStudyMetric {
  value: string;
  label: string;
  description?: string;
}

export interface CaseStudyHighlight {
  title: string;
  description: string;
}

export interface CaseStudySection {
  id: string;
  title: string;
  content: string;
  quote?: string;
  image?: string;
  imageAlt?: string;
  highlights?: CaseStudyHighlight[];
}

export interface CaseStudyLocale {
  title: string;
  tagline: string;
  role: string;
  period: string;
  stack: string[];
  services: string[];
  summary: string;
  metrics: CaseStudyMetric[];
  sections: CaseStudySection[];
  challenges?: string[];
  solutions?: string[];
  results?: string[];
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
        "TribuneJustice connecte des clients à des avocats certifiés, avec paiements en escrow et suivi de dossiers en temps réel. Prise en charge de la direction technique d'une plateforme en production souffrant d'une dette technique critique et de failles de sécurité majeures. Mission : sécuriser l'architecture, refactorer le monolithe frontend et optimiser les recherches sans interrompre les utilisateurs actifs.",
      metrics: [
        { value: "41", label: "Failles colmatées", description: "Audit OWASP Top 10 complet (SSRF, CSRF, sessions sans TTL)" },
        { value: "0", label: "Incident post-déploiement", description: "Zéro interruption lors du patch en production" },
        { value: "< 300ms", label: "Temps de recherche avocat", description: "Remplacement du SQL lent par Typesense facetté" },
        { value: "594 ➔ 4", label: "Refonte frontend", description: "Composant Angular monolithique découpé en 4 services découplés" }
      ],
      sections: [
        {
          id: "contexte",
          title: "01. Le Contexte & La Dette Technique",
          content:
            "TribuneJustice opère dans un domaine exigeant la confidentialité absolue et une intégrité financière irréprochable. Lors de ma prise de poste en tant que Tech Lead, la plateforme fonctionnait avec des vulnérabilités critiques en production : un composant Angular monolithique de 594 lignes concentrait la logique d'authentification, les sessions Redis n'avaient aucun TTL expirable, et plusieurs endpoints exposaient des failles SSRF exploitables. Chaque mise à jour menaçait d'interrompre les parcours d'escrow en cours.",
          quote: "En legaltech, la faille de sécurité d'aujourd'hui est le procès de demain. Sécuriser sans interrompre la production était la priorité absolue."
        },
        {
          id: "architecture-securite",
          title: "02. Stratégie de Refonte & Sécurisation",
          content:
            "Pour traiter les failles sans casser l'existant, j'ai mis en place une stratégie en deux temps. Côté backend, nous avons encapsulé les transactions financières dans des verrous pessimistes (lockForUpdate) associés à une machine à états Laravel déterministe. Côté frontend, le composant Angular tentaculaire a été refactoré en 4 services TypeScript spécialisés basés sur les Angular Signals, garantissant un typage strict et une réactivité optimale.",
          highlights: [
            {
              title: "Machine à États & Verrouillage Pessimiste",
              description: "Empêche les race conditions sur les paiements en escrow lors des demandes simultanées."
            },
            {
              title: "Isolation Frontend Angular",
              description: "Découpage en 4 services découplés avec injection de dépendances stricte et gestion fine des états."
            },
            {
              title: "Hardening OWASP Top 10",
              description: "Correction des vulnérabilités SSRF par listes blanches, ajouts de headers CSP/HSTS et sessions à TTL borné."
            },
            {
              title: "Moteur de Recherche Typesense",
              description: "Indexation facettée permettant de filtrer les avocats par spécialité, ville et disponibilité en moins de 300ms."
            }
          ]
        },
        {
          id: "impact",
          title: "03. Impact & Résultats Métier",
          content:
            "Le déploiement global s'est effectué sans la moindre minute d'arrêt. La charge serveur a été considérablement allégée grâce à la suppression des requêtes N+1 et à la mise en cache Redis stratégique sur 10 endpoints clés. La plateforme est désormais hautement évolutive et a permis l'intégration fluide de 3 nouveaux modules métier sans régression."
        }
      ],
      repoUrl: undefined,
      siteUrl: undefined
    },
    en: {
      title: "TribuneJustice",
      tagline: "Security audit and technical refactor of a live legaltech platform — 41 vulnerabilities closed, zero service interruption.",
      role: "Tech Lead & Project Manager",
      period: "November 2025 — ongoing",
      stack: ["Laravel", "Angular", "Next.js", "Redis", "Docker", "Laravel Reverb", "Typesense"],
      services: ["Software Engineering", "Application Pentest & Security"],
      summary:
        "TribuneJustice connects clients with certified lawyers, handling escrow payments and real-time case tracking. Took technical leadership of a live platform suffering from critical technical debt and major security flaws. Mission: harden the architecture, refactor the frontend monolith, and accelerate search without interrupting active users.",
      metrics: [
        { value: "41", label: "Vulnerabilities patched", description: "Full OWASP Top 10 audit (SSRF, CSRF, TTL-less sessions)" },
        { value: "0", label: "Post-deploy incidents", description: "Zero downtime during live patch rollout" },
        { value: "< 300ms", label: "Lawyer search speed", description: "Replaced slow SQL queries with Typesense faceted index" },
        { value: "594 ➔ 4", label: "Frontend refactor", description: "Monolithic Angular component split into 4 decoupled services" }
      ],
      sections: [
        {
          id: "context",
          title: "01. Context & Technical Debt",
          content:
            "TribuneJustice operates in a space demanding strict confidentiality and financial integrity. When taking over as Tech Lead, the platform suffered from severe production liabilities: a 594-line monolithic Angular component handled all auth logic, Redis sessions had no expiration TTL, and several endpoints exposed exploitable SSRF vectors. Every deployment risked breaking active escrow flows.",
          quote: "In legaltech, today's security flaw is tomorrow's lawsuit. Securing the stack without breaking active users was the top priority."
        },
        {
          id: "strategy",
          title: "02. Refactoring & Security Strategy",
          content:
            "To patch flaws without disrupting business, I executed a two-pronged strategy. On the backend, financial transactions were wrapped in pessimistic locking (lockForUpdate) bound to a deterministic Laravel state machine. On the frontend, the sprawling Angular component was refactored into 4 specialized TypeScript services powered by Angular Signals for strict type safety and reactive state flow.",
          highlights: [
            {
              title: "State Machine & Pessimistic Locks",
              description: "Eliminates race conditions on escrow payments during concurrent client requests."
            },
            {
              title: "Angular Frontend Decoupling",
              description: "Split into 4 modular services with strict dependency injection and Signal-based state management."
            },
            {
              title: "OWASP Top 10 Hardening",
              description: "Patched SSRF vulnerabilities via explicit allowlists, CSP/HSTS headers, and bounded TTL sessions."
            },
            {
              title: "Typesense Search Engine",
              description: "Faceted indexing filter for lawyers by specialty, city, and availability in under 300ms."
            }
          ]
        },
        {
          id: "impact",
          title: "03. Business Impact & Results",
          content:
            "The full patch deployed with zero downtime. Server load decreased significantly thanks to N+1 query cleanup and strategic Redis caching across 10 core endpoints. The architecture is now scalable, enabling 3 new modules to be shipped smoothly without regression."
        }
      ],
      repoUrl: undefined,
      siteUrl: undefined
    }
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
        "AGROCAM S.A. gérait son opération sur un monolithe obsolète. Le défi n'était pas la charge serveur, mais l'incapacité des agents terrain en zone rurale à enregistrer leurs opérations sans connexion. De plus, la législation locale et les exigences de la chaîne alimentaire imposaient une souveraineté des données et une traçabilité immuable.",
      metrics: [
        { value: "5", label: "Microservices indépendants", description: "API Gateway, ERP, CRM, Supply Chain, BI" },
        { value: "0%", label: "Perte de données terrain", description: "Module Supply Chain offline-first avec sync par batch" },
        { value: "45min", label: "Provisioning environnement", description: "Réduit de 3 jours à 45 minutes via Terraform IaC" },
        { value: "100%", label: "Conformité loi n°2010/012", description: "Souveraineté des données RH et financières sur site" }
      ],
      sections: [
        {
          id: "contexte",
          title: "01. L'Enjeu Métier & Les Contraintes Africaines",
          content:
            "Les architectures cloud traditionnelles échouent souvent en zone rurale africaine où la connectivité 2G/3G est intermittente. Les agents d'AGROCAM perdaient des heures de données lors des coupures réseau. Par ailleurs, la réglementation camerounaise (loi n°2010/012) interdit le stockage d'informations financières et RH hors du territoire national, interdisant le 100% cloud public.",
          quote: "Une architecture cloud en Afrique doit être conçue pour la réalité du terrain : coupures réseau, contraintes légales de souveraineté et résilience offline."
        },
        {
          id: "architecture",
          title: "02. Architecture Distribuée & Synchronisation Offline",
          content:
            "J'ai conçu une architecture microservices distribuée basée sur un découpage en 5 domaines. Le cœur du système réside dans le module Supply Chain offline-first : les agents saisissent leurs transactions localement, et un worker Redis orchestre la déduplication et la synchronisation par batch dès le rétablissement de la connexion. Pour la traçabilité des récoltes, Hyperledger Fabric garantit qu'aucun lot ne peut être modifié rétrospectivement.",
          highlights: [
            {
              title: "Sync Offline-First par Batch",
              description: "Déduplication par offline_id et gestion des réessais via Redis Dead-Letter Queues."
            },
            {
              title: "Traçabilité Blockchain Hyperledger",
              description: "Registre privé immuable scellant chaque étape de transit agricole de la ferme au consommateur."
            },
            {
              title: "Infrastructure Hybride Terraform",
              description: "Workloads web sur AWS (af-south-1), identité sur Azure, données réglementées on-premise à Douala."
            },
            {
              title: "CI/CD & Alerting automatisé",
              description: "Pipelines GitHub Actions en 5 étapes avec métriques Prometheus/Grafana et DRP documenté."
            }
          ]
        },
        {
          id: "impact",
          title: "03. Enseignements & Impact Opérationnel",
          content:
            "Sur les 3 premiers mois de pilote, aucune donnée terrain n'a été perdue. Le temps nécessaire pour provisionner un environnement complet est passé de 3 jours à 45 minutes grâce à l'Infrastructure as Code (Terraform), et le client bénéficie d'une conformité légale totale."
        }
      ],
      repoUrl: "https://github.com/samsteeven/digitram-cm-microservices",
      siteUrl: undefined
    },
    en: {
      title: "DIGITRANS-CM (AGROCAM S.A.)",
      tagline: "5 microservices for a Cameroonian agro-industrial group — built for offline field agents and tamper-proof traceability from farm to market.",
      role: "Solution Architect & Software Engineer",
      period: "May 2026 — June 2026",
      stack: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "Docker", "Kubernetes", "Terraform", "AWS", "Azure", "Hyperledger Fabric", "GitHub Actions"],
      services: ["Cloud & Hybrid Architecture", "Software Engineering"],
      summary:
        "AGROCAM S.A. managed its operations on an obsolete monolith. The main bottleneck wasn't server load, but the inability of rural field agents to log data without network connectivity. Local compliance laws and food-grade supply chains also demanded data sovereignty and immutable auditability.",
      metrics: [
        { value: "5", label: "Independent microservices", description: "API Gateway, ERP, CRM, Supply Chain, BI" },
        { value: "0%", label: "Field data loss rate", description: "Offline-first Supply Chain module with batch sync" },
        { value: "45min", label: "Environment provisioning", description: "Reduced from 3 days to 45 minutes using Terraform IaC" },
        { value: "100%", label: "Local Law 2010/012 compliance", description: "On-premise sovereignty for financial and HR data" }
      ],
      sections: [
        {
          id: "context",
          title: "01. Business Challenge & Regional Constraints",
          content:
            "Traditional cloud architectures often fail in rural African environments where 2G/3G connectivity is spotty. AGROCAM field agents were losing operational logs during outages. Furthermore, Cameroonian Law n°2010/012 restricts storing financial and HR data outside national borders, ruling out pure public cloud.",
          quote: "Cloud architecture in Africa must be built for operational reality: intermittent connectivity, local data sovereignty, and offline resilience."
        },
        {
          id: "architecture",
          title: "02. Distributed Architecture & Offline Sync",
          content:
            "I designed a 5-domain microservices architecture. The core innovation is the offline-first Supply Chain module: agents capture operations locally, while a background Redis worker manages deduplication and batch sync upon signal recovery. For batch auditing, Hyperledger Fabric ensures tamper-proof chaincode logging.",
          highlights: [
            {
              title: "Offline-First Batch Sync",
              description: "Deduplication via offline_id and Redis Dead-Letter Queue retry mechanisms."
            },
            {
              title: "Hyperledger Fabric Traceability",
              description: "Private immutable ledger recording each agricultural transit step from farm to retail."
            },
            {
              title: "Terraform Hybrid Cloud",
              description: "Web workloads on AWS (af-south-1), identity on Azure, regulated data on-premise in Douala."
            },
            {
              title: "CI/CD & Automated Alerting",
              description: "5-stage GitHub Actions pipeline with Prometheus/Grafana monitoring and documented DRP."
            }
          ]
        },
        {
          id: "impact",
          title: "03. Impact & Takeaways",
          content:
            "Zero field data was lost during the 3-month pilot. Environment provisioning dropped from 3 days to 45 minutes thanks to Infrastructure as Code, guaranteeing full legal and operational compliance."
        }
      ],
      repoUrl: "https://github.com/samsteeven/digitram-cm-microservices",
      siteUrl: undefined
    }
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
        "ShopNow exploitait ses activités e-commerce depuis un serveur unique non-redondant à Douala. Les interruptions électriques fréquentes et l'absence d'interconnexion sécurisée entre les 3 sites distants (Douala, Yaoundé, Bafoussam) menaçaient la continuité de service.",
      metrics: [
        { value: "1h45", label: "RTO réel de reprise", description: "Validé en test grandeur nature (vs 3 jours auparavant)" },
        { value: "-30%", label: "Charge de maintenance IT", description: "Obtenue 3 mois après la migration vers Microsoft 365" },
        { value: "3", label: "Sites interconnectés", description: "Liaisons MPLS principales + bascule VPN IPSec en < 30s" },
        { value: "7", label: "VLANs étanches", description: "Isolation stricte des réseaux SI, Finance, Invités et IoT" }
      ],
      sections: [
        {
          id: "contexte",
          title: "01. Le Défi Multi-Sites & La Continuité d'Activité",
          content:
            "Travailler sur 3 sites distants sans infrastructure unifiée provoquait des pertes de données répétées et des partages de fichiers non-sécurisés. L'enjeu de la direction était clair : moderniser l'infrastructure et migrer les 47 collaborateurs vers Microsoft 365 avec zéro minute d'interruption métier.",
          quote: "La redondance n'est pas un luxe en entreprise : c'est l'assurance vie du business face aux imprévus d'infrastructure."
        },
        {
          id: "solution",
          title: "02. Plan de Reprise & Resilence Réseau",
          content:
            "J'ai conçu un réseau hybride multi-sites combinant des liaisons MPLS dédiées et des tunnels VPN IPSec de secours orchestrés par des pare-feux FortiGate et pfSense. La stratégie de sauvegarde combine du stockage local Veeam et de la réplication quotidienne vers Azure Blob Storage.",
          highlights: [
            {
              title: "Failover Réseau Automatique",
              description: "Basculement automatique du MPLS vers IPSec VPN en moins de 30 secondes en cas de rupture de lien."
            },
            {
              title: "Migration M365 en 6 Phases",
              description: "Migration progressive sur 8 semaines sans aucune interruption de messagerie pour les 47 utilisateurs."
            },
            {
              title: "Plan de Reprise DRP Validé",
              description: "RTO réel mesuré à 1h45 et RPO à 28min lors des simulations de sinistre sur le datacenter principal."
            },
            {
              title: "Identité Hybride & MFA Stricte",
              description: "Active Directory on-premise synchronisé avec Azure AD avec authentification multifacteur obligatoire."
            }
          ]
        },
        {
          id: "impact",
          title: "03. Rentabilité & Bilan",
          content:
            "L'infrastructure est désormais résiliente et managée à distance via Zabbix et Grafana. Le business case présenté à la direction a permis de réduire les coûts récurrents de maintenance de 86 K€ à 42 K€/an tout en garantissant un SLA de 99,9%."
        }
      ],
      repoUrl: undefined,
      siteUrl: undefined
    },
    en: {
      title: "ShopNow — Hybrid Cloud Infrastructure",
      tagline: "Zero-downtime migration to a hybrid cloud infrastructure for a 3-site e-commerce company — validated RTO of 1h45 vs. 3 days estimated with the old setup.",
      role: "Cloud Architect",
      period: "April 2026 — June 2026",
      stack: ["Azure", "Active Directory", "Microsoft 365", "Veeam", "FortiGate", "pfSense", "MPLS", "IPSec VPN", "Terraform", "Zabbix", "Grafana"],
      services: ["Cloud & Hybrid Architecture"],
      summary:
        "ShopNow operated its e-commerce business from a single non-redundant server in Douala. Frequent power outages and isolated remote sites (Douala, Yaoundé, Bafoussam) risked prolonged business disruption.",
      metrics: [
        { value: "1h45", label: "Validated Disaster RTO", description: "Tested full recovery vs. 3 days legacy recovery time" },
        { value: "-30%", label: "IT Maintenance Workload", description: "Achieved within 3 months of Microsoft 365 migration" },
        { value: "3", label: "Interconnected Sites", description: "Primary MPLS + IPSec VPN auto-failover in < 30s" },
        { value: "7", label: "Isolated VLAN Domains", description: "Strict segmentation for IT, Finance, Guest, and IoT" }
      ],
      sections: [
        {
          id: "context",
          title: "01. Multi-Site Challenge & Business Continuity",
          content:
            "Operating across 3 remote sites without unified IT resulted in data silos and unsecured file sharing. Management set a strict target: modernize the infrastructure and migrate 47 users to Microsoft 365 with zero business downtime.",
          quote: "Infrastructure redundancy isn't a luxury: it's the core insurance policy protecting business continuity."
        },
        {
          id: "solution",
          title: "02. Recovery Plan & Network Resilience",
          content:
            "I architected a multi-site hybrid network using primary MPLS lines backed by automated IPSec VPN tunnels on FortiGate and pfSense. Backups combine local Veeam appliances with daily encrypted replication to Azure Blob Storage.",
          highlights: [
            {
              title: "Automated Network Failover",
              description: "Seamless failover from MPLS to IPSec VPN in under 30 seconds upon link outage."
            },
            {
              title: "6-Phase M365 Migration",
              description: "Phased 8-week migration ensuring zero email downtime across all 47 corporate users."
            },
            {
              title: "Tested Disaster Recovery (DRP)",
              description: "Actual measured RTO of 1h45 and RPO of 28 minutes during simulated datacenter disaster tests."
            },
            {
              title: "Hybrid Identity & Mandatory MFA",
              description: "On-premise Active Directory synced with Azure AD, enforcing mandatory MFA on remote connections."
            }
          ]
        },
        {
          id: "impact",
          title: "03. Financial & Operational ROI",
          content:
            "The infrastructure is fully monitored via Zabbix and Grafana. The business case cut recurring maintenance costs from €86K to €42K/year while delivering a 99.9% availability SLA."
        }
      ],
      repoUrl: undefined,
      siteUrl: undefined
    }
  },
  {
    slug: "lead-qualification-agent",
    service: ["automatisation-ia"],
    coverPlaceholder: "#1a1a2e",
    coverImage: "/projects/ia_agent.png",
    fr: {
      title: "Pipeline IA de Gestion des Leads",
      tagline: "Deux agents IA partagent une même CRM — le premier qualifie chaque prospect en < 30 secondes, le second permet de consulter et agir sur les données directement depuis WhatsApp.",
      role: "Architecte IA & Ingénieur logiciel",
      period: "Juillet 2026",
      stack: ["n8n", "Claude Haiku 4.5", "Tavily API", "OpenRouter", "Redis", "TypeScript", "Next.js", "Turso", "Data Tables", "MCP"],
      services: ["Automatisation IA", "Ingénierie logicielle"],
      summary:
        "Conception et déploiement d'un pipeline d'agents IA autonomes pour l'acquisition et la gestion de prospects. Le premier agent intercepte les formulaires web, enrichit les données entreprise en temps réel et attribue un score de maturité. Le second agent permet au décideur d'interroger et de piloter la base de prospects directement via WhatsApp.",
      metrics: [
        { value: "< 30s", label: "Temps de qualification", description: "Au lieu de 24-48h pour l'envoi d'une réponse analysée" },
        { value: "100%", label: "Leads enrichis en temps réel", description: "Recherche web d'entreprise automatique via Tavily API" },
        { value: "2", label: "Workflows n8n synchronisés", description: "Agent Web Lead + Agent WhatsApp Assistant sur mémoire Redis" },
        { value: "0", label: "Lead perdu ou oublié", description: "Gestion d'erreur explicite et persistance CRM n8n" }
      ],
      sections: [
        {
          id: "contexte",
          title: "01. Le Problème du Temps de Réponse & La Friction CRM",
          content:
            "Dans les services B2B et l'ingénierie, un prospect non contacté dans les 5 premières minutes voit son taux de conversion chuter drastiquement. Traiter manuellement chaque formulaire demandait des heures de recherche et de rédaction. De plus, consulter ou mettre à jour un CRM classique depuis un smartphone sur le terrain est fastidieux.",
          quote: "L'automatisation IA ne doit pas remplacer le contact humain : elle élimine le délai de réaction et prépare la décision avant le premier échange."
        },
        {
          id: "architecture",
          title: "02. Architecture à Double Workflow n8n & Redis",
          content:
            "Le système repose sur deux workflows n8n interconnectés par une Data Table CRM commune et une mémoire Redis. Lorsqu'un prospect soumet un formulaire, le Lead Agent s'exécute : il effectue une recherche web Tavily sur l'entreprise, compare ses besoins au catalogue de services, formule un score de 1 à 10 et génère un email personnalisé via Claude Haiku 4.5. Le second workflow — le WhatsApp CRM Assistant — permet au décideur d'interroger cette même CRM en langage naturel directement depuis WhatsApp, sans ouvrir aucun dashboard.",
          image: "/projects/whatsapp_workflow.jpg",
          imageAlt: "Workflow n8n du WhatsApp CRM Assistant — réception du message, extraction, agent IA avec mémoire Redis, outils CRM et envoi de réponse",
          highlights: [
            {
              title: "Structured Output Parser JSON",
              description: "Formatage JSON strict garantissant zéro hallucination de structure lors des appels au LLM."
            },
            {
              title: "Enrichissement Temps Réel Tavily",
              description: "Extraction automatique de la taille, du secteur et des actus récentes de l'entreprise du prospect."
            },
            {
              title: "Pilotage WhatsApp en Langage Naturel",
              description: "Interrogation de la CRM par message vocal ou texte ('Quel est le dernier lead qualifié ?')."
            },
            {
              title: "Mémoire Redis Persistante",
              description: "Conservation de l'historique conversationnel entre les agents et le décideur entre chaque session."
            }
          ]
        },
        {
          id: "impact",
          title: "03. Rigueur, Sécurité & Production",
          content:
            "Le pipeline tourne en production avec gestion d'erreur robuste (onError → continueErrorOutput). Aucun lead ne peut être égaré. La réactivité perçue par les prospects est immédiate, et la gestion CRM se fait sans ouvrir d'interface complexe."
        }
      ],
      repoUrl: undefined,
      siteUrl: undefined
    },
    en: {
      title: "AI-Powered Lead Management Pipeline",
      tagline: "Two AI agents share one CRM — the first qualifies every lead in < 30 seconds, the second allows querying and acting on data directly from WhatsApp.",
      role: "AI Architect & Software Engineer",
      period: "July 2026",
      stack: ["n8n", "Claude Haiku 4.5", "Tavily API", "OpenRouter", "Redis", "TypeScript", "Next.js", "Turso", "Data Tables", "MCP"],
      services: ["AI Automation", "Software Engineering"],
      summary:
        "Architected and deployed a multi-agent AI pipeline for lead acquisition and CRM management. The first agent intercepts contact forms, enriches company data in real time, and scores prospects. The second agent allows management to query and control the lead database directly through WhatsApp.",
      metrics: [
        { value: "< 30s", label: "Lead Qualification Speed", description: "Replaced 24-48 hour manual response turnaround" },
        { value: "100%", label: "Real-Time Lead Enrichment", description: "Automated company web research via Tavily API" },
        { value: "2", label: "Synced n8n Workflows", description: "Web Lead Agent + WhatsApp Assistant over Redis memory" },
        { value: "0", label: "Lost or Dropped Leads", description: "Explicit error fallback and n8n CRM table persistence" }
      ],
      sections: [
        {
          id: "context",
          title: "01. Response Latency & CRM Friction",
          content:
            "In B2B engineering services, failing to respond to a prospect within minutes drastically lowers conversion rates. Manually reviewing and drafting replies took hours. Moreover, updating traditional CRMs on mobile while traveling is tedious.",
          quote: "AI automation shouldn't replace human connection: it eliminates response latency and prepares decision-making before the first call."
        },
        {
          id: "architecture",
          title: "02. Dual n8n Workflow & Redis Architecture",
          content:
            "The architecture links two n8n workflows through a shared CRM Data Table and persistent Redis memory. Upon form submission, the Lead Agent triggers Tavily web search, matches prospect requirements with the service catalog, scores lead intent (1-10), and drafts a tailored email via Claude Haiku 4.5. The second workflow — the WhatsApp CRM Assistant — lets the decision-maker query that same CRM in natural language directly from WhatsApp, without opening any dashboard.",
          image: "/projects/whatsapp_workflow.jpg",
          imageAlt: "n8n WhatsApp CRM Assistant workflow — message trigger, extraction, AI agent with Redis memory, CRM tools and reply delivery",
          highlights: [
            {
              title: "Strict JSON Output Parsing",
              description: "Enforced JSON schema preventing structural hallucinations during LLM calls."
            },
            {
              title: "Real-Time Tavily Enrichment",
              description: "Automatic extraction of company size, industry, and recent news."
            },
            {
              title: "WhatsApp Natural Language Control",
              description: "Query and update CRM records via voice or text ('Show me the latest qualified lead')."
            },
            {
              title: "Persistent Redis Memory",
              description: "Maintains conversational context between agents and the manager across sessions."
            }
          ]
        },
        {
          id: "impact",
          title: "03. Reliability & Production Results",
          content:
            "The pipeline runs in production with robust error routing (onError → continueErrorOutput). No lead is ever lost. Prospects experience instantaneous response times, and CRM management requires zero complex dashboarding."
        }
      ],
      repoUrl: undefined,
      siteUrl: undefined
    }
  }
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
