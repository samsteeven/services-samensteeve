import React from "react";

export default function LanggraphDestructionStaging() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        Il y a quelques semaines, un agent autonome basé sur LangGraph, conçu pour nettoyer périodiquement les comptes de test obsolètes en staging, s'est emballé. En moins de 10 minutes, il a purgé l'équivalent de 48 heures d'activité de test de notre équipe de QA. Voici le post-mortem technique de cette défaillance et comment nous avons repensé la sécurité des graphes.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        L'origine du bug : une faille de boucle infinie sur l'état du graphe
      </h2>
      <p>
        Dans LangGraph, l'état (<code>State</code>) est partagé entre les différents nœuds. Notre agent avait un nœud de décision (router) et un outil d'effacement. Le flux nominal était :
      </p>
      <div className="border border-line rounded-xl bg-paper/60 p-4 font-mono text-xs text-ink/80 space-y-1">
        <div>1. Nœud A : Lister les IDs des comptes de test inactifs (stockés dans <code>state.target_ids</code>).</div>
        <div>2. Nœud B : Si la liste n'est pas vide, appeler l'outil de suppression pour le premier ID, puis passer au nœud de décision.</div>
        <div>3. Nœud C (Router) : Si d'autres IDs restent, boucler sur le Nœud B. Sinon, s'arrêter.</div>
      </div>
      <p className="mt-4">
        <strong>Ce qui a cassé :</strong> À cause d'une régression mineure sur l'outil de suppression, celle-ci renvoyait un statut de succès même si la ressource n'existait plus (ID introuvable). De plus, le nœud de suppression ne supprimait pas l'ID traité de la liste <code>state.target_ids</code> en cas d'erreur réseau transitoire.
      </p>
      <p>
        L'agent s'est retrouvé bloqué dans une boucle infinie de décision :
      </p>
      <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 font-mono text-xs text-rose-600 dark:text-rose-400">
        [LangGraph Exec] Node: delete_tool {"->"} Returns: SUCCESS (Resource not found / Network timeout)
        <br />[LangGraph Exec] Router {"->"} Check: target_ids still has 12 items {"->"} Loop back to delete_tool
        <br />[LangGraph Exec] LLM Context depletion {"->"} The agent started hallucinating IDs and deleted real staging accounts matching wildcard queries.
      </div>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        La parade technique : Redesigner avec des gardes-fous stricts
      </h2>
      <p>
        Nous avons reconstruit le graphe d'exécution en y injectant trois principes de défense en profondeur :
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        1. Immutabilité de l'état et réducteurs (Reducers) stricts
      </h3>
      <p>
        Nous avons redéfini le schéma d'état de LangGraph en forçant l'usage de réducteurs stricts pour éviter les persistances d'ID obsolètes.
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`import { Annotated } from "@langchain/langgraph";

// Reducer qui remplace proprement la liste ou filtre les IDs traités
function updateTargetIds(current: string[], next: string[]): string[] {
  // Garantir l'élimination des doublons et des IDs déjà traités
  return Array.from(new Set(next));
}

interface AgentState {
  targetIds: Annotated<string[], typeof updateTargetIds>;
  processedCount: number;
  maxIterations: number;
}`}
      </pre>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        2. Le garde-fou des itérations maximums (Max Iterations Guard)
      </h3>
      <p>
        Aucune boucle d'agent ne doit tourner indéfiniment. Nous avons ajouté un nœud de contrôle global qui lève une exception et arrête le graphe dès qu'une limite d'itérations est franchie.
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`function routeDecision(state: typeof AgentState.State) {
  if (state.processedCount > 50) {
    throw new Error("Loop Guard Triggered: Max iterations exceeded in staging cleaning.");
  }
  if (state.targetIds.length > 0) {
    return "delete_node";
  }
  return "__end__";
}`}
      </pre>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        3. Double validation humaine (Human-in-the-loop) pour les suppressions de masse
      </h3>
      <p>
        Pour toute action destructive touchant plus de 5 enregistrements, le graphe utilise la fonctionnalité d'interruption (<code>interrupt</code>) de LangGraph pour demander une validation manuelle via Slack/Webhook avant de poursuivre.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Ce que cela change pour vos projets
      </h2>
      <p>
        Les frameworks d'agents comme LangGraph ou CrewAI sont puissants, mais ils masquent la complexité de l'exécution non déterministe. Ne laissez jamais un agent autonome interagir avec des APIs destructives sans un système d'isolation strict (sandboxing), un nombre maximum d'itérations codé en dur, et une interruption humaine pour valider les suppressions.
      </p>
    </article>
  );
}
