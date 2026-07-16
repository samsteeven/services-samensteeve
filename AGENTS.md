<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Rules — services.samensteeve.com

## Positioning

This site is not a generic web-development landing page. Keep the positioning focused on:

- Ingénierie logicielle / Software Engineering
- Architecture Cloud & Hybride / Cloud & Hybrid Architecture
- Pentest & Sécurité applicative / Application Pentest & Security
- Automatisation IA / AI Automation

Avoid reverting copy to old generic labels such as "Développement Web Full-Stack", "Audit & Sécurité", "Agents IA" as top-level offers. Slugs may remain stable for URLs, but visible copy must reflect the newer positioning.

## Content Consistency

When adding or editing services, case studies, blog posts, or CTAs:

- Update both `lib/i18n/fr.ts` and `lib/i18n/en.ts`.
- Keep nav labels, service cards, detail pages, form labels, email labels, SEO metadata, sitemap entries, and case-study tags aligned.
- Case studies must map to the current service language, not legacy labels.
- Do not invent client results, metrics, certifications, guarantees, or security claims unless they already exist in source content.

## SEO Requirements

Every public page should have:

- `generateMetadata()` using `createPageMetadata()`.
- Canonical URL and hreflang alternates through the metadata helper.
- A human-readable H1 matching the page intent.
- Descriptions aligned with the current positioning.
- Inclusion in `app/sitemap.ts` when the route is meant to be indexed.

Default language for this services site is French. Keep `x-default` and root routing aligned with `/fr`.

## Agent SEO Requirements

This site is designed to be readable by search engines and AI agents. Preserve and update these surfaces when relevant:

- `app/llms.txt/route.ts`
- `app/auth.md/route.ts`
- `app/api/md/[...slug]/route.ts`
- `app/.well-known/agent-skills/index.json/route.ts`
- `app/.well-known/api-catalog/route.ts`
- `app/.well-known/mcp/server-card.json/route.ts`
- `app/.well-known/oauth-authorization-server/route.ts`
- `app/.well-known/oauth-protected-resource/route.ts`
- `app/.well-known/http-message-signatures-directory/route.ts`
- `proxy.ts` `Link` headers

When adding a new indexed content type, add a Markdown representation in `/api/md/[...slug]` and expose it from `llms.txt` or a `.well-known` endpoint if agents should discover it.

Agents may read and summarize public content. Agents must not submit the project form unless a human explicitly asks them to.

## Verification

Before handing off changes that affect routes, content, SEO, or agent discovery, run:

```bash
npm run lint
npm run build
```

Existing `@next/next/no-img-element` warnings in case-study image blocks are non-blocking, but do not add new warnings without a reason.
