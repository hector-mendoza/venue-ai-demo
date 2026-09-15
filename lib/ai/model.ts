import { anthropic } from "@ai-sdk/anthropic";

const DEFAULT_MODEL = "claude-haiku-4-5";

export function getModel() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is required");
  }

  const modelId = process.env.ANTHROPIC_MODEL ?? DEFAULT_MODEL;

  return anthropic(modelId);
}
