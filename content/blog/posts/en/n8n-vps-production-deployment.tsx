import React from "react";

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
      <p>
        The VPS was running Ubuntu with Docker, Nginx, Redis, and a local MySQL database. The goal: cleanly add n8n on a dedicated subdomain without impacting the main site.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Architecture Choice: Complete Isolation
      </h2>
      <p>
        Co-locating n8n on the production MySQL database was tempting, but risky — a disk overflow or crash in n8n would directly impact the main application. The selected architecture relies on strict isolation:
      </p>
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
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`sudo mkdir -p /opt/n8n
cd /opt/n8n
sudo mkdir -p n8n_data postgres_data`}
      </pre>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        2. Generate Encryption Key
      </h3>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`openssl rand -hex 32`}
      </pre>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        3. Environment Variables (.env)
      </h3>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`N8N_HOST=n8n.samensteeve.com
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
      </pre>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        4. Write <code>docker-compose.yml</code>
      </h3>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`services:
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
      </pre>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        5. Reverse Proxy Nginx & SSL
      </h3>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`sudo certbot --nginx -d n8n.samensteeve.com`}
      </pre>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Real-World Debugging Lessons
      </h2>
      <p>
        Three specific issues arose during deployment: volume file permissions (resolved via <code>chown -R 1000:1000</code>), initial Postgres credential mismatch, and a Google Safe Browsing false positive on the newly created login subdomain.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Takeaways
      </h2>
      <p>
        Proper self-hosting requires robust isolation, security hardening, and proper reverse proxy configuration. It ensures cost-effective workflow automation without compromising production reliability.
      </p>
    </article>
  );
}
