import { useState } from 'react'
import { Box, Card, CardActionArea, CardContent, Chip, IconButton, Stack, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import CheckIcon from '@mui/icons-material/Check'
import { Link as RouterLink } from 'react-router-dom'
import type { Product } from '../../types'
import { PriceTag } from '../common/PriceTag'
import { RatingStars } from '../common/RatingStars'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useLanguage } from '../../context/LanguageContext'
import { useSnackbar } from '../../context/SnackbarContext'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()
  const { lang, t } = useLanguage()
  const { notify } = useSnackbar()
  const wished = has(product.id)
  const [justAdded, setJustAdded] = useState(false)
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0
  const title = lang === 'ar' ? product.titleAr : product.title

  const handleAddToCart = () => {
    addItem(product.id)
    notify(t('snackbar.addedToCart', { name: title }))
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  const handleToggleWishlist = () => {
    const willAdd = !wished
    toggle(product.id)
    notify(t(willAdd ? 'snackbar.addedToWishlist' : 'snackbar.removedFromWishlist', { name: title }))
  }

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardActionArea component={RouterLink} to={`/products/${product.slug}`}>
          <Box
            component="img"
            src={product.images[0]}
            alt={title}
            loading="lazy"
            sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block' }}
          />
        </CardActionArea>
        <Stack direction="row" spacing={0.5} sx={{ position: 'absolute', top: 10, insetInlineStart: 10 }}>
          {product.tags.includes('new') && <Chip label="New" size="small" color="secondary" />}
          {discount > 0 && <Chip label={`-${discount}%`} size="small" color="error" />}
        </Stack>
        <IconButton
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={handleToggleWishlist}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            insetInlineEnd: 8,
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'background.paper' },
          }}
        >
          {wished ? <FavoriteIcon fontSize="small" color="error" /> : <FavoriteBorderIcon fontSize="small" />}
        </IconButton>
        <IconButton
          aria-label={t('product.addToCart')}
          onClick={handleAddToCart}
          size="small"
          disabled={justAdded}
          sx={{
            position: 'absolute',
            bottom: 8,
            insetInlineEnd: 8,
            bgcolor: justAdded ? 'success.main' : 'primary.main',
            color: 'primary.contrastText',
            opacity: { xs: 1, sm: justAdded ? 1 : 0 },
            transform: { xs: 'none', sm: justAdded ? 'translateY(0)' : 'translateY(6px)' },
            transition: 'opacity 0.2s ease, transform 0.2s ease, background-color 0.2s ease',
            '.MuiCard-root:hover &': { opacity: 1, transform: 'translateY(0)' },
            '&:hover': { bgcolor: justAdded ? 'success.main' : 'primary.dark' },
            '&.Mui-disabled': { bgcolor: 'success.main', color: 'primary.contrastText' },
          }}
        >
          {justAdded ? <CheckIcon fontSize="small" /> : <ShoppingBagOutlinedIcon fontSize="small" />}
        </IconButton>
      </Box>
      <CardContent component={RouterLink} to={`/products/${product.slug}`} sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing={0.5}>
          {product.brand}
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{
            mt: 0.25,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '2.6em',
          }}
        >
          {title}
        </Typography>
        <Box sx={{ mt: 0.5, mb: 1 }}>
          <RatingStars value={product.rating} count={product.reviewsCount} />
        </Box>
        <PriceTag price={product.price} oldPrice={product.oldPrice} currency={product.currency} />
      </CardContent>
    </Card>
  )
}
