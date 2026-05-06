# Isak Graarud | Online CV

A personal portfolio / online CV built with **React + Vite + Tailwind CSS**.
GitHub-inspired dark theme, Apple-style scroll animations, and an animated particle background.

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Vite](https://vitejs.dev) | Build tool & dev server |
| [React 18](https://react.dev) | UI components |
| [Tailwind CSS v3](https://tailwindcss.com) | Utility-first styling |
| FinisherHeader | Animated canvas background |

## Project Structure

```
├── public/
│   ├── images/             # Gallery photos
│   ├── docs/
│   │   ├── content.json    # All bio, education & career data
│   │   └── testFile.pdf    # Downloadable CV
│   └── js/
│       └── background.js   # FinisherHeader canvas library
├── src/
│   ├── main.jsx
│   ├── App.jsx             # Tab state, data fetching, background init
│   ├── index.css           # Tailwind directives + custom scroll animations
│   ├── hooks/
│   │   └── useScrollReveal.js  # IntersectionObserver scroll-reveal hook
│   └── components/
│       ├── Header.jsx          # Sticky nav with tab indicators
│       ├── AboutSection.jsx    # Bio, photo, social links
│       ├── PhotoGallery.jsx    # Vision-board image grid
│       ├── GithubSection.jsx   # GitHub CTA card
│       └── CareerSection.jsx   # Expandable education & career lists
├── tailwind.config.js      # GitHub dark color palette + custom easing
├── vite.config.js
└── index.html
```

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build
```

## Updating Content

All bio, education, and career data lives in **`public/docs/content.json`** — no code changes needed.

```jsonc
{
  "about": { "image": "...", "intro": "...", "story": "..." },
  "socials": { "github": "...", "linkedin": "...", "email": "..." },
  "education": [{ "name": "...", "meta": "...", "courses": [...] }],
  "career":    [{ "title": "...", "company": "...", "period": "...", "description": "..." }]
}
```

## Adding a New Tab

1. Add the tab entry in `Header.jsx`:
   ```js
   { id: 'projects', label: 'Projects' }
   ```

2. Create `src/components/ProjectsSection.jsx`.

3. Import and render it conditionally in `App.jsx`:
   ```jsx
   {activeTab === 'projects' && <ProjectsSection content={content} />}
   ```

## Theme Customization

Colors are defined in `tailwind.config.js` under `theme.extend.colors` with the `gh-*` prefix.
