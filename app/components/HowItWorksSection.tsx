"use client"

import { useScrollAnimation } from "../hooks/useScrollAnimation"

const steps = [
  {
    number: "01",
    title: "Define Your Ideal Customer",
    description:
      "Our AI analyzes your product and target market to create detailed customer profiles and messaging strategies.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI Agents Start Conversations",
    description:
      "Smart agents reach out to prospects on Telegram with personalized messages that feel natural and engaging.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Convert to Qualified Leads",
    description:
      "Interested prospects are seamlessly handed off to your sales team with full conversation context and insights.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
]

export function HowItWorksSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
            How <span className="text-blue-500">Liaiser</span> Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our AI-powered platform transforms your sales process in three simple steps, turning cold prospects into
            warm conversations automatically.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line with Glass Effect */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative transform transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Step Card with Glass Effect */}
                <div className="glass-card rounded-2xl p-8 text-center hover:glass-card-hover transition-all duration-300 group hover:scale-105">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 glass-button rounded-full mb-6 group-hover:scale-110 transition-all duration-300 glow-box-subtle">
                    <span className="text-blue-400 font-bold text-lg group-hover:text-blue-300">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="text-blue-500 mb-4 flex justify-center group-hover:text-blue-400 transition-colors duration-300 group-hover:scale-110">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-blue-100 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>

                {/* Connector Dot with Glass Effect */}
                <div className="hidden md:block absolute top-1/2 -right-6 w-3 h-3 bg-blue-500 rounded-full transform -translate-y-1/2 z-10 glow-dot"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
