import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { Photo, Button, Link, Stock, Qty } from './ui'
import { useStore } from '../store'
import { fmt } from '../data'

export function ProductCard({ p, ratio = '4/5', large = false, onQuick }) {
  return (
    <article className="group">
      <div className="relative">
        <Link to={`product-${p.id}`} aria-label={p.name}>
          <Photo k={p.photo} caption={large} ratio={ratio} className="transition-[filter] duration-500 group-hover:brightness-[1.03]" />
        </Link>
        {p.stock === 'out' && <span className="absolute left-3 top-3 rounded-[2px] bg-ivory px-2 py-1 text-[14px] text-clay">Sold out</span>}
        {p.stock !== 'out' && onQuick && (
          <button onClick={() => onQuick(p)} className="absolute bottom-3 right-3 flex h-10 items-center gap-1.5 rounded-[2px] bg-ivory/95 px-3 text-[15px] text-forest opacity-100 shadow-sm transition-opacity hover:bg-white md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100">
            <Plus size={15} strokeWidth={1.6} /><span className="hidden sm:inline">Quick shop</span>
          </button>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
        <h3 className={`${large ? 'text-[24px] sm:text-[26px]' : 'text-[20px] sm:text-[21px]'} font-serif italic leading-tight tracking-[0.04em]`}><Link to={`product-${p.id}`} className="link-u">{p.name}</Link></h3>
        <p className="shrink-0 text-[17px] tabular-nums text-ink">{p.sizes.length > 1 ? 'from ' : ''}{fmt(p.sizes[0].price)}</p>
      </div>
      <p className={`mt-1.5 text-[16.5px] leading-relaxed text-ink-soft ${large ? 'max-w-[44ch]' : ''}`}>{p.short}</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-ink-mute">
        {p.sizes.length > 1 && <span>{p.sizes.map((s) => s.label).join(' / ')}</span>}
        <Stock stock={p.stock} />
      </div>
    </article>
  )
}

export function QuickShop({ p, onClose }) {
  const { add } = useStore()
  const [size, setSize] = useState(0)
  const [qty, setQty] = useState(1)
  if (!p) return null
  const s = p.sizes[size]
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center md:items-center" role="dialog" aria-modal="true" aria-label={`Quick shop: ${p.name}`}>
      <div className="fade-in absolute inset-0 bg-black/35" onClick={onClose} />
      <div className="fade-in relative grid w-full max-w-[820px] bg-ivory md:grid-cols-2">
        <Photo k={p.photo} className="hidden md:block" ratio="4/5" />
        <div className="flex flex-col p-6 md:p-8">
          <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 p-2"><X size={20} strokeWidth={1.5} /></button>
          <p className="text-[15px] text-ink-mute">{p.tag}</p>
          <h3 className="mt-1 text-[30px] leading-tight text-forest">{p.name}</h3>
          <p className="mt-1 text-[18px] tabular-nums">{fmt(s.price)}</p>
          <p className="mt-4 text-[17px] text-ink-soft">{p.short}</p>
          {p.sizes.length > 1 && (
            <fieldset className="mt-6">
              <legend className="label">Size</legend>
              <div className="flex flex-wrap gap-2">
                {p.sizes.map((x, i) => (
                  <button key={x.label} type="button" onClick={() => setSize(i)} aria-pressed={i === size}
                    className={`h-11 rounded-[2px] border px-4 text-[16px] ${i === size ? 'border-forest bg-forest text-ivory' : 'border-linen bg-white/60 hover:border-forest'}`}>
                    {x.label} <span className="opacity-70">· {fmt(x.price)}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          )}
          <div className="mt-6 flex items-center gap-3">
            <Qty value={qty} onChange={setQty} />
            <Button className="flex-1" onClick={() => { add({ productId: p.id, size: s.label, price: s.price, qty, options: { fulfil: 'delivery' } }); onClose() }}>Add to bag</Button>
          </div>
          <Link to={`product-${p.id}`} onClick={onClose} className="mt-5 text-[16px] text-ink-soft link-u self-start">View full details and personalise</Link>
        </div>
      </div>
    </div>
  )
}
