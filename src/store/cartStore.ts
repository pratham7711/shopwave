import { create } from 'zustand'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  category: string
}

interface CartStore {
  items: CartItem[]
  total: number
  itemCount: number
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const calcTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)

const calcCount = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.quantity, 0)

export const useCartStore = create<CartStore>()((set) => ({
  items: [],
  total: 0,
  itemCount: 0,

  addItem: (newItem) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === newItem.id)
      let items: CartItem[]
      if (existing) {
        items = state.items.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      } else {
        items = [...state.items, { ...newItem, quantity: 1 }]
      }
      return { items, total: calcTotal(items), itemCount: calcCount(items) }
    }),

  removeItem: (id) =>
    set((state) => {
      const items = state.items.filter((i) => i.id !== id)
      return { items, total: calcTotal(items), itemCount: calcCount(items) }
    }),

  updateQuantity: (id, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        const items = state.items.filter((i) => i.id !== id)
        return { items, total: calcTotal(items), itemCount: calcCount(items) }
      }
      const items = state.items.map((i) =>
        i.id === id ? { ...i, quantity } : i
      )
      return { items, total: calcTotal(items), itemCount: calcCount(items) }
    }),

  clearCart: () => set({ items: [], total: 0, itemCount: 0 }),
}))
