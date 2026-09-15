import { isStepCount, streamText } from "ai";
import { getModel } from "@/lib/ai/model";
import type { ChatMessage, PostChatBody } from "@/lib/chat/types";
import { getVenueEventsTool } from "@/lib/tools/get-venue-events";
import { searchVenuesTool } from "@/lib/tools/search-venues";

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are Architect, a premium venue discovery assistant for event planners.

Rules:
- For every user question, you MUST call searchVenues first, then getVenueEvents for the most relevant venue id from that search.
- Never invent venue ids. Only use ids returned by searchVenues.
- After both tools complete, write a concise, polished final answer that cites venue names, capacities, vibes, and specific events with dates and open slots.
- If no venues match, say so clearly and suggest broadening the search.
- Keep tone professional, warm, and confident — not chatbot-generic.`;

function toModelMessages(messages: ChatMessage[]) {
  return messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
}

export async function POST(req: Request) {
  const body = (await req.json()) as PostChatBody;

  if (!body.messages?.length) {
    return Response.json({ error: "messages are required" }, { status: 400 });
  }

  const result = streamText({
    model: getModel(),
    system: SYSTEM_PROMPT,
    messages: toModelMessages(body.messages),
    tools: {
      searchVenues: searchVenuesTool,
      getVenueEvents: getVenueEventsTool,
    },
    stopWhen: isStepCount(6),
  });

  return result.toUIMessageStreamResponse();
}
