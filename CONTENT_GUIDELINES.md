# Content Guidelines — Projets & Réalisations

> Ce document documente la méthodologie narrative à suivre pour toute modification du contenu des réalisations (`lib/case-studies.ts`) ou de tout autre contenu éditorial du site. Il existe pour éviter que des agents IA (ou humains) ne reproduisent les erreurs de contenu générique et formaté identifiées lors du premier audit.

---

## 🚫 Anti-patterns à ne JAMAIS reproduire

### 1. Le résumé "CV technique"

❌ **Mauvais** :
> "Conception d'une architecture microservices à 5 services (API Gateway, ERP, CRM, Supply Chain, BI) pour AGROCAM S.A., acteur majeur de l'agro-industrie camerounaise."

Ce type de summary liste ce qui a été fait techniquement. Il ne dit pas **pourquoi**, **pour qui**, ni **quelle contrainte réelle** a motivé les choix.

✅ **Bon** :
> "AGROCAM S.A. gérait l'intégralité de son opération agro-industrielle sur un système monolithique vieillissant. Le problème n'était pas la scalabilité technique — c'était que les agents terrain en zone rurale n'avaient aucun moyen d'enregistrer leurs opérations sans connexion internet."

**Règle** : Le summary doit commencer par le contexte client et le vrai problème, pas par ce que l'ingénieur a construit.

---

### 2. Les challenges génériques

❌ **Mauvais** :
> "Garantir l'intégrité des transactions financières (escrow) entre clients et avocats dans un contexte multi-devises"

C'est une contrainte correcte, mais elle est formulée comme une exigence fonctionnelle froide.

✅ **Bon** :
> "Les paiements en escrow impliquent une double intégrité : données financières cohérentes ET transitions d'état irréversibles — les deux doivent être atomiques"

**Règle** : Un challenge doit avoir une **tension** — expliquer *pourquoi* c'est difficile, pas juste *que* c'est une contrainte.

---

### 3. Les solutions sans "pourquoi"

❌ **Mauvais** :
> "Machine à états Laravel avec transitions validées et verrouillage pessimiste (lockForUpdate) pour éviter les race conditions"

C'est la bonne solution, mais elle est présentée comme un fait technique sans expliquer ce qui se passe si on ne le fait pas.

✅ **Bon** :
> "Verrouillage pessimiste (lockForUpdate) sur les transitions d'état des dossiers — une requête concurrente ne peut pas corrompre un paiement en cours, même sous charge"

**Règle** : Toute solution doit inclure son **conséquence directe** ou ce qu'elle évite. Format : `[ce qu'on a fait] — [ce que ça résout concrètement]`.

---

### 4. Les résultats vides de sens

❌ **Mauvais** :
> "Infrastructure opérationnelle sur 3 sites avec failover testé et documenté"

"Opérationnelle" est le minimum attendu d'un projet livré. Ce n'est pas un résultat remarquable.

✅ **Bon** :
> "RTO de reprise d'activité : 1h45 validé en test — contre 2 à 3 jours estimés avec l'ancienne configuration"

**Règle** : Un résultat doit toujours avoir **un chiffre, une comparaison ou un avant/après**. S'il n'y a pas de chiffre, il faut trouver la formulation qui exprime le delta.

---

### 5. La tagline générique

❌ **Mauvais** :
> "Infrastructure multi-sites sécurisée pour un e-commerce camerounais avec migration M365 et plan de reprise d'activité."

C'est une description, pas une accroche. Elle décrit le périmètre sans transmettre ce qui est remarquable.

✅ **Bon** :
> "Migration zéro-interruption vers une infrastructure cloud hybride pour un e-commerce 3 sites — RTO validé à 1h45 au lieu des 3 jours estimés avec l'ancienne architecture."

**Règle** : La tagline doit formuler **le résultat le plus marquant** du projet, pas son périmètre fonctionnel. Format idéal : `[ce qu'on a accompli] — [le chiffre ou le delta qui le prouve]`.

---

### 6. La présentation identique de tous les projets

❌ **Mauvais** : 4 projets qui parlent tous de "conception d'une architecture", "garantir l'intégrité", "résultats opérationnels" dans le même registre.

✅ **Bon** : Chaque projet a son propre **angle narratif** :

| Projet | Angle | Tension centrale |
|---|---|---|
| TribuneJustice | Sécurité + production existante | Corriger 41 failles sans interrompre une prod active |
| DIGITRANS-CM | Contraintes africaines réelles | Construire pour des agents terrain sans internet |
| ShopNow | Confiance + zéro downtime | Moderniser sans briser la confiance d'une équipe traumatisée |
| Agent IA | Automatisation en prod, pas un POC | Un formulaire qui répond en 30s, en production sur ce site même |

**Règle** : Avant d'écrire le contenu d'un projet, identifier son **angle unique**. Deux projets ne peuvent pas avoir le même angle.

---

## ✅ Règles par champ

### `tagline`
- **Longueur** : 1 à 2 phrases max
- **Structure** : `[Action accomplie ou enjeu] — [Résultat mesurable ou différenciateur]`
- **Interdit** : les listes de technologies, les verbes "permettre", "gérer", "assurer" sans complément concret

### `summary`
- **Longueur** : 3 à 5 phrases
- **Structure** :
  1. Qui est le client et quel est son contexte ?
  2. Quel était le vrai problème (pas la solution) ?
  3. Quelle était la contrainte ou tension principale ?
  4. (Optionnel) Ce que ça impliquait comme mandate
- **Interdit** : commencer par "Conception de", "Développement d'un", "Mise en place de"

### `challenges`
- **Nombre** : 3 maximum
- **Structure** : `[Contrainte] — [Pourquoi c'est difficile ou qu'est-ce qui se passe si on échoue]`
- **Interdit** : les contraintes sans tension ("Garantir la disponibilité" sans dire ce qu'une indisponibilité coûte)

### `solutions`
- **Nombre** : 3 à 4 maximum
- **Structure** : `[Ce qu'on a fait] — [Ce que ça évite ou résout concrètement]`
- **Interdit** : les listes de technologies sans expliquer leur rôle ("Kubernetes, Terraform, AWS" sans dire pourquoi)

### `results`
- **Nombre** : 3 maximum
- **Règle absolue** : chaque résultat doit avoir au moins un chiffre, une durée, un pourcentage ou une comparaison avant/après
- **Interdit** : "Architecture opérationnelle", "Système fonctionnel", "Migration réussie" — ce sont des livrables, pas des résultats

---

## 🗂️ Où modifier le contenu

| Fichier | Rôle |
|---|---|
| `lib/case-studies.ts` | Contenu des 4 projets de réalisation (FR + EN) |
| `content/blog/index.ts` | Métadonnées des articles de blog |
| `messages/fr.json` / `messages/en.json` | Labels UI et traductions de l'interface |

---

## 📋 Checklist avant de publier un contenu

Avant de modifier ou d'écrire le contenu d'un projet, valider chaque point :

- [ ] Le `summary` commence par le contexte client, pas par une action technique
- [ ] Chaque `challenge` exprime une tension, pas juste une contrainte
- [ ] Chaque `solution` indique ce qu'elle évite ou résout, pas juste ce qu'elle fait
- [ ] Chaque `result` a un chiffre ou un avant/après mesurable
- [ ] La `tagline` est une accroche avec le résultat le plus marquant, pas une liste de fonctionnalités
- [ ] Ce projet a un **angle narratif différent** des autres projets du portfolio
- [ ] Le contenu FR et EN sont bien cohérents (pas juste une traduction mécanique — l'EN peut avoir un ton légèrement différent si nécessaire)
