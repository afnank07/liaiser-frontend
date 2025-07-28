"use client"

import { useEffect, useState } from "react"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

export function VisualShowcaseSection() {
  const [activeTab, setActiveTab] = useState(0)
  const { ref, isVisible } = useScrollAnimation()

  const tabs = [
    { name: "Dashboard", id: "dashboard" },
    { name: "Conversations", id: "conversations" },
    { name: "Analytics", id: "analytics" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
            See <span className="text-blue-500">Liaiser</span> in Action
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the power of AI-driven sales automation with our intuitive dashboard and real-time conversation
            management.
          </p>
        </div>

        {/* Tab Navigation with Glass Effect */}
        <div
          className={`flex justify-center mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="glass-card rounded-2xl p-2 hover:glass-card-hover transition-all duration-300">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  activeTab === index
                    ? "glass-button text-white glow-box"
                    : "text-gray-400 hover:text-white hover:glass-card-subtle"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Preview with Enhanced Glass Effect */}
        <div
          className={`relative max-w-5xl mx-auto transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="glass-card-strong rounded-3xl p-8 shadow-2xl hover:glass-card-hover transition-all duration-300">
            {/* Browser Header */}
            <div className="flex items-center mb-6">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors duration-200"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors duration-200"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors duration-200"></div>
              </div>
              <div className="flex-1 mx-4">
                <div className="glass-card rounded-lg px-4 py-2 text-sm text-gray-300 hover:glass-card-hover transition-all duration-200">
                  app.liaiser.com/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white glow-text-subtle">Campaign Overview</h3>
                  <p className="text-gray-300">Active outreach campaigns</p>
                </div>
                <div className="glass-button px-4 py-2 rounded-lg font-medium hover:scale-105 transition-all duration-200 cursor-pointer text-white">
                  New Campaign
                </div>
              </div>

              {/* Stats Grid with Glass Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: "Active Campaigns", value: "12", change: "+3" },
                  { label: "Conversations", value: "1,247", change: "+156" },
                  { label: "Qualified Leads", value: "89", change: "+23" },
                  { label: "Conversion Rate", value: "7.1%", change: "+1.2%" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="glass-card rounded-xl p-4 hover:glass-card-hover transition-all duration-200 hover:scale-105 cursor-pointer"
                  >
                    <div className="text-2xl font-bold text-white mb-1 glow-text-subtle">{stat.value}</div>
                    <div className="text-sm text-gray-300 mb-2">{stat.label}</div>
                    <div className="text-xs text-green-400">{stat.change}</div>
                  </div>
                ))}
              </div>

              {/* Campaign List with Glass Effect */}
              <div className="glass-card rounded-xl p-6 hover:glass-card-hover transition-all duration-200">
                <h4 className="text-lg font-semibold text-white mb-4">Recent Conversations</h4>
                <div className="space-y-3">
                  {[
                    { name: "@sarah_marketing", status: "In Progress", time: "2m ago" },
                    { name: "@mike_startup", status: "Qualified", time: "15m ago" },
                    { name: "@jenny_ceo", status: "Closed", time: "1h ago" },
                  ].map((conversation, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 hover:glass-card-subtle rounded-lg px-2 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 glass-button rounded-full flex items-center justify-center text-white text-sm font-medium hover:scale-110 transition-all duration-200 glow-box-subtle">
                          {conversation.name[1].toUpperCase()}
                        </div>
                        <div>
                          <div className="text-white font-medium">{conversation.name}</div>
                          <div className="text-sm text-gray-300">{conversation.time}</div>
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 glass-card ${
                          conversation.status === "Qualified"
                            ? "text-green-400 border-green-500/30"
                            : conversation.status === "In Progress"
                              ? "text-blue-400 border-blue-500/30"
                              : "text-gray-400 border-gray-500/30"
                        }`}
                      >
                        {conversation.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl blur-3xl -z-10 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
