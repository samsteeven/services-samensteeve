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
      { label: "Architecture Cloud & Hybride", slug: "architecture-cloud" },
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
        punchline: "La plupart des projets logiciels livrent des écrans. Je construis des systèmes fiables, maintenables et faits pour durer sans dépendre du développeur.",
        shortDesc: "Conception, développement et industrialisation de logiciels de production robustes : architecture, APIs, backends critiques et interfaces métier.",
        longDesc: "La plupart des projets logiciels livrent des interfaces. Ce qui manque ensuite : un système qui tient sous la charge, que votre équipe peut maintenir, et qui reflète vraiment vos processus métier. Je prends en charge la construction complète — cadrage fonctionnel, architecture applicative, backend, APIs, frontend, tests et déploiement. Ce que vous recevez à la fin : un produit robuste que vous possédez à 100% et que vous pouvez faire évoluer sereinement.",
        stack: ["Architecture applicative", "Backend & APIs", "Frontend produit", "Bases de données", "Intégrations métier", "Tests & CI/CD", "Observabilité", "Documentation"],
        outcomes: [
          "Un produit logiciel fiable, maintenable et aligné sur vos processus métier — pas une simple maquette livrée sans suivi.",
          "Une architecture capable d'absorber la montée en charge sans transformer chaque nouvelle fonctionnalité en dette technique.",
          "Des workflows critiques sécurisés : paiements, gestion des rôles, validations complexes, synchronisation, recherche et reporting.",
          "Une base de code propre, entièrement documentée, testée et transmissible à vos équipes."
        ],
        scope: [
          "Cadrage du besoin & modélisation : définition précise du domaine et des flux métier avant d'écrire la moindre ligne de code.",
          "Architecture & Backend : conception des APIs, de la base de données, des rôles d'accès, des règles métier et des jobs d'arrière-plan.",
          "Interfaces & Dashboards : développement de composants frontend modernes et réactifs lorsque le produit l'exige.",
          "Industrialisation : mise en place de la CI/CD, des tests automatisés, du monitoring et de la documentation d'exploitation."
        ],
        deliverables: [
          "Architecture applicative documentée (Modèles de données, décisions d'architecture ADR et schémas)",
          "Backend, APIs et interfaces nécessaires au produit, livrés avec code source structuré et commenté",
          "Système d'authentification, rôles, permissions et workflows métier critiques",
          "Suite de tests automatisés, pipeline CI/CD et environnement de staging pré-production",
          "Documentation technique d'exploitation et session de transfert pour vos développeurs"
        ],
        cases: [
          "Refonte technique d'une plateforme legaltech (TribuneJustice) : découpage du monolithe, cache Redis sur 10 endpoints et élimination des requêtes N+1",
          "Plateforme métier ou SaaS avec logique complexe et plusieurs profils d'utilisateurs",
          "Outil interne sur-mesure pour remplacer des fichiers Excel, des traitements manuels ou des outils dispersés",
          "Stabilisation et optimisation d'une API ou d'un backend critique avant montée en charge"
        ],
        faq: [
          {
            q: "Combien de temps faut-il pour développer mon projet ?",
            a: "Un MVP ou module ciblé (authentification, CRUD, workflows de base) prend 4 à 6 semaines. Une plateforme métier complète avec rôles multiples, intégrations API et paiements prend 8 à 16 semaines. Je découpe toujours le projet en jalons livrables pour que vous puissiez valider et ajuster au fur et à mesure."
          },
          {
            q: "Est-ce que je garde la propriété du code ?",
            a: "Oui, vous êtes propriétaire à 100% du code source livré. Je fournis également la documentation technique complète pour que votre équipe puisse reprendre ou faire évoluer le projet sans blocage."
          },
          {
            q: "Comment se déroule la collaboration ?",
            a: "Nous commençons par un échange de cadrage gratuit (30 min). Si le projet correspond à mes compétences, je vous fournis une analyse technique préliminaire avec livrables, jalons et chiffrage clair."
          },
          {
            q: "Travaillez-vous avec des frameworks spécifiques ?",
            a: "Je travaille principalement avec Laravel (backend), Next.js / React ou Angular (frontend), et PostgreSQL / Redis (données). Je m'adapte à votre stack existante si elle est pertinente pour vos objectifs."
          }
        ]
      },

      "architecture-cloud": {
        title: "Architecture Cloud & Hybride",
        punchline: "La plupart des architectures cloud supposent une fibre garantie et un courant continu. Je conçois des infrastructures résilientes (AWS/Azure/Hybride) taillées pour les contraintes réelles du terrain.",
        shortDesc: "Infrastructures cloud et hybrides résilientes (AWS/Azure) : interconnexion multi-sites, basculement automatique, tolérance aux coupures et maîtrise des coûts.",
        longDesc: "La plupart des architectures cloud sont conçues pour des environnements idéaux : connectivité stable, courant continu, équipes IT pléthoriques. Ce n'est pas la réalité du terrain en Afrique centrale. Je conçois des infrastructures hybrides et cloud résilientes qui continuent de fonctionner quand le lien MPLS tombe, quand le courant coupe et quand vos données doivent respecter des exigences de souveraineté locale. Le modèle hybride n'est pas un compromis — c'est l'architecture responsable pour maintenir la continuité d'activité.",
        stack: ["Cloud AWS/Azure", "Infrastructure hybride", "Réseau & VPN", "IaC Terraform", "Sauvegarde & PRA", "Monitoring", "Identité Microsoft 365", "Runbooks"],
        outcomes: [
          "Une infrastructure résiliente aux pannes : basculement automatique des liens réseau, sauvegardes redondantes et PCA/PRA testé.",
          "Des coûts maîtrisés et prévisibles : optimisation des instances et suppression du surdimensionnement (ex. coûts récurrents divisés par 2 dès la 2e année).",
          "Interconnexion fluide et sécurisée des sites distants (siège et agences) sans dépendre d'un seul point de rupture.",
          "Transfert de compétences complet : documentation, runbooks et équipes IT locales autonomes sur l'exploitation."
        ],
        scope: [
          "Audit d'infrastructure & réseau : cartographie des équipements, liaisons distantes, charges de travail, souveraineté des données et coûts d'exploitation.",
          "Conception d'architecture cible : intégration du failover automatique, stratégie de stockage hybride et dimensionnement réaliste.",
          "Déploiement par le code (IaC Terraform) : automatisation de l'infrastructure, procédures de sauvegarde et plan de reprise d'activité (PRA/PCA).",
          "Migration & accompagnement : plan de migration phasé sans interruption de service critique et formation opérationnelle des équipes."
        ],
        deliverables: [
          "Dossier d'Architecture Documenté (Diagrammes réseau/cloud détaillés et ADR - Architecture Decision Records)",
          "Infrastructure en production entièrement provisionnée par code (Terraform)",
          "Plan de migration cloud progressif découpé en phases autonomes sans coupure métier",
          "Plan de Reprise d'Activité (PRA/PCA) avec RTO et RPO mesurés et testés en conditions réelles",
          "Documentation d'exploitation complète et sessions de transfert de compétences pour l'équipe IT"
        ],
        cases: [
          "Interconnexion de 3 sites distants avec basculement automatique et réduction des coûts récurrents de 86 500 € à 41 700 €/an",
          "Migration progressive d'infrastructures physiques (on-premise) vers un cloud hybride AWS/Azure",
          "Stratégie de sauvegarde redondante hors-site avec chiffrement et garantie d'immuabilité",
          "Automatisation complète du provisionnement réseau et serveurs via Infrastructure as Code (Terraform)"
        ],
        faq: [
          {
            q: "Combien de temps dure une mission d'architecture ?",
            a: "Une mission typique d'audit et conception d'architecture dure entre 2 et 4 semaines. La migration effective est découpée en phases autonomes pour éviter toute interruption."
          },
          {
            q: "Travaillez-vous uniquement avec AWS et Azure ?",
            a: "Je travaille principalement avec AWS et Azure mais je m'adapte à vos hébergeurs existants (GCP, OVH, datacenters locaux) pour construire une solution hybride cohérente."
          },
          {
            q: "Comment gérez-vous la continuité en cas de coupure internet ou d'électricité ?",
            a: "C'est le cœur de l'approche hybride : stockage local en cache/relais, basculement automatique sur liaison secondaire (4G/5G, SD-WAN) et synchronisation différée vers le cloud dès le rétablissement."
          },
          {
            q: "Que se passe-t-il après la mission ?",
            a: "Je livre la documentation complète (ADR, runbooks), forme votre équipe IT à l'exploitation autonome de la nouvelle infrastructure, et reste disponible pour du support ponctuel."
          }
        ]
      },
      "audit-securite": {
        title: "Audit Sécurité & Pentest",
        punchline: "J'évalue vos systèmes comme un attaquant réel. L'objectif n'est pas une liste de failles — c'est une lecture claire de votre risque réel, comment il peut être exploité, et par où commencer pour le réduire.",
        shortDesc: "Analyse d'exposition, tests d'intrusion (infra, applicatif, cloud AWS/Azure/GCP) et rapport de remédiation priorisé par impact métier — pas un scan automatique, une évaluation manuelle orientée décision.",
        longDesc: "Vous n'avez pas besoin d'un simple scan automatique. Vous avez besoin d'une lecture claire de votre exposition réelle, de vos points de fragilité et des scénarios d'attaque les plus crédibles dans votre contexte. La majorité des incidents sérieux ne commencent pas par une attaque spectaculaire — ils commencent par une erreur de configuration, un accès trop large, une permission oubliée. J'évalue vos systèmes selon trois axes : analyse d'exposition externe, tests d'intrusion (infra interne, applicatif web/API/mobile, OWASP) et audit cloud (AWS, Azure, GCP). Chaque mission est cadrée selon votre organisation, votre maturité sécurité et vos priorités métier.",
        stack: ["Analyse d'exposition", "Pentest infra", "Pentest applicatif", "OWASP Top 10", "Audit cloud AWS/Azure/GCP", "Active Directory", "Red Team", "Boîte noire/grise/blanche"],
        outcomes: [
          "Une lecture claire de votre exposition réelle : failles exploitables, leur gravité et leur portée opérationnelle — pas une liste brute de scanners.",
          "Des preuves d'exploitation compréhensibles par la direction pour décider vite, et actionnables par vos équipes techniques pour corriger efficacement.",
          "Un plan de remédiation priorisé par ordre d'impact métier, avec des recommandations concrètes et structurées.",
          "Un rapport de retest pour confirmer que les failles corrigées ne sont plus exploitables et réduire le risque résiduel."
        ],
        scope: [
          "Exposition externe : services, interfaces et configurations visibles depuis Internet — scan des IPs/domaines, cartographie des services, exploitation manuelle des cibles sensibles.",
          "Systèmes internes : simulation d'un attaquant ayant accès réseau (VPN compromis, Wi-Fi, accès physique) — cartographie Active Directory, élévation de privilèges, accès aux données sensibles.",
          "Applications web, APIs REST/GraphQL et mobiles (Android/iOS) : parcours d'authentification, flux à fort impact (facturation, administration, export) et logique métier selon l'OWASP.",
          "Environnements cloud (AWS/Azure/GCP) : configurations IAM, buckets exposés, règles de firewall permissives, secrets dans les variables d'environnement — conformes aux benchmarks CIS."
        ],
        deliverables: [
          "Synthèse exécutive lisible par la direction : niveau de risque global, priorités et actions recommandées",
          "Rapport technique détaillé avec constats, preuves d'exploitation et niveau de criticité",
          "Plan de remédiation priorisé par impact métier avec recommandations concrètes et actionnables",
          "Atelier de restitution technique avec vos développeurs, équipes IT ou prestataires",
          "Rapport de retest après correction des failles prioritaires"
        ],
        cases: [
          "Audit avant lancement d'une application exposée ou manipulant des données sensibles (santé, finance, RH)",
          "Validation du niveau de sécurité avant un déploiement client, un audit externe ou une certification",
          "Test d'intrusion interne pour évaluer les risques liés aux accès réseau (employés, VPN, Wi-Fi, accès physique)",
          "Audit de configuration cloud (AWS/Azure/GCP) pour détecter les surfaces d'attaque et les permissions excessives"
        ],
        faq: [
          {
            q: "Quelle est la différence entre boîte noire, grise et blanche ?",
            a: "En boîte noire, l'audit se fait sans information préalable — conditions d'un piratage réel. En boîte grise, quelques accès ou informations sont fournis, idéal pour tester les portails authentifiés. En boîte blanche, le périmètre et certains éléments internes sont partagés pour une analyse plus approfondie. Je recommande la boîte grise pour la majorité des missions."
          },
          {
            q: "Le rapport est-il compréhensible par la direction ?",
            a: "Oui. La synthèse exécutive est conçue pour un lecteur non technique : niveau de risque global, priorités et actions recommandées. Le rapport technique détaillé avec les preuves d'exploitation est à destination de vos développeurs et équipes IT."
          },
          {
            q: "Faites-vous aussi des audits cloud ?",
            a: "Oui, j'audite les environnements AWS, Azure et GCP : configurations IAM, services exposés, buckets S3 ouverts, règles de firewall permissives, secrets dans les variables d'environnement. Le rapport inclut des recommandations conformes aux benchmarks CIS."
          },
          {
            q: "Peut-on faire un retest après correction ?",
            a: "Oui, et c'est fortement recommandé. Le retest vérifie que les failles corrigées ne sont plus exploitables et réduit le risque résiduel. Il peut être planifié à la livraison du rapport ou déclenché après vos correctifs."
          }
        ]
      },
      "automatisation-ia": {
        title: "Automatisation IA",
        punchline: "Vos équipes perdent du temps sur des tâches prévisibles. J'intègre des agents IA supervisables dans vos outils métier pour transformer ce qui ralentit votre activité en workflows fiables — sans casser votre organisation.",
        shortDesc: "Automatisation de processus réels : agents IA connectés à vos outils métier (CRM, ERP, APIs), supervisables, documentés et intégrés à votre environnement de production.",
        longDesc: "Vos équipes exécutent chaque semaine les mêmes tâches : saisie, tri, qualification, reporting, traitement de documents. Ce n'est pas un problème de compétences — c'est un problème d'automatisation. J'identifie les processus à fort potentiel dans votre organisation, je conçois les agents IA adaptés et je les intègre directement dans vos outils existants (CRM, ERP, base de données, API, application interne). Via MCP et LangGraph, les agents exécutent des workflows complexes en plusieurs étapes, avec des garde-fous clairs : permissions limitées, logs détaillés, validation humaine aux points critiques. Vous gardez la maîtrise ; l'IA prend en charge le reste.",
        stack: ["Agents IA", "MCP", "LangGraph", "Outils métier", "Validation humaine", "RAG", "APIs LLM", "Journalisation"],
        outcomes: [
          "Les tâches manuelles répétitives (saisie, tri, qualification, reporting) sont traitées automatiquement, sans perte de contrôle.",
          "L'agent travaille à l'intérieur de votre écosystème existant — pas un chatbot isolé, mais un système branché sur vos vraies données.",
          "Des garde-fous solides : permissions limitées, logs détaillés, validation humaine sur les décisions sensibles, reprise en cas d'erreur.",
          "Un retour mesurable : gain de temps quantifié, volume de tâches traitées, erreurs évitées."
        ],
        scope: [
          "Analyse des processus : identification des tâches à fort ROI, des risques d'automatisation et du bon niveau d'autonomie à confier à l'IA.",
          "Conception de l'agent : outils, permissions, mémoire, logique métier, étapes de validation humaine et gestion des erreurs.",
          "Intégration dans votre environnement : APIs, bases de données, CRM, ERP, documents ou application interne existante.",
          "Supervision et amélioration : tableau de bord pour suivre les actions, détecter les dérives et ajuster le comportement des agents."
        ],
        deliverables: [
          "Document de cadrage : processus à fort ROI identifiés, niveau d'autonomie défini, risques et plan de test",
          "Workflow d'agents conçu, modélisé, testé et intégré dans votre environnement existant",
          "Console de supervision pour suivre, valider et corriger les actions des agents en production",
          "Documentation technique complète et guide d'exploitation pour votre équipe"
        ],
        cases: [
          "Lecture et extraction automatique de factures, devis ou contrats entrants",
          "Qualification de leads avec scoring et résumé prêt pour l'équipe commerciale",
          "Génération de rapports d'activité complexes agrégeant plusieurs sources de données",
          "Traitement de demandes support simples avec escalade automatique vers le bon interlocuteur"
        ],
        faq: [
          {
            q: "Quelle est la différence avec un chatbot classique ?",
            a: "Un chatbot répond à des questions. Un agent IA exécute des actions concrètes dans vos systèmes : créer un enregistrement, générer un rapport, déclencher un workflow, qualifier un lead — avec validation humaine aux points critiques."
          },
          {
            q: "Comment garantir que l'IA ne fait pas d'erreurs ?",
            a: "Par conception : permissions limitées au strict nécessaire, logs détaillés de chaque action, étapes de validation humaine sur les décisions sensibles, et tests sur des données historiques avant mise en production. L'IA est supervisée, pas autonome sans garde-fou."
          },
          {
            q: "Est-ce que ça s'intègre à mes outils actuels ?",
            a: "C'est précisément l'objectif. Je m'intègre à vos APIs, bases de données, CRM, ERP ou applications internes. L'agent travaille dans votre écosystème existant — vous n'avez pas à tout changer pour commencer."
          },
          {
            q: "Combien de temps avant de voir des résultats concrets ?",
            a: "Un POC fonctionnel sur un processus ciblé peut être livré en 2 à 4 semaines. Cela permet de valider l'approche, mesurer le gain réel, et décider sereinement si et comment étendre l'automatisation."
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
