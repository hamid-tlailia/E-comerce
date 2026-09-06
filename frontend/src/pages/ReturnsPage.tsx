import { Avatar, Container, Divider, Paper, Stack, Typography } from '@mui/material'
import { useLanguage } from '../context/LanguageContext'

export function ReturnsPage() {
  const { t } = useLanguage()
  const steps = [t('returns.step1'), t('returns.step2'), t('returns.step3'), t('returns.step4')]

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="h4" sx={{ mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
        {t('returns.title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('returns.subtitle')}
      </Typography>

      <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 4 }, mb: 3 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
          {t('returns.policyTitle')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('returns.policyDesc')}
        </Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 4 }, mb: 3 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2.5 }}>
          {t('returns.stepsTitle')}
        </Typography>
        <Stack spacing={2.5}>
          {steps.map((step, i) => (
            <Stack key={step} direction="row" spacing={2} alignItems="flex-start">
              <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.875rem', flexShrink: 0 }}>
                {i + 1}
              </Avatar>
              <Typography variant="body2" color="text.secondary" sx={{ pt: 0.5 }}>
                {step}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 4 } }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
          {t('returns.refundsTitle')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
          {t('returns.refundsDesc')}
        </Typography>
        <Divider sx={{ mb: 2.5 }} />
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
          {t('returns.exceptionsTitle')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('returns.exceptionsDesc')}
        </Typography>
      </Paper>
    </Container>
  )
}
