import React from "react";

export default function OwaspAuditCameroonFintech() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        In the fast-moving Central African fintech space, rushing features to market can sometimes leave security sidelined. Recently, I conducted a 3-day offensive security audit of a local money transfer and payment platform. Here are the three real-world vulnerabilities uncovered during the pentest and how we resolved them.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        1. BOLA (Broken Object-Level Authorization) on Digital Receipts
      </h2>
      <p>
        BOLA (formerly known as IDOR) ranks at the top of the OWASP API Security Top 10. In this application, after a user completed a fund transfer, a receipt could be downloaded via the following endpoint:
      </p>
      <div className="rounded-xl border border-line bg-paper/60 p-4 font-mono text-xs text-ink/80">
        GET https://api.fintech-locale.cm/v1/receipts/84209
      </div>
      <p className="mt-4">
        <strong>The Vulnerability:</strong> An attacker could simply increment the numerical ID in the URL (e.g. changing it to <code>84210</code>) to access receipts belonging to other users. The API verified that the caller's JWT token was valid, but it failed to assert that the authenticated user was the actual owner or recipient of the requested receipt.
      </p>
      <p>
        <strong>The Fix:</strong> Swapped sequential IDs for non-predictable UUID v4 strings, and implemented authorization checks at the controller level (Laravel Policy):
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`// Laravel Policy: Asserting strict object ownership
public function view(User $user, Receipt $receipt)
{
    // User must be the sender or the recipient of the matching transaction
    return $user->id === $receipt->sender_id || $user->id === $receipt->recipient_id;
}`}
      </pre>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        2. OTP Verification Brute-Forcing (No Rate Limiting)
      </h2>
      <p>
        To authorize a cash withdrawal, the API generated a 4-digit SMS OTP. The verification request was structured as follows:
      </p>
      <div className="rounded-xl border border-line bg-paper/60 p-4 font-mono text-xs text-ink/80">
        POST https://api.fintech-locale.cm/v1/otp/verify {"{"} "transaction_id": 451, "code": "1234" {"}"}
      </div>
      <p className="mt-4">
        <strong>The Vulnerability:</strong> The verification endpoint did not enforce any rate limiting. An attacker could cycle through all 10,000 combinations (from <code>0000</code> to <code>9999</code>) in less than 30 seconds using parallelized HTTP client requests, successfully authenticating a fraudulent withdrawal.
      </p>
      <p>
        <strong>The Fix:</strong> Capped OTP verification attempts to 3 per transaction, set an OTP TTL expiration to 2 minutes, and set up a rate limiter middleware bound to both the client's IP and user accounts.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        3. SQL Injection in Dynamic Reporting Queries
      </h2>
      <p>
        The merchant dashboard allowed users to sort transaction history. The underlying database query concatenated the user-supplied column name directly into the SQL string:
      </p>
      <pre className="p-4 rounded-xl border border-line bg-rose-500/10 border-rose-500/20 font-mono text-xs text-rose-700 dark:text-rose-400 overflow-x-auto">
{`// DETECTED VULNERABLE CODE
$sortBy = $request->input('sort_by'); // E.g. "created_at"
$results = DB::select("SELECT * FROM transactions WHERE merchant_id = $id ORDER BY " . $sortBy);`}
      </pre>
      <p className="mt-4">
        <strong>The Vulnerability:</strong> Attackers injected arbitrary SQL statements into the <code>sort_by</code> payload (e.g. <code>created_at; DROP TABLE users;</code> or time-based blind SQL injections to extract user hashes).
      </p>
      <p>
        <strong>The Fix:</strong> Validated variables against an allowed whitelist of fields before executing queries:
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`// Whitelist-based validation
$allowedSorts = ['created_at', 'amount', 'status'];
$sortBy = in_array($request->input('sort_by'), $allowedSorts) ? $request->input('sort_by') : 'created_at';

$results = DB::table('transactions')
    ->where('merchant_id', $merchantId)
    ->orderBy($sortBy)
    ->get();`}
      </pre>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The Takeaway
      </h2>
      <p>
        These security issues are not complex cryptographic flaws; they are common application logic errors. Regular codebase audits and adhering to OWASP rules (systematic object-level authorization, rate limiting on authentication flows, and parameterized SQL queries) are critical to maintaining user trust and transaction safety.
      </p>
    </article>
  );
}
