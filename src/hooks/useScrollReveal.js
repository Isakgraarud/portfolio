import { useEffect, useRef } from 'react'

export function useScrollReveal(deps = []) {
  const containerRef = useRef(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const elements = root.querySelectorAll('.animate-on-scroll')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')

          const children = entry.target.querySelectorAll('.stagger-children > *')
          children.forEach((child, i) => {
            setTimeout(() => child.classList.add('is-visible'), i * 60)
          })
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return containerRef
}
