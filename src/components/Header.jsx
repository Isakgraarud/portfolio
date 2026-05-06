const TABS = [
  { id: 'about',  label: 'About Me' },
  { id: 'github', label: 'Github' },
  { id: 'career', label: 'Career' },
]

export default function Header({ activeTab, onTabChange }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gh-border"
            style={{ background: 'rgba(13,17,23,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
      <nav className="relative flex items-center w-full max-w-[1200px] mx-auto px-8 py-4">
        <a
          href="#about"
          onClick={(e) => { e.preventDefault(); onTabChange('about') }}
          className="absolute left-4 text-white text-2xl font-semibold no-underline hover:opacity-90 transition-opacity"
        >
          IG
        </a>

        <div className="flex-1" />

        <ul className="flex gap-1 list-none">
          {TABS.map((tab) => (
            <li key={tab.id}>
              <a
                href={`#${tab.id}`}
                onClick={(e) => { e.preventDefault(); onTabChange(tab.id) }}
                className={`
                  relative inline-block px-4 py-2 pb-[10px] text-sm font-medium rounded-md
                  transition-colors duration-200
                  ${activeTab === tab.id
                    ? 'text-gh-text nav-tab-active'
                    : 'text-gh-text-secondary hover:text-gh-text'}
                `}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex-1" />
      </nav>
    </header>
  )
}
