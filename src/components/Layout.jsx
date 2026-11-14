import { useEffect, useMemo, useRef, useState } from 'react'
import { Instagram, Facebook } from './icons'
import { Search, ShoppingBag, Menu, X, ChevronDown, Mail, Phone, ArrowUp, Trash2, Check, LayoutDashboard } from 'lucide-react'
import { useStore } from '../store'
import { categories, products, fmt, fmt2, storeConfig, contact, LOGO } from '../data'
import { Photo, Button, Link, Qty, Ph, DemoNote } from './ui'

export const NAV = [
  { label: 'Home', to: 'home' },
  { label: 'Shop Flowers', to: 'shop', menu: true },
  { label: 'Weddings & Events', to: 'weddings' },
  { label: 'Workshops', to: 'workshops' },
  { label: 'Gift Vouchers', to: 'vouchers' },
  { label: 'About', to: 'about' },
  { label: 'Contact', to: 'contact' },
]

export function Wordmark({ className = '', size = 'md' }) {
  const h = { sm: 'h-14', md: 'h-20', lg: 'h-[260px] md:h-[316px]' }[size]
  const [failed, setFailed] = useState(false)
  if (failed) return (
    <span className={`inline-flex flex-col items-center justify-center text-ink ${className}`}>
      <span className={`font-serif italic ${size === 'lg' ? 'text-[56px]' : size === 'md' ? 'text-[30px]' : 'text-[22px]'} leading-none`}>Wild Flora</span>
      <span className="mt-1 font-caps text-[11px] tracking-[0.4em]">BLOOMS</span>
    </span>
  )
  return <img src={LOGO} alt="Wild Flora Blooms" onError={() => setFailed(true)} className={`${h} w-auto ${className}`} />
}

function isActive(route, to) {
  if (to === 'home') return route === 'home'
  if (to === 'shop') return route === 'shop' || route.startsWith('shop-') || route.startsWith('product-') || route === 'checkout'
  return route === to || route.startsWith(to)
}

const navCls = (on) => `font-caps text-[12.5px] uppercase tracking-[0.2em] transition-colors ${on ? 'text-ink' : 'text-ink/80 hover:text-sage'}`

