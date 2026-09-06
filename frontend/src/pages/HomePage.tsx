import { Box, Button, Chip, Container, Grid, Stack, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import DevicesOtherIcon from '@mui/icons-material/DevicesOther'
import CheckroomIcon from '@mui/icons-material/Checkroom'
import ChairIcon from '@mui/icons-material/Chair'
import SpaIcon from '@mui/icons-material/Spa'
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball'
import WatchIcon from '@mui/icons-material/Watch'
import CategoryIcon from '@mui/icons-material/Category'
import { Link as RouterLink } from 'react-router-dom'
import { categories, products } from '../data/products'
import { ProductGrid } from '../components/product/ProductGrid'
import { SectionHeading } from '../components/common/SectionHeading'
import { useLanguage } from '../context/LanguageContext'

const categoryIcons: Record<string, typeof CategoryIcon> = {
  DevicesOther: DevicesOtherIcon,
  Checkroom: CheckroomIcon,
  Chair: ChairIcon,
  Spa: SpaIcon,
  SportsBasketball: SportsBasketballIcon,
  Watch: WatchIcon,
}

const featured = products.filter((p) => p.tags.includes('bestseller')).slice(0, 8)
const newArrivals = products.filter((p) => p.tags.includes('new')).slice(0, 4)
const deals = products.filter((p) => p.tags.includes('sale')).slice(0, 4)

export function HomePage() {
  const { lang, t } = useLanguage()

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&h=1200&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          color: '#fff',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15,15,25,0.75) 0%, rgba(15,15,25,0.55) 55%, rgba(15,15,25,0.8) 100%)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Box sx={{ py: { xs: 10, md: 16 }, maxWidth: 560 }}>
            <Chip label={t('home.newSeason')} color="secondary" size="small" sx={{ mb: 2 }} />
            <Typography variant="h1" sx={{ fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem' }, mb: 2, color: '#fff' }}>
              {t('home.heroTitle')}
            </Typography>
            <Typography variant="h6" fontWeight={400} sx={{ mb: 4, color: 'rgba(255,255,255,0.85)' }}>
              {t('home.heroSubtitle')}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button component={RouterLink} to="/products" variant="contained" color="secondary" size="large" endIcon={<ArrowForwardIcon />}>
                {t('home.shopNow')}
              </Button>
              <Button
                component={RouterLink}
                to="/products?filter=sale"
                variant="outlined"
                size="large"
                sx={{
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.6)',
                  '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
                }}
              >
                {t('home.viewDeals')}
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <SectionHeading eyebrow={t('home.browse')} title={t('home.shopByCategory')} />
        <Grid container spacing={2}>
          {categories.map((cat) => {
            const IconComp = categoryIcons[cat.icon] ?? CategoryIcon
            return (
              <Grid key={cat.id} item xs={6} sm={4} md={2}>
                <Box
                  component={RouterLink}
                  to={`/products?category=${cat.id}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    p: 2.5,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    textDecoration: 'none',
                    color: 'text.primary',
                    transition: 'all 0.2s ease',
                    '&:hover': { borderColor: 'primary.main', transform: 'translateY(-3px)', boxShadow: 3 },
                  }}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                    }}
                  >
                    <IconComp />
                  </Box>
                  <Typography variant="body2" fontWeight={600} textAlign="center">
                    {lang === 'ar' ? cat.nameAr : cat.name}
                  </Typography>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ pb: { xs: 6, md: 8 } }}>
        <SectionHeading
          eyebrow={t('home.handpicked')}
          title={t('home.bestSellers')}
          subtitle={t('home.bestSellersSubtitle')}
          actionLabel={t('home.viewAll')}
          actionTo="/products?filter=bestseller"
        />
        <ProductGrid products={featured} />
      </Container>

      <Box sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={5}>
              <Chip label={t('home.limitedTime')} color="error" size="small" sx={{ mb: 2 }} />
              <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, mb: 2 }}>
                {t('home.saleTitle')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {t('home.saleSubtitle')}
              </Typography>
              <Button component={RouterLink} to="/products?filter=sale" variant="contained" color="secondary" size="large">
                {t('home.shopSale')}
              </Button>
            </Grid>
            <Grid item xs={12} md={7}>
              <ProductGrid products={deals} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <SectionHeading
          eyebrow={t('home.justIn')}
          title={t('home.newArrivals')}
          subtitle={t('home.newArrivalsSubtitle')}
          actionLabel={t('home.viewAll')}
          actionTo="/products?filter=new"
        />
        <ProductGrid products={newArrivals} />
      </Container>
    </Box>
  )
}
