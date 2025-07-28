"use client"
import { WaitlistForm } from "./WaitlistForm"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

export function HeroSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 py-20 pt-32 overflow-hidden"
    >
      <div
        className={`max-w-6xl mx-auto text-center relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Badge with Glass Effect */}
        <div className="inline-flex items-center px-4 py-2 rounded-full glass-card text-blue-400 text-sm font-medium mb-8 hover:glass-card-hover transition-all duration-300 group">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse group-hover:animate-none group-hover:bg-blue-300"></div>
          AI-Powered Sales Automation
        </div>

        {/* Main Headline with Glow Effect */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
          Turn Cold Lists Into
          <br />
          <span className="text-blue-500 relative glow-text">
            Warm Conversations
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60 animate-pulse"></div>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Liaiser's intelligent agents engage your ideal customers on Telegram with personalized conversations that
          convert. Stop cold calling. Start closing deals.
        </p>

        {/* CTA */}
        <div className="mb-16">
          <WaitlistForm />
        </div>

        {/* Stats with Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { value: "24/7", label: "Active Outreach" },
            { value: "85%", label: "Response Rate" },
            { value: "3x", label: "Conversion Boost" },
          ].map((stat, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="glass-card rounded-2xl p-6 hover:glass-card-hover transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-blue-500 mb-2 group-hover:text-blue-400 transition-all duration-300 glow-text-subtle">
                  {stat.value}
                </div>
                <div className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
