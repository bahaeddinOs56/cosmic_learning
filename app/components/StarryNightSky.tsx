'use client'

import React, { useRef, useEffect } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  brightness: number
  twinkleSpeed: number
}

interface StarryNightSkyProps {
  theme: 'violet' | 'green' | 'red' | 'yellow'
}

const StarryNightSky: React.FC<StarryNightSkyProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    if (starsRef.current.length === 0) {
      const numStars = 300
      for (let i = 0; i < numStars; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.5,
          brightness: Math.random(),
          twinkleSpeed: Math.random() * 0.05 + 0.01
        })
      }
    }

    const getColor = (theme: string) => {
      switch (theme) {
        case 'violet': return 'rgba(139, 92, 246, '
        case 'green': return 'rgba(52, 211, 153, '
        case 'red': return 'rgba(248, 113, 113, '
        case 'yellow': return 'rgba(251, 191, 36, '
        default: return 'rgba(139, 92, 246, '
      }
    }

    const themeColor = getColor(theme)

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      starsRef.current.forEach(star => {
        star.brightness += star.twinkleSpeed
        if (star.brightness > 1 || star.brightness < 0) {
          star.twinkleSpeed = -star.twinkleSpeed
        }
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${themeColor}${star.brightness})`
        ctx.fill()
      })
    }

    let animationFrameId: number

    const animate = () => {
      draw()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      starsRef.current = starsRef.current.map(star => ({
        ...star,
        x: star.x * (canvas.width / window.innerWidth),
        y: star.y * (canvas.height / window.innerHeight)
      }))
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

export default StarryNightSky

