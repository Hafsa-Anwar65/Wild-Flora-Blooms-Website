import { useEffect, useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { categories, products } from '../data'
import { ProductCard, QuickShop } from '../components/ProductCard'
import { Photo, Link } from '../components/ui'
import { useStore } from '../store'

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price, low to high' },
  { id: 'price-desc', label: 'Price, high to low' },
  { id: 'name', label: 'Name, A–Z' },
]

export default function Shop() {
  const { route, go } = useStore()
  const cat = route.startsWith('shop-') ? route.slice(5) : 'all'
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('featured')
  const [inStock, setInStock] = useState(false)
  const [quick, setQuick] = useState(null)
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => { const on = (e) => setQ(e.detail || ''); window.addEventListener('wfb-search', on); return () => window.removeEventListener('wfb-search', on) }, [])

  const list = useMemo(() => {
    let l = products.filter((p) => (cat === 'all' || p.category === cat))
    if (inStock) l = l.filter((p) => p.stock !== 'out')
    const t = q.trim().toLowerCase()
    if (t) l = l.filter((p) => (p.name + ' ' + p.short + ' ' + p.description).toLowerCase().includes(t))
    const price = (p) => p.sizes[0].price
    if (sort === 'price-asc') l = [...l].sort((a, b) => price(a) - price(b))
    if (sort === 'price-desc') l = [...l].sort((a, b) => price(b) - price(a))
    if (sort === 'name') l = [...l].sort((a, b) => a.name.localeCompare(b.name))
    return l
  }, [cat, q, sort, inStock])

  const current = categories.find((c) => c.id === cat)
  const setCat = (id) => go(id === 'all' ? 'shop' : `shop-${id}`)

  return (
    <div>
      {/* Header band changes with the category */}
      <section className="bg-ivory-deep">
        <div className="wrap grid items-end gap-8 pb-10 pt-12 md:grid-cols-12 md:pb-14 md:pt-16">
          <div className="md:col-span-7">
            <p className="text-[15px] text-ink-mute"><Link to="home" className="link-u">Home</Link> / <Link to="shop" className="link-u">Shop</Link>{current && <> / {current.name}</>}</p>
            <h1 className="mt-4 wf-h1">{current ? current.name : 'Flowers & flower delivery, Coogee and Perth'}</h1>
            <p className="mt-4 max-w-[52ch] text-[19px] text-ink-soft">{current ? current.blurb + '.' : 'Bouquets, natives, orchids and seasonal things, designed in the studio and delivered by hand.'} Prices are illustrative for this mockup.</p>
          </div>
          <Photo k={current ? current.photo : 's1'} caption={false} className="hidden aspect-[16/9] md:col-span-5 md:block" />
        </div>
      </section>

      {/* Toolbar */}
      <div className="sticky top-16 z-30 border-b border-linen bg-ivory/95 backdrop-blur lg:top-[68px]">
        <div className="wrap flex items-center gap-4 py-3">
          <div className="no-scrollbar -mx-1 hidden flex-1 gap-1 overflow-x-auto md:flex" role="tablist" aria-label="Categories">
            {[{ id: 'all', name: 'All' }, ...categories].map((c) => (
              <button key={c.id} role="tab" aria-selected={cat === c.id} onClick={() => setCat(c.id)}
                className={`h-9 shrink-0 rounded-[2px] px-3.5 text-[16px] ${cat === c.id ? 'bg-forest text-ivory' : 'text-ink-soft hover:bg-forest/5'}`}>{c.name}</button>
            ))}
          </div>
          <button onClick={() => setFiltersOpen(true)} className="flex h-10 items-center gap-2 rounded-[2px] border border-linen px-3 text-[16px] md:hidden"><SlidersHorizontal size={16} strokeWidth={1.5} /> Filter & sort</button>
          <span className="text-[15px] text-ink-mute md:hidden">{list.length} items</span>
          <div className="ml-auto hidden items-center gap-4 md:flex">
            <label className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the shop" className="h-9 w-48 rounded-[2px] border border-linen bg-white/60 pl-9 pr-3 text-[16px] focus:border-forest focus:outline-none lg:w-56" />
            </label>
            <label className="flex items-center gap-2 text-[16px] text-ink-soft"><input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="accent-forest" /> Available now</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-9 rounded-[2px] border border-linen bg-white/60 px-2 text-[16px] focus:border-forest focus:outline-none" aria-label="Sort">
              {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Mobile filter sheet */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-label="Filter and sort">
          <div className="fade-in absolute inset-0 bg-black/35" onClick={() => setFiltersOpen(false)} />
          <div className="fade-in absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[10px] bg-ivory px-5 pb-8 pt-5">
            <div className="mb-5 flex items-center justify-between"><p className="font-serif text-[24px]">Filter & sort</p><button onClick={() => setFiltersOpen(false)} aria-label="Close" className="p-2"><X size={20} /></button></div>
            <label className="relative block"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the shop" className="field pl-9" /></label>
            <p className="label mt-6">Category</p>
            <div className="flex flex-wrap gap-2">
              {[{ id: 'all', name: 'All' }, ...categories].map((c) => (
                <button key={c.id} onClick={() => setCat(c.id)} className={`h-10 rounded-[2px] border px-3.5 text-[16px] ${cat === c.id ? 'border-forest bg-forest text-ivory' : 'border-linen'}`}>{c.name}</button>
              ))}
            </div>
            <p className="label mt-6">Sort by</p>
            <div className="divide-y divide-linen border-y border-linen">
              {SORTS.map((s) => <label key={s.id} className="flex items-center justify-between py-3 text-[17px]">{s.label}<input type="radio" name="sort" checked={sort === s.id} onChange={() => setSort(s.id)} className="accent-forest" /></label>)}
            </div>
            <label className="mt-6 flex items-center justify-between text-[17px]">Only show available now<input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="h-5 w-5 accent-forest" /></label>
            <button onClick={() => setFiltersOpen(false)} className="mt-8 h-12 w-full rounded-[2px] bg-forest text-ivory">Show {list.length} items</button>
          </div>
        </div>
      )}

      {/* Grid with editorial rhythm: every 5th item takes a wider slot */}
      <section className="wrap py-12 md:py-16">
        {q && <p className="mb-6 text-[17px] text-ink-soft">{list.length} results for “{q}” <button className="ml-2 text-forest link-u" onClick={() => setQ('')}>Clear</button></p>}
        {list.length === 0 ? (
          <div className="max-w-[44ch] py-16">
            <p className="font-serif text-[28px] text-forest">Nothing here just now.</p>
            <p className="mt-2 text-ink-soft">Try another category or clear your search. For something specific, <Link to="contact" className="link-u text-forest">ask us about a custom order</Link>.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-6 md:gap-x-6 md:gap-y-16">
            {list.map((p, i) => {
              const wide = list.length > 4 && i % 7 === 4
              return (
                <div key={p.id} className={wide ? 'col-span-2 md:col-span-4' : 'col-span-1 md:col-span-2'}>
                  <ProductCard p={p} ratio={wide ? '16/10' : '4/5'} large={wide} onQuick={setQuick} />
                </div>
              )
            })}
          </div>
        )}
      </section>
      <QuickShop p={quick} onClose={() => setQuick(null)} />
    </div>
  )
}
