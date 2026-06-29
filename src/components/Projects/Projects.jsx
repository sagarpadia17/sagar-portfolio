import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiVideo, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
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

function getEmbedUrl(url) {
  if (!url) return null

  // Google Drive
  const driveMatch = url.match(/\/file\/d\/([^/]+)/)
  if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`

  // YouTube: youtu.be/ID or youtube.com/watch?v=ID or youtube.com/shorts/ID
  const ytMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([A-Za-z0-9_-]{11})/
  )
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`

  return url
}

function ImageGallery({ images }) {
  const [idx, setIdx] = useState(0)
  if (!images || images.length === 0) return null

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9', background: 'rgba(0,0,0,0.4)' }}>
      <img
        src={images[idx]}
        alt={`Screenshot ${idx + 1}`}
        className="w-full h-full object-contain"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 transition-colors duration-200"
            style={{ background: 'rgba(14,16,22,0.8)', border: '1px solid rgba(201,162,39,0.3)', color: '#C9A227' }}
          >
            <FiChevronLeft size={16} />
          </button>
          <button
            onClick={() => setIdx((i) => (i + 1) % images.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 transition-colors duration-200"
            style={{ background: 'rgba(14,16,22,0.8)', border: '1px solid rgba(201,162,39,0.3)', color: '#C9A227' }}
          >
            <FiChevronRight size={16} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                style={{ background: i === idx ? '#C9A227' : 'rgba(201,162,39,0.3)' }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function ProjectModal({ project, onClose }) {
  const rank = rankStyles[project.rank] || rankStyles.A
  const embedUrl = getEmbedUrl(project.video)
  const hasMedia = embedUrl || (project.images && project.images.length > 0)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 top-16 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(6,8,14,0.85)', backdropFilter: 'blur(6px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        style={{
          background: 'rgba(10,12,18,0.98)',
          border: `1px solid ${rank.border}`,
          boxShadow: `0 0 60px ${rank.glow}20, 0 24px 80px rgba(0,0,0,0.7)`,
        }}
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent */}
        <div
          className="h-px w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${rank.color}, transparent)` }}
        />

        {/* Media: video or images */}
        {hasMedia && (
          <div className="w-full" style={{ background: '#000' }}>
            {embedUrl ? (
              <div style={{ aspectRatio: '16/9' }}>
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allow="autoplay"
                  allowFullScreen
                  style={{ border: 'none', display: 'block' }}
                  title={`${project.name} demo`}
                />
              </div>
            ) : (
              <ImageGallery images={project.images} />
            )}
          </div>
        )}

        <div className="p-7">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-bold px-2 py-0.5"
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    color: rank.color,
                    background: rank.bg,
                    border: `1px solid ${rank.border}`,
                    letterSpacing: '0.1em',
                  }}
                >
                  {project.rank}
                </span>
              </div>
              <h2
                className="text-3xl font-bold tracking-wide"
                style={{ fontFamily: 'Rajdhani, sans-serif', color: '#ECE8E1' }}
              >
                {project.name}
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs transition-all duration-200"
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    border: '1px solid rgba(201,162,39,0.25)',
                    color: '#9BA4B5',
                    background: 'rgba(14,16,22,0.6)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A227'; e.currentTarget.style.borderColor = 'rgba(201,162,39,0.5)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#9BA4B5'; e.currentTarget.style.borderColor = 'rgba(201,162,39,0.25)' }}
                >
                  <FiGithub size={12} /> GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs transition-all duration-200"
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    border: '1px solid rgba(75,156,211,0.25)',
                    color: '#9BA4B5',
                    background: 'rgba(14,16,22,0.6)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#4B9CD3'; e.currentTarget.style.borderColor = 'rgba(75,156,211,0.5)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#9BA4B5'; e.currentTarget.style.borderColor = 'rgba(75,156,211,0.25)' }}
                >
                  <FiExternalLink size={12} /> Live Demo
                </a>
              )}
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 transition-all duration-200 ml-1"
                style={{ border: '1px solid rgba(155,164,181,0.2)', color: '#9BA4B5', background: 'rgba(14,16,22,0.6)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#ECE8E1'; e.currentTarget.style.borderColor = 'rgba(155,164,181,0.4)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#9BA4B5'; e.currentTarget.style.borderColor = 'rgba(155,164,181,0.2)' }}
                aria-label="Close"
              >
                <FiX size={14} />
              </button>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: '#9BA4B5', fontFamily: 'Inter, sans-serif' }}
          >
            {project.longDescription || project.description}
          </p>

          {/* Images (below video if both exist) */}
          {embedUrl && project.images && project.images.length > 0 && (
            <div className="mb-6">
              <p
                className="text-xs font-bold tracking-widest mb-3"
                style={{ fontFamily: 'Rajdhani, sans-serif', color: rank.color, letterSpacing: '0.15em' }}
              >
                SCREENSHOTS
              </p>
              <ImageGallery images={project.images} />
            </div>
          )}

          {/* Tech stack */}
          <div>
            <p
              className="text-xs font-bold tracking-widest mb-3"
              style={{ fontFamily: 'Rajdhani, sans-serif', color: rank.color, letterSpacing: '0.15em' }}
            >
              TECH STACK
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1"
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    color: 'rgba(155,164,181,0.85)',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.09)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div
          className="h-px w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${rank.color}, transparent)`, opacity: 0.4 }}
        />

        {/* Corner cut */}
        <div
          className="absolute top-0 right-0 w-4 h-4"
          style={{ background: `linear-gradient(225deg, ${rank.color} 50%, transparent 50%)` }}
        />
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project, index, onOpen }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const rank = rankStyles[project.rank] || rankStyles.A

  const handleClick = useCallback((e) => {
    // Don't open modal if user clicked a link button
    if (e.target.closest('a')) return
    onOpen(project)
  }, [onOpen, project])

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col clip-corner overflow-hidden transition-all duration-350 group cursor-pointer"
      style={{
        background: 'rgba(14, 16, 22, 0.7)',
        border: `1px solid ${hovered ? rank.border : 'rgba(201,162,39,0.12)'}`,
        backdropFilter: 'blur(12px)',
        boxShadow: hovered ? `0 0 30px ${rank.glow}20` : 'none',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
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
            {project.video && (
              <div
                className="flex z-1000 items-center justify-center w-8 h-8 transition-all duration-200"
                style={{
                  border: '1px solid rgba(201,162,39,0.2)',
                  color: hovered ? '#C9A227' : '#9BA4B5',
                  background: 'rgba(14,16,22,0.6)',
                }}
                title="Has video demo"
              >
                <FiVideo size={14} />
              </div>
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

        {/* Click hint */}
        <div
          className="mt-4 text-xs transition-all duration-300"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            color: hovered ? rank.color : 'transparent',
            letterSpacing: '0.05em',
          }}
        >
          click to view details →
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
  const [activeProject, setActiveProject] = useState(null)

  const handleOpen = useCallback((project) => setActiveProject(project), [])
  const handleClose = useCallback(() => setActiveProject(null), [])

  return (
    <>
      <section className="relative py-24 px-6">
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
                <ProjectCard key={project.id} project={project} index={i} onOpen={handleOpen} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={handleClose} />
        )}
      </AnimatePresence>
    </>
  )
}
