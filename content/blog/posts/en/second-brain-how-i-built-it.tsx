import React from "react";
import { CodeWindow } from "@/components/code-window";
import { ZoomableImage } from "@/components/zoomable-image";

export default function SecondBrainHowIBuiltIt() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        Let me be honest. This project wasn&apos;t born from a desire to &quot;do AI&quot;. It was born from frustration. Every time I opened ChatGPT, Claude, Cursor or opencode, I started from zero. I re-explained who I am, my projects, my stack, my studies, what I was looking for. Every single conversation. My context was scattered across ten files, never up to date, and no AI has a durable memory that I control.
      </p>
      <p>
        This article tells how I built a &quot;second brain&quot; to fix that. Step by step, with the struggles and the solutions. The final result matters less to me than the road to get there.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The starting point: re-explaining my life to a machine
      </h2>
      <p>
        The trigger was a simple question. Why do I keep wasting time re-explaining my context to tools that never forget theirs?
      </p>
      <p>I wanted a memory that was:</p>
      <ul className="list-disc list-inside space-y-2">
        <li>mine, not locked inside a tool that might shut down tomorrow;</li>
        <li>portable, readable by any AI, whichever it is;</li>
        <li>readable and writable, so the AI can use it but also add to it, under my control;</li>
        <li>private, so my notes don&apos;t go off to be indexed by a third party.</li>
      </ul>
      <p>From there, the architecture almost imposed itself.</p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Building it, step by step
      </h2>

      <ZoomableImage src="/blog/second-brain-architecture.png" alt="Second brain architecture: ingestion Obsidian, Git, n8n, Qdrant and Ollama, access over MCP" />
      <p className="text-xs text-ink-soft text-center italic mb-6">The big picture. The vault is the source of truth, ingestion projects it into Qdrant, and the MCP server opens it to any AI.</p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Step 1: the Obsidian vault as the source of truth
      </h3>
      <p>
        First choice: Obsidian. Markdown files, one topic per note, with YAML frontmatter (type, status, importance, tags). Why Markdown? Because it&apos;s plain text. Readable by a human, diffable, versionable, and it depends on no software. The vault lives on my disk and on a private GitHub repo, so full history and automatic sync.
      </p>
      <p>
        That&apos;s the foundation. The vault is the single source of truth. Everything else is just a projection of it.
      </p>

      <ZoomableImage src="/blog/second-brain-vault.png" alt="The Obsidian vault: folder tree and graph view of the notes" />
      <p className="text-xs text-ink-soft text-center italic mb-6">Markdown files, one topic per note, linked to each other.</p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Step 2: the ingestion pipeline
      </h3>
      <p>
        For an AI to read those notes, they must be turned into data searchable by meaning. That&apos;s the job of a RAG (Retrieval-Augmented Generation): split notes into pieces (chunks), compute a vector for each (a number that summarizes its meaning), and store them in a vector database.
      </p>
      <p>My pipeline, orchestrated with n8n, which I already use everywhere:</p>
      <CodeWindow
        filename="Ingestion pipeline"
        badge="n8n"
        code={`GitHub (private vault) → decoding → chunking → embeddings → Qdrant`}
      />
      <p>
        Qdrant is the vector database. It&apos;s self-hosted on my VPS and open source. For embeddings, I use Ollama with the bge-m3 model: it runs locally, it&apos;s multilingual, and no note is ever sent to a third party.
      </p>
      <p>
        Important: ingestion runs every 30 minutes. I write in Obsidian, push, and thirty minutes later it&apos;s queryable. No button to click.
      </p>

      <ZoomableImage src="/blog/second-brain-ingestion.png" alt="The n8n ingestion workflow: from GitHub to Qdrant, with the differential filter" />
      <p className="text-xs text-ink-soft text-center italic mb-6">The ingestion pipeline in n8n: reading the vault, chunking, filtering already-indexed chunks, embeddings, upsert and cleanup.</p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Step 3: the RAG, asking a question
      </h3>
      <p>
        A question comes in. It&apos;s turned into a vector. Qdrant finds the closest pieces. An LLM answers only from those pieces, citing the source files.
      </p>
      <p>
        Choosing the LLM was eventful (more on that in the problems section). Today, generation goes through the OpenCode Go gateway, with the model deepseek-v4-flash-vision-exp.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Step 4: the MCP server, plugging in any AI
      </h3>
      <p>
        This is the centerpiece, and what sets this project apart from a simple chatbot. The MCP protocol (Model Context Protocol) lets any compatible AI connect to my tools: ChatGPT, Claude, Cursor, opencode.
      </p>
      <p>
        I built a dedicated MCP server that exposes only my tools, never n8n&apos;s admin surface. One URL is enough, and my brain is plugged into all my AIs:
      </p>
      <CodeWindow
        filename="MCP endpoint"
        badge="MCP"
        code={`https://n8n.samensteeve.com/mcp/second-brain-kb`}
      />
      <p>
        In practice, in a Claude conversation, I can write &quot;query my second brain: what are my Laravel projects?&quot; and it searches my notes, with sources.
      </p>

      <ZoomableImage src="/blog/second-brain-mcp-server.png" alt="The dedicated MCP server and its tools" />
      <p className="text-xs text-ink-soft text-center italic mb-6">The MCP server exposes only my tools (read, quarantined write, source reading), never n8n&apos;s admin surface.</p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Step 5: controlled writing, quarantine
      </h3>
      <p>
        Giving an AI the ability to write into my base is powerful and dangerous. A note read by an AI, or a booby-trapped piece of content, could push it to write anything. My rule is simple: every AI write goes through quarantine.
      </p>
      <p>
        A note proposed by an AI arrives with <code>status: pending</code>. It&apos;s invisible to search until I&apos;ve validated it by hand. The worst a compromised AI can do is write a note I can see, that I can fix or delete. And everything is versioned by Git, so it&apos;s reversible.
      </p>

      <ZoomableImage src="/blog/second-brain-quarantine.png" alt="The quarantine flow: the AI writes, the note stays invisible until validation" />

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Step 6: quality, classification, duplicates, housekeeping
      </h3>
      <p>A base that grows quickly becomes a mess. I put in three safeguards.</p>
      <p>
        First, automatic classification. An AI proposing a note assigns it a type, tags and a target folder. Then deduplication: before writing, the note is compared to what already exists. Too similar (above 75%), it&apos;s refused. Slightly similar (above 55%), it&apos;s a warning. Finally, weekly housekeeping: a workflow detects redundant note pairs and writes me a report to review.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Step 7: diving into the source
      </h3>
      <p>
        A knowledge base is good. But sometimes the AI needs the exact detail, a specific file from a project. Rather than copying everything into the vault, I added a third tool: <code>second_brain_project_details</code>. The AI asks for <code>repo</code> or <code>repo#path</code>, and it reads the source directly on GitHub. The vault stays light, the source stays the truth.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Step 8: authentication
      </h3>
      <p>
        The last brick to make it work everywhere: authentication. A static token is simple but limited. Claude.ai web, for instance, can&apos;t send a custom header. So I switched the MCP server to OAuth, which n8n exposes natively with the standard discovery endpoints. Result: any serious MCP client can connect by authenticating normally, without me having to explain anything by hand.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        Step 9: making it fast and robust
      </h3>
      <p>
        This is the part I&apos;m proudest of, because it&apos;s invisible and it took the most thought. Today, when nothing has changed, ingestion runs in two seconds instead of three to six minutes. And it can never duplicate or lose a note, even if two executions run at the same time.
      </p>

      <ZoomableImage src="/blog/second-brain-perf.png" alt="Before / after: ingestion drops from several minutes to two seconds" />

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The problems I hit (and how I solved them)
      </h2>
      <p>This is the part I wish I&apos;d read when I started. Nothing went as planned.</p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        1. The LLM provider that fell through
      </h3>
      <p>
        The problem: my first generation choice didn&apos;t work. No valid key on one side, no funds on the other. Total dead end at the generation step.
      </p>
      <p>
        The solution: reuse a gateway I already had, OpenCode Go. But it requires a custom header, <code>x-opencode-session</code>, which n8n&apos;s model nodes don&apos;t expose.
      </p>
      <p>
        The lesson: when a node won&apos;t let you do what you need, drop a level. I replaced the node with a plain direct HTTP call, with full control over the payload and headers.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        2. The loop that stopped by itself
      </h3>
      <p>
        The problem: my ingestion used <code>splitInBatches</code>, a loop per note. It stopped early as soon as an item was empty.
      </p>
      <p>
        The solution: drop the loop for a linear pipeline. A single flow, no fragile intermediate state.
      </p>
      <p>
        The lesson: a loop is one more state to manage. When a linear flow works, it&apos;s simpler and more reliable.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        3. Embeddings that took forever
      </h3>
      <p>
        The problem: no GPU on my VPS. Computing the vectors of 190 pieces on CPU meant about one second per piece, so three to six minutes per run. And it recomputed everything every time, even if a single note had changed.
      </p>
      <p>
        The solution: make ingestion differential. Each piece gets a deterministic identifier, a hash of its content. Before computing, I ask Qdrant which identifiers already exist, and I only embed the new or changed ones.
      </p>
      <p>
        The result: from three to six minutes, down to two seconds in steady state. Only the notes I just edited cost time.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        4. Ghost duplicates
      </h3>
      <p>
        The problem: two concurrent ingestion runs, one scheduled and one manual, and the base contained twice the same notes.
      </p>
      <p>
        The solution: with deterministic identifiers, an upsert overwrites instead of appending. Two simultaneous runs produce the same index.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        5. The data loss that annoyed me
      </h3>
      <p>
        The problem: while fixing duplicates, I introduced something worse. My cleanup deleted points missing from the current batch. But if a run had a stale view of the vault, it deleted the notes another run had just written. I lost four notes while testing. That kind of bug makes you doubt everything.
      </p>
      <p>
        The solution: timestamp each point with <code>indexed_at</code>, and only delete an orphan if it predates the start of the run. A concurrent run, even with a stale view, can no longer touch notes written after it started.
      </p>
      <p>
        The lesson: deleting what&apos;s no longer there is a destructive operation. On a concurrent system, it needs a time guard. I wrote that trap down in the project docs so I never fall into it again.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        6. The silent leak of an AI note
      </h3>
      <p>
        The problem: while digging, I discovered a note written by an AI was <code>status: active</code>, so indexed, when it should have been quarantined. It came from an old version of the workflow.
      </p>
      <p>
        The solution: on top of quarantine, I excluded a whole folder, the one for captures and reports, from indexing. An AI write can no longer leak, even by accident.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        7. The false friend that made me doubt
      </h3>
      <p>
        The problem: a node was called &quot;OpenRouter Model&quot;, but pointed to another gateway. A credential named &quot;OpenAI account&quot; had nothing to do with OpenAI. Result: hours hunting an inconsistency that was in the names.
      </p>
      <p>
        The solution: rename things by what they do, not by a brand. And turn it into a written rule in the project.
      </p>
      <p>
        The lesson: bad names cost more than they seem. A lying name is a bug waiting to happen.
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        8. &quot;Why does an AI tell me one thing and the opposite?&quot;
      </h3>
      <p>
        The problem: an AI told me my base was misnamed, based on a screenshot that matched nothing in my repository. A file that never existed. I checked the entire Git history, zero trace.
      </p>
      <p>
        The solution: the golden rule, verify at the source and never trust a screenshot. That&apos;s the point of this project. An AI that makes things up is an AI without access to the truth. Here, it only has access to what&apos;s verified.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        What it&apos;s useful for
      </h2>
      <p>
        This is the real question, and for a long time I hadn&apos;t put enough emphasis on it. Here&apos;s the concrete utility, today.
      </p>
      <div className="grid sm:grid-cols-2 gap-3 my-6">
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Preparing for an interview or internship</h3>
          <p className="text-sm text-ink-soft m-0">I ask any AI: &quot;summarize project X, my technical choices, what I learned&quot;. It answers from my notes, with exact details, not from an approximate memory.</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Applications, CV, portfolio</h3>
          <p className="text-sm text-ink-soft m-0">My professional context is ready, up to date and queryable. Writing an application or a post becomes a dialogue with my own base, not a blank page.</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Freelancing: answer fast and accurately</h3>
          <p className="text-sm text-ink-soft m-0">A client asks a technical question? I have the AI dive into a project&apos;s source (README, specific file) to find the exact implementation, without digging through my disk.</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Daily technical memory</h3>
          <p className="text-sm text-ink-soft m-0">A lesson learned, an architecture decision, a trap hit: I capture it in the vault. The lesson of the day becomes a queryable note, not a fading memory.</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">One memory for all my AIs</h3>
          <p className="text-sm text-ink-soft m-0">ChatGPT, Claude, Cursor, opencode: all read and write into the same base. I no longer re-explain my context, I plug it in.</p>
        </div>
        <div className="rounded-xl border border-line bg-paper-raised/40 p-4">
          <h3 className="font-display text-sm font-bold text-ink mb-1">Feeding my articles and projects</h3>
          <p className="text-sm text-ink-soft m-0">What I write here is fueled by the vault. My notes, retrospectives and articles no longer start from zero: they start from what I lived.</p>
        </div>
      </div>
      <p>
        Beyond work, it&apos;s also a memory for life: my projects, my goals, my admin. An AI that knows me, and knows me with my permission, because it&apos;s my base, on my server.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        What this project taught me
      </h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Failure is inevitable: designing for failure (retry, idempotence, graceful degradation) beats hoping nothing breaks.</li>
        <li>Data first: a destructive operation always needs a guardrail. Here, a timestamp. Otherwise, it will bite.</li>
        <li>Naming is designing: a badly named component is a bug waiting for its moment.</li>
        <li>An AI doesn&apos;t need to memorize everything: it should be able to read when needed, and only write with my consent.</li>
        <li>Verify at the source: that&apos;s what separates a useful AI from one that confidently makes things up.</li>
      </ul>

      <h2 className="font-display text-xl font-bold text-ink mt-8">What&apos;s next</h2>
      <p>
        The foundation is solid, but nothing is frozen. Coming up: a chat interface (Telegram or WhatsApp) to query the brain without opening an MCP client, automatic capture (watch, ideas) so the base feeds itself, and ever more life notes. Because deep down, this isn&apos;t an AI project. It&apos;s a memory I&apos;m building, piece by piece.
      </p>
      <p className="mt-4">
        If you&apos;re building a similar project, start simple, put guardrails in before you get hurt, and document every trap. The problems I listed here, you&apos;ll hit too. Might as well let them serve you.
      </p>
    </article>
  );
}
