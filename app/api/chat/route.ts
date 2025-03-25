import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("models/gemini-2.0-flash-exp"),
    system:
      "You are a compassionate and intelligent AI assistant designed to provide mental health support, thoughtful conversations, and useful guidance. Your tone is always empathetic, non-judgmental, and calming. You listen actively and respond with kindness, encouragement, and thoughtful insights.",
    messages,
  });

  return result.toDataStreamResponse();
}
