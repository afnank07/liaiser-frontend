"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { setCampaigns } from "@/lib/redux/campaignsSlice"
import { ChatInterface } from "./ChatInterface"

type BuilderState = "initial" | "chatting" | "completed"

export function AIContextBuilder() {
  const [state, setState] = useState<BuilderState>("initial")
  const [initialInput, setInitialInput] = useState("")
  const [finalContext, setFinalContext] = useState("")
  const dispatch = useDispatch()

  const handleBegin = () => {
    if (initialInput.trim()) {
      setState("chatting")
    }
  }

  const handleChatComplete = (context: string) => {
    setFinalContext(context)
    setState("completed")
  }

  const handleLaunchCampaign = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/launch-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary: finalContext }),
      })
      const data = await response.json()
      if (data && data.campaigns) {
        dispatch(setCampaigns(data.campaigns))
      }
      console.log("Campaign launched:", data)
    } catch (err) {
      console.error("Error launching campaign:", err)
    }
  }

  const resetCampaign = async () => {
    setState("initial")
    setInitialInput("")
    setFinalContext("")
  }

  return (
    <div className="glass-card-strong rounded-2xl p-8 hover:glass-card-hover transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 glow-text-subtle">Create New Outreach Campaign</h2>

      {state === "initial" && (
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 glass-button rounded-full flex items-center justify-center flex-shrink-0 glow-box-subtle">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <div className="glass-card rounded-xl p-4 mb-4 hover:glass-card-hover transition-all duration-200">
                <p className="text-gray-200">
                  <strong className="text-blue-400 glow-text-subtle">AI Strategist:</strong> Hello! To find the perfect
                  customers for you, please describe your product or service.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <textarea
              value={initialInput}
              onChange={(e) => setInitialInput(e.target.value)}
              placeholder="Describe your product/service and ideal customer..."
              rows={4}
              className="w-full px-4 py-3 glass-card rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 resize-none hover:glass-card-hover transition-all duration-200"
            />
            <button
              onClick={handleBegin}
              disabled={!initialInput.trim()}
              className="px-6 py-3 glass-button text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed glow-box-subtle"
            >
              Begin
            </button>
          </div>
        </div>
      )}

      {state === "chatting" && <ChatInterface initialMessage={initialInput} onComplete={handleChatComplete} />}

      {state === "completed" && (
        <div className="space-y-6">
          <div className="glass-card rounded-xl p-6 hover:glass-card-hover transition-all duration-200">
            <h3 className="text-lg font-semibold mb-4 text-blue-400 glow-text-subtle">Final Campaign Context</h3>
            <p className="text-gray-200 leading-relaxed">{finalContext}</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleLaunchCampaign}
              className="px-8 py-3 glass-button text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 glow-box-subtle"
            >
              Launch Campaign
            </button>
            <button
              onClick={resetCampaign}
              className="px-8 py-3 glass-button text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 glow-box-subtle bg-red-500"
            >
              Reset Campaign
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
