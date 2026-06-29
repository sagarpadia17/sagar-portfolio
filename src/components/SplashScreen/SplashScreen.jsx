import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const BOOT_LINES = [
  '> INITIALIZING SECURE CHAMBER...',
  '> LOADING AGENT PROFILE [SP-01]...',
  '> DECRYPTING CREDENTIALS...',
  '> VERIFYING CLEARANCE LEVEL...',
  '> ACCESS GRANTED — WELCOME, AGENT',
]

const BOOT_DURATION = 1800

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [lineIndex, setLineIndex] = useState(0)
  const [phase, setPhase] = useState('boot') // boot | granted | open | done
  const completedRef = useRef(false)
  const rafRef = useRef(null)

  useEffect(() => {
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(((now - start) / BOOT_DURATION) * 100, 100)
      setProgress(p)
      if (p < 100) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  useEffect(() => {
    if (lineIndex >= BOOT_LINES.length - 1) return
    const delay = BOOT_DURATION / BOOT_LINES.length
    const t = setTimeout(() => setLineIndex(i => i + 1), delay)
    return () => clearTimeout(t)
  }, [lineIndex])

  useEffect(() => {
    if (progress < 100 || completedRef.current) return
    completedRef.current = true
    const t1 = setTimeout(() => setPhase('granted'), 60)
    const t2 = setTimeout(() => setPhase('open'), 680)
    const t3 = setTimeout(() => { setPhase('done'); onComplete() }, 1600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [progress, onComplete])

  const isGranted = phase === 'granted' || phase === 'open'
  const isOpen = phase === 'open'

  if (phase === 'done') return null

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 9999 }}>
      {/* Chamber content — above door panels */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 20, pointerEvents: 'none' }}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      >
        <div className="flex flex-col items-center" style={{ gap: '28px' }}>

          {/* Ring graphic */}
          <div style={{ position: 'relative', width: '200px', height: '200px' }}>
            {/* Radar sweep */}
            <motion.div
              style={{
                position: 'absolute', inset: 0,
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, transparent 0deg, rgba(201,162,39,0.12) 18deg, transparent 18deg)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            {/* Outer ring */}
            <motion.div
              style={{
                position: 'absolute', inset: 0,
                borderRadius: '50%',
                border: '1px solid rgba(201,162,39,0.3)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            >
              {[0, 60, 120, 180, 240, 300].map(deg => (
                <div
                  key={deg}
                  style={{
                    position: 'absolute',
                    width: '4px', height: '4px',
                    borderRadius: '50%',
                    background: 'rgba(201,162,39,0.55)',
                    top: '50%', left: '50%',
                    transform: `rotate(${deg}deg) translateX(100px) translateY(-50%)`,
                  }}
                />
              ))}
            </motion.div>

            {/* Mid ring — counter-rotate, blue */}
            <motion.div
              style={{
                position: 'absolute', inset: '26px',
                borderRadius: '50%',
                border: '1px solid rgba(75,156,211,0.35)',
                borderTopColor: 'rgba(75,156,211,0.75)',
                borderRightColor: 'transparent',
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            />

            {/* Inner ring — gold, glows on granted */}
            <motion.div
              style={{
                position: 'absolute', inset: '52px',
                borderRadius: '50%',
                border: '2px solid',
                borderColor: isGranted ? '#C9A227' : 'rgba(201,162,39,0.45)',
              }}
              animate={{
                rotate: 360,
                boxShadow: isGranted
                  ? '0 0 18px rgba(201,162,39,0.7), 0 0 36px rgba(201,162,39,0.3)'
                  : '0 0 6px rgba(201,162,39,0.15)',
              }}
              transition={{
                rotate: { duration: 5, repeat: Infinity, ease: 'linear' },
                boxShadow: { duration: 0.4 },
                borderColor: { duration: 0.3 },
              }}
            />

            {/* Center emblem */}
            <div style={{
              position: 'absolute', inset: '68px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #12141A, #0E1016)',
              border: '1px solid rgba(201,162,39,0.4)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: 'Rajdhani, sans-serif',
                color: '#C9A227', fontSize: '1.3rem', fontWeight: 700, lineHeight: 1,
              }}>SP</span>
            </div>
          </div>

          {/* Status label */}
          <div className="flex flex-col items-center" style={{ gap: '6px' }}>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '9px', letterSpacing: '0.35em',
              color: 'rgba(201,162,39,0.45)',
            }}>
              CHAMBER PROTOCOL // CLEARANCE: ALPHA
            </span>
            <motion.span
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '1.55rem', fontWeight: 700,
                letterSpacing: '0.2em',
                color: isGranted ? '#C9A227' : '#ECE8E1',
              }}
              animate={isGranted ? {
                textShadow: [
                  '0 0 8px rgba(201,162,39,0.4)',
                  '0 0 22px rgba(201,162,39,0.9)',
                  '0 0 8px rgba(201,162,39,0.4)',
                ],
              } : {}}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              {isGranted ? 'ACCESS GRANTED' : 'STANDBY'}
            </motion.span>
          </div>

          {/* Boot log */}
          <div style={{ width: '300px' }}>
            {BOOT_LINES.slice(0, lineIndex + 1).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18 }}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '10px',
                  letterSpacing: '0.04em',
                  marginBottom: '5px',
                  color: i === lineIndex && !isGranted
                    ? '#C9A227'
                    : 'rgba(155,164,181,0.45)',
                }}
              >
                {line}
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ width: '300px' }}>
            <div style={{
              height: '1px',
              background: 'rgba(201,162,39,0.12)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <motion.div
                style={{
                  position: 'absolute', left: 0, top: 0, height: '100%',
                  background: 'linear-gradient(90deg, #A07820, #C9A227, #E8C547)',
                  boxShadow: '0 0 8px rgba(201,162,39,0.6)',
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.05, ease: 'linear' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '7px' }}>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '9px', letterSpacing: '0.1em',
                color: 'rgba(201,162,39,0.35)',
              }}>
                CHAMBER INIT
              </span>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '9px',
                color: 'rgba(201,162,39,0.6)',
              }}>
                {Math.round(progress)}%
              </span>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Top door */}
      <motion.div
        style={{
          position: 'absolute', inset: '0 0 50% 0',
          background: '#0A0B0F', zIndex: 10,
        }}
        animate={{ y: isOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      >
        <div style={{ position: 'absolute', top: 24, left: 24, width: 32, height: 32, borderTop: '1px solid rgba(201,162,39,0.4)', borderLeft: '1px solid rgba(201,162,39,0.4)' }} />
        <div style={{ position: 'absolute', top: 24, right: 24, width: 32, height: 32, borderTop: '1px solid rgba(201,162,39,0.4)', borderRight: '1px solid rgba(201,162,39,0.4)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.5), transparent)' }} />
      </motion.div>

      {/* Bottom door */}
      <motion.div
        style={{
          position: 'absolute', inset: '50% 0 0 0',
          background: '#0A0B0F', zIndex: 10,
        }}
        animate={{ y: isOpen ? '100%' : '0%' }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.5), transparent)' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 24, width: 32, height: 32, borderBottom: '1px solid rgba(201,162,39,0.4)', borderLeft: '1px solid rgba(201,162,39,0.4)' }} />
        <div style={{ position: 'absolute', bottom: 24, right: 24, width: 32, height: 32, borderBottom: '1px solid rgba(201,162,39,0.4)', borderRight: '1px solid rgba(201,162,39,0.4)' }} />
      </motion.div>
    </div>
  )
}
