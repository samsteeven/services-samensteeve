import React from "react";

export default function OfflineFirstConnectivite60() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        Développer une application mobile ou web pour des agents de terrain en zone rurale (collecteurs de données, techniciens réseau, livreurs) nécessite une approche radicalement différente lorsque la connectivité réseau chute régulièrement sous les 60% de disponibilité. La plupart des documentations traitent le &ldquo;offline&rdquo; comme un état temporaire. En réalité, le mode déconnecté est l'état par défaut.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        L'anti-pattern du Loader Bloquant
      </h2>
      <p>
        L'erreur classique est de concevoir l'application comme un client HTTP standard qui affiche un indicateur de chargement (spinner) à chaque action et renvoie une erreur si l'API ne répond pas dans les 10 secondes. Sur le terrain, cela rend l'application inutilisable. L'application doit lire et écrire instantanément dans une base de données locale, et déléguer la synchronisation à un processus d'arrière-plan complètement asynchrone.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        L'architecture de synchronisation en 3 piliers
      </h2>
      <p>
        Voici les composants indispensables pour faire tourner une application offline-first résiliente :
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        1. Base de données locale indexée (SQLite / WatermelonDB)
      </h3>
      <p>
        Toutes les données nécessaires pour travailler (catalogue de produits, fiches clients, formulaires vides) doivent être stockées localement. Nous utilisons des identifiants uniques universels (UUID) générés par le client pour éviter toute collision d'ID lors de l'insertion ultérieure en base centrale.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        2. La file d'attente d'actions (Outbox Queue)
      </h3>
      <p>
        Toute action utilisateur modifiant les données (créer un rapport, modifier un statut) n'appelle pas l'API. Elle est enregistrée sous forme d'action sérialisée dans une table locale <code>outbox_mutations</code>.
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`// Exemple de structure d'une mutation stockée localement
interface OutboxMutation {
  id: string; // UUID local
  actionType: 'CREATE_REPORT' | 'UPDATE_STATUS';
  payload: Record<string, any>;
  createdAt: string; // timestamp ISO
  status: 'PENDING' | 'SYNCING' | 'FAILED';
  retryCount: number;
}`}
      </pre>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        3. Le synchroniseur d'arrière-plan (Sync Worker)
      </h3>
      <p>
        Un worker écoute l'état du réseau. Dès qu'une connexion internet stable est détectée, il dépile les mutations de la table <code>outbox_mutations</code> dans l'ordre chronologique strict (FIFO) et les envoie à l'API.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        La résolution des conflits : La réalité du terrain
      </h2>
      <p>
        Que se passe-t-il si l'agent A modifie la fiche d'un client hors-ligne, tandis que l'agent B la modifie en ligne au même moment ?
      </p>
      <p>
        La solution simpliste &ldquo;Last-Write-Wins&rdquo; (le dernier qui écrit écrase tout) détruit des données. Une approche plus robuste consiste à implémenter un versionnage logique des entités (Optimistic Concurrency Control) :
      </p>

      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`// Payload envoyé à l'API pour mise à jour
{
  "client_id": "uuid-1234",
  "version": 4, // La version lue localement par l'agent
  "changes": {
    "phone": "+237654557446"
  }
}

// Si la version en BDD centrale est passée à 5 (modifiée par un autre agent entre-temps),
// l'API renvoie un code d'erreur 409 (Conflict).
// L'application doit alors télécharger la version 5 et demander à l'agent de fusionner
// ou appliquer une règle métier automatique.`}
      </pre>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Conclusion
      </h2>
      <p>
        L'offline-first n'est pas une surcouche cosmétique ; c'est une décision d'architecture système structurante. Elle demande un stockage local robuste, un système d'ID décentralisé (UUID), une file d'attente d'actions idempotentes et une gestion fine des conflits de synchronisation. C'est le prix à payer pour offrir une expérience fluide là où les réseaux vacillent.
      </p>
    </article>
  );
}
