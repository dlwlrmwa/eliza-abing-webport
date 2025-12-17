"use client"

import { useEffect, useState } from "react"

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  life: number
}

export function SparkleCursor() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    let sparkleId = 0
    const maxSparkles = 15

    const handleMouseMove = (e: MouseEvent) => {
      const newSparkle: Sparkle = {
        id: sparkleId++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 4,
        life: 1,
      }

      setSparkles((prev) => {
        const updated = [...prev, newSparkle]
        return updated.slice(-maxSparkles)
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animate sparkles
    const interval = setInterval(() => {
      setSparkles((prev) =>
        prev
          .map((sparkle) => ({
            ...sparkle,
            life: sparkle.life - 0.05,
            y: sparkle.y - 1,
          }))
          .filter((sparkle) => sparkle.life > 0)
      )
    }, 50)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full bg-primary animate-pulse"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            opacity: sparkle.life,
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 ${sparkle.size}px ${sparkle.size / 2}px rgba(249, 168, 212, 0.6)`,
            transition: "opacity 0.05s ease-out",
          }}
        />
      ))}
    </div>
  )
}