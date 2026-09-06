import { useMemo, useState } from 'react'
import {
  Box,
  Breadcrumbs,
  Checkbox,
  Chip,
  Container,
  Drawer,
  IconButton,
  Link,
  MenuItem,
  Slider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune'
import CloseIcon from '@mui/icons-material/Close'
import { Link as RouterLink, useSearchParams } from 'react-router-dom'
import { categories, products } from '../data/products'
import { ProductGrid } from '../components/product/ProductGrid'
import { useLanguage } from '../context/LanguageContext'

const MAX_PRICE = 200

type SortKey = 'relevance' | 'price-asc' | 'price-desc' | 'rating'

export function ProductsPage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const { lang, t } = useLanguage()

  const activeCategory = searchParams.get('category') ?? ''
  const activeFilter = searchParams.get('filter') ?? ''
  const query = searchParams.get('q') ?? ''
  const [priceRange, setPriceRange] = useState<number[]>([0, MAX_PRICE])
  const [minRating, setMinRating] = useState(0)
  const [sort, setSort] = useState<SortKey>('relevance')

  const toggleCategory = (id: string) => {
    const next = new URLSearchParams(searchParams)
    if (activeCategory === id) next.delete('category')
    else next.set('category', id)
    setSearchParams(next)
  }

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1] && p.rating >= minRating)
    if (activeCategory) list = list.filter((p) => p.category === activeCategory)
    if (activeFilter) list = list.filter((p) => p.tags.includes(activeFilter as 'new' | 'sale' | 'bestseller'))
    if (query) {
      const q = query.toLowerCase()
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
    }
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }
    return list
  }, [activeCategory, activeFilter, query, priceRange, minRating, sort])

  const filtersContent = (
    <Box sx={{ width: { xs: 280, md: 240 } }}>
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        {t('products.category')}
      </Typography>
      <Stack spacing={0.5} sx={{ mb: 3 }}>
        {categories.map((cat) => {
          const selected = activeCategory === cat.id
          return (
            <Box
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: 2,
                px: 1,
                cursor: 'pointer',
                bgcolor: selected ? 'action.selected' : 'transparent',
                '&:hover': { bgcolor: selected ? 'action.selected' : 'action.hover' },
              }}
            >
              <Checkbox size="small" checked={selected} onChange={() => toggleCategory(cat.id)} onClick={(e) => e.stopPropagation()} />
              <Typography variant="body2" fontWeight={selected ? 700 : 400}>
                {lang === 'ar' ? cat.nameAr : cat.name}
              </Typography>
            </Box>
          )
        })}
      </Stack>

      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        {t('products.priceRange')}
      </Typography>
      <Box sx={{ px: 1, mb: 3 }}>
        <Slider
          value={priceRange}
          onChange={(_, value) => setPriceRange(value as number[])}
          valueLabelDisplay="auto"
          min={0}
          max={MAX_PRICE}
          size="small"
        />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="caption" color="text.secondary">${priceRange[0]}</Typography>
          <Typography variant="caption" color="text.secondary">${priceRange[1]}</Typography>
        </Stack>
      </Box>

      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        {t('products.minRating')}
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
        {[0, 3, 4, 4.5].map((r) => (
          <Chip
            key={r}
            label={r === 0 ? t('products.any') : `${r}+`}
            size="small"
            color={minRating === r ? 'primary' : 'default'}
            onClick={() => setMinRating(r)}
          />
        ))}
      </Stack>
    </Box>
  )

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" underline="hover" color="text.secondary">{t('products.home')}</Link>
        <Typography color="text.primary">{t('products.shop')}</Typography>
      </Breadcrumbs>

      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
            {query ? t('products.resultsFor', { q: query }) : t('products.allProducts')}
          </Typography>
          <Typography variant="body2" color="text.secondary">{t('products.productsCount', { count: filtered.length })}</Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={4} alignItems="flex-start">
        {!isMobile && filtersContent}

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            {isMobile ? (
              <IconButton onClick={() => setMobileFiltersOpen(true)} sx={{ border: '1px solid', borderColor: 'divider' }}>
                <TuneIcon fontSize="small" />
              </IconButton>
            ) : (
              <Box />
            )}
            <TextField
              select
              size="small"
              label={t('products.sortBy')}
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="relevance">{t('products.relevance')}</MenuItem>
              <MenuItem value="price-asc">{t('products.priceLowHigh')}</MenuItem>
              <MenuItem value="price-desc">{t('products.priceHighLow')}</MenuItem>
              <MenuItem value="rating">{t('products.topRated')}</MenuItem>
            </TextField>
          </Stack>

          {filtered.length > 0 ? (
            <ProductGrid products={filtered} />
          ) : (
            <Box sx={{ py: 10, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>{t('products.noProductsFound')}</Typography>
              <Typography variant="body2" color="text.secondary">{t('products.tryAdjusting')}</Typography>
            </Box>
          )}
        </Box>
      </Stack>

      <Drawer anchor="left" open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight={800}>{t('products.filters')}</Typography>
          <IconButton onClick={() => setMobileFiltersOpen(false)}><CloseIcon /></IconButton>
        </Stack>
        <Box sx={{ px: 2, pb: 2 }}>{filtersContent}</Box>
      </Drawer>
    </Container>
  )
}
