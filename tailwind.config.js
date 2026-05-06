/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'gh-bg':            '#0d1117',
        'gh-bg-secondary':  '#161b22',
        'gh-bg-tertiary':   '#21262d',
        'gh-bg-elevated':   '#1c2128',
        'gh-text':          '#e6edf3',
        'gh-text-secondary':'#8b949e',
        'gh-text-muted':    '#6e7681',
        'gh-green':         '#2ea44f',
        'gh-green-hover':   '#3fb950',
        'gh-blue':          '#58a6ff',
        'gh-blue-hover':    '#79b8ff',
        'gh-border':        '#30363d',
        'gh-border-muted':  '#21262d',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Noto Sans"', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', '"SF Mono"', 'Monaco', '"Cascadia Mono"', 'monospace'],
      },
      transitionTimingFunction: {
        'out-expo':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'ease-in-out-custom': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        fadeSlideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-slide-up': 'fadeSlideUp 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
}
