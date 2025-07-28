"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "How it Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Demo", href: "#demo" },
  ]

  const scrollToSection = (href: string) => {
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)

    if (element) {
      const navHeight = 100 // Account for fixed navigation height
      const elementPosition = element.offsetTop - navHeight

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }

    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`glass-card rounded-2xl transition-all duration-300 ${
            isScrolled ? "glass-card-strong" : "glass-card"
          } hover:glass-card-hover`}
        >
          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("#hero")}
              className="flex items-center space-x-2 group cursor-pointer"
            >
              <div className="w-8 h-8 glass-button rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-xl font-bold glow-text-subtle group-hover:glow-text transition-all duration-300">
                <span className="text-white">Liaiser</span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:glass-card-subtle transition-all duration-300 hover:scale-105 group cursor-pointer"
                >
                  <span className="group-hover:glow-text-subtle transition-all duration-300">{item.name}</span>
                </button>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                href="/login"
                className="px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:glass-card-subtle transition-all duration-300 hover:scale-105"
              >
                Sign In
              </Link>
              <button
                onClick={() => scrollToSection("#cta")}
                className="px-6 py-2 glass-button text-white font-medium rounded-lg hover:scale-105 transition-all duration-300 glow-box-subtle"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden glass-card p-2 rounded-lg hover:glass-card-hover transition-all duration-300 hover:scale-105"
            >
              <svg
                className={`w-6 h-6 text-white transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 pb-4 space-y-2 border-t border-white/10">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-4 py-3 text-gray-300 hover:text-white rounded-lg hover:glass-card-subtle transition-all duration-300 hover:scale-105 transform ${
                    isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 space-y-2">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-center text-gray-300 hover:text-white rounded-lg hover:glass-card-subtle transition-all duration-300"
                >
                  Sign In
                </Link>
                <button
                  onClick={() => scrollToSection("#cta")}
                  className="block w-full px-4 py-3 text-center glass-button text-white font-medium rounded-lg hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
