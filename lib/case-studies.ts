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
      tagline: "Plateforme legaltech conçue et développée pour un expert juridique : escrow, consultations vidéo, messagerie temps réel, bilingue FR/EN — 41 vulnérabilités fermées, LCP de 5 s à 1,5 s.",
      role: "Tech Lead",
      period: "Novembre 2025 — en cours",
      stack: ["Laravel", "Angular 20", "Next.js", "Typesense", "MeSomb", "Redis", "Laravel Reverb", "Docker"],
      services: ["Ingénierie logicielle", "Pentest & Sécurité applicative"],
      summary:
        "TribuneJustice connecte des clients à des avocats certifiés, avec paiements en escrow, consultations vidéo et suivi de dossiers en temps réel. C'est le produit digital de M. Badjeu Kuitchouha Ghislain, expert juridique, qui en a eu l'idée et rédigé les spécifications ; j'ai été consulté pour le construire. J'ai dirigé et réalisé toute la technique — backend Laravel, frontend Angular SSR, blog Next.js — pendant 8 mois. Deux campagnes d'audit (pentest externe + revue interne) ont ensuite identifié 41 failles : toutes fermées sans interrompre les utilisateurs actifs.",
      metrics: [
        { value: "41", label: "Failles colmatées", description: "Deux campagnes d'audit (pentest externe + revue interne), fermées avant toute exploitation" },
        { value: "0", label: "Incident post-déploiement", description: "Déploiements zero-downtime avec auto-récupération des caches périmés" },
        { value: "< 300ms", label: "Temps de recherche avocat", description: "Indexation Typesense facettée : spécialité, ville, disponibilité" },
        { value: "594 ➔ 4", label: "Refonte frontend", description: "Service d'authentification monolithique découpé en 4 services Angular Signals" }
      ],
      sections: [
        {
          id: "contexte",
          title: "01. Le Contexte — Le produit digital d'un expert juridique",
          content:
            "TribuneJustice est le produit digital de M. Badjeu Kuitchouha Ghislain, expert juridique : il en a eu l'idée et rédigé les spécifications. Il m'a consulté pour construire la plateforme — j'ai conçu le modèle de données (MCD), l'architecture, le backend Laravel, le frontend Angular et le blog Next.js, livrés en 8 mois (~1 650 interventions), en échangeant avec lui sur chaque décision produit. Dans un domaine qui exige une confidentialité absolue et une intégrité financière irréprochable, la sécurité ne peut pas être un après-coup : après le lancement, nous avons fait auditer la plateforme par un pentest externe puis une revue interne. Verdict : 41 failles — SSRF sur le proxy d'images du blog, sessions Redis sans TTL, service d'authentification monolithique de 594 lignes. Chaque mise à jour menaçait d'interrompre les parcours d'escrow en cours.",
          quote: "En legaltech, la faille de sécurité d'aujourd'hui est le procès de demain. Construire pour un client, c'est livrer un produit qui survit à ses propres audits."
        },
        {
          id: "architecture-securite",
          title: "02. Construction, Refonte & Durcissement",
          content:
            "J'ai traité les 41 failles sans interrompre l'activité. Côté backend, les transactions financières ont été encapsulées dans des verrous pessimistes (lockForUpdate) reliés à la machine à états Laravel déterministe de la Service Request — l'entité centrale qui porte le cycle de vie complet du dossier : création, assignment, suivi, paiement, résolution. Côté frontend, le service d'authentification monolithique (594 lignes, 87 consommateurs) a été découpé en 4 services TypeScript spécialisés basés sur les Angular Signals. En parallèle, la recherche SQL lente a été remplacée par un index Typesense.",
          highlights: [
            {
              title: "Machine à états & verrous pessimistes",
              description: "Élimine les race conditions sur les paiements en escrow lors des demandes simultanées."
            },
            {
              title: "Frontend découplé (Angular Signals)",
              description: "4 services spécialisés — état, API, token, permissions — avec typage strict et gestion fine des états."
            },
            {
              title: "Hardening OWASP Top 10",
              description: "SSRF par listes blanches, headers CSP/HSTS, sessions à TTL borné, cookies JWT HTTP-only, mode sudo."
            },
            {
              title: "Moteur de recherche Typesense",
              description: "Filtrage des avocats par spécialité, ville et disponibilité en moins de 300 ms."
            }
          ]
        },
        {
          id: "impact",
          title: "03. Impact & Résultats Métier",
          content:
            "Le déploiement global s'est effectué sans la moindre minute d'arrêt. La charge serveur a été considérablement allégée (suppression des requêtes N+1, cache Redis sur 10 endpoints clés). Le chargement est passé de 5 secondes à moins de 1,5 seconde (LCP), les images de 68 Mo à 3,9 Mo (−94 % en WebP). La plateforme est désormais hautement évolutive : 3 nouveaux modules métier ont été intégrés sans régression."
        }
      ],
      repoUrl: undefined,
      siteUrl: undefined
    },
    en: {
      title: "TribuneJustice",
      tagline: "Legaltech platform designed and built for a legal expert: escrow payments, video consultations, real-time messaging, FR/EN bilingual — 41 vulnerabilities closed, LCP from 5s to 1.5s.",
      role: "Tech Lead",
      period: "November 2025 — ongoing",
      stack: ["Laravel", "Angular 20", "Next.js", "Typesense", "MeSomb", "Redis", "Laravel Reverb", "Docker"],
      services: ["Software Engineering", "Application Pentest & Security"],
      summary:
        "TribuneJustice connects clients with certified lawyers, handling escrow payments, video consultations, and real-time case tracking. It is the digital product of Mr Badjeu Kuitchouha Ghislain, a legal expert who came up with the idea and wrote the specifications; I was consulted to build it. I led and built the entire technical side — Laravel backend, Angular SSR frontend, Next.js blog — over 8 months. Two audit campaigns (external pentest + internal review) then found 41 flaws: all closed without disrupting active users.",
      metrics: [
        { value: "41", label: "Vulnerabilities patched", description: "Two audit campaigns (external pentest + internal review), closed before any exploit" },
        { value: "0", label: "Post-deploy incidents", description: "Zero-downtime deployments with automatic stale-cache recovery" },
        { value: "< 300ms", label: "Lawyer search speed", description: "Typesense faceted index: specialty, city, availability" },
        { value: "594 ➔ 4", label: "Frontend refactor", description: "Monolithic auth service split into 4 Angular Signals services" }
      ],
      sections: [
        {
          id: "context",
          title: "01. Context — The Digital Product of a Legal Expert",
          content:
            "TribuneJustice is the digital product of Mr Badjeu Kuitchouha Ghislain, a legal expert: he came up with the idea and wrote the specifications. He consulted me to build the platform — I designed the data model (MCD), the architecture, the Laravel backend, the Angular frontend, and the Next.js blog, shipped over 8 months (~1,650 tracked changes), exchanging with him on every product decision. In a domain demanding absolute confidentiality and financial integrity, security cannot be an afterthought: after launch, we had the platform audited by an external pentest followed by an internal review. Verdict: 41 flaws — SSRF on the blog image proxy, Redis sessions without TTL, a 594-line monolithic auth service. Every deployment risked breaking active escrow flows.",
          quote: "In legaltech, today's security flaw is tomorrow's lawsuit. Building for a client means shipping a product that survives its own audits."
        },
        {
          id: "strategy",
          title: "02. Building, Refactoring & Hardening",
          content:
            "I closed all 41 flaws without disrupting business. On the backend, financial transactions were wrapped in pessimistic locking (lockForUpdate) bound to the deterministic Laravel state machine of the Service Request — the central entity carrying the full case lifecycle: creation, assignment, tracking, payment, resolution. On the frontend, the monolithic auth service (594 lines, 87 consumers) was split into 4 specialized TypeScript services powered by Angular Signals. In parallel, slow SQL search was replaced by a Typesense index.",
          highlights: [
            {
              title: "State Machine & Pessimistic Locks",
              description: "Eliminates race conditions on escrow payments during concurrent client requests."
            },
            {
              title: "Decoupled Frontend (Angular Signals)",
              description: "4 specialized services — state, API, token, permissions — with strict typing and fine-grained state management."
            },
            {
              title: "OWASP Top 10 Hardening",
              description: "SSRF allowlists, CSP/HSTS headers, bounded TTL sessions, HTTP-only JWT cookies, sudo mode."
            },
            {
              title: "Typesense Search Engine",
              description: "Filter lawyers by specialty, city, and availability in under 300ms."
            }
          ]
        },
        {
          id: "impact",
          title: "03. Business Impact & Results",
          content:
            "The full rollout deployed with zero downtime. Server load dropped significantly thanks to N+1 query cleanup and strategic Redis caching across 10 core endpoints. Page load went from 5 seconds to under 1.5 seconds (LCP), and media assets from 68 MB to 3.9 MB (−94% as WebP). The architecture is now scalable: 3 new business modules shipped without regression."
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
      tagline: "Épreuve certifiante RNCP (bloc BC04) : 5 microservices pour une agro-industrie camerounaise simulée — agents terrain offline-first, souveraineté des données et traçabilité blockchain Hyperledger.",
      role: "Architecte Cloud & Développeur Full-Stack",
      period: "Mai 2026 (épreuve de 3 jours)",
      stack: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "Docker", "Kubernetes", "Terraform", "AWS", "Azure", "Hyperledger Fabric", "GitHub Actions"],
      services: ["Architecture Cloud & Hybride", "Ingénierie logicielle"],
      summary:
        "Épreuve certifiante RNCP39765 (bloc BC04, EADL 4) : en équipe de 3 étudiants sur 3 jours, conception et déploiement de l'architecture du scénario DIGITRANS-CM — moderniser le SI d'AGROCAM S.A. (groupe agroalimentaire camerounais simulé) en microservices cloud hybrides AWS/Azure, avec Supply Chain offline-first et traçabilité Hyperledger Fabric. Livrables : application déployée, documentation technique, rapport de sécurisation, soutenance devant jury.",
      metrics: [
        { value: "3", label: "Jours d'épreuve", description: "Équipe de 3 étudiants, mise en situation reconstituée, jury" },
        { value: "5", label: "Microservices", description: "API Gateway, ERP, CRM, Supply Chain, BI" },
        { value: "C21–C26", label: "Compétences évaluées", description: "Intégration cloud, IaC, administration, performance, sécurité, blockchain" },
        { value: "100%", label: "Exigences couvertes", description: "Souveraineté des données (loi n°2010/012), offline-first, HA ≥ 99,9 %" }
      ],
      sections: [
        {
          id: "contexte",
          title: "01. L'Épreuve & Les Contraintes Africaines",
          content:
            "Dans le cadre de l'épreuve certifiante RNCP39765 (bloc BC04 « Optimiser le SI par l'apport du Cloud Computing »), le scénario place l'équipe chez CAMTECH SOLUTIONS S.A., ESN camerounaise, en mission DIGITRANS-CM pour AGROCAM S.A. : remplacer un monolithe de 2009 par un SI distribué et partiellement cloud. Les architectures cloud traditionnelles échouent souvent en zone rurale africaine où la connectivité 2G/3G est intermittente — les agents terrain perdent des heures de données lors des coupures réseau. Par ailleurs, la réglementation camerounaise (loi n°2010/012) interdit le stockage d'informations financières et RH hors du territoire national, interdisant le 100% cloud public. Trois jours, en équipe de trois, pour livrer une application déployée et un rapport de sécurisation devant jury.",
          quote: "Une architecture cloud en Afrique doit être conçue pour la réalité du terrain : coupures réseau, contraintes légales de souveraineté et résilience offline — et en épreuve de 3 jours, chaque choix doit être défendable."
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
          title: "03. Enseignements & Résultats de l'Épreuve",
          content:
            "L'épreuve a été livrée dans le temps imparti : application déployée (AWS/Azure hybride, Terraform, CI/CD en 5 étapes), documentation technique, rapport de sécurisation (C25–C26) incluant la solution Hyperledger Fabric, et soutenance devant jury. Au-delà de la certification, c'est la capacité à trancher des choix d'architecture complexes sous contrainte de délai — et à les défendre — qui fait la valeur de l'exercice."
        }
      ],
      repoUrl: "https://github.com/samsteeven/digitram-cm-microservices",
      siteUrl: undefined
    },
    en: {
      title: "DIGITRANS-CM (AGROCAM S.A.)",
      tagline: "RNCP certification exam (BC04): 5 microservices for a simulated Cameroonian agro-industrial group — offline-first field agents, data sovereignty, and Hyperledger blockchain traceability.",
      role: "Cloud Architect & Full-Stack Developer",
      period: "May 2026 (3-day exam)",
      stack: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "Docker", "Kubernetes", "Terraform", "AWS", "Azure", "Hyperledger Fabric", "GitHub Actions"],
      services: ["Cloud & Hybrid Architecture", "Software Engineering"],
      summary:
        "RNCP39765 certification exam (BC04 block, EADL 4): as a team of 3 students over 3 days, design and deployment of the DIGITRANS-CM scenario architecture — modernizing AGROCAM S.A.'s SI (simulated Cameroonian agro-industrial group) into hybrid AWS/Azure cloud microservices, with an offline-first Supply Chain and Hyperledger Fabric traceability. Deliverables: deployed application, technical documentation, security report, jury defense.",
      metrics: [
        { value: "3", label: "Exam days", description: "Team of 3 students, reconstructed scenario, jury" },
        { value: "5", label: "Microservices", description: "API Gateway, ERP, CRM, Supply Chain, BI" },
        { value: "C21–C26", label: "Assessed competencies", description: "Cloud integration, IaC, administration, performance, security, blockchain" },
        { value: "100%", label: "Requirements covered", description: "Data sovereignty (Law 2010/012), offline-first, HA ≥ 99.9%" }
      ],
      sections: [
        {
          id: "context",
          title: "01. The Exam & African Constraints",
          content:
            "Within the RNCP39765 certification exam (BC04 block 'Optimizing the SI with Cloud Computing'), the scenario places the team at CAMTECH SOLUTIONS S.A., a Cameroonian IT services company, on the DIGITRANS-CM mission for AGROCAM S.A.: replacing a 2009 monolith with a distributed, partially cloud SI. Traditional cloud architectures often fail in rural African environments where 2G/3G connectivity is spotty — field agents lose hours of operational logs during outages. Furthermore, Cameroonian Law n°2010/012 restricts storing financial and HR data outside national borders, ruling out pure public cloud. Three days, in a team of three, to deliver a deployed application and a security report in front of a jury.",
          quote: "Cloud architecture in Africa must be built for operational reality: intermittent connectivity, local data sovereignty, and offline resilience — and in a 3-day exam, every choice must be defensible."
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
          title: "03. Exam Results & Takeaways",
          content:
            "The exam was delivered within the allotted time: deployed application (hybrid AWS/Azure, Terraform, 5-stage CI/CD), technical documentation, security report (C25–C26) including the Hyperledger Fabric solution, and jury defense. Beyond the certification, it's the ability to make complex architectural decisions under deadline pressure — and defend them — that makes the exercise valuable."
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
      period: "Juillet — Août 2026",
      stack: ["n8n", "DeepSeek v4 Flash", "Tavily API", "OpenRouter", "Redis", "Next.js", "Data Tables", "MCP"],
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
            "Le système repose sur deux workflows n8n interconnectés par une Data Table CRM commune et une mémoire Redis. Lorsqu'un prospect soumet un formulaire, le Lead Agent s'exécute : il effectue une recherche web Tavily sur l'entreprise, compare ses besoins au catalogue de services, formule un score de 1 à 10 et génère un email personnalisé via DeepSeek v4 Flash (OpenRouter). Le second workflow — le WhatsApp CRM Assistant — permet au décideur d'interroger cette même CRM en langage naturel directement depuis WhatsApp, sans ouvrir aucun dashboard.",
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
            "Le Lead Qualification Agent tourne en production : webhook sécurisé par header + filtrage IP, gestion d'erreur robuste (onError → continueErrorOutput) et journalisation des échecs dans la CRM — aucun lead ne peut être égaré. Le WhatsApp CRM Assistant est construit et testé ; sa publication n'attend que ses credentials WhatsApp Business."
        }
      ],
      repoUrl: undefined,
      siteUrl: undefined
    },
    en: {
      title: "AI-Powered Lead Management Pipeline",
      tagline: "Two AI agents share one CRM — the first qualifies every lead in < 30 seconds, the second allows querying and acting on data directly from WhatsApp.",
      role: "AI Architect & Software Engineer",
      period: "July — August 2026",
      stack: ["n8n", "DeepSeek v4 Flash", "Tavily API", "OpenRouter", "Redis", "Next.js", "Data Tables", "MCP"],
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
            "The architecture links two n8n workflows through a shared CRM Data Table and persistent Redis memory. Upon form submission, the Lead Agent triggers Tavily web search, matches prospect requirements with the service catalog, scores lead intent (1-10), and drafts a tailored email via DeepSeek v4 Flash (OpenRouter). The second workflow — the WhatsApp CRM Assistant — lets the decision-maker query that same CRM in natural language directly from WhatsApp, without opening any dashboard.",
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
            "The Lead Qualification Agent is now running in production: header-secured webhook + IP filtering, robust error routing (onError → continueErrorOutput) and failure logging into the CRM — no lead can ever be lost. The WhatsApp CRM Assistant is built and tested; its publication only awaits the WhatsApp Business credentials."
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
