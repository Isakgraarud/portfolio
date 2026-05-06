import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

function ExpandableItem({ header, meta, children }) {
  const [open, setOpen] = useState(false)

  return (
    <li className="border-b border-gh-border-muted last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center justify-between w-full px-6 py-4 text-left
                   bg-transparent border-none cursor-pointer font-[inherit] text-[inherit]
                   transition-colors duration-200 hover:bg-[rgba(48,54,61,0.3)]
                   focus-visible:outline-2 focus-visible:outline-gh-green focus-visible:outline-offset-2"
      >
        <span className="font-semibold text-gh-text flex-1 min-w-0">{header}</span>
        <span className="text-sm text-gh-text-secondary mx-4 shrink-0">{meta}</span>
        <span
          className={`text-xl text-gh-text-muted shrink-0 transition-transform duration-200
                      ${open ? 'rotate-90' : 'rotate-0'}`}
          aria-hidden="true"
        >
          ›
        </span>
      </button>

      {open && (
        <div className="border-t border-gh-border-muted px-6 py-3">
          {children}
        </div>
      )}
    </li>
  )
}

function EducationList({ education }) {
  return (
    <ul className="flex flex-col gap-4 mb-8 list-none">
      {education.map((edu, i) => (
        <ExpandableItem key={i} header={edu.name} meta={edu.meta}>
          <ul className="flex flex-col gap-2 list-none">
            {(edu.courses ?? []).map((c, j) => (
              <li key={j} className="flex justify-between items-center px-4 py-2
                                     border-b border-gh-border-muted last:border-b-0">
                <span className="font-medium text-gh-text text-sm">{c.name}</span>
                <span className="text-sm text-gh-text-secondary">{c.meta}</span>
              </li>
            ))}
          </ul>
        </ExpandableItem>
      ))}
    </ul>
  )
}

function CareerList({ career }) {
  return (
    <ul className="flex flex-col gap-4 mb-8 list-none">
      {career.map((job, i) => {
        const meta = [job.company, job.period].filter(Boolean).join(' • ')
        return (
          <ExpandableItem key={i} header={job.title ?? job.name} meta={meta ?? job.meta}>
            {job.description && (
              <p className="text-[0.9375rem] text-gh-text-secondary leading-relaxed mb-4">
                {job.description}
              </p>
            )}
          </ExpandableItem>
        )
      })}
    </ul>
  )
}

export default function CareerSection({ content }) {
  const ref = useScrollReveal([content])

  return (
    <section ref={ref} className="w-full">
      <div className="animate-on-scroll w-full max-w-[70%] mx-auto">
        <h1 className="text-4xl font-semibold mb-4 text-gh-text">Education</h1>
        {content?.education
          ? <EducationList education={content.education} />
          : <p className="text-gh-text-secondary">Loading…</p>
        }

        <h1 className="text-4xl font-semibold mb-4 text-gh-text">Professional Experience</h1>
        {content?.career
          ? <CareerList career={content.career} />
          : <p className="text-gh-text-secondary">Loading…</p>
        }

        <a
          href={`${import.meta.env.BASE_URL}docs/testFile.pdf`}
          download
          className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-lg
                     bg-gh-green text-white transition-all duration-200
                     hover:bg-gh-green-hover hover:-translate-y-px
                     hover:shadow-[0_4px_12px_rgba(46,164,79,0.25)]"
        >
          Download CV (PDF)
        </a>
      </div>
    </section>
  )
}
