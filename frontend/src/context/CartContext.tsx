import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { products } from '../data/products'
import type { CartItem } from '../types'

interface CartContextValue {
  items: CartItem[]
  addItem: (productId: string, quantity?: number, color?: string) => void
  removeItem: (productId: string, color?: string) => void
  updateQuantity: (productId: string, quantity: number, color?: string) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)
const STORAGE_KEY = 'hamidos-shop-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as CartItem[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (productId: string, quantity = 1, color?: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId && i.color === color)
      if (existing) {
        return prev.map((i) =>
          i.productId === productId && i.color === color ? { ...i, quantity: i.quantity + quantity } : i,
        )
      }
      return [...prev, { productId, quantity, color }]
    })
  }

  const removeItem = (productId: string, color?: string) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.color === color)))
  }

  const updateQuantity = (productId: string, quantity: number, color?: string) => {
    setItems((prev) =>
      prev.map((i) => (i.productId === productId && i.color === color ? { ...i, quantity: Math.max(1, quantity) } : i)),
    )
  }

  const clearCart = () => setItems([])

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])

  const subtotal = useMemo(
    () =>
      items.reduce((sum, i) => {
        const product = products.find((p) => p.id === i.productId)
        return sum + (product?.price ?? 0) * i.quantity
      }, 0),
    [items],
  )

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
