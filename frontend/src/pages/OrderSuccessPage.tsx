import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Link as RouterLink } from 'react-router-dom'

export function OrderSuccessPage() {
  const orderNumber = `AS-${Math.floor(100000 + Math.random() * 900000)}`

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 8, md: 12 } }}>
      <Paper variant="outlined" sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 72, color: 'success.main', mb: 2 }} />
        <Typography variant="h4" sx={{ mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
          Thank you for your order!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Your order <strong>#{orderNumber}</strong> has been placed. A confirmation email will be sent to you shortly.
        </Typography>
        <Box
          sx={{
            bgcolor: 'action.hover',
            borderRadius: 2,
            p: 2,
            mb: 4,
            textAlign: 'left',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            This is a design preview: no payment was actually processed and no order was saved, since the store
            isn't connected to a backend or database yet.
          </Typography>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button component={RouterLink} to="/products" variant="contained" size="large">
            Continue Shopping
          </Button>
          <Button component={RouterLink} to="/" size="large">
            Back to Home
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
}
