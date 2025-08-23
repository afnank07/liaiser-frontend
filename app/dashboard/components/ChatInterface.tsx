"use client"

import { useState, useEffect } from "react"

interface Message {
  id: string
  sender: "user" | "ai"
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  initialMessage: string
  onComplete: (finalContext: string) => void
}

export function ChatInterface({ initialMessage, onComplete }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [isAITyping, setIsAITyping] = useState(false)
  const [conversationStep, setConversationStep] = useState(0)
  const [messageCounter, setMessageCounter] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [qaPairs, setQaPairs] = useState<{ question: string; answer: string }[]>([])

  const aiQuestions = [
    "Thanks! That's a great start. Could you tell me what specific problem this product solves for them?",
    "Perfect! What's the typical budget range your ideal customers work with for solutions like this?",
    "Which domain will this product serve? For example, DeFi, NFT, GameFi, DAOs, etc.",
    "Which chain do you want to focus on? For example, Ethereum, Solana, Aptos, etc.",
    "Are you targeting any specific roles? For example, founders, marketers, business developers, etc.",
    "Great insights! Based on what you've shared, I'll create a targeted outreach strategy. Let me summarize your campaign context.",
  ]

  useEffect(() => {
    // Reset conversation step and message counter
    setConversationStep(0)
    setMessageCounter(1)
    setAnswers([])
    // Add initial user message
    setMessages([
      {
        id: "msg-0-user",
        sender: "user",
        content: initialMessage,
        timestamp: new Date(),
      },
      {
        id: "msg-1-ai-0",
        sender: "ai",
        content: aiQuestions[0],
        timestamp: new Date(),
      },
    ])
    setConversationStep(1)
    setMessageCounter(2)
    setIsAITyping(false)
  }, [initialMessage])

  const handleSendMessage = async () => {
    if (!currentInput.trim()) return

    const newMessage: Message = {
      id: `msg-${messageCounter}-user-${conversationStep}`,
      sender: "user",
      content: currentInput,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setAnswers((prev) => [...prev, currentInput])
    if (conversationStep > 0 && conversationStep <= aiQuestions.length) {
      setQaPairs((prev) => [...prev, { question: aiQuestions[conversationStep - 1], answer: currentInput }])
    }
    setCurrentInput("")
    setIsAITyping(true)
    const nextCounter = messageCounter + 1

    setTimeout(async () => {
      if (conversationStep < aiQuestions.length) {
        if (conversationStep === aiQuestions.length - 1) {
          // Send all questions and answers to API endpoint
          let finalContext = ""
          try {
            const response = await fetch("http://localhost:8000/api/campaign-context", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                initialMessage,
                qaPairs: [...qaPairs, { question: aiQuestions[conversationStep], answer: currentInput }],
              }),
            })
            const data = await response.json()
            finalContext = data.finalContext || "No context returned."
          } catch (err) {
            finalContext = "Error fetching campaign context."
          }

          setMessages((prev) => [
            ...prev,
            {
              id: `msg-${nextCounter}-ai-${conversationStep}`,
              sender: "ai",
              content: aiQuestions[conversationStep],
              timestamp: new Date(),
            },
          ])
          setMessageCounter(nextCounter + 1)

          setTimeout(() => {
            onComplete(finalContext)
          }, 2000)
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: `msg-${nextCounter}-ai-${conversationStep}`,
              sender: "ai",
              content: aiQuestions[conversationStep],
              timestamp: new Date(),
            },
          ])
          setMessageCounter(nextCounter + 1)
        }
        setConversationStep((prev) => prev + 1)
      }
      setIsAITyping(false)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="h-96 overflow-y-auto space-y-4 p-4 glass-card rounded-xl hover:glass-card-hover transition-all duration-200">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
              {message.sender === "ai" && (
                <div className="w-8 h-8 glass-button rounded-full flex items-center justify-center flex-shrink-0 glow-box-subtle">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
              <div
                className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                  message.sender === "user"
                    ? "glass-button text-white glow-box-subtle"
                    : "glass-card text-gray-200 hover:glass-card-hover"
                }`}
              >
                {message.sender === "ai" && (
                  <div className="text-xs text-blue-400 mb-1 glow-text-subtle">AI Strategist</div>
                )}
                <p className="text-sm">{message.content}</p>
              </div>
              {message.sender === "user" && (
                <div className="w-8 h-8 glass-card rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}

        {isAITyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 glass-button rounded-full flex items-center justify-center glow-box-subtle">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="glass-card px-4 py-2 rounded-xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {conversationStep < aiQuestions.length && (
        <div className="flex space-x-2">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your response..."
            className="flex-1 px-4 py-2 glass-card rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 hover:glass-card-hover transition-all duration-200"
          />
          <button
            onClick={handleSendMessage}
            disabled={!currentInput.trim() || isAITyping}
            className="px-4 py-2 glass-button text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed glow-box-subtle"
          >
            Send
          </button>
        </div>
      )}
    </div>
  )
}
