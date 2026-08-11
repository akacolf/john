import type { Message as AIMessage } from "ai"

function renderContent(content: string) {
  // Simple markdown renderer — code blocks, inline code, bold, paragraphs
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Fenced code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }
      elements.push(
        <pre key={i} className="bg-[#111111] border border-[#262626] rounded-xl p-4 overflow-x-auto my-3">
          {lang && (
            <div className="text-[10px] text-[#525252] uppercase tracking-widest mb-2 font-mono">
              {lang}
            </div>
          )}
          <code className="text-sm font-mono text-[#e5e5e5] leading-relaxed">
            {codeLines.join("\n")}
          </code>
        </pre>
      )
      i++
      continue
    }

    // Heading
    if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="text-sm font-semibold mt-4 mb-1">{line.slice(4)}</h3>)
      i++; continue
    }
    if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-base font-semibold mt-5 mb-1">{line.slice(3)}</h2>)
      i++; continue
    }

    // List item
    if (line.match(/^[-*] /)) {
      const items: string[] = []
      while (i < lines.length && lines[i].match(/^[-*] /)) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={i} className="list-disc pl-5 space-y-1 my-2">
          {items.map((item, j) => (
            <li key={j} className="text-sm leading-relaxed text-[#e5e5e5]">
              {inlineRender(item)}
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Blank line
    if (line.trim() === "") {
      i++; continue
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-sm leading-relaxed text-[#e5e5e5] mb-2 last:mb-0">
        {inlineRender(line)}
      </p>
    )
    i++
  }

  return elements
}

function inlineRender(text: string): React.ReactNode {
  // Handle **bold** and `code`
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="font-mono text-[0.82em] bg-[#1a1a1a] border border-[#2a2a2a] rounded px-1.5 py-0.5 text-[#e5e5e5]">
          {part.slice(1, -1)}
        </code>
      )
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-[#fafafa]">{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export function Message({ message }: { message: AIMessage }) {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="shrink-0 w-6 h-6 rounded-full bg-[#fafafa] text-[#0a0a0a] flex items-center justify-center text-[10px] font-bold mr-3 mt-0.5">
          J
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-[#1a1a1a] border border-[#2a2a2a] text-[#fafafa] text-sm leading-relaxed"
            : "text-[#fafafa]"
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed">{message.content}</p>
        ) : (
          <div>{renderContent(message.content)}</div>
        )}
      </div>
    </div>
  )
}
