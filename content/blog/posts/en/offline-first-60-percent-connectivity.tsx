import React from "react";

export default function OfflineFirst60PercentConnectivity() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        Developing mobile or web applications for field agents in remote regions (data collectors, network technicians, delivery drivers) requires a fundamentally different mindset when local network availability regularly drops below 60%. Most documentation treats &ldquo;offline&rdquo; as a temporary edge-case. In reality, disconnected mode is the default state of the system.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The Anti-Pattern of the Blocking Loader
      </h2>
      <p>
        The classic mistake is designing the application as a standard HTTP client that displays a loading spinner for every action and returns a network timeout error if the API doesn't reply within 10 seconds. In low-connectivity environments, this renders the app completely unusable. The application must read and write instantly to a local database and delegate synchronization to an asynchronous background worker.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The 3 Pillars of Offline-First Architecture
      </h2>
      <p>
        Here are the indispensable components needed to run a resilient offline-first application:
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        1. Indexed Local Database (SQLite / WatermelonDB)
      </h3>
      <p>
        All lookup data needed by the agent (catalog, client records, blank templates) must be stored locally. We use client-generated Universally Unique Identifiers (UUIDs) to prevent database key collisions when mutations are merged on the central database.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        2. The Outbox Mutation Queue
      </h3>
      <p>
        Every user action that modifies state (creating a report, updating a status) does not trigger an API request. Instead, it is serialized and appended to a local <code>outbox_mutations</code> table.
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`// Structure of a locally stored mutation
interface OutboxMutation {
  id: string; // Local UUID
  actionType: 'CREATE_REPORT' | 'UPDATE_STATUS';
  payload: Record<string, any>;
  createdAt: string; // ISO timestamp
  status: 'PENDING' | 'SYNCING' | 'FAILED';
  retryCount: number;
}`}
      </pre>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        3. Background Sync Worker
      </h3>
      <p>
        A background worker monitors the network connectivity status. As soon as a stable internet connection is detected, it processes mutations in a strict FIFO (First-In, First-Out) sequence and sends them to the API.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Handling Data Synchronization Conflicts
      </h2>
      <p>
        What happens if agent A updates a customer record while offline, while agent B modifies the same record online at the same time?
      </p>
      <p>
        A simple &ldquo;Last-Write-Wins&rdquo; approach risks destroying data silently. A robust solution requires implementing logical entity versioning (Optimistic Concurrency Control):
      </p>

      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`// Payload dispatched to the API for synchronization
{
  "client_id": "uuid-1234",
  "version": 4, // The version read locally by the client before editing
  "changes": {
    "phone": "+237654557446"
  }
}

// If the version in the central database has bumped to 5 in the meantime,
// the API returns a 409 (Conflict) HTTP status.
// The client app must then pull version 5 and prompt the user to merge
// or apply an automated business-rule override.`}
      </pre>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The Takeaway
      </h2>
      <p>
        Offline-first is not a cosmetic feature; it is a major system design decision. It requires robust local storage, decentralized ID generation, idempotent action queues, and active sync conflict resolution. It is the only way to build a reliable user experience when the network is unstable.
      </p>
    </article>
  );
}
