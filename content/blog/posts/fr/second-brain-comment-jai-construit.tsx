import React from "react";
import { CodeWindow } from "@/components/code-window";

export default function SecondBrainCommentJaiConstruit() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        Je vais être honnête : ce projet n&apos;est pas né d&apos;une envie de « faire de l&apos;IA ». Il est né d&apos;une <strong>frustration</strong>. Chaque fois que j&apos;ouvrais ChatGPT, Claude, Cursor ou opencode, je recommençais à zéro. Je réexpliquais qui je suis, mes projets, ma stack, mes études, ce que je cherchais. À chaque conversation. Le contexte était éparpillé dans dix fichiers, jamais à jour, et aucune IA n&apos;a une mémoire durable que <em>je</em> contrôle.
      </p>
      <p>
        Cet article raconte comment j&apos;ai construit un « second cerveau » pour régler ça — <strong>pas à pas</strong>, avec les vraies galères et les vraies solutions. Parce que c&apos;est là que ça devient intéressant : pas dans le résultat final, mais dans le chemin pour y arriver.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Le point de départ : réexpliquer ma vie à une machine
      </h2>
      <p>
        Le déclic est venu d&apos;une question simple : <em>pourquoi est-ce que je perds mon temps à réexpliquer mon contexte à des outils qui, eux, ne l&apos;oublient jamais ?</em>
      </p>
      <p>Je voulais une mémoire qui soit :</p>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>à moi</strong> (pas enfermée dans un outil qui peut fermer demain) ;</li>
        <li><strong>portable</strong> (lisible par n&apos;importe quelle IA, pas seulement celle qui l&apos;a créée) ;</li>
        <li><strong>lisible et enrichissable</strong> (que l&apos;IA puisse s&apos;en servir, mais aussi y ajouter, sous mon contrôle) ;</li>
        <li><strong>privée</strong> (mes notes ne partent pas s&apos;indexer chez un tiers).</li>
      </ul>
      <p>À partir de là, l&apos;architecture s&apos;est imposée presque d&apos;elle-même.</p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        La construction, étape par étape
      </h2>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 1 — Le vault Obsidian comme source de vérité
      </h3>
      <p>
        Premier choix : <strong>Obsidian</strong>. Des fichiers Markdown, un sujet par note, un <em>frontmatter</em> YAML (<code>type</code>, <code>status</code>, <code>importance</code>, <code>tags</code>). Pourquoi Markdown ? Parce que c&apos;est du texte brut : lisible par un humain, diffable, versionnable, et ça ne dépend d&apos;aucun logiciel. Le vault vit sur mon disque <strong>et</strong> sur un repo GitHub <strong>privé</strong> — donc historique complet et synchronisation automatique.
      </p>
      <p>
        C&apos;est le socle : <strong>le vault est la seule source de vérité.</strong> Tout le reste n&apos;est qu&apos;une projection de ce vault.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 2 — Le pipeline d&apos;ingestion
      </h3>
      <p>
        Pour qu&apos;une IA puisse « lire » ces notes, il faut les transformer en quelque chose d&apos;interrogeable par le sens. C&apos;est le rôle d&apos;un <strong>RAG</strong> (Retrieval-Augmented Generation) : découper les notes en morceaux (<em>chunks</em>), calculer pour chacun un <strong>vecteur</strong> (un nombre qui résume son sens), et les stocker dans une base vectorielle.
      </p>
      <p>Mon pipeline, orchestré avec <strong>n8n</strong> (que j&apos;utilise déjà partout) :</p>
      <CodeWindow
        filename="Pipeline d'ingestion"
        badge="n8n"
        code={`GitHub (vault privé) → décodage → chunking → embeddings → Qdrant`}
      />
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Qdrant</strong> comme base vectorielle : auto-hébergée sur mon VPS, open source.</li>
        <li><strong>Ollama + bge-m3</strong> pour les embeddings : le modèle tourne <strong>en local</strong>, multilingue, aucune note envoyée à un tiers.</li>
      </ul>
      <p>
        Point important : l&apos;ingestion tourne <strong>toutes les 30 minutes</strong>. J&apos;écris dans Obsidian, je pousse, et trente minutes plus tard c&apos;est interrogeable. Pas de bouton à cliquer.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 3 — Le RAG : poser une question
      </h3>
      <p>
        Une question → elle est transformée en vecteur → Qdrant retrouve les morceaux les plus proches → un LLM répond <strong>uniquement à partir de ces morceaux</strong>, en citant les fichiers sources.
      </p>
      <p>
        Le choix du LLM a été… mouvementé (j&apos;y reviens dans les problèmes). Aujourd&apos;hui, la génération passe par la passerelle <strong>OpenCode Go</strong> (modèle <code>deepseek-v4-flash-vision-exp</code>).
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 4 — Le serveur MCP : brancher n&apos;importe quelle IA
      </h3>
      <p>
        C&apos;est la pièce maîtresse, et ce qui distingue ce projet d&apos;un simple chatbot. Le protocole <strong>MCP</strong> (Model Context Protocol) permet à n&apos;importe quelle IA compatible — ChatGPT, Claude, Cursor, opencode — de se connecter à mes outils.
      </p>
      <p>
        J&apos;ai construit un <strong>serveur MCP dédié</strong> qui n&apos;expose que mes outils, jamais l&apos;administration de n8n. Une URL, et mon cerveau est branché à toutes mes IA :
      </p>
      <CodeWindow
        filename="Endpoint MCP"
        badge="MCP"
        code={`https://n8n.samensteeve.com/mcp/second-brain-kb`}
      />
      <p>
        Concrètement, dans une conversation Claude, je peux écrire « interroge mon second cerveau : quels sont mes projets Laravel ? » et il va chercher dans <em>mes</em> notes, avec les sources.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 5 — L&apos;écriture contrôlée : la quarantaine
      </h3>
      <p>
        Donner à une IA la capacité d&apos;<strong>écrire</strong> dans ma base, c&apos;est puissant… et dangereux. Une note lue par une IA (ou un contenu piégé) pourrait l&apos;inciter à écrire n&apos;importe quoi. Ma règle : <strong>toute écriture IA passe par une quarantaine.</strong>
      </p>
      <p>
        Une note proposée par une IA arrive avec <code>status: pending</code>. Elle est <strong>invisible</strong> pour la recherche tant que je ne l&apos;ai pas validée à la main. Le pire qu&apos;une IA compromise puisse faire, c&apos;est écrire une note que je vois, que je peux corriger ou supprimer — et tout est versionné par Git, donc réversible.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 6 — La qualité : classement, doublons, ménage
      </h3>
      <p>Une base qui grossit devient vite un bordel. Trois garde-fous :</p>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Classification automatique</strong> : une IA qui propose une note lui donne un type, des tags et un dossier cible.</li>
        <li><strong>Dédoublonnage</strong> : avant d&apos;écrire, on compare la note à l&apos;existant. Trop similaire (≥ 75 %) → refus. Un peu similaire (≥ 55 %) → avertissement.</li>
        <li><strong>Housekeeping hebdomadaire</strong> : un workflow détecte les paires de notes redondantes et m&apos;écrit un rapport à relire.</li>
      </ul>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 7 — Plonger dans la source
      </h3>
      <p>
        Une base de connaissances, c&apos;est bien. Mais parfois, l&apos;IA a besoin du <strong>détail exact</strong> — un fichier précis d&apos;un projet. Plutôt que de tout recopier dans le vault, j&apos;ai ajouté un troisième outil : <code>second_brain_project_details</code>. L&apos;IA demande <code>repo</code> ou <code>repo#chemin</code>, et elle va lire la source directement sur GitHub. Le vault reste léger, la source reste la vérité.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 8 — L&apos;authentification
      </h3>
      <p>
        Dernière brique pour que ça marche partout : l&apos;auth. Un token statique, c&apos;est simple mais limité (Claude.ai web, par exemple, ne peut pas envoyer d&apos;en-tête personnalisé). J&apos;ai donc basculé le serveur MCP en <strong>OAuth</strong> (le n8n expose nativement les points de découverte standards). Résultat : n&apos;importe quel client MCP sérieux peut se connecter en s&apos;authentifiant normalement, sans que j&apos;aie à lui expliquer quoi que ce soit à la main.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 9 — Rendre ça rapide et robuste
      </h3>
      <p>
        C&apos;est la partie dont je suis le plus fier, parce qu&apos;elle est invisible… et qu&apos;elle a demandé le plus de réflexion (voir les problèmes ci-dessous). Aujourd&apos;hui, quand rien n&apos;a changé, l&apos;ingestion tourne en <strong>~2 secondes</strong> au lieu de 3 à 6 minutes, et elle ne peut <strong>jamais</strong> dupliquer ni perdre une note, même si deux exécutions tournent en même temps.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Les problèmes rencontrés (et comment je les ai réglés)
      </h2>
      <p>C&apos;est la partie que j&apos;aurais aimé lire quand j&apos;ai commencé. Rien ne s&apos;est passé comme prévu.</p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        1. Le fournisseur LLM qui tombe à l&apos;eau
      </h3>
      <p>
        <strong>Le problème</strong> : mon premier choix de génération ne marchait pas — pas de clé valide d&apos;un côté, pas de fonds de l&apos;autre. Blocage total au moment de la génération.
      </p>
      <p>
        <strong>La solution</strong> : réutiliser une passerelle que j&apos;avais déjà (OpenCode Go). Mais elle exige un en-tête personnalisé (<code>x-opencode-session</code>)… que les nœuds de modèle d&apos;n8n n&apos;exposent pas.
      </p>
      <p>
        <strong>→ Leçon</strong> : quand un nœud ne permet pas ce dont tu as besoin, descends d&apos;un niveau. J&apos;ai remplacé le nœud par un simple <strong>appel HTTP direct</strong> — contrôle total du payload et des en-têtes.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        2. La boucle qui s&apos;arrête toute seule
      </h3>
      <p>
        <strong>Le problème</strong> : mon ingestion utilisait <code>splitInBatches</code> (une boucle par note). Elle s&apos;arrêtait prématurément dès qu&apos;un item était vide.
      </p>
      <p>
        <strong>La solution</strong> : abandonner la boucle pour un <strong>pipeline linéaire</strong>. Un seul flux, sans état intermédiaire fragile.
      </p>
      <p>
        <strong>→ Leçon</strong> : une boucle, c&apos;est un état de plus à gérer. Quand un flux linéaire suffit, il est plus simple <em>et</em> plus fiable.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        3. Les embeddings qui prennent une éternité
      </h3>
      <p>
        <strong>Le problème</strong> : pas de GPU sur mon VPS. Calculer les vecteurs de ~190 morceaux <strong>sur CPU</strong>, c&apos;était ~1 seconde par morceau → <strong>3 à 6 minutes à chaque exécution</strong>. Et ça recalculait <em>tout</em> à chaque fois, même si une seule note avait changé.
      </p>
      <p>
        <strong>La solution</strong> : rendre l&apos;ingestion <strong>différentielle</strong>. Chaque morceau reçoit un identifiant <strong>déterministe</strong> — un hash de son contenu. Avant de calculer, on demande à Qdrant quels identifiants existent déjà, et on <strong>n&apos;embarque que les nouveaux ou modifiés</strong>.
      </p>
      <p>
        <strong>→ Résultat</strong> : de 3-6 minutes à <strong>~2 secondes</strong> en régime stable. Seules les notes que je viens de modifier coûtent quelque chose.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        4. Les doublons fantômes
      </h3>
      <p>
        <strong>Le problème</strong> : deux exécutions concurrentes de l&apos;ingestion (une planifiée + une manuelle) → la base contenait <strong>deux fois</strong> les mêmes notes.
      </p>
      <p>
        <strong>La solution</strong> : avec des identifiants déterministes, un <em>upsert</em> écrase au lieu d&apos;ajouter. Deux exécutions simultanées produisent exactement le même index.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        5. … et la perte de données qui m&apos;a vraiment vexé
      </h3>
      <p>
        <strong>Le problème</strong> : en corrigeant les doublons, j&apos;ai introduit pire. Mon nettoyage supprimait les points « absents du lot courant ». Mais si une exécution avait une vue <strong>périmée</strong> du vault, elle supprimait les notes qu&apos;une autre venait d&apos;écrire. J&apos;ai perdu 4 notes en testant. C&apos;est le genre de bug qui te fait douter de tout.
      </p>
      <p>
        <strong>La solution</strong> : horodater chaque point (<code>indexed_at</code>) et <strong>ne supprimer un orphelin que s&apos;il est antérieur au début de l&apos;exécution</strong>. Un run concurrent, même avec une vue périmée, ne peut plus toucher aux notes écrites après son démarrage.
      </p>
      <p>
        <strong>→ Leçon</strong> : « supprimer ce qui n&apos;est plus là » est une opération <strong>destructive</strong>. Sur un système concurrent, elle a besoin d&apos;une garde temporelle. J&apos;ai écrit ce piège noir sur blanc dans la doc du projet pour ne jamais y retomber.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        6. La fuite silencieuse d&apos;une note IA
      </h3>
      <p>
        <strong>Le problème</strong> : en fouillant, j&apos;ai découvert qu&apos;une note écrite par une IA était en <code>status: active</code> — donc <strong>indexée</strong> — alors qu&apos;elle aurait dû être en quarantaine. Elle venait d&apos;une ancienne version du workflow.
      </p>
      <p>
        <strong>La solution</strong> : en plus de la quarantaine, j&apos;ai <strong>exclu tout un dossier</strong> (les captures/rapports) de l&apos;indexation. Une écriture IA ne peut plus fuiter, même par accident.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        7. Le faux-ami qui m&apos;a fait douter
      </h3>
      <p>
        <strong>Le problème</strong> : un nœud s&apos;appelait « OpenRouter Model »… mais pointait en réalité vers une autre passerelle. Une credential nommée « OpenAI account » n&apos;avait rien d&apos;OpenAI. Résultat : des heures à chercher une incohérence… qui était dans les <strong>noms</strong>.
      </p>
      <p>
        <strong>La solution</strong> : renommer selon ce que les choses <strong>font réellement</strong>, pas selon une marque. Et en faire une règle écrite dans le projet.
      </p>
      <p>
        <strong>→ Leçon</strong> : les mauvais noms coûtent plus cher qu&apos;ils n&apos;en ont l&apos;air. Un nom mensonger, c&apos;est un bug en attente.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        8. « Pourquoi une IA me dit un truc et le contraire ? »
      </h3>
      <p>
        <strong>Le problème</strong> : une IA m&apos;a affirmé que ma base était mal nommée, en s&apos;appuyant sur une capture d&apos;écran… qui ne correspondait à <strong>rien</strong> dans mon dépôt (un fichier qui n&apos;a jamais existé). J&apos;ai vérifié l&apos;historique Git complet : zéro trace.
      </p>
      <p>
        <strong>La solution</strong> : la règle d&apos;or — <strong>vérifier à la source, jamais faire confiance à une capture</strong>. C&apos;est exactement la raison d&apos;être de ce projet : une IA qui invente, c&apos;est une IA qui n&apos;a pas accès à la vérité. Ici, elle n&apos;a accès qu&apos;à ce qui est vérifié.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        À quoi ça me sert, concrètement
      </h2>
      <p>
        C&apos;est la vraie question — et pendant longtemps, je ne l&apos;avais pas assez mise en avant. Voici l&apos;utilité réelle, aujourd&apos;hui.
      </p>
      <div className="grid sm:grid-cols-2 gap-3 my-6">
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Préparer un entretien ou un stage</h3>
          <p className="text-sm text-ink-soft m-0">Je demande à n&apos;importe quelle IA : « résume le projet X, mes choix techniques, ce que j&apos;y ai appris ». Elle répond depuis <em>mes</em> notes, avec les détails exacts — pas depuis une mémoire approximative.</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Candidatures, CV, portfolio</h3>
          <p className="text-sm text-ink-soft m-0">Mon contexte professionnel est prêt, à jour et interrogeable. Rédiger une candidature ou un post devient un dialogue avec ma propre base, pas une page blanche.</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Freelance : répondre vite et juste</h3>
          <p className="text-sm text-ink-soft m-0">Un client pose une question technique ? Je fais plonger l&apos;IA dans la <strong>source</strong> d&apos;un projet (README, fichier précis) pour retrouver l&apos;implémentation exacte, sans fouiller mon disque.</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Mémoire technique quotidienne</h3>
          <p className="text-sm text-ink-soft m-0">Une leçon apprise, une décision d&apos;archi, un piège rencontré : je le capture dans le vault. La « leçon du jour » devient une note interrogeable, pas un souvenir qui s&apos;efface.</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Une seule mémoire pour toutes mes IA</h3>
          <p className="text-sm text-ink-soft m-0">ChatGPT, Claude, Cursor, opencode : toutes lisent et écrivent dans la même base. Je ne réexplique plus mon contexte — je le branche.</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Alimenter mes articles et mes projets</h3>
          <p className="text-sm text-ink-soft m-0">Ce que j&apos;écris ici est nourri par le vault. Mes notes, mes retours d&apos;expérience et mes articles ne partent plus de zéro : ils partent de ce que j&apos;ai réellement vécu.</p>
        </div>
      </div>
      <p>
        Et au-delà du travail, c&apos;est une mémoire de vie : mes projets, mes objectifs, mes démarches. Une IA qui me connaît vraiment — et qui me connaît <em>avec ma permission</em>, parce que c&apos;est <strong>ma</strong> base, sur <strong>mon</strong> serveur.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Ce que ce projet m&apos;a appris
      </h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>L&apos;erreur est inévitable</strong> : concevoir <em>pour</em> l&apos;échec (retry, idempotence, dégradation gracieuse) vaut mieux que d&apos;espérer que rien ne casse.</li>
        <li><strong>La donnée d&apos;abord</strong> : une opération destructive a toujours besoin d&apos;un garde-fou (ici, un horodatage). Sinon, elle finit par mordre.</li>
        <li><strong>Nommer, c&apos;est concevoir</strong> : un composant mal nommé est un bug qui attend son heure.</li>
        <li><strong>L&apos;IA n&apos;a pas besoin de tout mémoriser</strong> : elle doit pouvoir <strong>lire</strong> quand il faut — et n&apos;écrire qu&apos;avec mon accord.</li>
        <li><strong>Vérifier à la source</strong> : c&apos;est ce qui sépare une IA utile d&apos;une IA qui invente avec aplomb.</li>
      </ul>

      <h2 className="font-display text-xl font-bold text-ink mt-8">Et après ?</h2>
      <p>Le socle est solide, mais rien n&apos;est figé. Ce qui vient :</p>
      <ul className="list-disc list-inside space-y-2">
        <li>une <strong>interface de chat</strong> (Telegram / WhatsApp) pour interroger le cerveau sans ouvrir un client MCP ;</li>
        <li>la <strong>capture automatique</strong> (veille, idées) pour que la base se nourrisse toute seule ;</li>
        <li>et toujours plus de <strong>notes de vie</strong> — parce qu&apos;au fond, ce projet n&apos;est pas un projet d&apos;IA. C&apos;est une mémoire que je construis, morceau par morceau.</li>
      </ul>
      <p className="mt-4">
        Si tu construis quelque chose de similaire : commence simple, mets des garde-fous <strong>avant</strong> d&apos;avoir mal, et documente chaque piège. Les problèmes que j&apos;ai listés ici, tu les rencontreras aussi — autant qu&apos;ils te servent.
      </p>
    </article>
  );
}
