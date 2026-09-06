import { useMemo, useState } from 'react'
import {
  Box,
  Breadcrumbs,
  Checkbox,
  Chip,
  Container,
  Drawer,
  FormControlLabel,
  FormGroup,
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

const MAX_PRICE = 200

type SortKey = 'relevance' | 'price-asc' | 'price-desc' | 'rating'

export function ProductsPage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

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
        Category
      </Typography>
      <FormGroup sx={{ mb: 3 }}>
        {categories.map((cat) => (
          <FormControlLabel
            key={cat.id}
            control={<Checkbox size="small" checked={activeCategory === cat.id} onChange={() => toggleCategory(cat.id)} />}
            label={<Typography variant="body2">{cat.name}</Typography>}
          />
        ))}
      </FormGroup>

      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        Price Range
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
        Minimum Rating
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
        {[0, 3, 4, 4.5].map((r) => (
          <Chip
            key={r}
            label={r === 0 ? 'Any' : `${r}+`}
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
        <Link component={RouterLink} to="/" underline="hover" color="text.secondary">Home</Link>
        <Typography color="text.primary">Shop</Typography>
      </Breadcrumbs>

      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
            {query ? `Results for "${query}"` : 'All Products'}
          </Typography>
          <Typography variant="body2" color="text.secondary">{filtered.length} products</Typography>
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
              label="Sort by"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="relevance">Relevance</MenuItem>
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
              <MenuItem value="rating">Top Rated</MenuItem>
            </TextField>
          </Stack>

          {filtered.length > 0 ? (
            <ProductGrid products={filtered} />
          ) : (
            <Box sx={{ py: 10, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>No products found</Typography>
              <Typography variant="body2" color="text.secondary">Try adjusting your filters or search terms.</Typography>
            </Box>
          )}
        </Box>
      </Stack>

      <Drawer anchor="left" open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight={800}>Filters</Typography>
          <IconButton onClick={() => setMobileFiltersOpen(false)}><CloseIcon /></IconButton>
        </Stack>
        <Box sx={{ px: 2, pb: 2 }}>{filtersContent}</Box>
      </Drawer>
    </Container>
  )
}
