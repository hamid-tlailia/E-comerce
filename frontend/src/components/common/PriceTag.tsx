import { Stack, Typography } from '@mui/material'

export function formatPrice(price: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price)
}

export function PriceTag({
  price,
  oldPrice,
  currency = 'USD',
  size = 'medium',
}: {
  price: number
  oldPrice?: number
  currency?: string
  size?: 'small' | 'medium' | 'large'
}) {
  const variant = size === 'large' ? 'h4' : size === 'small' ? 'body1' : 'h6'
  return (
    <Stack direction="row" spacing={1} alignItems="baseline" flexWrap="wrap">
      <Typography variant={variant} fontWeight={800} color="text.primary">
        {formatPrice(price, currency)}
      </Typography>
      {oldPrice && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textDecoration: 'line-through' }}
        >
          {formatPrice(oldPrice, currency)}
        </Typography>
      )}
    </Stack>
  )
}
