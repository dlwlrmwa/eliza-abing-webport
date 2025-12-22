"use client"

import { useEffect, useState } from "react"

interface Snowflake {
  id: number
  left: number
  delay: number
  duration: number
  size: number
}

export function SnowflakeEffect() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])

  useEffect(() => {
    // Generate snowflakes
    const generateSnowflakes = () => {
      const flakes: Snowflake[] = []
      for (let i = 0; i < 50; i++) {
        flakes.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 10 + Math.random() * 10,
          size: 4 + Math.random() * 6,
        })
      }
      setSnowflakes(flakes)
    }

    generateSnowflakes()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes snowfall {
          to {
            transform: translateY(100vh) translateX(100px);
            opacity: 0;
          }
        }

        .snowflake {
          position: absolute;
          top: -10px;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, rgba(201, 168, 209, 0.8), rgba(201, 168, 209, 0.4));
          border-radius: 50%;
          filter: drop-shadow(0 0 4px rgba(201, 168, 209, 0.5));
          animation: snowfall linear infinite;
        }
      `}</style>

      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  )
}
