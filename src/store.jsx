import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { products } from './data'

const Ctx = createContext(null)
export const useStore = () => useContext(Ctx)

const readHash = () => (typeof window !== 'undefined' && window.location.hash.slice(1)) || 'home'

export function StoreProvider({ children }) {
  const [route, setRoute] = useState(readHash())
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const on = () => { setRoute(readHash()); window.scrollTo({ top: 0, behavior: 'instant' }) }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  const go = useCallback((r) => {
    if (r === route) { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    window.location.hash = r
  }, [route])

  const flash = useCallback((msg) => { setToast(msg); setTimeout(() => setToast(null), 2600) }, [])

  const add = useCallback((item) => {
    // item: { productId, size, price, qty, options }
    setCart((c) => {
      const key = `${item.productId}|${item.size}|${JSON.stringify(item.options || {})}`
      const found = c.find((l) => l.key === key)
      if (found) return c.map((l) => (l.key === key ? { ...l, qty: l.qty + item.qty } : l))
      return [...c, { ...item, key }]
    })
    setCartOpen(true)
  }, [])
  const setQty = (key, qty) => setCart((c) => (qty <= 0 ? c.filter((l) => l.key !== key) : c.map((l) => (l.key === key ? { ...l, qty } : l))))
  const remove = (key) => setCart((c) => c.filter((l) => l.key !== key))
  const clear = () => setCart([])

  const lines = useMemo(() => cart.map((l) => {
    const p = l.kind === 'voucher' ? null : products.find((x) => x.id === l.productId)
    const extras = (l.options?.addOns || []).reduce((s, a) => s + a.price, 0)
    return { ...l, product: p, unit: l.price + extras, total: (l.price + extras) * l.qty }
  }), [cart])
  const count = cart.reduce((s, l) => s + l.qty, 0)
  const subtotal = lines.reduce((s, l) => s + l.total, 0)

  const value = { route, go, cart: lines, count, subtotal, add, setQty, remove, clear, cartOpen, setCartOpen, searchOpen, setSearchOpen, toast, flash }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
