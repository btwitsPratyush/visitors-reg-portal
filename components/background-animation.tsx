"use client"

import { useEffect, useState, memo, useMemo } from "react"

// Use memo to prevent unnecessary re-renders
const BackgroundAnimation = memo(function BackgroundAnimation() {
  const [mounted, setMounted] = useState(false)

  // Only render on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate particles once using useMemo
  const particles = useMemo(
    () =>
      Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        size: Math.random() * 15 + 5,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      })),
    [],
  )

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-30">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-100"
          style={{
            backgroundSize: "400% 400%",
            animation: "gradient-animation 15s ease infinite",
          }}
        />

        {/* Floating particles - reduced number for better performance */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-emerald-500/30"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float-animation ${particle.duration}s linear infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
})

export default BackgroundAnimation
