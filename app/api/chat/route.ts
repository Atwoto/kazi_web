import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("qwen/qwen-2.5-72b-instruct", {
      baseURL: "https://openrouter.ai/api/v1",
    }),
    messages,
    system: "You are Kazi's helpful AI assistant. Kazi connects skilled East African freelancers with clients in Europe. You help answer questions about our services (Video Editing, Web Dev, Graphic Design, etc.), pricing, and process. Be concise, professional, and friendly.",
  });

  return result.toDataStreamResponse();
}
