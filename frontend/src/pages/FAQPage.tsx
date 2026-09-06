import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useLanguage } from '../context/LanguageContext'

export function FAQPage() {
  const { t } = useLanguage()
  const items = [1, 2, 3, 4, 5, 6, 7]

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="h4" sx={{ mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
        {t('faq.title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('faq.subtitle')}
      </Typography>

      {items.map((n) => (
        <Accordion key={n} variant="outlined" sx={{ mb: 1.5, '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight={600}>
              {t(`faq.q${n}`)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {t(`faq.a${n}`)}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  )
}
