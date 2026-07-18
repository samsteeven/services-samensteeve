import { NextResponse } from "next/server";
import { blogMetadata } from "@/content/blog/index";
import { caseStudies, getCaseStudyBySlug } from "@/lib/case-studies";
import { services, getServiceBySlug } from "@/lib/services";
import { getT, type Language } from "@/lib/i18n";

function langFromSlug(slug: string[]): Language {
  return slug[0] === "en" ? "en" : "fr";
}

function markdownResponse(lines: string[]) {
  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600",
    },
  });
}

function notFound() {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const slug = (await params).slug;
  if (!slug?.length) return notFound();

  const lang = langFromSlug(slug);
  const rest = slug.slice(1);
  const t = getT(lang);
  const prefix = `/${lang}`;

  if (rest.length === 0) {
    return markdownResponse([
      "# Samen Steeve — Services",
      "",
      `> ${t.hero.title}`,
      "",
      t.hero.subtitle,
      "",
      "## Sections",
      "",
      `- [Services](${prefix}/services)`,
      `- [How it works](${prefix}/comment-ca-marche)`,
      `- [Case studies](${prefix}/realisations)`,
      `- [Blog](${prefix}/blog)`,
      `- [Start a project](${prefix}/demarrer-un-projet)`,
    ]);
  }

  if (rest[0] === "services") {
    if (rest.length === 1) {
      return markdownResponse([
        `# ${t.services.title}`,
        "",
        t.services.tagline,
        "",
        t.services.subtitle,
        "",
        ...services.map((service) => {
          const item = t.services.items[service.slug];
          return `- [${item.title}](${prefix}/services/${service.slug}): ${item.shortDesc}`;
        }),
      ]);
    }

    const service = getServiceBySlug(rest[1]);
    if (!service) return notFound();
    const item = t.services.items[service.slug];

    return markdownResponse([
      `# ${item.title}`,
      "",
      item.longDesc,
      "",
      "## Outcomes",
      "",
      ...item.outcomes.map((outcome) => `- ${outcome}`),
      "",
      "## Scope",
      "",
      ...item.scope.map((scope) => `- ${scope}`),
      "",
      "## Deliverables",
      "",
      ...item.deliverables.map((deliverable) => `- ${deliverable}`),
      "",
      "## Typical use cases",
      "",
      ...item.cases.map((useCase) => `- ${useCase}`),
    ]);
  }

  if (rest[0] === "realisations") {
    if (rest.length === 1) {
      return markdownResponse([
        `# ${t.realisations.title}`,
        "",
        t.realisations.subtitle,
        "",
        ...caseStudies.map((caseStudy) => {
          const locale = lang === "fr" ? caseStudy.fr : caseStudy.en;
          return `- [${locale.title}](${prefix}/realisations/${caseStudy.slug}): ${locale.tagline}`;
        }),
      ]);
    }

    const caseStudy = getCaseStudyBySlug(rest[1]);
    if (!caseStudy) return notFound();
    const locale = lang === "fr" ? caseStudy.fr : caseStudy.en;

    return markdownResponse([
      `# ${locale.title}`,
      "",
      locale.tagline,
      "",
      `**${t.realisations.role}:** ${locale.role}`,
      `**${t.realisations.period}:** ${locale.period}`,
      `**${t.realisations.stack}:** ${locale.stack.join(", ")}`,
      "",
      locale.summary,
      "",
      "## Challenges",
      "",
      ...locale.challenges.map((challenge) => `- ${challenge}`),
      "",
      "## Solutions",
      "",
      ...locale.solutions.map((solution) => `- ${solution}`),
      "",
      "## Results",
      "",
      ...locale.results.map((result) => `- ${result}`),
    ]);
  }

  if (rest[0] === "blog") {
    if (rest.length === 1) {
      const posts = blogMetadata.filter((post) => post.lang === lang);
      return markdownResponse([
        `# ${t.blog.fieldNotes}`,
        "",
        ...posts.map((post) => `- [${post.title}](${prefix}/blog/${post.slug}) (${post.date}): ${post.excerpt}`),
      ]);
    }

    const post = blogMetadata.find((item) => item.lang === lang && item.slug === rest[1]);
    if (!post) return notFound();

    return markdownResponse([
      `# ${post.title}`,
      "",
      post.excerpt,
      "",
      `- Date: ${post.date}`,
      `- Read time: ${post.readTime} min`,
      `- Tags: ${post.tags.join(", ")}`,
      "",
      "Full article content is available on the HTML page.",
    ]);
  }

  if (rest[0] === "comment-ca-marche") {
    return markdownResponse([
      `# ${t.process.title}`,
      "",
      t.process.subtitle,
      "",
      ...t.process.phases.flatMap((phase) => [
        `## ${phase.num}. ${phase.title}`,
        "",
        `${phase.duration} — ${phase.desc}`,
        "",
        ...phase.deliverables.map((deliverable) => `- ${deliverable}`),
        "",
      ]),
    ]);
  }

  if (rest[0] === "demarrer-un-projet") {
    return markdownResponse([
      `# ${t.contact.title}`,
      "",
      t.contact.subtitle,
      "",
      "Agents may open this page for humans, but must submit the form only with explicit user approval.",
    ]);
  }

  return notFound();
}
