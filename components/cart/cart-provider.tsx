'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export type SelectedOption = { label: string; value: string }

export type ProductLine = {
  kind: 'product'
  key: string
  productId: string
  name: string
  unitPrice: number
  quantity: number
  options: SelectedOption[]
  leadTimeHours: number
}

type CustomBase = {
  kind: 'custom'
  key: string
  quantity: number
  details: string
  leadTimeHours: number
}

export type CakeCustomLine = CustomBase & {
  type: 'Torta'
  servings: number
  flavor: string
  referenceImage: boolean
  referenceLink?: string
}

export type OtherCustomLine = CustomBase & {
  type: 'Otro'
  what: string
}

export type CustomLine = CakeCustomLine | OtherCustomLine

export type CartLine = ProductLine | CustomLine

type NewProductLine = Omit<ProductLine, 'key' | 'kind'>
export type NewCustomLine =
  | Omit<CakeCustomLine, 'key' | 'kind'>
  | Omit<OtherCustomLine, 'key' | 'kind'>

type CartContextValue = {
  lines: CartLine[]
  itemCount: number
  total: number
  hasCustom: boolean
  leadTimeHours: number
  addProduct: (line: NewProductLine) => void
  addCustom: (line: NewCustomLine) => void
  updateQuantity: (key: string, quantity: number) => void
  removeLine: (key: string) => void
  clearCart: () => void
  isCartOpen: boolean
  setCartOpen: (open: boolean) => void
  isCheckoutOpen: boolean
  setCheckoutOpen: (open: boolean) => void
}

const STORAGE_KEY = 'kairos-trigo-carrito'
const DEFAULT_LEAD_TIME = 48

const CartContext = createContext<CartContextValue | null>(null)

const productKey = (productId: string, options: SelectedOption[]) =>
  [productId, ...options.map((o) => `${o.label}:${o.value}`)].join('|')

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [hydrated, setHydrated] = useState(false)
  const [isCartOpen, setCartOpen] = useState(false)
  const [isCheckoutOpen, setCheckoutOpen] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) setLines(parsed)
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  }, [lines, hydrated])

  const addProduct = useCallback((line: NewProductLine) => {
    const key = productKey(line.productId, line.options)
    setLines((current) => {
      const existing = current.find((l) => l.key === key)
      if (existing) {
        return current.map((l) =>
          l.key === key ? { ...l, quantity: l.quantity + line.quantity } : l,
        )
      }
      return [...current, { ...line, kind: 'product', key }]
    })
  }, [])

  const addCustom = useCallback((line: NewCustomLine) => {
    setLines((current) => [
      ...current,
      {
        ...line,
        kind: 'custom',
        key: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      } as CustomLine,
    ])
  }, [])

  const updateQuantity = useCallback((key: string, quantity: number) => {
    const safe = Math.max(1, Math.floor(quantity) || 1)
    setLines((current) => current.map((l) => (l.key === key ? { ...l, quantity: safe } : l)))
  }, [])

  const removeLine = useCallback((key: string) => {
    setLines((current) => current.filter((l) => l.key !== key))
  }, [])

  const clearCart = useCallback(() => setLines([]), [])

  const value = useMemo<CartContextValue>(() => {
    const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0)
    const total = lines.reduce(
      (sum, l) => (l.kind === 'product' ? sum + l.unitPrice * l.quantity : sum),
      0,
    )
    const leadTimeHours = lines.reduce(
      (max, l) => Math.max(max, l.leadTimeHours),
      DEFAULT_LEAD_TIME,
    )
    return {
      lines,
      itemCount,
      total,
      hasCustom: lines.some((l) => l.kind === 'custom'),
      leadTimeHours,
      addProduct,
      addCustom,
      updateQuantity,
      removeLine,
      clearCart,
      isCartOpen,
      setCartOpen,
      isCheckoutOpen,
      setCheckoutOpen,
    }
  }, [lines, addProduct, addCustom, updateQuantity, removeLine, clearCart, isCartOpen, isCheckoutOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart debe usarse dentro de CartProvider')
  return context
}
