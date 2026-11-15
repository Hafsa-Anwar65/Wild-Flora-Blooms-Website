import { useState } from 'react'
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
export function Photo({ k, className = '', caption = true, ratio, children, alt, position }) {
  const p = photos[k] || {}
  const [failed, setFailed] = useState(false)
  const show = p.src && !failed
  return (
    <div className={`relative overflow-hidden bg-linen ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      {show ? (
        <img src={p.src} alt={alt || p.alt || p.shot} onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover" style={position || p.pos ? { objectPosition: position || p.pos } : undefined} loading="lazy" />
      ) : (
        <div role="img" aria-label={alt || `Photograph placeholder: ${p.shot}`} className="grain absolute inset-0" style={plateStyle(k)} />
      )}
      {false && caption && (
        <span className="pointer-events-none absolute left-3 top-3 z-[1] inline-flex max-w-[85%] items-center gap-1.5 rounded-[2px] bg-ivory/80 px-2 py-1 text-[13px] leading-tight text-ink-soft backdrop-blur-[2px]">
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
    primary: 'bg-sage text-white hover:bg-forest-deep',
    light: 'bg-ivory text-ink hover:bg-white',
    outline: 'border border-sage text-ink hover:bg-sage hover:text-white',
    outlineLight: 'border border-white/90 text-white hover:bg-white hover:text-ink',
    ghost: 'text-ink-soft hover:bg-sage/10',
    rose: 'bg-sage text-white hover:bg-forest-deep',
  }[variant]
  const s = { sm: 'h-10 px-5 text-[17px]', md: 'h-[46px] px-7 text-[18px]', lg: 'h-[50px] px-9 text-[19px]' }[size]
  return (
    <Tag className={`inline-flex items-center justify-center gap-2 rounded-[10px] font-serif italic tracking-[0.06em] transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${v} ${s} ${className}`} {...rest}>
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
    <div className={`flex items-start gap-2.5 rounded-[3px] border px-3.5 py-2.5 text-[15px] leading-snug ${t} ${className}`}>
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
      {error ? <span className="mt-1.5 block text-[15px] text-clay">{error}</span> : hint ? <span className="mt-1.5 block text-[15px] text-ink-mute">{hint}</span> : null}
    </label>
  )
}

export function Stock({ stock }) {
  if (stock === 'out') return <span className="text-[15px] italic text-clay">Sold out this week</span>
  if (stock === 'low') return <span className="text-[15px] italic text-rose-deep">Only a few left</span>
  return <span className="text-[15px] italic text-forest-deep">Available</span>
}

export function Qty({ value, onChange, min = 1, max = 20, small }) {
  const h = small ? 'h-8' : 'h-12'
  return (
    <div className={`inline-flex ${h} items-center rounded-[2px] border border-linen bg-white/60`}>
      <button type="button" aria-label="Decrease quantity" onClick={() => onChange(Math.max(min, value - 1))} className={`${small ? 'w-8' : 'w-11'} h-full text-lg text-ink-soft hover:text-forest disabled:opacity-30`} disabled={value <= min}>−</button>
      <span className={`${small ? 'w-6 text-[16px]' : 'w-8'} text-center tabular-nums`} aria-live="polite">{value}</span>
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
      <div className="wrap pb-12 pt-14 text-center md:pb-16 md:pt-20">
        {kicker && <p className="mb-4 font-serif text-[19px] italic text-ink-soft">{kicker}</p>}
        <h1 className="wf-h1">{title}</h1>
        {children && <div className="wf-lead mx-auto mt-5 max-w-[60ch] text-[19px]">{children}</div>}
      </div>
    </div>
  )
}
