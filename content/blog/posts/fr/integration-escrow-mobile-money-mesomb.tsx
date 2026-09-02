import React from "react";

export default function IntegrationEscrowMobileMoneyMesomb() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        Intégrer une passerelle de paiement, c&apos;est la fonctionnalité rare où un bug n&apos;est pas un désagrément : c&apos;est de l&apos;argent qui sort du système. Sur TribuneJustice, une legaltech où les clients paient des avocats pour une prestation à venir, l&apos;enjeu était plus haut : il fallait un flux d&apos;<strong>escrow</strong>, pas juste un bouton « débiter la carte ».
      </p>
      <p>
        Voici à quoi ressemblait concrètement l&apos;intégration du mobile money au Cameroun (MeSomb, via MTN Mobile Money et Orange Money), et l&apos;ingénierie qui empêche une stack de paiement de fuiter.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Pourquoi le paiement est le code le plus risqué d&apos;une legaltech
      </h2>
      <p>
        Sur une plateforme juridique, un paiement n&apos;est pas « acheter un produit ». C&apos;est : <em>un client place de l&apos;argent en dépôt → un avocat réalise la prestation → les fonds sont libérés</em>. Autrement dit, le moteur de paiement porte :
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Un <strong>cycle de vie d&apos;escrow</strong> (<code>held</code> → <code>released</code> → <code>refunded</code>) qui ne doit jamais sauter d&apos;état.</li>
        <li><strong>Deux parties</strong> (client et expert) plus une commission plateforme sur une seule transaction.</li>
        <li>L&apos;obligation de gérer <strong>échecs, reprises et double-notifications</strong> sans jamais créditer deux fois.</li>
      </ul>
      <p>
        Si un SaaS tolère « le paiement est passé deux fois, on remboursera », un escrow juridique ne le peut pas. Voilà comment je l&apos;ai construit.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Une abstraction, trois fournisseurs
      </h2>
      <p>
        Première décision : ne jamais coder en dur un fournisseur. Chaque paiement passe par une interface unique — ainsi, changer ou ajouter un PSP ne touche jamais la logique métier.
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">{`interface PaymentGatewayInterface
{
    public function getGatewayName(): string;
    public function initiatePayment(PaymentInitDTO $dto, string $internalReference): PaymentResultDTO;
    public function verifyWebhook(Request $request): bool;
    public function handleWebhook(Request $request): PaymentResultDTO;
    public function checkStatus(string $paymentReference): PaymentResultDTO;
}`}</pre>
      <p>
        Un routeur choisit la bonne implémentation selon le contexte : MeSomb est l&apos;agrégateur par défaut pour <strong>tout le mobile money en XAF</strong> (MTN MoMo, Orange Money), tandis que CinetPay/Flutterwave gèrent <strong>cartes et paiements internationaux</strong>.
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">{`if (in_array($method, [Transaction::METHOD_MTN_MOMO, Transaction::METHOD_ORANGE_MONEY], true)) {
    return $this->mesomb;   // mobile money (XAF) → MeSomb
}
return $this->cinetPay;     // cartes & international → CinetPay / Flutterwave`}</pre>
      <div className="rounded-xl border-l-4 border-accent/40 bg-paper-raised/30 p-4">
        L&apos;abstraction fait tout le travail. Quand une passerelle change d&apos;API ou qu&apos;un nouvel agrégateur apparaît, on ajoute un adaptateur — on ne réécrit pas l&apos;escrow.
      </div>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        La partie dure : signer ses requêtes comme le SDK
      </h2>
      <p>
        MeSomb n&apos;utilise pas une simple clé d&apos;API. Chaque requête porte un en-tête <code>Authorization</code> construit à partir d&apos;une signature <strong>HMAC-SHA1</strong> sur une requête canonique. Le SDK PHP officiel (<code>hachther/mesomb-php</code>) la construit d&apos;une manière <em>très</em> précise — et si l&apos;ordre d&apos;insertion de tes en-têtes ne correspond pas exactement, toutes les requêtes sont rejetées avec un 401.
      </p>
      <p>Les détails subtils qui font toute la différence :</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Les en-têtes doivent être insérés dans l&apos;ordre exact : <code>content-type</code> (pour le non-GET), <code>host</code>, <code>x-mesomb-date</code>, <code>x-mesomb-nonce</code>.</li>
        <li>La requête canonique joint les <strong>segments de chemin rawurlencoded</strong> et hache le corps avec <code>sha1</code>.</li>
        <li><code>serialize_precision</code> doit être à <code>-1</code> pour que la sérialisation JSON de PHP ne produise pas des flottants subtilement différents.</li>
      </ul>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">{`// Le scope et le string-to-sign reproduits ligne par ligne depuis le SDK
