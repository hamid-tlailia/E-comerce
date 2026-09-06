import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Link as RouterLink } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export function OrderSuccessPage() {
  const { t } = useLanguage()
  const orderNumber = `AS-${Math.floor(100000 + Math.random() * 900000)}`

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 8, md: 12 } }}>
      <Paper variant="outlined" sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 72, color: 'success.main', mb: 2 }} />
        <Typography variant="h4" sx={{ mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
          {t('orderSuccess.thankYou')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {t('orderSuccess.orderPlaced', { order: orderNumber })}
        </Typography>
        <Box
          sx={{
            bgcolor: 'action.hover',
            borderRadius: 2,
            p: 2,
            mb: 4,
            textAlign: 'start',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {t('orderSuccess.previewNote')}
          </Typography>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button component={RouterLink} to="/products" variant="contained" size="large">
            {t('orderSuccess.continueShopping')}
          </Button>
          <Button component={RouterLink} to="/" size="large">
            {t('orderSuccess.backHome')}
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
}
