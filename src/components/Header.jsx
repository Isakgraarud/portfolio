import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useLang, UI } from '../contexts/LanguageContext.jsx'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { lang, toggle } = useLang()
  const ui = UI[lang]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'border-b border-border bg-bg/90 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="flex items-center justify-between w-full max-w-[1400px] mx-auto px-8 py-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-mono text-xs tracking-[0.25em] text-text hover:text-accent transition-colors duration-200"
        >
          IG_
        </button>

        <ul className="flex gap-8 list-none">
          {[
            { id: 'about',  label: ui.nav.about    },
            { id: 'career', label: ui.nav.career   },
            { id: 'github', label: ui.nav.projects },
          ].map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className="font-mono text-[10px] tracking-[0.2em] text-muted hover:text-text transition-colors duration-200"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="font-mono text-[10px] tracking-[0.18em] px-3 py-1.5 border border-border-bright text-muted
                       hover:border-text hover:text-text transition-all duration-200"
          >
            {ui.switchTo}
          </button>

          <motion.a
            href={`${import.meta.env.BASE_URL}docs/testFile.pdf`}
            download
            className="font-mono text-[10px] tracking-[0.18em] px-3 py-1.5 border border-accent/50 text-accent hover:bg-accent hover:text-bg transition-all duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            CV.PDF
          </motion.a>
        </div>
      </nav>
    </header>
  )
}
