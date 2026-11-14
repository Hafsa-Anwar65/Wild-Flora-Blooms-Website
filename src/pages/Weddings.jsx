import { useState } from 'react'
import { Check } from 'lucide-react'
import { Photo, Button, Field, DemoNote, Link } from '../components/ui'

const REQS = ['Bridal bouquet', 'Bridesmaids’ bouquets', 'Buttonholes & corsages', 'Flower crowns', 'Ceremony arbour', 'Aisle florals', 'Table centrepieces', 'Bud vases', 'Hanging installation', 'Cake flowers']
const BUDGETS = ['Under $1,500', '$1,500 – $3,000', '$3,000 – $5,000', '$5,000 – $8,000', '$8,000+', 'Not sure yet']

export default function Weddings() {
  const [f, setF] = useState({ name: '', email: '', phone: '', date: '', venue: '', guests: '', reqs: [], budget: '', info: '' })
  const [err, setErr] = useState({})
  const [sent, setSent] = useState(null)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const toggle = (r) => setF({ ...f, reqs: f.reqs.includes(r) ? f.reqs.filter((x) => x !== r) : [...f.reqs, r] })

  const submit = (e) => {
    e.preventDefault()
    const x = {}
    if (!f.name.trim()) x.name = 'Enter your full name'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Enter a valid email address'
    if (!/^[\d\s+()-]{8,}$/.test(f.phone)) x.phone = 'Enter a phone number'
    if (!f.date) x.date = 'Add your wedding date — an estimate is fine'
    else if (new Date(f.date) < new Date()) x.date = 'Choose a date in the future'
    if (f.guests && (!/^\d+$/.test(f.guests) || +f.guests < 1)) x.guests = 'Enter a number of guests'
    if (!f.reqs.length) x.reqs = 'Choose at least one thing you need flowers for'
    if (!f.budget) x.budget = 'Choose a budget range so we can suggest the right approach'
    setErr(x)
    if (Object.keys(x).length) { setTimeout(() => document.querySelector('[data-err="1"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 10); return }
    setSent({ ref: 'ENQ-' + Math.floor(1050 + Math.random() * 900), ...f })
    setTimeout(() => document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' }), 10)
  }
  const E = (k) => (err[k] ? { 'data-err': '1' } : {})
  const c = (k) => `field ${err[k] ? 'field-err' : ''}`

  return (
    <div>
      <section className="grid md:grid-cols-2">
        <Photo k="wedding1" className="aspect-[4/5] md:aspect-auto md:min-h-[680px]" />
        <div className="flex flex-col justify-center bg-forest px-6 py-16 text-ivory md:px-14 lg:px-20">
          <p className="font-serif text-[17px] italic text-ivory/70">Weddings & events</p>
          <h1 className="mt-3 text-h1">Flowers that tell your story.</h1>
          <p className="mt-5 max-w-[46ch] text-[17px] text-ivory/80">From intimate celebrations to unforgettable wedding days, we create thoughtful floral designs that bring your vision to life.</p>
          <Button as="a" href="#enquiry" variant="light" size="lg" className="mt-8 self-start" onClick={(e) => { e.preventDefault(); document.getElementById('enquiry').scrollIntoView({ behavior: 'smooth' }) }}>Enquire About Wedding Flowers</Button>
        </div>
      </section>

      <section className="wrap grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-4">
          <h2 className="text-h2 text-forest">How it works</h2>
          <p className="mt-4 text-ink-soft">Every wedding starts with a conversation, not a package. Here’s what to expect.</p>
        </div>
        <ol className="grid gap-8 sm:grid-cols-2 md:col-span-8">
          {[['Tell us about your day', 'Share your date, venue and the feel you’re after using the form below.'], ['We talk it through', 'A call or studio visit to go over colours, flowers and the parts of the day that matter most.'], ['You receive a quote', 'A clear, itemised quote — so you can see exactly where the budget goes.'], ['We bring it to life', 'Flowers sourced and designed in the week of your wedding, then delivered and installed.']].map(([t, d], i) => (
            <li key={t} className="border-t border-linen pt-5">
              <span className="font-serif text-[15px] text-rose-deep">Step {i + 1}</span>
              <p className="mt-2 font-serif text-[22px] leading-tight">{t}</p>
              <p className="mt-2 text-[15px] text-ink-soft">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap grid grid-cols-6 gap-3 md:grid-cols-12 md:gap-4">
        <Photo k="wedding2" className="col-span-6 aspect-[4/3] md:col-span-7" />
        <Photo k="wedding3" className="col-span-3 aspect-[3/4] md:col-span-3" caption={false} />
        <Photo k="ig4" className="col-span-3 aspect-[3/4] md:col-span-2 md:aspect-auto" caption={false} />
      </section>

      <section id="enquiry" className="mt-20 scroll-mt-28 bg-ivory-deep md:mt-28">
        <div className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-h2 text-forest">Wedding enquiry</h2>
            <p className="mt-4 text-ink-soft">The more you can tell us, the more useful our first reply will be. Nothing here is a commitment.</p>
            <p className="mt-6 text-[14px] text-ink-mute">Prefer to talk? <Link to="contact" className="link-u text-forest">Contact the studio</Link>.</p>
          </div>
          <div className="lg:col-span-8">
            {sent ? (
              <div className="border border-linen bg-ivory p-8 md:p-12">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-sage-pale text-forest"><Check size={22} /></span>
                <p className="mt-6 font-serif text-[32px] leading-tight text-forest">Thank you, {sent.name.split(' ')[0]}. We’ve got your enquiry.</p>
                <p className="mt-3 max-w-[54ch] text-ink-soft">Reference {sent.ref}. We’ll be in touch about your {new Date(sent.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })} wedding. Our usual reply time is <span className="rounded-[2px] border border-dashed border-sage px-1.5">to confirm</span>.</p>
                <dl className="mt-8 grid gap-4 border-t border-linen pt-6 text-[14.5px] sm:grid-cols-2">
                  <div><dt className="text-ink-mute">Venue</dt><dd>{sent.venue || 'Not decided yet'}</dd></div>
                  <div><dt className="text-ink-mute">Guests</dt><dd>{sent.guests || '—'}</dd></div>
                  <div><dt className="text-ink-mute">Budget</dt><dd>{sent.budget}</dd></div>
                  <div><dt className="text-ink-mute">Flowers for</dt><dd>{sent.reqs.join(', ')}</dd></div>
                </dl>
                <DemoNote className="mt-8">Demo submission. In the live site this enquiry would appear in the studio’s enquiry dashboard and could be quoted through Xero. <Link to="admin" className="link-u text-forest">See the admin concept</Link>.</DemoNote>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" error={err.name}><input {...E('name')} value={f.name} onChange={set('name')} className={c('name')} autoComplete="name" /></Field>
                <Field label="Email address" error={err.email}><input {...E('email')} type="email" value={f.email} onChange={set('email')} className={c('email')} autoComplete="email" /></Field>
                <Field label="Phone number" error={err.phone}><input {...E('phone')} type="tel" value={f.phone} onChange={set('phone')} className={c('phone')} autoComplete="tel" /></Field>
                <Field label="Wedding date" error={err.date}><input {...E('date')} type="date" value={f.date} onChange={set('date')} className={c('date')} /></Field>
                <Field label="Venue" hint="Or ‘not decided yet’"><input value={f.venue} onChange={set('venue')} className="field" /></Field>
                <Field label="Estimated guest count" error={err.guests}><input {...E('guests')} inputMode="numeric" value={f.guests} onChange={set('guests')} className={c('guests')} /></Field>
                <fieldset className="sm:col-span-2" {...E('reqs')}>
                  <legend className="label">Floral requirements</legend>
                  <div className="flex flex-wrap gap-2">
                    {REQS.map((r) => (
                      <button type="button" key={r} onClick={() => toggle(r)} aria-pressed={f.reqs.includes(r)} className={`h-10 rounded-full border px-4 text-[14px] ${f.reqs.includes(r) ? 'border-forest bg-forest text-ivory' : 'border-linen bg-white/60 hover:border-forest'}`}>{r}</button>
                    ))}
                  </div>
                  {err.reqs && <p className="mt-2 text-[13px] text-clay">{err.reqs}</p>}
                </fieldset>
                <Field label="Budget range" error={err.budget} className="sm:col-span-2">
                  <select {...E('budget')} value={f.budget} onChange={set('budget')} className={c('budget')}>
                    <option value="">Choose a range</option>{BUDGETS.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </Field>
                <Field label="Additional information" className="sm:col-span-2" hint="Colours, flowers you love, Pinterest links, anything else."><textarea rows={5} value={f.info} onChange={set('info')} className="field resize-none" /></Field>
                <div className="sm:col-span-2"><Button type="submit" size="lg" className="w-full sm:w-auto">Send enquiry</Button></div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
