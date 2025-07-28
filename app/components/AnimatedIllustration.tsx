"use client"

import { useEffect, useRef } from "react"

export function AnimatedIllustration() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      // Apply a subtle 3D rotation effect based on mouse position
      container.style.transform = `
        perspective(1000px)
        rotateY(${x * 10}deg)
        rotateX(${-y * 10}deg)
      `
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto transition-transform duration-200 ease-out">
      <div className="relative z-10">
        <div className="w-64 h-64 md:w-80 md:h-80 mx-auto">
          <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 animate-pulse"></div>

          {/* Phone frame */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-72 md:w-48 md:h-80 bg-gray-800 rounded-3xl border-4 border-gray-700 shadow-xl overflow-hidden">
              {/* Phone screen */}
              <div className="h-full w-full bg-gray-900 p-3">
                {/* Chat interface */}
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-24 h-3 bg-gray-700 rounded-full"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 space-y-3 overflow-hidden">
                    <div className="w-3/4 h-8 bg-gray-800 rounded-lg animate-pulse"></div>
                    <div
                      className="w-2/3 h-8 bg-gray-800 rounded-lg ml-auto animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                      className="w-3/4 h-8 bg-blue-600/30 rounded-lg animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                      className="w-2/3 h-8 bg-gray-800 rounded-lg ml-auto animate-pulse"
                      style={{ animationDelay: "1.5s" }}
                    ></div>
                    <div
                      className="w-3/4 h-8 bg-blue-600/30 rounded-lg animate-pulse"
                      style={{ animationDelay: "2s" }}
                    ></div>
                  </div>

                  {/* Input area */}
                  <div className="h-10 bg-gray-800 rounded-full mt-2 flex items-center px-3">
                    <div className="w-full h-3 bg-gray-700 rounded-full"></div>
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full ml-2 flex-shrink-0"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div
            className="absolute top-0 left-0 w-16 h-16 bg-blue-500/20 rounded-full animate-float"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute bottom-0 right-0 w-20 h-20 bg-purple-500/20 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 right-0 w-12 h-12 bg-indigo-500/20 rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      </div>
    </div>
  )
}
