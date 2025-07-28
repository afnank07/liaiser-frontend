"use client"

import { Navigation } from "./components/Navigation"
import { ScrollIndicator } from "./components/ScrollIndicator"
import { HeroSection } from "./components/HeroSection"
import { HowItWorksSection } from "./components/HowItWorksSection"
import { FeaturesSection } from "./components/FeaturesSection"
import { VisualShowcaseSection } from "./components/VisualShowcaseSection"
import { FinalCTASection } from "./components/FinalCTASection"
import { AuroraBackground } from "./components/AuroraBackground"

export default function LandingPage() {
  return (
    <div className="min-h-screen text-white relative" style={{ backgroundColor: "#111111" }}>
      {/* Aurora Background for Entire Page */}
      <div className="fixed inset-0 z-0">
        <AuroraBackground />
      </div>

      {/* Scroll Progress Indicator */}
      <ScrollIndicator />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* How it Works Section */}
        <section id="how-it-works">
          <HowItWorksSection />
        </section>

        {/* Features Section */}
        <section id="features">
          <FeaturesSection />
        </section>

        {/* Demo Section */}
        <section id="demo">
          <VisualShowcaseSection />
        </section>

        {/* CTA Section */}
        <section id="cta">
          <FinalCTASection />
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-6 glass-card-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="text-2xl font-bold mb-4 glow-text-subtle">
                <span className="text-white">Liaiser</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                AI-powered sales automation for the modern business. Transform your outreach with intelligent
                conversations that convert.
              </p>
              <div className="flex space-x-4">
                {/* Social Links */}
                {[
                  {
                    name: "Twitter",
                    icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                  },
                  {
                    name: "LinkedIn",
                    icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 2a2 2 0 100 4 2 2 0 000-4z",
                  },
                  {
                    name: "GitHub",
                    icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22",
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:glass-card-hover transition-all duration-300 hover:scale-110 group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                {[
                  { name: "Features", href: "#features" },
                  { name: "How it Works", href: "#how-it-works" },
                  { name: "Demo", href: "#demo" },
                ].map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        const element = document.getElementById(item.href.replace("#", ""))
                        if (element) {
                          const navHeight = 100
                          const elementPosition = element.offsetTop - navHeight
                          window.scrollTo({ top: elementPosition, behavior: "smooth" })
                        }
                      }}
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:glow-text-subtle cursor-pointer"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                {["Help Center", "Contact", "Status", "Privacy"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:glow-text-subtle"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <div className="text-sm text-gray-500">© 2024 Liaiser. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
