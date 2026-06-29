import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experience } from '../../data/index.js'
import { SectionLabel } from '../About/About.jsx'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

function ExperienceCard({ item, index, isLast }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const isEducation = item.type === 'Education'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-12"
    >
      {/* Timeline line */}
      {!isLast && (
        <div
          className="absolute left-3.5 top-10 w-px"
          style={{
            height: 'calc(100% + 2rem)',
            background: 'linear-gradient(180deg, rgba(201,162,39,0.4), rgba(201,162,39,0.05))',
          }}
        />
      )}

      {/* Timeline dot */}
      <div className="absolute left-0 top-5 flex items-center justify-center w-7 h-7">
        <div
          className="w-3 h-3 rounded-full"
          style={{
            background: isEducation ? '#4B9CD3' : '#C9A227',
            boxShadow: isEducation
              ? '0 0 10px rgba(75,156,211,0.6), 0 0 20px rgba(75,156,211,0.2)'
              : '0 0 10px rgba(201,162,39,0.6), 0 0 20px rgba(201,162,39,0.2)',
          }}
        />
      </div>

      {/* Card */}
      <div
        className="mb-8 p-6 clip-corner group transition-all duration-300"
        style={{
          background: 'rgba(14, 16, 22, 0.6)',
          border: `1px solid ${isEducation ? 'rgba(75,156,211,0.15)' : 'rgba(201, 162, 39, 0.15)'}`,
          backdropFilter: 'blur(10px)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = isEducation ? 'rgba(75,156,211,0.35)' : 'rgba(201, 162, 39, 0.35)'
          e.currentTarget.style.boxShadow = isEducation ? '0 0 25px rgba(75,156,211,0.06)' : '0 0 25px rgba(201, 162, 39, 0.06)'
          e.currentTarget.style.transform = 'translateX(4px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = isEducation ? 'rgba(75,156,211,0.15)' : 'rgba(201, 162, 39, 0.15)'
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.transform = 'translateX(0)'
        }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3
              className="text-xl font-bold tracking-wide"
              style={{ fontFamily: 'Rajdhani, sans-serif', color: '#ECE8E1' }}
            >
              {item.role}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="text-sm font-semibold"
                style={{ color: isEducation ? '#4B9CD3' : '#C9A227', fontFamily: 'Rajdhani, sans-serif' }}
              >
                {item.company}
              </span>
              <span style={{ color: 'rgba(155,164,181,0.4)' }}>·</span>
              <span
                className="text-xs px-2 py-0.5 rounded-sm"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  color: isEducation ? '#4B9CD3' : '#C9A227',
                  background: isEducation ? 'rgba(75,156,211,0.1)' : 'rgba(201,162,39,0.1)',
                  border: isEducation ? '1px solid rgba(75,156,211,0.2)' : '1px solid rgba(201,162,39,0.2)',
                }}
              >
                {item.type}
              </span>
            </div>
          </div>
          <span
            className="text-xs font-medium whitespace-nowrap"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(155,164,181,0.7)' }}
          >
            {item.period}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-4" style={{ color: '#9BA4B5', fontFamily: 'Inter, sans-serif' }}>
          {item.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-col gap-1.5">
          {item.highlights.map((h) => (
            <div key={h} className="flex items-start gap-2.5">
              <div
                className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: isEducation ? '#4B9CD3' : '#C9A227' }}
              />
              <span className="text-sm" style={{ color: '#9BA4B5', fontFamily: 'Inter, sans-serif' }}>{h}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-24 px-6">
      {/* Section background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(201,162,39,0.02) 50%, transparent)' }}
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants}>
            <SectionLabel number="02" label="EXPERIENCE" />
          </motion.div>

          <div className="max-w-3xl">
            {experience.map((item, i) => (
              <ExperienceCard
                key={item.id}
                item={item}
                index={i}
                isLast={i === experience.length - 1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
