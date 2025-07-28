"use client"

import { WaitlistForm } from "./WaitlistForm"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

export function FinalCTASection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="py-24 px-6">
      <div
        className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="glass-card-strong rounded-3xl p-12 hover:glass-card-hover transition-all duration-300 relative overflow-hidden">
          {/* Animated background overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">Ready to Transform Your Sales Process?</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of sales professionals who are already using AI to automate their outreach and close more
              deals.
            </p>

            <WaitlistForm />

            <div className="mt-8 text-sm text-gray-400">No spam, ever. Unsubscribe at any time.</div>
          </div>
        </div>
      </div>
    </section>
  )
}
