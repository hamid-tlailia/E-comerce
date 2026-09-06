import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ThemeProvider, CssBaseline, type PaletteMode } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import rtlPlugin from 'stylis-plugin-rtl'
import { prefixer } from 'stylis'
import { getTheme } from '../theme'
import { useLanguage } from './LanguageContext'

interface ColorModeContextValue {
  mode: PaletteMode
  toggleMode: () => void
}

const ColorModeContext = createContext<ColorModeContextValue>({ mode: 'light', toggleMode: () => {} })
const STORAGE_KEY = 'hamidos-shop-mode'

const ltrCache = createCache({ key: 'mui-ltr', stylisPlugins: [prefixer] })
const rtlCache = createCache({ key: 'mui-rtl', stylisPlugins: [prefixer, rtlPlugin] })

export function ColorModeProvider({ children }: { children: ReactNode }) {
  const { lang, dir } = useLanguage()
  const [mode, setMode] = useState<PaletteMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'dark' || stored === 'light' ? stored : 'light'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode)
  }, [mode])

  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))

  const theme = useMemo(() => getTheme(mode, lang), [mode, lang])

  return (
    <ColorModeContext.Provider value={{ mode, toggleMode }}>
      <CacheProvider value={dir === 'rtl' ? rtlCache : ltrCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </ColorModeContext.Provider>
  )
}

export function useColorMode() {
  return useContext(ColorModeContext)
}
