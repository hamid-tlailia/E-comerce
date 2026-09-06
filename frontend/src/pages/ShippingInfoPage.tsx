import {
  Container,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined'
import { useLanguage } from '../context/LanguageContext'

export function ShippingInfoPage() {
  const { t } = useLanguage()

  const rows = [
    { region: t('shippingInfo.regionDomestic'), estimate: t('shippingInfo.estimateDomestic') },
    { region: t('shippingInfo.regionGulf'), estimate: t('shippingInfo.estimateGulf') },
    { region: t('shippingInfo.regionNorthAfrica'), estimate: t('shippingInfo.estimateNorthAfrica') },
    { region: t('shippingInfo.regionInternational'), estimate: t('shippingInfo.estimateInternational') },
  ]

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="h4" sx={{ mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
        {t('shippingInfo.title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('shippingInfo.subtitle')}
      </Typography>

      <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 4 }, mb: 3 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
          {t('shippingInfo.processingTitle')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('shippingInfo.processingDesc')}
        </Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 4 }, mb: 3 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          {t('shippingInfo.ratesTitle')}
        </Typography>
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>{t('shippingInfo.region')}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{t('shippingInfo.estimate')}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{t('shippingInfo.cost')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.region}>
                  <TableCell>{row.region}</TableCell>
                  <TableCell>{row.estimate}</TableCell>
                  <TableCell>{t('shippingInfo.freeOver')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 4 } }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <TrackChangesOutlinedIcon color="primary" />
          <div>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
              {t('shippingInfo.trackingTitle')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('shippingInfo.trackingDesc')}
            </Typography>
          </div>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Stack direction="row" spacing={2} alignItems="center">
          <LocalShippingOutlinedIcon color="action" fontSize="small" />
          <Typography variant="caption" color="text.secondary">
            {t('footer.freeShippingDesc')}
          </Typography>
        </Stack>
      </Paper>
    </Container>
  )
}
