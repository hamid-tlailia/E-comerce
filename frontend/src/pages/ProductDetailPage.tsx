import { useState } from 'react'
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import { Link as RouterLink, Navigate, useNavigate, useParams } from 'react-router-dom'
import { getProductBySlug, getRelatedProducts } from '../data/products'
import { PriceTag } from '../components/common/PriceTag'
import { RatingStars } from '../components/common/RatingStars'
import { ProductGrid } from '../components/product/ProductGrid'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = slug ? getProductBySlug(slug) : undefined
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()

  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState<string | undefined>(product?.colors?.[0])
  const [tab, setTab] = useState(0)

  if (!product) return <Navigate to="/products" replace />

  const related = getRelatedProducts(product)
  const wished = has(product.id)

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" underline="hover" color="text.secondary">Home</Link>
        <Link component={RouterLink} to="/products" underline="hover" color="text.secondary">Shop</Link>
        <Typography color="text.primary">{product.title}</Typography>
      </Breadcrumbs>

      <Grid container spacing={{ xs: 3, md: 6 }}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={product.images[activeImage]}
            alt={product.title}
            sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 3, mb: 1.5 }}
          />
          <Stack direction="row" spacing={1.5}>
            {product.images.map((img, i) => (
              <Box
                key={img}
                component="button"
                onClick={() => setActiveImage(i)}
                sx={{
                  p: 0,
                  border: '2px solid',
                  borderColor: activeImage === i ? 'primary.main' : 'transparent',
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  bgcolor: 'transparent',
                  width: 72,
                  height: 72,
                }}
              >
                <Box component="img" src={img} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </Box>
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="overline" color="secondary.main" fontWeight={700}>
            {product.brand}
          </Typography>
          <Typography variant="h4" sx={{ mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
            {product.title}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <RatingStars value={product.rating} count={product.reviewsCount} size="medium" />
          </Box>
          <PriceTag price={product.price} oldPrice={product.oldPrice} currency={product.currency} size="large" />

          <Divider sx={{ my: 3 }} />

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          {product.colors && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" fontWeight={700} gutterBottom>Color</Typography>
              <Stack direction="row" spacing={1.5}>
                {product.colors.map((c) => (
                  <Box
                    key={c}
                    component="button"
                    onClick={() => setColor(c)}
                    aria-label={`Color ${c}`}
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: c,
                      cursor: 'pointer',
                      border: '2px solid',
                      borderColor: color === c ? 'primary.main' : 'divider',
                      outline: color === c ? '2px solid' : 'none',
                      outlineColor: 'primary.light',
                      outlineOffset: '2px',
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          <Typography variant="subtitle2" fontWeight={700} gutterBottom>Quantity</Typography>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Stack direction="row" alignItems="center" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 999 }}>
              <IconButton size="small" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography sx={{ width: 32, textAlign: 'center' }}>{quantity}</Typography>
              <IconButton size="small" onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} aria-label="Increase quantity">
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>
            <Typography variant="caption" color="text.secondary">{product.stock} in stock</Typography>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => addItem(product.id, quantity, color)}
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={() => {
                addItem(product.id, quantity, color)
                navigate('/checkout')
              }}
            >
              Buy Now
            </Button>
            <IconButton
              onClick={() => toggle(product.id)}
              sx={{ border: '1px solid', borderColor: 'divider', flexShrink: 0 }}
              aria-label="Toggle wishlist"
            >
              {wished ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
          </Stack>

          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <LocalShippingOutlinedIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">Free delivery on orders over $50</Typography>
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <ReplayOutlinedIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">30-day hassle-free returns</Typography>
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <VerifiedUserOutlinedIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">Secure payment via international & local cards</Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Box sx={{ mt: 8 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: '1px solid', borderColor: 'divider', mb: 3 }}>
          <Tab label="Highlights" />
          <Tab label="Description" />
          <Tab label={`Reviews (${product.reviewsCount})`} />
        </Tabs>
        {tab === 0 && (
          <Stack spacing={1} sx={{ maxWidth: 600 }}>
            {product.highlights.map((h) => (
              <Typography key={h} variant="body2" color="text.secondary">• {h}</Typography>
            ))}
          </Stack>
        )}
        {tab === 1 && (
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 700 }}>
            {product.description} Crafted with attention to detail and rigorously tested for everyday reliability,
            this product is designed to fit seamlessly into your lifestyle.
          </Typography>
        )}
        {tab === 2 && (
          <Stack spacing={1}>
            <RatingStars value={product.rating} count={product.reviewsCount} size="medium" />
            <Typography variant="body2" color="text.secondary">
              Reviews are illustrative — this storefront is a design preview and not yet connected to a backend.
            </Typography>
          </Stack>
        )}
      </Box>

      {related.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" gutterBottom>You may also like</Typography>
          <ProductGrid products={related} />
        </Box>
      )}
    </Container>
  )
}
