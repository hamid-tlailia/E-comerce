export interface Product {
  id: string
  slug: string
  title: string
  titleAr: string
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
  descriptionAr: string
  highlights: string[]
  highlightsAr: string[]
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
  nameAr: string
  icon: string
}

export type Lang = 'en' | 'ar'
