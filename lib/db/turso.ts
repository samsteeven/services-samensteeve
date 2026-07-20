import { createClient } from "@libsql/client";

const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

let client: ReturnType<typeof createClient> | null = null;

export function isTursoConfigured(): boolean {
  return !!(tursoUrl && tursoAuthToken);
}

export function getTursoClient() {
  if (!tursoUrl) {
    throw new Error("TURSO_DATABASE_URL is not configured");
  }

  if (!client) {
    client = createClient({
      url: tursoUrl,
      authToken: tursoAuthToken,
    });
  }

  return client;
}

let isInitialized = false;

export async function initializeDatabase() {
  if (isInitialized) return;

  const db = getTursoClient();

  // Créer la table des demandes de contact
  await db.execute(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      role TEXT,
      whatsapp TEXT,
      source TEXT NOT NULL,
      lang TEXT NOT NULL,
      website TEXT,
      types TEXT NOT NULL,
      description TEXT NOT NULL,
      has_codebase TEXT,
      timeline TEXT NOT NULL,
      team_size TEXT,
      budget TEXT NOT NULL,
      goals TEXT NOT NULL,
      service_details TEXT,
      context_answers TEXT,
      links TEXT,
      ip_address TEXT,
      user_agent TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      status TEXT NOT NULL DEFAULT 'new'
    )
  `);

  // Créer un index sur l'email pour faciliter les recherches
  await db.execute(`
    CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
    ON contact_submissions(email)
  `);

  // Créer un index sur le statut
  await db.execute(`
    CREATE INDEX IF NOT EXISTS idx_contact_submissions_status 
    ON contact_submissions(status)
  `);

  // Créer un index sur la date de création
  await db.execute(`
    CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
    ON contact_submissions(created_at DESC)
  `);

  isInitialized = true;
}

export async function saveContactSubmission(data: {
  name: string;
  email: string;
  company?: string;
  role?: string;
  whatsapp?: string;
  source?: string;
  lang: string;
  website?: string;
  types: string[];
  description: string;
  hasCodebase?: string;
  timeline: string;
  teamSize?: string;
  budget: string;
  goals: string[];
  serviceDetails: Record<string, string>;
  contextAnswers: Record<string, string>;
  links: string[];
  ipAddress?: string;
  userAgent?: string;
}) {
  const db = getTursoClient();

  const result = await db.execute({
    sql: `
      INSERT INTO contact_submissions (
        name, email, company, role, whatsapp, source, lang, website,
        types, description, has_codebase, timeline, team_size, budget,
        goals, service_details, context_answers, links, ip_address, user_agent
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `,
    args: [
      data.name,
      data.email,
      data.company || null,
      data.role || null,
      data.whatsapp || null,
      data.source || null,
      data.lang,
      data.website || null,
      JSON.stringify(data.types),
      data.description,
      data.hasCodebase || null,
      data.timeline,
      data.teamSize || null,
      data.budget,
      JSON.stringify(data.goals),
      JSON.stringify(data.serviceDetails),
      JSON.stringify(data.contextAnswers),
      JSON.stringify(data.links),
      data.ipAddress || null,
      data.userAgent || null,
    ],
  });

  return result.lastInsertRowid;
}
