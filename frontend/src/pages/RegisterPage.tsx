import { Box, Button, Container, Link, Paper, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export function RegisterPage() {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
      <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 } }}>
        <Typography variant="h4" sx={{ mb: 0.5, fontSize: { xs: '1.5rem', md: '2rem' } }}>Create an account</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Join AuroraShop for a faster checkout and order tracking.
        </Typography>

        <Stack spacing={2} component="form" onSubmit={(e) => e.preventDefault()}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField label="First name" fullWidth required />
            <TextField label="Last name" fullWidth required />
          </Stack>
          <TextField label="Email address" type="email" fullWidth required />
          <TextField label="Password" type="password" fullWidth required />
          <TextField label="Confirm password" type="password" fullWidth required />
          <Button type="submit" variant="contained" size="large" fullWidth>
            Create Account
          </Button>
        </Stack>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" underline="hover" fontWeight={600}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}
