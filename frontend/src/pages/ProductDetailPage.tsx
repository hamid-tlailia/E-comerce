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
import CheckIcon from '@mui/icons-material/Check'
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
import { useLanguage } from '../context/LanguageContext'
import { useSnackbar } from '../context/SnackbarContext'

export function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = slug ? getProductBySlug(slug) : undefined
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()
  const { lang, t } = useLanguage()
  const { notify } = useSnackbar()

  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState<string | undefined>(product?.colors?.[0])
  const [tab, setTab] = useState(0)
  const [justAdded, setJustAdded] = useState(false)

  if (!product) return <Navigate to="/products" replace />

  const related = getRelatedProducts(product)
  const wished = has(product.id)
  const title = lang === 'ar' ? product.titleAr : product.title
  const description = lang === 'ar' ? product.descriptionAr : product.description
  const highlights = lang === 'ar' ? product.highlightsAr : product.highlights

  const handleAddToCart = () => {
    addItem(product.id, quantity, color)
    notify(t('snackbar.addedToCart', { name: title }))
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  const handleBuyNow = () => {
    addItem(product.id, quantity, color)
    navigate('/checkout')
  }

  const handleToggleWishlist = () => {
    const willAdd = !wished
    toggle(product.id)
    notify(t(willAdd ? 'snackbar.addedToWishlist' : 'snackbar.removedFromWishlist', { name: title }))
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" underline="hover" color="text.secondary">{t('product.home')}</Link>
        <Link component={RouterLink} to="/products" underline="hover" color="text.secondary">{t('product.shop')}</Link>
        <Typography color="text.primary">{title}</Typography>
      </Breadcrumbs>

      <Grid container spacing={{ xs: 3, md: 6 }}>
        <Grid item xs={12} md={7}>
          <Stack direction={{ xs: 'column-reverse', md: 'row' }} spacing={2}>
            <Stack
              direction={{ xs: 'row', md: 'column' }}
              spacing={1.5}
              sx={{ overflow: 'auto', maxHeight: { md: 560 }, pb: { xs: 0.5, md: 0 } }}
            >
              {product.images.map((image, i) => (
                <Box
                  key={image}
                  component="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`${title} ${i + 1}`}
                  sx={{
                    p: 0,
                    flexShrink: 0,
                    border: '2px solid',
                    borderColor: activeImage === i ? 'primary.main' : 'transparent',
                    borderRadius: 2,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    bgcolor: 'transparent',
                    width: { xs: 72, md: 84 },
                    height: { xs: 72, md: 84 },
                  }}
                >
                  <Box component="img" src={image} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </Box>
              ))}
            </Stack>
            <Box
              component="img"
              src={product.images[activeImage]}
              alt={title}
              sx={{ width: '100%', flexGrow: 1, maxWidth: 560, aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 3 }}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={5}>
          <Typography variant="overline" color="secondary.main" fontWeight={700}>
            {product.brand}
          </Typography>
          <Typography variant="h4" sx={{ mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
            {title}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <RatingStars value={product.rating} count={product.reviewsCount} size="medium" />
          </Box>
          <PriceTag price={product.price} oldPrice={product.oldPrice} currency={product.currency} size="large" />

          <Divider sx={{ my: 3 }} />

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {description}
          </Typography>

          {product.colors && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" fontWeight={700} gutterBottom>{t('product.color')}</Typography>
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

          <Typography variant="subtitle2" fontWeight={700} gutterBottom>{t('product.quantity')}</Typography>
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
            <Typography variant="caption" color="text.secondary">{t('product.inStock', { count: product.stock })}</Typography>
          </Stack>

          <Stack spacing={2} sx={{ mb: 3 }}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                color={justAdded ? 'success' : 'primary'}
                startIcon={justAdded ? <CheckIcon /> : undefined}
                onClick={handleAddToCart}
                disabled={justAdded}
                sx={{ '&.Mui-disabled': { bgcolor: 'success.main', color: 'success.contrastText' } }}
              >
                {justAdded ? t('product.added') : t('product.addToCart')}
              </Button>
              <IconButton
                onClick={handleToggleWishlist}
                sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '14px', flexShrink: 0 }}
                aria-label="Toggle wishlist"
              >
                {wished ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
              </IconButton>
            </Stack>
            <Button variant="outlined" size="large" fullWidth onClick={handleBuyNow}>
              {t('product.buyNow')}
            </Button>
          </Stack>

          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <LocalShippingOutlinedIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">{t('product.freeDelivery')}</Typography>
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <ReplayOutlinedIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">{t('product.easyReturns')}</Typography>
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <VerifiedUserOutlinedIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">{t('product.securePayment')}</Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Box sx={{ mt: 8 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: '1px solid', borderColor: 'divider', mb: 3 }}>
          <Tab label={t('product.highlights')} />
          <Tab label={t('product.description')} />
          <Tab label={`${t('product.reviews')} (${product.reviewsCount})`} />
        </Tabs>
        {tab === 0 && (
          <Stack spacing={1} sx={{ maxWidth: 600 }}>
            {highlights.map((h) => (
              <Typography key={h} variant="body2" color="text.secondary">• {h}</Typography>
            ))}
          </Stack>
        )}
        {tab === 1 && (
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 700 }}>
            {description} {t('product.descriptionExtra')}
          </Typography>
        )}
        {tab === 2 && (
          <Stack spacing={1}>
            <RatingStars value={product.rating} count={product.reviewsCount} size="medium" />
            <Typography variant="body2" color="text.secondary">
              {t('product.reviewsNote')}
            </Typography>
          </Stack>
        )}
      </Box>

      {related.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" gutterBottom>{t('product.youMayAlsoLike')}</Typography>
          <ProductGrid products={related} />
        </Box>
      )}
    </Container>
  )
}
