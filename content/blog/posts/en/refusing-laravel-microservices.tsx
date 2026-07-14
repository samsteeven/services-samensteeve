import React from "react";

export default function RefusingLaravelMicroservices() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        In the lifecycle of a high-growth platform, there comes a point where management and engineering teams suggest splitting the &ldquo;stale monolith&rdquo; into microservices to solve scaling issues. As an architect, I recently vetoed this transition for a major e-commerce platform. Here is the ADR (Architecture Decision Record) and the engineering reasoning behind this choice.
      </p>

      <div className="border border-line rounded-xl bg-paper/60 p-6 my-6 font-mono text-xs text-ink/80 space-y-2">
        <div className="text-sm font-bold text-ink uppercase tracking-wider border-b border-line/40 pb-2 mb-2">
          📄 ADR-024: Modular Monolith vs Microservices
        </div>
        <div><strong>Status:</strong> ACCEPTED (Modular Monolith confirmed)</div>
        <div><strong>Decider:</strong> Tech Lead / Architect</div>
        <div><strong>Date:</strong> April 2026</div>
        <div className="pt-2 text-ink-soft">
          <strong>Context:</strong> The engineering team is facing performance bottlenecks on the inventory API and is requesting a split into 4 independent microservices.
        </div>
      </div>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The Myth of the Silver-Bullet Microservice
      </h2>
      <p>
        Microservices solve organizational human problems (e.g. when you have 150 developers across 15 Feature Teams), not pure performance issues. Splitting a codebase too early introduces massive distributed system overhead:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Distributed Transactions:</strong> Ensuring data consistency between Order and Billing services without the extreme complexity of the Saga pattern (compensation events, asynchronous processing) becomes a nightmare.</li>
        <li><strong>Network Latency:</strong> A simple user action turns into a cascade of internal HTTP (or gRPC) calls, degrading the overall response time.</li>
        <li><strong>Operational Overhead:</strong> Maintaining 4 CI/CD pipelines, a Kubernetes cluster, a service mesh, distributed tracing, and centralized secrets management multiplies operational complexity tenfold.</li>
      </ul>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The Alternative: The Modular Monolith
      </h2>
      <p>
        Rather than breaking up our infrastructure, we restructured the code at the application level to cleanly decouple business domains. In PHP 8+, we enforced strict domain boundaries inside Laravel.
      </p>
      <p>
        Here is our strict modular directory structure enforced via PHP namespaces:
      </p>

      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`// Modular folder structure
app/
├── Domain/
│   ├── Order/
│   │   ├── Contracts/
│   │   ├── Models/
│   │   └── Services/
│   └── Billing/
│       ├── Contracts/
│       ├── Services/
│       └── Listeners/
└── Providers/`}
      </pre>

      <p className="mt-4">
        To allow decoupled domain communication, we leverage Laravel's internal event dispatcher instead of remote network requests. This acts as an efficient In-Memory Event Bus:
      </p>

      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`namespace App\\Domain\\Order\\Services;

use App\\Domain\\Order\\Events\\OrderPlaced;
use Illuminate\\Support\\Facades\\DB;

class CreateOrderService {
    public function execute(array $data) {
        return DB::transaction(function () use ($data) {
            $order = Order::create($data);
            
            // Dispatch in-memory event decoupled from execution
            event(new OrderPlaced($order));
            
            return $order;
        });
    }
}`}
      </pre>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        How We Solved the Performance Issues
      </h2>
      <p>
        Instead of splitting the app, we targeted the actual database and code execution bottlenecks:
      </p>
      <ul className="list-decimal pl-5 space-y-2">
        <li><strong>SQL Optimizations:</strong> Deployed composite indexes on lookup tables and optimized raw queries using joins or materialized views.</li>
        <li><strong>Asynchronous Processing:</strong> Utilized Redis-backed queues for heavy background tasks (PDF generation, notifications, third-party API sync).</li>
        <li><strong>Strategic Caching:</strong> Implemented two-tier caching (Redis + local request memory) for inventory tables that experience high read-to-write ratios.</li>
      </ul>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Final Decision and Outcome
      </h2>
      <p>
        The modular monolith allowed us to maintain a single repository, run robust ACID database transactions, and deploy in one simple step. In production, our average API latency dropped below 80ms while maintaining development velocity, proving that a clean application architecture is always better than complex, premature infrastructure distribution.
      </p>
    </article>
  );
}
