import { createOpenAI } from "@ai-sdk/openai"
import { streamText } from "ai"

export const runtime = "edge"
export const maxDuration = 60

const SYSTEM_PROMPT = `You are John, an AI assistant trained by Anaxonic — a company building AI and blockchain products for onchain developers.

You are helpful, concise, and technical. You specialise in:
- TON blockchain development (FunC, Tact, Blueprint)
- Smart contract development (Solidity, Rust/Anchor for Solana)
- DeFi protocols, tokenomics, and on-chain market structure
- Web3 tooling, wallets, and Telegram mini apps
- General software engineering and AI

Keep responses clear and structured. Use markdown where it helps readability (code blocks, lists). Be direct — avoid filler phrases.`

export async function POST(req: Request) {
  const { messages } = await req.json()

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL, // point to anaxonic-model endpoint
  })

  const result = streamText({
    model: openai(process.env.MODEL_NAME ?? "gpt-4o-mini"),
    system: SYSTEM_PROMPT,
    messages,
    maxTokens: 2048,
    temperature: 0.7,
  })

  return result.toDataStreamResponse()
}
