import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '../../data/index.js'
import { useScrollSpy } from '../../hooks/useScrollSpy.js'
import { useScrollProgress } from '../../hooks/useScrollProgress.js'

const sectionIds = navLinks.map((l) => l.href.replace('#', ''))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeId = useScrollSpy(sectionIds)
  const progress = useScrollProgress()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]" style={{ background: 'rgba(10,11,15,0.5)' }}>
        <motion.div
          className="h-full origin-left"
          style={{
            background: 'linear-gradient(90deg, #C9A227, #E8C547)',
            scaleX: progress / 100,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        />
      </div>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ paddingTop: '2px' }}
      >
        <div
          className="mx-auto max-w-6xl px-6 transition-all duration-300"
          style={{
            background: scrolled
              ? 'rgba(10, 11, 15, 0.92)'
              : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(201, 162, 39, 0.12)' : 'none',
          }}
        >
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 group"
            >
              <div
                className="w-7 h-7 flex items-center justify-center clip-corner-sm"
                style={{ background: 'linear-gradient(135deg, #C9A227, #A07820)' }}
              >
                <span className="text-black font-bold text-xs" style={{ fontFamily: 'Rajdhani, sans-serif' }}>SP</span>
              </div>
              <span
                className="font-semibold tracking-widest text-sm transition-colors duration-200 group-hover:text-gold"
                style={{ fontFamily: 'Rajdhani, sans-serif', color: '#ECE8E1', letterSpacing: '0.2em' }}
              >
                PADIA<span style={{ color: '#C9A227' }}>.DEV</span>
              </span>
            </button>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, i) => {
                const isActive = activeId === link.href.replace('#', '')
                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() => scrollTo(link.href)}
                    className="relative px-4 py-2 text-sm font-medium tracking-wider transition-colors duration-200"
                    style={{
                      fontFamily: 'Rajdhani, sans-serif',
                      color: isActive ? '#C9A227' : '#9BA4B5',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-sm"
                        style={{ background: 'rgba(201, 162, 39, 0.08)', border: '1px solid rgba(201, 162, 39, 0.2)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">
                      <span style={{ color: isActive ? '#C9A227' : 'rgba(201,162,39,0.3)', marginRight: '4px', fontSize: '10px' }}>
                        {String(navLinks.indexOf(link) + 1).padStart(2, '0')}.
                      </span>
                      {link.label}
                    </span>
                  </motion.button>
                )
              })}
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                href="mailto:sagarpadia7@gmail.com"
                className="ml-4 px-4 py-1.5 text-sm font-semibold tracking-wider clip-corner-sm transition-all duration-200 hover:scale-105"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  background: 'linear-gradient(135deg, #C9A227, #A07820)',
                  color: '#0A0B0F',
                  letterSpacing: '0.1em',
                }}
              >
                HIRE ME
              </motion.a>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-px w-6"
                  style={{ background: '#C9A227' }}
                  animate={
                    mobileOpen
                      ? i === 0
                        ? { rotate: 45, y: 6 }
                        : i === 1
                        ? { opacity: 0 }
                        : { rotate: -45, y: -6 }
                      : { rotate: 0, y: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.2 }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
              style={{
                background: 'rgba(10, 11, 15, 0.96)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(201, 162, 39, 0.15)',
              }}
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = activeId === link.href.replace('#', '')
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => scrollTo(link.href)}
                      className="text-left px-3 py-3 text-base font-medium tracking-wider transition-colors"
                      style={{
                        fontFamily: 'Rajdhani, sans-serif',
                        color: isActive ? '#C9A227' : '#9BA4B5',
                        borderLeft: isActive ? '2px solid #C9A227' : '2px solid transparent',
                        letterSpacing: '0.1em',
                      }}
                    >
                      <span style={{ color: 'rgba(201,162,39,0.4)', marginRight: '8px', fontSize: '11px' }}>
                        {String(i + 1).padStart(2, '0')}.
                      </span>
                      {link.label}
                    </motion.button>
                  )
                })}
                <a
                  href="mailto:sagarpadia7@gmail.com"
                  className="mt-3 mx-3 py-2.5 text-center text-sm font-bold tracking-wider clip-corner-sm"
                  style={{ fontFamily: 'Rajdhani, sans-serif', background: 'linear-gradient(135deg, #C9A227, #A07820)', color: '#0A0B0F', letterSpacing: '0.15em' }}
                >
                  HIRE ME
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
