import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { personalInfo } from '../../data/index.js'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

function SectionLabel({ number, label }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span
        className="text-xs font-medium tracking-[0.25em]"
        style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(201,162,39,0.5)' }}
      >
        {number}
      </span>
      <h2
        className="text-3xl font-bold tracking-wider"
        style={{ fontFamily: 'Rajdhani, sans-serif', color: '#ECE8E1' }}
      >
        {label}
      </h2>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(201,162,39,0.4), transparent)' }} />
    </div>
  )
}

export { SectionLabel }

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const traits = [
    { icon: '◈', label: 'Precision', desc: 'Every pixel intentional' },
    { icon: '◆', label: 'Performance', desc: '60 FPS or nothing' },
    { icon: '◇', label: 'Elegance', desc: 'Clean, maintainable code' },
    { icon: '●', label: 'Delivery', desc: 'Ship fast, ship right' },
  ]

  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants}>
            <SectionLabel number="01" label="ABOUT" />
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-start">
            {/* Left: Bio + traits */}
            <div className="flex flex-col gap-8">
              <motion.div variants={itemVariants} className="space-y-4">
                <p className="text-lg leading-relaxed" style={{ color: '#9BA4B5', fontFamily: 'Inter, sans-serif' }}>
                  I'm a Front-End Developer based in{' '}
                  <span style={{ color: '#C9A227' }}>Ahmedabad, India</span>, with{' '}
                  <span style={{ color: '#ECE8E1' }}>2+ years</span> of production experience building
                  interfaces that balance precision with elegance.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: '#9BA4B5', fontFamily: 'Inter, sans-serif' }}>
                  My stack runs deep on <span style={{ color: '#ECE8E1' }}>React</span>,{' '}
                  <span style={{ color: '#ECE8E1' }}>TypeScript</span>, and{' '}
                  <span style={{ color: '#ECE8E1' }}>Tailwind</span>. I've shipped AI chat platforms,
                  desktop apps with Tauri, and form systems for enterprise clients — always focused on
                  the experience that makes users feel the difference.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: '#9BA4B5', fontFamily: 'Inter, sans-serif' }}>
                  I believe good UI is invisible — it just works, and it feels{' '}
                  <span style={{ color: '#C9A227' }}>exactly right</span>.
                </p>
              </motion.div>

              {/* Trait cards */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {traits.map((t) => (
                  <div
                    key={t.label}
                    className="group p-4 clip-corner-sm transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: 'rgba(14, 16, 22, 0.6)',
                      border: '1px solid rgba(201, 162, 39, 0.12)',
                      backdropFilter: 'blur(8px)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(201, 162, 39, 0.35)'
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(201, 162, 39, 0.08)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(201, 162, 39, 0.12)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <span className="text-xl" style={{ color: '#C9A227' }}>{t.icon}</span>
                    <div className="mt-2 font-bold text-sm tracking-wider" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#ECE8E1' }}>
                      {t.label}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: '#9BA4B5', fontFamily: 'Inter, sans-serif' }}>
                      {t.desc}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Quick facts */}
            <motion.div
              variants={itemVariants}
              className="lg:w-72 clip-corner"
              style={{
                background: 'rgba(14, 16, 22, 0.7)',
                border: '1px solid rgba(201, 162, 39, 0.15)',
                backdropFilter: 'blur(12px)',
                padding: '28px',
              }}
            >
              {/* Header bar */}
              <div className="flex items-center gap-2 mb-6 pb-4" style={{ borderBottom: '1px solid rgba(201,162,39,0.12)' }}>
                <div className="w-2 h-2 rounded-full" style={{ background: '#C9A227', boxShadow: '0 0 6px rgba(201,162,39,0.8)' }} />
                <span className="text-xs tracking-[0.2em] font-medium" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#C9A227' }}>
                  AGENT.PROFILE
                </span>
              </div>

              {[
                { key: 'Name', val: 'Sagar Padia' },
                { key: 'Role', val: 'Front-End Developer' },
                { key: 'Location', val: 'Ahmedabad, India' },
                { key: 'Experience', val: '2+ Years' },
                { key: 'Status', val: 'Open to Work', highlight: true },
              ].map((item) => (
                <div key={item.key} className="flex flex-col mb-4">
                  <span className="text-xs tracking-widest mb-0.5" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(155,164,181,0.6)' }}>
                    {item.key.toUpperCase()}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: item.highlight ? '#C9A227' : '#ECE8E1',
                      textShadow: item.highlight ? '0 0 10px rgba(201,162,39,0.4)' : 'none',
                    }}
                  >
                    {item.val}
                  </span>
                </div>
              ))}

              <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(201,162,39,0.12)' }}>
                <a
                  href="mailto:sagarpadia7@gmail.com"
                  className="flex items-center justify-center gap-2 py-2.5 font-bold tracking-widest text-xs clip-corner-sm transition-all duration-200 hover:scale-105"
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    background: 'linear-gradient(135deg, #C9A227, #A07820)',
                    color: '#0A0B0F',
                    letterSpacing: '0.15em',
                  }}
                >
                  CONTACT AGENT
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
