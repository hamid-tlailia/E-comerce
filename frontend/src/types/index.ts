export interface Product {
  id: string
  slug: string
  title: string
  brand: string
  category: string
  price: number
  oldPrice?: number
  currency: string
  rating: number
  reviewsCount: number
  images: string[]
  colors?: string[]
  stock: number
  description: string
  highlights: string[]
  tags: ('new' | 'sale' | 'bestseller')[]
}

export interface CartItem {
  productId: string
  quantity: number
  color?: string
}

export interface Category {
  id: string
  name: string
  icon: string
  image: string
}
