import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { personalInfo } from '../../data/index.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-8 py-12 px-6">
      {/* Top divider */}
      <div className="section-line mb-10" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-6 h-6 flex items-center justify-center clip-corner-sm"
              style={{ background: 'linear-gradient(135deg, #C9A227, #A07820)' }}
            >
              <span className="text-black font-bold" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '9px' }}>SP</span>
            </div>
            <span
              className="font-semibold tracking-widest text-sm"
              style={{ fontFamily: 'Rajdhani, sans-serif', color: '#ECE8E1', letterSpacing: '0.2em' }}
            >
              PADIA<span style={{ color: '#C9A227' }}>.DEV</span>
            </span>
          </div>

          {/* Center: attribution */}
          <div className="text-center">
            <p className="text-xs" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(155,164,181,0.5)' }}>
              © {year} Sagar Padia · Built with{' '}
              <span style={{ color: 'rgba(201,162,39,0.7)' }}>React</span> +{' '}
              <span style={{ color: 'rgba(201,162,39,0.7)' }}>Framer Motion</span> +{' '}
              <span style={{ color: 'rgba(201,162,39,0.7)' }}>Tailwind</span>
            </p>
            <p className="text-xs mt-1" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(155,164,181,0.3)' }}>
              Inspired by Chamber · Valorant · Riot Games
            </p>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[
              { icon: FiGithub, href: personalInfo.socials.github, label: 'GitHub' },
              { icon: FiLinkedin, href: personalInfo.socials.linkedin, label: 'LinkedIn' },
              { icon: FiMail, href: `mailto:${personalInfo.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center w-8 h-8 transition-all duration-200 hover:scale-110"
                style={{ border: '1px solid rgba(201,162,39,0.15)', color: '#9BA4B5' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#C9A227'
                  e.currentTarget.style.borderColor = 'rgba(201,162,39,0.4)'
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(201,162,39,0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#9BA4B5'
                  e.currentTarget.style.borderColor = 'rgba(201,162,39,0.15)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Easter egg — Chamber quote */}
        <div className="mt-8 text-center">
          <p
            className="text-xs italic"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(201,162,39,0.2)' }}
          >
            "Elegance is not optional." — Chamber
          </p>
        </div>
      </div>
    </footer>
  )
}
