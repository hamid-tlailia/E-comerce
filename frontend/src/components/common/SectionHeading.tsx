import { Box, Button, Stack, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Link as RouterLink } from 'react-router-dom'

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  actionLabel,
  actionTo,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  actionLabel?: string
  actionTo?: string
}) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
      spacing={2}
      sx={{ mb: { xs: 3, md: 4 } }}
    >
      <Box>
        {eyebrow && (
          <Typography variant="overline" color="secondary.main" fontWeight={700} letterSpacing={1.5}>
            {eyebrow}
          </Typography>
        )}
        <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5, maxWidth: 560 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {actionLabel && actionTo && (
        <Button
          component={RouterLink}
          to={actionTo}
          endIcon={<ArrowForwardIcon />}
          sx={{ flexShrink: 0 }}
        >
          {actionLabel}
        </Button>
      )}
    </Stack>
  )
}
