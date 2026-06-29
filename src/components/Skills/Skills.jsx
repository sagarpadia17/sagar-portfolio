import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '../../data/index.js'
import { SectionLabel } from '../About/About.jsx'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

function ProficiencyBar({ value, color, animate }) {
  const isGold = color === 'gold'
  const barColor = isGold
    ? 'linear-gradient(90deg, #A07820, #C9A227, #E8C547)'
    : 'linear-gradient(90deg, #2A6FA8, #4B9CD3, #6DB8F0)'

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-1.5">
        <span
          className="text-xs tracking-widest"
          style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(155,164,181,0.7)' }}
        >
          PROFICIENCY
        </span>
        <span
          className="text-sm font-bold"
          style={{ fontFamily: 'Rajdhani, sans-serif', color: isGold ? '#C9A227' : '#4B9CD3' }}
        >
          {value}%
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: barColor }}
          initial={{ width: 0 }}
          animate={animate ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </div>
    </div>
  )
}

function SkillCard({ skill, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const isGold = skill.color === 'gold'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-6 clip-corner cursor-pointer transition-all duration-300"
      style={{
        background: hovered
          ? 'rgba(18, 20, 28, 0.9)'
          : 'rgba(14, 16, 22, 0.6)',
        border: `1px solid ${
          hovered
            ? isGold ? 'rgba(201, 162, 39, 0.5)' : 'rgba(75,156,211,0.5)'
            : isGold ? 'rgba(201, 162, 39, 0.15)' : 'rgba(75,156,211,0.15)'
        }`,
        backdropFilter: 'blur(12px)',
        boxShadow: hovered
          ? isGold
            ? '0 0 30px rgba(201,162,39,0.08), inset 0 0 30px rgba(201,162,39,0.03)'
            : '0 0 30px rgba(75,156,211,0.08), inset 0 0 30px rgba(75,156,211,0.03)'
          : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Key badge — Chamber ability key style */}
      <div className="flex items-start justify-between mb-5">
        <div
          className="flex items-center justify-center w-9 h-9 font-bold text-sm clip-corner-sm"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            background: isGold
              ? 'linear-gradient(135deg, #C9A227, #A07820)'
              : 'linear-gradient(135deg, #4B9CD3, #2A6FA8)',
            color: '#0A0B0F',
            letterSpacing: '0.05em',
          }}
        >
          {skill.key}
        </div>
        <div
          className="text-xs px-2 py-0.5"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            color: isGold ? 'rgba(201,162,39,0.6)' : 'rgba(75,156,211,0.6)',
            border: `1px solid ${isGold ? 'rgba(201,162,39,0.2)' : 'rgba(75,156,211,0.2)'}`,
          }}
        >
          ABILITY
        </div>
      </div>

      {/* Label */}
      <h3
        className="text-2xl font-bold tracking-wide mb-1"
        style={{ fontFamily: 'Rajdhani, sans-serif', color: '#ECE8E1' }}
      >
        {skill.label}
      </h3>
      <p className="text-sm mb-5" style={{ color: '#9BA4B5', fontFamily: 'Inter, sans-serif' }}>
        {skill.description}
      </p>

      {/* Proficiency bar */}
      <ProficiencyBar value={skill.proficiency} color={skill.color} animate={inView} />

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mt-5">
        {skill.techs.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-0.5 rounded-sm"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              color: isGold ? 'rgba(201,162,39,0.8)' : 'rgba(75,156,211,0.8)',
              background: isGold ? 'rgba(201,162,39,0.07)' : 'rgba(75,156,211,0.07)',
              border: `1px solid ${isGold ? 'rgba(201,162,39,0.15)' : 'rgba(75,156,211,0.15)'}`,
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-5 h-5 opacity-60"
        style={{
          background: isGold
            ? 'linear-gradient(225deg, #C9A227 50%, transparent 50%)'
            : 'linear-gradient(225deg, #4B9CD3 50%, transparent 50%)',
        }}
      />
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants}>
            <SectionLabel number="03" label="SKILLS" />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-base mb-12 max-w-xl"
            style={{ color: '#9BA4B5', fontFamily: 'Inter, sans-serif' }}
          >
            Four core ability sets — each sharpened to production grade. Press any key to deploy.
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((skill, i) => (
              <SkillCard key={skill.key} skill={skill} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
