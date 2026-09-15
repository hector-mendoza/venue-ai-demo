<<<<<<< HEAD
# venue-ai-demo
Premium multi-step AI demo: search venues → events trail → streamed answer (fake data, Anthropic)
=======
# Architect · Venue AI Demo

Premium multi-step AI demo for event venue discovery.

## Product claim

Ask **one** event or venue question. The assistant runs **searchVenues** and **getVenueEvents** in sequence with a **visible tool trail**, then streams a clear, polished final answer. All venue and event data is deterministic fake seed data — no live URVenue APIs, auth, database, or RAG.

## Local run

1. Install dependencies:

```bash
npm install
```

2. Set your Anthropic API key:

```bash
cp .env.example .env.local
# edit .env.local and set ANTHROPIC_API_KEY
```

3. Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), submit a venue question, and watch the two-step tool trail plus streamed answer.

## Environment

| Variable | Required | Description |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | Yes | Anthropic API key for `@ai-sdk/anthropic` |
| `ANTHROPIC_MODEL` | No | Model id override (default: `claude-sonnet-4-20250514`) |

## Stack

- Next.js App Router
- Vercel AI SDK (`streamText`, `isStepCount`, UI message stream)
- Anthropic via `@ai-sdk/anthropic`
>>>>>>> 482da8f (feat: premium multi-step AI venue demo with tool trail)
