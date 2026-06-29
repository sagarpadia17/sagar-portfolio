import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiDownload } from 'react-icons/fi'
import { personalInfo } from '../../data/index.js'

function TypewriterText({ strings, className, style }) {
  const [displayed, setDisplayed] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const current = strings[currentIndex]
    const speed = isDeleting ? 40 : 80
    const pause = isDeleting ? 0 : 2000

    if (!isDeleting && displayed === current) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), pause)
      return
    }

    if (isDeleting && displayed === '') {
      setIsDeleting(false)
      setCurrentIndex((i) => (i + 1) % strings.length)
      return
    }

    timeoutRef.current = setTimeout(() => {
      setDisplayed(isDeleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1))
    }, speed)

    return () => clearTimeout(timeoutRef.current)
  }, [displayed, isDeleting, currentIndex, strings])

  return (
    <span className={className} style={style}>
      {displayed}
      <span
        className="inline-block w-0.5 h-5 ml-0.5 align-middle"
        style={{ background: '#C9A227', animation: 'blink 1s step-end infinite' }}
      />
    </span>
  )
}

function StatCard({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center px-6 py-4 clip-corner-sm"
      style={{
        background: 'rgba(14, 16, 22, 0.7)',
        border: '1px solid rgba(201, 162, 39, 0.2)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <span
        className="text-3xl font-bold"
        style={{ fontFamily: 'Rajdhani, sans-serif', color: '#C9A227' }}
      >
        {value}
      </span>
      <span className="text-xs tracking-widest mt-0.5" style={{ color: '#9BA4B5', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.12em' }}>
        {label.toUpperCase()}
      </span>
    </motion.div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 100) }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-16"
    >
      {/* Corner decorations */}
      <div className="absolute top-24 left-6 pointer-events-none hidden lg:block">
        <div style={{ width: '40px', height: '40px', borderTop: '1px solid rgba(201,162,39,0.4)', borderLeft: '1px solid rgba(201,162,39,0.4)' }} />
      </div>
      <div className="absolute top-24 right-6 pointer-events-none hidden lg:block">
        <div style={{ width: '40px', height: '40px', borderTop: '1px solid rgba(201,162,39,0.4)', borderRight: '1px solid rgba(201,162,39,0.4)' }} />
      </div>
      <div className="absolute bottom-16 left-6 pointer-events-none hidden lg:block">
        <div style={{ width: '40px', height: '40px', borderBottom: '1px solid rgba(201,162,39,0.4)', borderLeft: '1px solid rgba(201,162,39,0.4)' }} />
      </div>
      <div className="absolute bottom-16 right-6 pointer-events-none hidden lg:block">
        <div style={{ width: '40px', height: '40px', borderBottom: '1px solid rgba(201,162,39,0.4)', borderRight: '1px solid rgba(201,162,39,0.4)' }} />
      </div>

      <div className="max-w-6xl w-full mx-auto">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          {/* Left: Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={mounted ? 'visible' : 'hidden'}
            className="flex flex-col gap-6"
          >
            {/* Agent tag */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, #C9A227, transparent)' }} />
              <span
                className="text-xs tracking-[0.25em] font-medium"
                style={{ fontFamily: 'JetBrains Mono, monospace', color: '#C9A227' }}
              >
                AGENT // SENTINEL CLASS
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants}>
              <h1
                className="font-bold leading-none tracking-tight"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  color: '#ECE8E1',
                }}
              >
                SAGAR
              </h1>
              <h1
                className="font-bold leading-none tracking-tight text-shimmer"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                }}
              >
                PADIA
              </h1>
            </motion.div>

            {/* Typewriter role */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 h-8">
              <div className="w-1 h-6 rounded-full" style={{ background: 'linear-gradient(180deg, #C9A227, #4B9CD3)' }} />
              <TypewriterText
                strings={personalInfo.taglines}
                className="text-lg font-medium"
                style={{ fontFamily: 'Rajdhani, sans-serif', color: '#9BA4B5', letterSpacing: '0.08em', fontSize: '1.1rem' }}
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-base leading-relaxed max-w-xl"
              style={{ color: '#9BA4B5', fontFamily: 'Inter, sans-serif' }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="group relative px-7 py-3 font-bold tracking-wider text-sm clip-corner overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  background: 'linear-gradient(135deg, #C9A227, #A07820)',
                  color: '#0A0B0F',
                  letterSpacing: '0.15em',
                }}
              >
                <span className="relative z-10">VIEW PROJECTS</span>
                <span
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: 'rgba(255,255,255,0.4)' }}
                />
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="group px-7 py-3 font-bold tracking-wider text-sm clip-corner transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  color: '#C9A227',
                  border: '1px solid rgba(201, 162, 39, 0.4)',
                  background: 'rgba(201, 162, 39, 0.05)',
                  letterSpacing: '0.15em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(201, 162, 39, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(201, 162, 39, 0.7)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(201, 162, 39, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(201, 162, 39, 0.05)'
                  e.currentTarget.style.borderColor = 'rgba(201, 162, 39, 0.4)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                CONTACT ME
              </a>
              <a
                href={personalInfo.resumeUrl}
                download
                target="_blank"
                className="group flex items-center gap-2 px-7 py-3 font-bold tracking-wider text-sm clip-corner transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  color: '#4B9CD3',
                  border: '1px solid rgba(75, 156, 211, 0.4)',
                  background: 'rgba(75, 156, 211, 0.05)',
                  letterSpacing: '0.15em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(75, 156, 211, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(75, 156, 211, 0.7)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(75, 156, 211, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(75, 156, 211, 0.05)'
                  e.currentTarget.style.borderColor = 'rgba(75, 156, 211, 0.4)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <FiDownload size={14} />
                RESUME
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-2">
              {personalInfo.stats.map((stat, i) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} delay={0.8 + i * 0.1} />
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative" style={{ animation: 'float 6s ease-in-out infinite' }}>
              {/* Outer glow ring */}
              <div
                className="absolute -inset-2 rounded-full opacity-40"
                style={{ background: 'conic-gradient(from 0deg, #C9A227, #4B9CD3, #C9A227)', animation: 'spin 8s linear infinite', filter: 'blur(4px)' }}
              />
              {/* Gold ring */}
              <div
                className="absolute -inset-1 rounded-full"
                style={{ background: 'conic-gradient(from 0deg, #C9A227 0%, #E8C547 25%, #A07820 50%, #E8C547 75%, #C9A227 100%)', animation: 'spin 6s linear infinite' }}
              />
              {/* Inner dark ring */}
              <div className="absolute -inset-px rounded-full" style={{ background: '#0A0B0F' }} />
              {/* Image container */}
              <div
                className="relative w-64 h-64 rounded-full overflow-hidden flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #12141A, #0E1016)' }}
              >
                {/* Placeholder monogram */}
                <div className="flex flex-col items-center gap-2">
                  <span
                    className="text-6xl font-bold"
                    style={{ fontFamily: 'Rajdhani, sans-serif', color: '#C9A227', lineHeight: 1 }}
                  >
                    SP
                  </span>
                  <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #C9A227, transparent)' }} />
                  <span
                    className="text-xs tracking-[0.2em]"
                    style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(201,162,39,0.6)' }}
                  >
                    DEV
                  </span>
                </div>
              </div>
              {/* Anchor point decorations */}
              {[0, 90, 180, 270].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: '#C9A227',
                    boxShadow: '0 0 8px rgba(201,162,39,0.8)',
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${deg}deg) translateX(140px) translateY(-50%)`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(155,164,181,0.6)' }}>
            SCROLL
          </span>
          <div className="w-px h-8 overflow-hidden" style={{ background: 'rgba(201,162,39,0.2)' }}>
            <motion.div
              className="w-full h-4"
              style={{ background: 'linear-gradient(180deg, #C9A227, transparent)' }}
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
