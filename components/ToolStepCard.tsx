import type { ToolStep } from "@/lib/chat/types";

type ToolStepCardProps = {
  step: ToolStep;
  index: number;
};

function formatArgs(step: ToolStep): string {
  if (step.name === "searchVenues") {
    const parts = [`city: ${step.args.city}`];
    if (step.args.capacityMin !== undefined) {
      parts.push(`capacity ≥ ${step.args.capacityMin}`);
    }
    if (step.args.vibe) {
      parts.push(`vibe: ${step.args.vibe}`);
    }
    return parts.join(" · ");
  }

  const parts = [`venueId: ${step.args.venueId}`];
  if (step.args.dateISO) {
    parts.push(`date: ${step.args.dateISO}`);
  }
  return parts.join(" · ");
}

function stateLabel(state: ToolStep["state"]): string {
  switch (state) {
    case "pending":
      return "Running";
    case "done":
      return "Complete";
    case "error":
      return "Failed";
  }
}

export function ToolStepCard({ step, index }: ToolStepCardProps) {
  const isPending = step.state === "pending";
  const isError = step.state === "error";

  return (
    <li className="relative pl-10">
      <span
        className={`absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold ${
          isPending
            ? "border-amber-400/40 bg-amber-400/10 text-amber-200"
            : isError
              ? "border-rose-400/40 bg-rose-400/10 text-rose-200"
              : "border-emerald-400/40 bg-emerald-400/10 text-emerald-200"
        }`}
      >
        {index + 1}
      </span>

      <div className="rounded-xl border border-zinc-800/90 bg-zinc-900/70 p-4 backdrop-blur-sm">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="font-mono text-sm text-violet-300">{step.name}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${
              isPending
                ? "bg-amber-400/10 text-amber-200"
                : isError
                  ? "bg-rose-400/10 text-rose-200"
                  : "bg-emerald-400/10 text-emerald-200"
            }`}
          >
            {stateLabel(step.state)}
          </span>
        </div>

        <p className="text-sm text-zinc-400">{formatArgs(step)}</p>

        {step.state === "done" && step.name === "searchVenues" && (
          <ul className="mt-3 space-y-1 text-sm text-zinc-300">
            {step.result.map((venue) => (
              <li key={venue.id}>
                {venue.name} · {venue.capacity} guests · {venue.vibe}
              </li>
            ))}
          </ul>
        )}

        {step.state === "done" && step.name === "getVenueEvents" && (
          <ul className="mt-3 space-y-1 text-sm text-zinc-300">
            {step.result.length === 0 ? (
              <li>No events matched the filter.</li>
            ) : (
              step.result.map((event) => (
                <li key={event.id}>
                  {event.title} · {new Date(event.startsAt).toLocaleString()} ·{" "}
                  {event.openSlots} open
                </li>
              ))
            )}
          </ul>
        )}

        {step.state === "error" && (
          <p className="mt-3 text-sm text-rose-300">{step.error}</p>
        )}
      </div>
    </li>
  );
}
