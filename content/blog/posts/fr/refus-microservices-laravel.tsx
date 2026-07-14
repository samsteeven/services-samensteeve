import React from "react";

export default function RefusMicroservicesLaravel() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        Dans le cycle de vie d'une application à forte croissance, il arrive un moment où la direction et l'équipe technique envisagent de découper le &ldquo;gros monolithe&rdquo; en microservices pour régler les lenteurs. En tant qu'architecte, j'ai récemment bloqué cette transition pour une plateforme e-commerce d'envergure. Voici l'ADR (Architecture Decision Record) et les arguments techniques derrière ce choix.
      </p>

      <div className="border border-line rounded-xl bg-paper/60 p-6 my-6 font-mono text-xs text-ink/80 space-y-2">
        <div className="text-sm font-bold text-ink uppercase tracking-wider border-b border-line/40 pb-2 mb-2">
          📄 ADR-024 : Monolithe Modulaire vs Microservices
        </div>
        <div><strong>Status :</strong> ACCEPTÉ (Monolithe Modulaire validé)</div>
        <div><strong>Décideur :</strong> Tech Lead / Architecte</div>
        <div><strong>Date :</strong> Avril 2026</div>
        <div className="pt-2 text-ink-soft">
          <strong>Contexte :</strong> L'équipe de développement éprouve des difficultés de montée en charge sur l'API d'inventaire et réclame un découpage en 4 microservices autonomes.
        </div>
      </div>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Le mythe des microservices salvateurs
      </h2>
      <p>
        Les microservices résolvent des problèmes d'organisation humaine (quand vous avez 150 développeurs répartis en 15 Feature Teams) et non des problèmes de performance pure. Découper un système trop tôt introduit des complexités majeures :
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Transactions distribuées :</strong> Comment garantir la cohérence des données entre le service Commande et le service Facturation sans la complexité extrême du pattern Saga (compensation, requêtes asynchrones complexes) ?</li>
        <li><strong>Latence réseau :</strong> Une requête utilisateur simple se transforme en cascade d'appels HTTP internes (ou gRPC), dégradant le temps de réponse global.</li>
        <li><strong>Déploiement et Ops :</strong> Gérer 4 pipelines CI/CD, un orchestrateur Kubernetes, un service mesh, le traçage distribué, et la configuration des secrets multiplie la charge de maintenance par dix.</li>
      </ul>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        La solution : Le Monolithe Modulaire
      </h2>
      <p>
        Au lieu d'éclater l'infrastructure, nous avons restructuré le code au niveau applicatif pour découpler proprement les domaines métier. En PHP 8+, nous avons implémenté des domaines encapsulés à l'intérieur du framework Laravel.
      </p>
      <p>
        Voici un exemple de structure modulaire stricte via les espaces de noms (Namespaces) :
      </p>

      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`// Structure de répertoires stricte
app/
├── Domain/
│   ├── Order/
│   │   ├── Contracts/
│   │   ├── Models/
│   │   └── Services/
│   └── Billing/
│       ├── Contracts/
│       ├── Services/
│       └── Listeners/
└── Providers/`}
      </pre>

      <p className="mt-4">
        Pour communiquer entre domaines de façon découplée, nous utilisons le système d'événements interne de Laravel au lieu d'appels HTTP internes. C'est l'équivalent d'un bus de messages interne (In-Memory Event Bus) :
      </p>

      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`namespace App\\Domain\\Order\\Services;

use App\\Domain\\Order\\Events\\OrderPlaced;
use Illuminate\\Support\\Facades\\DB;

class CreateOrderService {
    public function execute(array $data) {
        return DB::transaction(function () use ($data) {
            $order = Order::create($data);
            
            // Notification asynchrone interne
            event(new OrderPlaced($order));
            
            return $order;
        });
    }
}`}
      </pre>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Comment nous avons résolu les problèmes de performance
      </h2>
      <p>
        Au lieu de distribuer l'application, nous avons ciblé les réels goulets d'étranglement :
      </p>
      <ul className="list-decimal pl-5 space-y-2">
        <li><strong>Optimisation SQL :</strong> Mise en place d'index composites sur les tables de recherche et réécriture des requêtes complexes avec des jointures optimisées ou des vues matérialisées.</li>
        <li><strong>Déchargement asynchrone :</strong> Utilisation de files d'attente (Queues) gérées par Redis pour toutes les tâches lourdes (envoi de factures, rapports, appels API tiers).</li>
        <li><strong>Mise en cache intelligente :</strong> Stratégie de cache à deux niveaux (Redis et cache en mémoire locale de la requête) pour les données d'inventaire peu mobiles.</li>
      </ul>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Décision finale et bilan
      </h2>
      <p>
        Le monolithe modulaire nous a permis de conserver une base de code unique, des transactions de base de données ACID fiables, et des temps de déploiement en une seule étape (Single-Step Deployment). En production, le temps de réponse moyen est tombé sous les 80ms et la vélocité de l'équipe est restée maximale, prouvant qu'une architecture propre vaut mieux qu'une infrastructure sur-dimensionnée et complexe.
      </p>
    </article>
  );
}
