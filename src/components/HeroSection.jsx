import { useRef, useEffect, useState, Suspense, Component } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Spline from '@splinetool/react-spline'
import { motion } from 'motion/react'

class SplineBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$_><[]'

function scramble(el, target, delay = 0) {
  const totalFrames = 52
  let frame = 0
  setTimeout(() => {
    const tick = () => {
      el.textContent = target
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          const revealAt = (i / target.length) * (totalFrames * 0.65)
          if (frame >= revealAt) return char
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        })
        .join('')
      frame++
      if (frame <= totalFrames) requestAnimationFrame(tick)
      else el.textContent = target
    }
    requestAnimationFrame(tick)
  }, delay)
}

/* CSS orbital fallback shown while/if Spline fails to load */
function OrbitFallback({ visible }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0, pointerEvents: 'none' }}
    >
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 animate-float">
        {/* Rings */}
        {[
          { size: '100%', color: 'rgba(202,255,51,0.06)',   anim: 'animate-orbit-1' },
          { size: '75%',  color: 'rgba(202,255,51,0.1)',    anim: 'animate-orbit-2' },
          { size: '52%',  color: 'rgba(150,80,255,0.12)',   anim: 'animate-orbit-3' },
        ].map(({ size, color, anim }, i) => (
          <div
            key={i}
            className={`absolute rounded-full border ${anim}`}
            style={{
              width: size, height: size,
              borderColor: color,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
        {/* Core glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: '30%', height: '30%',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(202,255,51,0.18) 0%, rgba(100,40,220,0.15) 60%, transparent 100%)',
            filter: 'blur(6px)',
          }}
        />
        {/* Corner markers */}
        {[
          { top: 0, left: 0 },
          { top: 0, right: 0 },
          { bottom: 0, left: 0 },
          { bottom: 0, right: 0 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-2.5 h-2.5 border-white/20"
            style={{
              ...pos,
              borderTopWidth:    pos.top    !== undefined ? '1px' : 0,
              borderBottomWidth: pos.bottom !== undefined ? '1px' : 0,
              borderLeftWidth:   pos.left   !== undefined ? '1px' : 0,
              borderRightWidth:  pos.right  !== undefined ? '1px' : 0,
            }}
          />
        ))}
        <span
          className="absolute font-mono text-[9px] text-muted/40 tracking-widest"
          style={{ bottom: '-24px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}
        >
          3D_SCENE // replace URL
        </span>
      </div>
    </div>
  )
}

export default function HeroSection() {
  const containerRef = useRef(null)
  const nameRef     = useRef(null)
  const surnameRef  = useRef(null)
  const [splineLoaded, setSplineLoaded] = useState(false)

  useEffect(() => {
    if (nameRef.current)    scramble(nameRef.current,    'ISAK',    200)
    if (surnameRef.current) scramble(surnameRef.current, 'GRAARUD', 650)
  }, [])

  useGSAP(() => {
    gsap.from('.h-tag', {
      y: 14, opacity: 0, duration: 0.55, stagger: 0.07,
      delay: 1.3, ease: 'power3.out',
    })
    gsap.from('.h-note', {
      x: 12, opacity: 0, duration: 0.5, stagger: 0.1,
      delay: 1.1, ease: 'power3.out',
    })
    gsap.from('.h-bottom', {
      y: 8, opacity: 0, duration: 0.45,
      delay: 1.9, ease: 'power3.out',
    })
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 dot-grid" />
      <div className="absolute inset-0 center-glow" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 pt-24 lg:pt-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_500px] items-center">

          {/* ── Left: Name block ───────────────────────────────── */}
          <div className="relative py-10 lg:py-0">

            {/* Selection bounding box */}
            <div className="absolute -inset-4 lg:-inset-6 border border-white/[0.07] pointer-events-none">
              {/* Corner square handles */}
              <div className="absolute -top-[3px] -left-[3px]  w-[7px] h-[7px] bg-white/35" />
              <div className="absolute -top-[3px] -right-[3px] w-[7px] h-[7px] bg-white/35" />
              <div className="absolute -bottom-[3px] -left-[3px]  w-[7px] h-[7px] bg-white/35" />
              <div className="absolute -bottom-[3px] -right-[3px] w-[7px] h-[7px] bg-white/35" />
              {/* Mid-side handles */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-[3px]  w-[7px] h-[4px] bg-white/20" />
              <div className="absolute top-1/2 -translate-y-1/2 -right-[3px] w-[7px] h-[4px] bg-white/20" />
              <div className="absolute left-1/2 -translate-x-1/2 -top-[3px]    w-[4px] h-[7px] bg-white/20" />
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-[3px] w-[4px] h-[7px] bg-white/20" />
            </div>

            {/* Small mono label */}
            <p className="h-tag font-mono text-[10px] text-muted tracking-[0.22em] mb-5 uppercase">
              Portfolio_v2025 · Software Developer
            </p>

            {/* ISAK GRAARUD — giant text */}
            <h1 className="font-sans font-bold leading-[0.88] tracking-[-0.025em] select-none">
              <span
                ref={nameRef}
                className="block text-[22vw] sm:text-[17vw] lg:text-[13vw] xl:text-[11.5vw] text-text"
              >
                ____
              </span>
              <span className="flex items-end gap-1.5 sm:gap-2">
                <span
                  ref={surnameRef}
                  className="block text-[14vw] sm:text-[11.5vw] lg:text-[9vw] xl:text-[8vw] text-accent"
                >
                  _______
                </span>
                {/* Blinking cursor */}
                <span
                  className="inline-block w-[0.06em] bg-accent animate-blink mb-[0.04em]"
                  style={{ height: '0.82em' }}
                />
              </span>
            </h1>

            {/* Tag pills */}
            <div className="flex flex-wrap gap-2 mt-8 lg:mt-10">
              {[
                'BSc Informatics · UiB',
                'Bergen, Norway',
                'Game Dev · Arabat',
                'PPL Aspirant',
              ].map(tag => (
                <span
                  key={tag}
                  className="h-tag font-mono text-[10px] px-3 py-1 border border-border-bright text-muted
                             hover:border-accent/50 hover:text-text/80 transition-all duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: Spline 3D + annotations ──────────────────── */}
          <div className="relative h-[38vh] sm:h-[46vh] lg:h-[58vh] xl:h-[62vh] mt-8 lg:mt-0">

            {/* Fallback (always mounted, hidden when Spline loads) */}
            <OrbitFallback visible={!splineLoaded} />

            {/* Spline — replace scene URL with your own from spline.design */}
            <SplineBoundary>
              <Suspense fallback={null}>
                <Spline
                  scene="https://prod.spline.design/DMf4aXob-ufOq2Al/scene.splinecode"
                  onLoad={() => setSplineLoaded(true)}
                  className="w-full h-full"
                  style={{ opacity: splineLoaded ? 1 : 0, transition: 'opacity 0.7s ease' }}
                />
              </Suspense>
            </SplineBoundary>

            {/* Monospace annotations */}
            <div className="absolute top-3 right-0 font-mono text-[10px] text-muted text-right space-y-1.5 pointer-events-none">
              {['** SOFTWARE DEVELOPER', '** GAME DEV ENTHUSIAST', '** AVIATION NERD'].map(n => (
                <p key={n} className="h-note">{n}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className="mt-16 lg:mt-20 flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="h-bottom font-mono text-[10px] text-muted tracking-[0.22em]">
            SCROLL TO EXPLORE
          </span>
          <div className="w-8 h-px bg-border" />
        </div>
      </div>

      {/* SCROLL indicator — bottom left */}
      <div className="h-bottom absolute bottom-8 left-8 flex items-center gap-3">
        <div className="relative w-px h-10 bg-border overflow-hidden">
          <div className="absolute inset-0 bg-accent animate-scrollLine" />
        </div>
        <span className="font-mono text-[10px] text-muted tracking-[0.22em]">SCROLL</span>
      </div>

      {/* CV download — bottom right */}
      <motion.a
        href={`${import.meta.env.BASE_URL}docs/testFile.pdf`}
        download
        className="h-bottom absolute bottom-8 right-8 font-mono text-[10px] text-muted hover:text-accent flex items-center gap-2 group transition-colors"
        whileHover={{ scale: 1.04 }}
      >
        <span className="tracking-[0.15em]">CV_2025.PDF</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 1v5.5M2.5 4L5 6.5 7.5 4M1 9h8"
            stroke="currentColor" strokeWidth="1.2"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </section>
  )
}
