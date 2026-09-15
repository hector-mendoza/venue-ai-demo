import type { UIMessage } from "ai";
import type {
  GetVenueEventsArgs,
  SearchVenuesArgs,
  ToolStep,
  VenueEvent,
  VenueSummary,
} from "@/lib/chat/types";
import { ToolStepCard } from "@/components/ToolStepCard";

type ToolTrailProps = {
  messages: UIMessage[];
  isActive: boolean;
};

function isSearchVenuesArgs(value: unknown): value is SearchVenuesArgs {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  return typeof record.city === "string" && record.city.length > 0;
}

function isGetVenueEventsArgs(value: unknown): value is GetVenueEventsArgs {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  return typeof record.venueId === "string" && record.venueId.length > 0;
}

function isVenueSummaryArray(value: unknown): value is VenueSummary[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as VenueSummary).id === "string" &&
        typeof (item as VenueSummary).name === "string" &&
        typeof (item as VenueSummary).city === "string" &&
        typeof (item as VenueSummary).capacity === "number" &&
        typeof (item as VenueSummary).vibe === "string",
    )
  );
}

function isVenueEventArray(value: unknown): value is VenueEvent[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as VenueEvent).id === "string" &&
        typeof (item as VenueEvent).venueId === "string" &&
        typeof (item as VenueEvent).title === "string" &&
        typeof (item as VenueEvent).startsAt === "string" &&
        typeof (item as VenueEvent).openSlots === "number",
    )
  );
}

function extractToolSteps(messages: UIMessage[]): ToolStep[] {
  const steps: ToolStep[] = [];

  for (const message of messages) {
    if (message.role !== "assistant") {
      continue;
    }

    for (const part of message.parts) {
      if (part.type === "tool-searchVenues") {
        const args = isSearchVenuesArgs(part.input)
          ? part.input
          : { city: "unknown" };

        if (part.state === "output-error") {
          steps.push({
            id: part.toolCallId,
            name: "searchVenues",
            args,
            state: "error",
            error: part.errorText,
          });
          continue;
        }

        if (
          part.state === "output-available" &&
          isVenueSummaryArray(part.output)
        ) {
          steps.push({
            id: part.toolCallId,
            name: "searchVenues",
            args,
            state: "done",
            result: part.output,
          });
          continue;
        }

        steps.push({
          id: part.toolCallId,
          name: "searchVenues",
          args,
          state: "pending",
        });
      }

      if (part.type === "tool-getVenueEvents") {
        const args = isGetVenueEventsArgs(part.input)
          ? part.input
          : { venueId: "unknown" };

        if (part.state === "output-error") {
          steps.push({
            id: part.toolCallId,
            name: "getVenueEvents",
            args,
            state: "error",
            error: part.errorText,
          });
          continue;
        }

        if (
          part.state === "output-available" &&
          isVenueEventArray(part.output)
        ) {
          steps.push({
            id: part.toolCallId,
            name: "getVenueEvents",
            args,
            state: "done",
            result: part.output,
          });
          continue;
        }

        steps.push({
          id: part.toolCallId,
          name: "getVenueEvents",
          args,
          state: "pending",
        });
      }
    }
  }

  return steps;
}

export function ToolTrail({ messages, isActive }: ToolTrailProps) {
  const steps = extractToolSteps(messages);

  return (
    <section className="rounded-2xl border border-zinc-800/80 bg-zinc-950/80 p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          Tool trail
        </h2>
        {isActive && steps.length > 0 && (
          <span className="text-xs text-zinc-500">Live</span>
        )}
      </div>

      {steps.length === 0 ? (
        <p className="text-sm text-zinc-500">
          Submit a question to watch searchVenues → getVenueEvents run in
          sequence.
        </p>
      ) : (
        <ol className="space-y-5">
          {steps.map((step, index) => (
            <ToolStepCard key={step.id} step={step} index={index} />
          ))}
        </ol>
      )}
    </section>
  );
}