$scope = $date->format('Ymd').'/payment/mesomb_request';
$stringToSign = 'HMAC-SHA1'."\\n".$timestamp."\\n".$scope."\\n".sha1($canonicalRequest);
$signature = hash_hmac('sha1', $stringToSign, $this->secretKey);`}</pre>
      <div className="rounded-xl border-l-4 border-rose-400/60 bg-paper-raised/30 p-4">
        C&apos;est le genre de code où on ne peut pas « improviser ». J&apos;ai reconstruit la signature en lisant le code du SDK source ligne par ligne — le commentaire de la méthode note d&apos;ailleurs l&apos;ordre d&apos;insertion exact copié depuis <code>AOperation::executeRequest</code> et <code>Signature::signRequest</code>. C&apos;est cette attention qui transforme un 401 opaque en un vrai paiement fonctionnel.
      </div>
      <p>Deux autres pièges bien réels avec les numéros de téléphone camerounais :</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Les utilisateurs saisissent leur numéro sous une dizaine de formats (<code>+237677123456</code>, <code>00237 677...</code>, <code>67712 34 56</code>). Je retire tout ce qui n&apos;est pas un chiffre, j&apos;enlève le préfixe <code>237</code>, et je garde les <strong>9 chiffres locaux</strong>.</li>
        <li>L&apos;<strong>opérateur est déduit du préfixe</strong> (<code>69</code>, <code>655</code>, <code>656</code> → Orange ; sinon MTN) — car l&apos;API a besoin de savoir quel portefeuille débiter.</li>
      </ul>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        L&apos;idempotence : le bug qui double-encaisse
      </h2>
      <p>
        La signature de tout moteur de paiement, c&apos;est une <strong>course conditionnelle</strong>. Imagine une confirmation où un webhook et une vérification manuelle de statut arrivent pour la même transaction — ou où le PSP rejoue une notification. Sans protection, deux requêtes concurrentes passent toutes les deux le garde <code>if ($tx-&gt;status !== &apos;completed&apos;)</code>, et on génère <strong>deux factures et on marque la prestation comme payée deux fois</strong>.
      </p>
      <p>Le correctif est un verrouillage pessimiste à l&apos;intérieur de la transaction :</p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">{`return DB::transaction(function () use ($transaction) {
    $lockedTx = Transaction::lockForUpdate()->findOrFail($transaction->id);

    if ($lockedTx->status === Transaction::STATUS_COMPLETED) {
        return $lockedTx; // déjà traitée → idempotent
    }

    $invoice = Invoice::create([...]);
    $lockedTx->update(['status' => Transaction::STATUS_COMPLETED, ...]);
    // ... marquer la ServiceRequest comme payée
});`}</pre>
      <div className="rounded-xl border-l-4 border-rose-400/60 bg-paper-raised/30 p-4">
        <code>lockForUpdate()</code> prend un verrou de ligne pour qu&apos;une transaction concurrente <strong>attende</strong>, relise l&apos;état frais, et constate qu&apos;il est déjà <code>completed</code>. Sans ça, deux requêtes au même millisecond passent toutes deux le test — et l&apos;argent coule deux fois. C&apos;est invisible dans les tests unitaires et quasi impossible à reproduire à la main.
      </div>
      <p>
        Le même motif protège <strong>chaque transition qui touche à l&apos;argent</strong> : la libération d&apos;escrow (retour anticipé si déjà <code>released</code>) et le remboursement (retour anticipé si déjà <code>refunded</code>).
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Le cycle de vie de l&apos;escrow
      </h2>
      <p>Chaque transaction démarre <code>pending</code> avec <code>escrow_status = held</code>. Les fonds sont en dépôt, pas chez l&apos;expert.</p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">{`'escrow_status' => Transaction::ESCROW_HELD,
'status'        => Transaction::STATUS_PENDING,`}</pre>
      <p>
        Quand la prestation est livrée, l&apos;escrow est <strong>libéré et le reversement expert programmé à J+7</strong> (une décision owner : laisser une fenêtre de refroidissement). La commission plateforme (~20 %) est calculée en amont et le <strong>montant net</strong> part chez l&apos;expert sous forme de payout en attente.
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">{`$scheduledAt = $now->copy()->addDays(self::PAYOUT_DELAY_DAYS); // 7

$lockedTx->update([
    'escrow_status' => Transaction::ESCROW_RELEASED,
    'payout_due_at' => $scheduledAt,
]);

