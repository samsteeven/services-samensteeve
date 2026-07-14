import React from "react";

export default function SsrfWebhookGatewayInterne() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        Donner aux utilisateurs la possibilité de configurer des webhooks (URL de callback appelées lors d'événements) est une fonctionnalité standard pour toute plateforme SaaS. Cependant, si votre code se contente d'exécuter un <code>POST</code> sur l'URL fournie sans validation approfondie, vous venez d'ouvrir une brèche majeure : une faille SSRF (Server-Side Request Forgery). En voici l'analyse technique.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        La vulnérabilité : comment l'attaquant exploite le serveur
      </h2>
      <p>
        Puisque l'appel HTTP part de votre propre serveur (qui réside à l'intérieur de votre infrastructure cloud ou de votre réseau privé), l'attaquant peut configurer un webhook pointant vers des adresses IP locales non exposées à internet.
      </p>
      <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 font-mono text-xs text-rose-600 dark:text-rose-400">
        • URL configurée par l'attaquant : http://127.0.0.1:8500/v1/agent/self (Consul UI)
        <br />• URL d'accès aux métadonnées AWS : http://169.254.169.254/latest/meta-data/ (Expose les clés d'accès IAM du serveur !)
        <br />• URL d'un serveur Redis interne : http://192.168.1.50:6379/
      </div>
      <p className="mt-4">
        Le serveur web exécute la requête, traverse les pare-feux externes (car le trafic est sortant/outbound), interroge le service interne, et renvoie parfois la réponse (ou le statut) à l'attaquant, dévoilant l'architecture interne.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        La mauvaise parade : les listes noires de chaînes de caractères
      </h2>
      <p>
        Tenter de bloquer les chaînes comme <code>"localhost"</code> ou <code>"127.0.0.1"</code> est inefficace. Un attaquant peut contourner cela en utilisant des représentations alternatives (ex: décimale <code>http://2130706433</code>), en configurant un sous-domaine DNS personnel qui pointe vers <code>127.0.0.1</code> (ex: <code>spoof.attaquant.com</code>), ou en exploitant une redirection HTTP 302 émise par son propre serveur.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        La solution robuste : Résolution DNS et filtrage d'IP (RFC 1918)
      </h2>
      <p>
        La seule méthode fiable consiste à résoudre le nom de domaine en adresse IP applicativement avant d'effectuer la requête HTTP, puis à valider que cette IP n'appartient pas aux plages d'adresses privées (RFC 1918) ou réservées.
      </p>
      <p>
        Voici l'algorithme de validation en Node.js / TypeScript :
      </p>

      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`import dns from "dns/promises";
import ipaddr from "ipaddr.js";

async function isSafeUrl(inputUrl: string): Promise<boolean> {
  try {
    const parsed = new URL(inputUrl);
    // 1. Forcer la résolution DNS pour obtenir les IPs sous-jacentes
    const addresses = await dns.resolve(parsed.hostname);
    
    for (const addr of addresses) {
      const ip = ipaddr.parse(addr);
      
      // 2. Vérifier si l'IP appartient à une plage privée ou réservée
      const range = ip.range();
      if (
        range === "private" ||     // Plages 10.x.x.x, 172.16.x.x, 192.168.x.x
        range === "loopback" ||    // 127.0.0.1
        range === "linklocal" ||   // 169.254.x.x (AWS Metadata)
        range === "unspecified"
      ) {
        // IP non sécurisée, rejet immédiat
        return false;
      }
    }
    return true; // L'IP résolue est publique et sécurisée
  } catch (err) {
    return false; // Rejet en cas d'erreur de résolution
  }
}`}
      </pre>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Règles d'or additionnelles pour les webhooks
      </h2>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Désactiver le suivi des redirections :</strong> Forcez le client HTTP (ex: Axios, Axios instance) à ne pas suivre automatiquement les redirections HTTP (<code>maxRedirects: 0</code>) pour éviter les attaques par rebond de redirection 302.</li>
        <li><strong>Réseau isolé (DMZ) :</strong> Exécutez le worker chargé d'envoyer les webhooks dans un sous-réseau (VPC) isolé, sans aucun accès aux autres serveurs de base de données ou de cache de l'entreprise.</li>
        <li><strong>Timeout strict :</strong> Fixez des limites temporelles courtes (ex: 2 secondes de connexion max) pour éviter le blocage des threads de votre serveur par des connexions dormantes (Slowloris).</li>
      </ul>
    </article>
  );
}
