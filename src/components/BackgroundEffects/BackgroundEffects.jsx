import { useEffect, useRef, useMemo } from 'react'

function Particle({ style }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: '3px',
        height: '3px',
        background: style.color,
        boxShadow: `0 0 6px ${style.color}`,
        left: style.left,
        top: style.top,
        animation: `particle-drift ${style.duration}s ease-out ${style.delay}s infinite`,
        ...style,
      }}
    />
  )
}

export default function BackgroundEffects() {
  const canvasRef = useRef(null)

  // Floating particles: Chamber Rendezvous anchor style
  const particles = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 6,
      color: i % 3 === 0 ? 'rgba(201, 162, 39, 0.7)' : i % 3 === 1 ? 'rgba(75, 156, 211, 0.5)' : 'rgba(232, 197, 71, 0.4)',
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let offset = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gridSize = 40
      ctx.strokeStyle = 'rgba(201, 162, 39, 0.04)'
      ctx.lineWidth = 0.5

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines — slow drift
      const yOffset = offset % gridSize
      for (let y = -gridSize + yOffset; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Accent corner markers at intersections (sparse)
      ctx.fillStyle = 'rgba(201, 162, 39, 0.12)'
      for (let x = 0; x < canvas.width; x += gridSize * 4) {
        for (let y = -gridSize + yOffset; y < canvas.height; y += gridSize * 4) {
          ctx.fillRect(x - 1, y - 1, 2, 2)
        }
      }

      offset += 0.15
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated tactical grid */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Radial gradient vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(75,156,211,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(201,162,39,0.05) 0%, transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(75,156,211,0.03) 0%, transparent 50%)',
        }}
      />

      {/* Scan line — very subtle */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(201,162,39,0.08) 30%, rgba(201,162,39,0.12) 50%, rgba(201,162,39,0.08) 70%, transparent 100%)',
          animation: 'scan 12s linear infinite',
          top: 0,
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <Particle key={p.id} style={p} />
      ))}
    </div>
  )
}
