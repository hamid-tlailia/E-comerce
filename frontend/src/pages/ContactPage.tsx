import { useState } from 'react'
import { Box, Button, Container, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import { useLanguage } from '../context/LanguageContext'
import { useSnackbar } from '../context/SnackbarContext'

export function ContactPage() {
  const { t } = useLanguage()
  const { notify } = useSnackbar()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    notify(t('snackbar.messageSent'))
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const infoRows = [
    { icon: <EmailOutlinedIcon />, label: t('contact.emailLabel'), value: 'tlhamid18@gmail.com' },
    { icon: <PhoneOutlinedIcon />, label: t('contact.phoneLabel'), value: '+974 7100 9494' },
    { icon: <PlaceOutlinedIcon />, label: t('contact.addressLabel'), value: t('contact.addressValue') },
    { icon: <AccessTimeOutlinedIcon />, label: t('contact.hoursLabel'), value: t('contact.hoursValue') },
  ]

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="h4" sx={{ mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
        {t('contact.title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 560 }}>
        {t('contact.subtitle')}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 4 } }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2.5 }}>
              {t('contact.formTitle')}
            </Typography>
            <Stack spacing={2} component="form" onSubmit={handleSubmit}>
              <TextField
                label={t('contact.name')}
                fullWidth
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
              <TextField
                label={t('contact.email')}
                type="email"
                fullWidth
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
              <TextField
                label={t('contact.subject')}
                fullWidth
                required
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
              />
              <TextField
                label={t('contact.message')}
                fullWidth
                required
                multiline
                minRows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              />
              <Button type="submit" variant="contained" size="large">
                {t('contact.send')}
              </Button>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 4 } }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2.5 }}>
              {t('contact.infoTitle')}
            </Typography>
            <Stack spacing={2.5}>
              {infoRows.map((row) => (
                <Stack key={row.label} direction="row" spacing={2} alignItems="flex-start">
                  <Box sx={{ color: 'primary.main', display: 'flex', mt: 0.25 }}>{row.icon}</Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">{row.label}</Typography>
                    <Typography variant="body1" fontWeight={600}>{row.value}</Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
