import { Button, Container, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export function NotFoundPage() {
  const { t } = useLanguage()

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 10, md: 16 }, textAlign: 'center' }}>
      <Typography variant="h1" sx={{ fontSize: { xs: '4rem', md: '6rem' }, color: 'primary.main' }}>404</Typography>
      <Typography variant="h5" gutterBottom>{t('notFound.title')}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        {t('notFound.desc')}
      </Typography>
      <Button component={RouterLink} to="/" variant="contained" size="large">
        {t('notFound.backHome')}
      </Button>
    </Container>
  )
}
