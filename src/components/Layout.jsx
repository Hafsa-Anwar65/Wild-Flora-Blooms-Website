import { useEffect, useMemo, useRef, useState } from 'react'
import { Instagram, Facebook } from './icons'
import { Search, ShoppingBag, Menu, X, ChevronDown, Mail, Trash2, Check, LayoutDashboard } from 'lucide-react'
import { useStore } from '../store'
import { categories, products, fmt, fmt2, storeConfig } from '../data'
import { Photo, Button, Link, Qty, Ph, DemoNote } from './ui'

export const NAV = [
  { label: 'Home', to: 'home' },
  { label: 'Shop Flowers', to: 'shop', menu: true },
  { label: 'Plants', to: 'shop-plants' },
  { label: 'Weddings & Events', to: 'weddings' },
  { label: 'Workshops', to: 'workshops' },
  { label: 'Gift Vouchers', to: 'vouchers' },
  { label: 'About', to: 'about' },
  { label: 'Contact', to: 'contact' },
]

export function Wordmark({ className = '', light }) {
  return (
    <span className={`inline-flex flex-col items-center whitespace-nowrap leading-none ${light ? 'text-ivory' : 'text-forest'} ${className}`}>
      <span className="font-serif text-[22px] tracking-[0.28em] sm:text-[26px]" style={{ fontVariationSettings: '"opsz" 60' }}>WILD FLORA</span>
      <span className="mt-1 font-sans text-[10px] tracking-[0.62em] opacity-80">BLOOMS</span>
    </span>
  )
}

function isActive(route, to) {
  if (to === 'home') return route === 'home'
  if (to === 'shop') return route === 'shop' || (route.startsWith('shop-') && route !== 'shop-plants') || route.startsWith('product-')
  return route === to || route.startsWith(to)
}

