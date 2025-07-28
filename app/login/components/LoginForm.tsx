"use client"

import type React from "react"


import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()

  const [showResend, setShowResend] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendMessage, setResendMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    let error = null
    if (isSignUp) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })
      error = signUpError
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      error = signInError
    }
    setIsLoading(false)
    if (error) {
      alert(error.message)
      if (error.message && error.message.toLowerCase().includes("email not confirmed")) {
        setShowResend(true)
      }
      return
    }
    router.push("/dashboard")
  }

  const handleResend = async () => {
    setResendLoading(true)
    setResendMessage("")
    const { error } = await supabase.auth.resend({ type: "signup", email })
    setResendLoading(false)
    if (error) {
      setResendMessage("Failed to resend confirmation email. Please try again later.")
    } else {
      setResendMessage("Confirmation email sent! Please check your inbox.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 glass-card rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 hover:glass-card-hover transition-all duration-200"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 glass-card rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 hover:glass-card-hover transition-all duration-200"
          placeholder="Enter your password"
        />
      </div>



      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 glass-button text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
      >
        {isLoading ? (isSignUp ? "Signing Up..." : "Signing In...") : isSignUp ? "Sign Up" : "Sign In"}
      </button>

      {showResend && (
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={handleResend}
            disabled={resendLoading}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 underline bg-transparent border-none cursor-pointer"
          >
            {resendLoading ? "Resending..." : "Resend confirmation email"}
          </button>
          {resendMessage && <div className="mt-2 text-green-400 text-sm">{resendMessage}</div>}
        </div>
      )}

      <div className="text-center">
        <button
          type="button"
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 underline bg-transparent border-none cursor-pointer"
          onClick={() => setIsSignUp((s) => !s)}
        >
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </button>
      </div>

      <div className="text-center">
        <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200">
          Forgot Password?
        </a>
      </div>
    </form>
  )
}
