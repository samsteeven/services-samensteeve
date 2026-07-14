import React from "react";

export default function DoubleFacturationConcurrence() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        En production, un bug logique classique peut sommeiller des mois avant de se manifester brutalement sous l'effet de la charge. C'est le cas du problème de double débit concurrent. Deux requêtes de paiement identiques arrivant à la même milliseconde peuvent contourner vos validations de solde applicatives et vider le compte d'un utilisateur. En voici l'analyse technique complète.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Le scénario du désastre (Race Condition)
      </h2>
      <p>
        Imaginez un utilisateur possédant un solde de 10 000 FCFA. Il essaie d'acheter un service à 8 000 FCFA. S'il clique deux fois très rapidement sur le bouton &ldquo;Payer&rdquo;, deux serveurs web (ou deux workers de process) traitent ces requêtes en parallèle :
      </p>

      <div className="border border-line rounded-xl bg-paper/60 p-5 font-mono text-xs text-ink/80 space-y-3">
        <div className="grid grid-cols-2 gap-4 border-b border-line/40 pb-2 font-bold text-ink/60">
          <div>Requête A (Worker 1)</div>
          <div>Requête B (Worker 2)</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>1. Lit le solde en BDD : 10 000 FCFA</div>
          <div>1. Lit le solde en BDD : 10 000 FCFA</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>2. Vérifie : 10 000 &gt;= 8 000 ? (Oui)</div>
          <div>2. Vérifie : 10 000 &gt;= 8 000 ? (Oui)</div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-rose-500 font-semibold">
          <div>3. Débite le compte : Solde = 2 000 FCFA</div>
          <div>3. Débite le compte : Solde = 2 000 FCFA</div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-ink-soft">
          <div>4. Commit de la transaction</div>
          <div>4. Commit de la transaction</div>
        </div>
      </div>

      <p className="mt-4">
        À la fin de l'opération, le solde final de l'utilisateur est de 2 000 FCFA au lieu d'avoir bloqué la deuxième transaction pour solde insuffisant (ou d'avoir un solde négatif de -6 000 FCFA). L'entreprise a perdu de l'argent et la comptabilité est faussée.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        La mauvaise solution : l'optimisme applicatif
      </h2>
      <p>
        Tenter de résoudre cela en vérifiant le statut de la transaction en mémoire (ex: via des variables de session ou un cache Redis non verrouillé) est insuffisant. De même, les transactions de base de données classiques avec le niveau d'isolation par défaut (<code>READ COMMITTED</code> dans PostgreSQL) n'empêchent pas cette race condition, car les deux requêtes lisent l'état validé de la base de données avant que l'autre n'ait sauvegardé son écriture.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        La solution robuste : le verrouillage pessimiste (Pessimistic Locking)
      </h2>
      <p>
        Pour sécuriser cette transaction financière, nous devons forcer la base de données à sérialiser l'accès à la ligne du portefeuille de l'utilisateur. C'est le rôle de l'instruction <code>SELECT ... FOR UPDATE</code>.
      </p>
      <p>
        Voici l'implémentation propre en Laravel et PHP 8+ encapsulée dans une transaction :
      </p>

      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`use Illuminate\\Support\\Facades\\DB;
use App\\Exceptions\\InsufficientBalanceException;

DB::transaction(function () use ($userId, $amount) {
    // 1. Récupérer le portefeuille de l'utilisateur en verrouillant la ligne SQL
    // Cette requête bloque tout autre SELECT ... FOR UPDATE sur ce compte spécifique
    $wallet = DB::table('wallets')
        ->where('user_id', $userId)
        ->lockForUpdate()
        ->first();

    // 2. Vérification stricte du solde à l'abri des écritures concurrentes
    if ($wallet->balance < $amount) {
        throw new InsufficientBalanceException("Solde insuffisant.");
    }

    // 3. Débiter le compte
    DB::table('wallets')
        ->where('user_id', $userId)
        ->decrement('balance', $amount);

    // 4. Enregistrer la transaction pour audit
    DB::table('ledger_entries')->insert([
        'user_id' => $userId,
        'amount' => -$amount,
        'type' => 'debit',
        'created_at' => now(),
    ]);
});`}
      </pre>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Que se passe-t-il sous le capot ?
      </h2>
      <p>
        Lorsque le premier worker exécute <code>lockForUpdate()</code> (qui compile en <code>SELECT * FROM wallets WHERE user_id = ? FOR UPDATE</code>), PostgreSQL pose un verrou exclusif sur cette ligne spécifique.
      </p>
      <p>
        Si la requête B arrive une milliseconde plus tard et tente d'exécuter le même <code>lockForUpdate()</code>, la base de données met la requête B en attente (state: <code>lock wait</code>). Dès que le worker 1 valide sa transaction (commit) ou échoue (rollback), le verrou est libéré. La requête B lit alors le nouveau solde mis à jour (2 000 FCFA), détecte que <code>2 000 &lt; 8 000</code>, et échoue proprement en levant une exception.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Règles d'or pour la production
      </h2>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Définir un timeout :</strong> Ne laissez pas une requête attendre indéfiniment un verrou. Configurez un timeout SQL court (ex: <code>SET lock_timeout = '3s'</code>).</li>
        <li><strong>Toujours indexer la clause WHERE :</strong> Si votre requête de verrouillage n'utilise pas un index unique, la base de données risque de verrouiller toute la table (Table Lock) au lieu d'une seule ligne (Row Lock), paralysant l'ensemble de l'application.</li>
        <li><strong>Contraintes de validation en BDD :</strong> Ajoutez une contrainte SQL <code>CHECK (balance &gt;= 0)</code> au niveau de la table. Si le code applicatif faillit, la base de données rejettera l'écriture pour protéger son intégrité.</li>
      </ul>
    </article>
  );
}
