import type { UIMessage } from "ai";

type AnswerStreamProps = {
  messages: UIMessage[];
  isStreaming: boolean;
  hasStarted: boolean;
};

function extractAnswerText(messages: UIMessage[]): string {
  const lastAssistant = messages.filter((m) => m.role === "assistant").at(-1);
  if (!lastAssistant) {
    return "";
  }

  return lastAssistant.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function AnswerStream({
  messages,
  isStreaming,
  hasStarted,
}: AnswerStreamProps) {
  const answer = extractAnswerText(messages);

  return (
    <section className="rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/90 to-zinc-950 p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          Answer
        </h2>
        {isStreaming && (
          <span className="inline-flex items-center gap-2 text-xs text-violet-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
            Streaming
          </span>
        )}
      </div>

      {!hasStarted ? (
        <p className="text-sm leading-relaxed text-zinc-500">
          Your synthesized recommendation will appear here after both tools
          complete.
        </p>
      ) : answer ? (
        <div className="prose prose-invert max-w-none text-[15px] leading-7 text-zinc-100">
          <p className="whitespace-pre-wrap">{answer}</p>
        </div>
      ) : (
        <p className="text-sm text-zinc-500">Composing response…</p>
      )}
    </section>
  );
}
