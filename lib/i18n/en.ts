export const en = {
  nav: {
    services: "Services",
    servicesLabel: "MY SERVICES.",
    process: "How it works",
    realisations: "Case Studies",
    explore: "Explore",
    moi: "Me",
    blog: "Blog",
    contactShort: "Contact me",
    cta: "Start a project",
    opposite: "FR",
    serviceItems: [
      { label: "Software Engineering", slug: "ingenierie-logicielle" },
      { label: "Cloud Architecture", slug: "architecture-cloud" },
      { label: "Security Audit & Pentest", slug: "audit-securite" },
      { label: "AI Automation", slug: "automatisation-ia" },
    ],
  },
  hero: {
    status: "Available for new projects",
    title: "I design, secure, and automate software systems for companies that need things to work in production — not just in demos.",
    subtitle: "Software Engineer, Tech Lead & AI Automation Specialist based in Douala, Cameroon. I work on a freelance basis to structure your backend, secure your cloud architectures, and integrate autonomous AI agents into your business operations.",
    heroSub: "Independent software engineer and Tech Lead based in Douala. I design robust software systems, deploy hybrid cloud infrastructures, and automate your business workflows with supervised AI agents.",
    availability: "Available · Douala, Cameroon",
    headline: "Your systems work in **production**. That is my only criterion.",
    ctaCall: "Book a 30 min call",
    ctaExplore: "or explore services",
    scrollDown: "Discover",
    viewServices: "Explore my services",
    startProject: "Start a project",
    connect: "Get in touch",
  },
  services: {
    title: "What I do",
    tagline: "Serious software systems, from architecture to operational security.",
    subtitle: "I work where a simple website is not enough: software products, business platforms, hybrid infrastructure, application penetration testing, and AI automation connected to real workflows.",
    cta: "Learn more",
    back: "Back to services",
    whyMe: "Why work with me?",
    deliverables: "What you get (Deliverables)",
    cases: "Typical Use Cases",
    relatedProject: "Related project",
    contactCTA: "Discuss this service",
    items: {
      "ingenierie-logicielle": {
        title: "Software Engineering",
        punchline: "Most software projects ship screens. I build reliable, maintainable systems built to last without depending on the developer.",
        shortDesc: "Design, development, and industrialization of robust production software: architecture, APIs, critical backends, and business interfaces.",
        longDesc: "Most software projects ship interfaces. What's missing next: a system that holds under load, that your team can maintain, and that genuinely reflects your business processes. I handle full construction — product scoping, application architecture, backend, APIs, frontend, tests, and deployment. What you receive at the end: a robust product you own 100% and can evolve with confidence.",
        stack: ["Application architecture", "Backend & APIs", "Product frontend", "Databases", "Business integrations", "Tests & CI/CD", "Observability", "Documentation"],
        outcomes: [
          "A reliable, maintainable software product aligned with your business processes — not a raw prototype handed over without support.",
          "An architecture capable of absorbing growth without turning each new feature into technical debt.",
          "Critical workflows secured: payments, role permissions, complex approvals, sync, search, and reporting.",
          "A clean, fully documented, tested codebase ready to be handed over to your team."
        ],
        scope: [
          "Scoping & domain modeling: precise definition of domain and business flows before writing a single line of code.",
          "Architecture & Backend: designing APIs, database schemas, access roles, business rules, and background jobs.",
          "Interfaces & Dashboards: building modern, responsive frontend components when the product demands them.",
          "Industrialization: implementing CI/CD pipelines, automated testing, application monitoring, and runbooks."
        ],
        deliverables: [
          "Documented application architecture (Data models, ADR architecture decision records, and flow diagrams)",
          "Backend, APIs, and product interfaces delivered with structured, clean source code",
          "Authentication system, role-based permissions, and critical business workflows",
          "Automated test suite, CI/CD pipeline, and staging environment",
          "Technical operational documentation and handover session for your development team"
        ],
        cases: [
          "Technical refactoring of a legaltech platform (TribuneJustice): breaking down a monolith into 4 specialized services, Redis cache on 10 endpoints, and N+1 query elimination",
          "Business platform or SaaS with complex logic and multiple user profiles",
          "Custom internal tool replacing spreadsheets, manual processing, or scattered software",
          "Stabilization and performance optimization of a critical API or backend before scaling"
        ],
        faq: [
          {
            q: "How long does it take to develop my project?",
            a: "A targeted MVP or module (authentication, CRUD, core workflows) takes 4 to 6 weeks. A full business platform with multiple roles, API integrations, and payments takes 8 to 16 weeks. I always break projects into autonomous milestones so you can validate and adjust along the way."
          },
          {
            q: "Do I keep ownership of the code?",
            a: "Yes, you own 100% of the delivered source code. I also provide complete technical documentation so your team can take over or evolve the project without vendor lock-in."
          },
          {
            q: "How does the collaboration work?",
            a: "We start with a free scoping call (30 min). If the project aligns with my skillset, I provide a preliminary technical analysis with deliverables, milestones, and clear pricing."
          },
          {
            q: "Do you work with specific frameworks?",
            a: "I primarily work with Laravel (backend), Next.js / React or Angular (frontend), and PostgreSQL / Redis (data). I adapt to your existing stack if relevant to your business goals."
          }
        ]
      },
      "architecture-cloud": {
        title: "Cloud & Hybrid Architecture",
        punchline: "Most cloud architectures assume guaranteed fiber and uninterrupted power. I design resilient infrastructures (AWS/Azure/Hybrid) built for real field constraints.",
        shortDesc: "Resilient cloud and hybrid infrastructures (AWS/Azure): multi-site interconnect, automatic failover, outage tolerance, and cost control.",
        longDesc: "Most cloud architectures are designed for ideal environments: stable connectivity, continuous power, abundant IT teams. That's not the reality on the ground in Central Africa. I design resilient hybrid and cloud infrastructures that keep running when MPLS links drop, when power cuts out, and when your data must respect local sovereignty regulations. The hybrid model is not a compromise — it is the responsible architecture for business continuity.",
        stack: ["AWS/Azure cloud", "Hybrid infrastructure", "Network & VPN", "Terraform IaC", "Backup & DRP", "Monitoring", "Microsoft 365 identity", "Runbooks"],
        outcomes: [
          "Outage-resilient infrastructure: automated network link failover, redundant backups, and fully tested BCP/DRP.",
          "Controlled, predictable costs: instance optimization and elimination of over-provisioning (e.g. recurring costs cut in half by year 2).",
          "Seamless and secure interconnection of remote sites (headquarters & branches) without a single point of failure.",
          "Complete skill transfer: documentation, runbooks, and local IT teams fully autonomous in daily operations."
        ],
        scope: [
          "Infrastructure & network audit: mapping hardware, remote links, workloads, data sovereignty constraints, and operational costs.",
          "Target architecture design: integrating automatic failover, hybrid storage strategy, and pragmatic sizing.",
          "Infrastructure as Code deployment (Terraform): infrastructure automation, backup procedures, and Disaster Recovery Plans (DRP/BCP).",
          "Migration & enablement: phased migration plan without critical downtime and operational training for IT teams."
        ],
        deliverables: [
          "Documented Architecture Dossier (Detailed network/cloud diagrams and Architecture Decision Records - ADRs)",
          "Production infrastructure fully provisioned as code (Terraform)",
          "Step-by-step cloud migration plan broken into autonomous phases with zero business downtime",
          "Disaster Recovery Plan (DRP/BCP) with RTO and RPO measured and tested under real conditions",
          "Comprehensive operational documentation and skill transfer sessions for your local IT team"
        ],
        cases: [
          "Interconnecting 3 remote branch sites with automatic failover and cutting recurring costs from €86,500 to €41,700/year",
          "Progressive migration of physical server rooms (on-premise) to an AWS/Azure hybrid cloud",
          "Redundant off-site backup strategy with encryption and immutability guarantees",
          "Full automation of network and server provisioning via Infrastructure as Code (Terraform)"
        ],
        faq: [
          {
            q: "How long does an architecture engagement take?",
            a: "A typical audit and architecture design engagement takes 2 to 4 weeks. The actual migration is executed in autonomous phases to avoid business downtime."
          },
          {
            q: "Do you only work with AWS and Azure?",
            a: "I primarily work with AWS and Azure, but I adapt to your existing hosts (GCP, OVH, local datacenters) to build a cohesive hybrid solution."
          },
          {
            q: "How do you handle continuity during power or internet outages?",
            a: "That's the core of the hybrid approach: local cache/relay storage, automatic failover to secondary links (4G/5G, SD-WAN), and deferred cloud sync upon reconnection."
          },
          {
            q: "What happens after the engagement?",
            a: "I deliver full documentation (ADRs, runbooks), train your IT team to operate the new infrastructure independently, and remain available for ad-hoc support."
          }
        ]
      },
      "audit-securite": {
        title: "Security Audit & Pentest",
        punchline: "I assess your systems as a real attacker would. The goal is not a list of vulnerabilities — it's a clear picture of your actual risk, how it can be exploited, and where to start reducing it.",
        shortDesc: "Exposure analysis, penetration testing (infra, application, cloud AWS/Azure/GCP) and a remediation report prioritized by business impact — not an automated scan, a manual assessment built for decisions.",
        longDesc: "You don't need a simple automated scan. You need a clear picture of your actual exposure, your weaknesses, and the most credible attack scenarios in your context. Most serious incidents don't start with a spectacular attack — they start with a misconfiguration, an overly broad access, a forgotten permission. I assess your systems across three axes: external exposure analysis, penetration testing (internal infra, application web/API/mobile, OWASP) and cloud audit (AWS, Azure, GCP). Every engagement is scoped based on your organization, your security maturity and your business priorities.",
        stack: ["Exposure analysis", "Infra pentest", "App pentest", "OWASP Top 10", "Cloud audit AWS/Azure/GCP", "Active Directory", "Red Team", "Black/grey/white box"],
        outcomes: [
          "A clear picture of your actual exposure: exploitable vulnerabilities, their severity and operational scope — not a raw scanner dump.",
          "Exploitation evidence understandable by leadership to decide fast, and actionable by your technical teams to fix effectively.",
          "A remediation plan prioritized by business impact order, with concrete and structured recommendations.",
          "A retest report to confirm fixed vulnerabilities are no longer exploitable and reduce residual risk."
        ],
        scope: [
          "External exposure: services, interfaces and configurations visible from the Internet — IP/domain scanning, service mapping, manual exploitation of sensitive targets.",
          "Internal systems: simulating an attacker with network access (compromised VPN, Wi-Fi, physical access) — Active Directory mapping, privilege escalation, access to sensitive data.",
          "Web apps, REST/GraphQL APIs and mobile apps (Android/iOS): authentication flows, high-impact routes (billing, admin, export) and business logic following OWASP.",
          "Cloud environments (AWS/Azure/GCP): IAM configurations, exposed buckets, permissive firewall rules, secrets in environment variables — aligned with CIS benchmarks."
        ],
        deliverables: [
          "Executive summary readable by leadership: overall risk level, priorities and recommended actions",
          "Detailed technical report with findings, exploitation evidence and severity ratings",
          "Remediation plan prioritized by business impact with concrete and actionable recommendations",
          "Technical debrief workshop with your developers, IT team or vendors",
          "Retest report after priority vulnerabilities are fixed"
        ],
        cases: [
          "Audit before launching an exposed application or one handling sensitive data (healthcare, finance, HR)",
          "Security level validation before a client deployment, external audit or certification",
          "Internal penetration test to assess risks from network access (employees, VPN, Wi-Fi, physical access)",
          "Cloud configuration audit (AWS/Azure/GCP) to detect exposed attack surfaces and excessive permissions"
        ],
        faq: [
          {
            q: "What is the difference between black box, grey box and white box testing?",
            a: "In black box testing, the audit is conducted with no information provided — real-world attack conditions. In grey box, some access or information is provided, ideal for testing authenticated portals. In white box, the scope and internal elements are shared for a deeper analysis. I recommend grey box for most engagements."
          },
          {
            q: "Is the report understandable by leadership?",
            a: "Yes. The executive summary is designed for a non-technical reader: overall risk level, priorities and recommended actions. The detailed technical report with exploitation evidence is intended for your developers and IT teams."
          },
          {
            q: "Do you perform cloud audits?",
            a: "Yes, I audit AWS, Azure and GCP environments: IAM configurations, exposed services, open S3 buckets, permissive firewall rules, secrets in environment variables. The report includes recommendations aligned with CIS benchmarks."
          },
          {
            q: "Can a retest be done after fixes are applied?",
            a: "Yes, and it is strongly recommended. The retest confirms that fixed vulnerabilities are no longer exploitable and reduces residual risk. It can be scheduled at report delivery or triggered after your remediation is complete."
          }
        ]
      },
      "automatisation-ia": {
        title: "AI Automation",
        punchline: "Your teams lose time on predictable, repetitive tasks. I integrate supervisable AI agents into your business tools to turn what slows you down into reliable workflows — without disrupting your existing organization.",
        shortDesc: "Real-process automation: AI agents connected to your business tools (CRM, ERP, APIs), supervisable, documented, and integrated into your production environment.",
        longDesc: "Your teams run the same tasks every week: data entry, triage, qualification, reporting, document processing. That's not a skills problem — it's an automation problem. I identify the high-potential processes in your organization, design the right AI agents, and integrate them directly into your existing tools (CRM, ERP, database, API, internal application). Via MCP and LangGraph, agents execute complex multi-step workflows with clear guardrails: limited permissions, detailed logs, human approval at critical decision points. You stay in control; the AI handles the rest.",
        stack: ["AI agents", "MCP", "LangGraph", "Business tools", "Human approval", "RAG", "LLM APIs", "Logging"],
        outcomes: [
          "Manual repetitive tasks (data entry, triage, qualification, reporting) handled automatically, without losing control.",
          "The agent works inside your existing ecosystem — not an isolated chatbot, but a system wired to your real data.",
          "Solid guardrails: limited permissions, detailed logs, human validation on sensitive decisions, error recovery built in.",
          "Measurable return: quantified time saved, volume of tasks handled, errors avoided."
        ],
        scope: [
          "Process analysis: identifying high-ROI tasks, automation risks, and the right level of autonomy to delegate to the AI.",
          "Agent design: tools, permissions, memory, business logic, human approval steps, and error handling.",
          "Integration into your environment: APIs, databases, CRM, ERP, documents, or existing internal application.",
          "Supervision and improvement: dashboard to track actions, detect drift, and adjust agent behavior over time."
        ],
        deliverables: [
          "Scoping document: high-ROI processes identified, autonomy level defined, risks and test plan included",
          "Agent workflow designed, modeled, tested and integrated into your existing environment",
          "Supervision dashboard to track, validate and correct AI agent actions in production",
          "Complete technical documentation and operational runbook for your team"
        ],
        cases: [
          "Automatic reading and extraction of incoming invoices, quotes, or contracts",
          "Lead qualification with scoring and summary ready for the sales team",
          "Complex activity report generation aggregating multiple internal data sources",
          "Simple support request handling with automatic escalation to the right person"
        ],
        faq: [
          {
            q: "What's the difference with a classic chatbot?",
            a: "A chatbot answers questions. An AI agent executes concrete actions in your systems: creating a record, generating a report, triggering a workflow, qualifying a lead — with human approval at critical points."
          },
          {
            q: "How do you ensure the AI doesn't make errors?",
            a: "By design: permissions limited to what's strictly necessary, detailed logs of every action, human approval on sensitive decisions, and testing on historical data before production rollout. The AI is supervised, not autonomous without guardrails."
          },
          {
            q: "Does it integrate with my current tools?",
            a: "That's precisely the goal. I integrate with your APIs, databases, CRM, ERP, or internal applications. The agent works inside your existing ecosystem — you don't have to change everything to get started."
          },
          {
            q: "How long before seeing concrete results?",
            a: "A functional POC on a targeted process can be delivered in 2 to 4 weeks. This validates the approach, measures the real gain, and lets you decide calmly whether and how to extend the automation."
          }
        ]
      }
    }
  },
  process: {
    title: "How It Works",
    subtitle: "A rigorous engineering methodology, zero black-box — each phase delivers concrete outputs you can audit.",
    cta: "Start a collaboration",
    phases: [
      {
        num: "01",
        title: "Discovery & Audit",
        duration: "1 to 3 days",
        desc: "Before writing a single line of code, I audit the existing system and frame the real problem. If you have an existing project, I review the codebase, infrastructure, and security risks. If it's a greenfield build, I map out the business and technical constraints upfront to eliminate costly pivots later.",
        deliverables: [
          "Technical audit report: tech debt, risks, and blockers identified",
          "Business flow mapping with performance and scalability constraints",
          "Formalized delivery scope (in-scope, out-of-scope, assumptions)",
          "Phased cost and timeline estimate with autonomous milestones"
        ]
      },
      {
        num: "02",
        title: "Architecture & Proof of Concept",
        duration: "3 to 7 days",
        desc: "I design the target architecture before building anything. Technology choices are justified through ADRs (Architecture Decision Records). A validated POC covering the highest-risk technical unknowns is delivered before the build starts — to eliminate uncertainty, not defer it.",
        deliverables: [
          "Architecture diagrams (C4 model: context, containers, components, deployment)",
          "ADRs documenting every structural decision (stack, patterns, security model)",
          "Database schema with constraints, indexes, and migration strategy",
          "Functional POC validating the riskiest technical hypotheses"
        ]
      },
      {
        num: "03",
        title: "Iterative Build & CI/CD",
        duration: "2-week sprints",
        desc: "Development runs in short sprints. From sprint 1, a CI/CD pipeline is live: every commit is automatically tested, linted, and deployed to staging. You have real-time access to the Git repository and staging environment — zero tunnel effect, zero surprises.",
        deliverables: [
          "CI/CD pipeline live from sprint 1 (automated tests, lint, auto-deployment)",
          "Strictly typed, reviewed codebase with unit and integration test coverage",
          "End-of-sprint demo with functional sign-off in the staging environment",
          "Structured changelog and updated technical documentation at each release"
        ]
      },
      {
        num: "04",
        title: "Hardening, Deployment & Handover",
        duration: "1 to 2 weeks",
        desc: "Before going live, I run a full hardening pass: OWASP audit, load testing, permissions and secrets review. The production deployment is fully instrumented (monitoring, alerting, rollback). Your team receives the training and documentation to operate the system independently.",
        deliverables: [
          "Pre-prod security audit report: OWASP Top 10, HTTP headers, dependencies",
          "Load test results and SLO validation (response time, availability targets)",
          "Monitoring & alerting configured (Grafana, Sentry or equivalent) with runbook",
          "Full operational documentation + knowledge-transfer session"
        ]
      }
    ]
  },
  realisations: {
    title: "Case Studies",
    subtitle: "Real-world case studies of systems I have designed, built, and shipped to production.",
    all: "All projects",
    role: "My role",
    period: "Period",
    stack: "Tech stack",
    visitRepo: "View source code",
    visitSite: "Visit site",
    cta: "Read case study",
    back: "Back to case studies",
    toc: "Table of Contents",
  },
  contact: {
    title: "Start a project",
    subtitle: "Describe your needs. I will get back to you within 24 hours with an initial technical and methodological analysis.",
    steps: {
      step1: "Offer",
      step2: "Goals",
      step3: "Targeted questions",
      step4: "Extra details",
      step5: "Contact",
      step6: "Summary",
    },
    questions: {
      step1: "What type of project would you like to start?",
      step2: "What does success look like?",
      step3: "A few questions to frame this properly",
      step4: "Anything else to add?",
      step5: "Where can we reach you?",
      step6: "One last look",
    },
    fields: {
      typePlaceholder: "Select one or more domains...",
      types: {
        web: "Software Engineering",
        cloud: "Cloud Architecture",
        security: "Security Audit & Pentest",
        ai: "AI Automation",
        other: "Not sure yet"
      },
      typesDesc: {
        web: "Design or evolve business software, a platform, an API, or a complete product.",
        cloud: "Design, secure, and migrate infrastructures with auto-failover and high resilience.",
        security: "Map exposed vulnerabilities, test intrusions (infra, app, cloud) and prioritize remediation.",
        ai: "Integrate autonomous AI agents (LangGraph, MCP) connected to your business APIs.",
        other: "Help me scope the needs and define the technical priorities."
      },
      descLabel: "Project description",
      descPlaceholder: "Describe the goals, the expected key features, and the business problem to solve. The more precise you are, the better I can analyze.",
      codebaseLabel: "Do you have an existing codebase?",
      codebaseOptions: {
        yes: "Yes, an existing project to evolve or secure",
        no: "No, we are starting a project from scratch"
      },
      timelineLabel: "When would you like to start?",
      timelineOptions: {
        urgent: "As soon as possible",
        short: "Within 1 to 3 months",
        medium: "Within 3 to 6 months",
        flexible: "Just exploring"
      },
      budgetLabel: "Approximate budget range",
      budgetOptions: {
        small: "€2,000 to €5,000",
        medium: "€5,000 to €10,000",
        large: "€10,000 to €20,000",
        enterprise: "€20,000+"
      },
      goalsLabel: "What result are you aiming for?",
      goalsOptions: {
        launch: "Launch a new product (SaaS, MVP)",
        automate: "Replace or automate manual tasks",
        secure: "Secure critical systems and data",
        scale: "Scale up / improve performance",
        team: "Strengthen and support the technical team"
      },
      serviceGoals: {
        web: {
          title: "Expected software outcomes",
          options: {
            web_mvp: "Launch an MVP or usable first version",
            web_platform: "Build a complete business platform",
            web_api: "Create or stabilize an API / system integration",
            web_refactor: "Improve an existing product without rewriting everything"
          }
        },
        cloud: {
          title: "Expected cloud architecture outcomes",
          options: {
            cloud_migration: "Migrate to a cloud or hybrid architecture",
            cloud_resilience: "Improve availability, backups, and recovery",
            cloud_cost: "Reduce costs and clarify operations",
            cloud_observability: "Set up monitoring, logs, and alerting"
          }
        },
        security: {
          title: "Expected security outcomes",
          options: {
            security_exposure: "Map my attack surface as seen from the Internet",
            security_pentest: "Test intrusions (internal infra, web/API app, mobile)",
            security_cloud: "Audit my cloud environments (AWS, Azure, GCP)",
            security_remediation: "Get a prioritized and supported remediation plan"
          }
        },
        ai: {
          title: "Expected AI automation outcomes",
          options: {
            ai_workflow: "Automate a repetitive manual process",
            ai_agent: "Create an AI agent connected to business tools",
            ai_data: "Use internal documents, data, or knowledge",
            ai_integration: "Integrate AI into an existing application"
          }
        },
        other: {
          title: "Outcomes to clarify",
          options: {
            other_scope: "Clarify the need and scope",
            other_prioritize: "Prioritize risks and next actions",
            other_architecture: "Choose a coherent technical approach",
            other_roadmap: "Build a realistic roadmap"
          }
        }
      },
      teamLabel: "Size of your current technical team",
      teamOptions: {
        solo: "No developers (solo project)",
        small: "Small team (2 to 5 people)",
        medium: "Medium team (5 to 15 people)",
        large: "Large team (more than 15 people)"
      },
      serviceContextLabel: "Information specific to the selected services",
      serviceContext: {
        web: {
          title: "Software Engineering",
          placeholder: "Specify the software or product to build: users, roles, workflows, critical features, integrations/APIs, business or delivery constraints...",
          prompts: ["Users & roles", "Critical features", "Integrations/APIs", "Business constraints"]
        },
        cloud: {
          title: "Cloud Architecture",
          placeholder: "Describe the current or target infrastructure: hosting provider, environments, expected availability, backups, migration, scalability, or network constraints...",
          prompts: ["Current infrastructure", "Availability", "Backups", "Migration/scaling"]
        },
        security: {
          title: "Security Audit & Pentest",
          placeholder: "Describe the audit scope: type of test (exposure analysis, infra/app pentest, cloud audit), authorized environments, available test accounts, sensitive data involved, testing constraints and already identified risks...",
          prompts: ["Test type (exposure/pentest/cloud)", "Authorized scope", "Test accounts", "Audit constraints"]
        },
        ai: {
          title: "AI Automation",
          placeholder: "Describe the process to automate: manual tasks, tools used, data sources, human validations, decisions to automate, and risks to avoid...",
          prompts: ["Current process", "Tools & data", "AI decisions", "Human control"]
        },
        other: {
          title: "Needs to clarify",
          placeholder: "Explain what is still unclear, the problems you want to solve, the options you are considering, and what would help you choose the right approach...",
          prompts: ["Main problem", "Options considered", "Constraints", "Expected decision"]
        }
      },
      contextGroups: {
        web: {
          title: "Software context",
          questions: [
            {
              key: "stage",
              label: "Product stage",
              options: [
                { value: "idea", label: "Idea or initial scoping" },
                { value: "prototype", label: "Prototype / mockup already exists" },
                { value: "live", label: "Product already in production" },
                { value: "legacy", label: "Existing product to modernize" }
              ]
            },
            {
              key: "codebase",
              label: "Technical base",
              options: [
                { value: "none", label: "No codebase yet" },
                { value: "partial", label: "Partial codebase or prototype" },
                { value: "existing", label: "Existing maintained application" },
                { value: "unknown", label: "I do not know yet" }
              ]
            },
            {
              key: "users",
              label: "Target users",
              options: [
                { value: "internal", label: "Internal users" },
                { value: "customers", label: "Customers / external users" },
                { value: "both", label: "Internal and external" },
                { value: "admin", label: "Back office / operations team" }
              ]
            },
            {
              key: "integration",
              label: "Expected integrations",
              options: [
                { value: "none", label: "No critical integration" },
                { value: "payments", label: "Payments, email, WhatsApp, or notifications" },
                { value: "business", label: "ERP, CRM, business API, or existing database" },
                { value: "unknown", label: "To identify together" }
              ]
            }
          ]
        },
        cloud: {
          title: "Cloud context",
          questions: [
            {
              key: "current",
              label: "Current infrastructure",
              options: [
                { value: "none", label: "No infrastructure yet" },
                { value: "onprem", label: "Local / on-premise servers" },
                { value: "cloud", label: "Already on public cloud" },
                { value: "hybrid", label: "Hybrid cloud + local" }
              ]
            },
            {
              key: "provider",
              label: "Current or target environment",
              options: [
                { value: "aws", label: "AWS" },
                { value: "azure", label: "Azure" },
                { value: "other", label: "Other host / VPS" },
                { value: "undecided", label: "Not decided yet" }
              ]
            },
            {
              key: "criticality",
              label: "Criticality level",
              options: [
                { value: "standard", label: "Standard, downtime acceptable" },
                { value: "business", label: "Important business system, little downtime" },
                { value: "critical", label: "Critical, high availability expected" },
                { value: "unknown", label: "To evaluate" }
              ]
            },
            {
              key: "operations",
              label: "Operational priority",
              options: [
                { value: "migration", label: "Migration" },
                { value: "resilience", label: "Resilience / backups" },
                { value: "cost", label: "Cost and optimization" },
                { value: "monitoring", label: "Monitoring and alerting" }
              ]
            }
          ]
        },
        security: {
          title: "Security context",
          questions: [
            {
              key: "testType",
              label: "Type of audit requested",
              options: [
                { value: "exposure", label: "Exposure analysis (attack surface visible from Internet)" },
                { value: "pentest", label: "Internal infra pentest (Active Directory, network)" },
                { value: "apppentest", label: "Application pentest (web, API, mobile)" },
                { value: "cloud", label: "Cloud audit (AWS, Azure, GCP)" }
              ]
            },
            {
              key: "approach",
              label: "Testing approach",
              options: [
                { value: "blackbox", label: "Black box (no info provided, real attack simulation)" },
                { value: "greybox", label: "Grey box (partial access, authenticated portals)" },
                { value: "whitebox", label: "White box (full collaboration with IT teams)" },
                { value: "unknown", label: "To define together" }
              ]
            },
            {
              key: "environment",
              label: "Authorized environment",
              options: [
                { value: "staging", label: "Pre-production / staging" },
                { value: "production", label: "Controlled production testing" },
                { value: "both", label: "Staging and production" },
                { value: "unknown", label: "To define before audit" }
              ]
            },
            {
              key: "authorization",
              label: "Preparation and authorization",
              options: [
                { value: "ready", label: "Signed authorization and test accounts ready" },
                { value: "accounts", label: "Test accounts need preparation" },
                { value: "scope", label: "Scope needs formalization" },
                { value: "help", label: "Need help scoping it legally" }
              ]
            }
          ]
        },
        ai: {
          title: "AI automation context",
          questions: [
            {
              key: "process",
              label: "Current process",
              options: [
                { value: "manual", label: "Very manual and repetitive" },
                { value: "spreadsheets", label: "Based on files / spreadsheets" },
                { value: "tools", label: "Already inside business tools" },
                { value: "unclear", label: "Still unclear" }
              ]
            },
            {
              key: "data",
              label: "Data sources",
              options: [
                { value: "documents", label: "Documents, PDFs, emails, or messages" },
                { value: "database", label: "Database / API" },
                { value: "mixed", label: "Multiple sources" },
                { value: "not-ready", label: "Data not structured yet" }
              ]
            },
            {
              key: "humanReview",
              label: "Human validation",
              options: [
                { value: "required", label: "Human validation is mandatory" },
                { value: "exceptions", label: "Only for uncertain cases" },
                { value: "autonomous", label: "Mostly autonomous automation" },
                { value: "unknown", label: "To decide" }
              ]
            },
            {
              key: "systems",
              label: "Systems to connect",
              options: [
                { value: "none", label: "No existing system" },
                { value: "saas", label: "SaaS tools / CRM / email" },
                { value: "internal", label: "Internal application or API" },
                { value: "multiple", label: "Several systems" }
              ]
            }
          ]
        },
        other: {
          title: "Context to clarify",
          questions: [
            {
              key: "clarity",
              label: "Clarity level",
              options: [
                { value: "problem", label: "The problem is clear, not the solution" },
                { value: "solution", label: "A solution is already being considered" },
                { value: "audit", label: "Need an external technical opinion" },
                { value: "early", label: "Still exploratory" }
              ]
            },
            {
              key: "constraint",
              label: "Main constraint",
              options: [
                { value: "time", label: "Time / urgency" },
                { value: "budget", label: "Budget" },
                { value: "risk", label: "Technical or security risk" },
                { value: "alignment", label: "Team / decision alignment" }
              ]
            },
            {
              key: "decision",
              label: "Expected decision",
              options: [
                { value: "build", label: "Build" },
                { value: "secure", label: "Secure" },
                { value: "automate", label: "Automate" },
                { value: "choose", label: "Choose the right direction" }
              ]
            },
            {
              key: "stakeholders",
              label: "Stakeholders",
              options: [
                { value: "founder", label: "Founder / leadership" },
                { value: "product", label: "Product / business" },
                { value: "technical", label: "Technical team" },
                { value: "mixed", label: "Several profiles" }
              ]
            }
          ]
        }
      },
      linksLabel: "Useful links (Figma, GitHub, staging)",
      addLink: "Add another link",
      nameLabel: "First & Last Name",
      namePlaceholder: "John Doe",
      emailLabel: "Work Email",
      emailPlaceholder: "john.doe@company.com",
      companyLabel: "Company (optional)",
      companyPlaceholder: "Acme Corp",
      roleLabel: "Your role (optional)",
      rolePlaceholder: "Product Owner, CTO, Founder...",
      whatsappLabel: "WhatsApp / Phone number",
      whatsappPlaceholder: "+237 6xx xxx xxx",
      sourceLabel: "How did you hear about me?",
      sourcePlaceholder: "LinkedIn, Google search, recommendation..."
    },
    buttons: {
      next: "Continue",
      prev: "Back",
      submit: "Confirm & send",
      submitting: "Sending...",
      clearStep: "Clear this step",
      resetAll: "Reset",
      resetConfirm: "Do you really want to clear the entire form?",
      verification: "Anti-bot verification",
      verificationLoading: "Loading verification...",
      verificationError: "The anti-bot verification could not load.",
      verificationRetry: "Retry verification",
      edit: "Edit",
    },
    quickCall: {
      title: "Prefer to get straight to the point?",
      message: "If your need is urgent or hard to frame in a form, you can book a short call directly.",
      cta: "Book a call"
    },
    recapLabels: {
      optional: "Optional",
      detailAdded: "Additional detail added",
      goals: "Goals",
      budget: "Budget range",
      timeline: "Timeline",
      context: "Technical context",
      noDetails: "No extra details added.",
      loading: "Loading form...",
    },
    success: {
      eyebrow: "Submission confirmed",
      title: "Request received!",
      message: "Thank you for your message. I will review your needs and get back to you within 24 hours with an initial technical and methodological assessment.",
      nextSteps: [
        "I review the context, risks, and technical priorities.",
        "I reply with a first concrete assessment.",
        "We can then scope the project on a short call."
      ],
      bookCall: "Schedule a call",
      newRequest: "New request"
    },
    error: {
      title: "Submission error",
      message: "An error occurred while sending your request. Please try again or email me directly at contact@samensteeve.com."
    }
  },
  blog: {
    title: "Field Notes — Blog",
    description: "Technical analysis and real-world experience reports on AI, cloud, security, and software engineering in production by Samen Steeve.",
    heading: "Field Notes",
    subtitle: "Technical analysis and real-world experience reports on AI, cloud, security, and software engineering in production.",
    eyebrow: "BLOG & FIELD NOTES",
    allTags: "All",
    emptyState: "No articles found for this category.",
    readTime: "read",
    readMore: "Read",
    fieldNotes: "Field Notes",
  },
  servicesPage: {
    outcomeLabel: "Expected outcome",
    viewDetails: "View details",
    ctaUnsure: "Not sure which service matches your situation?",
  },
  processPage: {
    methodology: "Methodology",
    viewProcess: "View detailed process",
  },
  bottomCta: {
    ready: "Ready to start?",
    needToBuild: "Need to build, secure, or automate?",
    description: "Describe your project. I will get back to you within 24 hours with a technical analysis and a concrete proposal.",
    similarProject: "A similar project?",
    similarDescription: "Let's discuss your needs. I will get back to you within 24 hours with a concrete analysis.",
    clarify: "We clarify your needs before selling a solution.",
    clarifyDescription: "Describe the context, constraints, and what is blocking you today. I will reply with a concrete technical assessment.",
  },
  notFound: {
    title: "Page not found",
    description: "This page does not exist or has been moved.",
    backHome: "Back to home",
  },
  caseStudy: {
    challenges: "Challenges",
    solutions: "Solutions",
    results: "Results",
  },
  serviceDetail: {
    bestFit: "When it is relevant",
    capabilities: "Capabilities",
    expectedOutcomes: "Expected outcomes",
    engagementScope: "Engagement scope",
  },
  metadata: {
    homeTitle: "Freelance Software Engineer & Cloud Architect — Cameroon",
    homeDescription: "Expert freelance software engineer specializing in Laravel, React, cloud architecture (AWS/Azure), application security, and AI automation. Available for remote work worldwide and on-site in Cameroon.",
    blogTitle: "Software Engineering Blog — AI, Cloud & Security",
    blogDescription: "Technical articles on software engineering, cloud architecture, AI automation, and security best practices. Practical insights from production experience.",
    processTitle: "Software Development Methodology",
    processDescription: "A transparent 4-phase software development process: discovery, architecture, iterative build, and deployment. Concrete deliverables at every step.",
    contactTitle: "Start a Software Project",
    contactDescription: "Describe your software project in 6 simple steps. Get a response within 24 hours with a technical analysis and a concrete proposal.",
    realisationsTitle: "Software Development Case Studies",
    realisationsDescription: "Real-world case studies: legaltech platform, hybrid cloud architecture, microservices for agro-industry, and enterprise software systems.",
    servicesTitle: "Software Engineering Services",
    servicesDescription: "Freelance software engineering services: custom development, cloud architecture, security audits, and AI automation for production systems.",
    notFoundTitle: "Page not found — Samen Steeve",
  },
  footer: {
    rights: "All rights reserved.",
    location: "Available for international remote work and on-site in Douala.",
    specialty: "Samen Steeve · Software Engineer & Solution Architect",
    bookCall: "Book a call (30 min)"
  },
  testimonials: {
    title: "Recommendations",
    subtitle: "What clients and colleagues say about our collaboration.",
    items: [
      {
        quote: "Steeve designed our hybrid microservices infrastructure from scratch. The offline-first synchronization resolved years of sync failures for our field agents. A rigorous technical approach that delivered on every promise.",
        author: "Jean-Pierre Ndongo",
        role: "Director of Information Systems",
        company: "AGROCAM S.A."
      },
      {
        quote: "The security audit he conducted on our platform uncovered critical vulnerabilities we would never have caught on our own. His report was clear, actionable, and he stayed with us through full remediation.",
        author: "Hervé Nkili",
        role: "CEO",
        company: "OpenCode Labs"
      },
      {
        quote: "Steeve took over our existing Laravel backend and completely transformed it. Automated tests, CI/CD, API documentation — everything that was missing is now in place. The project was delivered on schedule.",
        author: "Carole Mvele",
        role: "Lead Developer",
        company: "Digital Services Group"
      }
    ]
  }
} as const;
