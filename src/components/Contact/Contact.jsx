import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi'
import { personalInfo } from '../../data/index.js'
import { SectionLabel } from '../About/About.jsx'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

function ContactItem({ icon: Icon, label, value, href, color = 'gold' }) {
  const [hovered, setHovered] = useState(false)
  const isGold = color === 'gold'
  const accentColor = isGold ? '#C9A227' : '#4B9CD3'
  const accentBg = isGold ? 'rgba(201,162,39,0.08)' : 'rgba(75,156,211,0.08)'
  const accentBorder = isGold ? 'rgba(201,162,39,0.25)' : 'rgba(75,156,211,0.25)'

  const inner = (
    <div
      className="flex items-center gap-4 p-4 clip-corner-sm transition-all duration-250"
      style={{
        background: hovered ? accentBg : 'rgba(14,16,22,0.5)',
        border: `1px solid ${hovered ? accentBorder : 'rgba(201,162,39,0.1)'}`,
        transform: hovered ? 'translateX(6px)' : 'translateX(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex items-center justify-center w-10 h-10 clip-corner-sm shrink-0"
        style={{ background: hovered ? accentColor : 'rgba(14,16,22,0.8)', border: `1px solid ${accentBorder}` }}
      >
        <Icon size={18} style={{ color: hovered ? '#0A0B0F' : accentColor }} />
      </div>
      <div>
        <div className="text-xs tracking-widest mb-0.5" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(155,164,181,0.6)' }}>
          {label.toUpperCase()}
        </div>
        <div className="text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif', color: hovered ? accentColor : '#ECE8E1' }}>
          {value}
        </div>
      </div>
    </div>
  )

  return href ? (
    <a href={href} target={href.startsWith('mailto') || href.startsWith('tel') ? '_self' : '_blank'} rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    // Mailto fallback
    const subject = encodeURIComponent(`Portfolio Contact — ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
    setTimeout(() => { setSending(false); setSent(true) }, 1000)
  }

  const inputClass = "w-full bg-transparent px-4 py-3 text-sm outline-none transition-all duration-200"
  const inputStyle = (focused) => ({
    fontFamily: 'Inter, sans-serif',
    color: '#ECE8E1',
    border: `1px solid ${focused ? 'rgba(201,162,39,0.45)' : 'rgba(201,162,39,0.15)'}`,
    background: focused ? 'rgba(201,162,39,0.03)' : 'rgba(14,16,22,0.6)',
    boxShadow: focused ? '0 0 15px rgba(201,162,39,0.06)' : 'none',
  })

  const [focused, setFocused] = useState({})

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs tracking-widest mb-1.5" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(201,162,39,0.6)' }}>
            NAME
          </label>
          <input
            className={inputClass}
            style={inputStyle(focused.name)}
            placeholder="Sagar Padia"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onFocus={() => setFocused({ ...focused, name: true })}
            onBlur={() => setFocused({ ...focused, name: false })}
            required
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest mb-1.5" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(201,162,39,0.6)' }}>
            EMAIL
          </label>
          <input
            type="email"
            className={inputClass}
            style={inputStyle(focused.email)}
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onFocus={() => setFocused({ ...focused, email: true })}
            onBlur={() => setFocused({ ...focused, email: false })}
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-xs tracking-widest mb-1.5" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(201,162,39,0.6)' }}>
          MESSAGE
        </label>
        <textarea
          className={inputClass}
          style={{ ...inputStyle(focused.message), resize: 'none' }}
          rows={5}
          placeholder="Tell me about your project..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          onFocus={() => setFocused({ ...focused, message: true })}
          onBlur={() => setFocused({ ...focused, message: false })}
          required
        />
      </div>

      <button
        type="submit"
        disabled={sending || sent}
        className="group flex items-center justify-center gap-2 py-3 font-bold tracking-widest text-sm clip-corner transition-all duration-200 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
        style={{
          fontFamily: 'Rajdhani, sans-serif',
          background: sent ? 'linear-gradient(135deg, #4B9CD3, #2A6FA8)' : 'linear-gradient(135deg, #C9A227, #A07820)',
          color: '#0A0B0F',
          letterSpacing: '0.15em',
        }}
      >
        {sending ? (
          <>
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            SENDING...
          </>
        ) : sent ? (
          'MESSAGE SENT ✓'
        ) : (
          <>
            <FiSend size={14} />
            SEND MESSAGE
          </>
        )}
      </button>
    </form>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="relative py-24 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(201,162,39,0.025) 50%, transparent)' }}
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants}>
            <SectionLabel number="05" label="CONTACT" />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-base mb-12 max-w-xl"
            style={{ color: '#9BA4B5', fontFamily: 'Inter, sans-serif' }}
          >
            Open to new opportunities. Whether it's a full-time role, contract project, or just a conversation — I'm ready to deploy.
          </motion.p>

          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
            {/* Left: contact info */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <div
                className="p-5 clip-corner mb-2"
                style={{ background: 'rgba(14,16,22,0.6)', border: '1px solid rgba(201,162,39,0.15)', backdropFilter: 'blur(12px)' }}
              >
                <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: '1px solid rgba(201,162,39,0.1)' }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: '#C9A227', boxShadow: '0 0 6px rgba(201,162,39,0.8)' }} />
                  <span className="text-xs tracking-[0.2em]" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#C9A227' }}>
                    DIRECT.CHANNEL
                  </span>
                </div>
                <h3
                  className="text-2xl font-bold tracking-wide mb-1"
                  style={{ fontFamily: 'Rajdhani, sans-serif', color: '#ECE8E1' }}
                >
                  LET'S BUILD TOGETHER
                </h3>
                <p className="text-sm" style={{ color: '#9BA4B5', fontFamily: 'Inter, sans-serif' }}>
                  Precision-crafted UIs, on time and on spec.
                </p>
              </div>

              <ContactItem icon={FiMail} label="Email" value={personalInfo.email} href={`mailto:${personalInfo.email}`} color="gold" />
              <ContactItem icon={FiPhone} label="Phone" value={personalInfo.phone} href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} color="gold" />
              <ContactItem icon={FiGithub} label="GitHub" value="github.com/sagarpadia" href={personalInfo.socials.github} color="blue" />
              <ContactItem icon={FiLinkedin} label="LinkedIn" value="linkedin.com/in/sagarpadia" href={personalInfo.socials.linkedin} color="blue" />
            </motion.div>

            {/* Right: form */}
            <motion.div
              variants={itemVariants}
              className="p-7 clip-corner"
              style={{
                background: 'rgba(14,16,22,0.7)',
                border: '1px solid rgba(201,162,39,0.15)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex items-center gap-2 mb-6 pb-4" style={{ borderBottom: '1px solid rgba(201,162,39,0.1)' }}>
                <div className="w-2 h-2 rounded-full" style={{ background: '#4B9CD3', boxShadow: '0 0 6px rgba(75,156,211,0.8)' }} />
                <span className="text-xs tracking-[0.2em]" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#4B9CD3' }}>
                  COMPOSE.MESSAGE
                </span>
              </div>
              <ContactForm />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
