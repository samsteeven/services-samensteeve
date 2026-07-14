import React from "react";

export default function AuditOwaspFintechCameroun() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        Dans le secteur de la fintech en Afrique centrale, le rythme effréné des lancements pousse parfois la sécurité au second plan. Récemment, j'ai réalisé un audit de sécurité offensif de 3 jours sur une plateforme transactionnelle locale de transfert de fonds. Voici les trois vulnérabilités majeures réelles identifiées et comment nous les avons corrigées.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        1. Faille BOLA (Broken Object-Level Authorization) sur les reçus
      </h2>
      <p>
        BOLA (anciennement IDOR) trône au sommet du classement OWASP Top 10 API. Sur la plateforme auditée, après un transfert, l'application générait un reçu PDF accessible via l'URL suivante :
      </p>
      <div className="rounded-xl border border-line bg-paper/60 p-4 font-mono text-xs text-ink/80">
        GET https://api.fintech-locale.cm/v1/receipts/84209
      </div>
      <p className="mt-4">
        <strong>La faille :</strong> Il suffisait de modifier l'ID numérique à la fin de l'URL (ex: passer à <code>84210</code>) pour télécharger les reçus d'autres utilisateurs. L'API vérifiait que le jeton d'authentification (JWT) était valide, mais elle ne vérifiait pas que l'utilisateur connecté était le propriétaire légitime du reçu demandé.
      </p>
      <p>
        <strong>Le correctif :</strong> Remplacement des IDs séquentiels par des UUID v4 non devinables et mise en place d'un contrôle d'autorisation strict au niveau du contrôleur (Laravel Policy) :
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`// Laravel Policy : Validation stricte de l'ownership
public function view(User $user, Receipt $receipt)
{
    // L'utilisateur doit être l'émetteur ou le destinataire du transfert
    return $user->id === $receipt->sender_id || $user->id === $receipt->recipient_id;
}`}
      </pre>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        2. Force brute sur la vérification OTP (Absence de Rate Limiting)
      </h2>
      <p>
        Pour valider un retrait d'argent, l'API envoyait un code SMS à 4 chiffres (OTP). La requête de validation ressemblait à ceci :
      </p>
      <div className="rounded-xl border border-line bg-paper/60 p-4 font-mono text-xs text-ink/80">
        POST https://api.fintech-locale.cm/v1/otp/verify {"{"} "transaction_id": 451, "code": "1234" {"}"}
      </div>
      <p className="mt-4">
        <strong>La faille :</strong> L'endpoint de validation ne possédait aucune limite de requêtes (rate limiting). Un attaquant pouvait faire défiler les 10 000 combinaisons possibles (de <code>0000</code> à <code>9999</code>) en moins de 30 secondes via un simple script d'attaque parallèle, et valider un transfert frauduleux.
      </p>
      <p>
        <strong>Le correctif :</strong> Limitation stricte du nombre de tentatives OTP à 3 essais maximum par transaction, couplé à une expiration du code après 2 minutes, et mise en place d'un middleware de limitation de débit IP et utilisateur (Rate Limiter).
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        3. Injection SQL cachée dans les filtres de rapports dynamiques
      </h2>
      <p>
        Le tableau de bord marchand proposait des rapports personnalisés où l'utilisateur pouvait filtrer ses transactions par colonne. Le code sous-jacent concaténait la colonne de tri directement dans la requête SQL :
      </p>
      <pre className="p-4 rounded-xl border border-line bg-rose-500/10 border-rose-500/20 font-mono text-xs text-rose-700 dark:text-rose-400 overflow-x-auto">
{`// CODE VULNÉRABLE DÉTECTÉ
$sortBy = $request->input('sort_by'); // Ex: "created_at"
$results = DB::select("SELECT * FROM transactions WHERE merchant_id = $id ORDER BY " . $sortBy);`}
      </pre>
      <p className="mt-4">
        <strong>La faille :</strong> L'attaquant injectait du code SQL complexe dans le paramètre <code>sort_by</code> (ex: <code>created_at; DROP TABLE users;</code> ou des attaques par inférence de temps pour exfiltrer les hashs de mots de passe de la base de données).
      </p>
      <p>
        <strong>Le correctif :</strong> Validation stricte de la variable par rapport à une liste blanche de colonnes autorisées avant l'exécution :
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`// Validation par liste blanche
$allowedSorts = ['created_at', 'amount', 'status'];
$sortBy = in_array($request->input('sort_by'), $allowedSorts) ? $request->input('sort_by') : 'created_at';

$results = DB::table('transactions')
    ->where('merchant_id', $merchantId)
    ->orderBy($sortBy)
    ->get();`}
      </pre>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Bilan et recommandations
      </h2>
      <p>
        Ces vulnérabilités ne sont pas des failles cryptographiques complexes, mais des erreurs de logique applicative classiques. Un audit régulier du code et le respect des normes OWASP (vérification systématique des droits d'accès aux objets, limitation stricte de débit sur les flux d'authentification et requêtes paramétrées) sont indispensables pour protéger la confiance des utilisateurs et la sécurité des transactions.
      </p>
    </article>
  );
}
