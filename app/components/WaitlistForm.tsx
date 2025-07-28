"use client"

import type React from "react"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const created_at = new Date().toISOString()
    const { error } = await supabase.from('waitlist').insert([{ email, created_at }])
    setIsLoading(false)
    if (error) {
      alert(error.message)
      return
    }
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto">
        <div className="glass-card-strong rounded-2xl p-8 text-center hover:glass-card-hover transition-all duration-300">
          <div className="w-16 h-16 glass-button rounded-full flex items-center justify-center mx-auto mb-4 glow-box">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">You're on the waitlist!</h3>
          <p className="text-gray-300">We'll notify you when Liaiser is ready to transform your sales process.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="relative group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="w-full px-6 py-4 glass-card rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-lg transition-all duration-300 hover:glass-card-hover"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-2 bottom-2 px-8 glass-button text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px] hover:scale-105 active:scale-95"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            "Join Waitlist"
          )}
        </button>
      </div>
      <p className="text-sm text-gray-400 mt-3 text-center">Join 2,000+ sales professionals already on the waitlist</p>
    </form>
  )
}
