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
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { categories } from '../../data/products'
import { useCart } from '../../context/CartContext'
import { useColorMode } from '../../context/ColorModeContext'

const navLinks = [
  { label: 'New Arrivals', to: '/products?filter=new' },
  { label: 'Best Sellers', to: '/products?filter=bestseller' },
  { label: 'Deals', to: '/products?filter=sale' },
]

export function Navbar() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { itemCount } = useCart()
  const { mode, toggleMode } = useColorMode()
  const navigate = useNavigate()

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
            Free shipping on orders over $50 · Secure checkout · Easy 30-day returns
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
              <IconButton onClick={() => setDrawerOpen(true)} aria-label="Open menu">
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
                <Button component={RouterLink} to="/products" color="inherit">
                  Shop
                </Button>
                {navLinks.map((link) => (
                  <Button key={link.label} component={RouterLink} to={link.to} color="inherit">
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
                  placeholder="Search products…"
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
              <IconButton onClick={toggleMode} aria-label="Toggle color mode">
                {mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
              </IconButton>
              {!isMobile && (
                <IconButton component={RouterLink} to="/wishlist" aria-label="Wishlist">
                  <FavoriteBorderIcon />
                </IconButton>
              )}
              {!isMobile && (
                <IconButton component={RouterLink} to="/login" aria-label="Account">
                  <PersonOutlineIcon />
                </IconButton>
              )}
              <IconButton component={RouterLink} to="/cart" aria-label="Cart">
                <Badge badgeContent={itemCount} color="secondary">
                  <ShoppingBagOutlinedIcon />
                </Badge>
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280 }} role="presentation">
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={800}>
              Menu
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)} aria-label="Close menu">
              <CloseIcon />
            </IconButton>
          </Stack>
          <Box component="form" onSubmit={handleSearchSubmit} sx={{ px: 2, pb: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search products…"
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
            <ListItemButton component={RouterLink} to="/products" onClick={() => setDrawerOpen(false)}>
              <ListItemText primary="Shop All" />
            </ListItemButton>
            {navLinks.map((link) => (
              <ListItemButton key={link.label} component={RouterLink} to={link.to} onClick={() => setDrawerOpen(false)}>
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <List
            subheader={
              <Typography variant="overline" sx={{ px: 2, color: 'text.secondary' }}>
                Categories
              </Typography>
            }
          >
            {categories.map((cat) => (
              <ListItemButton
                key={cat.id}
                component={RouterLink}
                to={`/products?category=${cat.id}`}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={cat.name} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <List>
            <ListItemButton component={RouterLink} to="/wishlist" onClick={() => setDrawerOpen(false)}>
              <ListItemIcon><FavoriteBorderIcon /></ListItemIcon>
              <ListItemText primary="Wishlist" />
            </ListItemButton>
            <ListItemButton component={RouterLink} to="/login" onClick={() => setDrawerOpen(false)}>
              <ListItemIcon><PersonOutlineIcon /></ListItemIcon>
              <ListItemText primary="Account" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  )
}
