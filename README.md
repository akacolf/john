## John

AI chat interface for John — an AI assistant trained by Anaxonic, served at [john.quantumclub.sh](https://john.quantumclub.sh).

## Stack

- **Next.js 16** App Router
- **Vercel AI SDK** — streaming chat completions
- **OpenAI-compatible API** — plug in any endpoint (OpenAI, Ollama, vLLM, Modal, HuggingFace)
- **Tailwind CSS v4**
- **Bun** package manager

## Getting started

```bash
# Install dependencies
bun install

# Set up environment
cp .env.example .env.local
# Fill in OPENAI_API_KEY (and optionally OPENAI_BASE_URL / MODEL_NAME)

# Run dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Connecting to anaxonic-model

Set `OPENAI_BASE_URL` in `.env.local` to your inference server's OpenAI-compatible endpoint:

| Provider | Base URL |
|---|---|
| Ollama (local) | `http://localhost:11434/v1` |
| vLLM | `http://your-server:8000/v1` |
| Modal | `https://your-app.modal.run/v1` |
| HuggingFace Endpoints | `https://your-endpoint.aws.huggingface.cloud/v1` |

Then set `MODEL_NAME=anaxonic-model` (or whatever your model is registered as).

## Deploy

Deploy to Vercel and add `john.quantumclub.sh` as a custom domain.

```bash
vercel --prod
```
