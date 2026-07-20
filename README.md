 Services — Samen Steeve

Site vitrine bilingue (fr/en) pour les services freelance de **Samen Steeve** : ingénierie logicielle, architecture cloud, pentest applicatif, automatisation IA. Blog technique avec 16 articles (8 paires bilingues). Contact via formulaire 6 étapes + envoi email Resend.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS v4** (CSS-first, pas de `tailwind.config.js`)
- **lucide-react** — icônes
- **Resend** — envoi d'emails transactionnels (formulaire de contact)
- **Turso / libSQL** — base de données SQLite managée pour la persistance des demandes de contact
- **TypeScript strict**
- **@fontsource/** — polices auto-hébergées (Inter, Outfit, Instrument Sans, JetBrains Mono, Syne)

## Démarrer

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3001](http://localhost:3001).

## Internationalisation

Le site est bilingue `/en` et `/fr`. La racine `/` redirige vers `/fr` via `proxy.ts` (Next.js 16+). Les traductions sont dans `lib/i18n/` avec un helper `getT(lang)`. Le changement de langue utilise `getOppositeUrl()` pour basculer n'importe quelle URL.

## Thème

Mode clair/sombre géré par l'attribut `data-theme` sur `<html>`, persisté dans `localStorage` (clé `theme`). Le script anti-flash dans `app/layout.tsx` applique le thème avant le premier rendu React. Pas de librairie externe.

## Structure du contenu

```
content/
└── blog/
    ├── types.ts            # interfaces PostMeta, BlogPost
    ├── index.ts            # métadonnées + getPostBySlug(slug, lang)
    └── posts/
        ├── fr/             # 8 articles français (.tsx)
        │   └── *.tsx
        └── en/             # 8 articles anglais (.tsx)
            └── *.tsx
```

Les articles sont des fichiers `.tsx` exportant un composant React (contenu JSX inline). Le chargement est dynamique via `import(\`./posts/${lang}/${slug}\`)`.

**Workflow** : créer le fichier `.mdx` → ajouter les métadonnées dans `content/blog/index.ts` → `git push`.

## Routes

```
app/
├── layout.tsx              # Root layout (html, head, fonts, JSON-LD, theme script)
├── globals.css             # Tokens Tailwind, animations, mode sombre
├── proxy.ts                # Redirection / → /fr, markdown content negotiation
├── sitemap.ts              # Sitemap auto-généré (24 URLs)
├── icon.png                # Favicon
├── api/
│   └── contact/
│       └── route.ts        # POST — envoi email via Resend
└── [lang]/
    ├── layout.tsx          # SiteHeader + SiteFooter + validation langue
    ├── page.tsx            # Accueil (hero, grille services, témoignage, CTA)
    ├── services/
    │   ├── page.tsx        # Liste des services (bento grid)
    │   └── [slug]/
    │       └── page.tsx    # Détail service (livrables, cas d'usage, étude liée)
    ├── comment-ca-marche/
    │   └── page.tsx        # Processus (timeline 4 phases)
    ├── realisations/
    │   ├── page.tsx        # Liste des études de cas
    │   └── [slug]/
    │       └── page.tsx    # Détail étude (défis, solutions, résultats)
    ├── blog/
    │   ├── page.tsx        # Listing blog (filtre par tag)
    │   └── [slug]/
    │       └── page.tsx    # Article blog
    ├── demarrer-un-projet/
    │   └── page.tsx        # Formulaire 6 étapes (offre, portée, objectifs, contexte, contact, récapitulatif)
    └── [...catchAll]/
        └── page.tsx        # 404 personnalisé
```

## Design

- **Palette** : Tokens CSS `bg-paper`, `text-ink`, `border-line`, `text-accent` — pas de couleurs Tailwind par défaut.
- **Polices** : `font-display` (Outfit), `font-sans` (Inter), `font-mono` (JetBrains Mono) — auto-hébergées via `@fontsource`.
- **Animations** : `fade-in`, `grid-pan`, `hero-glow-pulse` dans `globals.css` ; composant `ScrollReveal` pour apparitions au défilement.

## Composants principaux

- `site-header.tsx` — Navigation sticky avec dropdowns (Services, Explorer), drawer mobile, barre de progression scroll
- `site-footer.tsx` — Footer 3 colonnes (marque, contact, navigation)
- `hero-section.tsx` — Hero avec grille SVG animée, badge disponibilité, dual CTA
- `services-grid.tsx` — Grille 2×2 avec mini-visuals interactifs par service
- `process-timeline.tsx` — Timeline verticale 4 phases (alterné gauche/droite)
- `project-form.tsx` — Orchestrateur formulaire multi-étapes (client)
- `project-form/` — Composants extraits : step-service, step-goals, step-context, step-details, step-contact, step-recap, types, contact-api-adapter
- `use-project-form.ts` — Hook de logique formulaire (validation, soumission POST)
- `blog-listing.tsx` — Listing articles avec filtrage par tag (client)
- `blog-card.tsx` — Carte d'article
- `scroll-reveal.tsx` — Animation d'entrée au scroll (IntersectionObserver)
- `theme-toggle.tsx` — Bascule clair/sombre

## Services

4 services définis dans `lib/service-registry.ts` (réexportés via `lib/services.ts`) :

| Slug | Type contact | Étude liée |
|---|---|---|
| `ingenierie-logicielle` | `web` | tribunejustice |
| `architecture-cloud` | `cloud` | shopnow |
| `audit-securite` | `security` | tribunejustice |
| `automatisation-ia` | `ai` | digitrans-cm |

Chaque service a une icône, un type de contact associé (pour le formulaire), et une étude de cas liée.

Constantes partagées (`lib/constants.ts`) : `SITE_URL`, `PORTFOLIO_URL`, `CONTACT_EMAIL`, `CAL_URL`, `WHATSAPP_URL`, `SOCIAL_LINKS`.

## Études de cas

3 études bilingues dans `lib/case-studies.ts` :

- **tribunejustice** — Plateforme legaltech (Laravel, Angular, Next.js, Redis, Docker)
- **digitrans-cm** — Microservices cloud-native pour agtech (Kubernetes, Terraform, AWS/Azure)
- **shopnow** — Infrastructure hybride e-commerce (Azure, AD, M365, FortiGate)

## SEO

- JSON-LD `schema.org/Person` dans le root layout (Knowledge Panel Google)
- `createPageMetadata()` dans `lib/metadata.ts` — canonical, hreflang, OpenGraph, Twitter cards
- `metadataBase` : `https://services.samensteeve.com`
- Sitemap auto-généré avec pages statiques, services, réalisations et articles de blog
- Security headers : `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, etc.

## Découverte par agents IA

Le site expose des surfaces lisibles par moteurs de recherche et agents IA :

| Endpoint | Standard | Description |
|---|---|---|
| `/llms.txt` | LLM discovery | Résumé Markdown des services, réalisations, articles et endpoints agents |
| `/auth.md` | Auth.md | Instructions d'accès public pour agents |
| `/api/md/[...slug]` | Markdown negotiation | Représentation Markdown des pages publiques |
| `/.well-known/agent-skills/index.json` | Agent Skills | Index des capacités de lecture/action |
| `/.well-known/api-catalog` | RFC 9727 | Catalogue d'API en `linkset+json` |
| `/.well-known/mcp/server-card.json` | MCP server card | Carte serveur Model Context Protocol |
| `/.well-known/oauth-authorization-server` | RFC 8414 + agent_auth | Métadonnées d'autorisation anonymes |
| `/.well-known/oauth-protected-resource` | RFC 9728 | Métadonnées de ressource publique |
| `/.well-known/http-message-signatures-directory` | Web Bot Auth | Répertoire de clés pour signatures HTTP |
| `/robots.txt` | Robots | Autorise l'indexation et pointe vers le sitemap |
| `Link` headers | RFC 8288 | Découverte automatique sur les pages HTML |

Les agents peuvent lire et résumer le contenu public. Ils ne doivent soumettre le formulaire projet que sur demande explicite d'un humain.

## Commandes

```bash
npm run dev                    # Serveur de développement (port 3001)
npm run build                  # Build de production
npm run start                  # Serveur production (port 3001)
npm run lint                   # ESLint
npx tsx scripts/init-turso.ts  # Initialiser les tables/index de la base Turso
```

## Déploiement

Optimisé pour **Vercel** avec domaine **services.samensteeve.com**. Email transactionnel via **Resend** et protection anti-bot via **Cloudflare Turnstile**.

Variables d'environnement requises :

```bash
RESEND_API_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
```

`NEXT_PUBLIC_TURNSTILE_SITE_KEY` et `TURNSTILE_SECRET_KEY` sont obligatoires en production. En développement local, elles peuvent être omises : le formulaire fonctionne sans Turnstile.
Si `TURSO_DATABASE_URL` et `TURSO_AUTH_TOKEN` sont configurés, les soumissions de contact seront enregistrées en base de données. Si elles sont absentes ou échouent, l'e-mail de notification sera quand même envoyé sans interrompre l'expérience utilisateur.

### Configuration email (Resend)

L'adresse d'envoi est `contact@samensteeve.com`. Pour améliorer la délivrabilité :

1. **Dans Resend** : ajouter et vérifier le domaine `samensteeve.com` (ou un sous-domaine comme `mail.samensteeve.com`)
2. **Dans Cloudflare** : ajouter les enregistrements DNS fournis par Resend (SPF, DKIM, DMARC)
3. **DMARC** : ajouter un enregistrement `_dmarc.samensteeve.com` avec `v=DMARC1; p=none;` pour commencer en monitoring

L'utilisation d'un sous-domaine (`mail.samensteeve.com`) est recommandée pour protéger la réputation du domaine principal.
