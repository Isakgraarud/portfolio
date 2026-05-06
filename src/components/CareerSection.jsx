import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'motion/react'
import { useLang, UI } from '../contexts/LanguageContext.jsx'

gsap.registerPlugin(ScrollTrigger)

function ExpandItem({ title, meta, children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-start gap-4 w-full py-5 text-left group"
      >
        {/* Left accent line */}
        <div
          className="w-px flex-shrink-0 mt-1 transition-colors duration-300 self-stretch"
          style={{ backgroundColor: open ? '#CAFF33' : '#1E1E26', minHeight: '20px' }}
        />

        <div className="flex-1 min-w-0">
          <span
            className="font-sans font-semibold text-base transition-colors duration-200"
            style={{ color: open ? '#CAFF33' : '#F0F0EE' }}
          >
            {title}
          </span>
          <span className="block font-mono text-[10px] text-muted mt-1 tracking-wide">
            {meta}
          </span>
        </div>

        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="font-mono text-xl text-muted group-hover:text-muted-bright transition-colors mt-0.5 shrink-0"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-5 pb-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SectionLabel({ number, title }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-mono text-[10px] text-muted">{number}</span>
      <div className="flex-1 h-px bg-border" />
      <span className="font-mono text-[10px] text-muted tracking-[0.22em] uppercase">{title}</span>
    </div>
  )
}

export default function CareerSection({ content }) {
  const ref = useRef(null)
  const { lang } = useLang()
  const ui = UI[lang]

  useGSAP(() => {
    if (!content) return
    gsap.utils.toArray('.career-reveal', ref.current).forEach((el, i) => {
      gsap.from(el, {
        y: 32, opacity: 0, duration: 0.7, delay: i * 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el, start: 'top 88%', toggleActions: 'play none none none',
        },
      })
    })
  }, { scope: ref, dependencies: [content] })

  return (
    <section ref={ref} id="career" className="w-full py-24 lg:py-32 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">

        {/* ── Experience ────────────────────────────────── */}
        <div className="career-reveal mb-16">
          <SectionLabel number="02" title={ui.sections.experience} />
          <div>
            {content?.[lang]?.career
              ? content[lang].career.map((job, i) => (
                  <ExpandItem
                    key={i}
                    title={job.title ?? job.name}
                    meta={[job.company, job.period].filter(Boolean).join(' · ')}
                  >
                    {job.description && (
                      <p className="font-mono text-[11px] text-muted leading-relaxed">
                        {job.description}
                      </p>
                    )}
                  </ExpandItem>
                ))
              : <p className="font-mono text-xs text-muted">Loading…</p>
            }
          </div>
        </div>

        {/* ── Education ─────────────────────────────────── */}
        <div className="career-reveal mb-16">
          <SectionLabel number="03" title={ui.sections.education} />
          <div>
            {content?.education
              ? content.education.map((edu, i) => (
                  <ExpandItem key={i} title={edu.name} meta={edu.meta}>
                    {edu.courses && (
                      <ul className="space-y-2 mt-2">
                        {edu.courses.filter(c => c.name).map((c, j) => (
                          <li key={j} className="flex items-center justify-between gap-4">
                            <span className="font-mono text-[10px] text-muted/80 flex-1">{c.name}</span>
                            <span className="font-mono text-[10px] text-muted/45 shrink-0">{c.meta}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </ExpandItem>
                ))
              : <p className="font-mono text-xs text-muted">Loading…</p>
            }
          </div>
        </div>

        {/* CV download */}
        <div className="career-reveal">
          <motion.a
            href={`${import.meta.env.BASE_URL}docs/testFile.pdf`}
            download
            className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.15em]
                       px-6 py-3 border border-accent/40 text-accent
                       hover:bg-accent hover:text-bg transition-all duration-200"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            {ui.downloadCV}
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M5.5 1v6M3 4.5l2.5 2.5 2.5-2.5M1 10h9"
                stroke="currentColor" strokeWidth="1.2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
