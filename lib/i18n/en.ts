export const en = {
  nav: {
    services: "Services",
    process: "How it works",
    realisations: "Case Studies",
    cta: "Start a project",
    opposite: "FR",
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
    title: "My Services",
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
        title: "Application Security & Audit",
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
        title: "AI Automation & Agents",
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
    subtitle: "A transparent methodology, with zero black-box effect, focused on concrete deliverables at each stage.",
    cta: "Start a collaboration",
    phases: [
      {
        num: "01",
        title: "Scoping & Alignment",
        duration: "1 to 3 days",
        desc: "We analyze your actual business needs. The goal is to understand the underlying problem to propose the most pragmatic approach, not the most complex one.",
        deliverables: [
          "Deep, formalized understanding of the business requirement",
          "Macro-architecture proposal with reasoned technology choices",
          "Clear definition of project scope (what is included and excluded)",
          "Precise timeline and budget estimates"
        ]
      },
      {
        num: "02",
        title: "Architecture & Design",
        duration: "Variable depending on size",
        desc: "Before writing any code, we lay solid foundations. Everything is modeled and documented to prevent bad surprises and costly late-stage pivots.",
        deliverables: [
          "Architecture diagrams (data flow, components, deployment mapping)",
          "Architecture Decision Records (ADRs) documenting key design choices",
          "Development and staging environments fully configured",
          "First skeleton version deployed on the staging environment"
        ]
      },
      {
        num: "03",
        title: "Build & Iterations",
        duration: "Active development",
        desc: "Development is done iteratively. You get access to the Git repository and the staging environment on day one to track progress in real-time.",
        deliverables: [
          "Regular functional updates deployed and tested on staging",
          "Clean, strongly typed codebase covered by automated tests",
          "Frequent alignment check-ins to validate intermediate milestones",
          "Zero tunnel effect: you watch the application grow week after week"
        ]
      },
      {
        num: "04",
        title: "Handover & Autonomy",
        duration: "Deployment & Support",
        desc: "I deploy the system to production and ensure your team is fully equipped to maintain it. You retain 100% ownership of everything that has been produced.",
        deliverables: [
          "Production deployment with monitoring and alerts fully set up",
          "Comprehensive technical documentation and operational runbook",
          "Training sessions for your technical and functional teams",
          "Dedicated warranty and post-deployment support period"
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
    subtitle: "Describe your project. I will get back to you within 24 hours with an initial technical and methodological analysis.",
    steps: {
      projectType: "Step 1: What type of project?",
      description: "Step 2: Describe your project",
      context: "Step 3: Context",
      contact: "Step 4: Contact info",
    },
    fields: {
      typePlaceholder: "Select one or more domains...",
      types: {
        web: "Web application development",
        cloud: "Cloud architecture / Migration",
        security: "Security audit & patches",
        ai: "AI automation & agents",
        other: "Other needs / Not sure yet"
      },
      descLabel: "What are you looking to build, secure, or automate?",
      descPlaceholder: "Briefly describe the goals of the project, expected key features, and the business problem you are looking to solve...",
      codebaseLabel: "Do you have an existing codebase?",
      codebaseOptions: {
        yes: "Yes, we have an existing project to evolve/secure",
        no: "No, we are starting a new project from scratch"
      },
      timelineLabel: "Desired timeline",
      timelineOptions: {
        urgent: "Urgent (under 1 month)",
        short: "Short term (1 to 3 months)",
        medium: "Medium term (3 to 6 months)",
        flexible: "Flexible / No strict constraints"
      },
      teamLabel: "Size of your current technical team",
      teamOptions: {
        solo: "No developers (solo project)",
        small: "Small team (2 to 5 people)",
        medium: "Medium team (5 to 15 people)",
        large: "Large team (more than 15 people)"
      },
      nameLabel: "First & Last name",
      namePlaceholder: "John Doe",
      emailLabel: "Work email",
      emailPlaceholder: "john.doe@company.com",
      whatsappLabel: "WhatsApp number (optional, for quick communication)",
      whatsappPlaceholder: "+237 6xx xxx xxx",
      sourceLabel: "How did you hear about me?",
      sourcePlaceholder: "LinkedIn, Google search, recommendation..."
    },
    buttons: {
      next: "Next",
      prev: "Back",
      submit: "Submit request",
      submitting: "Submitting...",
    },
    success: {
      title: "Request received!",
      message: "Thank you for reaching out. I am analyzing your request and will get back to you within 24 hours with an initial technical assessment and a link to schedule a discovery call."
    },
    error: {
      title: "Submission error",
      message: "Something went wrong while sending your request. Please try again or email me directly at samendjiaha@gmail.com."
    }
  },
  footer: {
    rights: "All rights reserved.",
    location: "Available for international remote work and on-site in Douala.",
    specialty: "Samen Steeve · Software Engineer & Solution Architect",
    bookCall: "Book a call (30 min)"
  }
} as const;
