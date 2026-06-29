import { lazy, Suspense } from 'react'
import BackgroundEffects from '../components/BackgroundEffects/BackgroundEffects.jsx'
import CursorEffect from '../components/CursorEffect/CursorEffect.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import Hero from '../components/Hero/Hero.jsx'
import Footer from '../components/Footer/Footer.jsx'

// Lazy-load below-fold sections
const About = lazy(() => import('../components/About/About.jsx'))
const Experience = lazy(() => import('../components/Experience/Experience.jsx'))
const Skills = lazy(() => import('../components/Skills/Skills.jsx'))
const Projects = lazy(() => import('../components/Projects/Projects.jsx'))
const Contact = lazy(() => import('../components/Contact/Contact.jsx'))

function SectionFallback() {
  return (
    <div className="py-24 flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div
          className="w-4 h-4 rounded-full animate-ping"
          style={{ background: 'rgba(201,162,39,0.6)' }}
        />
        <span
          className="text-xs tracking-widest"
          style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(201,162,39,0.5)' }}
        >
          LOADING...
        </span>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Global effects */}
      <BackgroundEffects />
      <CursorEffect />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />

        {/* Section divider */}
        <div className="section-line mx-6" />

        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>

        <div className="section-line mx-6" />

        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>

        <div className="section-line mx-6" />

        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>

        <div className="section-line mx-6" />

        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>

        <div className="section-line mx-6" />

        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
