"use client"

import { useChat } from "@ai-sdk/react"
import { useEffect, useRef } from "react"
import { Icon } from "@iconify/react"
import { Message } from "@/components/message"

const SUGGESTIONS = [
  "How do I deploy a smart contract on TON?",
  "Explain bonding curves in DeFi",
  "Write a FunC function to send TON",
  "What is the Quantum Club app?",
]

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({ api: "/api/chat" })

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto-resize textarea
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e)
    e.target.style.height = "auto"
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + "px"
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (input.trim() && !isLoading) {
        handleSubmit(e as unknown as React.FormEvent)
      }
    }
  }

  const isEmpty = messages.length === 0

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] text-[#fafafa]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#262626]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight">John</span>
            <span className="text-[10px] uppercase tracking-widest text-[#737373] font-medium border border-[#262626] rounded-full px-2 py-0.5">
              Beta
            </span>
          </div>
        </div>
        <a
          href="https://quantumclub.sh"
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#fafafa] transition-colors"
        >
          Anaxonic
          <Icon icon="solar:arrow-right-up-linear" className="w-3 h-3" />
        </a>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full px-6 pb-32 gap-8">
            <div className="text-center">
              <h1 className="text-2xl font-semibold tracking-tight mb-2">
                Hi, I&apos;m John.
              </h1>
              <p className="text-[#737373] text-sm leading-relaxed max-w-sm">
                An AI trained by Anaxonic to help onchain developers build
                faster.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    handleInputChange({
                      target: { value: s },
                    } as React.ChangeEvent<HTMLTextAreaElement>)
                    inputRef.current?.focus()
                  }}
                  className="text-left text-sm text-[#a3a3a3] border border-[#262626] rounded-xl px-4 py-3 hover:border-[#404040] hover:text-[#fafafa] transition-all bg-[#0f0f0f]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
            {messages.map((m) => (
              <Message key={m.id} message={m} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-[#737373]">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#737373] animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#737373] animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#737373] animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            {error && (
              <div className="text-sm text-red-400 border border-red-900/50 rounded-xl px-4 py-3 bg-red-950/20">
                Something went wrong. Please try again.
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </main>

      {/* Input */}
      <div className="px-4 pb-6 pt-4">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl"
        >
          <div className="flex items-end gap-2 bg-[#141414] border border-[#262626] rounded-2xl px-4 py-3 focus-within:border-[#404040] transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Ask John anything…"
              rows={1}
              className="flex-1 bg-transparent text-sm text-[#fafafa] placeholder:text-[#525252] resize-none outline-none leading-relaxed max-h-[200px] min-h-[24px]"
              style={{ height: "24px" }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="shrink-0 w-8 h-8 rounded-xl bg-[#fafafa] text-[#0a0a0a] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-all"
            >
              <Icon icon="solar:arrow-up-linear" className="w-4 h-4" />
            </button>
          </div>
          <p className="text-center text-[10px] text-[#525252] mt-3">
            John can make mistakes. Verify important information.
          </p>
        </form>
      </div>
    </div>
  )
}
