import { useState } from 'react'
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import CloseIcon from '@mui/icons-material/Close'
import LanguageIcon from '@mui/icons-material/Language'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { categories } from '../../data/products'
import { useCart } from '../../context/CartContext'
import { useColorMode } from '../../context/ColorModeContext'
import { useLanguage } from '../../context/LanguageContext'

export function Navbar() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { itemCount } = useCart()
  const { mode, toggleMode } = useColorMode()
  const { lang, toggleLang, t } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()

  const navLinks = [
    { label: t('nav.newArrivals'), to: '/products?filter=new' },
    { label: t('nav.bestSellers'), to: '/products?filter=bestseller' },
    { label: t('nav.deals'), to: '/products?filter=sale' },
  ]

  const currentUrl = location.pathname + location.search
  const isShopActive = location.pathname === '/products' && !location.search
  const isLinkActive = (to: string) => currentUrl === to

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(search ? `/products?q=${encodeURIComponent(search)}` : '/products')
    setDrawerOpen(false)
  }

  return (
    <>
      <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', py: 0.6 }}>
        <Container maxWidth="lg">
          <Typography variant="caption" fontWeight={600} textAlign="center" display="block">
            {t('nav.announcement')}
          </Typography>
        </Container>
      </Box>

      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: '1px solid', borderColor: 'divider', backdropFilter: 'blur(8px)' }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: { xs: 1, md: 3 }, py: 1 }}>
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} aria-label={t('nav.menu')}>
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              component={RouterLink}
              to="/"
              variant="h5"
              fontWeight={800}
              sx={{ textDecoration: 'none', color: 'text.primary', flexShrink: 0 }}
            >
              Aurora<Box component="span" sx={{ color: 'primary.main' }}>Shop</Box>
            </Typography>

            {!isMobile && (
              <Stack direction="row" spacing={0.5} sx={{ flexGrow: 1 }}>
                <Button
                  component={RouterLink}
                  to="/products"
                  color={isShopActive ? 'primary' : 'inherit'}
                  sx={{ fontWeight: isShopActive ? 700 : 500, bgcolor: isShopActive ? 'action.selected' : 'transparent' }}
                >
                  {t('nav.shop')}
                </Button>
                {navLinks.map((link) => (
                  <Button
                    key={link.label}
                    component={RouterLink}
                    to={link.to}
                    color={isLinkActive(link.to) ? 'primary' : 'inherit'}
                    sx={{ fontWeight: isLinkActive(link.to) ? 700 : 500, bgcolor: isLinkActive(link.to) ? 'action.selected' : 'transparent' }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Stack>
            )}

            {!isMobile && (
              <Box component="form" onSubmit={handleSearchSubmit} sx={{ flexGrow: 1, maxWidth: 360 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder={t('nav.search')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 999, bgcolor: 'action.hover' } }}
                />
              </Box>
            )}

            <Stack direction="row" spacing={0.5} sx={{ ml: 'auto' }}>
              <Button
                onClick={toggleLang}
                color="inherit"
                startIcon={<LanguageIcon />}
                sx={{ minWidth: 0, px: 1.25 }}
              >
                {lang === 'en' ? 'العربية' : 'English'}
              </Button>
              <IconButton onClick={toggleMode} aria-label="Toggle color mode">
                {mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
              </IconButton>
              {!isMobile && (
                <IconButton component={RouterLink} to="/wishlist" aria-label={t('nav.wishlist')}>
                  <FavoriteBorderIcon />
                </IconButton>
              )}
              {!isMobile && (
                <IconButton component={RouterLink} to="/login" aria-label={t('nav.account')}>
                  <PersonOutlineIcon />
                </IconButton>
              )}
              <IconButton component={RouterLink} to="/cart" aria-label={t('nav.cart')}>
                <Badge badgeContent={itemCount} color="secondary">
                  <ShoppingBagOutlinedIcon />
                </Badge>
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor={lang === 'ar' ? 'right' : 'left'} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280 }} role="presentation">
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={800}>
              {t('nav.menu')}
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)} aria-label="Close menu">
              <CloseIcon />
            </IconButton>
          </Stack>
          <Box component="form" onSubmit={handleSearchSubmit} sx={{ px: 2, pb: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder={t('nav.search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Divider />
          <List>
            <ListItemButton
              component={RouterLink}
              to="/products"
              selected={isShopActive}
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText primary={t('products.allProducts')} />
            </ListItemButton>
            {navLinks.map((link) => (
              <ListItemButton
                key={link.label}
                component={RouterLink}
                to={link.to}
                selected={isLinkActive(link.to)}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <List
            subheader={
              <Typography variant="overline" sx={{ px: 2, color: 'text.secondary' }}>
                {t('nav.categories')}
              </Typography>
            }
          >
            {categories.map((cat) => (
              <ListItemButton
                key={cat.id}
                component={RouterLink}
                to={`/products?category=${cat.id}`}
                selected={isLinkActive(`/products?category=${cat.id}`)}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={lang === 'ar' ? cat.nameAr : cat.name} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <List>
            <ListItemButton component={RouterLink} to="/wishlist" selected={isLinkActive('/wishlist')} onClick={() => setDrawerOpen(false)}>
              <ListItemIcon><FavoriteBorderIcon /></ListItemIcon>
              <ListItemText primary={t('nav.wishlist')} />
            </ListItemButton>
            <ListItemButton component={RouterLink} to="/login" selected={isLinkActive('/login')} onClick={() => setDrawerOpen(false)}>
              <ListItemIcon><PersonOutlineIcon /></ListItemIcon>
              <ListItemText primary={t('nav.account')} />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  )
}
