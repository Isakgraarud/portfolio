import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header.jsx'
import HeroSection from './components/HeroSection.jsx'
import AboutSection from './components/AboutSection.jsx'
import CareerSection from './components/CareerSection.jsx'
import GithubSection from './components/GithubSection.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [content, setContent] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}docs/content.json`)
      .then(r => r.json())
      .then(setContent)
      .catch(console.error)
  }, [])

  // Recalculate all ScrollTrigger positions after content loads and GSAP has processed its new triggers
  useEffect(() => {
    if (!content) return
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(raf)
  }, [content])

  return (
    <div className="min-h-screen bg-bg text-text font-sans">
      <Header />
      <HeroSection />
      <AboutSection content={content} />
      <CareerSection content={content} />
      <GithubSection content={content} />
      <footer className="border-t border-border py-8 px-8">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[10px] text-muted tracking-[0.15em]">ISAK_GRAARUD © 2025</span>
          <span className="font-mono text-[10px] text-muted tracking-[0.15em]">REACT · GSAP · SPLINE · MOTION</span>
        </div>
      </footer>
    </div>
  )
}
