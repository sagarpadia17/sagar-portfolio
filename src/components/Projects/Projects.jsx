import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { projects } from '../../data/index.js'
import { SectionLabel } from '../About/About.jsx'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

const rankStyles = {
  MVP: { color: '#C9A227', glow: 'rgba(201,162,39,0.6)', bg: 'rgba(201,162,39,0.1)', border: 'rgba(201,162,39,0.3)' },
  'A+': { color: '#4B9CD3', glow: 'rgba(75,156,211,0.6)', bg: 'rgba(75,156,211,0.1)', border: 'rgba(75,156,211,0.3)' },
  A: { color: '#9BA4B5', glow: 'rgba(155,164,181,0.4)', bg: 'rgba(155,164,181,0.08)', border: 'rgba(155,164,181,0.2)' },
}

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const rank = rankStyles[project.rank] || rankStyles.A

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col clip-corner overflow-hidden transition-all duration-350 group"
      style={{
        background: 'rgba(14, 16, 22, 0.7)',
        border: `1px solid ${hovered ? rank.border : 'rgba(201,162,39,0.12)'}`,
        backdropFilter: 'blur(12px)',
        boxShadow: hovered ? `0 0 30px ${rank.glow}20` : 'none',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line */}
      <div
        className="h-px w-full transition-all duration-500"
        style={{
          background: hovered
            ? `linear-gradient(90deg, transparent, ${rank.color}, transparent)`
            : 'linear-gradient(90deg, transparent, rgba(201,162,39,0.2), transparent)',
        }}
      />

      <div className="flex flex-col flex-1 p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {/* Rank badge */}
              <span
                className="text-xs font-bold px-2 py-0.5"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  color: rank.color,
                  background: rank.bg,
                  border: `1px solid ${rank.border}`,
                  textShadow: hovered ? `0 0 8px ${rank.glow}` : 'none',
                  letterSpacing: '0.1em',
                }}
              >
                {project.rank}
              </span>
            </div>
            <h3
              className="text-xl font-bold tracking-wide"
              style={{ fontFamily: 'Rajdhani, sans-serif', color: hovered ? '#ECE8E1' : '#D4D0CA' }}
            >
              {project.name}
            </h3>
          </div>

          {/* Actions */}
          <div className="flex gap-2 shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 transition-all duration-200 hover:scale-110"
                style={{
                  border: '1px solid rgba(201,162,39,0.2)',
                  color: '#9BA4B5',
                  background: 'rgba(14,16,22,0.6)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A227'; e.currentTarget.style.borderColor = 'rgba(201,162,39,0.5)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#9BA4B5'; e.currentTarget.style.borderColor = 'rgba(201,162,39,0.2)' }}
                aria-label={`${project.name} GitHub`}
              >
                <FiGithub size={14} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 transition-all duration-200 hover:scale-110"
                style={{
                  border: '1px solid rgba(75,156,211,0.2)',
                  color: '#9BA4B5',
                  background: 'rgba(14,16,22,0.6)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#4B9CD3'; e.currentTarget.style.borderColor = 'rgba(75,156,211,0.5)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#9BA4B5'; e.currentTarget.style.borderColor = 'rgba(75,156,211,0.2)' }}
                aria-label={`${project.name} Live Demo`}
              >
                <FiExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: '#9BA4B5', fontFamily: 'Inter, sans-serif' }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                color: 'rgba(155,164,181,0.7)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom tracer — reveals on hover */}
      <div
        className="h-px transition-all duration-700"
        style={{
          background: `linear-gradient(90deg, transparent, ${rank.color}, transparent)`,
          opacity: hovered ? 0.6 : 0,
        }}
      />

      {/* Corner cut accent */}
      <div
        className="absolute top-0 right-0 w-4 h-4"
        style={{
          background: hovered
            ? `linear-gradient(225deg, ${rank.color} 50%, transparent 50%)`
            : 'linear-gradient(225deg, rgba(201,162,39,0.3) 50%, transparent 50%)',
        }}
      />
    </motion.article>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="relative py-24 px-6">
      {/* Section background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(75,156,211,0.02) 50%, transparent)' }}
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants}>
            <SectionLabel number="04" label="PROJECTS" />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-base mb-12 max-w-xl"
            style={{ color: '#9BA4B5', fontFamily: 'Inter, sans-serif' }}
          >
            Selected matches — ranked by impact delivered. Each built for production, not for portfolio.
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
