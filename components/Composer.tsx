"use client";

import { FormEvent, useState } from "react";

type ComposerProps = {
  onSubmit: (text: string) => void;
  disabled: boolean;
};

const SUGGESTIONS = [
  "Rooftop venue in Austin for ~250 guests with events in mid-October?",
  "Industrial loft in New York for a product launch — what's available?",
  "Creative studio in Los Angeles with open slots next week?",
];

export function Composer({ onSubmit, disabled }: ComposerProps) {
  const [input, setInput] = useState(SUGGESTIONS[0]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || disabled) {
      return;
    }
    onSubmit(trimmed);
  }

  return (
    <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label
          htmlFor="venue-question"
          className="block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500"
        >
          Your event question
        </label>
        <textarea
          id="venue-question"
          rows={3}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={disabled}
          className="w-full resize-none rounded-xl border border-zinc-700/80 bg-zinc-950/80 px-4 py-3 text-sm text-zinc-100 outline-none ring-violet-400/40 placeholder:text-zinc-600 focus:border-violet-400/50 focus:ring-2 disabled:opacity-60"
          placeholder="Ask about venues, capacity, vibe, or upcoming events…"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                disabled={disabled}
                onClick={() => setInput(suggestion)}
                className="rounded-full border border-zinc-700/80 px-3 py-1 text-xs text-zinc-400 transition hover:border-zinc-500 hover:text-zinc-200 disabled:opacity-50"
              >
                Try sample
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            className="rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
          >
            Run demo
          </button>
        </div>
      </form>
    </section>
  );
}
