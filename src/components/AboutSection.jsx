import { useScrollReveal } from '../hooks/useScrollReveal.js'
import PhotoGallery from './PhotoGallery.jsx'

export default function AboutSection({ content }) {
  const ref = useScrollReveal([content])

  const about  = content?.about
  const socials = content?.socials

  return (
    <section ref={ref} className="w-full animate-fade-slide-up">
      <div className="animate-on-scroll w-full max-w-[70%] mx-auto">
        <h1 className="text-4xl font-semibold mb-4 text-gh-text">Hi, my name is Isak 👋</h1>

        <div className="py-4 pb-10 flex flex-col gap-6">
          {/* Bio card */}
          <div className="overflow-auto">
            {about?.image && (
              <img
                src={about.image}
                alt="Isak Graarud"
                className="float-right w-60 h-auto rounded-lg object-cover border border-gh-border ml-8 mb-4"
              />
            )}
            <p className="text-[1.0625rem] text-gh-text mb-4 whitespace-pre-line">
              {about?.intro ?? 'Loading bio…'}
            </p>
            <p className="text-[0.9375rem] text-gh-text-secondary leading-relaxed whitespace-pre-line">
              {about?.story}
            </p>
            <div className="clear-both" />
          </div>

          {/* Social links */}
          <div className="flex flex-wrap gap-4">
            <a
              href={socials?.github ?? 'https://github.com/Isakgraarud'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-lg
                         bg-gh-green text-white transition-all duration-200
                         hover:bg-gh-green-hover hover:-translate-y-px
                         hover:shadow-[0_4px_12px_rgba(46,164,79,0.25)]"
            >
              View my GitHub
            </a>
            <a
              href={socials?.linkedin ?? 'https://www.linkedin.com/in/isak-graarud'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-lg
                         bg-gh-bg-tertiary text-gh-text border border-gh-border
                         transition-all duration-200 hover:bg-gh-border hover:border-gh-text-muted"
            >
              LinkedIn
            </a>
            <a
              href={socials?.email ?? 'mailto:isak.graarud@gmail.com'}
              className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-lg
                         bg-gh-bg-tertiary text-gh-text border border-gh-border
                         transition-all duration-200 hover:bg-gh-border hover:border-gh-text-muted"
            >
              Email
            </a>
          </div>
        </div>

        <PhotoGallery />
      </div>
    </section>
  )
}