export function Header() {
  const { route, count, setCartOpen, setSearchOpen } = useStore()
  const [open, setOpen] = useState(false)
  const [shopMenu, setShopMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const on = () => setScrolled(window.scrollY > 40); on(); window.addEventListener('scroll', on, { passive: true }); return () => window.removeEventListener('scroll', on) }, [])
  useEffect(() => { setOpen(false); setShopMenu(false) }, [route])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  return (
    <>
      <div className="bg-sage text-white">
        <div className="wrap flex min-h-9 items-center justify-center py-2 text-center font-serif text-[16px] italic tracking-[0.08em]">
          <span className="hidden sm:inline">Seasonal flowers delivered across Coogee & surrounding Perth areas ·</span><span className="sm:hidden">Flower delivery, Coogee & Perth ·</span> <Link to="shop" className="ml-1 underline underline-offset-4">Shop bouquets</Link>
        </div>
      </div>
      <header className={`sticky top-0 z-40 bg-ivory transition-shadow ${scrolled ? 'shadow-[0_1px_0_#DDD8CC]' : ''}`}>
        {/* Desktop: evenly spread caps nav, as on the live site */}
        <div className="wrap hidden h-[72px] items-center lg:flex">
          <Link to="home" aria-label="Wild Flora Blooms home" className={`mr-6 transition-opacity ${scrolled || route !== 'home' ? 'opacity-100' : 'pointer-events-none opacity-0'}`}><Wordmark size="sm" /></Link>
          <nav className="flex flex-1 items-center justify-between" aria-label="Main">
            {NAV.map((n) => n.menu ? (
              <div key={n.to} className="relative" onMouseEnter={() => setShopMenu(true)} onMouseLeave={() => setShopMenu(false)}>
                <Link to={n.to} className={`flex items-center gap-1 py-3 ${navCls(isActive(route, n.to))}`} aria-expanded={shopMenu} onFocus={() => setShopMenu(true)}>
                  {n.label} <ChevronDown size={13} strokeWidth={1.5} />
                </Link>
                {shopMenu && (
                  <div className="fade-in absolute left-1/2 top-full z-50 w-[600px] -translate-x-1/2 pt-2">
                    <div className="grid grid-cols-[1fr_200px] gap-8 border border-linen bg-ivory p-7 shadow-[0_18px_40px_-28px_rgba(0,0,0,.35)]">
                      <ul className="space-y-3">
                        <li><Link to="shop" className="font-caps text-[12px] uppercase tracking-[0.2em] text-ink hover:text-sage">Shop all flowers</Link></li>
                        {categories.map((c) => (
                          <li key={c.id}><Link to={`shop-${c.id}`} className="group block"><span className="block font-serif text-[21px] italic text-ink group-hover:text-sage">{c.name}</span><span className="text-[15px] text-ink-mute">{c.blurb}</span></Link></li>
                        ))}
                      </ul>
                      <Link to="product-seasonal-bouquet" className="block">
                        <Photo k="s1" caption={false} ratio="4/5" />
                        <p className="mt-2 text-center font-serif text-[16px] italic text-ink-soft">Seasonal Bouquet · from {fmt(120)}</p>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={n.to} to={n.to} className={`py-3 ${navCls(isActive(route, n.to))}`}>{n.label}</Link>
            ))}
          </nav>
          <div className="ml-8 flex items-center gap-4">
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="text-ink/80 hover:text-sage"><Search size={18} strokeWidth={1.4} /></button>
            <button onClick={() => setCartOpen(true)} className="relative text-ink/80 hover:text-sage" aria-label={`Shopping bag, ${count} items`}>
              <ShoppingBag size={19} strokeWidth={1.4} />
              {count > 0 && <span className="absolute -right-2 -top-2 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-sage px-1 font-caps text-[10px] text-white">{count}</span>}
            </button>
          </div>
        </div>
        {/* Mobile & tablet */}
        <div className="wrap flex h-[68px] items-center justify-between lg:hidden">
          <button onClick={() => setOpen(true)} className="-ml-2 p-2" aria-label="Open menu"><Menu size={22} strokeWidth={1.4} /></button>
          <Link to="home" aria-label="Wild Flora Blooms home"><Wordmark size="sm" /></Link>
          <div className="-mr-2 flex items-center">
            <button onClick={() => setSearchOpen(true)} className="p-2" aria-label="Search"><Search size={20} strokeWidth={1.4} /></button>
            <button onClick={() => setCartOpen(true)} className="relative p-2" aria-label={`Shopping bag, ${count} items`}>
              <ShoppingBag size={21} strokeWidth={1.4} />
              {count > 0 && <span className="absolute right-0 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-sage px-1 font-caps text-[10px] text-white">{count}</span>}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fade-in fixed inset-0 z-50 flex flex-col bg-ivory lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="wrap flex h-[68px] shrink-0 items-center justify-between border-b border-linen">
            <Wordmark size="sm" />
            <button onClick={() => setOpen(false)} className="-mr-2 p-2" aria-label="Close menu"><X size={22} strokeWidth={1.4} /></button>
          </div>
          <div className="wrap flex-1 overflow-y-auto py-6">
            <p className="label">Shop flowers</p>
            <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-6">
              {categories.map((c) => (
                <Link key={c.id} to={`shop-${c.id}`} className="w-[120px] shrink-0">
                  <Photo k={c.photo} caption={false} ratio="3/4" />
                  <span className="mt-2 block font-serif text-[16px] italic leading-tight">{c.name}</span>
                </Link>
              ))}
            </div>
            <nav className="divide-y divide-linen border-y border-linen" aria-label="Mobile">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} className={`flex items-center justify-between py-4 font-caps text-[14px] uppercase tracking-[0.2em] ${isActive(route, n.to) ? 'text-sage' : 'text-ink'}`}>
                  {n.label}{isActive(route, n.to) && <span className="h-1.5 w-1.5 rounded-full bg-sage" />}
                </Link>
              ))}
            </nav>
            <div className="mt-8 space-y-2 text-center font-serif italic text-ink-soft">
              <a href={`tel:${contact.tel}`} className="block">{contact.phone}</a>
              <a href={`mailto:${contact.email}`} className="block">{contact.email}</a>
            </div>
            <Link to="admin" className="mt-6 flex items-center justify-center gap-2 text-[15px] text-ink-mute"><LayoutDashboard size={16} strokeWidth={1.4} /> Studio admin (demo)</Link>
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
    <div className="fade-in fixed inset-0 z-[60] bg-black/35" onClick={() => setSearchOpen(false)}>
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
                      <span className="mt-2 block text-[16px]">{p.name}</span>
                      <span className="text-[15px] text-ink-mute">from {fmt(p.sizes[0].price)}</span>
                    </Link></li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {!q && <p className="mt-5 text-[16px] text-ink-mute">Popular: <button className="link-u" onClick={() => setQ('native')}>native</button>, <button className="link-u" onClick={() => setQ('orchid')}>orchid</button>, <button className="link-u" onClick={() => setQ('wreath')}>wreath</button>, <button className="link-u" onClick={() => setQ('rose')}>roses</button></p>}
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
      <div className="fade-in absolute inset-0 bg-black/35" onClick={() => setCartOpen(false)} />
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
                        <p className="mt-0.5 text-[15px] text-ink-mute">{l.kind === 'voucher' ? `For ${l.options.recipient}` : l.size}{l.options?.addOns?.length ? ` · ${l.options.addOns.map((a) => a.label).join(', ')}` : ''}</p>
                      </div>
                      <p className="shrink-0 tabular-nums">{fmt2(l.total)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      {l.kind === 'voucher' ? <span className="text-[15px] text-ink-mute">Emailed to recipient</span> : <Qty small value={l.qty} onChange={(v) => setQty(l.key, v)} />}
                      <button onClick={() => remove(l.key)} className="flex items-center gap-1 text-[15px] text-ink-mute hover:text-clay"><Trash2 size={14} strokeWidth={1.5} />Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-linen bg-ivory-deep px-6 py-5">
              <div className="flex justify-between text-[17px]"><span>Subtotal</span><span className="tabular-nums">{fmt2(subtotal)}</span></div>
              <p className="mt-1 text-[15px] text-ink-mute">Delivery and collection options are chosen at checkout.</p>
              <Button className="mt-4 w-full" onClick={() => { setCartOpen(false); go('checkout') }}>Go to checkout</Button>
              <button className="mt-3 w-full text-center text-[16px] text-ink-soft link-u" onClick={() => setCartOpen(false)}>Keep shopping</button>
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
    <div className="fade-in fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-[3px] bg-forest px-4 py-3 text-[16px] text-ivory shadow-lg" role="status">
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
  const icon = 'text-sage hover:text-forest-deep'
  return (
    <footer className="bg-ivory">
      <div className="bg-sage text-white">
        <div className="wrap grid items-center gap-6 py-10 md:grid-cols-2">
          <div>
            <p className="font-caps text-[13px] uppercase tracking-[0.2em]">Seasonal notes from the studio</p>
            <p className="mt-2 font-serif text-[18px] italic text-white/90">New workshop dates, Christmas wreath pre-orders and what’s in season.</p>
          </div>
          <form onSubmit={submit} noValidate>
            {done ? <p className="font-serif text-[19px] italic">Thank you — you’re on the list. <span className="block text-[14px] not-italic text-white/80">Demo only: newsletter platform to be connected.</span></p> : (
              <>
                <label htmlFor="nl" className="sr-only">Email address</label>
                <div className="flex border-b border-white/70">
                  <input id="nl" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" className="w-full bg-transparent py-3 font-serif text-[18px] italic text-white placeholder:text-white/70 focus:outline-none" />
                  <button className="shrink-0 px-2 font-caps text-[12px] uppercase tracking-[0.2em]">Subscribe</button>
                </div>
                {err && <p className="mt-2 text-[15px] text-white">{err}</p>}
              </>
            )}
          </form>
        </div>
      </div>

      <div className="wrap py-14">
        <p className="mx-auto max-w-[680px] text-center font-serif text-[15px] italic leading-relaxed tracking-[0.08em] text-ink-soft">I acknowledge the Whadjuk Noongar people as the Traditional Custodians of the land on which I create, and pay my respects to Elders past and present.</p>

        <div className="mt-14 grid items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
          <div className="flex justify-center gap-7 md:justify-start" aria-label="Contact and social">
            <a href={contact.facebook} aria-label="Facebook" className={icon}><Facebook size={19} strokeWidth={1.4} /></a>
            <a href={contact.instagram} aria-label="Instagram" className={icon}><Instagram size={20} strokeWidth={1.4} /></a>
            <a href={`tel:${contact.tel}`} aria-label={`Call ${contact.phone}`} className={icon}><Phone size={19} strokeWidth={1.4} /></a>
            <a href={`mailto:${contact.email}`} aria-label={`Email ${contact.email}`} className={icon}><Mail size={20} strokeWidth={1.4} /></a>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" className={icon}><ArrowUp size={19} strokeWidth={1.4} /></button>
          </div>
          <div className="flex justify-center"><Wordmark size="md" className="!h-[150px]" /></div>
          <p className="text-center font-caps text-[13px] uppercase leading-[1.9] tracking-[0.18em] text-sage md:text-right">Wild Flora Blooms | Coogee & Perth florist for weddings, events and seasonal bouquets.</p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-8 border-t border-linen pt-10 md:grid-cols-4">
          <FootCol title="Shop" links={[['All flowers', 'shop'], ...categories.map((c) => [c.name, `shop-${c.id}`]), ['Gift vouchers', 'vouchers']]} />
          <FootCol title="Studio" links={[['Weddings & events', 'weddings'], ['Workshops', 'workshops'], ['About Lora', 'about'], ['Contact', 'contact']]} />
          <div>
            <p className="mb-4 font-caps text-[11.5px] uppercase tracking-[0.2em] text-ink-mute">Delivery</p>
            <ul className="space-y-2 text-[16px] text-ink-soft">
              <li>Coogee & surrounding Perth areas</li>
              <li>Delivery fee <Ph>to confirm</Ph></li>
              <li>Order cut-off <Ph>{storeConfig.cutoffTime || 'to confirm'}</Ph></li>
              <li>Collection <Ph>pickup point</Ph></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 font-caps text-[11.5px] uppercase tracking-[0.2em] text-ink-mute">Contact</p>
            <ul className="space-y-2 text-[16px] text-ink-soft">
              <li><a href={`tel:${contact.tel}`} className="link-u">{contact.phone}</a></li>
              <li><a href={`mailto:${contact.email}`} className="link-u break-all">{contact.email}</a></li>
              <li>{contact.hours}</li>
              <li>{contact.area}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-linen">
        <div className="wrap flex flex-col items-center gap-3 py-6 text-center font-serif text-[15px] italic text-ink-mute md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Wild Flora Blooms · Coogee, Western Australia</p>
          <div className="flex gap-6"><Link to="contact" className="link-u">Privacy policy</Link><Link to="contact" className="link-u">Terms</Link><Link to="contact" className="link-u">Delivery & refunds</Link></div>
        </div>
      </div>
    </footer>
  )
}

function FootCol({ title, links }) {
  return (
    <div>
      <p className="mb-4 font-caps text-[11.5px] uppercase tracking-[0.2em] text-ink-mute">{title}</p>
      <ul className="space-y-2 text-[16px]">{links.map(([l, to]) => <li key={to}><Link to={to} className="text-ink-soft hover:text-sage">{l}</Link></li>)}</ul>
    </div>
  )
}

export function ProposalBadge() {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-30 hidden md:block">
      <span className="pointer-events-auto rounded-[2px] border border-linen bg-ivory/90 px-3 py-1.5 text-[14px] text-ink-mute backdrop-blur">Proposed redesign · interactive mockup · demo data</span>
    </div>
  )
}
