import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import '@fontsource/tajawal/400.css'
import '@fontsource/tajawal/500.css'
import '@fontsource/tajawal/700.css'
import '@fontsource/tajawal/800.css'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageContext'
import { ColorModeProvider } from './context/ColorModeContext'
import { SnackbarProvider } from './context/SnackbarContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <ColorModeProvider>
          <SnackbarProvider>
            <CartProvider>
              <WishlistProvider>
                <App />
              </WishlistProvider>
            </CartProvider>
          </SnackbarProvider>
        </ColorModeProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
