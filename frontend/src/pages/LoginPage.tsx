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
import { useLanguage } from '../context/LanguageContext'

export function LoginPage() {
  const { t } = useLanguage()

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
      <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 } }}>
        <Typography variant="h4" sx={{ mb: 0.5, fontSize: { xs: '1.5rem', md: '2rem' } }}>{t('auth.loginTitle')}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {t('auth.loginSubtitle')}
        </Typography>

        <Stack spacing={2} component="form" onSubmit={(e) => e.preventDefault()}>
          <TextField label={t('auth.email')} type="email" fullWidth required />
          <TextField label={t('auth.password')} type="password" fullWidth required />
          <Stack direction="row" justifyContent="flex-end">
            <Link href="#" variant="body2" underline="hover">{t('auth.forgotPassword')}</Link>
          </Stack>
          <Button type="submit" variant="contained" size="large" fullWidth>
            {t('auth.signIn')}
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }}>
          <Typography variant="caption" color="text.secondary">{t('auth.orContinueWith')}</Typography>
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
            {t('auth.noAccount')}{' '}
            <Link component={RouterLink} to="/register" underline="hover" fontWeight={600}>
              {t('auth.createOne')}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}
