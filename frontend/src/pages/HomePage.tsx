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
  return (
    <Box>
      <Box
        sx={{
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, #EEF2FF 0%, #FFF7ED 100%)'
              : 'linear-gradient(135deg, #1E1B3A 0%, #2A1B12 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center" sx={{ py: { xs: 6, md: 10 } }}>
            <Grid item xs={12} md={6}>
              <Chip label="New Season Collection" color="secondary" size="small" sx={{ mb: 2 }} />
              <Typography variant="h1" sx={{ fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem' }, mb: 2 }}>
                Shop the look, live the moment.
              </Typography>
              <Typography variant="h6" color="text.secondary" fontWeight={400} sx={{ mb: 4, maxWidth: 480 }}>
                Discover curated electronics, fashion, and home essentials — with fast delivery and secure
                payment worldwide, cards accepted locally and internationally.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button component={RouterLink} to="/products" variant="contained" size="large" endIcon={<ArrowForwardIcon />}>
                  Shop Now
                </Button>
                <Button component={RouterLink} to="/products?filter=sale" variant="outlined" size="large">
                  View Deals
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://picsum.photos/seed/hero-main/900/700"
                alt="Featured products"
                sx={{ width: '100%', borderRadius: 4, boxShadow: 8, display: 'block' }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <SectionHeading eyebrow="Browse" title="Shop by Category" />
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
                    {cat.name}
                  </Typography>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ pb: { xs: 6, md: 8 } }}>
        <SectionHeading
          eyebrow="Handpicked"
          title="Best Sellers"
          subtitle="The products our customers keep coming back for."
          actionLabel="View all"
          actionTo="/products?filter=bestseller"
        />
        <ProductGrid products={featured} />
      </Container>

      <Box sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={5}>
              <Chip label="Limited time" color="error" size="small" sx={{ mb: 2 }} />
              <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, mb: 2 }}>
                End of Season Sale — up to 30% off
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Refresh your essentials before prices go back up. Stock is limited, so don't wait too long.
              </Typography>
              <Button component={RouterLink} to="/products?filter=sale" variant="contained" color="secondary" size="large">
                Shop the Sale
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
          eyebrow="Just In"
          title="New Arrivals"
          subtitle="Fresh drops added to the catalog every week."
          actionLabel="View all"
          actionTo="/products?filter=new"
        />
        <ProductGrid products={newArrivals} />
      </Container>
    </Box>
  )
}
