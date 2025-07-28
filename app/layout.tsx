import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Liaiser - AI Sales Agents",
  description: "Turn cold lists into warm leads with AI-powered Telegram outreach",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`} style={{ backgroundColor: "#111111", color: "white" }}>
        {children}
      </body>
    </html>
  )
}
