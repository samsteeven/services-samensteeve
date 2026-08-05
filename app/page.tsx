// La racine "/" est maintenant l'anglais par défaut.
// Le middleware réécrit "/" → "/en" en interne, donc ce fichier ne fait plus rien.
// On garde le fichier pour satisfaire Next.js App Router (route de racine requise).
export default function RootPage() {
  return null;
}
