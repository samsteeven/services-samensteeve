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
      { label: "Web Development", slug: "developpement-web" },
      { label: "Cloud Architecture", slug: "architecture-cloud" },
      { label: "Audit & Security", slug: "audit-securite" },
      { label: "AI Agents", slug: "agents-ia" },
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
    tagline: "Build, defend, accelerate — no fluff, just results.",
    subtitle: "Targeted services to build resilient web applications, automate your workflows, and secure your infrastructure.",
    cta: "Learn more",
    back: "Back to services",
    whyMe: "Why work with me?",
    deliverables: "What you get (Deliverables)",
    cases: "Typical Use Cases",
    relatedProject: "Related project",
    contactCTA: "Discuss this service",
    items: {
      "developpement-web": {
        title: "Full-Stack Web Development",
        punchline: "Applications that don't go down. Solid backend, fast frontend, zero compromise on reliability.",
        shortDesc: "Robust and scalable web applications, from database design to production deployment.",
        longDesc: "I take full ownership of designing and developing your critical web platforms. No shortcuts on quality: strict typing, decoupled architecture, robust SQL transaction management, and pessimistic locking to guarantee data integrity.",
        stack: ["Laravel", "Next.js", "Angular", "React", "Inertia.js", "PostgreSQL", "Redis", "Docker", "Laravel Reverb (WebSockets)", "Typesense"],
        deliverables: [
          "Complete turn-key web application (clean, structured, and documented codebase)",
          "High-performance, well-documented REST or Real-time APIs (OpenAPI/Swagger)",
          "Secure authentication systems (SSO, JWT, TTL-managed Redis sessions)",
          "Blazing-fast faceted search and integrated payment/escrow gateways",
          "Comprehensive unit and integration tests for critical business logic"
        ],
        cases: [
          "Complex SaaS platforms requiring advanced business rules and workflows",
          "Marketplaces with multi-party financial flows and escrow systems",
          "Custom internal business software to automate workflows and save time",
          "Complete technical refactoring of legacy backends to scale up efficiently"
        ]
      },
      "architecture-cloud": {
        title: "Cloud & Hybrid Architecture",
        punchline: "Infrastructure that works even when everything else fails. Built for real-world conditions.",
        shortDesc: "Secure and resilient cloud and hybrid infrastructures, tailored for the connectivity realities of the African market.",
        longDesc: "I design and deploy cloud (AWS/Azure) and hybrid architectures. Having solid ground experience in Central Africa, I integrate real-world constraints (expensive MPLS links, power outages, variable connectivity, local data sovereignty regulations) to deliver highly available, pragmatic hybrid architectures.",
        stack: ["Azure", "AWS", "Terraform (IaC)", "Docker", "Kubernetes", "MPLS", "IPSec VPN", "Active Directory", "Microsoft 365", "Veeam Backup", "Zabbix & Grafana"],
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
        title: "Security Audit",
        punchline: "I find the flaws before others do. Offensive audit, not passive checklists.",
        shortDesc: "In-depth review of your code and server configurations to detect and fix vulnerabilities before they can be exploited.",
        longDesc: "Security is not an add-on or a checkbox to tick at the end. I audit your applications and infrastructure from an offensive security perspective to locate logic flaws, authentication bypasses, and network misconfigurations, and guide you through remediation.",
        stack: ["OWASP Top 10", "Granular RBAC", "AES-256 Encryption", "SSRF / CSRF Protection", "Redis TTL Sessions", "Dependency Audits", "Secure HTTP Headers (CSP, HSTS)"],
        deliverables: [
          "Comprehensive security audit report, with clear executive summaries",
          "Vulnerability registry prioritized by severity level (Critical to Low)",
          "Remediation roadmap with estimated technical effort for each fix",
          "Hands-on implementation of priority security patches in your codebase",
          "Follow-up verification report confirming that all vulnerabilities were resolved"
        ],
        cases: [
          "Compliance and security audit before deploying a sensitive application to production",
          "Post-incident analysis to understand how an application was breached and patch it",
          "Code reviews (backend and frontend) focused on business logic and authorization",
          "Hardening the configuration of web servers, databases, and firewalls"
        ]
      },
      "automatisation-ia": {
        title: "AI Automation",
        punchline: "AI that works for you, not the other way around. Autonomous agents connected to your real tools.",
        shortDesc: "Integrating autonomous AI agent workflows into your software to automate complex, repetitive tasks.",
        longDesc: "I do not sell AI hype. I build autonomous agent workflows that connect directly to your production databases and APIs. Using Model Context Protocol (MCP) and graph orchestration (LangGraph), the AI reliably executes multi-step, complex workflows directly inside your existing business tools.",
        stack: ["MCP (Model Context Protocol)", "LangGraph", "CrewAI", "Claude / OpenAI APIs", "Node.js / Laravel / Python Integration"],
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
      step2: "Scope",
      step3: "Goals",
      step4: "Context",
      step5: "Contact",
      step6: "Summary",
    },
    questions: {
      step1: "What type of project would you like to start?",
      step2: "Tell me what you are looking to build",
      step3: "What does success look like?",
      step4: "Share anything that helps me understand",
      step5: "Where can we reach you?",
      step6: "One last look",
    },
    fields: {
      typePlaceholder: "Select one or more domains...",
      types: {
        web: "Web Development",
        cloud: "Cloud Architecture",
        security: "Audit & Security",
        ai: "AI Automation",
        other: "Not sure yet"
      },
      typesDesc: {
        web: "Create or evolve a robust, strictly typed web application (SaaS, API, Marketplace).",
        cloud: "Design, secure, and migrate infrastructures with auto-failover and high resilience.",
        security: "Full offensive security audit, vulnerability registry, and code remediation.",
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
      teamLabel: "Size of your current technical team",
      teamOptions: {
        solo: "No developers (solo project)",
        small: "Small team (2 to 5 people)",
        medium: "Medium team (5 to 15 people)",
        large: "Large team (more than 15 people)"
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
    },
    success: {
      title: "Request received!",
      message: "Thank you for your message. I am analyzing your needs and will get back to you within 24 hours with an initial technical and methodological assessment. You will also receive a link to schedule a call if you wish."
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
