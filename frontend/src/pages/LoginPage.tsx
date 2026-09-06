import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'
import { Link as RouterLink } from 'react-router-dom'

export function LoginPage() {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
      <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 } }}>
        <Typography variant="h4" sx={{ mb: 0.5, fontSize: { xs: '1.5rem', md: '2rem' } }}>Welcome back</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Sign in to track your orders and manage your account.
        </Typography>

        <Stack spacing={2} component="form" onSubmit={(e) => e.preventDefault()}>
          <TextField label="Email address" type="email" fullWidth required />
          <TextField label="Password" type="password" fullWidth required />
          <Stack direction="row" justifyContent="flex-end">
            <Link href="#" variant="body2" underline="hover">Forgot password?</Link>
          </Stack>
          <Button type="submit" variant="contained" size="large" fullWidth>
            Sign In
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }}>
          <Typography variant="caption" color="text.secondary">or continue with</Typography>
        </Divider>

        <Stack direction="row" spacing={2} justifyContent="center">
          <IconButton sx={{ border: '1px solid', borderColor: 'divider' }} aria-label="Continue with Google">
            <GoogleIcon />
          </IconButton>
          <IconButton sx={{ border: '1px solid', borderColor: 'divider' }} aria-label="Continue with Facebook">
            <FacebookIcon />
          </IconButton>
        </Stack>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register" underline="hover" fontWeight={600}>
              Create one
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}
