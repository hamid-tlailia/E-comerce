import { Button, Container, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 10, md: 16 }, textAlign: 'center' }}>
      <Typography variant="h1" sx={{ fontSize: { xs: '4rem', md: '6rem' }, color: 'primary.main' }}>404</Typography>
      <Typography variant="h5" gutterBottom>Page not found</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained" size="large">
        Back to Home
      </Button>
    </Container>
  )
}
