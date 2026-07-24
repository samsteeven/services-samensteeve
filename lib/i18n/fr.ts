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
      { label: "Ingénierie logicielle", slug: "ingenierie-logicielle" },
      { label: "Architecture Cloud", slug: "architecture-cloud" },
      { label: "Audit Sécurité & Pentest", slug: "audit-securite" },
      { label: "Automatisation IA", slug: "automatisation-ia" },
    ],
  },
  hero: {
    status: "Disponible pour de nouveaux projets",
    title: "Je conçois, sécurise et automatise des systèmes logiciels pour des entreprises qui ont besoin que ça fonctionne en production — pas juste en démo.",
    subtitle: "Ingénieur logiciel Tech Lead & Spécialiste automatisation IA basé à Douala, Cameroun. J'interviens en freelance pour structurer votre backend, sécuriser vos architectures cloud et intégrer des agents IA autonomes dans vos workflows métiers.",
    heroSub: "Ingénieur logiciel indépendant et Tech Lead basé à Douala. Je conçois des systèmes logiciels robustes, déploie des infrastructures cloud hybrides et automatise vos workflows métier avec des agents IA supervisables.",
    availability: "Disponible · Douala, Cameroun",
    headline: "Vos systèmes tiennent en **production**. C'est mon seul critère.",
    ctaCall: "Réserver un appel de 30 min",
    ctaExplore: "ou explorez les offres",
    scrollDown: "Découvrir",
    viewServices: "Découvrir mes services",
    startProject: "Démarrer un projet",
    connect: "Me contacter",
  },
  services: {
    title: "Ce que je fais",
    tagline: "Des systèmes logiciels sérieux, de l'architecture jusqu'à la sécurité opérationnelle.",
    subtitle: "J'interviens là où un simple site web ne suffit pas : produits logiciels, plateformes métier, infrastructures hybrides, tests d'intrusion applicatifs et automatisations IA branchées sur vos vrais processus.",
    cta: "En savoir plus",
    back: "Retour aux services",
    whyMe: "Pourquoi travailler avec moi ?",
    deliverables: "Ce que vous obtenez (Livrables)",
    cases: "Cas d'usage typiques",
    relatedProject: "Réalisation associée",
    contactCTA: "Discuter de ce besoin",
    items: {
      "ingenierie-logicielle": {
        title: "Ingénierie Logicielle",
        punchline: "Je conçois et construis des produits logiciels complets : plateformes métier, APIs, backends critiques, interfaces et intégrations.",
        shortDesc: "Conception, développement et industrialisation de systèmes logiciels robustes, pas seulement des interfaces web.",
        longDesc: "Je prends en charge la construction de logiciels de production : cadrage fonctionnel, architecture applicative, backend, frontend, APIs, intégrations, données, tests et déploiement. L'objectif n'est pas de livrer des écrans, mais un système fiable, maintenable et exploitable par votre équipe.",
        stack: ["Architecture applicative", "Backend & APIs", "Frontend produit", "Bases de données", "Intégrations métier", "Tests & CI/CD", "Observabilité", "Documentation"],
        outcomes: [
          "Un produit logiciel fiable, maintenable et aligné sur vos processus métier.",
          "Une architecture capable d'évoluer sans transformer chaque nouvelle fonctionnalité en dette technique.",
          "Des workflows critiques sécurisés : paiements, rôles, validations, synchronisation, recherche ou reporting.",
          "Une base de code documentée, testée et transmissible à une équipe interne."
        ],
        scope: [
          "Cadrage du besoin, modélisation du domaine et définition des flux métier avant développement.",
          "Conception backend, API, base de données, règles d'accès, jobs, événements et intégrations externes.",
          "Développement d'interfaces web ou dashboards quand elles servent le produit, sans limiter l'offre au web.",
          "Mise en place de tests, CI/CD, monitoring applicatif et documentation technique exploitable."
        ],
        deliverables: [
          "Architecture applicative documentée avec modèles de données et décisions techniques",
          "Backend, APIs et interfaces nécessaires au produit, livrés avec code source structuré",
          "Système d'authentification, rôles, permissions et workflows métier critiques",
          "Tests unitaires, intégration continue et environnement de staging",
          "Documentation technique et transfert pour reprise par votre équipe"
        ],
        cases: [
          "Plateforme métier ou SaaS avec logique complexe et plusieurs profils utilisateurs",
          "Produit interne pour remplacer des fichiers Excel, traitements manuels ou outils dispersés",
          "API ou backend critique à fiabiliser avant montée en charge",
          "Refonte technique d'un logiciel existant devenu difficile à maintenir"
        ],
        faq: [
          {
            q: "Combien de temps faut-il pour développer mon projet ?",
            a: "Un projet typique (plateforme métier, SaaS) prend entre 4 et 12 semaines selon la complexité. Je livre par phases itératives pour que vous puissiez valider régulièrement l'avancement."
          },
          {
            q: "Est-ce que je garde la propriété du code ?",
            a: "Oui, vous êtes propriétaire de 100% du code source livré. Je fournis également la documentation technique pour que votre équipe puisse reprendre le projet."
          },
          {
            q: "Comment se déroule la collaboration ?",
            a: "Nous commençons par un appel de cadrage gratuit (30 min). Si le projet correspond à mes compétences, je vous envoie une proposition détaillée avec estimation, livrables et planning."
          },
          {
            q: "Travaillez-vous avec des frameworks spécifiques ?",
            a: "Je travaille principalement avec Laravel (backend) et React/Next.js ou Angular (frontend). Je peux m'adapter à votre stack existant si nécessaire."
          }
        ]
      },
      "architecture-cloud": {
        title: "Architecture Cloud & Hybride",
        punchline: "Des architectures cloud et hybrides pensées pour les contraintes réelles : réseau instable, sites distants, sécurité et continuité.",
        shortDesc: "Infrastructures cloud et hybrides sécurisées et résilientes, adaptées aux réalités de connectivité du terrain africain.",
        longDesc: "Je conçois et déploie des architectures cloud (AWS/Azure) et hybrides. Ayant une forte expérience du terrain en Afrique centrale, j'intègre les contraintes réelles (liens MPLS onéreux, coupures électriques, connectivité variable, souveraineté locale des données) pour proposer des architectures hybrides pragmatiques et hautement disponibles.",
        stack: ["Cloud AWS/Azure", "Infrastructure hybride", "Réseau & VPN", "IaC Terraform", "Sauvegarde & PRA", "Monitoring", "Identité Microsoft 365", "Runbooks"],
        outcomes: [
          "Une infrastructure documentée, reproductible et alignée sur vos contraintes de terrain.",
          "Un plan de continuité clair : sauvegarde, reprise, supervision, alertes et responsabilités.",
          "Des sites, utilisateurs et workloads interconnectés sans dépendre d'un seul point de panne.",
          "Une équipe IT capable d'opérer l'environnement après transfert."
        ],
        scope: [
          "Audit de l'existant : réseau, serveurs, cloud, identité, sauvegarde, sécurité et coûts.",
          "Conception d'architecture cible avec scénarios de migration réalistes et phasés.",
          "Mise en place d'infrastructure as code, supervision, sauvegarde et procédures de reprise.",
          "Documentation opérationnelle et accompagnement des équipes IT locales."
        ],
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
        ],
        faq: [
          {
            q: "Combien de temps dure une mission d'architecture ?",
            a: "Une mission typique d'audit et conception d'architecture dure entre 2 et 4 semaines. La migration effective peut être plus longue selon la complexité."
          },
          {
            q: "Travaillez-vous uniquement avec AWS et Azure ?",
            a: "Je travaille principalement avec AWS et Azure mais je peux m'adapter à d'autres providers (GCP, OVH, etc.) selon vos contraintes ou préférences."
          },
          {
            q: "Est-ce que vous gérez la migration des données ?",
            a: "Oui, je conçois le plan de migration et peux accompagner l'exécution. Pour les volumes critiques, je recommande une approche progressive avec validation à chaque étape."
          },
          {
            q: "Que se passe-t-il après la mission ?",
            a: "Je livre la documentation complète et forme votre équipe IT à l'exploitation de la nouvelle architecture. Je peux rester disponible pour du support ponctuel."
          }
        ]
      },
      "audit-securite": {
        title: "Audit Sécurité & Pentest",
        punchline: "Cartographiez vos vulnérabilités avant qu'un attaquant ne le fasse — analyse d'exposition, tests d'intrusion infra & applicatif, audit cloud.",
        shortDesc: "Analyse d'exposition, tests d'intrusion (infra, applicatif, cloud AWS/Azure/GCP) et accompagnement à la remédiation pour renforcer durablement votre posture de sécurité.",
        longDesc: "J'évalue vos systèmes comme un attaquant réel. De la cartographie de votre surface d'exposition externe jusqu'aux tests d'intrusion internes (Active Directory, élévation de privilèges, accès réseau compromis), applicatifs (OWASP, APIs, mobiles) et cloud (AWS/Azure/GCP : erreurs de configuration, privilèges excessifs, services exposés), je reproduis des scénarios d'attaque concrets pour identifier les failles exploitables et vous fournir un plan de remédiation actionnable. Approche en trois volets — analyse d'exposition, pentest infrastructure & applicatif, audit des environnements cloud — adaptée à votre maturité.",
        stack: ["Analyse d'exposition", "Pentest infra", "Pentest applicatif", "OWASP Top 10", "Audit cloud AWS/Azure/GCP", "Active Directory", "Red Team", "Boîte noire/grise/blanche"],
        outcomes: [
          "Une cartographie précise de votre surface d'exposition vue depuis Internet — avant qu'un attaquant ne la dresse à votre place.",
          "Des preuves concrètes des failles exploitables, classées par impact réel, pas une liste brute de scanners.",
          "Un plan de remédiation priorisé selon le risque métier, avec des actions claires et actionnables pour vos équipes.",
          "Une restitution complète et un rapport de retest pour valider les corrections et réduire le risque résiduel."
        ],
        scope: [
          "Analyse d'exposition : scan technique des IPs et domaines, cartographie des services, identification des vulnérabilités connues et exploitation manuelle des cibles sensibles (Phase 1 : état des lieux, Phase 2 : exploitation ciblée).",
          "Test d'intrusion interne : simulation d'un attaquant ayant obtenu un accès réseau (VPN compromis, Wi-Fi, accès physique) — cartographie Active Directory, élévation de privilèges, accès aux données sensibles (RH, serveurs métiers, fichiers confidentiels).",
          "Pentest applicatif : tests offensifs sur vos applications web, APIs REST/GraphQL et mobiles (Android/iOS) selon les référentiels OWASP — authentification, autorisation, injections, logique métier, data exposure.",
          "Audit cloud (AWS/Azure/GCP) : revue des configurations, détection des erreurs de paramétrage, des privilèges excessifs, des services non sécurisés et recommandations de remédiation conformes aux meilleures pratiques."
        ],
        deliverables: [
          "Rapport d'audit complet : contexte, méthodologie, preuves d'exploitation, impact et recommandations actionnables",
          "Registre des vulnérabilités classées par criticité et risque métier réel",
          "Synthèse exécutive lisible par direction, DSI ou équipe produit (non technique)",
          "Atelier de restitution technique avec vos développeurs, équipes IT ou prestataires",
          "Rapport de retest après correction des failles prioritaires"
        ],
        cases: [
          "Audit d'exposition avant mise en production d'une application manipulant des données sensibles (santé, finance, RH)",
          "Test d'intrusion interne pour évaluer les risques liés aux accès réseau (employés, VPN, Wi-Fi, accès physique)",
          "Pentest d'application web, API REST/GraphQL ou application mobile selon l'OWASP",
          "Audit de configuration cloud (AWS/Azure/GCP) pour détecter les surfaces d'attaque exposées et les privilèges excessifs"
        ],
        faq: [
          {
            q: "Quelle est la différence entre boîte noire, boîte grise et boîte blanche ?",
            a: "En boîte noire, aucune information n'est fournie — conditions d'un piratage réel. En boîte grise, vous fournissez un accès partiel (idéal pour tester les portails authentifiés). En boîte blanche, vos équipes collaborent directement avec l'auditeur pour une revue approfondie de l'architecture. Je recommande la boîte grise pour la plupart des missions."
          },
          {
            q: "Faites-vous aussi des audits cloud ?",
            a: "Oui, j'audite les environnements AWS, Azure et GCP : erreurs de configuration IAM, services exposés, privilèges excessifs, buckets S3 ouverts, règles de firewall permissives, secrets exposés dans les variables d'environnement. Le rapport inclut des recommandations conformes aux benchmarks CIS."
          },
          {
            q: "Comment se déroule un test d'intrusion interne ?",
            a: "Je simule le comportement d'un attaquant ayant obtenu un accès à votre réseau (employé malveillant, VPN compromis, accès physique à un port réseau). L'objectif : cartographier l'infrastructure, élever les privilèges et évaluer l'impact sur vos données sensibles et votre Active Directory."
          },
          {
            q: "Que se passe-t-il après l'audit ?",
            a: "Je livre un rapport détaillé avec une synthèse exécutive et un plan de remédiation priorisé. Une session de restitution avec vos équipes permet de discuter des résultats et planifier les corrections. Je peux effectuer un retest des failles critiques après correction pour valider les mesures prises."
          }
        ]
      },
      "automatisation-ia": {
        title: "Automatisation IA",
        punchline: "Automatiser des processus réels avec des agents IA supervisables, intégrés à vos outils et à vos données.",
        shortDesc: "Intégration d'agents IA autonomes dans vos logiciels pour automatiser vos tâches répétitives complexes.",
        longDesc: "Je ne vends pas de gadgets IA. J'intègre des systèmes d'agents autonomes directement connectés à vos bases de données et API de production. Grâce à des protocoles comme MCP et des frameworks d'orchestration de graphes (LangGraph), l'IA exécute des workflows complexes et fiables à l'intérieur de vos outils existants.",
        stack: ["Agents IA", "MCP", "LangGraph", "Outils métier", "Validation humaine", "RAG", "APIs LLM", "Journalisation"],
        outcomes: [
          "Des tâches répétitives traitées plus vite sans perdre le contrôle humain.",
          "Des agents connectés à vos outils existants plutôt qu'un chatbot isolé.",
          "Des garde-fous : permissions, logs, validation, reprise en cas d'erreur.",
          "Un retour mesurable sur les processus automatisés."
        ],
        scope: [
          "Identification des workflows à fort ROI et des risques d'automatisation.",
          "Conception d'agents, outils, permissions, mémoire, étapes de validation et logs.",
          "Intégration aux APIs, bases de données, documents, CRM, ERP ou applications internes.",
          "Tableau de supervision pour suivre, corriger et améliorer les automatisations."
        ],
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
        ],
        faq: [
          {
            q: "Quelle est la différence avec un chatbot classique ?",
            a: "Contrairement à un chatbot qui répond à des questions, mes agents IA exécutent des actions concrètes dans vos systèmes : créer des enregistrements, générer des documents, déclencher des workflows, avec validation humaine aux points critiques."
          },
          {
            q: "Comment garantir que l'IA ne fait pas d'erreurs ?",
            a: "Je mets en place des garde-fous : permissions limitées, logs détaillés, étapes de validation humaine, et tests sur des données historiques. L'IA est supervisée, pas autonome sans contrôle."
          },
          {
            q: "Est-ce que ça marche avec mes outils existants ?",
            a: "Oui, je m'intègre à vos APIs, bases de données, CRM, ERP ou applications internes. L'objectif est que l'IA travaille à l'intérieur de votre écosystème existant, pas de vous forcer à tout changer."
          },
          {
            q: "Combien de temps pour voir des résultats ?",
            a: "Un POC fonctionnel peut être livré en 2 à 4 semaines pour un workflow ciblé. Cela permet de valider l'approche avant de l'étendre à d'autres processus."
          }
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
      step2: "Objectifs",
      step3: "Questions ciblées",
      step4: "Compléments",
      step5: "Contact",
      step6: "Récapitulatif",
    },
    questions: {
      step1: "Quel type de projet souhaitez-vous démarrer ?",
      step2: "À quoi ressemble la réussite ?",
      step3: "Quelques questions pour cadrer correctement",
      step4: "Quelque chose à ajouter ?",
      step5: "Où peut-on vous joindre ?",
      step6: "Un dernier coup d'œil",
    },
    fields: {
      typePlaceholder: "Sélectionnez un ou plusieurs domaines...",
      types: {
        web: "Ingénierie logicielle",
        cloud: "Architecture Cloud",
        security: "Audit Sécurité & Pentest",
        ai: "Automatisation IA",
        other: "Pas encore sûr"
      },
      typesDesc: {
        web: "Concevoir ou faire évoluer un logiciel métier, une plateforme, une API ou un produit complet.",
        cloud: "Concevoir, sécuriser et migrer des infrastructures avec failover et résilience.",
        security: "Cartographier les vulnérabilités exposées, tester les intrusions (infra, app, cloud) et prioriser la remédiation.",
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
      serviceGoals: {
        web: {
          title: "Résultats attendus pour le logiciel",
          options: {
            web_mvp: "Lancer un MVP ou une première version exploitable",
            web_platform: "Construire une plateforme métier complète",
            web_api: "Créer ou stabiliser une API / intégration système",
            web_refactor: "Améliorer un produit existant sans tout réécrire"
          }
        },
        cloud: {
          title: "Résultats attendus pour l'architecture cloud",
          options: {
            cloud_migration: "Migrer vers une architecture cloud ou hybride",
            cloud_resilience: "Améliorer disponibilité, sauvegardes et reprise",
            cloud_cost: "Réduire les coûts et clarifier l'exploitation",
            cloud_observability: "Mettre en place monitoring, logs et alerting"
          }
        },
        security: {
          title: "Résultats attendus pour la sécurité",
          options: {
            security_exposure: "Cartographier ma surface d'exposition vue depuis Internet",
            security_pentest: "Tester l'intrusion (infra interne, appli web/API, mobile)",
            security_cloud: "Auditer mes environnements cloud (AWS, Azure, GCP)",
            security_remediation: "Obtenir un plan de remédiation priorisé et accompagné"
          }
        },
        ai: {
          title: "Résultats attendus pour l'automatisation IA",
          options: {
            ai_workflow: "Automatiser un processus manuel répétitif",
            ai_agent: "Créer un agent IA connecté aux outils métier",
            ai_data: "Exploiter documents, données ou connaissances internes",
            ai_integration: "Intégrer l'IA dans une application existante"
          }
        },
        other: {
          title: "Résultats attendus à clarifier",
          options: {
            other_scope: "Clarifier le besoin et le périmètre",
            other_prioritize: "Prioriser les risques et prochaines actions",
            other_architecture: "Choisir une approche technique cohérente",
            other_roadmap: "Construire une feuille de route réaliste"
          }
        }
      },
      teamLabel: "Taille de votre équipe technique actuelle",
      teamOptions: {
        solo: "Aucun développeur (projet solo)",
        small: "Petite équipe (2 à 5 personnes)",
        medium: "Équipe moyenne (5 à 15 personnes)",
        large: "Grande équipe (plus de 15 personnes)"
      },
      serviceContextLabel: "Informations spécifiques aux services sélectionnés",
      serviceContext: {
        web: {
          title: "Ingénierie logicielle",
          placeholder: "Précisez le logiciel ou produit à construire : utilisateurs, rôles, workflows, fonctionnalités critiques, intégrations/API, contraintes métier ou de livraison...",
          prompts: ["Utilisateurs & rôles", "Fonctionnalités critiques", "Intégrations/API", "Contraintes métier"]
        },
        cloud: {
          title: "Architecture Cloud",
          placeholder: "Décrivez l'infrastructure actuelle ou cible : hébergeur, environnements, disponibilité attendue, sauvegardes, migration, scalabilité ou contraintes réseau...",
          prompts: ["Infrastructure actuelle", "Disponibilité", "Sauvegardes", "Migration/scalabilité"]
        },
        security: {
          title: "Audit Sécurité & Pentest",
          placeholder: "Décrivez le périmètre à auditer : type de test souhaité (exposition, pentest infra/appli, audit cloud), environnements autorisés, comptes de test disponibles, données sensibles concernées, contraintes de test et risques déjà identifiés...",
          prompts: ["Type de test (exposition/pentest/cloud)", "Périmètre autorisé", "Comptes de test", "Contraintes d'audit"]
        },
        ai: {
          title: "Automatisation IA",
          placeholder: "Décrivez le processus à automatiser : tâches manuelles, outils utilisés, sources de données, validations humaines, décisions à automatiser et risques à éviter...",
          prompts: ["Processus actuel", "Outils & données", "Décisions IA", "Contrôle humain"]
        },
        other: {
          title: "Besoin à cadrer",
          placeholder: "Expliquez ce qui est encore flou, les problèmes que vous voulez résoudre, les pistes envisagées et ce qui vous aiderait à décider de la bonne approche...",
          prompts: ["Problème principal", "Pistes envisagées", "Contraintes", "Décision attendue"]
        }
      },
      contextGroups: {
        web: {
          title: "Contexte logiciel",
          questions: [
            {
              key: "stage",
              label: "Stade du produit",
              options: [
                { value: "idea", label: "Idée ou cadrage initial" },
                { value: "prototype", label: "Prototype / maquette déjà existante" },
                { value: "live", label: "Produit déjà en production" },
                { value: "legacy", label: "Produit existant à moderniser" }
              ]
            },
            {
              key: "codebase",
              label: "Base technique",
              options: [
                { value: "none", label: "Aucune base de code" },
                { value: "partial", label: "Base partielle ou prototype" },
                { value: "existing", label: "Application existante maintenue" },
                { value: "unknown", label: "Je ne sais pas encore" }
              ]
            },
            {
              key: "users",
              label: "Utilisateurs visés",
              options: [
                { value: "internal", label: "Utilisateurs internes" },
                { value: "customers", label: "Clients / utilisateurs externes" },
                { value: "both", label: "Interne et externe" },
                { value: "admin", label: "Back-office / équipe opérationnelle" }
              ]
            },
            {
              key: "integration",
              label: "Intégrations attendues",
              options: [
                { value: "none", label: "Pas d'intégration critique" },
                { value: "payments", label: "Paiement, email, WhatsApp ou notifications" },
                { value: "business", label: "ERP, CRM, API métier ou base existante" },
                { value: "unknown", label: "À identifier ensemble" }
              ]
            }
          ]
        },
        cloud: {
          title: "Contexte cloud",
          questions: [
            {
              key: "current",
              label: "Infrastructure actuelle",
              options: [
                { value: "none", label: "Pas encore d'infrastructure" },
                { value: "onprem", label: "Serveurs locaux / on-premise" },
                { value: "cloud", label: "Déjà sur cloud public" },
                { value: "hybrid", label: "Hybride cloud + local" }
              ]
            },
            {
              key: "provider",
              label: "Environnement cible ou actuel",
              options: [
                { value: "aws", label: "AWS" },
                { value: "azure", label: "Azure" },
                { value: "other", label: "Autre hébergeur / VPS" },
                { value: "undecided", label: "Pas encore décidé" }
              ]
            },
            {
              key: "criticality",
              label: "Niveau de criticité",
              options: [
                { value: "standard", label: "Standard, interruption acceptable" },
                { value: "business", label: "Métier important, peu d'interruption" },
                { value: "critical", label: "Critique, haute disponibilité attendue" },
                { value: "unknown", label: "À évaluer" }
              ]
            },
            {
              key: "operations",
              label: "Priorité opérationnelle",
              options: [
                { value: "migration", label: "Migration" },
                { value: "resilience", label: "Résilience / sauvegardes" },
                { value: "cost", label: "Coûts et optimisation" },
                { value: "monitoring", label: "Monitoring et alerting" }
              ]
            }
          ]
        },
        security: {
          title: "Contexte sécurité",
          questions: [
            {
              key: "testType",
              label: "Type d'audit souhaité",
              options: [
                { value: "exposure", label: "Analyse d'exposition (surface visible depuis Internet)" },
                { value: "pentest", label: "Pentest infra interne (Active Directory, réseau)" },
                { value: "apppentest", label: "Pentest applicatif (web, API, mobile)" },
                { value: "cloud", label: "Audit cloud (AWS, Azure, GCP)" }
              ]
            },
            {
              key: "approach",
              label: "Approche de test",
              options: [
                { value: "blackbox", label: "Boîte noire (aucune info fournie, simulation réelle)" },
                { value: "greybox", label: "Boîte grise (accès partiel, portails authentifiés)" },
                { value: "whitebox", label: "Boîte blanche (collaboration complète avec les équipes IT)" },
                { value: "unknown", label: "À définir ensemble" }
              ]
            },
            {
              key: "environment",
              label: "Environnement autorisé",
              options: [
                { value: "staging", label: "Préproduction / staging" },
                { value: "production", label: "Production encadrée" },
                { value: "both", label: "Staging et production" },
                { value: "unknown", label: "À définir avant audit" }
              ]
            },
            {
              key: "authorization",
              label: "Préparation et autorisation",
              options: [
                { value: "ready", label: "Autorisation signée et comptes de test prêts" },
                { value: "accounts", label: "Comptes de test à préparer" },
                { value: "scope", label: "Périmètre à formaliser" },
                { value: "help", label: "Besoin d'aide pour cadrer légalement" }
              ]
            }
          ]
        },
        ai: {
          title: "Contexte automatisation IA",
          questions: [
            {
              key: "process",
              label: "Processus actuel",
              options: [
                { value: "manual", label: "Très manuel et répétitif" },
                { value: "spreadsheets", label: "Basé sur fichiers / tableurs" },
                { value: "tools", label: "Déjà dans des outils métier" },
                { value: "unclear", label: "Encore flou" }
              ]
            },
            {
              key: "data",
              label: "Sources de données",
              options: [
                { value: "documents", label: "Documents, PDF, emails ou messages" },
                { value: "database", label: "Base de données / API" },
                { value: "mixed", label: "Sources multiples" },
                { value: "not-ready", label: "Données pas encore structurées" }
              ]
            },
            {
              key: "humanReview",
              label: "Validation humaine",
              options: [
                { value: "required", label: "Validation humaine obligatoire" },
                { value: "exceptions", label: "Seulement sur cas douteux" },
                { value: "autonomous", label: "Automatisation largement autonome" },
                { value: "unknown", label: "À décider" }
              ]
            },
            {
              key: "systems",
              label: "Systèmes à connecter",
              options: [
                { value: "none", label: "Aucun système existant" },
                { value: "saas", label: "Outils SaaS / CRM / email" },
                { value: "internal", label: "Application ou API interne" },
                { value: "multiple", label: "Plusieurs systèmes" }
              ]
            }
          ]
        },
        other: {
          title: "Contexte à clarifier",
          questions: [
            {
              key: "clarity",
              label: "Niveau de clarté",
              options: [
                { value: "problem", label: "Le problème est clair, pas la solution" },
                { value: "solution", label: "Une solution est envisagée" },
                { value: "audit", label: "Besoin d'un avis technique externe" },
                { value: "early", label: "C'est encore exploratoire" }
              ]
            },
            {
              key: "constraint",
              label: "Contrainte principale",
              options: [
                { value: "time", label: "Temps / urgence" },
                { value: "budget", label: "Budget" },
                { value: "risk", label: "Risque technique ou sécurité" },
                { value: "alignment", label: "Alignement équipe / décision" }
              ]
            },
            {
              key: "decision",
              label: "Décision attendue",
              options: [
                { value: "build", label: "Construire" },
                { value: "secure", label: "Sécuriser" },
                { value: "automate", label: "Automatiser" },
                { value: "choose", label: "Choisir la bonne direction" }
              ]
            },
            {
              key: "stakeholders",
              label: "Parties prenantes",
              options: [
                { value: "founder", label: "Fondateur / direction" },
                { value: "product", label: "Produit / métier" },
                { value: "technical", label: "Équipe technique" },
                { value: "mixed", label: "Plusieurs profils" }
              ]
            }
          ]
        }
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
      clearStep: "Vider cette étape",
      resetAll: "Réinitialiser",
      resetConfirm: "Voulez-vous vraiment vider tout le formulaire ?",
      verification: "Vérification anti-bot",
      verificationLoading: "Chargement de la vérification...",
      verificationError: "La vérification anti-bot n'a pas pu se charger.",
      verificationRetry: "Réessayer la vérification",
      edit: "Modifier",
    },
    quickCall: {
      title: "Vous préférez aller droit au but ?",
      message: "Si votre besoin est urgent ou difficile à cadrer dans un formulaire, vous pouvez réserver directement un appel court.",
      cta: "Réserver un appel"
    },
    recapLabels: {
      optional: "Optionnel",
      detailAdded: "Complément ajouté",
      goals: "Objectifs",
      budget: "Budget estimé",
      timeline: "Démarrage",
      context: "Contexte technique",
      noDetails: "Aucun complément ajouté.",
      loading: "Chargement du formulaire...",
    },
    success: {
      eyebrow: "Soumission confirmée",
      title: "Demande reçue !",
      message: "Merci pour votre message. J'analyse vos besoins et je reviens vers vous sous 24h avec une première lecture technique et méthodologique.",
      nextSteps: [
        "Je vérifie le contexte, les risques et les priorités techniques.",
        "Je vous réponds avec une première analyse concrète.",
        "Nous pouvons ensuite cadrer le projet sur un appel court."
      ],
      bookCall: "Planifier un appel",
      newRequest: "Nouvelle demande"
    },
    error: {
      title: "Erreur lors de l'envoi",
      message: "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer ou m'envoyer directement un email à contact@samensteeve.com."
    }
  },
  blog: {
    title: "Notes de terrain — Blog",
    description: "Analyses techniques et retours d'expérience réels sur l'IA, le cloud, la sécurité et le développement logiciel en production par Samen Steeve.",
    heading: "Notes de terrain",
    subtitle: "Analyses techniques et retours d'expérience réels sur l'IA, le cloud, la sécurité et le développement logiciel en production.",
    eyebrow: "BLOG & RETOURS D'EXPÉRIENCE",
    allTags: "Tous",
    emptyState: "Aucun article trouvé pour cette catégorie.",
    readTime: "lecture",
    readMore: "Lire",
    fieldNotes: "Notes de terrain",
  },
  servicesPage: {
    outcomeLabel: "Résultat visé",
    viewDetails: "Voir le détail",
    ctaUnsure: "Vous ne savez pas encore quelle prestation correspond à votre situation ?",
  },
  processPage: {
    methodology: "Méthodologie",
    viewProcess: "Voir le processus détaillé",
  },
  bottomCta: {
    ready: "Prêt à lancer ?",
    needToBuild: "Besoin de construire, sécuriser ou automatiser ?",
    description: "Décrivez-moi votre projet. Je reviens sous 24h avec une analyse technique et une proposition concrète.",
    similarProject: "Un projet similaire ?",
    similarDescription: "Parlons de votre besoin. Je reviens sous 24h avec une analyse concrète.",
    clarify: "On clarifie votre besoin avant de vendre une solution.",
    clarifyDescription: "Décrivez le contexte, les contraintes et ce qui bloque aujourd'hui. Je vous réponds avec une lecture technique concrète.",
  },
  notFound: {
    title: "Page introuvable",
    description: "Cette page n'existe pas ou a été déplacée.",
    backHome: "Retour à l'accueil",
  },
  caseStudy: {
    challenges: "Défis",
    solutions: "Solutions",
    results: "Résultats",
  },
  serviceDetail: {
    bestFit: "Quand c'est pertinent",
    capabilities: "Capacités mobilisées",
    expectedOutcomes: "Résultats attendus",
    engagementScope: "Périmètre d'intervention",
  },
  metadata: {
    homeTitle: "Ingénieur Logiciel Freelance & Architecte Cloud — Cameroun",
    homeDescription: "Expert ingénieur logiciel freelance spécialisé en Laravel, React, architecture cloud (AWS/Azure), sécurité applicative et automatisation IA. Disponible en télétravail international et sur site au Cameroun.",
    blogTitle: "Blog Ingénierie Logicielle — IA, Cloud & Sécurité",
    blogDescription: "Articles techniques sur l'ingénierie logicielle, l'architecture cloud, l'automatisation IA et les bonnes pratiques de sécurité. Retours d'expérience concrets de production.",
    processTitle: "Méthodologie Développement Logiciel",
    processDescription: "Un processus de développement logiciel en 4 phases transparentes : cadrage, architecture, build itératif et déploiement. Livrables concrets à chaque étape.",
    contactTitle: "Démarrer un Projet Logiciel",
    contactDescription: "Décrivez votre projet logiciel en 6 étapes simples. Réponse sous 24h avec une analyse technique et une proposition concrète.",
    realisationsTitle: "Études de Cas Développement Logiciel",
    realisationsDescription: "Études de cas réels : plateforme legaltech, architecture cloud hybride, microservices pour l'agro-industrie et systèmes logiciels d'entreprise.",
    servicesTitle: "Services Ingénierie Logicielle",
    servicesDescription: "Services d'ingénierie logicielle freelance : développement sur mesure, architecture cloud, audits de sécurité et automatisation IA pour systèmes de production.",
    notFoundTitle: "Page introuvable — Samen Steeve",
  },
  footer: {
    rights: "Tous droits réservés.",
    location: "Disponible en télétravail international et sur site à Douala.",
    specialty: "Samen Steeve · Ingénieur Logiciel & Architecte Solutions",
    bookCall: "Réserver un appel (30 min)"
  },
  testimonials: {
    title: "Recommandations",
    subtitle: "Ce que les clients et collègues disent de notre collaboration.",
    items: [
      {
        quote: "Steeve a conçu notre infrastructure microservices hybride depuis zéro. La synchronisation offline-first a résolu des années d'échecs de sync pour nos agents terrain. Une approche technique rigoureuse qui a tenu toutes ses promesses.",
        author: "Jean-Pierre Ndongo",
        role: "Directeur des Systèmes d'Information",
        company: "AGROCAM S.A."
      },
      {
        quote: "L'audit de sécurité qu'il a mené sur notre plateforme a révélé des vulnérabilités critiques que nous n'aurions jamais détectées seuls. Son rapport était clair, exploitable, et il nous a accompagnés jusqu'à la remédiation complète.",
        author: "Hervé Nkili",
        role: "CEO",
        company: "OpenCode Labs"
      },
      {
        quote: "Steeve a repris notre backend Laravel existant et l'a complètement transformé. Tests automatisés, CI/CD, documentation API — tout ce qui manquait est maintenant en place. Le projet a été livré dans les délais.",
        author: "Carole Mvele",
        role: "Lead Developer",
        company: "Digital Services Group"
      }
    ]
  }
} as const;
