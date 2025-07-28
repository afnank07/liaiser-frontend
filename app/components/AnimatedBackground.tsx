"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle system
    const particles: Particle[] = []
    const connections: Connection[] = []
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100)

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(${59 + Math.random() * 40}, ${130 + Math.random() * 40}, ${246 + Math.random() * 10}, ${
          0.3 + Math.random() * 0.4
        })`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    class Connection {
      p1: Particle
      p2: Particle
      distance: number
      opacity: number

      constructor(p1: Particle, p2: Particle) {
        this.p1 = p1
        this.p2 = p2
        this.distance = 0
        this.opacity = 0
      }

      update() {
        const dx = this.p1.x - this.p2.x
        const dy = this.p1.y - this.p2.y
        this.distance = Math.sqrt(dx * dx + dy * dy)

        // Only show connections within a certain range
        const maxDistance = 150
        this.opacity = this.distance < maxDistance ? (1 - this.distance / maxDistance) * 0.2 : 0
      }

      draw() {
        if (this.opacity <= 0) return

        ctx.strokeStyle = `rgba(99, 102, 241, ${this.opacity})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(this.p1.x, this.p1.y)
        ctx.lineTo(this.p2.x, this.p2.y)
        ctx.stroke()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Create connections between particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        connections.push(new Connection(particles[i], particles[j]))
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Update and draw connections
      connections.forEach((connection) => {
        connection.update()
        connection.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
}
