import { useScrollReveal } from '../hooks/useScrollReveal.js'

export default function GithubSection({ content }) {
  const ref = useScrollReveal()
  const githubUrl = content?.socials?.github ?? 'https://github.com/Isakgraarud'

  return (
    <section ref={ref} className="w-full">
      <div className="animate-on-scroll w-full max-w-[70%] mx-auto">
        <h1 className="text-4xl font-semibold mb-4 text-gh-text">Github</h1>
        <div className="text-center py-12">
          <p className="mb-8 text-gh-text-secondary">
            Explore my projects, contributions, and open-source work on GitHub.
          </p>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg
                       bg-gh-green text-white transition-all duration-200
                       hover:bg-gh-green-hover hover:-translate-y-px
                       hover:shadow-[0_4px_12px_rgba(46,164,79,0.25)]"
          >
            Visit my GitHub Profile →
          </a>
        </div>
      </div>
    </section>
  )
}
