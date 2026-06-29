import { useEffect, useRef, useState } from 'react'

export default function CursorEffect() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    document.documentElement.classList.add('custom-cursor-active')
    setIsVisible(true)

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    const onEnter = (e) => {
      if (e.target.closest('a, button, [data-cursor="pointer"]')) {
        setIsHovering(true)
      }
    }
    const onLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Inner dot — snappy */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
        style={{ marginLeft: '-4px', marginTop: '-4px' }}
      >
        <div
          className="w-2 h-2 rounded-full transition-transform duration-100"
          style={{
            background: isHovering ? '#E8C547' : '#C9A227',
            transform: isHovering ? 'scale(1.5)' : 'scale(1)',
            boxShadow: isHovering
              ? '0 0 12px rgba(232, 197, 71, 0.9)'
              : '0 0 6px rgba(201, 162, 39, 0.6)',
          }}
        />
      </div>

      {/* Outer ring — lagged */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] will-change-transform"
        style={{ marginLeft: '-16px', marginTop: '-16px' }}
      >
        <div
          className="w-8 h-8 rounded-full border transition-all duration-200"
          style={{
            borderColor: isHovering ? 'rgba(232, 197, 71, 0.8)' : 'rgba(201, 162, 39, 0.4)',
            transform: isHovering ? 'scale(1.6)' : 'scale(1)',
            background: isHovering ? 'rgba(201, 162, 39, 0.05)' : 'transparent',
          }}
        />
        {/* Crosshair lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-px" style={{ background: isHovering ? 'rgba(232, 197, 71, 0.6)' : 'rgba(201, 162, 39, 0.3)' }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-px" style={{ background: isHovering ? 'rgba(232, 197, 71, 0.6)' : 'rgba(201, 162, 39, 0.3)' }} />
        </div>
      </div>
    </>
  )
}
