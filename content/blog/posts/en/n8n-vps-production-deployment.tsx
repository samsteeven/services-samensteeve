import React from "react";
import { CodeWindow } from "@/components/code-window";

export default function N8nVpsProductionDeployment() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        An autopilot automation tool can go wrong: poor isolation on a shared VPS can compromise your production database. Here is how I deployed n8n in production for the <a href="/en/realisations/tribunejustice" className="text-accent underline underline-offset-2">TribuneJustice</a> project — a legaltech platform I lead as Tech Lead — without disrupting existing infrastructure.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The Context: Making the Most of an Existing VPS
      </h2>
      <p>
        On TribuneJustice, I needed a workflow orchestrator for recurring tasks: notifications, service syncs, and scheduled jobs. Rather than paying for execution-based cloud subscriptions, I chose to self-host <a href="https://n8n.io" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">n8n</a> on a VPS already running for the project — maximizing existing resources rather than multiplying infrastructure costs.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Architecture Choice: Complete Isolation
      </h2>
      <div className="border border-line rounded-xl bg-paper/60 p-4 font-mono text-xs text-ink/80 space-y-1">
        <div>— Dedicated <code>PostgreSQL 16</code> container (officially recommended by n8n over MySQL)</div>
        <div>— Isolated Docker network connecting only n8n and its PostgreSQL instance</div>
        <div>— n8n exposed exclusively on <code>127.0.0.1:5678</code>, never directly to the public web</div>
        <div>— Existing Nginx configured with a dedicated <code>server_block</code> for <code>n8n.samensteeve.com</code></div>
        <div>— CPU and memory limits on containers to protect main project resources</div>
      </div>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Step-by-Step Deployment
      </h2>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        1. Prepare Dedicated Directory
      </h3>
      <CodeWindow
        filename="Terminal — Bash"
        badge="Bash"
        code={`sudo mkdir -p /opt/n8n
cd /opt/n8n
sudo mkdir -p n8n_data postgres_data`}
      />

      <h3 className="font-display text-base font-bold text-ink mt-6">
        2. Environment Variables (.env)
      </h3>
      <CodeWindow
        filename=".env"
        badge="Config"
        code={`N8N_HOST=n8n.samensteeve.com
N8N_PROTOCOL=https
N8N_WEBHOOK_URL=https://n8n.samensteeve.com/
N8N_ENCRYPTION_KEY=<generated_key>
GENERIC_TIMEZONE=Africa/Douala
TZ=Africa/Douala

DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=postgres
DB_POSTGRESDB_DATABASE=n8n
DB_POSTGRESDB_USER=n8n_user
DB_POSTGRESDB_PASSWORD=<strong_password>

POSTGRES_USER=n8n_user
POSTGRES_PASSWORD=<same_strong_password>
POSTGRES_DB=n8n`}
      />

      <h3 className="font-display text-base font-bold text-ink mt-6">
        3. Write <code>docker-compose.yml</code>
      </h3>
      <CodeWindow
        filename="docker-compose.yml"
        badge="Docker"
        code={`services:
  postgres:
    image: postgres:16-alpine
    container_name: n8n_postgres
    restart: always
    env_file: .env
    volumes:
      - ./postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${POSTGRES_USER} -d \${POSTGRES_DB}"]
      interval: 5s
      timeout: 5s
      retries: 10
    networks:
      - n8n_net

  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: always
    env_file: .env
    ports:
      - "127.0.0.1:5678:5678"
    volumes:
      - ./n8n_data:/home/node/.n8n
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - n8n_net

networks:
  n8n_net:
    driver: bridge`}
      />

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Real-World Debugging Lessons
      </h2>
      <p>
        Three specific issues arose during deployment: volume file permissions (resolved via <code>chown -R 1000:1000</code>), initial Postgres credential mismatch, and a Google Safe Browsing false positive on the newly created login subdomain.
      </p>

      {/* Screenshot 1 : Google Warning */}
      <figure className="my-6 rounded-2xl border border-line overflow-hidden bg-paper-raised/50 shadow-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/blog/n8n-google-warning.png"
          alt="Google Safe Browsing Warning - Dangerous Site on n8n.samensteeve.com"
          className="w-full object-cover"
        />
        <figcaption className="p-3 text-center font-mono text-xs text-ink-soft border-t border-line/40 bg-paper-raised">
          Figure 1: Heuristic Chrome / Google Safe Browsing warning upon first accessing the n8n subdomain.
        </figcaption>
      </figure>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        n8n Up & Running
      </h3>
      <p>
        Once the Google false positive was cleared via Search Console review, the n8n instance became fully accessible and ready for workflow automation.
      </p>

      {/* Screenshot 2 : n8n Dashboard */}
      <figure className="my-6 rounded-2xl border border-line overflow-hidden bg-paper-raised/50 shadow-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/blog/n8n-dashboard.png"
          alt="n8n Dashboard Live - What do you want to build Sam?"
          className="w-full object-cover"
        />
        <figcaption className="p-3 text-center font-mono text-xs text-ink-soft border-t border-line/40 bg-paper-raised">
          Figure 2: Secured, fully operational n8n instance on n8n.samensteeve.com.
        </figcaption>
      </figure>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        What&apos;s Running in Production Today
      </h2>
      <p>
        The n8n instance is no longer just a task orchestrator. Two critical workflows run in production, connected by a <strong>shared CRM Data Table</strong> — the core of the system.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Lead Qualification Agent (write)
      </h3>
      <p>
        Autonomous AI agent that intercepts form submissions, enriches data via Tavily, scores the lead 1-10, and <strong>writes</strong> to the CRM Data Table (upsert by email). Personalized response email sent to the prospect in &lt; 30s. Redis memory, strict Output Parser (constrained JSON schema), retry on Gmail and Tavily.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        WhatsApp CRM Assistant (read &amp; operational)
      </h3>
      <p>
        WhatsApp agent that allows <strong>reading</strong> and querying the same CRM in natural language — check recent leads, look up by email, update status, send professional emails. Redis memory for conversation context.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        The Complete Pipeline
      </h3>
      <p>
        Both workflows form a unified system: the Lead Agent <strong>populates</strong> the CRM with qualified, enriched leads, while the WhatsApp Assistant allows <strong>querying</strong> and <strong>acting</strong> on that data directly from WhatsApp — without opening the n8n interface. Shared Redis memory for conversation continuity between both agents.
      </p>

      <div className="border border-line rounded-xl bg-paper/60 p-4 font-mono text-xs text-ink/80 space-y-1">
        <div>— Each workflow has its own security model: Header Auth (<code>X-Webhook-Secret</code>) for the Lead Agent, WhatsApp Business authentication for the CRM Assistant.</div>
        <div>— <code>retryOnFail</code> configured on critical nodes (Gmail, Tavily, HTTP) with 3 attempts.</div>
        <div>— Shared Redis memory for conversation persistence.</div>
      </div>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Takeaways
      </h2>
      <p>
        Proper self-hosting requires robust isolation, security hardening, and proper reverse proxy configuration. It ensures cost-effective workflow automation without compromising production reliability.
      </p>
    </article>
  );
}