ProfessionalPayout::updateOrCreate([...], [
    'commission_amount' => $commissionAmount,
    'net_amount'        => $netAmount,
    'status'            => 'pending',
    'scheduled_at'      => $scheduledAt,
]);`}</pre>
      <p>Chaque transition d&apos;état est <strong>validée et immuable</strong> : impossible de libérer des fonds depuis un escrow déjà remboursé, et le chemin de remboursement a sa propre machine à états.</p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Le remboursement comme machine à états (ADR-001)
      </h2>
      <p>Rembourser n&apos;est pas un bouton. Ce sont des scénarios aux économies différentes :</p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Remboursement total</strong> (annulation avant le début) : 100 % du brut payé, frais PSP absorbés par la plateforme.</li>
        <li><strong>Remboursement partiel</strong> (annulation après le début) : un pourcentage saisi au cas par cas par un admin.</li>
        <li><strong>Litige</strong> : 100 % du brut <em>plus</em> recouvrement de la commission plateforme auprès de l&apos;expert — soit débitée de sa balance interne, soit récupérée via un payout net <em>négatif</em> (<code>net_amount</code> négatif) absorbé sur ses futurs versements.</li>
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-line bg-paper/60 p-4"><strong className="text-ink">Remboursement idempotent</strong><p className="mt-1 text-xs">Le remboursement verrouille la ligne et retourne anticipé si déjà remboursé — une reprise ne rembourse jamais deux fois.</p></div>
        <div className="rounded-xl border border-line bg-paper/60 p-4"><strong className="text-ink">Refund PSP best-effort</strong><p className="mt-1 text-xs">Si le remboursement passerelle échoue, la ligne reste <code>pending</code> et sera rejouée, plutôt que de faire échouer toute l&apos;opération.</p></div>
        <div className="rounded-xl border border-line bg-paper/60 p-4"><strong className="text-ink">Clawback expert</strong><p className="mt-1 text-xs">En cas de litige, la plateforme récupère sa commission : débit de la balance d&apos;abord, puis payout <code>due</code> négatif sur les gains futurs.</p></div>
        <div className="rounded-xl border border-line bg-paper/60 p-4"><strong className="text-ink">Cohérence métier préservée</strong><p className="mt-1 text-xs">Au remboursement, la demande de service est annulée, la facture marquée remboursée, la timeline mise à jour. Aucun état orphelin.</p></div>
      </div>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Les webhooks : ce qui casse en production
      </h2>
      <p>Les webhooks sont là où l&apos;argent est réellement confirmé, et ils sont pleins de pièges.</p>
      <p>
        <strong>Vérification de signature avec protection anti-rejeu.</strong> MeSomb envoie un en-tête <code>X-MeSomb-Webhook-Signature</code> au format <code>t=&lt;timestamp&gt;,v1=&lt;signature&gt;</code>. Je vérifie avec HMAC-SHA256, je rejette tout ce qui sort d&apos;une fenêtre d&apos;horodatage de <strong>10 minutes</strong> (anti-rejeu), et je compare avec <code>hash_equals</code> (temps constant, contre les attaques temporelles).
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">{`if (abs(time() - $timestamp) > 600) {
    return false; // tentative de rejeu
}
$payloadToSign = "{$timestamp}.{$rawBody}";
$expectedSignature = hash_hmac('sha256', $payloadToSign, $secret);
return hash_equals($expectedSignature, $receivedSignature);`}</pre>
      <p>
        <strong>Les formats de payload changent sous vos pieds.</strong> La passerelle a évolué d&apos;un payload legacy <code>{"{status, pk, reference}"}</code> vers une forme imbriquée <code>{"{event_type, data.object}"}</code>. Le handler normalise les deux — le processeur de webhook doit survivre à la dérive d&apos;API de votre fournisseur.
      </p>
      <p>
        <strong>Un bug de log qui pouvait faire tomber les paiements.</strong> Le canal de log de production (Nightwatch) avait parfois un problème de permissions fichier. Tout <code>Log::</code> qui levait une exception à l&apos;intérieur du handler faisait échouer tout le webhook avec un 500 — que le PSP rejouait en boucle, bloquant potentiellement des paiements légitimes. Le correctif : envelopper le log dans un <code>try/catch</code> best-effort pour qu&apos;un échec d&apos;écriture ne puisse jamais faire échouer un paiement.
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">{`try {
    Log::info("Webhook reçu ({$gatewayName})", ['payload' => $request->all()]);
} catch (\\Throwable $logE) {
    // silencieux — un échec de log ne doit jamais bloquer un paiement
}`}</pre>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Ce que ça m&apos;a appris
      </h2>
      <p>
        Le paiement exige un tempérament d&apos;ingénierie spécifique. Les bugs intéressants ne sont pas sur les chemins heureux — ils sont dans <strong>les reprises, les courses et la dérive des fournisseurs</strong>. Trois règles que j&apos;applique désormais partout :
      </p>
      <div className="rounded-xl border-l-4 border-accent/40 bg-paper-raised/30 p-4">
        <strong className="text-ink">1. Verrouille chaque transition d&apos;argent.</strong> <code>lockForUpdate()</code> + retour anticipé idempotent sur chaque changement d&apos;état. <strong className="text-ink">2. Ne laisse jamais un effet de bord faire échouer un paiement.</strong> Log, notifications ou appels secondaires doivent être best-effort, pas bloquants. <strong className="text-ink">3. Traite les API de fournisseurs comme des contrats hostiles.</strong> Vérifie les signatures, tolère la fenêtre de rejeu, normalise les payloads multi-formats, et lis le code du SDK quand une requête renvoie un 401 cryptique.
      </div>
      <p>
        Pour une legaltech — où la confiance <em>est</em> le produit — l&apos;escrow n&apos;est pas une fonctionnalité. C&apos;est tout l&apos;enjeu. Et il ne tient que si le code en dessous refuse de laisser l&apos;argent couler deux fois, ou de laisser une ligne de log faire tomber un paiement.
      </p>
    </article>
  );
}
