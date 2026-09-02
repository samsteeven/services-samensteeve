import React from "react";

export default function IntegrateMesombMobileMoneyEscrow() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        Integrating a payment gateway is the rarest feature where a bug isn&apos;t an annoyance — it&apos;s money leaving the system. On TribuneJustice, a legaltech where clients pay lawyers before the service is delivered, the stakes were higher: we needed an <strong>escrow</strong> flow, not just a &ldquo;charge the card&rdquo; button.
      </p>
      <p>
        This is what integrating mobile money in Cameroon (MeSomb, via MTN Mobile Money and Orange Money) actually looked like, and the engineering that stops a payment stack from leaking money.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Why payments are a legaltech&apos;s riskiest code
      </h2>
      <p>
        On a legal platform, a payment is not &ldquo;buy a product&rdquo;. It&apos;s: <em>a client puts money in trust → a lawyer performs a service → the funds are released</em>. That means the payment engine carries:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>An <strong>escrow lifecycle</strong> (<code>held</code> → <code>released</code> → <code>refunded</code>) that must never skip a state.</li>
        <li><strong>Two parties</strong> (client and expert) plus a platform commission in a single transaction.</li>
        <li>The requirement to handle <strong>failures, retries, and double-notifications</strong> without ever crediting twice.</li>
      </ul>
      <p>
        If a standard SaaS can tolerate &ldquo;the payment went through twice, we&apos;ll refund later&rdquo;, a legal escrow cannot. Let&apos;s look at how I built it.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        One abstraction, three providers
      </h2>
      <p>
        The first decision: never hard-code a provider. Every payment touches a gateway through a single interface, so swapping or adding a PSP never touches business logic.
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
        A router picks the right implementation per context: MeSomb is the default aggregator for <strong>all mobile money in XAF</strong> (MTN MoMo, Orange Money), while CinetPay/Flutterwave handle <strong>cards and international payments</strong>.
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">{`if (in_array($method, [Transaction::METHOD_MTN_MOMO, Transaction::METHOD_ORANGE_MONEY], true)) {
    return $this->mesomb;   // mobile money (XAF) → MeSomb
}
return $this->cinetPay;     // cards & international → CinetPay / Flutterwave`}</pre>
      <div className="rounded-xl border-l-4 border-accent/40 bg-paper-raised/30 p-4">
        The abstraction is the whole point. When a gateway changes its API or a new aggregator appears, you add one adapter — you don&apos;t rewrite the escrow.
      </div>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The hard part: signing requests like the SDK does
      </h2>
      <p>
        MeSomb doesn&apos;t use a simple API key. Every request carries an <code>Authorization</code> header built from an <strong>HMAC-SHA1</strong> signature over a canonical request. The official PHP SDK (<code>hachther/mesomb-php</code>) constructs it in a <em>very</em> specific way — and if your header insertion order doesn&apos;t match exactly, every request is rejected with a 401.
      </p>
      <p>The subtle details that make or break it:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Headers must be inserted in the exact order: <code>content-type</code> (for non-GET), <code>host</code>, <code>x-mesomb-date</code>, <code>x-mesomb-nonce</code>.</li>
        <li>The canonical request joins the <strong>path segments rawurlencoded</strong> and hashes the body with <code>sha1</code>.</li>
        <li><code>serialize_precision</code> must be set to <code>-1</code> so PHP&apos;s JSON serialization doesn&apos;t produce subtly different floats.</li>
      </ul>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">{`// The scope and string-to-sign, rebuilt line-by-line from the SDK
