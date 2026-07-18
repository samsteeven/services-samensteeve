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
      { label: "Software Engineering", slug: "developpement-web" },
      { label: "Cloud Architecture", slug: "architecture-cloud" },
      { label: "Pentest & Security", slug: "audit-securite" },
      { label: "AI Automation", slug: "automatisation-ia" },
    ],
  },
  hero: {
    status: "Available for new projects",
    title: "I design, secure, and automate software systems for companies that need things to work in production — not just in demos.",
    subtitle: "Software Engineer, Tech Lead & AI Automation Specialist based in Douala, Cameroon. I work on a freelance basis to structure your backend, secure your cloud architectures, and integrate autonomous AI agents into your business operations.",
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
      "developpement-web": {
        title: "Software Engineering",
        punchline: "I design and build complete software products: business platforms, APIs, critical backends, interfaces, and integrations.",
        shortDesc: "Design, development, and industrialization of robust software systems, not just web interfaces.",
        longDesc: "I take ownership of production software: product scoping, application architecture, backend, frontend, APIs, integrations, data, tests, and deployment. The goal is not to ship screens, but a reliable, maintainable system your team can operate.",
        stack: ["Application architecture", "Backend & APIs", "Product frontend", "Databases", "Business integrations", "Tests & CI/CD", "Observability", "Documentation"],
        outcomes: [
          "A reliable, maintainable software product aligned with your business processes.",
          "An architecture that can evolve without turning each new feature into technical debt.",
          "Critical workflows secured: payments, roles, approvals, sync, search, or reporting.",
          "A documented, tested codebase that can be handed over to an internal team."
        ],
        scope: [
          "Needs framing, domain modeling, and business workflow definition before implementation.",
          "Backend, API, database, access rules, jobs, events, and external integration design.",
          "Web interfaces or dashboards when they serve the product, without reducing the offer to web.",
          "Testing, CI/CD, application monitoring, and usable technical documentation."
        ],
        deliverables: [
          "Documented application architecture with data models and technical decisions",
          "Backend, APIs, and product interfaces delivered with structured source code",
          "Authentication, roles, permissions, and critical business workflows",
          "Unit tests, continuous integration, and staging environment",
          "Technical documentation and handover for your team"
        ],
        cases: [
          "Business platform or SaaS with complex logic and multiple user profiles",
          "Internal product replacing spreadsheets, manual processing, or scattered tools",
          "Critical API or backend to stabilize before scaling",
          "Technical rebuild of an existing product that became hard to maintain"
        ]
      },
      "architecture-cloud": {
        title: "Cloud & Hybrid Architecture",
        punchline: "Cloud and hybrid architectures designed for real constraints: unstable networks, remote sites, security, and continuity.",
        shortDesc: "Secure and resilient cloud and hybrid infrastructures, tailored for the connectivity realities of the African market.",
        longDesc: "I design and deploy cloud (AWS/Azure) and hybrid architectures. Having solid ground experience in Central Africa, I integrate real-world constraints (expensive MPLS links, power outages, variable connectivity, local data sovereignty regulations) to deliver highly available, pragmatic hybrid architectures.",
        stack: ["AWS/Azure cloud", "Hybrid infrastructure", "Network & VPN", "Terraform IaC", "Backup & DRP", "Monitoring", "Microsoft 365 identity", "Runbooks"],
        outcomes: [
          "A documented, reproducible infrastructure aligned with field constraints.",
          "A clear continuity plan: backup, recovery, monitoring, alerts, and ownership.",
          "Sites, users, and workloads interconnected without a single point of failure.",
          "An IT team able to operate the environment after handover."
        ],
        scope: [
          "Audit of the existing environment: network, servers, cloud, identity, backup, security, and costs.",
          "Target architecture design with realistic phased migration scenarios.",
          "Infrastructure as code, monitoring, backup, and recovery procedure implementation.",
          "Operational documentation and support for local IT teams."
        ],
        deliverables: [
          "Detailed Architecture Design Document (Component diagrams and Architecture Decision Records)",
          "Production infrastructure deployed and managed as code (Terraform)",
          "Step-by-step cloud migration plan broken down into autonomous phases",
          "Disaster Recovery Plan (DRP/BCP) with fully tested RTO and RPO metrics",
          "Knowledge transfer sessions for your local IT operations team"
        ],
        cases: [
          "Interconnecting remote branches and headquarters with automated failover",
          "Progressive migration of physical server rooms (on-premise) to the cloud",
          "Setting up redundant, secure off-site backup strategies (Azure Blob, etc.)",
          "Automating server provisioning and configuration using Infrastructure as Code"
        ]
      },
      "audit-securite": {
        title: "Application Pentest & Security",
        punchline: "Not just a code review: an offensive approach to verify what an attacker can actually do.",
        shortDesc: "Application penetration testing, exposure review, access-control analysis, and remediation support.",
        longDesc: "I assess your applications as real targets: reconnaissance, attack-surface mapping, OWASP testing, business logic, authentication, authorization, sessions, APIs, configuration, and exploit paths. Code review can be part of the mission, but it is only one tool among others.",
        stack: ["Web/API pentest", "OWASP Top 10", "Auth & sessions", "Access control", "Business logic", "Attack surface", "Hardening", "Retest"],
        outcomes: [
          "A clear view of truly exploitable weaknesses, not a raw scanner dump.",
          "Impact evidence that leadership can understand and developers can act on.",
          "A remediation plan prioritized by business risk and fix effort.",
          "Post-fix validation to reduce residual risk."
        ],
        scope: [
          "Reconnaissance, attack-surface mapping, and exposed entry-point analysis.",
          "Manual testing of authentication, authorization, sessions, APIs, files, uploads, and business logic.",
          "OWASP risk verification: injection, XSS, SSRF, IDOR, CSRF, misconfiguration, secrets.",
          "Remediation support and retest of critical vulnerabilities."
        ],
        deliverables: [
          "Pentest report with context, methodology, proof, impact, and recommendations",
          "Vulnerability register ranked by severity and business risk",
          "Executive summary readable by leadership, IT, or product teams",
          "Technical restitution workshop with your developers or vendors",
          "Retest report after priority vulnerabilities are fixed"
        ],
        cases: [
          "Pentest before releasing an exposed application or sensitive-data platform",
          "API, back-office, customer portal, marketplace, or SaaS platform audit",
          "Verification of roles, permissions, indirect access, and business-logic flaws",
          "Post-incident analysis to understand the attack path and close the gaps"
        ]
      },
      "automatisation-ia": {
        title: "AI Automation",
        punchline: "Automating real processes with supervisable AI agents integrated into your tools and data.",
        shortDesc: "Integrating autonomous AI agent workflows into your software to automate complex, repetitive tasks.",
        longDesc: "I do not sell AI hype. I build autonomous agent workflows that connect directly to your production databases and APIs. Using Model Context Protocol (MCP) and graph orchestration (LangGraph), the AI reliably executes multi-step, complex workflows directly inside your existing business tools.",
        stack: ["AI agents", "MCP", "LangGraph", "Business tools", "Human approval", "RAG", "LLM APIs", "Logging"],
        outcomes: [
          "Repetitive tasks handled faster without losing human control.",
          "Agents connected to existing tools instead of an isolated chatbot.",
          "Guardrails: permissions, logs, approval steps, and recovery paths.",
          "Measurable return on automated processes."
        ],
        scope: [
          "Identification of high-ROI workflows and automation risks.",
          "Agent, tool, permission, memory, approval-step, and logging design.",
          "Integration with APIs, databases, documents, CRM, ERP, or internal apps.",
          "Supervision dashboard to track, correct, and improve automations."
        ],
        deliverables: [
          "Scoping document identifying high-ROI workflows suitable for AI automation",
          "Custom-designed AI agent graph modeled, built, and tested with memory tools",
          "Seamless integration into your existing systems (Laravel, Next.js backends)",
          "Supervision dashboard to track, log, and manually approve AI agent actions",
          "Technical documentation and operational runbook for continuous maintenance"
        ],
        cases: [
          "Automated processing of incoming documents (invoices, custom quotes, legal contracts)",
          "Lead qualification and L2 support agents with secure database query capabilities",
          "Automated generation of complex business reports pulling from multiple sources",
          "Orchestrating administrative multi-step tasks without human bottlenecking"
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
        security: "Pentest & Security",
        ai: "AI Automation",
        other: "Not sure yet"
      },
      typesDesc: {
        web: "Design or evolve business software, a platform, an API, or a complete product.",
        cloud: "Design, secure, and migrate infrastructures with auto-failover and high resilience.",
        security: "Offensively test an application, API, or exposed surface, then prioritize remediation.",
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
            security_pentest: "Identify exploitable vulnerabilities",
            security_remediation: "Prioritize and support remediation",
            security_compliance: "Prepare for an audit, client requirement, or compliance",
            security_hardening: "Harden the application, API, or infrastructure"
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
          title: "Pentest & Security",
          placeholder: "Describe the audit scope: application/API, authorized environments, test accounts, sensitive data, testing constraints, or already identified risks...",
          prompts: ["Authorized scope", "Test accounts", "Sensitive data", "Audit constraints"]
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
              key: "target",
              label: "Target to test",
              options: [
                { value: "web", label: "Web application" },
                { value: "api", label: "API / backend" },
                { value: "infra", label: "Infrastructure / network" },
                { value: "mixed", label: "Mixed scope" }
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
              label: "Authorization and access",
              options: [
                { value: "ready", label: "Authorization and accounts are ready" },
                { value: "accounts", label: "Test accounts need preparation" },
                { value: "scope", label: "Scope needs formalization" },
                { value: "help", label: "Need help scoping it legally" }
              ]
            },
            {
              key: "constraints",
              label: "Testing constraints",
              options: [
                { value: "low-impact", label: "Non-destructive tests only" },
                { value: "authenticated", label: "Tests with authenticated roles" },
                { value: "compliance", label: "Audit / compliance constraint" },
                { value: "none", label: "No specific constraint" }
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
  footer: {
    rights: "All rights reserved.",
    location: "Available for international remote work and on-site in Douala.",
    specialty: "Samen Steeve · Software Engineer & Solution Architect",
    bookCall: "Book a call (30 min)"
  }
} as const;
