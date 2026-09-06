import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { translations } from '../i18n/translations'
import type { Lang } from '../types'

interface LanguageContextValue {
  lang: Lang
  dir: 'ltr' | 'rtl'
  toggleLang: () => void
  t: (path: string, vars?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)
const STORAGE_KEY = 'aurora-shop-lang'

function resolve(obj: unknown, path: string): string {
  const value = path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
  return typeof value === 'string' ? value : path
}

function interpolate(str: string, vars?: Record<string, string | number>) {
  if (!vars) return str
  return Object.entries(vars).reduce((acc, [key, val]) => acc.replaceAll(`{${key}}`, String(val)), str)
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'ar' || stored === 'en' ? stored : 'en'
  })

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'ar' : 'en'))

  const t = useMemo(
    () => (path: string, vars?: Record<string, string | number>) => interpolate(resolve(translations[lang], path), vars),
    [lang],
  )

  return <LanguageContext.Provider value={{ lang, dir, toggleLang, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
