import { Box, Button, Container, Link, Paper, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export function RegisterPage() {
  const { t } = useLanguage()

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
      <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 } }}>
        <Typography variant="h4" sx={{ mb: 0.5, fontSize: { xs: '1.5rem', md: '2rem' } }}>{t('auth.registerTitle')}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {t('auth.registerSubtitle')}
        </Typography>

        <Stack spacing={2} component="form" onSubmit={(e) => e.preventDefault()}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField label={t('auth.firstName')} fullWidth required />
            <TextField label={t('auth.lastName')} fullWidth required />
          </Stack>
          <TextField label={t('auth.email')} type="email" fullWidth required />
          <TextField label={t('auth.password')} type="password" fullWidth required />
          <TextField label={t('auth.confirmPassword')} type="password" fullWidth required />
          <Button type="submit" variant="contained" size="large" fullWidth>
            {t('auth.createAccount')}
          </Button>
        </Stack>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            {t('auth.alreadyHaveAccount')}{' '}
            <Link component={RouterLink} to="/login" underline="hover" fontWeight={600}>
              {t('auth.signInLink')}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}
