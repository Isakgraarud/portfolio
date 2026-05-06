import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import AboutSection from './components/AboutSection.jsx'
import GithubSection from './components/GithubSection.jsx'
import CareerSection from './components/CareerSection.jsx'

const FINISHER_CONFIG = {
  count: 36,
  size: { min: 2, max: 8, pulse: 0.1 },
  speed: { x: { min: 0, max: 0.4 }, y: { min: 0, max: 0.6 } },
  colors: {
    background: '#0d1117',
    particles: ['#f37979', '#98daf4', '#ddeaec'],
  },
  blending: 'overlay',
  opacity: { center: 1, edge: 0 },
  skew: 0,
  shapes: ['c', 's', 't'],
}

export default function App() {
  const [activeTab, setActiveTab] = useState('about')
  const [content, setContent] = useState(null)

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (['about', 'github', 'career'].includes(hash)) {
      setActiveTab(hash)
    }
  }, [])

  useEffect(() => {
    fetch('/docs/content.json')
      .then((r) => r.json())
      .then(setContent)
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (typeof window.FinisherHeader === 'function') {
      new window.FinisherHeader(FINISHER_CONFIG)
    }
  }, [])

  function handleTabChange(tab) {
    setActiveTab(tab)
    history.replaceState(null, '', `#${tab}`)
  }

  return (
    <div className="min-h-screen bg-gh-bg text-gh-text font-sans">
      <div className="finisher-header fixed inset-0 -z-10" />
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="w-full max-w-[1200px] mx-auto px-8 py-16 min-h-[calc(100vh-60px)]">
        {activeTab === 'about'  && <AboutSection  content={content} />}
        {activeTab === 'github' && <GithubSection content={content} />}
        {activeTab === 'career' && <CareerSection content={content} />}
      </main>
    </div>
  )
}
