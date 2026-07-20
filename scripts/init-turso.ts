/**
 * Script d'initialisation de la base de données Turso
 * Exécute: npx tsx scripts/init-turso.ts
 */

import { initializeDatabase } from "../lib/db/turso";

async function main() {
  console.log("🚀 Initialisation de la base de données Turso...");
  
  try {
    await initializeDatabase();
    console.log("✅ Base de données initialisée avec succès !");
    console.log("\nTable 'contact_submissions' créée avec les colonnes suivantes:");
    console.log("- id, name, email, company, role, whatsapp, source, lang, website");
    console.log("- types, description, has_codebase, timeline, team_size, budget");
    console.log("- goals, service_details, context_answers, links");
    console.log("- ip_address, user_agent, created_at, status");
    console.log("\nIndexes créés sur: email, status, created_at");
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation:", error);
    process.exit(1);
  }
}

main();
