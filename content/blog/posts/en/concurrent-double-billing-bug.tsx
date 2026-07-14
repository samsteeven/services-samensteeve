import React from "react";

export default function ConcurrentDoubleBillingBug() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        In production, critical logical bugs can lie dormant for months before suddenly manifesting under heavy traffic. The concurrent double-debit issue is a classic example. Two identical payment requests arriving at the exact same millisecond can bypass application-level validation and drain a user's wallet. Here is the technical breakdown of this race condition.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The Disaster Scenario (Race Condition)
      </h2>
      <p>
        Imagine a user with a wallet balance of 10,000 FCFA trying to buy a service costing 8,000 FCFA. If they double-click the &ldquo;Pay&rdquo; button, two separate web servers (or process workers) handle these requests concurrently:
      </p>

      <div className="border border-line rounded-xl bg-paper/60 p-5 font-mono text-xs text-ink/80 space-y-3">
        <div className="grid grid-cols-2 gap-4 border-b border-line/40 pb-2 font-bold text-ink/60">
          <div>Request A (Worker 1)</div>
          <div>Request B (Worker 2)</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>1. Reads balance from DB: 10,000 FCFA</div>
          <div>1. Reads balance from DB: 10,000 FCFA</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>2. Evaluates: 10,000 &gt;= 8,000 ? (Yes)</div>
          <div>2. Evaluates: 10,000 &gt;= 8,000 ? (Yes)</div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-rose-500 font-semibold">
          <div>3. Debits account: Balance = 2,000 FCFA</div>
          <div>3. Debits account: Balance = 2,000 FCFA</div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-ink-soft">
          <div>4. Commits transaction</div>
          <div>4. Commits transaction</div>
        </div>
      </div>

      <p className="mt-4">
        At the end of the execution, the user's final balance is committed at 2,000 FCFA, instead of rejecting the second transaction for insufficient funds (or ending up with a correct negative balance of -6,000 FCFA). The business has lost money, and the ledger is corrupted.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The Bad Fix: Application-Level Optimism
      </h2>
      <p>
        Trying to resolve this in memory (such as checking session states or using an unlocked Redis cache key) is highly prone to failures. Similarly, standard database transactions running under default isolation levels (like <code>READ COMMITTED</code> in PostgreSQL) do not block this race condition, because both processes read the validated database state before the other commits its write.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The Robust Fix: Pessimistic Locking
      </h2>
      <p>
        To secure financial transactions, we must force the database to serialize access to the specific row representing the user's wallet. This is done using the <code>SELECT ... FOR UPDATE</code> statement.
      </p>
      <p>
        Here is the clean implementation in Laravel and PHP 8+ wrapped inside a database transaction block:
      </p>

      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`use Illuminate\\Support\\Facades\\DB;
use App\\Exceptions\\InsufficientBalanceException;

DB::transaction(function () use ($userId, $amount) {
    // 1. Fetch user's wallet and lock the matching SQL row
    // This query blocks any concurrent SELECT ... FOR UPDATE on this record
    $wallet = DB::table('wallets')
        ->where('user_id', $userId)
        ->lockForUpdate()
        ->first();

    // 2. Perform strict balance check insulated from concurrent updates
    if ($wallet->balance < $amount) {
        throw new InsufficientBalanceException("Insufficient balance.");
    }

    // 3. Perform debit operation
    DB::table('wallets')
        ->where('user_id', $userId)
        ->decrement('balance', $amount);

    // 4. Log transaction ledger entry for auditing
    DB::table('ledger_entries')->insert([
        'user_id' => $userId,
        'amount' => -$amount,
        'type' => 'debit',
        'created_at' => now(),
    ]);
});`}
      </pre>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Under the Hood
      </h2>
      <p>
        When the first worker runs <code>lockForUpdate()</code> (which compiles to <code>SELECT * FROM wallets WHERE user_id = ? FOR UPDATE</code>), PostgreSQL acquires an exclusive write lock on that row.
      </p>
      <p>
        If request B arrives a millisecond later and tries to lock the same row, the database suspends its execution (status: <code>lock wait</code>). Once worker 1 commits or rolls back, the lock is released. Request B immediately reads the freshly updated balance (2,000 FCFA), detects that <code>2,000 &lt; 8,000</code>, and safely raises an exception.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Production Rules of Thumb
      </h2>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Set a lock timeout:</strong> Never let a web worker wait indefinitely for a database lock. Configure a short lock timeout (e.g., <code>SET lock_timeout = '3s'</code>).</li>
        <li><strong>Always index your search clause:</strong> If your lock query does not hit an index, the database may escalate to a Table Lock instead of a Row Lock, blocking all operations on that table and crippling your application.</li>
        <li><strong>Database Constraints:</strong> Add a <code>CHECK (balance &gt;= 0)</code> constraint at the database table level. If the application layer fails, the database will refuse the write and keep state intact.</li>
      </ul>
    </article>
  );
}
