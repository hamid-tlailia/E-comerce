import { createTheme } from '@mui/material/styles'
import type { PaletteMode } from '@mui/material'

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#4F46E5', light: '#818CF8', dark: '#3730A3', contrastText: '#fff' },
      secondary: { main: '#F97316', light: '#FDBA74', dark: '#C2410C', contrastText: '#fff' },
      success: { main: '#16A34A' },
      error: { main: '#DC2626' },
      warning: { main: '#F59E0B' },
      background:
        mode === 'light'
          ? { default: '#FAFAFB', paper: '#FFFFFF' }
          : { default: '#0B0B10', paper: '#15151D' },
      text:
        mode === 'light'
          ? { primary: '#111827', secondary: '#4B5563' }
          : { primary: '#F3F4F6', secondary: '#9CA3AF' },
      divider: mode === 'light' ? 'rgba(17,24,39,0.08)' : 'rgba(255,255,255,0.08)',
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 800, letterSpacing: -1 },
      h2: { fontWeight: 800, letterSpacing: -0.5 },
      h3: { fontWeight: 700, letterSpacing: -0.5 },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 },
      button: { fontWeight: 600, textTransform: 'none' },
    },
    shadows: Array(25).fill('none').map((_, i) =>
      i === 0 ? 'none' : `0 ${Math.min(i * 1.2, 24)}px ${Math.min(i * 3, 48)}px rgba(15, 23, 42, ${mode === 'light' ? 0.06 : 0.4})`
    ) as unknown as import('@mui/material/styles').Theme['shadows'],
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 999, paddingInline: 20, paddingBlock: 10 },
          sizeLarge: { paddingInline: 28, paddingBlock: 14, fontSize: '1rem' },
        },
        defaultProps: { disableElevation: true },
      },
      MuiCard: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
      MuiAppBar: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
      MuiChip: {
        styleOverrides: { root: { fontWeight: 600 } },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined' },
      },
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
    },
  })
