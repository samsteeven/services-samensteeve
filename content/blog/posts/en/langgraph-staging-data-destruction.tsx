import React from "react";

export default function LanggraphStagingDataDestruction() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        A few weeks ago, an autonomous LangGraph agent designed to periodically clean up stale test accounts in our staging database went rogue. In less than 10 minutes, it purged the equivalent of 48 hours of QA test data. Here is the post-mortem of that failure and how we redesigned our graph safety patterns.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The Root Cause: An Infinite Loop in the Shared Graph State
      </h2>
      <p>
        In LangGraph, execution state is shared across all nodes. Our agent featured a decision node (router) and an erasure tool. The nominal flow was designed as follows:
      </p>
      <div className="border border-line rounded-xl bg-paper/60 p-4 font-mono text-xs text-ink/80 space-y-1">
        <div>1. Node A: List inactive test account IDs (stored in <code>state.target_ids</code>).</div>
        <div>2. Node B: If the list is not empty, call the delete tool for the first ID, then route to the decision node.</div>
        <div>3. Node C (Router): If target IDs remain, loop back to Node B. Otherwise, terminate.</div>
      </div>
      <p className="mt-4">
        <strong>What broke:</strong> Due to a minor database driver regression, the delete tool returned a success status even if the resource was not found (e.g. transient network timeouts or missing entries). Crucially, the delete node failed to remove the processed ID from the <code>state.target_ids</code> array when the transaction raised silent errors.
      </p>
      <p>
        The agent fell into an infinite execution loop:
      </p>
      <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 font-mono text-xs text-rose-600 dark:text-rose-400">
        [LangGraph Exec] Node: delete_tool {"->"} Returns: SUCCESS (Resource not found / Network timeout)
        <br />[LangGraph Exec] Router {"->"} Check: target_ids still has 12 items {"->"} Loop back to delete_tool
        <br />[LangGraph Exec] LLM Context depletion {"->"} The agent started hallucinating IDs and deleted real active staging accounts matching wildcard queries.
      </div>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The Fix: Implementing Hard Execution Guards
      </h2>
      <p>
        We rebuilt the execution graph from scratch, introducing three core security layers:
      </p>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        1. Immutable State Reducers
      </h3>
      <p>
        We redefined the LangGraph state schema, enforcing strict reducer functions to prevent stale ID persistence.
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`import { Annotated } from "@langchain/langgraph";

// Reducer function that updates target IDs safely
function updateTargetIds(current: string[], next: string[]): string[] {
  // Ensure array uniqueness and filter out processed values
  return Array.from(new Set(next));
}

interface AgentState {
  targetIds: Annotated<string[], typeof updateTargetIds>;
  processedCount: number;
  maxIterations: number;
}`}
          </pre>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        2. Hard-Coded Loop Limiters (Max Iterations Guard)
      </h3>
      <p>
        No agent loop should ever run indefinitely. We added a global sentinel node that raises an exception and halts the graph execution once a predefined loop limit is breached.
      </p>
      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`function routeDecision(state: typeof AgentState.State) {
  if (state.processedCount > 50) {
    throw new Error("Loop Guard Triggered: Max iterations exceeded in staging cleaning.");
  }
  if (state.targetIds.length > 0) {
    return "delete_node";
  }
  return "__end__";
}`}
          </pre>

      <h3 className="font-display text-base font-bold text-ink mt-6">
        3. Human-in-the-Loop Interruption for Bulk Actions
      </h3>
      <p>
        For any destructive operation affecting more than 5 rows, the graph now leverages LangGraph's <code>interrupt</code> feature, halting execution and requesting manual authorization via Slack or Webhook before proceeding.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The Takeaway
      </h2>
      <p>
        Agent frameworks like LangGraph or CrewAI are powerful, but they abstract non-deterministic code execution risks. Never let an autonomous agent interact with destructive APIs without strict sandbox isolation, hard-coded loop limits, and human-in-the-loop gates for bulk deletes.
      </p>
    </article>
  );
}
