import { Rating, Stack, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

export function RatingStars({
  value,
  count,
  size = 'small',
}: {
  value: number
  count?: number
  size?: 'small' | 'medium'
}) {
  return (
    <Stack direction="row" spacing={0.75} alignItems="center">
      <Rating
        value={value}
        precision={0.5}
        readOnly
        size={size}
        icon={<StarIcon fontSize="inherit" />}
        emptyIcon={<StarIcon fontSize="inherit" style={{ opacity: 0.25 }} />}
      />
      {count !== undefined && (
        <Typography variant="caption" color="text.secondary">
          ({count})
        </Typography>
      )}
    </Stack>
  )
}
