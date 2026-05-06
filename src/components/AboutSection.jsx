import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'motion/react'
import { useLang, UI } from '../contexts/LanguageContext.jsx'
import ProjectShowcase from './ProjectShowcase.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection({ content }) {
  const ref   = useRef(null)
  const { lang } = useLang()
  const ui = UI[lang]

  const about   = content?.about
  const image   = content?.about?.image
  const socials = content?.socials

  useGSAP(() => {
    if (!content) return
    gsap.utils.toArray('.about-reveal', ref.current).forEach((el, i) => {
      gsap.from(el, {
        y: 36, opacity: 0, duration: 0.75, delay: i * 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el, start: 'top 88%', toggleActions: 'play none none none',
        },
      })
    })
  }, { scope: ref, dependencies: [content] })

  return (
    <section ref={ref} id="about" className="w-full py-24 lg:py-32 relative">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">

        {/* Section header */}
        <div className="about-reveal flex items-center gap-4 mb-16">
          <span className="font-mono text-[10px] text-muted">01</span>
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-[10px] text-muted tracking-[0.22em]">{ui.nav.about}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] xl:grid-cols-[1fr_300px] gap-12 lg:gap-16 items-start">

          {/* Bio */}
          <div>
            <h2 className="about-reveal font-sans font-bold text-5xl lg:text-6xl text-text mb-8 leading-tight tracking-[-0.02em] whitespace-pre-line">
              {ui.greeting}
            </h2>

            <p className="about-reveal text-base lg:text-lg text-text/75 leading-relaxed mb-5 whitespace-pre-line">
              {about?.intro ?? 'Loading…'}
            </p>
            <p className="about-reveal text-sm text-muted leading-relaxed whitespace-pre-line">
              {about?.story}
            </p>

            {/* AI Native callout */}
            {about?.aiNative && (
              <div className="about-reveal mt-8 border-l-2 border-accent pl-5 py-1">
                <span className="block font-mono text-[9px] tracking-[0.2em] text-accent mb-2">AI_NATIVE</span>
                <p className="text-sm text-text/70 leading-relaxed">{about.aiNative}</p>
              </div>
            )}

            {/* Social links */}
            <div className="about-reveal flex flex-wrap gap-3 mt-8">
              {[
                { href: socials?.github   ?? 'https://github.com/Isakgraarud',         label: 'GITHUB →'   },
                { href: socials?.linkedin ?? 'https://linkedin.com/in/isak-graarud',   label: 'LINKEDIN →' },
                { href: socials?.email    ?? 'mailto:isak.graarud@gmail.com',          label: 'EMAIL →'    },
              ].map(({ href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-[0.15em] px-4 py-2 border border-border-bright text-muted
                             hover:border-accent/50 hover:text-accent transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Photo */}
          {image && (
            <div className="about-reveal">
              <div className="relative">
                <div className="absolute inset-0 border border-accent/20 translate-x-3 translate-y-3 pointer-events-none" />
                <img
                  src={`${import.meta.env.BASE_URL}${image}`}
                  alt="Isak Graarud"
                  className="relative w-full aspect-[3/4] object-cover border border-border"
                />
                <span className="absolute -bottom-6 right-0 font-mono text-[9px] text-muted tracking-widest">
                  ISAK_GRAARUD.JPG
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Project photos */}
        <div className="about-reveal mt-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] text-muted tracking-[0.22em]">{ui.sections.projects}</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <ProjectShowcase />
        </div>
      </div>
    </section>
  )
}
