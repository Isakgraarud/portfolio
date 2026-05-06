import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LanguageProvider, useLang } from './contexts/LanguageContext.jsx'
import Header from './components/Header.jsx'
import HeroSection from './components/HeroSection.jsx'
import AboutSection from './components/AboutSection.jsx'
import CareerSection from './components/CareerSection.jsx'
import GithubSection from './components/GithubSection.jsx'
import contentEN from './data/content_EN.json'
import contentNO from './data/content_NO.json'

gsap.registerPlugin(ScrollTrigger)

const contentMap = { en: contentEN, no: contentNO }

function AppContent() {
  const { lang } = useLang()
  const content = contentMap[lang]

  useEffect(() => {
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(raf)
  }, [lang])

  return (
    <div className="min-h-screen bg-bg text-text font-sans">
      <Header />
      <HeroSection content={content} />
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

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
