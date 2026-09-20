import React from "react";
import { CodeWindow } from "@/components/code-window";

export default function SecondBrainCommentJaiConstruit() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        Je vais être honnête. Ce projet n&apos;est pas né d&apos;une envie de faire de l&apos;IA. Il est né d&apos;une frustration. Chaque fois que j&apos;ouvrais ChatGPT, Claude, Cursor ou opencode, je recommençais à zéro. Je réexpliquais qui je suis, mes projets, ma stack, mes études, ce que je cherchais. À chaque conversation. Mon contexte était éparpillé dans dix fichiers, jamais à jour, et aucune IA n&apos;a une mémoire durable que je contrôle.
      </p>
      <p>
        Cet article raconte comment j&apos;ai construit un « second cerveau » pour régler ça.         Pas à pas, avec les galères et les solutions. Le résultat final m&apos;importe moins que le chemin pour y arriver.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Le point de départ : réexpliquer ma vie à une machine
      </h2>
      <p>
        Le déclic est venu d&apos;une question simple. Pourquoi est-ce que je perds mon temps à réexpliquer mon contexte à des outils qui, eux, ne l&apos;oublient jamais ?
      </p>
      <p>Je voulais une mémoire qui soit :</p>
      <ul className="list-disc list-inside space-y-2">
        <li>à moi, pas enfermée dans un outil qui peut fermer demain ;</li>
        <li>portable, lisible par n&apos;importe quelle IA, quelle qu&apos;elle soit ;</li>
        <li>lisible et enrichissable, pour que l&apos;IA puisse s&apos;en servir mais aussi y ajouter, sous mon contrôle ;</li>
        <li>privée, pour que mes notes ne partent pas s&apos;indexer chez un tiers.</li>
      </ul>
      <p>À partir de là, l&apos;architecture s&apos;est imposée presque d&apos;elle-même.</p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        La construction, étape par étape
      </h2>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 1 : le vault Obsidian comme source de vérité
      </h3>
      <p>
        Premier choix : Obsidian. Des fichiers Markdown, un sujet par note, un frontmatter YAML (type, status, importance, tags). Pourquoi Markdown ? Parce que c&apos;est du texte brut. Lisible par un humain, diffable, versionnable, et ça ne dépend d&apos;aucun logiciel. Le vault vit sur mon disque et sur un repo GitHub privé, donc historique complet et synchronisation automatique.
      </p>
      <p>
        C&apos;est le socle. Le vault est la seule source de vérité. Tout le reste n&apos;est qu&apos;une projection de ce vault.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 2 : le pipeline d&apos;ingestion
      </h3>
      <p>
        Pour qu&apos;une IA puisse lire ces notes, il faut les transformer en données interrogeables par le sens. C&apos;est le rôle d&apos;un RAG (Retrieval-Augmented Generation) : découper les notes en morceaux (chunks), calculer pour chacun un vecteur (un nombre qui résume son sens), et les stocker dans une base vectorielle.
      </p>
      <p>Mon pipeline, orchestré avec n8n que j&apos;utilise déjà partout :</p>
      <CodeWindow
        filename="Pipeline d'ingestion"
        badge="n8n"
        code={`GitHub (vault privé) → décodage → chunking → embeddings → Qdrant`}
      />
      <p>
        Qdrant sert de base vectorielle. Elle est auto-hébergée sur mon VPS et open source. Pour les embeddings, j&apos;utilise Ollama avec le modèle bge-m3 : il tourne en local, il est multilingue, et aucune note n&apos;est envoyée à un tiers.
      </p>
      <p>
        Point important : l&apos;ingestion tourne toutes les 30 minutes. J&apos;écris dans Obsidian, je pousse, et trente minutes plus tard c&apos;est interrogeable. Pas de bouton à cliquer.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 3 : le RAG, poser une question
      </h3>
      <p>
        Une question arrive. Elle est transformée en vecteur. Qdrant retrouve les morceaux les plus proches. Un LLM répond uniquement à partir de ces morceaux, en citant les fichiers sources.
      </p>
      <p>
        Le choix du LLM a été mouvementé (j&apos;y reviens dans les problèmes). Aujourd&apos;hui, la génération passe par la passerelle OpenCode Go, avec le modèle deepseek-v4-flash-vision-exp.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 4 : le serveur MCP, brancher n&apos;importe quelle IA
      </h3>
      <p>
        C&apos;est la pièce maîtresse, et ce qui distingue ce projet d&apos;un simple chatbot. Le protocole MCP (Model Context Protocol) permet à n&apos;importe quelle IA compatible de se connecter à mes outils : ChatGPT, Claude, Cursor, opencode.
      </p>
      <p>
        J&apos;ai construit un serveur MCP dédié qui n&apos;expose que mes outils, jamais l&apos;administration de n8n. Une URL suffit, et mon cerveau est branché à toutes mes IA :
      </p>
      <CodeWindow
        filename="Endpoint MCP"
        badge="MCP"
        code={`https://n8n.samensteeve.com/mcp/second-brain-kb`}
      />
      <p>
        Concrètement, dans une conversation Claude, je peux écrire « interroge mon second cerveau : quels sont mes projets Laravel ? » et il va chercher dans mes notes, avec les sources.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 5 : l&apos;écriture contrôlée, la quarantaine
      </h3>
      <p>
        Donner à une IA la capacité d&apos;écrire dans ma base, c&apos;est puissant et dangereux. Une note lue par une IA, ou un contenu piégé, pourrait l&apos;inciter à écrire n&apos;importe quoi. Ma règle est simple : toute écriture IA passe par une quarantaine.
      </p>
      <p>
        Une note proposée par une IA arrive avec <code>status: pending</code>. Elle est invisible pour la recherche tant que je ne l&apos;ai pas validée à la main. Le pire qu&apos;une IA compromise puisse faire, c&apos;est écrire une note que je vois, que je peux corriger ou supprimer. Et tout est versionné par Git, donc réversible.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 6 : la qualité, classement, doublons, ménage
      </h3>
      <p>Une base qui grossit devient vite un bordel. J&apos;ai mis trois garde-fous.</p>
      <p>
        D&apos;abord la classification automatique. Une IA qui propose une note lui donne un type, des tags et un dossier cible. Ensuite le dédoublonnage : avant d&apos;écrire, on compare la note à l&apos;existant. Trop similaire (au-dessus de 75 %), c&apos;est refusé. Un peu similaire (au-dessus de 55 %), c&apos;est un avertissement. Enfin, un housekeeping hebdomadaire : un workflow détecte les paires de notes redondantes et m&apos;écrit un rapport à relire.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 7 : plonger dans la source
      </h3>
      <p>
        Une base de connaissances, c&apos;est bien. Mais parfois, l&apos;IA a besoin du détail exact, un fichier précis d&apos;un projet. Plutôt que de tout recopier dans le vault, j&apos;ai ajouté un troisième outil : <code>second_brain_project_details</code>. L&apos;IA demande <code>repo</code> ou <code>repo#chemin</code>, et elle va lire la source directement sur GitHub. Le vault reste léger, la source reste la vérité.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 8 : l&apos;authentification
      </h3>
      <p>
        Dernière brique pour que ça marche partout : l&apos;authentification. Un token statique, c&apos;est simple mais limité. Claude.ai web, par exemple, ne peut pas envoyer d&apos;en-tête personnalisé. J&apos;ai donc basculé le serveur MCP en OAuth, que n8n expose nativement avec les points de découverte standards. Résultat : n&apos;importe quel client MCP sérieux peut se connecter en s&apos;authentifiant normalement, sans que j&apos;aie à lui expliquer quoi que ce soit à la main.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 9 : rendre ça rapide et robuste
      </h3>
      <p>
        C&apos;est la partie dont je suis le plus fier, parce qu&apos;elle est invisible et qu&apos;elle a demandé le plus de réflexion. Aujourd&apos;hui, quand rien n&apos;a changé, l&apos;ingestion tourne en deux secondes au lieu de trois à six minutes. Et elle ne peut jamais dupliquer ni perdre une note, même si deux exécutions tournent en même temps.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Les problèmes rencontrés (et comment je les ai réglés)
      </h2>
      <p>C&apos;est la partie que j&apos;aurais aimé lire quand j&apos;ai commencé. Rien ne s&apos;est passé comme prévu.</p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        1. Le fournisseur LLM qui tombe à l&apos;eau
      </h3>
      <p>
        Le problème : mon premier choix de génération ne marchait pas. Pas de clé valide d&apos;un côté, pas de fonds de l&apos;autre. Blocage total au moment de la génération.
      </p>
      <p>
        La solution : réutiliser une passerelle que j&apos;avais déjà, OpenCode Go. Mais elle exige un en-tête personnalisé, <code>x-opencode-session</code>, que les nœuds de modèle d&apos;n8n n&apos;exposent pas.
      </p>
      <p>
        La leçon : quand un nœud ne permet pas ce dont tu as besoin, descends d&apos;un niveau. J&apos;ai remplacé le nœud par un simple appel HTTP direct, avec un contrôle total du payload et des en-têtes.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        2. La boucle qui s&apos;arrête toute seule
      </h3>
      <p>
        Le problème : mon ingestion utilisait <code>splitInBatches</code>, une boucle par note. Elle s&apos;arrêtait prématurément dès qu&apos;un item était vide.
      </p>
      <p>
        La solution : abandonner la boucle pour un pipeline linéaire. Un seul flux, sans état intermédiaire fragile.
      </p>
      <p>
        La leçon : une boucle, c&apos;est un état de plus à gérer. Quand un flux linéaire suffit, il est plus simple et plus fiable.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        3. Les embeddings qui prennent une éternité
      </h3>
      <p>
        Le problème : pas de GPU sur mon VPS. Calculer les vecteurs de 190 morceaux sur CPU, c&apos;était environ une seconde par morceau, donc trois à six minutes à chaque exécution. Et ça recalculait tout à chaque fois, même si une seule note avait changé.
      </p>
      <p>
        La solution : rendre l&apos;ingestion différentielle. Chaque morceau reçoit un identifiant déterministe, un hash de son contenu. Avant de calculer, on demande à Qdrant quels identifiants existent déjà, et on n&apos;embarque que les nouveaux ou les modifiés.
      </p>
      <p>
        Le résultat : de trois à six minutes, on passe à deux secondes en régime stable. Seules les notes que je viens de modifier coûtent du temps.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        4. Les doublons fantômes
      </h3>
      <p>
        Le problème : deux exécutions concurrentes de l&apos;ingestion, une planifiée et une manuelle, et la base contenait deux fois les mêmes notes.
      </p>
      <p>
        La solution : avec des identifiants déterministes, un upsert écrase au lieu d&apos;ajouter. Deux exécutions simultanées produisent le même index.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        5. La perte de données qui m&apos;a agacé
      </h3>
      <p>
        Le problème : en corrigeant les doublons, j&apos;ai introduit pire. Mon nettoyage supprimait les points absents du lot courant. Mais si une exécution avait une vue périmée du vault, elle supprimait les notes qu&apos;une autre venait d&apos;écrire. J&apos;ai perdu quatre notes en testant. C&apos;est le genre de bug qui te fait douter de tout.
      </p>
      <p>
        La solution : horodater chaque point avec <code>indexed_at</code>, et ne supprimer un orphelin que s&apos;il est antérieur au début de l&apos;exécution. Un run concurrent, même avec une vue périmée, ne peut plus toucher aux notes écrites après son démarrage.
      </p>
      <p>
        La leçon : supprimer ce qui n&apos;est plus là est une opération destructive. Sur un système concurrent, elle a besoin d&apos;une garde temporelle. J&apos;ai écrit ce piège noir sur blanc dans la doc du projet pour ne jamais y retomber.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        6. La fuite silencieuse d&apos;une note IA
      </h3>
      <p>
        Le problème : en fouillant, j&apos;ai découvert qu&apos;une note écrite par une IA était en <code>status: active</code>, donc indexée, alors qu&apos;elle aurait dû être en quarantaine. Elle venait d&apos;une ancienne version du workflow.
      </p>
      <p>
        La solution : en plus de la quarantaine, j&apos;ai exclu tout un dossier, celui des captures et des rapports, de l&apos;indexation. Une écriture IA ne peut plus fuiter, même par accident.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        7. Le faux-ami qui m&apos;a fait douter
      </h3>
      <p>
        Le problème : un nœud s&apos;appelait « OpenRouter Model », mais pointait en réalité vers une autre passerelle. Une credential nommée « OpenAI account » n&apos;avait rien d&apos;OpenAI. Résultat : des heures à chercher une incohérence qui était dans les noms.
      </p>
      <p>
        La solution : renommer selon ce que les choses font, pas selon une marque. Et en faire une règle écrite dans le projet.
      </p>
      <p>
        La leçon : les mauvais noms coûtent plus cher qu&apos;ils n&apos;en ont l&apos;air. Un nom mensonger, c&apos;est un bug en attente.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        8. « Pourquoi une IA me dit un truc et le contraire ? »
      </h3>
      <p>
        Le problème : une IA m&apos;a affirmé que ma base était mal nommée, en s&apos;appuyant sur une capture d&apos;écran qui ne correspondait à rien dans mon dépôt. Un fichier qui n&apos;a jamais existé. J&apos;ai vérifié l&apos;historique Git complet, zéro trace.
      </p>
      <p>
        La solution : la règle d&apos;or, vérifier à la source et ne jamais faire confiance à une capture. C&apos;est la raison d&apos;être de ce projet. Une IA qui invente, c&apos;est une IA qui n&apos;a pas accès à la vérité. Ici, elle n&apos;a accès qu&apos;à ce qui est vérifié.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        À quoi ça me sert, concrètement
      </h2>
      <p>
        C&apos;est la vraie question, et pendant longtemps je ne l&apos;avais pas assez mise en avant. Voici l&apos;utilité réelle, aujourd&apos;hui.
      </p>
      <div className="grid sm:grid-cols-2 gap-3 my-6">
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Préparer un entretien ou un stage</h3>
          <p className="text-sm text-ink-soft m-0">Je demande à n&apos;importe quelle IA : « résume le projet X, mes choix techniques, ce que j&apos;y ai appris ». Elle répond depuis mes notes, avec les détails exacts, pas depuis une mémoire approximative.</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Candidatures, CV, portfolio</h3>
          <p className="text-sm text-ink-soft m-0">Mon contexte professionnel est prêt, à jour et interrogeable. Rédiger une candidature ou un post devient un dialogue avec ma propre base, pas une page blanche.</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Freelance : répondre vite et juste</h3>
          <p className="text-sm text-ink-soft m-0">Un client pose une question technique ? Je fais plonger l&apos;IA dans la source d&apos;un projet (README, fichier précis) pour retrouver l&apos;implémentation exacte, sans fouiller mon disque.</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Mémoire technique quotidienne</h3>
          <p className="text-sm text-ink-soft m-0">Une leçon apprise, une décision d&apos;archi, un piège rencontré : je le capture dans le vault. La leçon du jour devient une note interrogeable, pas un souvenir qui s&apos;efface.</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Une seule mémoire pour toutes mes IA</h3>
          <p className="text-sm text-ink-soft m-0">ChatGPT, Claude, Cursor, opencode : toutes lisent et écrivent dans la même base. Je ne réexplique plus mon contexte, je le branche.</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Alimenter mes articles et mes projets</h3>
          <p className="text-sm text-ink-soft m-0">Ce que j&apos;écris ici est nourri par le vault. Mes notes, mes retours d&apos;expérience et mes articles ne partent plus de zéro : ils partent de ce que j&apos;ai vécu.</p>
        </div>
      </div>
      <p>
        Au-delà du travail, c&apos;est aussi une mémoire de vie : mes projets, mes objectifs, mes démarches. Une IA qui me connaît, et qui me connaît avec ma permission, parce que c&apos;est ma base, sur mon serveur.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Ce que ce projet m&apos;a appris
      </h2>
      <ul className="list-disc list-inside space-y-2">
        <li>L&apos;erreur est inévitable : concevoir pour l&apos;échec (retry, idempotence, dégradation gracieuse) vaut mieux que d&apos;espérer que rien ne casse.</li>
        <li>La donnée d&apos;abord : une opération destructive a toujours besoin d&apos;un garde-fou. Ici, un horodatage. Sinon, elle finit par mordre.</li>
        <li>Nommer, c&apos;est concevoir : un composant mal nommé est un bug qui attend son heure.</li>
        <li>L&apos;IA n&apos;a pas besoin de tout mémoriser : elle doit pouvoir lire quand il faut, et n&apos;écrire qu&apos;avec mon accord.</li>
        <li>Vérifier à la source : c&apos;est ce qui sépare une IA utile d&apos;une IA qui invente avec aplomb.</li>
      </ul>

      <h2 className="font-display text-xl font-bold text-ink mt-8">Et après ?</h2>
      <p>
        Le socle est solide, mais rien n&apos;est figé. Ce qui vient : une interface de chat (Telegram ou WhatsApp) pour interroger le cerveau sans ouvrir un client MCP, la capture automatique (veille, idées) pour que la base se nourrisse toute seule, et toujours plus de notes de vie. Parce qu&apos;au fond, ce projet n&apos;est pas un projet d&apos;IA. C&apos;est une mémoire que je construis, morceau par morceau.
      </p>
      <p className="mt-4">
        Si tu construis un projet similaire, commence simple, mets des garde-fous avant d&apos;avoir mal, et documente chaque piège. Les problèmes que j&apos;ai listés ici, tu les rencontreras aussi. Autant qu&apos;ils te servent.
      </p>
    </article>
  );
}
