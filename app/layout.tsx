import type { Metadata, Viewport } from "next"
import { Onest } from "next/font/google"
import "./globals.css"

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: "variable",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://john.quantumclub.sh"),
  title: "John — AI by Anaxonic",
  description:
    "John is an AI assistant trained by Anaxonic, built to help onchain developers build faster.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "John — AI by Anaxonic",
    description: "AI assistant trained by Anaxonic for onchain developers.",
    url: "https://john.quantumclub.sh",
    siteName: "John by Anaxonic",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={onest.variable}>
      <body>{children}</body>
    </html>
  )
}
