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
        ],
        faq: [
          {
            q: "How long does it take to develop my project?",
            a: "A typical project (business platform, SaaS) takes between 4 and 12 weeks depending on complexity. I deliver in iterative phases so you can regularly validate progress."
          },
          {
            q: "Do I keep ownership of the code?",
            a: "Yes, you own 100% of the delivered source code. I also provide technical documentation so your team can take over the project."
          },
          {
            q: "How does the collaboration work?",
            a: "We start with a free scoping call (30 min). If the project matches my skills, I send you a detailed proposal with estimate, deliverables, and timeline."
          },
          {
            q: "Do you work with specific frameworks?",
            a: "I primarily work with Laravel (backend) and React/Next.js or Angular (frontend). I can adapt to your existing stack if necessary."
          }
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
        ],
        faq: [
          {
            q: "How long does an architecture mission take?",
            a: "A typical audit and architecture design mission lasts between 2 and 4 weeks. The actual migration may be longer depending on complexity."
          },
          {
            q: "Do you only work with AWS and Azure?",
            a: "I primarily work with AWS and Azure but can adapt to other providers (GCP, OVH, etc.) based on your constraints or preferences."
          },
          {
            q: "Do you handle data migration?",
            a: "Yes, I design the migration plan and can support execution. For critical volumes, I recommend a progressive approach with validation at each step."
          },
          {
            q: "What happens after the mission?",
            a: "I deliver complete documentation and train your IT team on operating the new architecture. I can remain available for ad-hoc support."
          }
        ]
      },
      "audit-securite": {
        title: "Security Audit & Pentest",
        punchline: "Map your vulnerabilities before an attacker does — exposure analysis, infra & application pentesting, cloud audit.",
        shortDesc: "Exposure analysis, penetration testing (infra, application, cloud AWS/Azure/GCP) and remediation support to durably harden your security posture.",
        longDesc: "I assess your systems as a real attacker would. From mapping your external attack surface to internal penetration tests (Active Directory, privilege escalation, compromised network access), application testing (OWASP, APIs, mobile) and cloud audits (AWS/Azure/GCP: misconfigurations, excessive privileges, exposed services), I reproduce concrete attack scenarios to identify exploitable vulnerabilities and deliver an actionable remediation plan. A three-pillar approach — exposure analysis, infrastructure & application pentest, cloud environment audit — tailored to your maturity.",
        stack: ["Exposure analysis", "Infra pentest", "App pentest", "OWASP Top 10", "Cloud audit AWS/Azure/GCP", "Active Directory", "Red Team", "Black/grey/white box"],
        outcomes: [
          "A precise map of your attack surface as seen from the Internet — before an attacker draws it for you.",
          "Concrete proof of exploitable weaknesses, ranked by real impact, not a raw scanner dump.",
          "A remediation plan prioritized by business risk, with clear and actionable steps for your teams.",
          "A full debrief and retest report to validate fixes and reduce residual risk."
        ],
        scope: [
          "Exposure analysis: technical scan of IPs and domains, service mapping, known vulnerability identification, and manual exploitation of sensitive targets (Phase 1: assessment, Phase 2: targeted exploitation).",
          "Internal penetration test: simulating an attacker who has gained network access (compromised VPN, Wi-Fi, physical access) — Active Directory mapping, privilege escalation, access to sensitive data (HR, business servers, confidential files).",
          "Application pentest: offensive testing on web apps, REST/GraphQL APIs and mobile apps (Android/iOS) against OWASP benchmarks — authentication, authorization, injections, business logic, data exposure.",
          "Cloud audit (AWS/Azure/GCP): configuration review, detection of misconfigured services, excessive privileges, exposed endpoints, and remediation recommendations aligned with CIS benchmarks."
        ],
        deliverables: [
          "Full audit report: context, methodology, exploitation evidence, business impact and actionable recommendations",
          "Vulnerability register ranked by severity and real business risk",
          "Executive summary readable by leadership, CTO, or product team (non-technical)",
          "Technical debrief workshop with your developers, IT team or vendors",
          "Retest report after priority vulnerabilities are fixed"
        ],
        cases: [
          "Exposure audit before releasing an application handling sensitive data (healthcare, finance, HR)",
          "Internal penetration test to assess risks from network access (employees, VPN, Wi-Fi, physical access)",
          "Web application, REST/GraphQL API or mobile app pentest following OWASP methodology",
          "Cloud configuration audit (AWS/Azure/GCP) to detect exposed attack surfaces and excessive privileges"
        ],
        faq: [
          {
            q: "What is the difference between black box, grey box and white box testing?",
            a: "In black box testing, no information is provided — simulating real-world attack conditions. In grey box, you provide partial access (ideal for testing authenticated portals). In white box, your teams collaborate directly with the auditor for an in-depth architecture review. I recommend grey box for most missions."
          },
          {
            q: "Do you perform cloud audits?",
            a: "Yes, I audit AWS, Azure and GCP environments: IAM misconfigurations, exposed services, excessive privileges, open S3 buckets, permissive firewall rules, secrets in environment variables. The report includes recommendations aligned with CIS benchmarks."
          },
          {
            q: "How does an internal penetration test work?",
            a: "I simulate an attacker who has gained network access (malicious employee, compromised VPN, physical port access). The goal: map your infrastructure, escalate privileges, and assess the impact on sensitive data and Active Directory."
          },
          {
            q: "What happens after the audit?",
            a: "I deliver a detailed report with an executive summary and a prioritized remediation plan. A debrief session with your teams covers results and fix planning. I can perform a retest of critical vulnerabilities after remediation to validate the measures taken."
          }
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
        ],
        faq: [
          {
            q: "What's the difference with a classic chatbot?",
            a: "Unlike a chatbot that answers questions, my AI agents execute concrete actions in your systems: creating records, generating documents, triggering workflows, with human validation at critical points."
          },
          {
            q: "How do you ensure the AI doesn't make errors?",
            a: "I implement guardrails: limited permissions, detailed logs, human validation steps, and testing on historical data. The AI is supervised, not autonomous without control."
          },
          {
            q: "Does it work with my existing tools?",
            a: "Yes, I integrate with your APIs, databases, CRM, ERP, or internal applications. The goal is for the AI to work inside your existing ecosystem, not force you to change everything."
          },
          {
            q: "How long to see results?",
            a: "A functional POC can be delivered in 2 to 4 weeks for a targeted workflow. This allows validating the approach before extending to other processes."
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
