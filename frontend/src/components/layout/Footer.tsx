import { Box, Container, Divider, Grid, IconButton, Link, Stack, TextField, Button, Typography } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import XIcon from '@mui/icons-material/X'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'
import { Link as RouterLink } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  const perks = [
    { icon: <LocalShippingOutlinedIcon />, title: t('footer.freeShipping'), desc: t('footer.freeShippingDesc') },
    { icon: <VerifiedUserOutlinedIcon />, title: t('footer.securePayment'), desc: t('footer.securePaymentDesc') },
    { icon: <SupportAgentOutlinedIcon />, title: t('footer.support'), desc: t('footer.supportDesc') },
    { icon: <CreditCardIcon />, title: t('footer.easyReturns'), desc: t('footer.easyReturnsDesc') },
  ]

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider', mt: 8 }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 } }}>
        <Grid container spacing={3}>
          {perks.map((perk) => (
            <Grid key={perk.title} item xs={6} md={3}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box sx={{ color: 'primary.main', display: 'flex' }}>{perk.icon}</Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={700}>{perk.title}</Typography>
                  <Typography variant="caption" color="text.secondary">{perk.desc}</Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider />

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" fontWeight={800} gutterBottom>
              Aurora<Box component="span" sx={{ color: 'primary.main' }}>Shop</Box>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 280 }}>
              {t('footer.brandDesc')}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider' }} aria-label="Facebook">
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider' }} aria-label="Instagram">
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider' }} aria-label="X">
                <XIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>{t('footer.shopHeading')}</Typography>
            <Stack spacing={1}>
              <Link component={RouterLink} to="/products" underline="hover" color="text.secondary" variant="body2">{t('footer.allProducts')}</Link>
              <Link component={RouterLink} to="/products?filter=new" underline="hover" color="text.secondary" variant="body2">{t('footer.newArrivals')}</Link>
              <Link component={RouterLink} to="/products?filter=sale" underline="hover" color="text.secondary" variant="body2">{t('footer.deals')}</Link>
            </Stack>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>{t('footer.supportHeading')}</Typography>
            <Stack spacing={1}>
              <Link href="#" underline="hover" color="text.secondary" variant="body2">{t('footer.contactUs')}</Link>
              <Link href="#" underline="hover" color="text.secondary" variant="body2">{t('footer.shippingInfo')}</Link>
              <Link href="#" underline="hover" color="text.secondary" variant="body2">{t('footer.returns')}</Link>
              <Link href="#" underline="hover" color="text.secondary" variant="body2">{t('footer.faq')}</Link>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>{t('footer.newsletterHeading')}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              {t('footer.newsletterDesc')}
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField size="small" placeholder={t('footer.emailPlaceholder')} fullWidth />
              <Button variant="contained" sx={{ flexShrink: 0 }}>{t('footer.subscribe')}</Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      <Container maxWidth="lg" sx={{ py: 2.5 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} AuroraShop. {t('footer.rights')}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {t('footer.paymentMethods')}
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}
