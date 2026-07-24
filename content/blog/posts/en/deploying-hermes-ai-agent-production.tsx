import React from "react";
import { CodeWindow } from "@/components/code-window";
import { ZoomableImage } from "@/components/zoomable-image";

export default function DeployingHermesAiAgentProduction() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        Autonomous, self-hosted AI agents have become a compelling alternative to traditional SaaS assistants: full data control, no recurring fees, and deep integration into existing infrastructure. I wanted to test this under real production conditions with <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">Hermes Agent</a>, an open-source (MIT) project by Nous Research running as a persistent daemon with long-term memory, cron tasks, and a multi-platform gateway (Telegram, Discord, Slack, WhatsApp, etc.).
      </p>

      {/* Tech Stack Top Container */}
      <div className="rounded-xl border border-line bg-paper-raised/40 p-4 sm:p-5 my-6">
        <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-ink-soft block mb-3">
          Tech Stack &amp; Infrastructure Tools
        </span>
        <div className="flex flex-wrap gap-2">
          {[
            "Hermes Agent (Nous Research)",
            "Hermes WebUI",
            "systemd",
            "Nginx",
            "Let's Encrypt",
            "rclone",
            "Google Drive",
            "UFW"
          ].map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs font-semibold text-ink bg-paper border border-line px-2.5 py-1 rounded-md shadow-xs hover:border-accent/40 hover:text-accent transition duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Why This Project
      </h2>
      <p>
        The goal wasn&apos;t just running a five-minute <code>curl | bash</code> script — anyone can do that. The goal was deploying it <strong>production-style</strong>: proper user isolation, reduced attack surface, credential encryption, and a backup strategy resilient to server failures.
      </p>
      <p>
        This guide documents every step, including real-world troubleshooting encounters — because real deployments never go strictly according to initial docs.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Final Architecture
      </h2>
      <div className="border border-line rounded-xl bg-paper/60 p-4 font-mono text-xs text-ink/80 overflow-x-auto">
        <pre className="text-ink/80 leading-snug">{`Internet
   │
   ▼
┌─────────────┐      HTTPS (Let's Encrypt)
│   Nginx     │──────────────────────────┐
└─────────────┘                          │
   │ reverse proxy (127.0.0.1)           │
   ▼                                     ▼
┌─────────────────┐            ┌──────────────────┐
│ Hermes Gateway   │            │  Hermes WebUI     │
│ (Telegram)       │            │  (dashboard chat) │
│ restricted tools │            │  password auth    │
└─────────────────┘            └──────────────────┘
   │                                     │
   └──────────────┬──────────────────────┘
                   ▼
         ┌───────────────────┐
         │  Hermes Agent Core │
         │  (dedicated user,  │
         │   no sudo access) │
         └───────────────────┘
                   │
                   ▼
      ┌────────────────────────┐
      │  Daily Cron at 03:00   │
      │  hermes backup → zip    │
      │  rclone → Google Drive  │
      │  (encrypted config)     │
      └────────────────────────┘`}</pre>
      </div>
      <p>
        Two separate systemd services (<code>hermes-gateway.service</code> and <code>hermes-webui.service</code>), a dedicated non-sudo system user, and an automated backup pipeline replicating to encrypted remote storage.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        1. Core Installation
      </h2>
      <p>
        Hermes provides a one-liner installer managing runtime dependencies (Python 3.11, Node.js, ripgrep, ffmpeg) automatically:
      </p>
      <CodeWindow
        filename="Terminal — Setup"
        badge="Bash"
        code={`curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
source ~/.bashrc
hermes setup`}
      />
      <p>
        The interactive wizard configures LLM providers (Anthropic Claude, OpenRouter, Nous Portal, or any OpenAI-compatible endpoint). At this stage everything runs — but under root, without firewall policies, and with unrestricted tools.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        2. Agent Isolation: Root → Dedicated User Migration
      </h2>
      <p>
        Running an agent with terminal access, code execution, and network access <strong>as root</strong> is a shortcut that feels fine right up until it isn&apos;t. Step one: creating a dedicated unprivileged user.
      </p>
      <CodeWindow
        filename="Terminal — User Creation"
        badge="Bash"
        code={`adduser hermes`}
      />
      <p>
        Migrating data directories (<code>~/.hermes</code> and <code>~/.local/state/hermes</code>), fixing ownership, and updating the <code>systemd</code> unit:
      </p>
      <CodeWindow
        filename="/etc/systemd/system/hermes-gateway.service"
        badge="Systemd"
        code={`[Unit]
Description=Hermes Agent Gateway Service
After=network.target

[Service]
Type=simple
User=hermes
Group=hermes
ExecStart=/usr/local/lib/hermes-agent/venv/bin/python -m hermes_cli.main gateway run
WorkingDirectory=/home/hermes/.hermes
Environment="HERMES_HOME=/home/hermes/.hermes"
Restart=always

[Install]
WantedBy=multi-user.target`}
      />
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-ink-soft">
        <strong className="text-amber-500 font-mono text-xs uppercase tracking-wider block mb-1">
          ⚠️ Gotcha Encountered
        </strong>
        After migration, running <code>hermes config show</code> as root printed empty configuration — expected, as the CLI inspects the active user&apos;s <code>$HOME</code>. Always verify with <code>sudo -u hermes -i</code>.
      </div>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        3. Hardening Telegram Bot Attack Surface
      </h2>
      <p>
        This is the single most critical security hardening step: <strong>by default, messaging platforms share the full CLI toolset</strong>. Anyone paired via Telegram could execute arbitrary shell commands, code, and browse your network.
      </p>
      <p className="text-sm font-semibold text-ink"><code>config.yaml</code> snippet before hardening:</p>
      <CodeWindow
        filename="config.yaml — Before restriction"
        badge="YAML"
        code={`platform_toolsets:
  telegram:
    - terminal
    - code_execution
    - computer_use
    - browser
    - delegation
    - file
    - memory
    - web
    # ...`}
      />
      <p className="text-sm font-semibold text-ink">After hardening (retaining only essential messaging tools):</p>
      <CodeWindow
        filename="config.yaml — After restriction"
        badge="YAML"
        code={`platform_toolsets:
  telegram:
    - clarify
    - cronjob
    - file
    - image_gen
    - memory
    - session_search
    - skills
    - todo
    - tts
    - vision
    - web`}
      />
      <p>
        <code>terminal</code>, <code>code_execution</code>, <code>computer_use</code>, <code>browser</code>, and <code>delegation</code> were stripped. <code>delegation</code> was explicitly removed because delegated sub-agents could otherwise invoke blocked tools.
      </p>
      <p>
        In addition, security guardrails were explicitly enabled:
      </p>
      <CodeWindow
        filename="config.yaml — Security Policies"
        badge="YAML"
        code={`security:
  redact_secrets: true      # Redacts API keys / tokens from logs & responses
  tirith_enabled: true      # Pre-execution command inspector
  tirith_fail_open: false   # Blocks (instead of allowing) if inspector fails`}
      />
      <p>
        Setting <code>fail_open: false</code> is intentional: default permissive fallbacks on public facing bots are unsafe. Pairing controls (<code>hermes pairing approve telegram &lt;code&gt;</code>) ensure only explicitly approved user IDs interact with the agent.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        4. Web Dashboard: Official vs Community WebUI
      </h2>
      <p>
        Hermes includes an internal dashboard (<code>hermes dashboard</code>, port 9119), but I deployed <strong>Hermes WebUI</strong> (community MIT project) for rich chat features, session tracking, streaming, and file browsing.
      </p>
      <p>
        Using third-party tooling requires risk trade-offs offset here by: loopback binding only, strict password authentication, and HTTPS reverse proxy encapsulation.
      </p>

      {/* Production Deployment Screenshot */}
      <div className="my-6 space-y-2">
        <ZoomableImage
          src="/blog/hermes-workspace.png"
          alt="Hermes WebUI live in production on hermes.samensteeve.com"
        />
        <p className="text-center font-mono text-xs text-ink-soft">
          Screenshot: Hermes WebUI running in active production on <code className="text-accent font-semibold">hermes.samensteeve.com</code> with multi-channel sessions (WebUI &amp; Telegram).
        </p>
      </div>
      <CodeWindow
        filename="Terminal — WebUI Setup"
        badge="Bash"
        code={`git clone https://github.com/nesquena/hermes-webui.git
cd hermes-webui
python3 bootstrap.py`}
      />
      <CodeWindow
        filename="hermes-webui/.env"
        badge="Config"
        code={`HERMES_WEBUI_HOST=127.0.0.1
HERMES_WEBUI_PASSWORD=<strong-generated-password>
HERMES_WEBUI_SECURE=1
HERMES_WEBUI_ALLOWED_ORIGINS=https://hermes.yourdomain.com`}
      />

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Three Troubleshooting Lessons:
      </h3>
      <ol className="list-decimal list-inside space-y-3">
        <li>
          <strong>Python Interpreter Mismatch</strong>: The service initially used system Python (<code>/usr/bin/python3</code>) missing agent dependencies (<code>httpx</code>, <code>dotenv</code>). Solution: point <code>ExecStart</code> to the agent virtualenv directly.
        </li>
        <li>
          <strong>Orphaned Zombie Processes</strong>: A failed restart left port 8787 locked (<code>FATAL: Another server is already responding on 127.0.0.1:8787</code>). Resolved via <code>ss -tlnp</code> PID identification and cleanup.
        </li>
        <li>
          <strong>Malformed YAML Syntax</strong>: Manual edit left an unindented commented key header (<code># security:</code>) breaking the YAML parser. Always validate via <code>python3 -c "import yaml; yaml.safe_load(...)"</code> before restarting services.
        </li>
      </ol>

      <p className="text-sm font-semibold text-ink mt-6">Nginx Reverse Proxy + Let&apos;s Encrypt SSL:</p>
      <CodeWindow
        filename="/etc/nginx/sites-available/hermes"
        badge="Nginx"
        code={`server {
    listen 80;
    server_name hermes.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8787;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}`}
      />
      <CodeWindow
        filename="Terminal — Certbot TLS"
        badge="Bash"
        code={`sudo certbot --nginx -d hermes.yourdomain.com`}
      />

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        5. Encrypted, Automated Remote Backups
      </h2>
      <p>
        An autonomous agent accumulates long-term state, memory, and custom skills over time. Strategy: daily local snapshot + Google Drive remote sync with 14-day retention.
      </p>
      <CodeWindow
        filename="/home/hermes/scripts/backup-hermes.sh"
        badge="Bash Script"
        code={`#!/bin/bash
set -euo pipefail
cd /home/hermes

export RCLONE_CONFIG_PASS="********"   # Encrypted rclone config password

BACKUP_DIR="/home/hermes/backups"
DATE=$(date +%Y%m%d-%H%M%S)
KEEP_DAYS=14
GDRIVE_REMOTE="gdrive:hermes-backups"

hermes backup -o "$BACKUP_DIR/hermes-backup-$DATE.zip" -l "daily-cron"
rclone copy "$BACKUP_DIR/hermes-backup-$DATE.zip" "$GDRIVE_REMOTE" --quiet

find "$BACKUP_DIR" -name "hermes-backup-*.zip" -mtime +$KEEP_DAYS -delete
rclone delete "$GDRIVE_REMOTE" --min-age \${KEEP_DAYS}d --quiet`}
      />
      <CodeWindow
        filename="crontab -e (hermes user)"
        badge="Cron"
        code={`0 3 * * * /home/hermes/scripts/backup-hermes.sh >> /home/hermes/backups/backup.log 2>&1`}
      />

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Key Takeaways & Technical Proof
      </h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>System Hardening</strong>: Privilege separation, permission enforcement, process isolation</li>
        <li><strong>Network Architecture</strong>: Reverse proxying, TLS termination, loopback interface bounds</li>
        <li><strong>Secrets Management</strong>: At-rest encryption, environment injection, automatic log redaction</li>
        <li><strong>Reliable Automation</strong>: <code>systemd</code> units, cron scheduling, idempotent shell scripting (<code>set -euo pipefail</code>)</li>
        <li><strong>Methodical Debugging</strong>: <code>journalctl</code> investigation, root cause isolation</li>
      </ul>
    </article>
  );
}
