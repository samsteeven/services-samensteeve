import React from "react";
import { CodeWindow } from "@/components/code-window";
import { ZoomableImage } from "@/components/zoomable-image";
import { ScreenshotCarousel } from "@/components/screenshot-carousel";

export default function SecondBrainCommentJaiConstruit() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        Je vais être honnête. Ce projet n&apos;est pas né d&apos;une envie de faire de l&apos;IA. Il est né d&apos;une frustration, et elle est très concrète : mes candidatures de stage.
      </p>
      <p>
        À chaque offre, je réadaptais mon CV. Sauf que l&apos;IA qui m&apos;aidait ne me connaissait pas, ou pas à jour. Je devais lui redonner mon contexte, mes expériences, mes projets, ce qui collait à l&apos;offre. Et moi-même j&apos;oubliais des détails. Alors j&apos;allais chercher ce contexte dans une autre IA, qui l&apos;avait gardé, pour revenir le fournir à la première. Mon profil était dispersé entre plusieurs IA, chacune avec sa version de moi.
      </p>
      <p>
        Cet article raconte comment j&apos;ai construit un « second cerveau » pour régler ça. Pas à pas, avec les galères et les solutions. Le résultat final m&apos;importe moins que le chemin pour y arriver.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Les principes d&apos;architecture
      </h2>
      <p>Derrière les outils, il y a une chaîne de principes. C&apos;est elle qui structure tout le reste.</p>
      <CodeWindow
        filename="Principes"
        badge="Architecture"
        code={`Source de vérité\n      ↓\nProjection\n      ↓\nRetrieval\n      ↓\nAccès contrôlé\n      ↓\nÉcriture contrôlée\n      ↓\nVérification`}
      />
      <p>Le vault est la source de vérité. Tout le reste n&apos;en est qu&apos;une projection. L&apos;IA ne touche jamais la source directement : elle passe par un accès contrôlé, une écriture contrôlée, puis une vérification humaine. C&apos;est ce fil qui relie tout ce qui suit.</p>

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

      <ZoomableImage src="/blog/second-brain-architecture.png" alt="Architecture du second cerveau : ingestion Obsidian, Git, n8n, Qdrant et Ollama, accès via MCP" />
      <p className="text-xs text-ink-soft text-center italic mb-6">Vue d&apos;ensemble. Le vault est la source de vérité, l&apos;ingestion le projette dans Qdrant, et le serveur MCP l&apos;ouvre à n&apos;importe quelle IA.</p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 1 : le vault Obsidian comme source de vérité
      </h3>
      <p>
        Premier choix : Obsidian. Des fichiers Markdown, un sujet par note, un frontmatter YAML (type, status, importance, tags). Pourquoi Markdown ? Parce que c&apos;est du texte brut. Lisible par un humain, diffable, versionnable, et ça ne dépend d&apos;aucun logiciel. Le vault vit sur mon disque et sur un repo GitHub privé, donc historique complet et synchronisation automatique.
      </p>
      <p>
        C&apos;est le socle. Le vault est la seule source de vérité. Tout le reste n&apos;est qu&apos;une projection de ce vault.
      </p>

      <ZoomableImage src="/blog/second-brain-vault.png" alt="Le vault Obsidian : arborescence et vue graphique des notes" />
      <p className="text-xs text-ink-soft text-center italic mb-6">Des fichiers Markdown, un sujet par note, reliés entre eux par des liens.</p>

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

      <ZoomableImage src="/blog/second-brain-ingestion.png" alt="Le workflow n8n d'ingestion : de GitHub à Qdrant, avec le filtre différentiel" />
      <p className="text-xs text-ink-soft text-center italic mb-6">Le pipeline d&apos;ingestion dans n8n : lecture du vault, découpage, filtre des chunks déjà indexés, embeddings, upsert et nettoyage.</p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 3 : le RAG, poser une question
      </h3>
      <p>
        Une question arrive. Elle est transformée en vecteur. Qdrant retrouve les morceaux les plus proches. Un LLM répond uniquement à partir de ces morceaux, en citant les fichiers sources.
      </p>

      <ZoomableImage src="/blog/second-brain-qdrant.png" alt="Les 190 chunks du vault projetés en 2D dans Qdrant : chaque point est un morceau de note, positionné selon son sens" />
      <p className="text-xs text-ink-soft text-center italic mb-6">La carte des vecteurs. Chaque point est un chunk, et l&apos;infobulle montre le lien direct entre un vecteur et son contenu.</p>

      <ZoomableImage src="/blog/second-brain-ask.png" alt="Le workflow de requête : question, vectorisation, recherche Qdrant, contexte, LLM, réponse sourcée" />
      <p className="text-xs text-ink-soft text-center italic mb-6">Le pipeline de la requête dans n8n : c&apos;est ce workflow que l&apos;outil MCP <code>second_brain_ask</code> appelle.</p>

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
      <p>
        Le point clé n&apos;est pas le RAG en lui-même : un « Obsidian + chatbot » classique fait déjà ça. Ce qui change tout, c&apos;est l&apos;<strong>interopérabilité</strong> : la même base sert à ChatGPT, Claude, Cursor et opencode, sans duplication. Et le serveur n&apos;expose que mes outils, jamais l&apos;administration de n8n.
      </p>

      <ZoomableImage src="/blog/second-brain-mcp-server.png" alt="Le serveur MCP dédié et ses outils" />
      <p className="text-xs text-ink-soft text-center italic mb-6">Le serveur MCP expose uniquement mes outils (lecture, écriture en quarantaine, lecture de la source), jamais l&apos;administration de n8n.</p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Étape 5 : l&apos;écriture contrôlée, la quarantaine
      </h3>
      <p>
        Donner à une IA la capacité d&apos;écrire dans ma base, c&apos;est puissant et dangereux. Une note lue par une IA, ou un contenu piégé, pourrait l&apos;inciter à écrire n&apos;importe quoi. Ma règle est simple : toute écriture IA passe par une quarantaine.
      </p>
      <p>
        Une note proposée par une IA arrive avec <code>status: pending</code>. Elle est invisible pour la recherche tant que je ne l&apos;ai pas validée à la main. Dans ce cadre, le pire qu&apos;une IA compromise puisse faire est d&apos;écrire une note que je vois, que je peux corriger ou supprimer. Et tout est versionné par Git, donc réversible.
      </p>

      <ZoomableImage src="/blog/second-brain-quarantine.png" alt="Le flux de quarantaine : l'IA écrit, la note reste invisible jusqu'à validation" />

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
        Une base de connaissances, c&apos;est bien. Mais parfois, l&apos;IA a besoin du détail exact : un fichier précis d&apos;un projet, l&apos;implémentation réelle d&apos;une fonctionnalité.
      </p>
      <p>
        Plutôt que de tout recopier dans le vault, j&apos;ai ajouté un troisième outil : <code>second_brain_project_details</code>. L&apos;IA demande un repo (ou <code>repo#chemin</code>), et elle va lire la source directement sur GitHub.
      </p>
      <p>
        Concrètement : « comment avais-je implémenté l&apos;escrow ? », « je veux refaire cette fonctionnalité ailleurs, montre-moi comment je l&apos;avais faite ». L&apos;IA part chercher la vraie implémentation, dans le vrai code. Le vault reste léger, la source reste la vérité.
      </p>
      <p>
        Aujourd&apos;hui, cet outil est branché sur GitHub. Mais rien ne l&apos;empêche de l&apos;être demain sur d&apos;autres outils : GitLab, un gestionnaire de tickets, une doc interne. C&apos;est ça qui est puissant : la même base peut ouvrir l&apos;IA à tout mon environnement de travail.
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
        C&apos;est la partie dont je suis le plus fier, parce qu&apos;elle est invisible et qu&apos;elle a demandé le plus de réflexion. Aujourd&apos;hui, quand rien n&apos;a changé, l&apos;ingestion tourne en deux secondes au lieu de trois à six minutes. Et elle est conçue pour éviter les duplications et les pertes liées aux exécutions concurrentes.
      </p>

      <ZoomableImage src="/blog/second-brain-perf.png" alt="Avant / après : l'ingestion passe de plusieurs minutes à deux secondes" />

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Ce qu&apos;il connaît de moi (et ce qu&apos;il pourrait connaître)
      </h2>
      <p>Aujourd&apos;hui, il connaît mon <strong>identité</strong>, ma <strong>carrière</strong>, mes <strong>projets</strong>, mes <strong>compétences</strong>, mes <strong>connaissances techniques</strong> et ma <strong>manière de développer</strong>. C&apos;est tout ce que je n&apos;ai plus à réexpliquer.</p>
      <p>Et c&apos;est fait pour grandir : demain, ma <strong>vie quotidienne</strong>, ma <strong>veille</strong>, mes <strong>décisions</strong>, mes <strong>idées</strong>. Une mémoire qui s&apos;enrichit à chaque note.</p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Un exemple concret : un CV taillé pour une offre
      </h2>
      <p>Voici l&apos;usage le plus parlant, celui qui a déclenché tout le projet.</p>
      <p><strong>Le contexte.</strong> Je tombe sur une offre de stage (<a href="https://www.jobteaser.com/fr/job-offers/2298006f-f332-4fa6-bdb2-41c1dc629c43-takima-stage-de-fin-d-etudes-ai-software-devops-engineer-projet-popapp-devops-greenit" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:opacity-80">Takima, « AI Software &amp; DevOps Engineer », projet PopApp</a>) autour du Green IT et de Kubernetes. Elle demande Java/Spring, React, Docker, Kubernetes et de l&apos;IA.</p>
      <p><strong>La demande.</strong> Je branche une IA sur mon serveur MCP et je lui colle ce prompt :</p>
      <CodeWindow
        filename="prompt-cv-takima.txt"
        badge="Prompt"
        code={`Tu es connecté à mon second cerveau via MCP (outils : second_brain_ask, second_brain_project_details, second_brain_add).
Objectif : génère-moi un CV adapté à l'offre de stage ci-dessous, en te basant UNIQUEMENT sur ma base de connaissances. N'invente rien.

Méthode :

1. Interroge ma base avec second_brain_ask pour récupérer : mon identité, mon parcours, mes études, mes projets, mes compétences, mon CV.
2. Pour les projets les plus pertinents pour l'offre, plonge dans la source si tu as besoin du détail : second_brain_project_details, format "repo" ou "repo#chemin".
3. Sélectionne et réordonne mes projets par pertinence pour l'offre. Reformule chaque élément en puces orientées résultat.
4. Si l'offre demande une compétence que ma base ne contient pas, ne l'invente pas : signale-la comme un écart, honnêtement.

Section Green IT :
L'offre mentionne le Green IT. Relie explicitement ce thème à mon optimisation des coûts et des ressources cloud (Terraform, budgets.tf) plutôt que d'inventer une expérience Green IT que je n'ai pas. Appuie-toi uniquement sur ce qui existe dans ma base.

Contraintes :

- Faits vérifiables uniquement : pas de chiffre, date, techno ou résultat qui ne vienne pas de ma base.
- Pas de tirets cadratins, pas de flèches.
- Français, une page.
- Titre, accroche (objectif), compétences, projets, formation, langues.

Avant de rédiger, liste-moi les infos que tu as trouvées dans ma base et les écarts éventuels avec l'offre. Puis propose le CV.`}
      />
      <p>Trois choses comptent dans ce prompt : <strong>l&apos;ordre des outils</strong> (la base d&apos;abord, la source seulement si besoin de détail), <strong>l&apos;interdiction d&apos;inventer</strong> (avec obligation de signaler les écarts), et <strong>la demande de lister d&apos;abord ce qui a été trouvé</strong>. C&apos;est cette dernière ligne qui produit les captures ci-dessous.</p>
      <p><strong>Ce qui se passe ensuite :</strong></p>
      <ol className="list-decimal list-inside space-y-2">
        <li>L&apos;IA interroge ma base (<code>second_brain_ask</code>) : identité, parcours, projets, compétences, CV.</li>
        <li>Pour les projets clés, elle plonge dans la <strong>source</strong> (<code>second_brain_project_details</code>) pour vérifier les détails réels.</li>
        <li>Elle sélectionne et <strong>réordonne</strong> mes projets par pertinence pour l&apos;offre.</li>
        <li>Elle signale honnêtement les <strong>écarts</strong> : Kotlin, etcd, Operator Framework ne sont pas dans ma base, elle ne les invente pas.</li>
      </ol>
      <p><strong>Le résultat.</strong> Un CV ciblé : Kubernetes et Terraform pour le DevOps, Spring Boot pour le Java, React pour le front, Second Brain pour l&apos;IA, et une section qui relie honnêtement mon expérience au <strong>Green IT</strong> (maîtrise des coûts et des ressources cloud).</p>
      <ScreenshotCarousel
        images={[
          { src: "/blog/second-brain-cv-takima-prompt.png", alt: "Demande de CV adressée à l'IA connectée au second cerveau via MCP", caption: "La demande : générer un CV ciblé uniquement à partir de la base, en interrogeant second_brain_ask puis la source." },
          { src: "/blog/second-brain-cv-takima-found.png", alt: "Synthèse de ce que l'IA a trouvé dans la base", caption: "Ce que l'IA a trouvé : 8 requêtes sur la base et 4 fichiers sources lus, dont l'identité, les études, les projets utiles et ce qui relie mon parcours au Green IT." },
          { src: "/blog/second-brain-cv-takima-gaps.png", alt: "Écarts entre l'offre et la base de connaissances", caption: "Les écarts, listés sans complaisance : ce que l'offre demande et que la base ne contient pas, mais aussi ce que la base décrit mal." },
        ]}
      />
      <p><strong>Le résultat.</strong> Un CV ciblé : Kubernetes et Terraform pour le DevOps, Spring Boot pour le Java, React pour le front, Second Brain pour l&apos;IA, et une section qui relie honnêtement mon expérience au <strong>Green IT</strong> (maîtrise des coûts et des ressources cloud).</p>
      <p>Ce que j&apos;ai trouvé le plus utile n&apos;est pourtant pas le CV. C&apos;est la liste des écarts. L&apos;IA y pointe les <strong>manques de ma base</strong> : des projets décrits trop vite (React seulement via SIGGE, sans détail de ce que j&apos;y ai fait), le rôle que je tenais sur TribuneJustice jamais précisé, un projet présenté comme un cas d&apos;étude plutôt qu&apos;une mission réelle. Et sa remarque la plus juste : « certains fichiers remontés semblent tronqués, donc absent veut dire non trouvé, pas forcément inexistant ». Le cerveau ne vaut que par ce qu&apos;on y met. C&apos;est un début, et il rend ces trous visibles.</p>

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
        La solution : avec des identifiants déterministes, un upsert écrase au lieu d&apos;ajouter. Deux exécutions simultanées convergent vers le même index.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        5. La perte de données qui m&apos;a agacé
      </h3>
      <p>
        Le problème : en corrigeant les doublons, j&apos;ai introduit pire. Mon nettoyage supprimait les points absents du lot courant. Mais si une exécution avait une vue périmée du vault, elle supprimait les notes qu&apos;une autre venait d&apos;écrire. J&apos;ai perdu quatre notes en testant. C&apos;est le genre de bug qui te fait douter de tout.
      </p>
      <p>
        La solution : horodater chaque point avec <code>indexed_at</code>, et ne supprimer un orphelin que s&apos;il est antérieur au début de l&apos;exécution. Un run concurrent, même avec une vue périmée, ne touche pas aux notes écrites après son démarrage.
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
        La solution : en plus de la quarantaine, j&apos;ai exclu tout un dossier, celui des captures et des rapports, de l&apos;indexation. Cette double protection empêche désormais une note IA de rejoindre l&apos;index par ce chemin.
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
        Le CV a été le déclencheur, mais ce n&apos;est qu&apos;un usage parmi d&apos;autres. Voici ce que ça m&apos;apporte aujourd&apos;hui, et ce que ça m&apos;apportera au fil du temps.
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
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Appliquer mes conventions à un nouveau projet</h3>
          <p className="text-sm text-ink-soft m-0">L&apos;IA connaît ma manière de développer : structure, nommage, patterns, bonnes pratiques. Sur un nouveau projet, elle applique ce que j&apos;ai déjà bien fait ailleurs, au lieu de produire du code générique.</p>
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
