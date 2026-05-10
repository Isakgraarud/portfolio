import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const PROJECTS = [
  {
    id: 'zoombigedon',
    label: 'ZOOMBIGEDON',
    tech: 'Java · LibGDX',
    github: 'https://github.com/Isakgraarud/Zoombigedon',
    photos: [
      'images/zoombigedon/zoombigedon-screenshot-1.png',
      'images/zoombigedon/zoombigedon-screenshot-2.png',
      'images/zoombigedon/zoombigedon-screenshot-3.png',
    ],
  },
  { id: 'ph1', label: 'PLACEHOLDER 01', tech: '—', github: null, photos: [] },
  { id: 'ph2', label: 'PLACEHOLDER 02', tech: '—', github: null, photos: [] },
  { id: 'ph3', label: 'PLACEHOLDER 03', tech: '—', github: null, photos: [] },
  { id: 'ph4', label: 'PLACEHOLDER 04', tech: '—', github: null, photos: [] },
]

const base = import.meta.env.BASE_URL
const SPEED = 0.6 // px per frame

function ProjectCard({ project }) {
  const [current, setCurrent] = useState(0)
  const hasPhotos = project.photos.length > 0

  useEffect(() => {
    if (!hasPhotos) return
    const id = setInterval(
      () => setCurrent(i => (i + 1) % project.photos.length),
      4000,
    )
    return () => clearInterval(id)
  }, [project.photos.length, hasPhotos])

  const inner = (
    <div className="w-[720px] flex-shrink-0">
      <div className="relative w-full aspect-video overflow-hidden border border-border bg-gh-bg-secondary">
        {hasPhotos ? (
          <>
            <AnimatePresence initial={false}>
              <motion.img
                key={current}
                src={`${base}${project.photos[current]}`}
                alt={`${project.label} screenshot ${current + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: 'easeInOut' }}
              />
            </AnimatePresence>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {project.photos.map((_, i) => (
                <button
                  key={i}
                  onClick={e => { e.preventDefault(); setCurrent(i) }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-accent scale-125' : 'bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 border border-dashed border-border-bright opacity-30" />
        )}
      </div>

      <div className="flex items-center justify-between mt-3">
        <div>
          <span className="font-mono text-[10px] tracking-[0.2em] text-text">{project.label}</span>
          <span className="font-mono text-[9px] text-muted ml-3">{project.tech}</span>
        </div>
        {project.github && (
          <span className="font-mono text-[9px] tracking-[0.15em] text-muted group-hover/card:text-accent transition-colors duration-200">
            GITHUB →
          </span>
        )}
      </div>
    </div>
  )

  if (project.github) {
    return (
      <a href={project.github} target="_blank" rel="noopener noreferrer" className="group/card">
        {inner}
      </a>
    )
  }

  return inner
}

function wrap(offset, half) {
  if (offset >= 0) return offset - half
  if (offset < -half) return offset + half
  return offset
}

export default function ProjectShowcase() {
  const wrapperRef = useRef(null)
  const stripRef = useRef(null)
  const offsetRef = useRef(0)
  const pausedRef = useRef(false)
  const animRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => { pausedRef.current = hovered }, [hovered])

  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return

    const half = strip.scrollWidth / 2
    offsetRef.current = -half / 2

    const tick = () => {
      if (!pausedRef.current) offsetRef.current += SPEED
      offsetRef.current = wrap(offsetRef.current, half)
      strip.style.transform = `translateX(${offsetRef.current}px)`
      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  // Register wheel listener as non-passive so preventDefault works
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const onWheel = e => {
      e.preventDefault()
      const strip = stripRef.current
      if (!strip) return
      const half = strip.scrollWidth / 2
      offsetRef.current -= e.deltaX + e.deltaY
      offsetRef.current = wrap(offsetRef.current, half)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const strip = [...PROJECTS, ...PROJECTS]

  return (
    <div
      ref={wrapperRef}
      className="overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={stripRef} className="flex gap-8" style={{ width: 'max-content' }}>
        {strip.map((p, idx) => (
          <ProjectCard key={`${p.id}-${idx}`} project={p} />
        ))}
      </div>
    </div>
  )
}
