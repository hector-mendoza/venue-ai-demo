export function Hero() {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black px-8 py-10 shadow-[0_0_80px_-20px_rgba(120,113,255,0.35)]">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

      <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-zinc-500">
        Architect · Venue Intelligence
      </p>
      <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        Ask one event question. Watch two tools run in sequence. Get a streamed,
        venue-grounded answer.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
        Premium multi-step demo — deterministic venue catalog, visible tool
        trail, Anthropic-powered synthesis. No live URVenue APIs, no auth, no
        database.
      </p>
    </header>
  );
}