export function Header() {
  const { route, count, setCartOpen, setSearchOpen } = useStore()
  const [open, setOpen] = useState(false)
  const [shopMenu, setShopMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const on = () => setScrolled(window.scrollY > 40); on(); window.addEventListener('scroll', on, { passive: true }); return () => window.removeEventListener('scroll', on) }, [])
  useEffect(() => { setOpen(false); setShopMenu(false) }, [route])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open])

  return (
    <>
      <div className="bg-forest text-ivory">
        <div className="wrap flex min-h-9 items-center justify-center py-2 text-center text-[12.5px] sm:text-[13px] tracking-[0.01em]">
          Beautiful seasonal flowers, delivered with care across Perth.
        </div>
      </div>
      <header className={`sticky top-0 z-40 border-b transition-colors ${scrolled ? 'border-linen bg-ivory/95 backdrop-blur' : 'border-transparent bg-ivory'}`}>
        {/* Desktop */}
        <div className="wrap hidden lg:block">
          <div className={`grid grid-cols-[1fr_auto_1fr] items-center transition-all ${scrolled ? 'h-[68px]' : 'h-[92px]'}`}>
            <button onClick={() => setSearchOpen(true)} className="flex w-max items-center gap-2 text-[14px] text-ink-soft hover:text-forest">
              <Search size={18} strokeWidth={1.5} /> Search flowers & plants
            </button>
            <Link to="home" aria-label="Wild Flora Blooms home"><Wordmark /></Link>
            <div className="flex items-center justify-end gap-5">
              <Link to="admin" className="flex items-center gap-1.5 text-[13px] text-ink-mute hover:text-forest"><LayoutDashboard size={15} strokeWidth={1.5} />Studio admin</Link>
              <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 text-[14px] text-ink hover:text-forest" aria-label={`Shopping bag, ${count} items`}>
                <ShoppingBag size={20} strokeWidth={1.5} /> Bag
                {count > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-rose-deep px-1 text-[11px] text-ivory">{count}</span>}
              </button>
            </div>
          </div>
          <nav className="relative flex justify-center gap-9 pb-4 text-[14.5px]" aria-label="Main">
            {NAV.map((n) => n.menu ? (
              <div key={n.to} className="relative" onMouseEnter={() => setShopMenu(true)} onMouseLeave={() => setShopMenu(false)}>
                <Link to={n.to} className={`flex items-center gap-1 py-1 ${isActive(route, n.to) ? 'text-forest' : 'text-ink-soft hover:text-forest'}`} aria-expanded={shopMenu} onFocus={() => setShopMenu(true)}>
                  {n.label} <ChevronDown size={14} strokeWidth={1.5} />
                </Link>
                {isActive(route, n.to) && <span className="absolute -bottom-0.5 left-0 right-5 h-px bg-forest" />}
                {shopMenu && (
                  <div className="fade-in absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-4">
                    <div className="grid grid-cols-[1fr_220px] gap-8 border border-linen bg-ivory p-7 shadow-[0_18px_40px_-24px_rgba(30,40,32,.35)]">
                      <ul className="space-y-3">
                        <li><Link to="shop" className="font-serif text-[20px] text-forest link-u">Everything in the shop</Link></li>
                        {categories.map((c) => (
                          <li key={c.id}><Link to={`shop-${c.id}`} className="group flex items-baseline justify-between gap-4"><span className="font-serif text-[19px] text-ink group-hover:text-forest">{c.name}</span><span className="text-[13px] text-ink-mute">{c.blurb}</span></Link></li>
                        ))}
                      </ul>
                      <Link to="product-signature-bouquet" className="block">
                        <Photo k="signature" caption={false} ratio="4/5" />
                        <p className="mt-2 text-[13px] text-ink-soft">The Signature Bouquet — from {fmt(120)}</p>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={n.to} to={n.to} className={`relative py-1 ${isActive(route, n.to) ? 'text-forest' : 'text-ink-soft hover:text-forest'}`}>
                {n.label}
                {isActive(route, n.to) && <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-forest" />}
              </Link>
            ))}
          </nav>
        </div>
        {/* Mobile & tablet */}
        <div className="wrap flex h-16 items-center justify-between lg:hidden">
          <button onClick={() => setOpen(true)} className="-ml-2 p-2" aria-label="Open menu"><Menu size={22} strokeWidth={1.5} /></button>
          <Link to="home" aria-label="Wild Flora Blooms home" className="scale-[.86]"><Wordmark /></Link>
          <div className="-mr-2 flex items-center">
            <button onClick={() => setSearchOpen(true)} className="p-2" aria-label="Search"><Search size={20} strokeWidth={1.5} /></button>
            <button onClick={() => setCartOpen(true)} className="relative p-2" aria-label={`Shopping bag, ${count} items`}>
              <ShoppingBag size={21} strokeWidth={1.5} />
              {count > 0 && <span className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-rose-deep px-1 text-[10px] text-ivory">{count}</span>}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fade-in fixed inset-0 z-50 flex flex-col bg-ivory lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="wrap flex h-16 shrink-0 items-center justify-between border-b border-linen">
            <span className="scale-[.86]"><Wordmark /></span>
            <button onClick={() => setOpen(false)} className="-mr-2 p-2" aria-label="Close menu"><X size={22} strokeWidth={1.5} /></button>
          </div>
          <div className="wrap flex-1 overflow-y-auto py-6">
            <p className="mb-3 text-[13px] text-ink-mute">Shop by category</p>
            <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-6">
              {categories.map((c) => (
                <Link key={c.id} to={`shop-${c.id}`} className="w-[118px] shrink-0">
                  <Photo k={c.photo} caption={false} ratio="3/4" />
                  <span className="mt-2 block text-[14px] leading-tight">{c.name}</span>
                </Link>
              ))}
            </div>
            <nav className="divide-y divide-linen border-y border-linen" aria-label="Mobile">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} className={`flex items-center justify-between py-4 font-serif text-[26px] ${isActive(route, n.to) ? 'text-forest' : 'text-ink'}`}>
                  {n.label}{isActive(route, n.to) && <span className="h-1.5 w-1.5 rounded-full bg-rose-deep" />}
                </Link>
              ))}
            </nav>
            <Link to="admin" className="mt-6 flex items-center gap-2 text-[14px] text-ink-mute"><LayoutDashboard size={16} strokeWidth={1.5} /> Studio admin (demo)</Link>
          </div>
        </div>
      )}
    </>
  )
}

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, go } = useStore()
  const [q, setQ] = useState('')
  const ref = useRef(null)
  useEffect(() => { if (searchOpen) { setQ(''); setTimeout(() => ref.current?.focus(), 30) } }, [searchOpen])
  useEffect(() => { const k = (e) => e.key === 'Escape' && setSearchOpen(false); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [setSearchOpen])
  const results = useMemo(() => {
    const t = q.trim().toLowerCase(); if (!t) return []
    return products.filter((p) => (p.name + ' ' + p.short + ' ' + p.category).toLowerCase().includes(t)).slice(0, 6)
  }, [q])
  if (!searchOpen) return null
  return (
    <div className="fade-in fixed inset-0 z-[60] bg-forest-deep/40" onClick={() => setSearchOpen(false)}>
      <div className="bg-ivory" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Search">
        <div className="wrap py-6 md:py-10">
          <form onSubmit={(e) => { e.preventDefault(); setSearchOpen(false); go(`shop`); setTimeout(() => window.dispatchEvent(new CustomEvent('wfb-search', { detail: q })), 50) }} className="flex items-center gap-3 border-b border-forest/40 pb-3">
            <Search size={22} strokeWidth={1.4} className="text-ink-mute" />
            <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for roses, natives, orchids…" className="w-full bg-transparent font-serif text-[24px] placeholder:text-ink-mute focus:outline-none md:text-[32px]" />
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search" className="p-1"><X size={22} strokeWidth={1.4} /></button>
          </form>
          {q && (
            <div className="mt-6">
              {results.length === 0 ? (
                <p className="text-ink-soft">Nothing matches “{q}”. Try a flower, a colour or “native”.</p>
              ) : (
                <ul className="grid grid-cols-2 gap-5 md:grid-cols-6">
                  {results.map((p) => (
                    <li key={p.id}><Link to={`product-${p.id}`} onClick={() => setSearchOpen(false)}>
                      <Photo k={p.photo} caption={false} ratio="4/5" />
                      <span className="mt-2 block text-[14px]">{p.name}</span>
                      <span className="text-[13px] text-ink-mute">from {fmt(p.sizes[0].price)}</span>
                    </Link></li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {!q && <p className="mt-5 text-[14px] text-ink-mute">Popular: <button className="link-u" onClick={() => setQ('native')}>native</button>, <button className="link-u" onClick={() => setQ('orchid')}>orchid</button>, <button className="link-u" onClick={() => setQ('wreath')}>wreath</button>, <button className="link-u" onClick={() => setQ('rose')}>roses</button></p>}
        </div>
      </div>
    </div>
  )
}

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, subtotal, setQty, remove, go } = useStore()
  useEffect(() => { const k = (e) => e.key === 'Escape' && setCartOpen(false); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [setCartOpen])
  if (!cartOpen) return null
  return (
    <div className="fixed inset-0 z-[60]">
      <div className="fade-in absolute inset-0 bg-forest-deep/40" onClick={() => setCartOpen(false)} />
      <aside className="drawer-in absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-ivory" role="dialog" aria-label="Shopping bag">
        <div className="flex items-center justify-between border-b border-linen px-6 py-5">
          <h2 className="font-serif text-[26px] text-forest">Your bag</h2>
          <button onClick={() => setCartOpen(false)} aria-label="Close bag" className="-mr-2 p-2"><X size={22} strokeWidth={1.5} /></button>
        </div>
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center px-6">
            <p className="font-serif text-[24px] text-ink">Your bag is empty.</p>
            <p className="mt-2 text-ink-soft">Start with this week’s seasonal posy, or browse everything in the shop.</p>
            <Button className="mt-6" onClick={() => { setCartOpen(false); go('shop') }}>Shop flowers</Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-linen overflow-y-auto px-6">
              {cart.map((l) => (
                <li key={l.key} className="flex gap-4 py-5">
                  {l.kind === 'voucher' ? <Photo k="voucher" caption={false} className="h-[104px] w-[84px] shrink-0" /> : <Photo k={l.product.photo} caption={false} className="h-[104px] w-[84px] shrink-0" />}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-serif text-[18px] leading-tight">{l.kind === 'voucher' ? 'Gift voucher' : l.product.name}</p>
                        <p className="mt-0.5 text-[13px] text-ink-mute">{l.kind === 'voucher' ? `For ${l.options.recipient}` : l.size}{l.options?.addOns?.length ? ` · ${l.options.addOns.map((a) => a.label).join(', ')}` : ''}</p>
                      </div>
                      <p className="shrink-0 tabular-nums">{fmt2(l.total)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      {l.kind === 'voucher' ? <span className="text-[13px] text-ink-mute">Emailed to recipient</span> : <Qty small value={l.qty} onChange={(v) => setQty(l.key, v)} />}
                      <button onClick={() => remove(l.key)} className="flex items-center gap-1 text-[13px] text-ink-mute hover:text-clay"><Trash2 size={14} strokeWidth={1.5} />Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-linen bg-ivory-deep px-6 py-5">
              <div className="flex justify-between text-[15px]"><span>Subtotal</span><span className="tabular-nums">{fmt2(subtotal)}</span></div>
              <p className="mt-1 text-[13px] text-ink-mute">Delivery and collection options are chosen at checkout.</p>
              <Button className="mt-4 w-full" onClick={() => { setCartOpen(false); go('checkout') }}>Go to checkout</Button>
              <button className="mt-3 w-full text-center text-[14px] text-ink-soft link-u" onClick={() => setCartOpen(false)}>Keep shopping</button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export function Toast() {
  const { toast } = useStore()
  if (!toast) return null
  return (
    <div className="fade-in fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-[3px] bg-forest px-4 py-3 text-[14px] text-ivory shadow-lg" role="status">
      <Check size={16} /> {toast}
    </div>
  )
}

export function Footer() {
  const { flash } = useStore()
  const [email, setEmail] = useState('')
  const [err, setErr] = useState('')
  const [done, setDone] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) { setErr('Enter an email address like name@example.com'); return }
    setErr(''); setDone(true); flash('Subscribed (demo — no email sent)')
  }
  return (
    <footer className="bg-forest-deep text-ivory/85">
      <div className="wrap grid gap-12 border-b border-ivory/10 py-16 md:grid-cols-[1.2fr_1fr] md:py-20">
        <div>
          <h2 className="max-w-[16ch] font-serif text-[34px] leading-[1.1] text-ivory md:text-[42px]">Letters from the studio, now and then.</h2>
          <p className="mt-4 max-w-[46ch] text-[15px] text-ivory/70">Seasonal notes, new workshop dates and the occasional first look at Christmas wreaths. No more than once a month.</p>
        </div>
        <form onSubmit={submit} className="self-end" noValidate>
          {done ? (
            <p className="font-serif text-[22px] text-ivory">Thank you — you’re on the list. <span className="block font-sans text-[13px] text-ivory/60">Demo only: newsletter platform to be connected.</span></p>
          ) : (
            <>
              <label htmlFor="nl" className="text-[13px] text-ivory/70">Email address</label>
              <div className="mt-2 flex border-b border-ivory/40 focus-within:border-ivory">
                <input id="nl" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" className="w-full bg-transparent py-3 text-[16px] text-ivory placeholder:text-ivory/40 focus:outline-none" />
                <button className="shrink-0 px-2 text-[15px] text-ivory hover:text-rose">Subscribe</button>
              </div>
              {err && <p className="mt-2 text-[13px] text-rose">{err}</p>}
            </>
          )}
        </form>
      </div>
      <div className="wrap grid grid-cols-2 gap-10 py-14 text-[14.5px] md:grid-cols-5">
        <div className="col-span-2 md:col-span-1">
          <Wordmark light />
          <div className="mt-6 flex gap-4">
            <a href="https://instagram.com" className="text-ivory/70 hover:text-ivory" aria-label="Instagram"><Instagram size={20} strokeWidth={1.4} /></a>
            <a href="https://facebook.com" className="text-ivory/70 hover:text-ivory" aria-label="Facebook"><Facebook size={20} strokeWidth={1.4} /></a>
            <span className="text-ivory/70" aria-label="Email"><Mail size={20} strokeWidth={1.4} /></span>
          </div>
        </div>
        <FootCol title="Shop" links={[['All flowers', 'shop'], ...categories.map((c) => [c.name, `shop-${c.id}`])]} />
        <FootCol title="Studio" links={[['Weddings & Events', 'weddings'], ['Workshops', 'workshops'], ['Gift Vouchers', 'vouchers'], ['About', 'about'], ['Contact', 'contact']]} />
        <div>
          <p className="mb-4 text-[13px] text-ivory/50">Delivery</p>
          <ul className="space-y-2.5 text-ivory/80">
            <li>Delivery areas <Ph>to confirm</Ph></li>
            <li>Order cut-off <Ph>{storeConfig.cutoffTime || 'to confirm'}</Ph></li>
            <li>Delivery days <Ph>{storeConfig.deliveryDays || 'to confirm'}</Ph></li>
            <li><Link to="contact" className="link-u">Delivery questions</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-[13px] text-ivory/50">Contact</p>
          <ul className="space-y-2.5 text-ivory/80">
            <li>Phone <Ph>studio phone</Ph></li>
            <li>Email <Ph>studio email</Ph></li>
            <li>Studio <Ph>address / pickup point</Ph></li>
            <li>Hours <Ph>opening hours</Ph></li>
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-col gap-3 border-t border-ivory/10 py-6 text-[13px] text-ivory/50 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Wild Flora Blooms. <Ph>ABN</Ph></p>
        <div className="flex gap-6"><a href="#contact" className="link-u">Privacy policy</a><a href="#contact" className="link-u">Terms & conditions</a><a href="#contact" className="link-u">Delivery & refunds</a></div>
      </div>
    </footer>
  )
}

function FootCol({ title, links }) {
  return (
    <div>
      <p className="mb-4 text-[13px] text-ivory/50">{title}</p>
      <ul className="space-y-2.5">{links.map(([l, to]) => <li key={to}><Link to={to} className="text-ivory/80 hover:text-ivory">{l}</Link></li>)}</ul>
    </div>
  )
}

export function ProposalBadge() {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-30 hidden md:block">
      <span className="pointer-events-auto rounded-[2px] border border-linen bg-ivory/90 px-3 py-1.5 text-[12px] text-ink-mute backdrop-blur">Proposed redesign · interactive mockup · demo data</span>
    </div>
  )
}
