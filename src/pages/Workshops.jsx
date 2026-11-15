import { useState } from 'react'
import { Check, Clock, Users, Lock, X } from 'lucide-react'
import { workshops as seed, niceDate, fmt, fmt2 } from '../data'
import { Photo, Button, Field, Ph, DemoNote, Qty } from '../components/ui'
import { useStore } from '../store'

export default function Workshops() {
  const { flash } = useStore()
  const [data, setData] = useState(seed)
  const [sel, setSel] = useState(null) // { wid, sid }
  const [confirmed, setConfirmed] = useState(null)

  const book = (wid, sid, seats) => setData((d) => d.map((w) => w.id !== wid ? w : { ...w, sessions: w.sessions.map((s) => s.id !== sid ? s : { ...s, booked: s.booked + seats }) }))
  const selW = sel && data.find((w) => w.id === sel.wid)
  const selS = selW && selW.sessions.find((s) => s.id === sel.sid)

  return (
    <div>
      <section className="relative">
        <Photo k="e10" caption={false} className="h-[52vh] min-h-[380px]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/5" />
          <div className="wrap relative flex h-full flex-col justify-end pb-12 text-ivory">
            <p className="font-serif text-[19px] italic text-ivory/80">Workshops</p>
            <h1 className="mt-3 wf-h1 !text-white">Floral workshops in Coogee &amp; Perth</h1>
            <p className="mt-4 max-w-[52ch] text-[19px] text-ivory/85">Wreath making, create your own bouquets and flower crowns in Coogee. Join a group session below, or book a private workshop for your hens party, birthday or special occasion.</p>
          </div>
        </Photo>
      </section>

      <section className="wrap py-16 md:py-24">
        <div className="mb-10 grid gap-4 border-b border-linen pb-8 text-[17px] text-ink-soft sm:grid-cols-3">
          <p><span className="block font-serif text-[20px] text-ink">Where</span><Ph>studio address</Ph></p>
          <p><span className="block font-serif text-[20px] text-ink">Included</span>Flowers, tools, wrapping and a grazing plate</p>
          <p><span className="block font-serif text-[20px] text-ink">Group size</span>Up to 10 to 14 people, depending on the class</p>
        </div>

        <div className="space-y-20 md:space-y-28">
          {data.map((w, wi) => (
            <article key={w.id} className="grid gap-8 md:grid-cols-12 md:gap-10">
              <div className={`md:col-span-5 ${wi % 2 ? 'md:order-2 md:col-start-8' : ''}`}><Photo k={w.photo} ratio="4/5" /></div>
              <div className={`md:col-span-7 ${wi % 2 ? 'md:order-1 md:col-start-1 md:row-start-1' : ''}`}>
                <h2 className="wf-h2">{w.title}</h2>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[16px] text-ink-mute">
                  <span className="flex items-center gap-1.5"><Clock size={15} strokeWidth={1.5} />{w.duration}</span>
                  <span>{fmt(w.price)} per person</span>
                </div>
                <p className="mt-5 max-w-[56ch] text-[18.5px] text-ink">{w.summary}</p>
                <p className="mt-3 max-w-[56ch] text-ink-soft">{w.details}</p>

                <h3 className="mt-8 text-[17px] font-sans font-medium text-ink">Choose a session</h3>
                <ul className="mt-3 divide-y divide-linen border-y border-linen">
                  {w.sessions.map((s) => {
                    const left = s.capacity - s.booked
                    const full = left <= 0
                    const pct = Math.min(100, (s.booked / s.capacity) * 100)
                    return (
                      <li key={s.id} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 py-4 sm:grid-cols-[1fr_160px_auto]">
                        <div>
                          <p className="font-serif text-[19px] leading-tight">{niceDate(s.date, { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                          <p className="text-[16px] text-ink-mute">{s.time}</p>
                        </div>
                        <div className="col-span-2 row-start-2 sm:col-span-1 sm:row-start-auto">
                          <div className="h-1 w-full overflow-hidden rounded-full bg-linen" aria-hidden><div className={`h-full ${full ? 'bg-clay' : left <= 2 ? 'bg-rose-deep' : 'bg-sage'}`} style={{ width: `${pct}%` }} /></div>
                          <p className={`mt-1.5 flex items-center gap-1.5 text-[15px] ${full ? 'text-clay' : left <= 2 ? 'text-rose-deep' : 'text-ink-mute'}`}><Users size={13} strokeWidth={1.6} />{full ? 'Fully booked' : `${left} of ${s.capacity} places left`}</p>
                        </div>
                        <Button size="sm" variant={full ? 'ghost' : 'primary'} disabled={full} onClick={() => { setSel({ wid: w.id, sid: s.id }); setConfirmed(null) }} aria-label={full ? 'Fully booked' : `Book ${w.title} on ${s.date}`}>
                          {full ? 'Fully booked' : 'Book'}
                        </Button>
                      </li>
                    )
                  })}
                </ul>
                {w.sessions.some((s) => s.booked >= s.capacity) && <p className="mt-3 text-[15px] text-ink-mute">Fully booked sessions can’t be selected. <button className="link-u text-forest" onClick={() => flash('Waitlist request noted (demo)')}>Join the waitlist</button> and we’ll let you know if a place opens.</p>}
              </div>
            </article>
          ))}
        </div>
      </section>

      {selS && <BookingSheet w={selW} s={selS} confirmed={confirmed} onClose={() => { setSel(null); setConfirmed(null) }} onBook={(seats, details) => { book(selW.id, selS.id, seats); setConfirmed({ seats, ...details, ref: 'WS-' + Math.floor(1000 + Math.random() * 8999) }) }} />}
    </div>
  )
}


function BookingSheet({ w, s, onClose, onBook, confirmed }) {
  const left = s.capacity - s.booked
  const [seats, setSeats] = useState(1)
  const [f, setF] = useState({ name: '', email: '', phone: '', diet: '' })
  const [err, setErr] = useState({})
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const x = {}
    if (!f.name.trim()) x.name = 'Enter your name'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Enter a valid email for your booking confirmation'
    if (!/^[\d\s+()-]{8,}$/.test(f.phone)) x.phone = 'Enter a phone number'
    if (seats > left) x.seats = `Only ${left} ${left === 1 ? 'place is' : 'places are'} left in this session`
    if (left <= 0) x.seats = 'This session is now fully booked'
    setErr(x)
    if (!Object.keys(x).length) onBook(seats, f)
  }

  return (
    <div className="fixed inset-0 z-[60] flex justify-end" role="dialog" aria-modal="true" aria-label="Book a workshop">
      <div className="fade-in absolute inset-0 bg-black/35" onClick={onClose} />
      <div className="drawer-in relative flex h-full w-full max-w-[520px] flex-col overflow-y-auto bg-ivory">
        <div className="flex items-center justify-between border-b border-linen px-6 py-5">
          <p className="font-serif text-[24px] text-forest">{confirmed ? 'Booking confirmed' : 'Book your place'}</p>
          <button onClick={onClose} aria-label="Close" className="-mr-2 p-2"><X size={22} strokeWidth={1.5} /></button>
        </div>
        <div className="border-b border-linen bg-ivory-deep px-6 py-5">
          <p className="font-serif text-[20px]">{w.title}</p>
          <p className="text-[16px] text-ink-mute">{niceDate(s.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · {s.time}</p>
          <p className={`mt-1 text-[15px] ${left <= 0 ? 'text-clay' : 'text-ink-soft'}`}>{left <= 0 ? 'Now fully booked' : `${left} of ${s.capacity} places left`}</p>
        </div>

        {confirmed ? (
          <div className="px-6 py-8">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-sage-pale text-forest"><Check size={22} /></span>
            <p className="mt-5 font-serif text-[28px] leading-tight text-forest">See you at the studio, {confirmed.name.split(' ')[0]}.</p>
            <p className="mt-3 text-ink-soft">Booking {confirmed.ref} · {confirmed.seats} {confirmed.seats === 1 ? 'place' : 'places'} · {fmt2(confirmed.seats * w.price)}. A confirmation would be emailed to {confirmed.email}.</p>
            <p className="mt-3 text-[16px] text-ink-mute">The session now shows {left} {left === 1 ? 'place' : 'places'} remaining{left <= 0 ? ' and is closed to new bookings' : ''}.</p>
            <DemoNote className="mt-6">Demo booking: no payment was taken and no email was sent.</DemoNote>
            <Button className="mt-6 w-full" onClick={onClose}>Done</Button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="flex flex-1 flex-col px-6 py-6">
            <div className="flex items-end justify-between gap-4">
              <Field label="Number of places" error={err.seats}>
                <Qty value={seats} onChange={(v) => { setSeats(v); setErr({ ...err, seats: undefined }) }} max={Math.max(1, Math.min(6, left))} />
              </Field>
              <p className="pb-3 text-right font-serif text-[22px] tabular-nums">{fmt2(seats * w.price)}</p>
            </div>
            <p className="mt-2 text-[15px] text-ink-mute">You can book up to {Math.min(6, left)} {Math.min(6, left) === 1 ? 'place' : 'places'} in this session.</p>
            <div className="mt-6 grid gap-4">
              <Field label="Full name" error={err.name}><input value={f.name} onChange={set('name')} className={`field ${err.name ? 'field-err' : ''}`} autoComplete="name" /></Field>
              <Field label="Email" error={err.email}><input type="email" value={f.email} onChange={set('email')} className={`field ${err.email ? 'field-err' : ''}`} autoComplete="email" /></Field>
              <Field label="Phone" error={err.phone}><input type="tel" value={f.phone} onChange={set('phone')} className={`field ${err.phone ? 'field-err' : ''}`} autoComplete="tel" /></Field>
              <Field label="Dietary needs or allergies (optional)" hint="For the grazing plate."><input value={f.diet} onChange={set('diet')} className="field" /></Field>
            </div>
            <div className="mt-6 rounded-[3px] border border-dashed border-sage bg-sage-pale/50 p-4 text-[16px] text-ink-soft">
              <p className="flex items-center gap-2 text-forest"><Lock size={15} /> Online payment placeholder</p>
              <p className="mt-1">Payment would be taken securely via the studio’s chosen gateway before the place is confirmed.</p>
            </div>
            <p id="waitlist-note" className="mt-4 text-[15px] text-ink-mute">Cancellation and transfer policy: <Ph>to be confirmed by the studio</Ph></p>
            <Button type="submit" size="lg" className="mt-auto w-full" disabled={left <= 0}>Pay & confirm booking · {fmt2(seats * w.price)}</Button>
          </form>
        )}
      </div>
    </div>
  )
}
