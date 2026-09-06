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

const SHIPPING_THRESHOLD = 50
const SHIPPING_COST = 6.99

export function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart()
  const navigate = useNavigate()
  const [promo, setPromo] = useState('')
  const [promoMessage, setPromoMessage] = useState<string | null>(null)

  const shipping = items.length === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  const applyPromo = () => {
    if (!promo) return
    setPromoMessage('Promo codes will be validated once the store is connected to a backend.')
  }

  if (items.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <ShoppingBagOutlinedIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
        <Typography variant="h5" gutterBottom>Your cart is empty</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Looks like you haven't added anything yet. Start exploring our catalog.
        </Typography>
        <Button component={RouterLink} to="/products" variant="contained" size="large">
          Continue Shopping
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Typography variant="h4" sx={{ mb: 4, fontSize: { xs: '1.5rem', md: '2rem' } }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Stack spacing={2}>
            {items.map((item) => {
              const product = products.find((p) => p.id === item.productId)
              if (!product) return null
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
                      alt={product.title}
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
                      {product.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {product.brand}
                    </Typography>
                    {item.color && (
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
                        <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: item.color, border: '1px solid', borderColor: 'divider' }} />
                        <Typography variant="caption" color="text.secondary">Color</Typography>
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
                  <IconButton onClick={() => removeItem(item.productId, item.color)} aria-label="Remove item" color="error">
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Paper>
              )
            })}
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 3, position: { md: 'sticky' }, top: { md: 96 } }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>Order Summary</Typography>
            <Stack spacing={1.5} sx={{ my: 2 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                <Typography variant="body2">{formatPrice(subtotal)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Shipping</Typography>
                <Typography variant="body2">{shipping === 0 ? 'Free' : formatPrice(shipping)}</Typography>
              </Stack>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight={700}>Total</Typography>
              <Typography variant="subtitle1" fontWeight={700}>{formatPrice(total)}</Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mb: promoMessage ? 1 : 3 }}>
              <TextField size="small" placeholder="Promo code" fullWidth value={promo} onChange={(e) => setPromo(e.target.value)} />
              <Button variant="outlined" onClick={applyPromo} sx={{ flexShrink: 0 }}>Apply</Button>
            </Stack>
            {promoMessage && (
              <Typography variant="caption" color="text.secondary" sx={{ mb: 3, display: 'block' }}>
                {promoMessage}
              </Typography>
            )}

            <Button variant="contained" size="large" fullWidth onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </Button>
            <Button component={RouterLink} to="/products" fullWidth sx={{ mt: 1.5 }}>
              Continue Shopping
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
