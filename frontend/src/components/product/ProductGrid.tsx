import { Grid } from '@mui/material'
import type { Product } from '../../types'
import { ProductCard } from './ProductCard'

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {products.map((product) => (
        <Grid key={product.id} item xs={6} sm={4} md={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  )
}
