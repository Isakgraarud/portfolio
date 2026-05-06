/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:              '#0A0A0D',
        surface:         '#111116',
        elevated:        '#18181F',
        border:          '#1E1E26',
        'border-bright': '#2E2E3A',
        text:            '#F0F0EE',
        muted:           '#55555F',
        'muted-bright':  '#888890',
        accent:          '#CAFF33',
        'accent-dim':    'rgba(202, 255, 51, 0.08)',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        scrollLine: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        orbitSpin: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        blink:       'blink 1s step-end infinite',
        scrollLine:  'scrollLine 2s ease-in-out infinite',
        float:       'float 4s ease-in-out infinite',
        'orbit-1':   'orbitSpin 10s linear infinite',
        'orbit-2':   'orbitSpin 7s linear infinite reverse',
        'orbit-3':   'orbitSpin 14s linear infinite',
      },
    },
  },
  plugins: [],
}
