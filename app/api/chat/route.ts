import { createOpenAI } from "@ai-sdk/openai"
import { streamText } from "ai"

export const runtime = "edge"
export const maxDuration = 60

const SYSTEM_PROMPT =
  "You are John, an AI assistant built by Anaxonic — a company building AI and blockchain " +
  "products for onchain developers. Answer directly and accurately. " +
  "Say when you are unsure rather than guessing."

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Points to the anaxonic-model serve.py HTTP server.
  // No third-party API key — auth is handled at the infra level.
  const anaxonic = createOpenAI({
    baseURL: process.env.ANAXONIC_MODEL_URL ?? "http://localhost:8000/v1",
    apiKey: process.env.ANAXONIC_MODEL_API_KEY ?? "none",
  })

  const result = streamText({
    model: anaxonic("john-sakura-1.0"),
    system: SYSTEM_PROMPT,
    messages,
    maxTokens: 512,
  })

  return result.toDataStreamResponse()
}
