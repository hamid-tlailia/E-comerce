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
import { useLanguage } from '../context/LanguageContext'
import { useSnackbar } from '../context/SnackbarContext'

const countries = ['United States', 'France', 'Algeria', 'Morocco', 'Tunisia', 'United Kingdom', 'Germany', 'Other']

const countryLabelsAr: Record<string, string> = {
  'United States': 'الولايات المتحدة',
  France: 'فرنسا',
  Algeria: 'الجزائر',
  Morocco: 'المغرب',
  Tunisia: 'تونس',
  'United Kingdom': 'المملكة المتحدة',
  Germany: 'ألمانيا',
  Other: 'أخرى',
}

const localCardByCountry: Record<string, string> = {
  Algeria: 'Edahabia / CIB',
  Morocco: 'CMI Card',
  Tunisia: 'e-DINAR',
}

export function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const { lang, t } = useLanguage()
  const { notify } = useSnackbar()
  const [activeStep, setActiveStep] = useState(0)
  const [country, setCountry] = useState('United States')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'local' | 'cod' | 'paypal'>('card')

  const steps = [t('checkout.stepShipping'), t('checkout.stepPayment'), t('checkout.stepReview')]
  const shipping = items.length === 0 || subtotal >= 50 ? 0 : 6.99
  const total = subtotal + shipping
  const localOption = localCardByCountry[country]
  const countryLabel = lang === 'ar' ? countryLabelsAr[country] ?? country : country

  if (items.length === 0) return <Navigate to="/cart" replace />

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      clearCart()
      notify(t('snackbar.orderPlaced'))
      navigate('/order-success')
      return
    }
    setActiveStep((s) => s + 1)
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Typography variant="h4" sx={{ mb: 4, fontSize: { xs: '1.5rem', md: '2rem' } }}>{t('checkout.title')}</Typography>

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
                <Typography variant="h6" fontWeight={700}>{t('checkout.shippingInformation')}</Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField label={t('checkout.firstName')} fullWidth required />
                  <TextField label={t('checkout.lastName')} fullWidth required />
                </Stack>
                <TextField label={t('checkout.email')} type="email" fullWidth required />
                <TextField label={t('checkout.phone')} fullWidth required />
                <TextField label={t('checkout.address')} fullWidth required />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField label={t('checkout.city')} fullWidth required />
                  <TextField label={t('checkout.postalCode')} fullWidth required />
                </Stack>
                <TextField select label={t('checkout.country')} value={country} onChange={(e) => setCountry(e.target.value)} fullWidth>
                  {countries.map((c) => (
                    <MenuItem key={c} value={c}>{lang === 'ar' ? countryLabelsAr[c] ?? c : c}</MenuItem>
                  ))}
                </TextField>
              </Stack>
            )}

            {activeStep === 1 && (
              <Stack spacing={2.5}>
                <Typography variant="h6" fontWeight={700}>{t('checkout.paymentMethod')}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('checkout.paymentDesc')}
                </Typography>
                <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as typeof paymentMethod)}>
                  <PaymentOption
                    value="card"
                    selected={paymentMethod === 'card'}
                    icon={<CreditCardIcon />}
                    title={t('checkout.creditCard')}
                    subtitle={t('checkout.creditCardDesc')}
                  />
                  {localOption && (
                    <PaymentOption
                      value="local"
                      selected={paymentMethod === 'local'}
                      icon={<AccountBalanceOutlinedIcon />}
                      title={localOption}
                      subtitle={t('checkout.localFor', { country: countryLabel })}
                    />
                  )}
                  <PaymentOption
                    value="paypal"
                    selected={paymentMethod === 'paypal'}
                    icon={<AccountBalanceOutlinedIcon />}
                    title={t('checkout.paypal')}
                    subtitle={t('checkout.paypalDesc')}
                  />
                  <PaymentOption
                    value="cod"
                    selected={paymentMethod === 'cod'}
                    icon={<LocalAtmOutlinedIcon />}
                    title={t('checkout.cod')}
                    subtitle={t('checkout.codDesc')}
                  />
                </RadioGroup>

                {(paymentMethod === 'card' || paymentMethod === 'local') && (
                  <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField label={t('checkout.cardNumber')} placeholder="1234 5678 9012 3456" fullWidth required />
                    <Stack direction="row" spacing={2}>
                      <TextField label={t('checkout.expiry')} placeholder="MM/YY" fullWidth required />
                      <TextField label={t('checkout.cvc')} placeholder="123" fullWidth required />
                    </Stack>
                    <TextField label={t('checkout.nameOnCard')} fullWidth required />
                  </Stack>
                )}

                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                  <LockOutlinedIcon fontSize="small" color="action" />
                  <Typography variant="caption" color="text.secondary">
                    {t('checkout.securityNote')}
                  </Typography>
                </Stack>
              </Stack>
            )}

            {activeStep === 2 && (
              <Stack spacing={2.5}>
                <Typography variant="h6" fontWeight={700}>{t('checkout.reviewOrder')}</Typography>
                <Stack spacing={1.5}>
                  {items.map((item) => {
                    const product = products.find((p) => p.id === item.productId)
                    if (!product) return null
                    const title = lang === 'ar' ? product.titleAr : product.title
                    return (
                      <Stack key={`${item.productId}-${item.color ?? ''}`} direction="row" spacing={2} alignItems="center">
                        <Box component="img" src={product.images[0]} alt={title} sx={{ width: 56, height: 56, borderRadius: 1.5, objectFit: 'cover' }} />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body2" fontWeight={600}>{title}</Typography>
                          <Typography variant="caption" color="text.secondary">{t('checkout.qty', { count: item.quantity })}</Typography>
                        </Box>
                        <Typography variant="body2" fontWeight={600}>{formatPrice(product.price * item.quantity)}</Typography>
                      </Stack>
                    )
                  })}
                </Stack>
                <Divider />
                <Typography variant="body2" color="text.secondary">
                  {t('checkout.shippingTo')} <strong>{countryLabel}</strong> · {t('checkout.payingVia')}{' '}
                  <strong>
                    {paymentMethod === 'card' && t('checkout.creditCard')}
                    {paymentMethod === 'local' && localOption}
                    {paymentMethod === 'paypal' && t('checkout.paypal')}
                    {paymentMethod === 'cod' && t('checkout.cod')}
                  </strong>
                </Typography>
              </Stack>
            )}

            <Stack direction="row" justifyContent="space-between" sx={{ mt: 4 }}>
              <Button disabled={activeStep === 0} onClick={() => setActiveStep((s) => s - 1)}>
                {t('checkout.back')}
              </Button>
              <Button variant="contained" size="large" onClick={handleNext}>
                {activeStep === steps.length - 1 ? t('checkout.placeOrder') : t('checkout.continue')}
              </Button>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>{t('checkout.orderSummary')}</Typography>
            <Stack spacing={1.5} sx={{ my: 2 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">{t('checkout.subtotal')}</Typography>
                <Typography variant="body2">{formatPrice(subtotal)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">{t('checkout.shipping')}</Typography>
                <Typography variant="body2">{shipping === 0 ? t('checkout.free') : formatPrice(shipping)}</Typography>
              </Stack>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" fontWeight={700}>{t('checkout.total')}</Typography>
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
