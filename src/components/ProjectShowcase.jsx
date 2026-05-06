import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const PROJECTS = [
  {
    id: 'zoombigedon',
    label: 'ZOOMBIGEDON',
    tech: 'Godot · GDScript',
    github: 'https://github.com/Isakgraarud/Zoombigedon',
    photos: [
      'images/zoombigedon/zoombigedon-screenshot-1.png',
      'images/zoombigedon/zoombigedon-screenshot-2.png',
      'images/zoombigedon/zoombigedon-screenshot-3.png',
    ],
  },
]

const base = import.meta.env.BASE_URL

function ProjectCard({ project }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setCurrent(i => (i + 1) % project.photos.length),
      4000,
    )
    return () => clearInterval(id)
  }, [project.photos.length])

  return (
    <div className="group">
      {/* Slideshow */}
      <div className="relative w-full aspect-video overflow-hidden border border-border bg-gh-bg-secondary">
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

        {/* Dot navigation */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {project.photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'bg-accent scale-125' : 'bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Label row */}
      <div className="flex items-center justify-between mt-3">
        <div>
          <span className="font-mono text-[10px] tracking-[0.2em] text-text">{project.label}</span>
          <span className="font-mono text-[9px] text-muted ml-3">{project.tech}</span>
        </div>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[9px] tracking-[0.15em] text-muted hover:text-accent transition-colors duration-200"
          >
            GITHUB →
          </a>
        )}
      </div>
    </div>
  )
}

export default function ProjectShowcase() {
  return (
    <div
      className={`grid gap-8 ${
        PROJECTS.length === 1 ? 'grid-cols-1 max-w-2xl' : 'grid-cols-1 md:grid-cols-2'
      }`}
    >
      {PROJECTS.map(p => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  )
}
