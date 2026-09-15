# Architect · Venue AI Demo

Premium multi-step AI demo for event venue discovery.

## Product claim

Ask **once**. Watch **searchVenues** and **getVenueEvents** run in sequence on a visible tool trail. Get a clear, streamed final answer on a polished page — not a toy chat UI. All venue and event data is deterministic fake seed data (no live URVenue APIs, auth, database, or RAG).

## Local run

1. Install dependencies:

```bash
npm install
```

2. Configure Anthropic:

```bash
cp .env.example .env.local
# edit .env.local and set ANTHROPIC_API_KEY
```

3. Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), submit a venue question, and watch the tool trail plus streamed answer.

## Tools

The assistant always chains these two tools in order before answering:

1. **searchVenues** — `{ city, capacityMin?, vibe? }` → matching venue summaries (id, name, city, capacity, vibe)
2. **getVenueEvents** — `{ venueId, dateISO? }` → upcoming events for a venue id from search results (title, startsAt, openSlots)

Never invent venue ids — only ids returned by **searchVenues** are valid for **getVenueEvents**.

## Environment

| Variable | Required | Description |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | Yes | Anthropic API key for `@ai-sdk/anthropic` |
| `ANTHROPIC_MODEL` | No | Model id override (default: `claude-haiku-4-5`) |
