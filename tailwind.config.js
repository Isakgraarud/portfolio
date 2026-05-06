/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:              'rgb(var(--color-bg) / <alpha-value>)',
        surface:         'rgb(var(--color-surface) / <alpha-value>)',
        elevated:        'rgb(var(--color-elevated) / <alpha-value>)',
        border:          'rgb(var(--color-border) / <alpha-value>)',
        'border-bright': 'rgb(var(--color-border-bright) / <alpha-value>)',
        text:            'rgb(var(--color-text) / <alpha-value>)',
        muted:           'rgb(var(--color-muted) / <alpha-value>)',
        'muted-bright':  'rgb(var(--color-muted-bright) / <alpha-value>)',
        accent:          'rgb(var(--color-accent) / <alpha-value>)',
        'accent-dim':    'rgb(var(--color-accent) / 0.08)',
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
