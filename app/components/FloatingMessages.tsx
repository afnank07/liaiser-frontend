"use client"

import { useEffect, useState } from "react"

interface Message {
  id: number
  text: string
  position: {
    x: number
    y: number
  }
  speed: {
    x: number
    y: number
  }
  size: string
  delay: number
  duration: number
}

export function FloatingMessages() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    // Sample messages related to AI sales
    const messageTexts = [
      "Hey there! 👋",
      "Interested in boosting sales?",
      "AI-powered conversations",
      "24/7 lead generation",
      "Automate your outreach",
      "Connect on Telegram",
      "Warm leads while you sleep",
      "Personalized at scale",
      "Smart conversations",
      "Close more deals",
    ]

    // Create random messages
    const newMessages = messageTexts.map((text, index) => {
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // Ensure messages are distributed across the viewport
      const sectionWidth = viewportWidth / 3
      const sectionHeight = viewportHeight / 4

      const sectionX = index % 3
      const sectionY = Math.floor(index / 3) % 4

      return {
        id: index,
        text,
        position: {
          x: sectionX * sectionWidth + Math.random() * sectionWidth * 0.8,
          y: sectionY * sectionHeight + Math.random() * sectionHeight * 0.8,
        },
        speed: {
          x: (Math.random() - 0.5) * 0.2,
          y: (Math.random() - 0.5) * 0.2,
        },
        size: ["small", "medium", "large"][Math.floor(Math.random() * 3)],
        delay: Math.random() * 5,
        duration: 15 + Math.random() * 10,
      }
    })

    setMessages(newMessages)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`absolute opacity-0 animate-float pointer-events-none ${
            message.size === "small"
              ? "text-xs bg-blue-500/10"
              : message.size === "medium"
                ? "text-sm bg-indigo-500/10"
                : "text-base bg-purple-500/10"
          } text-white px-4 py-2 rounded-2xl backdrop-blur-sm border border-white/10`}
          style={{
            left: `${message.position.x}px`,
            top: `${message.position.y}px`,
            animationDelay: `${message.delay}s`,
            animationDuration: `${message.duration}s`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {message.text}
        </div>
      ))}
    </div>
  )
}
