import React from "react";
import { CodeWindow } from "@/components/code-window";

export default function SecondBrainHowIBuiltIt() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        Let me be honest: this project wasn&apos;t born from a desire to &quot;do AI&quot;. It was born from <strong>frustration</strong>. Every time I opened ChatGPT, Claude, Cursor or opencode, I started from zero. I re-explained who I am, my projects, my stack, my studies, what I was looking for. Every single conversation. My context was scattered across ten files, never up to date, and no AI has a durable memory that <em>I</em> control.
      </p>
      <p>
        This article tells how I built a &quot;second brain&quot; to fix that — <strong>step by step</strong>, with the real struggles and the real solutions. Because that&apos;s where it gets interesting: not in the final result, but in the road to get there.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The starting point: re-explaining my life to a machine
      </h2>
      <p>
        The trigger was a simple question: <em>why do I keep wasting time re-explaining my context to tools that never forget theirs?</em>
      </p>
      <p>I wanted a memory that was:</p>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>mine</strong> (not locked inside a tool that might shut down tomorrow);</li>
        <li><strong>portable</strong> (readable by any AI, not only the one that created it);</li>
        <li><strong>readable and writable</strong> (the AI can use it, but also add to it, under my control);</li>
        <li><strong>private</strong> (my notes don&apos;t go off to be indexed by a third party).</li>
      </ul>
      <p>From there, the architecture almost imposed itself.</p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Building it, step by step
      </h2>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Step 1 — The Obsidian vault as the source of truth
      </h3>
      <p>
        First choice: <strong>Obsidian</strong>. Markdown files, one topic per note, with YAML <em>frontmatter</em> (<code>type</code>, <code>status</code>, <code>importance</code>, <code>tags</code>). Why Markdown? Because it&apos;s plain text: readable by a human, diffable, versionable, and it depends on no software. The vault lives on my disk <strong>and</strong> on a <strong>private</strong> GitHub repo — so full history and automatic sync.
      </p>
      <p>
        That&apos;s the foundation: <strong>the vault is the single source of truth.</strong> Everything else is just a projection of it.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Step 2 — The ingestion pipeline
      </h3>
      <p>
        For an AI to &quot;read&quot; those notes, they must be turned into something searchable by meaning. That&apos;s the job of a <strong>RAG</strong> (Retrieval-Augmented Generation): split notes into pieces (<em>chunks</em>), compute a <strong>vector</strong> for each (a number that summarizes its meaning), and store them in a vector database.
      </p>
      <p>My pipeline, orchestrated with <strong>n8n</strong> (which I already use everywhere):</p>
      <CodeWindow
        filename="Ingestion pipeline"
        badge="n8n"
        code={`GitHub (private vault) → decoding → chunking → embeddings → Qdrant`}
      />
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Qdrant</strong> as the vector database: self-hosted on my VPS, open source.</li>
        <li><strong>Ollama + bge-m3</strong> for embeddings: the model runs <strong>locally</strong>, multilingual, and no note is ever sent to a third party.</li>
      </ul>
      <p>
        Important: ingestion runs <strong>every 30 minutes</strong>. I write in Obsidian, push, and thirty minutes later it&apos;s queryable. No button to click.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Step 3 — The RAG: asking a question
      </h3>
      <p>
        A question → it&apos;s turned into a vector → Qdrant finds the closest pieces → an LLM answers <strong>only from those pieces</strong>, citing the source files.
      </p>
      <p>
        Choosing the LLM was… eventful (more on that in the problems section). Today, generation goes through the <strong>OpenCode Go</strong> gateway (model <code>deepseek-v4-flash-vision-exp</code>).
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Step 4 — The MCP server: plugging in any AI
      </h3>
      <p>
        This is the centerpiece, and what sets this project apart from a simple chatbot. The <strong>MCP</strong> protocol (Model Context Protocol) lets any compatible AI — ChatGPT, Claude, Cursor, opencode — connect to my tools.
      </p>
      <p>
        I built a <strong>dedicated MCP server</strong> that exposes only my tools, never n8n&apos;s admin surface. One URL, and my brain is plugged into all my AIs:
      </p>
      <CodeWindow
        filename="MCP endpoint"
        badge="MCP"
        code={`https://n8n.samensteeve.com/mcp/second-brain-kb`}
      />
      <p>
        In practice, in a Claude conversation, I can write &quot;query my second brain: what are my Laravel projects?&quot; and it searches <em>my</em> notes, with sources.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Step 5 — Controlled writing: quarantine
      </h3>
      <p>
        Giving an AI the ability to <strong>write</strong> into my base is powerful… and dangerous. A note read by an AI (or a booby-trapped piece of content) could push it to write anything. My rule: <strong>every AI write goes through quarantine.</strong>
      </p>
      <p>
        A note proposed by an AI arrives with <code>status: pending</code>. It&apos;s <strong>invisible</strong> to search until I&apos;ve validated it by hand. The worst a compromised AI can do is write a note I can see, fix or delete — and everything is versioned by Git, so it&apos;s reversible.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Step 6 — Quality: classification, duplicates, housekeeping
      </h3>
      <p>A base that grows quickly becomes a mess. Three safeguards:</p>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Automatic classification</strong>: an AI proposing a note assigns it a type, tags and a target folder.</li>
        <li><strong>Deduplication</strong>: before writing, the note is compared to what already exists. Too similar (≥ 75%) → refused. Slightly similar (≥ 55%) → warning.</li>
        <li><strong>Weekly housekeeping</strong>: a workflow detects redundant note pairs and writes me a report to review.</li>
      </ul>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Step 7 — Diving into the source
      </h3>
      <p>
        A knowledge base is good. But sometimes the AI needs the <strong>exact detail</strong> — a specific file from a project. Rather than copying everything into the vault, I added a third tool: <code>second_brain_project_details</code>. The AI asks for <code>repo</code> or <code>repo#path</code>, and it reads the source directly on GitHub. The vault stays light, the source stays the truth.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Step 8 — Authentication
      </h3>
      <p>
        The last brick to make it work everywhere: auth. A static token is simple but limited (Claude.ai web, for instance, can&apos;t send a custom header). So I switched the MCP server to <strong>OAuth</strong> (n8n exposes the standard discovery endpoints natively). Result: any serious MCP client can connect by authenticating normally, without me having to explain anything by hand.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Step 9 — Making it fast and robust
      </h3>
      <p>
        This is the part I&apos;m proudest of, because it&apos;s invisible… and it took the most thought (see the problems below). Today, when nothing has changed, ingestion runs in <strong>~2 seconds</strong> instead of 3 to 6 minutes, and it can <strong>never</strong> duplicate or lose a note, even if two executions run at the same time.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The problems I hit (and how I solved them)
      </h2>
      <p>This is the part I wish I&apos;d read when I started. Nothing went as planned.</p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        1. The LLM provider that fell through
      </h3>
      <p>
        <strong>The problem</strong>: my first generation choice didn&apos;t work — no valid key on one side, no funds on the other. Total dead end at the generation step.
      </p>
      <p>
        <strong>The solution</strong>: reuse a gateway I already had (OpenCode Go). But it requires a custom header (<code>x-opencode-session</code>)… which n8n&apos;s model nodes don&apos;t expose.
      </p>
      <p>
        <strong>→ Lesson</strong>: when a node won&apos;t let you do what you need, drop a level. I replaced the node with a plain <strong>direct HTTP call</strong> — full control over the payload and headers.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        2. The loop that stopped by itself
      </h3>
      <p>
        <strong>The problem</strong>: my ingestion used <code>splitInBatches</code> (a loop per note). It stopped early as soon as an item was empty.
      </p>
      <p>
        <strong>The solution</strong>: drop the loop for a <strong>linear pipeline</strong>. A single flow, no fragile intermediate state.
      </p>
      <p>
        <strong>→ Lesson</strong>: a loop is one more state to manage. When a linear flow works, it&apos;s simpler <em>and</em> more reliable.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        3. Embeddings that took forever
      </h3>
      <p>
        <strong>The problem</strong>: no GPU on my VPS. Computing the vectors of ~190 pieces <strong>on CPU</strong> meant ~1 second per piece → <strong>3 to 6 minutes per run</strong>. And it recomputed <em>everything</em> every time, even if a single note had changed.
      </p>
      <p>
        <strong>The solution</strong>: make ingestion <strong>differential</strong>. Each piece gets a <strong>deterministic</strong> identifier — a hash of its content. Before computing, I ask Qdrant which identifiers already exist, and I only <strong>embed the new or changed ones</strong>.
      </p>
      <p>
        <strong>→ Result</strong>: from 3-6 minutes to <strong>~2 seconds</strong> in steady state. Only the notes I just edited cost anything.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        4. Ghost duplicates
      </h3>
      <p>
        <strong>The problem</strong>: two concurrent ingestion runs (a scheduled one + a manual one) → the base contained <strong>twice</strong> the same notes.
      </p>
      <p>
        <strong>The solution</strong>: with deterministic identifiers, an <em>upsert</em> overwrites instead of appending. Two simultaneous runs produce exactly the same index.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        5. …and the data loss that really annoyed me
      </h3>
      <p>
        <strong>The problem</strong>: while fixing duplicates, I introduced something worse. My cleanup deleted points &quot;not in the current batch&quot;. But if a run had a <strong>stale</strong> view of the vault, it deleted the notes another run had just written. I lost 4 notes while testing. That kind of bug makes you doubt everything.
      </p>
      <p>
        <strong>The solution</strong>: timestamp each point (<code>indexed_at</code>) and <strong>only delete an orphan if it predates the start of the run</strong>. A concurrent run, even with a stale view, can no longer touch notes written after it started.
      </p>
      <p>
        <strong>→ Lesson</strong>: &quot;delete what&apos;s no longer there&quot; is a <strong>destructive</strong> operation. On a concurrent system, it needs a time guard. I wrote that trap down in the project docs so I never fall into it again.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        6. The silent leak of an AI note
      </h3>
      <p>
        <strong>The problem</strong>: while digging, I discovered a note written by an AI was <code>status: active</code> — so <strong>indexed</strong> — when it should have been quarantined. It came from an old version of the workflow.
      </p>
      <p>
        <strong>The solution</strong>: on top of quarantine, I <strong>excluded a whole folder</strong> (captures/reports) from indexing. An AI write can no longer leak, even by accident.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        7. The false friend that made me doubt
      </h3>
      <p>
        <strong>The problem</strong>: a node was called &quot;OpenRouter Model&quot;… but actually pointed to another gateway. A credential named &quot;OpenAI account&quot; had nothing to do with OpenAI. Result: hours hunting an inconsistency… that was in the <strong>names</strong>.
      </p>
      <p>
        <strong>The solution</strong>: rename things by what they <strong>actually do</strong>, not by a brand. And turn it into a written rule in the project.
      </p>
      <p>
        <strong>→ Lesson</strong>: bad names cost more than they seem. A lying name is a bug waiting to happen.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        8. &quot;Why does an AI tell me one thing and the opposite?&quot;
      </h3>
      <p>
        <strong>The problem</strong>: an AI told me my base was misnamed, based on a screenshot… that matched <strong>nothing</strong> in my repository (a file that never existed). I checked the entire Git history: zero trace.
      </p>
      <p>
        <strong>The solution</strong>: the golden rule — <strong>verify at the source, never trust a screenshot</strong>. That&apos;s exactly the point of this project: an AI that makes things up is an AI without access to the truth. Here, it only has access to what&apos;s verified.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        What it&apos;s actually useful for
      </h2>
      <p>
        This is the real question — and for a long time I hadn&apos;t put enough emphasis on it. Here&apos;s the concrete utility, today.
      </p>
      <div className="grid sm:grid-cols-2 gap-3 my-6">
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Preparing for an interview or internship</h3>
          <p className="text-sm text-ink-soft m-0">I ask any AI: &quot;summarize project X, my technical choices, what I learned&quot;. It answers from <em>my</em> notes, with exact details — not from an approximate memory.</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Applications, CV, portfolio</h3>
          <p className="text-sm text-ink-soft m-0">My professional context is ready, up to date and queryable. Writing an application or a post becomes a dialogue with my own base, not a blank page.</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Freelancing: answer fast and accurately</h3>
          <p className="text-sm text-ink-soft m-0">A client asks a technical question? I have the AI dive into a project&apos;s <strong>source</strong> (README, specific file) to find the exact implementation, without digging through my disk.</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Daily technical memory</h3>
          <p className="text-sm text-ink-soft m-0">A lesson learned, an architecture decision, a trap hit: I capture it in the vault. The &quot;lesson of the day&quot; becomes a queryable note, not a fading memory.</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">One memory for all my AIs</h3>
          <p className="text-sm text-ink-soft m-0">ChatGPT, Claude, Cursor, opencode: all read and write into the same base. I no longer re-explain my context — I plug it in.</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Feeding my articles and projects</h3>
          <p className="text-sm text-ink-soft m-0">What I write here is fueled by the vault. My notes, retrospectives and articles no longer start from zero: they start from what I actually lived.</p>
        </div>
      </div>
      <p>
        And beyond work, it&apos;s a memory for life: my projects, my goals, my admin. An AI that truly knows me — and knows me <em>with my permission</em>, because it&apos;s <strong>my</strong> base, on <strong>my</strong> server.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        What this project taught me
      </h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Failure is inevitable</strong>: designing <em>for</em> failure (retry, idempotence, graceful degradation) beats hoping nothing breaks.</li>
        <li><strong>Data first</strong>: a destructive operation always needs a guardrail (here, a timestamp). Otherwise, it will bite.</li>
        <li><strong>Naming is designing</strong>: a badly named component is a bug waiting for its moment.</li>
        <li><strong>An AI doesn&apos;t need to memorize everything</strong>: it should be able to <strong>read</strong> when needed — and only write with my consent.</li>
        <li><strong>Verify at the source</strong>: that&apos;s what separates a useful AI from one that confidently makes things up.</li>
      </ul>

      <h2 className="font-display text-xl font-bold text-ink mt-8">What&apos;s next</h2>
      <p>The foundation is solid, but nothing is frozen. Coming up:</p>
      <ul className="list-disc list-inside space-y-2">
        <li>a <strong>chat interface</strong> (Telegram / WhatsApp) to query the brain without opening an MCP client;</li>
        <li><strong>automatic capture</strong> (watch, ideas) so the base feeds itself;</li>
        <li>and ever more <strong>life notes</strong> — because deep down, this isn&apos;t an AI project. It&apos;s a memory I&apos;m building, piece by piece.</li>
      </ul>
      <p className="mt-4">
        If you&apos;re building something similar: start simple, put guardrails in <strong>before</strong> you get hurt, and document every trap. The problems I listed here, you&apos;ll hit too — might as well let them serve you.
      </p>
    </article>
  );
}
