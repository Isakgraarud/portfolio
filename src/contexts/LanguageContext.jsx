import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const UI = {
  en: {
    nav: { about: 'ABOUT', career: 'CAREER', projects: 'PROJECTS' },
    sections: { experience: 'EXPERIENCE', education: 'EDUCATION', projects: 'PROJECTS' },
    downloadCV: 'DOWNLOAD FULL CV',
    greeting: "Hi,\nI'm Isak.",
    switchTo: 'NO',
  },
  no: {
    nav: { about: 'OM MEG', career: 'KARRIERE', projects: 'PROSJEKTER' },
    sections: { experience: 'ERFARING', education: 'UTDANNING', projects: 'PROSJEKTER' },
    downloadCV: 'LAST NED CV',
    greeting: 'Hei,\njeg er Isak.',
    switchTo: 'EN',
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
