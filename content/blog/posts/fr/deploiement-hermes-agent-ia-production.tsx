import React from "react";
import { CodeWindow } from "@/components/code-window";
import { ZoomableImage } from "@/components/zoomable-image";

export default function DeploiementHermesAgentIaProduction() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        Les agents IA autonomes et self-hosted sont devenus une alternative crédible aux assistants SaaS classiques : contrôle total des données, pas d&apos;abonnement récurrent, et intégration profonde avec son infrastructure existante. J&apos;ai voulu tester ça en conditions réelles avec <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">Hermes Agent</a>, un projet open source (MIT) de Nous Research qui tourne comme un daemon persistant sur un serveur, avec mémoire long terme, tâches planifiées (cron), et une passerelle multi-plateforme (Telegram, Discord, Slack, WhatsApp, etc.).
      </p>

      {/* Stack Technique en haut */}
      <div className="rounded-xl border border-line bg-paper-raised/40 p-4 sm:p-5 my-6">
        <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-ink-soft block mb-3">
          Stack technique &amp; technologies utilisées
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
        Pourquoi ce projet
      </h2>
      <p>
        L&apos;objectif n&apos;était pas juste de &quot;faire tourner un <code>curl | bash</code>&quot; — n&apos;importe qui peut le faire en cinq minutes. L&apos;objectif était de le déployer <strong>comme en production</strong> : avec une isolation utilisateur correcte, une surface d&apos;attaque réduite, un chiffrement des credentials, et une stratégie de sauvegarde qui survit à un incident serveur.
      </p>
      <p>
        Ce guide documente chaque étape, y compris les erreurs rencontrées en cours de route — parce qu&apos;un déploiement réel ne se passe jamais exactement comme la documentation le promet.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Architecture finale
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
│ toolset restreint│            │  auth par mdp     │
└─────────────────┘            └──────────────────┘
   │                                     │
   └──────────────┬──────────────────────┘
                   ▼
         ┌───────────────────┐
         │  Hermes Agent Core │
         │  (utilisateur      │
         │   dédié, sans sudo)│
         └───────────────────┘
                   │
                   ▼
      ┌────────────────────────┐
      │  Cron quotidien 3h      │
      │  hermes backup → zip    │
      │  rclone → Google Drive  │
      │  (config chiffrée)      │
      └────────────────────────┘`}</pre>
      </div>
      <p>
        Deux services systemd distincts (<code>hermes-gateway.service</code> et <code>hermes-webui.service</code>), un utilisateur système dédié sans privilège sudo, et un pipeline de sauvegarde qui pousse vers un stockage externe chiffré.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        1. Installation de base
      </h2>
      <p>
        Hermes fournit un installeur one-liner qui gère les dépendances (Python 3.11, Node.js, ripgrep, ffmpeg) automatiquement :
      </p>
      <CodeWindow
        filename="Terminal — Installation"
        badge="Bash"
        code={`curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
