"use client"

import { useEffect, useRef } from "react"

export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle system for flowing effects
    const particles: Particle[] = []
    const particleCount = 60

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      hue: number
      opacity: number
      life: number
      maxLife: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.3
        this.hue = 220 + Math.random() * 60 // Blue to purple range
        this.opacity = Math.random() * 0.5 + 0.2
        this.life = 0
        this.maxLife = Math.random() * 300 + 200
      }

      update() {
        this.x += this.speedX + Math.sin(time * 0.001 + this.x * 0.001) * 0.1
        this.y += this.speedY + Math.cos(time * 0.001 + this.y * 0.001) * 0.1
        this.life++

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0

        // Fade in and out
        const lifeCycle = this.life / this.maxLife
        if (lifeCycle < 0.1) {
          this.opacity = (lifeCycle / 0.1) * 0.5
        } else if (lifeCycle > 0.9) {
          this.opacity = ((1 - lifeCycle) / 0.1) * 0.5
        }

        // Reset particle when it dies
        if (this.life >= this.maxLife) {
          this.life = 0
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
        }
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity

        // Create gradient for particle
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3)
        gradient.addColorStop(0, `hsl(${this.hue}, 70%, 60%)`)
        gradient.addColorStop(1, `hsl(${this.hue}, 70%, 60%, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 16 // Roughly 60fps

      // Create flowing aurora layers
      for (let layer = 0; layer < 4; layer++) {
        const gradient = ctx.createLinearGradient(
          Math.sin(time * 0.0005 + layer) * canvas.width * 0.3 + canvas.width * 0.5,
          0,
          Math.cos(time * 0.0003 + layer) * canvas.width * 0.3 + canvas.width * 0.5,
          canvas.height,
        )

        const hue1 = (240 + Math.sin(time * 0.001 + layer) * 30) % 360
        const hue2 = (280 + Math.cos(time * 0.0007 + layer) * 40) % 360
        const hue3 = (260 + Math.sin(time * 0.0013 + layer) * 20) % 360

        const baseOpacity = 0.03 + Math.sin(time * 0.001 + layer) * 0.02

        gradient.addColorStop(0, `hsla(${hue1}, 80%, 60%, ${baseOpacity})`)
        gradient.addColorStop(0.3, `hsla(${hue3}, 90%, 50%, ${baseOpacity * 1.5})`)
        gradient.addColorStop(0.7, `hsla(${hue2}, 70%, 70%, ${baseOpacity * 1.2})`)
        gradient.addColorStop(1, `hsla(${hue1}, 60%, 80%, ${baseOpacity * 0.8})`)

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Create mesh/wave patterns
      ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 + Math.sin(time * 0.001) * 0.05})`
      ctx.lineWidth = 1

      for (let i = 0; i < 8; i++) {
        ctx.beginPath()
        const waveY = canvas.height * 0.3 + Math.sin(time * 0.001 + i * 0.5) * 100
        const amplitude = 50 + Math.sin(time * 0.0007 + i) * 30

        for (let x = 0; x <= canvas.width; x += 10) {
          const y = waveY + Math.sin((x + time * 0.1) * 0.01 + i) * amplitude
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Add some sparkle effects
      for (let i = 0; i < 5; i++) {
        const sparkleX = Math.random() * canvas.width
        const sparkleY = Math.random() * canvas.height
        const sparkleSize = Math.random() * 2 + 1
        const sparkleOpacity = Math.random() * 0.3 + 0.1

        ctx.fillStyle = `rgba(255, 255, 255, ${sparkleOpacity})`
        ctx.beginPath()
        ctx.arc(sparkleX, sparkleY, sparkleSize, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />
}
