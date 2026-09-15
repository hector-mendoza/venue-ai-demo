"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo } from "react";
import { AnswerStream } from "@/components/AnswerStream";
import { Composer } from "@/components/Composer";
import { Hero } from "@/components/Hero";
import { ToolTrail } from "@/components/ToolTrail";
import type { ChatMessage } from "@/lib/chat/types";

function toChatMessages(
  messages: ReturnType<typeof useChat>["messages"],
): ChatMessage[] {
  return messages
    .filter((message) => message.role === "user" || message.role === "assistant")
    .map((message) => ({
      role: message.role as "user" | "assistant",
      content: message.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join(""),
    }))
    .filter((message) => message.content.length > 0);
}

export default function Home() {
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest({ messages }) {
          return {
            body: {
              messages: toChatMessages(messages),
            },
          };
        },
      }),
    [],
  );

  const { messages, sendMessage, status, error } = useChat({ transport });

  const isBusy = status === "submitted" || status === "streaming";
  const hasStarted = messages.some((message) => message.role === "assistant");

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top,_rgba(88,80,236,0.12),_transparent_45%),_#09090b]">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10 sm:px-8 sm:py-14">
        <Hero />

        <Composer
          disabled={isBusy}
          onSubmit={(text) => {
            sendMessage({ text });
          }}
        />

        {error && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error.message}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <ToolTrail messages={messages} isActive={isBusy} />
          <AnswerStream
            messages={messages}
            isStreaming={status === "streaming"}
            hasStarted={hasStarted}
          />
        </div>
      </main>
    </div>
  );
}