source ~/.bashrc
hermes setup`}
      />
      <p>
        Le wizard configure le provider LLM (Anthropic Claude, OpenRouter, Nous Portal, ou tout endpoint compatible OpenAI) et prépare une première config fonctionnelle. À ce stade, tout tourne — mais en root, sans firewall, sans restriction d&apos;outils. C&apos;est là que le vrai travail commence.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        2. Isoler l&apos;agent : migration root → utilisateur dédié
      </h2>
      <p>
        Faire tourner un agent qui a accès à un terminal, à l&apos;exécution de code et à Internet <strong>en tant que root</strong> est le genre de raccourci qui semble anodin jusqu&apos;au jour où il ne l&apos;est plus. Première étape : créer un utilisateur système dédié, sans droits sudo.
      </p>
      <CodeWindow
        filename="Terminal — Création d'utilisateur"
        badge="Bash"
        code={`adduser hermes`}
      />
      <p>
        Puis migration des deux répertoires de données (<code>~/.hermes</code> et <code>~/.local/state/hermes</code>), correction des permissions, et réécriture du service <code>systemd</code> pour qu&apos;il tourne sous ce nouvel utilisateur :
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
          ⚠️ Piège rencontré
        </strong>
        Après la migration, <code>hermes config show</code> lancé en root affichait une config vide — logique, puisque la CLI regarde le <code>$HOME</code> de l&apos;utilisateur qui l&apos;exécute, et non celui déclaré dans le service. Toujours vérifier avec <code>sudo -u hermes -i</code> avant de conclure à un bug.
      </div>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        3. Réduire la surface d&apos;attaque du bot Telegram
      </h2>
      <p>
        C&apos;est le point de sécurité le plus important de tout ce déploiement, et probablement le plus souvent négligé : <strong>par défaut, le toolset attribué à la messagerie est identique au toolset CLI complet</strong>. Autrement dit, n&apos;importe quel utilisateur pairé sur Telegram peut, par défaut, exécuter des commandes shell, lancer du code, et naviguer sur le web depuis votre serveur.
      </p>
      <p className="text-sm font-semibold text-ink">Extrait de <code>config.yaml</code> avant restriction :</p>
      <CodeWindow
        filename="config.yaml — Avant restriction"
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
      <p className="text-sm font-semibold text-ink">Après restriction, en ne gardant que ce qui est réellement nécessaire pour un usage messagerie :</p>
      <CodeWindow
        filename="config.yaml — Après restriction"
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
        <code>terminal</code>, <code>code_execution</code>, <code>computer_use</code>, <code>browser</code> et <code>delegation</code> sont retirés — ce dernier parce qu&apos;un sous-agent délégué peut lui-même invoquer les outils exclus, contournant la restriction si on l&apos;oublie.
      </p>
      <p>
        En complément, deux protections activées explicitement dans la config :
      </p>
      <CodeWindow
        filename="config.yaml — Protections de sécurité"
        badge="YAML"
        code={`security:
  redact_secrets: true      # masque les clés API / tokens dans les logs et réponses
  tirith_enabled: true      # scanner pré-exécution des commandes
  tirith_fail_open: false   # bloque (au lieu d'autoriser) si le scanner échoue`}
      />
      <p>
        Le <code>fail_open: false</code> est un choix délibéré : par défaut, si le scanner de sécurité plante ou timeout, la commande s&apos;exécute quand même (comportement permissif). Sur un serveur de production exposé à une messagerie publique, on préfère l&apos;inverse.
      </p>
      <p>
        Le système d&apos;appariement (<code>hermes pairing approve telegram &lt;code&gt;</code>) garantit par ailleurs que seuls les utilisateurs explicitement approuvés peuvent interagir avec le bot — les autres sont automatiquement refusés.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        4. Interface web : dashboard officiel vs WebUI communautaire
      </h2>
      <p>
        Hermes propose un dashboard intégré (<code>hermes dashboard</code>, port 9119, bind loopback par défaut), mais j&apos;ai opté pour <strong>Hermes WebUI</strong>, un projet communautaire MIT (non affilié à Nous Research) qui offre une parité quasi complète avec le CLI dans une interface de chat plus riche (gestion de sessions, navigateur de fichiers, streaming).
      </p>
      <p>
        Utiliser un outil tiers plutôt que l&apos;officiel implique un compromis de confiance assumé — code non audité par l&apos;éditeur principal — compensé ici par : accès en loopback uniquement, authentification par mot de passe obligatoire, et exposition exclusivement via reverse proxy HTTPS.
      </p>

      {/* Capture d'écran du déploiement en production */}
      <div className="my-6 space-y-2">
        <ZoomableImage
          src="/blog/hermes-workspace.png"
          alt="Interface Hermes WebUI en production sur hermes.samensteeve.com"
        />
        <p className="text-center font-mono text-xs text-ink-soft">
          Capture d&apos;écran : Hermes WebUI en production active sur <code className="text-accent font-semibold">hermes.samensteeve.com</code> avec sessions multi-canaux (WebUI &amp; Telegram).
        </p>
      </div>
      <CodeWindow
        filename="Terminal — WebUI Installation"
        badge="Bash"
        code={`git clone https://github.com/nesquena/hermes-webui.git
cd hermes-webui
python3 bootstrap.py`}
      />
      <p className="text-sm font-semibold text-ink">Configuration sécurité dans <code>.env</code> :</p>
      <CodeWindow
        filename="hermes-webui/.env"
        badge="Config"
        code={`HERMES_WEBUI_HOST=127.0.0.1
HERMES_WEBUI_PASSWORD=<mot-de-passe-fort-généré>
HERMES_WEBUI_SECURE=1
HERMES_WEBUI_ALLOWED_ORIGINS=https://hermes.mondomaine.com`}
      />

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Trois bugs rencontrés et corrigés en cours de route :
      </h3>
      <ol className="list-decimal list-inside space-y-3">
        <li>
          <strong>Conflit d&apos;interpréteur Python</strong> : le service utilisait le Python système (<code>/usr/bin/python3</code>), dépourvu des dépendances de l&apos;agent (<code>httpx</code>, <code>dotenv</code>...). Solution : pointer <code>ExecStart</code> directement vers le venv de l&apos;agent plutôt que de dupliquer les dépendances dans un second venv.
        </li>
        <li>
          <strong>Process zombie bloquant le port</strong> : un ancien process resté actif après un restart raté empêchait le nouveau service de démarrer (<code>FATAL: Another server is already responding on 127.0.0.1:8787</code>). Résolu en identifiant le PID via <code>ss -tlnp</code> et en le tuant explicitement.
        </li>
        <li>
          <strong>YAML mal formé</strong> : une édition manuelle du fichier de config a laissé une ligne de titre commentée (<code># security:</code>) avec des clés enfants décommentées en dessous — orphelines aux yeux du parseur YAML. Toujours valider avec <code>python3 -c &quot;import yaml; yaml.safe_load(...)&quot;</code> avant de relancer un service en production.
        </li>
      </ol>

      <p className="text-sm font-semibold text-ink mt-6">Reverse proxy Nginx + certificat Let&apos;s Encrypt pour l&apos;exposition finale :</p>
      <CodeWindow
        filename="/etc/nginx/sites-available/hermes"
        badge="Nginx"
        code={`server {
    listen 80;
    server_name hermes.mondomaine.com;

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
        code={`sudo certbot --nginx -d hermes.mondomaine.com`}
      />

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        5. Sauvegardes automatisées, chiffrées, redondantes
      </h2>
      <p>
        Un agent avec mémoire persistante et des skills auto-générées accumule de la valeur avec le temps — le perdre suite à un incident serveur serait dommage. Stratégie retenue : sauvegarde locale quotidienne + réplication vers Google Drive, avec rotation sur 14 jours des deux côtés.
      </p>
      <CodeWindow
        filename="/home/hermes/scripts/backup-hermes.sh"
        badge="Bash Script"
        code={`#!/bin/bash
set -euo pipefail
cd /home/hermes

export RCLONE_CONFIG_PASS="********"   # config rclone chiffrée par mot de passe

BACKUP_DIR="/home/hermes/backups"
DATE=$(date +%Y%m%d-%H%M%S)
KEEP_DAYS=14
GDRIVE_REMOTE="gdrive:hermes-backups"

hermes backup -o "$BACKUP_DIR/hermes-backup-$DATE.zip" -l "daily-cron"
rclone copy "$BACKUP_DIR/hermes-backup-$DATE.zip" "$GDRIVE_REMOTE" --quiet

find "$BACKUP_DIR" -name "hermes-backup-*.zip" -mtime +$KEEP_DAYS -delete
rclone delete "$GDRIVE_REMOTE" --min-age \${KEEP_DAYS}d --quiet`}
      />
      <p>Planifié via cron sous l&apos;utilisateur applicatif, jamais root :</p>
      <CodeWindow
        filename="crontab -e (utilisateur hermes)"
        badge="Cron"
        code={`0 3 * * * /home/hermes/scripts/backup-hermes.sh >> /home/hermes/backups/backup.log 2>&1`}
      />

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Points de sécurité appliqués sur cette brique :
      </h3>
      <ul className="list-disc list-inside space-y-2">
        <li>Configuration rclone <strong>chiffrée par mot de passe</strong> (elle contient un refresh token OAuth Google avec accès au Drive)</li>
        <li>Mot de passe fourni au script via variable d&apos;environnement (jamais en argument de commande visible dans <code>ps aux</code> ou l&apos;historique shell)</li>
        <li>Client OAuth Google <strong>personnel</strong> plutôt que le client_id partagé de rclone (en fin de vie courant 2026)</li>
        <li>Permissions restrictives (<code>chmod 700</code>) sur les répertoires de scripts et de backups</li>
      </ul>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Ce que ce projet démontre
      </h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Durcissement système</strong> : migration de privilèges, permissions, isolation d&apos;un processus à risque</li>
        <li><strong>Architecture réseau</strong> : reverse proxy, TLS, séparation loopback/public</li>
        <li><strong>Gestion des secrets</strong> : chiffrement au repos, injection sécurisée en environnement d&apos;exécution, redaction automatique</li>
        <li><strong>Automatisation fiable</strong> : <code>systemd</code>, cron, scripts idempotents avec gestion d&apos;erreur (<code>set -euo pipefail</code>)</li>
        <li><strong>Débogage méthodique</strong> : lecture de logs <code>journalctl</code>, isolation de cause racine plutôt que correctifs à l&apos;aveugle</li>
      </ul>

      <p className="mt-4">
        Le code n&apos;est que la moitié du travail sur ce genre de projet — l&apos;autre moitié, souvent négligée, c&apos;est la question &quot;qui peut faire quoi, et qu&apos;est-ce qui se passe si ça tourne mal&quot;. C&apos;est cette moitié-là qui distingue un <code>curl | bash</code> de cinq minutes d&apos;un déploiement qu&apos;on peut raisonnablement laisser tourner sans surveillance.
      </p>
    </article>
  );
}
