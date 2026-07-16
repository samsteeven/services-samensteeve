export const fr = {
  nav: {
    services: "Services",
    servicesLabel: "MES SERVICES.",
    process: "Comment ça marche",
    realisations: "Réalisations",
    explore: "Explorer",
    moi: "Moi",
    blog: "Blog",
    contactShort: "Me contacter",
    cta: "Démarrer un projet",
    opposite: "EN",
    serviceItems: [
      { label: "Développement Web", slug: "developpement-web" },
      { label: "Architecture Cloud", slug: "architecture-cloud" },
      { label: "Audit & Sécurité", slug: "audit-securite" },
      { label: "Agents IA", slug: "agents-ia" },
    ],
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
    title: "Ce que je fais",
    tagline: "Construire, défendre, accélérer — pas de blabla, que du concret.",
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
        punchline: "Des applications qui ne tombent pas en panne. Backend solide, frontend rapide, zéro compromis sur la fiabilité.",
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
        punchline: "Votre infrastructure qui fonctionne même quand tout le reste casse. Conçue pour les réalités du terrain.",
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
        title: "Audit & Sécurité",
        punchline: "Je trouve les failles avant que les autres ne les trouvent. Audit offensif, pas de checklist passive.",
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
        title: "Automatisation IA",
        punchline: "L'IA qui travaille pour vous, pas l'inverse. Agents autonomes connectés à vos vrais outils.",
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
    subtitle: "Une méthode d'ingénierie rigoureuse, sans boîte noire — chaque phase produit des livrables concrets que vous pouvez auditer.",
    cta: "Démarrer une collaboration",
    phases: [
      {
        num: "01",
        title: "Discovery & Audit",
        duration: "1 à 3 jours",
        desc: "Avant d'écrire une ligne de code, j'audite l'existant et cadre le problème réel. Si vous avez déjà un projet, j'analyse la base de code, l'infrastructure et les risques de sécurité. Si c'est un greenfield, je cartographie les contraintes métier et techniques pour éviter les pivots coûteux.",
        deliverables: [
          "Rapport d'audit technique : dette, risques, points bloquants identifiés",
          "Cartographie des flux métier et des contraintes de performance",
          "Périmètre de livraison formalisé (scope, hors-scope, hypothèses)",
          "Estimation chiffrée avec découpage en phases autonomes"
        ]
      },
      {
        num: "02",
        title: "Architecture & Proof of Concept",
        duration: "3 à 7 jours",
        desc: "Je conçois l'architecture cible avant de construire. Les choix technologiques sont justifiés par des ADR (Architecture Decision Records). Un POC validé sur les points de risque techniques est livré avant le démarrage du build — pour éliminer les inconnues, pas pour les reporter.",
        deliverables: [
          "Diagrammes d'architecture (C4 : contexte, conteneurs, composants, déploiement)",
          "ADR documentant chaque choix structurant (stack, patterns, sécurité)",
          "Schéma de base de données avec contraintes, index et stratégie de migration",
          "POC fonctionnel validant les hypothèses techniques à risque"
        ]
      },
      {
        num: "03",
        title: "Build Itératif & CI/CD",
        duration: "Sprints de 2 semaines",
        desc: "Le développement se fait en sprints courts. Dès le premier sprint, un pipeline CI/CD est en place : chaque commit est testé, linté et déployé automatiquement sur staging. Vous avez accès au dépôt Git et à l'environnement de staging en temps réel — zéro effet tunnel.",
        deliverables: [
          "Pipeline CI/CD opérationnel dès le sprint 1 (tests, lint, déploiement auto)",
          "Code source typé strict, reviewé et couvert par des tests unitaires et d'intégration",
          "Démo de fin de sprint avec validation fonctionnelle en environnement staging",
          "Changelog structuré et documentation technique mise à jour à chaque livraison"
        ]
      },
      {
        num: "04",
        title: "Hardening, Déploiement & Autonomie",
        duration: "1 à 2 semaines",
        desc: "Avant la mise en production, j'effectue un hardening complet : audit OWASP, tests de charge, revue des permissions et des secrets. La mise en prod est outillée (monitoring, alerting, rollback). Vos équipes reçoivent la formation et la documentation pour opérer le système en toute autonomie.",
        deliverables: [
          "Rapport d'audit de sécurité pré-prod : OWASP Top 10, headers, dépendances",
          "Tests de charge et validation des SLO (temps de réponse, disponibilité cible)",
          "Monitoring & alerting configurés (Grafana, Sentry ou équivalent) avec runbook",
          "Documentation opérationnelle complète + session de transfert de compétences"
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
      step1: "Offre",
      step2: "Portée",
      step3: "Objectifs",
      step4: "Contexte",
      step5: "Contact",
      step6: "Récapitulatif",
    },
    questions: {
      step1: "Quel type de projet souhaitez-vous démarrer ?",
      step2: "Dites-moi ce que vous cherchez à faire",
      step3: "À quoi ressemble la réussite ?",
      step4: "Partagez tout ce qui m'aide à comprendre",
      step5: "Où peut-on vous joindre ?",
      step6: "Un dernier coup d'œil",
    },
    fields: {
      typePlaceholder: "Sélectionnez un ou plusieurs domaines...",
      types: {
        web: "Développement Web",
        cloud: "Architecture Cloud",
        security: "Audit & Sécurité",
        ai: "Automatisation IA",
        other: "Pas encore sûr"
      },
      typesDesc: {
        web: "Créer ou faire évoluer une application web (SaaS, API, Marketplace) robuste et typée strict.",
        cloud: "Concevoir, sécuriser et migrer des infrastructures avec failover et résilience.",
        security: "Audit offensif complet, registre des vulnérabilités et remédiation du code.",
        ai: "Intégrer des agents IA autonomes (LangGraph, MCP) connectés à vos API métiers.",
        other: "Aidez-moi à cadrer le besoin et à définir les priorités techniques."
      },
      descLabel: "Description du projet",
      descPlaceholder: "Décrivez les objectifs, les fonctionnalités clés attendues et le problème métier à résoudre. Plus vous êtes précis, mieux je pourrai analyser.",
      codebaseLabel: "Avez-vous déjà une base de code existante ?",
      codebaseOptions: {
        yes: "Oui, un projet existant à faire évoluer ou sécuriser",
        no: "Non, c'est un projet à démarrer de zéro"
      },
      timelineLabel: "Quand aimeriez-vous commencer ?",
      timelineOptions: {
        urgent: "Dès que possible",
        short: "D'ici 1 à 3 mois",
        medium: "D'ici 3 à 6 mois",
        flexible: "J'explore simplement"
      },
      budgetLabel: "Fourchette budgétaire approximative",
      budgetOptions: {
        small: "2 000 € à 5 000 €",
        medium: "5 000 € à 10 000 €",
        large: "10 000 € à 20 000 €",
        enterprise: "20 000 €+"
      },
      goalsLabel: "Quel résultat visez-vous ?",
      goalsOptions: {
        launch: "Lancer un nouveau produit (SaaS, MVP)",
        automate: "Remplacer ou automatiser des tâches manuelles",
        secure: "Sécuriser des systèmes et données critiques",
        scale: "Passer à l'échelle / améliorer la performance",
        team: "Renforcer et accompagner l'équipe technique"
      },
      teamLabel: "Taille de votre équipe technique actuelle",
      teamOptions: {
        solo: "Aucun développeur (projet solo)",
        small: "Petite équipe (2 à 5 personnes)",
        medium: "Équipe moyenne (5 à 15 personnes)",
        large: "Grande équipe (plus de 15 personnes)"
      },
      linksLabel: "Liens utiles (Figma, GitHub, staging)",
      addLink: "Ajouter un autre lien",
      nameLabel: "Prénom & Nom",
      namePlaceholder: "Jean Dupont",
      emailLabel: "Email professionnel",
      emailPlaceholder: "jean.dupont@entreprise.com",
      companyLabel: "Entreprise (optionnel)",
      companyPlaceholder: "Acme Corp",
      roleLabel: "Votre rôle (optionnel)",
      rolePlaceholder: "Product Owner, CTO, Fondateur...",
      whatsappLabel: "Numéro WhatsApp / Téléphone",
      whatsappPlaceholder: "+237 6xx xxx xxx",
      sourceLabel: "Comment avez-vous entendu parler de moi ?",
      sourcePlaceholder: "LinkedIn, recherche Google, recommandation..."
    },
    buttons: {
      next: "Continuer",
      prev: "Retour",
      submit: "Confirmer & envoyer",
      submitting: "Envoi en cours...",
    },
    success: {
      title: "Demande reçue !",
      message: "Merci pour votre message. J'analyse vos besoins et je reviens vers vous sous 24h avec une première analyse technique et méthodologique. Vous recevrez également un lien pour planifier un appel si vous le souhaitez."
    },
    error: {
      title: "Erreur lors de l'envoi",
      message: "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer ou m'envoyer directement un email à contact@samensteeve.com."
    }
  },
  footer: {
    rights: "Tous droits réservés.",
    location: "Disponible en télétravail international et sur site à Douala.",
    specialty: "Samen Steeve · Ingénieur Logiciel & Architecte Solutions",
    bookCall: "Réserver un appel (30 min)"
  }
} as const;
