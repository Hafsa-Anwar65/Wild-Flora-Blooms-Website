import { Camera, Info } from 'lucide-react'
import { photos } from '../data'
import { useStore } from '../store'

// Seeded random so each placeholder plate is stable.
function rng(seed) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619) }
  return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 10000) / 10000 }
}

function plateStyle(key) {
  const p = photos[key] || photos.hero
  const r = rng(key)
  const [base, ...rest] = p.tones
  const layers = []
  // soft out-of-focus blooms
  for (let i = 0; i < 7; i++) {
    const c = rest[i % rest.length]
    const x = Math.round(r() * 100), y = Math.round(10 + r() * 80)
    const w = Math.round(28 + r() * 46), h = Math.round(w * (0.7 + r() * 0.6))
    const a = (0.55 + r() * 0.4).toFixed(2)
    layers.push(`radial-gradient(${w}% ${h}% at ${x}% ${y}%, ${c} 0%, ${c}${Math.round(a * 120).toString(16).padStart(2, '0')} 32%, transparent 70%)`)
  }
  // light from one side + gentle vignette
  const side = r() > 0.5 ? 'left' : 'right'
  layers.unshift(`linear-gradient(to ${side}, rgba(255,250,240,.28), transparent 55%)`)
  layers.unshift(`radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(20,24,18,.28) 100%)`)
  return { backgroundColor: base, backgroundImage: layers.join(','), filter: 'saturate(.92)' }
}

/** Photo: shows the studio photograph when `src` is set, otherwise an art-directed tonal plate with the shot brief. */
export function Photo({ k, className = '', caption = true, ratio, children, alt }) {
  const p = photos[k] || {}
  return (
    <div className={`relative overflow-hidden bg-linen ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      {p.src ? (
        <img src={p.src} alt={alt || p.shot} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      ) : (
        <div role="img" aria-label={alt || `Photograph placeholder: ${p.shot}`} className="grain absolute inset-0" style={plateStyle(k)} />
      )}
      {!p.src && caption && (
        <span className="pointer-events-none absolute left-3 top-3 z-[1] inline-flex max-w-[85%] items-center gap-1.5 rounded-[2px] bg-ivory/80 px-2 py-1 text-[11px] leading-tight text-ink-soft backdrop-blur-[2px]">
          <Camera size={12} strokeWidth={1.6} className="shrink-0" /> <span className="truncate">{p.shot}</span>
        </span>
      )}
      {children}
    </div>
  )
}

export function Button({ as = 'button', variant = 'primary', size = 'md', className = '', children, ...rest }) {
  const Tag = as
  const v = {
    primary: 'bg-forest text-ivory hover:bg-forest-deep',
    light: 'bg-ivory text-forest hover:bg-white',
    outline: 'border border-forest/70 text-forest hover:bg-forest hover:text-ivory',
    outlineLight: 'border border-ivory/70 text-ivory hover:bg-ivory hover:text-forest',
    ghost: 'text-forest hover:bg-forest/5',
    rose: 'bg-rose-deep text-ivory hover:bg-[#956659]',
  }[variant]
  const s = { sm: 'h-9 px-4 text-[14px]', md: 'h-12 px-6 text-[15px]', lg: 'h-14 px-8 text-[16px]' }[size]
  return (
    <Tag className={`inline-flex items-center justify-center gap-2 rounded-[2px] font-medium tracking-[0.01em] transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${v} ${s} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

/** Information the studio still needs to confirm. */
export function Ph({ children }) {
  return <span className="whitespace-nowrap rounded-[2px] border border-dashed border-current px-1.5 py-[1px] text-[0.92em] opacity-75">{children}</span>
}

export function DemoNote({ children, className = '', tone = 'sage' }) {
  const t = tone === 'dark' ? 'bg-forest-soft/40 text-ivory/90 border-ivory/20' : 'bg-sage-pale text-ink-soft border-sage-light'
  return (
    <div className={`flex items-start gap-2.5 rounded-[3px] border px-3.5 py-2.5 text-[13px] leading-snug ${t} ${className}`}>
      <Info size={15} strokeWidth={1.7} className="mt-[1px] shrink-0" />
      <div>{children}</div>
    </div>
  )
}

export function Field({ label, error, hint, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="label">{label}</span>
      {children}
      {error ? <span className="mt-1.5 block text-[13px] text-clay">{error}</span> : hint ? <span className="mt-1.5 block text-[13px] text-ink-mute">{hint}</span> : null}
    </label>
  )
}

export function Stock({ stock }) {
  if (stock === 'out') return <span className="text-[13px] text-clay">Sold out this week</span>
  if (stock === 'low') return <span className="text-[13px] text-rose-deep">Only a few left</span>
  return <span className="text-[13px] text-sage">Available</span>
}

export function Qty({ value, onChange, min = 1, max = 20, small }) {
  const h = small ? 'h-8' : 'h-12'
  return (
    <div className={`inline-flex ${h} items-center rounded-[2px] border border-linen bg-white/60`}>
      <button type="button" aria-label="Decrease quantity" onClick={() => onChange(Math.max(min, value - 1))} className={`${small ? 'w-8' : 'w-11'} h-full text-lg text-ink-soft hover:text-forest disabled:opacity-30`} disabled={value <= min}>−</button>
      <span className={`${small ? 'w-6 text-[14px]' : 'w-8'} text-center tabular-nums`} aria-live="polite">{value}</span>
      <button type="button" aria-label="Increase quantity" onClick={() => onChange(Math.min(max, value + 1))} className={`${small ? 'w-8' : 'w-11'} h-full text-lg text-ink-soft hover:text-forest disabled:opacity-30`} disabled={value >= max}>+</button>
    </div>
  )
}

export function Link({ to, className = '', children, ...rest }) {
  const { go } = useStore()
  return <a href={`#${to}`} onClick={(e) => { e.preventDefault(); go(to) }} className={className} {...rest}>{children}</a>
}

export function PageIntro({ kicker, title, children, tone = 'ivory' }) {
  return (
    <div className={tone === 'sage' ? 'bg-sage-pale' : tone === 'rose' ? 'bg-rose-pale' : 'bg-ivory-deep'}>
      <div className="wrap pb-12 pt-14 md:pb-16 md:pt-20">
        {kicker && <p className="mb-4 font-serif text-[17px] italic text-ink-soft">{kicker}</p>}
        <h1 className="max-w-[18ch] text-h1 text-forest">{title}</h1>
        {children && <div className="mt-5 max-w-[58ch] text-[17px] text-ink-soft">{children}</div>}
      </div>
    </div>
  )
}
