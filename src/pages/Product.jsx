import { useEffect, useState } from 'react'
import { Truck, Store, Leaf, ChevronDown } from 'lucide-react'
import { products, addOns, categories, fmt, fmt2, storeConfig } from '../data'
import { Photo, Button, Link, Qty, Stock, Ph, DemoNote } from '../components/ui'
import { ProductCard } from '../components/ProductCard'
import { useStore } from '../store'

export default function Product() {
  const { route, add } = useStore()
  const id = route.replace('product-', '')
  const p = products.find((x) => x.id === id) || products[0]
  const cat = categories.find((c) => c.id === p.category)
  const [img, setImg] = useState(0)
  const [size, setSize] = useState(Math.min(1, p.sizes.length - 1))
  const [qty, setQty] = useState(1)
  const [extras, setExtras] = useState([])
  const [message, setMessage] = useState('')
  const [fulfil, setFulfil] = useState('delivery')
  const [palette, setPalette] = useState('Florist’s choice')
  useEffect(() => { setImg(0); setSize(Math.min(1, p.sizes.length - 1)); setQty(1); setExtras([]); setMessage('') }, [p.id])

  const s = p.sizes[size]
  const extraCost = extras.reduce((t, e) => t + e.price, 0)
  const total = (s.price + extraCost) * qty
  const sold = p.stock === 'out'
  const isPlant = p.category === 'plants'
  const related = products.filter((x) => x.id !== p.id && (x.category === p.category || x.category === 'everyday')).slice(0, 4)

  const toggle = (a) => setExtras((x) => (x.find((e) => e.id === a.id) ? x.filter((e) => e.id !== a.id) : [...x, a]))
  const onAdd = () => add({ productId: p.id, size: s.label, price: s.price, qty, options: { addOns: extras.filter((e) => e.price > 0), message, fulfil, palette: isPlant ? undefined : palette } })

  return (
    <div>
      <div className="wrap pt-6 text-[13px] text-ink-mute md:pt-8">
        <Link to="shop" className="link-u">Shop</Link> / <Link to={`shop-${p.category}`} className="link-u">{cat?.name}</Link> / <span className="text-ink-soft">{p.name}</span>
      </div>
      <section className="wrap grid gap-10 pb-20 pt-6 md:grid-cols-12 md:gap-10 lg:gap-16">
        {/* Gallery */}
        <div className="md:col-span-7">
          <div className="md:sticky md:top-[150px]">
            <div className="no-scrollbar -mx-5 flex snap-x scroll-pl-5 md:scroll-pl-0 snap-mandatory overflow-x-auto md:hidden">
              {p.gallery.map((g) => <Photo key={g} k={g} ratio="4/5" className="w-full shrink-0 snap-center" />)}
            </div>
            <p className="mt-2 text-center text-[12px] text-ink-mute md:hidden">Swipe for more photos · {p.gallery.length}</p>
            <div className="hidden gap-4 md:grid md:grid-cols-[84px_1fr]">
              <div className="flex flex-col gap-3">
                {p.gallery.map((g, i) => (
                  <button key={g} onClick={() => setImg(i)} aria-label={`Photo ${i + 1}`} className={`border ${i === img ? 'border-forest' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                    <Photo k={g} caption={false} ratio="4/5" />
                  </button>
                ))}
              </div>
              <Photo k={p.gallery[img]} ratio="4/5" />
            </div>
          </div>
        </div>

        {/* Buy box */}
        <div className="md:col-span-5">
          <p className="text-[13px] text-ink-mute">{p.tag}</p>
          <h1 className="mt-2 text-h1 text-forest">{p.name}</h1>
          <div className="mt-3 flex items-center gap-4"><p className="text-[22px] tabular-nums">{fmt(s.price)}</p><Stock stock={p.stock} /></div>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">{p.description}</p>

          {p.sizes.length > 1 && (
            <fieldset className="mt-8">
              <legend className="label">Size</legend>
              <div className="grid grid-cols-3 gap-2">
                {p.sizes.map((x, i) => (
                  <button key={x.label} type="button" onClick={() => setSize(i)} aria-pressed={i === size}
                    className={`flex flex-col items-center justify-center rounded-[2px] border px-2 py-3 text-[14px] ${i === size ? 'border-forest bg-forest text-ivory' : 'border-linen bg-white/60 hover:border-forest'}`}>
                    <span>{x.label}</span><span className="text-[13px] opacity-75">{fmt(x.price)}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {!isPlant && p.category !== 'christmas' && (
            <fieldset className="mt-6">
              <legend className="label">Colour palette</legend>
              <select value={palette} onChange={(e) => setPalette(e.target.value)} className="field">
                {['Florist’s choice', 'Soft whites & green', 'Blush & pastel', 'Warm & bright', 'Natives & earthy tones'].map((o) => <option key={o}>{o}</option>)}
              </select>
            </fieldset>
          )}

          <fieldset className="mt-6">
            <legend className="label">Add a little extra</legend>
            <div className="space-y-2">
              {addOns.map((a) => (
                <label key={a.id} className="flex items-center justify-between rounded-[2px] border border-linen bg-white/50 px-4 py-3 text-[15px]">
                  <span className="flex items-center gap-3"><input type="checkbox" className="h-4 w-4 accent-forest" checked={!!extras.find((e) => e.id === a.id)} onChange={() => toggle(a)} />{a.label}</span>
                  <span className="text-ink-mute">{a.price ? `+${fmt(a.price)}` : 'Free'}</span>
                </label>
              ))}
            </div>
            {extras.find((e) => e.id === 'card') && (
              <div className="mt-3">
                <textarea value={message} onChange={(e) => setMessage(e.target.value.slice(0, 200))} rows={3} placeholder="Happy birthday, Ellie — love from all of us." className="field resize-none font-serif text-[16px] italic" />
                <p className="mt-1 text-right text-[12px] text-ink-mute">{message.length}/200 · hand-written by us</p>
              </div>
            )}
          </fieldset>

          <fieldset className="mt-6">
            <legend className="label">How would you like it?</legend>
            <div className="grid grid-cols-2 gap-2">
              {[{ id: 'delivery', icon: Truck, t: 'Delivery', d: 'Choose a date at checkout' }, { id: 'collect', icon: Store, t: 'Collect', d: 'From the studio' }].map((o) => (
                <button key={o.id} type="button" onClick={() => setFulfil(o.id)} aria-pressed={fulfil === o.id}
                  className={`flex items-start gap-3 rounded-[2px] border p-3.5 text-left ${fulfil === o.id ? 'border-forest bg-white' : 'border-linen bg-white/50 hover:border-forest/50'}`}>
                  <o.icon size={18} strokeWidth={1.5} className="mt-0.5 text-forest" /><span><span className="block text-[15px]">{o.t}</span><span className="text-[12.5px] text-ink-mute">{o.d}</span></span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="sticky bottom-0 -mx-5 mt-8 flex items-center gap-3 border-t border-linen bg-ivory/95 px-5 py-3 backdrop-blur md:static md:mx-0 md:border-0 md:bg-transparent md:p-0">
            <Qty value={qty} onChange={setQty} />
            <Button className="flex-1" size="md" disabled={sold} onClick={onAdd}>{sold ? 'Sold out this week' : `Add to bag · ${fmt2(total)}`}</Button>
          </div>

          <p className="mt-4 text-[13.5px] text-ink-mute">Order by <Ph>{storeConfig.cutoffTime || 'cut-off time'}</Ph> for same-day delivery on <Ph>{storeConfig.deliveryDays || 'delivery days'}</Ph>.</p>

          <div className="mt-8 divide-y divide-linen border-y border-linen">
            <Accordion title="Delivery & collection" open>
              <p>Hand-delivered by the studio across our delivery area <Ph>suburbs / zones to confirm</Ph>. Delivery fees are shown at checkout. Collection is free from <Ph>studio address</Ph>.</p>
            </Accordion>
            <Accordion title={isPlant ? 'Plant care' : 'Caring for your flowers'}>
              <p>{isPlant ? 'Bright, indirect light. Water lightly once a week and let the top of the potting mix dry between waterings. A care card comes with every plant.' : 'Trim the stems on an angle, use a clean vase with fresh water and change it every two days. Keep away from fruit bowls and direct sun.'}</p>
            </Accordion>
            <Accordion title="Every arrangement is a little different">
              <p className="flex gap-2"><Leaf size={16} strokeWidth={1.5} className="mt-1 shrink-0 text-sage" />We design with what’s best at market, so stems and colours may vary from the photographs while keeping the same style, size and value.</p>
            </Accordion>
          </div>
        </div>
      </section>

      <section className="border-t border-linen bg-ivory-deep">
        <div className="wrap py-16 md:py-20">
          <h2 className="text-h2 text-forest">You might also like</h2>
          <div className="no-scrollbar -mx-5 mt-8 flex gap-5 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-4 md:px-0">
            {related.map((r) => <div key={r.id} className="w-[64vw] max-w-[280px] shrink-0 md:w-auto md:max-w-none"><ProductCard p={r} /></div>)}
          </div>
        </div>
      </section>
    </div>
  )
}

function Accordion({ title, open: initial = false, children }) {
  const [open, setOpen] = useState(initial)
  return (
    <div>
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between py-4 text-left text-[15px]">
        {title}<ChevronDown size={17} strokeWidth={1.5} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-5 text-[14.5px] leading-relaxed text-ink-soft">{children}</div>}
    </div>
  )
}
