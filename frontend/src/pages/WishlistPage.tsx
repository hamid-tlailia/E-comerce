import { Box, Button, Container, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Link as RouterLink } from 'react-router-dom'
import { products } from '../data/products'
import { ProductGrid } from '../components/product/ProductGrid'
import { useWishlist } from '../context/WishlistContext'

export function WishlistPage() {
  const { ids } = useWishlist()
  const wishedProducts = products.filter((p) => ids.includes(p.id))

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Typography variant="h4" sx={{ mb: 4, fontSize: { xs: '1.5rem', md: '2rem' } }}>
        My Wishlist
      </Typography>

      {wishedProducts.length > 0 ? (
        <ProductGrid products={wishedProducts} />
      ) : (
        <Box sx={{ py: 10, textAlign: 'center' }}>
          <FavoriteBorderIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" gutterBottom>Your wishlist is empty</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Save items you love by tapping the heart icon on any product.
          </Typography>
          <Button component={RouterLink} to="/products" variant="contained" size="large">
            Explore Products
          </Button>
        </Box>
      )}
    </Container>
  )
}
