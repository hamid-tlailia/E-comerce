import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Step,
  StepLabel,
  Stepper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined'
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined'
import { Navigate, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../components/common/PriceTag'

const steps = ['Shipping', 'Payment', 'Review']

const countries = ['United States', 'France', 'Algeria', 'Morocco', 'Tunisia', 'United Kingdom', 'Germany', 'Other']

const localCardByCountry: Record<string, string> = {
  Algeria: 'Edahabia / CIB',
  Morocco: 'CMI Card',
  Tunisia: 'e-DINAR',
}

export function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [country, setCountry] = useState('United States')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'local' | 'cod' | 'paypal'>('card')

  const shipping = items.length === 0 || subtotal >= 50 ? 0 : 6.99
  const total = subtotal + shipping
  const localOption = localCardByCountry[country]

  if (items.length === 0) return <Navigate to="/cart" replace />

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      clearCart()
      navigate('/order-success')
      return
    }
    setActiveStep((s) => s + 1)
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Typography variant="h4" sx={{ mb: 4, fontSize: { xs: '1.5rem', md: '2rem' } }}>Checkout</Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 5 }} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 4 } }}>
            {activeStep === 0 && (
              <Stack spacing={2.5}>
                <Typography variant="h6" fontWeight={700}>Shipping Information</Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField label="First name" fullWidth required />
                  <TextField label="Last name" fullWidth required />
                </Stack>
                <TextField label="Email address" type="email" fullWidth required />
                <TextField label="Phone number" fullWidth required />
                <TextField label="Street address" fullWidth required />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField label="City" fullWidth required />
                  <TextField label="Postal code" fullWidth required />
                </Stack>
                <TextField select label="Country" value={country} onChange={(e) => setCountry(e.target.value)} fullWidth>
                  {countries.map((c) => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </TextField>
              </Stack>
            )}

            {activeStep === 1 && (
              <Stack spacing={2.5}>
                <Typography variant="h6" fontWeight={700}>Payment Method</Typography>
                <Typography variant="body2" color="text.secondary">
                  Choose how you'd like to pay. International cards are accepted everywhere; a local option is
                  shown automatically based on your country.
                </Typography>
                <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as typeof paymentMethod)}>
                  <PaymentOption
                    value="card"
                    selected={paymentMethod === 'card'}
                    icon={<CreditCardIcon />}
                    title="Credit / Debit Card"
                    subtitle="Visa, Mastercard, American Express"
                  />
                  {localOption && (
                    <PaymentOption
                      value="local"
                      selected={paymentMethod === 'local'}
                      icon={<AccountBalanceOutlinedIcon />}
                      title={localOption}
                      subtitle={`Local payment card for ${country}`}
                    />
                  )}
                  <PaymentOption
                    value="paypal"
                    selected={paymentMethod === 'paypal'}
                    icon={<AccountBalanceOutlinedIcon />}
                    title="PayPal"
                    subtitle="Pay securely with your PayPal account"
                  />
                  <PaymentOption
                    value="cod"
                    selected={paymentMethod === 'cod'}
                    icon={<LocalAtmOutlinedIcon />}
                    title="Cash on Delivery"
                    subtitle="Pay when your order arrives"
                  />
                </RadioGroup>

                {(paymentMethod === 'card' || paymentMethod === 'local') && (
                  <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField label="Card number" placeholder="1234 5678 9012 3456" fullWidth required />
                    <Stack direction="row" spacing={2}>
                      <TextField label="Expiry (MM/YY)" placeholder="MM/YY" fullWidth required />
                      <TextField label="CVC" placeholder="123" fullWidth required />
                    </Stack>
                    <TextField label="Name on card" fullWidth required />
                  </Stack>
                )}

                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                  <LockOutlinedIcon fontSize="small" color="action" />
                  <Typography variant="caption" color="text.secondary">
                    Payments are encrypted. This is a design preview — no real transaction will be processed.
                  </Typography>
                </Stack>
              </Stack>
            )}

            {activeStep === 2 && (
              <Stack spacing={2.5}>
                <Typography variant="h6" fontWeight={700}>Review Your Order</Typography>
                <Stack spacing={1.5}>
                  {items.map((item) => {
                    const product = products.find((p) => p.id === item.productId)
                    if (!product) return null
                    return (
                      <Stack key={`${item.productId}-${item.color ?? ''}`} direction="row" spacing={2} alignItems="center">
                        <Box component="img" src={product.images[0]} alt={product.title} sx={{ width: 56, height: 56, borderRadius: 1.5, objectFit: 'cover' }} />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body2" fontWeight={600}>{product.title}</Typography>
                          <Typography variant="caption" color="text.secondary">Qty {item.quantity}</Typography>
                        </Box>
                        <Typography variant="body2" fontWeight={600}>{formatPrice(product.price * item.quantity)}</Typography>
                      </Stack>
                    )
                  })}
                </Stack>
                <Divider />
                <Typography variant="body2" color="text.secondary">
                  Shipping to <strong>{country}</strong> · Paying via{' '}
                  <strong>
                    {paymentMethod === 'card' && 'Credit / Debit Card'}
                    {paymentMethod === 'local' && localOption}
                    {paymentMethod === 'paypal' && 'PayPal'}
                    {paymentMethod === 'cod' && 'Cash on Delivery'}
                  </strong>
                </Typography>
              </Stack>
            )}

            <Stack direction="row" justifyContent="space-between" sx={{ mt: 4 }}>
              <Button disabled={activeStep === 0} onClick={() => setActiveStep((s) => s - 1)}>
                Back
              </Button>
              <Button variant="contained" size="large" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Place Order' : 'Continue'}
              </Button>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 3 }}>
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
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" fontWeight={700}>Total</Typography>
              <Typography variant="subtitle1" fontWeight={700}>{formatPrice(total)}</Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

function PaymentOption({
  value,
  selected,
  icon,
  title,
  subtitle,
}: {
  value: string
  selected: boolean
  icon: React.ReactNode
  title: string
  subtitle: string
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        mb: 1.5,
        borderColor: selected ? 'primary.main' : 'divider',
        borderWidth: selected ? 2 : 1,
      }}
    >
      <FormControlLabel
        value={value}
        control={<Radio />}
        sx={{ width: '100%', m: 0 }}
        label={
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ ml: 1 }}>
            <Box sx={{ color: 'primary.main', display: 'flex' }}>{icon}</Box>
            <Box>
              <Typography variant="body2" fontWeight={600}>{title}</Typography>
              <Typography variant="caption" color="text.secondary">{subtitle}</Typography>
            </Box>
          </Stack>
        }
      />
    </Paper>
  )
}
