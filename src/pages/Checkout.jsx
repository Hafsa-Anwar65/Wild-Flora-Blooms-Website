import { useMemo, useState } from 'react'
import { Truck, Store, Lock, CreditCard, Check, CalendarDays } from 'lucide-react'
import { storeConfig, fmt2 } from '../data'
import { Photo, Button, Field, Ph, DemoNote, Link } from '../components/ui'
import { useStore } from '../store'

const today = new Date()
const iso = (d) => d.toISOString().slice(0, 10)

export default function Checkout() {
  const { cart, subtotal, clear, go } = useStore()
  const hasPhysical = cart.some((l) => l.kind !== 'voucher')
  const [f, setF] = useState({ name: '', email: '', phone: '', fulfil: 'delivery', recipient: '', address: '', suburb: '', postcode: '', date: '', notes: '', cardMsg: '', pay: 'card', agree: false })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(null)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  const delivery = hasPhysical && f.fulfil === 'delivery' ? storeConfig.deliveryFeeDemo : 0
  const total = subtotal + delivery
  const minDate = useMemo(() => iso(today), [])

  const validate = () => {
    const e = {}
    if (!f.name.trim()) e.name = 'Enter your full name'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email so we can send your receipt'
    if (!/^[\d\s+()-]{8,}$/.test(f.phone)) e.phone = 'Enter a phone number we can call about the order'
    if (hasPhysical) {
      if (!f.date) e.date = f.fulfil === 'delivery' ? 'Choose a delivery date' : 'Choose a collection date'
      else if (f.date < minDate) e.date = 'Choose today or a later date'
      if (f.fulfil === 'delivery') {
        if (!f.recipient.trim()) e.recipient = 'Who are the flowers for?'
        if (!f.address.trim()) e.address = 'Enter a street address'
        if (!f.suburb.trim()) e.suburb = 'Enter a suburb'
        if (!/^\d{4}$/.test(f.postcode)) e.postcode = 'Enter a 4-digit postcode'
      }
    }
    if (!f.agree) e.agree = 'Please accept the terms to continue'
    setErrors(e)
    if (Object.keys(e).length) { setTimeout(() => document.querySelector('[data-err="1"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 10) }
    return !Object.keys(e).length
  }

  const submit = (e) => { e.preventDefault(); if (!validate()) return; setDone({ no: 'WFB-' + Math.floor(10000 + Math.random() * 89999), email: f.email, date: f.date, fulfil: f.fulfil, total }); clear(); window.scrollTo({ top: 0 }) }

  if (done) return (
    <section className="wrap max-w-[760px] py-20 md:py-28">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-sage-pale text-forest"><Check size={22} /></span>
      <h1 className="mt-6 text-h1 text-forest">Thank you — your order is in.</h1>
      <p className="mt-4 text-[17px] text-ink-soft">Order <strong className="font-medium text-ink">{done.no}</strong> · {fmt2(done.total)}. A confirmation would be emailed to {done.email}.{done.date && <> {done.fulfil === 'delivery' ? 'Delivery' : 'Collection'} on {new Date(done.date + 'T00:00').toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' })}.</>}</p>
      <DemoNote className="mt-8">This is a demo confirmation. No payment was taken and no email was sent — the payment gateway and order emails are placeholders in this mockup.</DemoNote>
      <Button className="mt-8" onClick={() => go('shop')}>Back to the shop</Button>
    </section>
  )

  if (cart.length === 0) return (
    <section className="wrap max-w-[760px] py-24">
      <h1 className="text-h1 text-forest">Your bag is empty.</h1>
      <p className="mt-3 text-ink-soft">Add something from the shop and come back to check out.</p>
      <Button className="mt-8" onClick={() => go('shop')}>Shop flowers</Button>
    </section>
  )

  const E = (k) => (errors[k] ? { 'data-err': '1' } : {})
  const cls = (k) => `field ${errors[k] ? 'field-err' : ''}`

  return (
    <form onSubmit={submit} noValidate>
      <div className="wrap pb-4 pt-10 md:pt-14">
        <p className="text-[13px] text-ink-mute"><Link to="shop" className="link-u">Shop</Link> / Checkout</p>
        <h1 className="mt-3 text-h1 text-forest">Checkout</h1>
      </div>
      <div className="wrap grid gap-12 pb-24 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-12 lg:col-span-7">
          <Section n="1" title="Your details">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" error={errors.name} className="sm:col-span-2"><input {...E('name')} value={f.name} onChange={set('name')} className={cls('name')} autoComplete="name" /></Field>
              <Field label="Email" error={errors.email}><input {...E('email')} type="email" value={f.email} onChange={set('email')} className={cls('email')} autoComplete="email" /></Field>
              <Field label="Phone" error={errors.phone}><input {...E('phone')} type="tel" value={f.phone} onChange={set('phone')} className={cls('phone')} autoComplete="tel" placeholder="04XX XXX XXX" /></Field>
            </div>
          </Section>

          {hasPhysical && (
            <Section n="2" title="Delivery or collection">
              <div className="grid gap-3 sm:grid-cols-2">
                {[{ id: 'delivery', icon: Truck, t: 'Delivery', d: `${fmt2(storeConfig.deliveryFeeDemo)} demo rate` }, { id: 'collect', icon: Store, t: 'Collect from the studio', d: 'Free' }].map((o) => (
                  <label key={o.id} className={`flex cursor-pointer items-start gap-3 rounded-[2px] border p-4 ${f.fulfil === o.id ? 'border-forest bg-white' : 'border-linen bg-white/50'}`}>
                    <input type="radio" name="fulfil" className="mt-1 accent-forest" checked={f.fulfil === o.id} onChange={() => setF({ ...f, fulfil: o.id })} />
                    <o.icon size={19} strokeWidth={1.5} className="mt-0.5 text-forest" />
                    <span><span className="block text-[15px]">{o.t}</span><span className="text-[13px] text-ink-mute">{o.d}</span></span>
                  </label>
                ))}
              </div>
              {f.fulfil === 'delivery' ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-6">
                  <Field label="Recipient’s name" error={errors.recipient} className="sm:col-span-6"><input {...E('recipient')} value={f.recipient} onChange={set('recipient')} className={cls('recipient')} /></Field>
                  <Field label="Street address" error={errors.address} className="sm:col-span-6"><input {...E('address')} value={f.address} onChange={set('address')} className={cls('address')} autoComplete="street-address" /></Field>
                  <Field label="Suburb" error={errors.suburb} className="sm:col-span-3"><input {...E('suburb')} value={f.suburb} onChange={set('suburb')} className={cls('suburb')} /></Field>
                  <Field label="State" className="sm:col-span-1"><input value="WA" readOnly className="field bg-ivory-deep text-ink-mute" /></Field>
                  <Field label="Postcode" error={errors.postcode} className="sm:col-span-2"><input {...E('postcode')} inputMode="numeric" maxLength={4} value={f.postcode} onChange={set('postcode')} className={cls('postcode')} /></Field>
                </div>
              ) : (
                <p className="mt-5 text-[15px] text-ink-soft">Collect from <Ph>studio address</Ph> during <Ph>collection hours</Ph>. We’ll text when your order is ready.</p>
              )}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label={f.fulfil === 'delivery' ? 'Delivery date' : 'Collection date'} error={errors.date}>
                  <div className="relative"><CalendarDays size={17} strokeWidth={1.5} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-mute" /><input {...E('date')} type="date" min={minDate} value={f.date} onChange={set('date')} className={cls('date')} /></div>
                </Field>
                <div className="self-end pb-1 text-[13.5px] leading-snug text-ink-mute">Same-day orders close at <Ph>{storeConfig.cutoffTime || 'cut-off time'}</Ph>. Delivery days: <Ph>{storeConfig.deliveryDays || 'to confirm'}</Ph>.</div>
              </div>
              <DemoNote className="mt-5">Cut-off times, delivery days, zones and fees are configurable store settings. The values here are placeholders for the studio to confirm.</DemoNote>
            </Section>
          )}

          <Section n={hasPhysical ? '3' : '2'} title="Notes">
            <div className="grid gap-4">
              <Field label="Message for the card (optional)" hint="We write every card by hand."><textarea value={f.cardMsg} onChange={set('cardMsg')} rows={2} className="field resize-none font-serif italic" /></Field>
              <Field label="Order notes (optional)" hint="Gate codes, where to leave flowers, or anything we should know."><textarea value={f.notes} onChange={set('notes')} rows={2} className="field resize-none" /></Field>
            </div>
          </Section>

          <Section n={hasPhysical ? '4' : '3'} title="Payment">
            <div className="space-y-3">
              {[{ id: 'card', t: 'Credit or debit card', d: 'Visa, Mastercard, Amex' }, { id: 'wallet', t: 'Apple Pay / Google Pay', d: 'If enabled in the payment gateway' }].map((o) => (
                <label key={o.id} className={`flex cursor-pointer items-center gap-3 rounded-[2px] border p-4 ${f.pay === o.id ? 'border-forest bg-white' : 'border-linen bg-white/50'}`}>
                  <input type="radio" name="pay" className="accent-forest" checked={f.pay === o.id} onChange={() => setF({ ...f, pay: o.id })} />
                  <CreditCard size={18} strokeWidth={1.5} className="text-forest" /><span className="text-[15px]">{o.t}</span><span className="ml-auto text-[13px] text-ink-mute">{o.d}</span>
                </label>
              ))}
            </div>
            <div className="mt-4 rounded-[3px] border border-dashed border-sage bg-sage-pale/50 p-6">
              <p className="flex items-center gap-2 text-[15px] text-forest"><Lock size={16} strokeWidth={1.6} /> Payment gateway placeholder</p>
              <p className="mt-2 text-[14px] text-ink-soft">The secure card form from the chosen provider (for example Stripe or Square) would load here. Card details never touch the website itself.</p>
              <div className="mt-4 grid gap-3 opacity-60 sm:grid-cols-[2fr_1fr_1fr]" aria-hidden>
                <div className="h-11 rounded-[2px] border border-linen bg-white px-3 py-3 text-[14px] text-ink-mute">Card number</div>
                <div className="h-11 rounded-[2px] border border-linen bg-white px-3 py-3 text-[14px] text-ink-mute">MM / YY</div>
                <div className="h-11 rounded-[2px] border border-linen bg-white px-3 py-3 text-[14px] text-ink-mute">CVC</div>
              </div>
            </div>
            <label className="mt-5 flex items-start gap-3 text-[14.5px] text-ink-soft" {...E('agree')}>
              <input type="checkbox" checked={f.agree} onChange={set('agree')} className="mt-1 h-4 w-4 accent-forest" />
              <span>I’ve read the <a href="#contact" className="link-u text-forest">terms</a> and understand flowers may vary with the season.{errors.agree && <span className="block text-[13px] text-clay">{errors.agree}</span>}</span>
            </label>
          </Section>
        </div>

        {/* Summary */}
        <aside className="lg:col-span-5">
          <div className="border border-linen bg-ivory-deep p-6 lg:sticky lg:top-[150px] md:p-8">
            <h2 className="font-serif text-[26px] text-forest">Order summary</h2>
            <ul className="mt-6 divide-y divide-linen">
              {cart.map((l) => (
                <li key={l.key} className="flex gap-4 py-4">
                  <div className="relative"><Photo k={l.kind === 'voucher' ? 'voucher' : l.product.photo} caption={false} className="h-[72px] w-[58px]" />
                    <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-forest px-1 text-[11px] text-ivory">{l.qty}</span></div>
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-[17px] leading-tight">{l.kind === 'voucher' ? 'Gift voucher' : l.product.name}</p>
                    <p className="text-[13px] text-ink-mute">{l.kind === 'voucher' ? `For ${l.options.recipient}` : l.size}</p>
                  </div>
                  <p className="tabular-nums">{fmt2(l.total)}</p>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 border-t border-linen pt-4 text-[15px]">
              <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">{fmt2(subtotal)}</dd></div>
              {hasPhysical && <div className="flex justify-between"><dt>{f.fulfil === 'delivery' ? 'Delivery (demo rate)' : 'Collection'}</dt><dd className="tabular-nums">{delivery ? fmt2(delivery) : 'Free'}</dd></div>}
              <div className="flex justify-between border-t border-linen pt-3 font-serif text-[22px]"><dt>Total</dt><dd className="tabular-nums">{fmt2(total)}</dd></div>
              <p className="text-[12.5px] text-ink-mute">Includes GST where applicable. AUD.</p>
            </dl>
            <Button type="submit" size="lg" className="mt-6 w-full"><Lock size={16} /> Place order · {fmt2(total)}</Button>
            <p className="mt-3 text-center text-[12.5px] text-ink-mute">Demo only — no payment will be taken.</p>
          </div>
        </aside>
      </div>
    </form>
  )
}

function Section({ n, title, children }) {
  return (
    <section>
      <h2 className="mb-5 flex items-baseline gap-3 border-b border-linen pb-3 font-serif text-[26px] text-forest"><span className="text-[16px] text-ink-mute">{n}</span>{title}</h2>
      {children}
    </section>
  )
}
