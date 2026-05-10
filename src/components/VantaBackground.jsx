import { useEffect, useRef } from 'react'
import { useTheme } from '../contexts/ThemeContext.jsx'

// Dark:  bg matches --color-bg, dots use the lime accent + dark olive secondary
// Light: bg matches --color-bg, dots use muted olive tones
const DARK  = { color: 0xcaff33, color2: 0x1a2208, backgroundColor: 0x0e0e12 }
const LIGHT = { color: 0x418ee1, color2: 0xe0e8c8, backgroundColor: 0xf9f9f5 }

let _THREE = null
let _Dots  = null

async function loadVanta() {
  if (!_THREE) {
    _THREE = await import('three')
    window.THREE = _THREE
  }
  if (!_Dots) {
    const mod = await import('vanta/dist/vanta.net.min')
    _Dots = mod.default
  }
  return _Dots
}

export default function VantaBackground() {
  const el = useRef(null)
  const fx = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const colors = theme === 'dark' ? DARK : LIGHT
    let cancelled = false

    loadVanta().then(Dots => {
      if (cancelled || !el.current) return
      if (fx.current) fx.current.destroy()
      fx.current = Dots({
        el: el.current,
        mouseControls: false,
        touchControls: false,
        gyroControls: true,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 1.0,
        maxDistance: 1.00,
        size: 1.00,
        spacing: 15.00,
        showLines: false,
        showDots: true,
        ...colors,
      })
    })

    return () => {
      cancelled = true
      if (fx.current) { fx.current.destroy(); fx.current = null }
    }
  }, [theme])

  return <div ref={el} className="absolute inset-0" />
}
