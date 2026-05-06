import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'motion/react'

gsap.registerPlugin(ScrollTrigger)

export default function GithubSection({ content }) {
  const ref = useRef(null)
  const githubUrl = content?.socials?.github ?? 'https://github.com/Isakgraarud'

  useGSAP(() => {
    if (!content) return
    gsap.utils.toArray('.gh-reveal', ref.current).forEach((el, i) => {
      gsap.from(el, {
        y: 32, opacity: 0, duration: 0.7, delay: i * 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el, start: 'top 88%', toggleActions: 'play none none none',
        },
      })
    })
  }, { scope: ref, dependencies: [content] })

  return (
    <section ref={ref} id="github" className="w-full py-24 lg:py-32 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">

        {/* Section header */}
        <div className="gh-reveal flex items-center gap-4 mb-16">
          <span className="font-mono text-[10px] text-muted">04</span>
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-[10px] text-muted tracking-[0.22em]">PROJECTS</span>
        </div>

        {/* Main CTA */}
        <div className="gh-reveal grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end mb-16">
          <div>
            <h2 className="font-sans font-bold text-5xl lg:text-6xl text-text leading-tight tracking-[-0.02em] mb-6">
              Open Source<br />& Projects
            </h2>
            <p className="font-mono text-[11px] text-muted leading-relaxed max-w-md">
              Game dev, graphics programming, tooling. All my active projects
              — including Arabat — live on GitHub.
            </p>
          </div>

          <motion.a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.15em]
                       px-8 py-4 bg-accent text-bg font-semibold
                       hover:bg-accent/90 transition-all duration-200 shrink-0"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            VIEW GITHUB PROFILE
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M1 10L10 1M10 1H3.5M10 1V7.5"
                stroke="currentColor" strokeWidth="1.2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </div>

        {/* Feature row */}
        <div className="gh-reveal grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
          {[
            { label: 'FEATURED',    value: 'Arabat',          sub: 'Game project · Unity / C#' },
            { label: 'FOCUS',       value: 'Graphics',        sub: 'Graphics programming & game dev' },
            { label: 'PROFILE',     value: 'Isakgraarud',     sub: 'github.com' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-bg px-6 py-8">
              <span className="block font-mono text-[9px] text-muted tracking-[0.22em] mb-3">{label}</span>
              <span className="block font-sans font-semibold text-xl text-text mb-1">{value}</span>
              <span className="block font-mono text-[10px] text-muted/70">{sub}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
