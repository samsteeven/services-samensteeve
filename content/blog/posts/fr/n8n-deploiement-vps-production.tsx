import React from "react";

export default function N8nDeploiementVpsProduction() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        L&apos;outil d&apos;automatisation autopilote peut lui-même mal tourner : une mauvaise isolation sur un VPS partagé, et c&apos;est votre base de production qui paie les frais. Voici comment j&apos;ai déployé n8n en production pour le projet <a href="/fr/realisations/tribunejustice" className="text-accent underline underline-offset-2">TribuneJustice</a> — une plateforme legaltech que je pilote en tant que Tech Lead — sans rien casser de l&apos;infrastructure existante.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Le contexte : rentabiliser un VPS déjà en place
      </h2>
      <p>
        Sur TribuneJustice, j&apos;avais besoin d&apos;un orchestrateur de tâches récurrentes : notifications, synchronisations entre services, jobs planifiés. Plutôt que de payer un abonnement cloud facturé à l&apos;exécution, j&apos;ai choisi d&apos;auto-héberger <a href="https://n8n.io" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">n8n</a> sur un VPS déjà utilisé pour le projet — histoire de rentabiliser des ressources disponibles plutôt que de multiplier les infrastructures.
      </p>
      <p>
        Le VPS tournait déjà sous Ubuntu, avec Docker, nginx, Redis et une base MySQL locale. L&apos;objectif : ajouter n8n proprement, via un sous-domaine dédié, sans affecter la disponibilité du reste.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        L&apos;architecture retenue : isolation complète
      </h2>
      <p>
        La tentation était de faire cohabiter n8n avec la base MySQL de production. J&apos;ai refusé — un crash ou une saturation de disque côté n8n aurait eu un impact direct sur le site principal. L&apos;architecture retenue repose sur une isolation stricte :
      </p>
      <div className="border border-line rounded-xl bg-paper/60 p-4 font-mono text-xs text-ink/80 space-y-1">
        <div>— Un conteneur <code>PostgreSQL 16</code> dédié (n8n recommande officiellement Postgres, pas MySQL, en production)</div>
        <div>— Un réseau Docker isolé reliant uniquement n8n et sa base</div>
        <div>— n8n exposé uniquement sur <code>127.0.0.1:5678</code>, jamais directement sur internet</div>
        <div>— Le nginx existant configuré avec un <code>server_block</code> dédié pour <code>n8n.samensteeve.com</code></div>
        <div>— Des limites CPU/mémoire sur les conteneurs pour ne pas empiéter sur le projet principal</div>
      </div>
      <p>
        Cette isolation garantit qu&apos;un problème sur n8n (crash, faille, usage disque excessif) n&apos;affecte jamais la disponibilité du site principal ni l&apos;intégrité de sa base de données.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Le déploiement, étape par étape
      </h2>
      <p>
        Voici le processus complet, du serveur vierge (côté n8n) jusqu&apos;au premier workflow. Les commandes sont volontairement détaillées : c&apos;est ce niveau de granularité qui manque le plus souvent dans les tutoriels génériques.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        1. Préparer l&apos;arborescence dédiée
      </h3>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`sudo mkdir -p /opt/n8n
cd /opt/n8n
sudo mkdir -p n8n_data postgres_data`}
      </pre>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        2. Générer la clé de chiffrement
      </h3>
      <p>
        Cette clé chiffre tous les credentials stockés par n8n (mots de passe d&apos;API, tokens OAuth). Sans elle, impossible de restaurer un backup sur une nouvelle instance.
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`openssl rand -hex 32`}
      </pre>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        3. Définir les variables d&apos;environnement
      </h3>
      <p>
        Un fichier <code>.env</code> centralise la configuration. Point de vigilance important que j&apos;aborderai dans la section debugging : <code>POSTGRES_USER</code> et <code>DB_POSTGRESDB_USER</code> doivent être <strong>strictement identiques</strong>.
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`N8N_HOST=n8n.samensteeve.com
N8N_PROTOCOL=https
N8N_WEBHOOK_URL=https://n8n.samensteeve.com/
N8N_ENCRYPTION_KEY=<clé générée à l'étape précédente>
GENERIC_TIMEZONE=Africa/Douala
TZ=Africa/Douala

DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=postgres
DB_POSTGRESDB_DATABASE=n8n
DB_POSTGRESDB_USER=n8n_user
DB_POSTGRESDB_PASSWORD=<mot de passe fort>

POSTGRES_USER=n8n_user
POSTGRES_PASSWORD=<le même mot de passe fort>
POSTGRES_DB=n8n`}
      </pre>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        4. Écrire le <code>docker-compose.yml</code>
      </h3>
      <p>
        Deux services : Postgres (dédié, isolé) et n8n, reliés par un réseau Docker privé. La condition <code>service_healthy</code> sur Postgres garantit que n8n ne démarre qu&apos;une fois la base réellement prête — pas juste le conteneur lancé.
      </p>
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
        5. Lancer la stack
      </h3>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`sudo docker compose up -d
sudo docker compose logs -f n8n`}
      </pre>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        6. Configurer nginx en reverse proxy
      </h3>
      <p>
        Sur le nginx déjà en place, ajout d&apos;un <code>server_block</code> dédié au sous-domaine. Les en-têtes <code>Upgrade</code> et <code>Connection</code> sont essentiels pour que les WebSockets de l&apos;interface n8n fonctionnent correctement.
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`server {
    listen 80;
    server_name n8n.samensteeve.com;

    location / {
        proxy_pass http://127.0.0.1:5678;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`}
      </pre>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`sudo ln -s /etc/nginx/sites-available/n8n.samensteeve.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx`}
      </pre>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        7. Activer le HTTPS avec Let&apos;s Encrypt
      </h3>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d n8n.samensteeve.com`}
      </pre>
      <p>
        Certbot édite automatiquement la config nginx pour rediriger tout le trafic HTTP vers HTTPS et gère le renouvellement automatique du certificat.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        8. Premier accès et création du compte owner
      </h3>
      <p>
        À la première visite de <code>https://n8n.samensteeve.com</code>, n8n affiche l&apos;écran de setup owner : email + mot de passe. Cet écran ne s&apos;affiche <strong>qu&apos;une seule fois</strong> — une fois le compte créé, n8n désactive définitivement l&apos;auto-inscription. Toute invitation future doit passer par <em>Settings → Users</em>.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Ce que le déploiement "propre" ne dit pas : le debugging réel
      </h2>
      <p>
        La théorie d&apos;un déploiement Docker + nginx + SSL est bien documentée. La pratique, sur un serveur qui vit déjà, l&apos;est moins. Voici les trois incidents rencontrés et comment je les ai résolus — c&apos;est souvent là que se joue la vraie compétence DevOps.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        1. Erreur de permissions sur le volume monté
      </h3>
      <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 font-mono text-xs text-rose-600 dark:text-rose-400">
        Error: EACCES: permission denied, open &apos;/home/node/.n8n/config&apos;
      </div>
      <p>
        Le processus n8n dans le conteneur tourne sous l&apos;UID <code>1000</code> (utilisateur <code>node</code>), mais le dossier créé côté hôte appartenait à <code>root</code>. Diagnostic simple une fois qu&apos;on sait où chercher : <code>chown -R 1000:1000</code> sur le volume a résolu le blocage.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        2. Incohérence entre les identifiants Postgres
      </h3>
      <p>
        Une erreur d&apos;inattention classique : les variables <code>POSTGRES_USER</code> (utilisées à l&apos;initialisation du conteneur Postgres) et <code>DB_POSTGRESDB_USER</code> (utilisées par n8n pour s&apos;y connecter) n&apos;étaient pas alignées. Comme Postgres n&apos;initialise sa base qu&apos;au tout premier démarrage, un simple changement de <code>.env</code> après coup ne suffisait pas — il a fallu supprimer le volume de données pour repartir sur des identifiants cohérents.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        3. Le sous-domaine flaggé "site dangereux" par Google
      </h3>
      <p>
        Le plus instructif des trois. Une fois le service opérationnel, Chrome s&apos;est mis à bloquer l&apos;accès au sous-domaine avec un avertissement hameçonnage — alors que le contenu était parfaitement légitime. En creusant (Google Search Console, forums communautaires n8n), j&apos;ai découvert un pattern documenté : une page de connexion nue, sur un sous-domaine tout neuf, derrière un CDN, correspond statistiquement au profil d&apos;une page de phishing pour les classifieurs heuristiques de Google Safe Browsing. Plusieurs utilisateurs n8n rapportent exactement le même faux positif.
      </p>
      <p>
        La résolution a nécessité une démarche administrative plutôt que technique : validation de la propriété du domaine via Search Console, puis demande de révision manuelle. Un rappel utile que la sécurité <em>perçue</em> par des outils automatisés n&apos;est pas toujours corrélée à la sécurité réelle d&apos;un système — et qu&apos;il faut savoir distinguer les deux rapidement pour ne pas perdre de temps à chercher un problème qui n&apos;existe pas là où on le cherche.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        La sécurisation finale
      </h2>
      <div className="border border-line rounded-xl bg-paper/60 p-4 font-mono text-xs text-ink/80 space-y-1">
        <div>— <strong>2FA</strong> activée sur le compte administrateur</div>
        <div>— <strong>Backups automatisés</strong> (fichiers de configuration + dump PostgreSQL quotidien) via script cron, rotation sur 7 jours</div>
        <div>— Compte owner <strong>verrouillé après création</strong> — tout nouvel utilisateur doit être invité explicitement depuis l&apos;interface</div>
      </div>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Ce que je retiens
      </h2>
      <p>
        Ce type de déploiement — modeste en apparence — mobilise tout un spectre de compétences : architecture système (isolation, réseaux Docker), sécurité (permissions, chiffrement, authentification), réseau (DNS, reverse proxy, certificats SSL), et une méthode rigoureuse pour diagnostiquer des pannes qui ne sont documentées nulle part de façon évidente.
      </p>
      <p>
        C&apos;est exactement le type de problème que je rencontre au quotidien sur TribuneJustice et sur d&apos;autres projets. Si vous avez un besoin similaire — orchestrer des automatisations sur votre infrastructure sans multiplier les abonnements cloud — c&apos;est le type de mission sur lequel j&apos;interviens directement.
      </p>
    </article>
  );
}