$scope = $date->format('Ymd').'/payment/mesomb_request';
$stringToSign = 'HMAC-SHA1'."\\n".$timestamp."\\n".$scope."\\n".sha1($canonicalRequest);
$signature = hash_hmac('sha1', $stringToSign, $this->secretKey);`}</pre>
      <div className="rounded-xl border-l-4 border-rose-400/60 bg-paper-raised/30 p-4">
        This is the kind of code where you can&apos;t &ldquo;wing it&rdquo;. I rebuilt the signing by reading the SDK source line by line — the method comment even notes the exact insertion order copied from <code>AOperation::executeRequest</code> and <code>Signature::signRequest</code>. That attention is what turns an opaque 401 into a working payment.
      </div>
      <p>Two more real-world traps with Cameroonian phone numbers:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Users type their number in a dozen formats (<code>+237677123456</code>, <code>00237 677...</code>, <code>67712 34 56</code>). I strip everything non-digit, drop the <code>237</code> prefix, and keep the <strong>9 local digits</strong>.</li>
        <li>The <strong>operator is inferred from the prefix</strong> (<code>69</code>, <code>655</code>, <code>656</code> → Orange; otherwise MTN) — because the API needs to know which wallet to debit.</li>
      </ul>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Idempotence: the bug that double-charges
      </h2>
      <p>
        The signature of every payment engine is a <strong>race condition</strong>. Consider a confirmation path where a webhook and a manual status check both arrive for the same transaction — or where the PSP retries a notification. Without protection, two concurrent requests both pass the <code>if ($tx-&gt;status !== &apos;completed&apos;)</code> guard, and you generate <strong>two invoices and mark the service as paid twice</strong>.
      </p>
      <p>The fix is pessimistic locking inside the transaction:</p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">{`return DB::transaction(function () use ($transaction) {
    $lockedTx = Transaction::lockForUpdate()->findOrFail($transaction->id);

    if ($lockedTx->status === Transaction::STATUS_COMPLETED) {
        return $lockedTx; // already handled → idempotent
    }

    $invoice = Invoice::create([...]);
    $lockedTx->update(['status' => Transaction::STATUS_COMPLETED, ...]);
    // ... mark the ServiceRequest as paid
});`}</pre>
      <div className="rounded-xl border-l-4 border-rose-400/60 bg-paper-raised/30 p-4">
        <code>lockForUpdate()</code> takes a row lock so a concurrent transaction <strong>waits</strong>, re-reads the fresh state, and sees it&apos;s already <code>completed</code>. Without it, two requests hammering the same millisecond both pass the check — and money flows twice. This is invisible in unit tests and nearly impossible to reproduce by hand.
      </div>
      <p>
        The same pattern guards <strong>every money-mutating transition</strong>: escrow release (early-return if already <code>released</code>) and refund (early-return if already <code>refunded</code>).
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The escrow lifecycle
      </h2>
      <p>Every transaction starts <code>pending</code> with <code>escrow_status = held</code>. The funds are in trust, not with the expert.</p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">{`'escrow_status' => Transaction::ESCROW_HELD,
