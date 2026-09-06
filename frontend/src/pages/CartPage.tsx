import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../components/common/PriceTag'
import { useLanguage } from '../context/LanguageContext'
import { useSnackbar } from '../context/SnackbarContext'

const SHIPPING_THRESHOLD = 50
const SHIPPING_COST = 6.99

export function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart()
  const navigate = useNavigate()
  const { lang, t } = useLanguage()
  const { notify } = useSnackbar()
  const [promo, setPromo] = useState('')

  const shipping = items.length === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  const applyPromo = () => {
    if (!promo) return
    notify(t('snackbar.promoApplied'), 'info')
  }

  const handleRemove = (productId: string, color: string | undefined, name: string) => {
    removeItem(productId, color)
    notify(t('snackbar.removedFromCart', { name }), 'info')
  }

  if (items.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <ShoppingBagOutlinedIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
        <Typography variant="h5" gutterBottom>{t('cart.empty')}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t('cart.emptyDesc')}
        </Typography>
        <Button component={RouterLink} to="/products" variant="contained" size="large">
          {t('cart.continueShopping')}
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Typography variant="h4" sx={{ mb: 4, fontSize: { xs: '1.5rem', md: '2rem' } }}>
        {t('cart.title')}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Stack spacing={2}>
            {items.map((item) => {
              const product = products.find((p) => p.id === item.productId)
              if (!product) return null
              const title = lang === 'ar' ? product.titleAr : product.title
              return (
                <Paper
                  key={`${item.productId}-${item.color ?? ''}`}
                  variant="outlined"
                  sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}
                >
                  <Box
                    component={RouterLink}
                    to={`/products/${product.slug}`}
                    sx={{ flexShrink: 0 }}
                  >
                    <Box
                      component="img"
                      src={product.images[0]}
                      alt={title}
                      sx={{ width: 88, height: 88, objectFit: 'cover', borderRadius: 2, display: 'block' }}
                    />
                  </Box>
                  <Box sx={{ flexGrow: 1, minWidth: 160 }}>
                    <Typography
                      component={RouterLink}
                      to={`/products/${product.slug}`}
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {product.brand}
                    </Typography>
                    {item.color && (
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
                        <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: item.color, border: '1px solid', borderColor: 'divider' }} />
                        <Typography variant="caption" color="text.secondary">{t('cart.color')}</Typography>
                      </Stack>
                    )}
                  </Box>
                  <Stack direction="row" alignItems="center" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 999 }}>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1, item.color)}
                      aria-label="Decrease quantity"
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ width: 28, textAlign: 'center' }}>{item.quantity}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1, item.color)}
                      aria-label="Increase quantity"
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ width: 90, textAlign: 'right' }}>
                    {formatPrice(product.price * item.quantity, product.currency)}
                  </Typography>
                  <IconButton onClick={() => handleRemove(item.productId, item.color, title)} aria-label="Remove item" color="error">
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Paper>
              )
            })}
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 3, position: { md: 'sticky' }, top: { md: 96 } }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>{t('cart.orderSummary')}</Typography>
            <Stack spacing={1.5} sx={{ my: 2 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">{t('cart.subtotal')}</Typography>
                <Typography variant="body2">{formatPrice(subtotal)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">{t('cart.shipping')}</Typography>
                <Typography variant="body2">{shipping === 0 ? t('cart.free') : formatPrice(shipping)}</Typography>
              </Stack>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight={700}>{t('cart.total')}</Typography>
              <Typography variant="subtitle1" fontWeight={700}>{formatPrice(total)}</Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
              <TextField size="small" placeholder={t('cart.promoCode')} fullWidth value={promo} onChange={(e) => setPromo(e.target.value)} />
              <Button variant="outlined" onClick={applyPromo} sx={{ flexShrink: 0 }}>{t('cart.apply')}</Button>
            </Stack>

            <Button variant="contained" size="large" fullWidth onClick={() => navigate('/checkout')}>
              {t('cart.proceedToCheckout')}
            </Button>
            <Button component={RouterLink} to="/products" fullWidth sx={{ mt: 1.5 }}>
              {t('cart.continueShopping')}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
