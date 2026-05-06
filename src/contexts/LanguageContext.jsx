import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const UI = {
  en: {
    nav: { about: 'ABOUT', career: 'CAREER', projects: 'PROJECTS', github: 'GITHUB' },
    sections: { experience: 'EXPERIENCE', education: 'EDUCATION', projects: 'PROJECTS' },
    downloadCV: 'DOWNLOAD CV',
    greeting: "Hi,\nI'm Isak.",
    switchTo: 'NO',
    hero: {
      label: 'Portfolio_v2025 · Software Developer',
      annotations: ['** SOFTWARE DEVELOPER', '** AVIATION ENTHUSIAST', '** GAME DEVELOPER'],
      scrollExplore: 'SCROLL TO EXPLORE',
      scroll: 'SCROLL',
    },
  },
  no: {
    nav: { about: 'OM MEG', career: 'KARRIERE', projects: 'PROSJEKTER', github: 'GITHUB' },
    sections: { experience: 'ERFARING', education: 'UTDANNING', projects: 'PROSJEKTER' },
    downloadCV: 'LAST NED CV',
    greeting: 'Hei,\njeg er Isak.',
    switchTo: 'EN',
    hero: {
      label: 'Portfolio_v2025 · Programvareutvikler',
      annotations: ['** PROGRAMVAREUTVIKLER', '** LUFTFARTSENTUSIAST', '** SPILLUTVIKLER'],
      scrollExplore: 'SCROLL FOR Å UTFORSKE',
      scroll: 'SCROLL',
    },
  },
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const toggle = () => setLang(l => (l === 'en' ? 'no' : 'en'))
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
