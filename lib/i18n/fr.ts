export const fr = {
  nav: {
    services: "Services",
    process: "Comment ça marche",
    realisations: "Réalisations",
    cta: "Démarrer un projet",
    opposite: "EN",
  },
  hero: {
    status: "Disponible pour de nouveaux projets",
    title: "Je conçois, sécurise et automatise des systèmes logiciels pour des entreprises qui ont besoin que ça fonctionne en production — pas juste en démo.",
    subtitle: "Ingénieur logiciel Tech Lead & Spécialiste automatisation IA basé à Douala, Cameroun. J'interviens en freelance pour structurer votre backend, sécuriser vos architectures cloud et intégrer des agents IA autonomes dans vos workflows métiers.",
    viewServices: "Découvrir mes services",
    startProject: "Démarrer un projet",
    connect: "Me contacter",
  },
  services: {
    title: "Mes Services",
    subtitle: "Des prestations ciblées pour construire des applications résilientes, automatiser vos processus et sécuriser vos infrastructures.",
    cta: "En savoir plus",
    back: "Retour aux services",
    whyMe: "Pourquoi travailler avec moi ?",
    deliverables: "Ce que vous obtenez (Livrables)",
    cases: "Cas d'usage typiques",
    relatedProject: "Réalisation associée",
    contactCTA: "Discuter de ce besoin",
    items: {
      "developpement-web": {
        title: "Développement Web Full-Stack",
        shortDesc: "Applications web robustes et évolutives, de la conception de la base de données au déploiement de production.",
        longDesc: "Je prends en charge la conception et le développement de vos plateformes web critiques. Pas de compromis sur la qualité : typage strict, architecture découplée, gestion des transactions SQL et verrous d'accès concurrents pour garantir l'intégrité de vos données.",
        stack: ["Laravel", "Next.js", "Angular", "React", "Inertia.js", "PostgreSQL", "Redis", "Docker", "Laravel Reverb (WebSockets)", "Typesense"],
        deliverables: [
          "Application web complète clé en main (code source structuré et documenté)",
          "APIs REST ou temps réel performantes et documentées (OpenAPI/Swagger)",
          "Système d'authentification sécurisé (SSO, JWT, sessions Redis avec TTL)",
          "Recherche facettée ultra-rapide et passerelles de paiement/séquestre intégrées",
          "Tests unitaires et d'intégration couvrant les fonctionnalités critiques"
        ],
        cases: [
          "Plateformes SaaS complexes nécessitant une logique métier poussée",
          "Marketplaces avec flux financiers complexes (système de séquestre/escrow)",
          "Applications métiers internes pour automatiser la gestion d'activité",
          "Refonte technique complète de backends obsolètes pour monter en charge"
        ]
      },
      "architecture-cloud": {
        title: "Architecture Cloud & Hybride",
        shortDesc: "Infrastructures cloud et hybrides sécurisées et résilientes, adaptées aux réalités de connectivité du terrain africain.",
        longDesc: "Je conçois et déploie des architectures cloud (AWS/Azure) et hybrides. Ayant une forte expérience du terrain en Afrique centrale, j'intègre les contraintes réelles (liens MPLS onéreux, coupures électriques, connectivité variable, souveraineté locale des données) pour proposer des architectures hybrides pragmatiques et hautement disponibles.",
        stack: ["Azure", "AWS", "Terraform (IaC)", "Docker", "Kubernetes", "MPLS", "IPSec VPN", "Active Directory", "Microsoft 365", "Veeam Backup", "Zabbix & Grafana"],
        deliverables: [
          "Dossier d'Architecture Documenté (Diagrammes détaillés et ADR - Architecture Decision Records)",
          "Infrastructure en production déployée par code (Terraform)",
          "Plan de migration cloud progressif découpé en phases autonomes",
          "Plan de Reprise d'Activité (PRA/PCA) avec RTO et RPO définis et testés",
          "Sessions de transfert de compétences pour votre équipe IT locale"
        ],
        cases: [
          "Interconnexion de sites distants (sièges et agences) avec failover automatique",
          "Migration progressive d'infrastructures physiques (on-premise) vers le cloud",
          "Mise en place de stratégies de sauvegarde redondantes et sécurisées hors-site",
          "Automatisation du provisionnement des serveurs via Infrastructure as Code"
        ]
      },
      "audit-securite": {
        title: "Audit & Sécurité applicative",
        shortDesc: "Analyse en profondeur de votre code et de vos serveurs pour identifier et corriger les vulnérabilités avant qu'elles ne soient exploitées.",
        longDesc: "La sécurité n'est pas une option ou un module qu'on ajoute à la fin. J'analyse vos applications et infrastructures sous l'angle offensif pour détecter les failles logiques, les faiblesses d'authentification et les erreurs de configuration réseau, puis je vous accompagne dans leur résolution.",
        stack: ["OWASP Top 10", "RBAC granulaire", "Chiffrement AES-256", "Protection SSRF / CSRF", "Sessions Redis TTL", "Audit de dépendances", "Sécurisation headers HTTP (CSP, HSTS)"],
        deliverables: [
          "Rapport d'audit de sécurité complet et vulgarisé pour la direction",
          "Registre des vulnérabilités classées par criticité (de Critique à Faible)",
          "Roadmap de remédiation technique avec estimation de l'effort de correction",
          "Mise en œuvre des correctifs prioritaires sur votre code source",
          "Rapport de contre-audit validant la correction des failles détectées"
        ],
        cases: [
          "Audit de conformité avant la mise en production d'une application sensible",
          "Analyse post-incident de sécurité pour comprendre et boucher une faille exploitée",
          "Revue de code (backend et frontend) axée sur la logique métier et les droits d'accès",
          "Durcissement de la configuration des serveurs web, bases de données et pare-feu"
        ]
      },
      "automatisation-ia": {
        title: "Automatisation IA & Agents",
        shortDesc: "Intégration d'agents IA autonomes dans vos logiciels pour automatiser vos tâches répétitives complexes.",
        longDesc: "Je ne vends pas de gadgets IA. J'intègre des systèmes d'agents autonomes directement connectés à vos bases de données et API de production. Grâce à des protocoles comme MCP et des frameworks d'orchestration de graphes (LangGraph), l'IA exécute des workflows complexes et fiables à l'intérieur de vos outils existants.",
        stack: ["MCP (Model Context Protocol)", "LangGraph", "CrewAI", "APIs Claude / OpenAI", "Intégration Node.js / Laravel / Python"],
        deliverables: [
          "Document de cadrage identifiant les processus à fort ROI automatisables par l'IA",
          "Workflow d'agents IA conçu, modélisé et testé (gestion de mémoire et d'outils)",
          "Intégration transparente dans votre application existante (Laravel, Next.js, etc.)",
          "Console de supervision pour suivre et valider les actions des agents IA",
          "Documentation technique et guide d'exploitation opérationnel"
        ],
        cases: [
          "Traitement automatique de documents entrants (factures, devis, contrats complexes)",
          "Agents de qualification de leads et de support client niveau 2 avec accès BDD",
          "Génération automatique de rapports d'activité complexes basés sur des données multi-sources",
          "Orchestration de tâches administratives multi-étapes sans intervention humaine"
        ]
      }
    }
  },
  process: {
    title: "Comment ça marche ?",
    subtitle: "Une méthodologie transparente, sans effet boîte noire, axée sur des livrables concrets à chaque étape.",
    cta: "Démarrer une collaboration",
    phases: [
      {
        num: "01",
        title: "Cadrage & Alignement",
        duration: "1 à 3 jours",
        desc: "Nous analysons votre besoin réel. L'objectif est de comprendre le problème métier sous-jacent pour vous proposer l'approche la plus pragmatique, pas la plus complexe.",
        deliverables: [
          "Compréhension approfondie et formalisée du besoin métier",
          "Proposition d'architecture macro avec choix technologiques justifiés",
          "Définition claire du périmètre de livraison (ce qui est inclus et exclu)",
          "Estimation précise du budget et du calendrier"
        ]
      },
      {
        num: "02",
        title: "Architecture & Conception",
        duration: "Variable selon la taille",
        desc: "Avant d'écrire du code, nous posons des bases solides. Tout est modélisé et documenté pour éviter les mauvaises surprises et les pivots coûteux en cours de route.",
        deliverables: [
          "Diagrammes d'architecture (flux de données, composants, déploiement)",
          "Architecture Decision Records (ADR) documentant les choix structurants",
          "Configuration de l'environnement de développement et de staging",
          "Première version squelette déployée sur l'environnement de staging"
        ]
      },
      {
        num: "03",
        title: "Build & Itérations",
        duration: "Développement actif",
        desc: "Le développement se fait de manière itérative. Vous avez accès au dépôt Git et à l'environnement de staging dès le premier jour pour suivre l'avancement en continu.",
        deliverables: [
          "Livraisons fonctionnelles régulières testées en staging",
          "Code source typé, propre et couvert par des tests automatisés",
          "Points d'avancement réguliers pour valider les étapes intermédiaires",
          "Aucun effet tunnel : vous voyez l'application grandir semaine après semaine"
        ]
      },
      {
        num: "04",
        title: "Livraison & Autonomie",
        duration: "Déploiement & Suivi",
        desc: "Je déploie l'application en production et m'assure que vos équipes soient totalement autonomes pour la maintenir. Vous êtes propriétaire à 100% de tout ce qui a été produit.",
        deliverables: [
          "Application déployée en production avec monitoring configuré",
          "Documentation technique complète et runbook d'exploitation",
          "Sessions de formation pour vos équipes techniques et fonctionnelles",
          "Période de garantie et de support post-déploiement"
        ]
      }
    ]
  },
  realisations: {
    title: "Réalisations",
    subtitle: "Études de cas concrètes de projets que j'ai conçus, développés et déployés en production.",
    all: "Tous les projets",
    role: "Mon rôle",
    period: "Période",
    stack: "Stack technique",
    visitRepo: "Voir le code source",
    visitSite: "Visiter le site",
    cta: "Lire l'étude de cas",
    back: "Retour aux réalisations",
    toc: "Sommaire",
  },
  contact: {
    title: "Démarrer un projet",
    subtitle: "Décrivez votre besoin. Je reviens vers vous sous 24h avec une première analyse technique et méthodologique.",
    steps: {
      projectType: "Étape 1 : Quel type de projet ?",
      description: "Étape 2 : Décrivez votre projet",
      context: "Étape 3 : Contexte",
      contact: "Étape 4 : Vos coordonnées",
    },
    fields: {
      typePlaceholder: "Sélectionnez un ou plusieurs domaines...",
      types: {
        web: "Développement d'application web",
        cloud: "Architecture / Migration cloud",
        security: "Audit de sécurité & correctifs",
        ai: "Automatisation IA & agents",
        other: "Autre besoin / Je ne sais pas encore"
      },
      descLabel: "Qu'est-ce que vous cherchez à construire, sécuriser ou automatiser ?",
      descPlaceholder: "Décrivez brièvement les objectifs du projet, les fonctionnalités clés attendues et le problème métier que vous cherchez à résoudre...",
      codebaseLabel: "Avez-vous déjà une base de code existante ?",
      codebaseOptions: {
        yes: "Oui, nous avons un projet existant à faire évoluer/sécuriser",
        no: "Non, c'est un projet à démarrer de zéro"
      },
      timelineLabel: "Délai souhaité",
      timelineOptions: {
        urgent: "Urgent (moins d'un mois)",
        short: "Court terme (1 à 3 mois)",
        medium: "Moyen terme (3 à 6 mois)",
        flexible: "Pas de contrainte / Flexible"
      },
      teamLabel: "Taille de votre équipe technique actuelle",
      teamOptions: {
        solo: "Aucun développeur (projet solo)",
        small: "Petite équipe (2 à 5 personnes)",
        medium: "Équipe moyenne (5 à 15 personnes)",
        large: "Grande équipe (plus de 15 personnes)"
      },
      nameLabel: "Prénom & Nom",
      namePlaceholder: "Jean Dupont",
      emailLabel: "Email professionnel",
      emailPlaceholder: "jean.dupont@entreprise.com",
      whatsappLabel: "Numéro WhatsApp (optionnel, pour des échanges rapides)",
      whatsappPlaceholder: "+237 6xx xxx xxx",
      sourceLabel: "Comment avez-vous entendu parler de moi ?",
      sourcePlaceholder: "LinkedIn, recherche Google, recommandation..."
    },
    buttons: {
      next: "Suivant",
      prev: "Précédent",
      submit: "Envoyer ma demande",
      submitting: "Envoi en cours...",
    },
    success: {
      title: "Demande reçue !",
      message: "Merci pour votre message. J'analyse vos besoins et je reviens vers vous sous 24h avec une première analyse de faisabilité technique et une proposition de créneau pour en discuter de vive voix."
    },
    error: {
      title: "Erreur lors de l'envoi",
      message: "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer ou m'envoyer directement un email à samendjiaha@gmail.com."
    }
  },
  footer: {
    rights: "Tous droits réservés.",
    location: "Disponible en télétravail international et sur site à Douala.",
    specialty: "Samen Steeve · Ingénieur Logiciel & Architecte Solutions",
    bookCall: "Réserver un appel (30 min)"
  }
} as const;