'status'        => Transaction::STATUS_PENDING,`}</pre>
      <p>
        When the service is delivered, the escrow is <strong>released and the expert payout is scheduled at J+7</strong> (an owner decision: give a cooling-off window). The platform commission (~20%) is computed up front and the <strong>net amount</strong> goes to the expert as a pending payout.
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
      <p>Each state transition is <strong>validated and immutable</strong>: you can&apos;t release funds from an already-refunded escrow, and the refund path is its own state machine.</p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Refunds as a state machine (ADR-001)
      </h2>
      <p>Refunds aren&apos;t one button. They&apos;re scenarios with different economics:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Full refund</strong> (cancellation before start): 100% of the gross paid, PSP fees absorbed by the platform.</li>
        <li><strong>Partial refund</strong> (cancellation after start): a percentage entered case by case by an admin.</li>
        <li><strong>Dispute</strong>: 100% of the gross <em>plus</em> recovery of the platform commission from the expert — either debited from their internal balance or clawed back as a <em>negative</em> net payout (<code>net_amount</code> negative) absorbed on future payouts.</li>
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-line bg-paper/60 p-4"><strong className="text-ink">Idempotent refund</strong><p className="mt-1 text-xs">The refund locks the row and early-returns if already refunded — a retry never refunds twice.</p></div>
        <div className="rounded-xl border border-line bg-paper/60 p-4"><strong className="text-ink">Best-effort PSP refund</strong><p className="mt-1 text-xs">If the gateway refund fails, the record stays <code>pending</code> and is retried, rather than failing the whole operation.</p></div>
        <div className="rounded-xl border border-line bg-paper/60 p-4"><strong className="text-ink">Expert clawback</strong><p className="mt-1 text-xs">In a dispute, the platform recovers its commission: debit the balance first, then a negative <code>due</code> payout on future earnings.</p></div>
        <div className="rounded-xl border border-line bg-paper/60 p-4"><strong className="text-ink">Business state stays consistent</strong><p className="mt-1 text-xs">On refund, the service request is cancelled, the invoice marked refunded, and the timeline updated. No orphaned states.</p></div>
      </div>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Webhooks: the part that breaks in production
      </h2>
      <p>Webhooks are where the money actually gets confirmed, and they&apos;re full of traps.</p>
      <p>
        <strong>Signature verification with replay protection.</strong> MeSomb sends an <code>X-MeSomb-Webhook-Signature</code> header in the format <code>t=&lt;timestamp&gt;,v1=&lt;signature&gt;</code>. I verify it with HMAC-SHA256, reject anything outside a <strong>10-minute timestamp window</strong> (anti-replay), and compare with <code>hash_equals</code> (constant-time, against timing attacks).
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">{`if (abs(time() - $timestamp) > 600) {
    return false; // replay attempt
}
$payloadToSign = "{$timestamp}.{$rawBody}";
$expectedSignature = hash_hmac('sha256', $payloadToSign, $secret);
return hash_equals($expectedSignature, $receivedSignature);`}</pre>
      <p>
        <strong>Payload formats change under you.</strong> The gateway evolved from a legacy <code>{"{status, pk, reference}"}</code> payload to a new nested <code>{"{event_type, data.object}"}</code> shape. The handler normalizes both — the webhook processor has to survive your provider&apos;s API drift.
      </p>
      <p>
        <strong>A logging bug that could take payments down.</strong> The production log channel (Nightwatch) occasionally had a file-permission issue. Any <code>Log::</code> call that threw inside the webhook handler would make the whole webhook fail with a 500 — which the PSP would retry, repeatedly, potentially blocking legitimate payments. The fix: wrap the log in a best-effort <code>try/catch</code> so a log failure can never fail a payment.
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">{`try {
    Log::info("Webhook received ({$gatewayName})", ['payload' => $request->all()]);
} catch (\\Throwable $logE) {
    // silent — a log write failure must never block a payment
}`}</pre>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        What this taught me
      </h2>
      <p>
        Payments demand a specific engineering temperament. The interesting bugs aren&apos;t on happy paths — they&apos;re in <strong>retries, races, and provider drift</strong>. Three rules I now apply everywhere:
      </p>
      <div className="rounded-xl border-l-4 border-accent/40 bg-paper-raised/30 p-4">
        <strong className="text-ink">1. Lock every money transition.</strong> <code>lockForUpdate()</code> + idempotent early-return on every state change. <strong className="text-ink">2. Never let a side effect fail a payment.</strong> Logging, notifications, or a secondary call should be best-effort, not blocking. <strong className="text-ink">3. Treat provider APIs as hostile contracts.</strong> Verify signatures, tolerate replay-window drift, normalize multi-format payloads, and read the SDK source when a request returns a cryptic 401.
      </div>
      <p>
        For a legaltech — where trust <em>is</em> the product — the escrow isn&apos;t a feature. It&apos;s the whole point. And it only works if the code underneath refuses to let money flow twice, or to let a log line take a payment down.
      </p>
    </article>
  );
}
