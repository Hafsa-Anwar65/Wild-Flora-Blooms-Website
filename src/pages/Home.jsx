import { useState } from 'react'
import { Phone, ChevronLeft, ChevronRight, Truck, Store, CalendarDays } from 'lucide-react'
import { Instagram, Facebook } from '../components/icons'
import { Photo, Button, Link, Field, DemoNote } from '../components/ui'
import { Wordmark } from '../components/Layout'
import { ProductCard, QuickShop } from '../components/ProductCard'
import { products, featuredIds, galleries, testimonials, contact, workshops, niceDate, fmt } from '../data'
import { useStore } from '../store'

export default function Home() {
  const [quick, setQuick] = useState(null)
  return (
    <>
      <Intro />
      <ShopStrip onQuick={setQuick} />
      <About />
      <Services />
      <QuoteBand />
      <Arrangements />
      <WorkshopsAndVouchers />
      <Reviews />
      <ContactSection />
      <QuickShop p={quick} onClose={() => setQuick(null)} />
    </>
  )
}

/* Section heading in the live site's style: small Cantarell caps, centred. */
export function SectionTitle({ children, as: Tag = 'h2', className = '', light }) {
  return <Tag className={`wf-h2 text-center ${light ? '!text-white' : ''} ${className}`}>{children}</Tag>
}

function Intro() {
  const { go } = useStore()
  return (
    <section className="bg-ivory">
      <div className="wrap grid items-center gap-10 py-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:gap-14 md:py-20">
        <div className="flex justify-center">
          <Wordmark size="lg" className="max-w-full object-contain" />
        </div>
        <div className="hero-in">
          <h1 className="wf-h1 text-center md:text-left">Seasonal florist & flower delivery in Coogee and Perth</h1>
          <div className="wf-body mt-6 space-y-5 text-[18px] text-ink-soft">
            <p>Wild Flora Blooms services Coogee and surrounding Perth areas specialising in seasonal, locally grown flowers for weddings, events and beautiful everyday bouquets.</p>
            <p>By prioritising locally sourced blooms that reflect the changing seasons, Wild Flora Blooms creates naturally beautiful floral designs while consciously reducing environmental impact.</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button onClick={() => go('shop')}>Shop bouquets</Button>
            <Button onClick={() => go('weddings')}>Wedding & event enquiry</Button>
          </div>
          <ul className="mt-8 grid gap-2 font-serif text-[16px] italic text-ink-soft sm:grid-cols-3">
            <li className="flex items-center gap-2"><Truck size={16} strokeWidth={1.4} className="text-sage" />Local delivery</li>
            <li className="flex items-center gap-2"><Store size={16} strokeWidth={1.4} className="text-sage" />Studio collection</li>
            <li className="flex items-center gap-2"><CalendarDays size={16} strokeWidth={1.4} className="text-sage" />Choose your date</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

/* New: makes everyday bouquets and delivery prominent, straight after the intro. */
function ShopStrip({ onQuick }) {
  const items = featuredIds.slice(0, 4).map((id) => products.find((p) => p.id === id))
  return (
    <section className="border-t border-linen bg-ivory">
      <div className="wrap py-16 md:py-20">
        <SectionTitle>Flowers delivered across Perth</SectionTitle>
        <p className="wf-lead mx-auto mt-5 max-w-[62ch] text-center text-[18px]">Seasonal and native bouquets, Phalaenopsis orchids and ready-made Christmas wreaths. Order online for delivery or collection.</p>
        <div className="no-scrollbar -mx-5 mt-12 flex snap-x scroll-pl-5 gap-5 overflow-x-auto px-5 md:mx-0 md:grid md:scroll-pl-0 md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0">
          {items.map((p) => <div key={p.id} className="w-[70vw] max-w-[300px] shrink-0 snap-start md:w-auto md:max-w-none"><ProductCard p={p} onQuick={onQuick} /></div>)}
        </div>
        <div className="mt-12 flex justify-center"><Button as="a" href="#shop" onClick={(e) => { e.preventDefault(); window.location.hash = 'shop' }}>Shop all flowers</Button></div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="bg-sage text-white" id="about">
      <div className="wrap grid items-center gap-10 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-14 md:py-20">
        <div>
          <h2 className="wf-h2 !text-white">About Wild Flora Blooms</h2>
          <div className="wf-body mt-6 space-y-5 text-[18px] text-white/95">
            <p>Hi, I’m Lora, the florist behind Wild Flora Blooms, based in Coogee, just south of Perth.</p>
            <p>I create natural, seasonal floral arrangements using locally grown blooms wherever possible, with a focus on a more thoughtful and sustainable approach.</p>
            <p>From wedding flowers and event styling to handcrafted bouquets, I work closely with my clients to bring their ideas to life in a way that feels modern, earthy, and true to them. I also offer private floral workshops, including wreath making, create your own bouquets and flower crown sessions for hens parties, birthdays and special occasions.</p>
            <p>I’d love to hear from you and help create something beautiful for your moment.</p>
          </div>
        </div>
        <Photo k="lora" className="aspect-[425/476] w-full" position="center top" />
      </div>
    </section>
  )
}

const SERVICES = [
  { title: 'Wedding Florist', photo: 'w4', text: 'Seasonal wedding flowers designed to complement your celebration, including bridal bouquets, ceremony flowers and reception arrangements.', to: 'weddings', cta: 'Wedding enquiry' },
  { title: 'Event Florist', photo: 'e3', text: 'Floral styling for events, celebrations, and corporate functions, designed to create a natural and cohesive atmosphere.', to: 'weddings', cta: 'Event enquiry' },
  { title: 'Seasonal Bouquets', photo: 's1', text: 'Fresh bouquets created using locally sourced blooms that reflect the colours and textures of the current season.', to: 'shop', cta: 'Shop bouquets' },
  { title: 'Private Workshops', photo: 'e10', text: 'Private floral workshops designed for hens parties, birthdays and special occasions. Including wreath making, flower crowns, and create your own bouquets.', to: 'workshops', cta: 'Book a workshop' },
]

function Services() {
  return (
    <section className="bg-ivory" id="services">
      <div className="wrap py-16 md:py-20">
        <SectionTitle>Floral services</SectionTitle>
        <p className="wf-lead mx-auto mt-5 max-w-[62ch] text-center text-[18px]">Wild Flora Blooms provides floral design services for weddings, events and custom bouquets throughout Coogee and the Perth region.</p>
        <div className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <Link key={s.title} to={s.to} className="group block text-center">
              <Photo k={s.photo} caption={false} ratio="2/3" className="transition-opacity group-hover:opacity-90" />
              <h3 className="mt-6 font-serif text-[20px] italic tracking-[0.08em]">{s.title}</h3>
              <p className="mx-auto mt-4 max-w-[30ch] font-serif text-[17px] italic leading-[1.6] tracking-[0.06em] text-ink-soft">{s.text}</p>
              <span className="mt-4 inline-block font-caps text-[11.5px] uppercase tracking-[0.2em] text-sage group-hover:text-forest-deep">{s.cta}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function QuoteBand() {
  const { go } = useStore()
  return (
    <section className="bg-sage text-white">
      <div className="wrap py-14 text-center">
        <p className="mx-auto max-w-[70ch] font-serif text-[18px] italic leading-[1.7] tracking-[0.08em]">Planning something special? Whether you’re organising a wedding, event or looking for a beautiful bouquet, Wild Flora Blooms would love to hear about your ideas and create something truly memorable.</p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button variant="outlineLight" className="sm:w-[235px]" onClick={() => go('weddings')}>Request a Quote</Button>
          <Button as="a" variant="outlineLight" className="sm:w-[235px]" href={`tel:${contact.tel}`}>Call Today</Button>
        </div>
      </div>
    </section>
  )
}

function Strip({ title, keys }) {
  return (
    <div className="mt-14">
      <h3 className="text-center font-serif text-[20px] italic tracking-[0.08em]">{title}</h3>
      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto" tabIndex={0} aria-label={`${title} gallery`}>
        {keys.map((k) => <Photo key={k} k={k} caption={false} className="h-[260px] w-[200px] shrink-0 sm:h-[340px] sm:w-[260px]" />)}
      </div>
    </div>
  )
}

function Arrangements() {
  const { go } = useStore()
  return (
    <section className="bg-ivory py-16 md:py-20" id="portfolio">
      <div className="wrap">
        <SectionTitle>Our arrangements</SectionTitle>
        <p className="wf-lead mx-auto mt-5 max-w-[70ch] text-center text-[18px]">Explore recent floral work by Wild Flora Blooms, showcasing seasonal flowers, natural textures and modern floral styling for weddings, events and bouquets.</p>
      </div>
      <Strip title="Wedding Flowers" keys={galleries.wedding} />
      <Strip title="Event Flowers" keys={galleries.events} />
      <Strip title="Seasonal Bouquets" keys={galleries.seasonal} />
      <div className="mt-12 flex justify-center"><Button className="whitespace-nowrap px-10" onClick={() => go('contact')}>Get in touch with Lora today</Button></div>
    </section>
  )
}

function WorkshopsAndVouchers() {
  const { go } = useStore()
  const sessions = workshops.flatMap((w) => w.sessions.map((s) => ({ ...s, w }))).filter((s) => s.booked < s.capacity).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3)
  return (
    <section className="border-t border-linen bg-ivory">
      <div className="wrap grid gap-14 py-16 md:grid-cols-2 md:py-20">
        <div>
          <h2 className="wf-h2">Workshops</h2>
          <p className="wf-lead mt-4 text-[18px]">Wreath making, create your own bouquet and flower crowns. Join a group session or book a private workshop for your hens party or birthday.</p>
          <ul className="mt-8 divide-y divide-linen border-y border-linen">
            {sessions.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="font-serif text-[19px] italic">{s.w.title}</p>
                  <p className="text-[15px] text-ink-mute">{niceDate(s.date, { weekday: 'long', day: 'numeric', month: 'long' })} · {fmt(s.w.price)} · {s.capacity - s.booked} {s.capacity - s.booked === 1 ? 'place' : 'places'} left</p>
                </div>
                <Button size="sm" onClick={() => go('workshops')}>Book</Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <h2 className="wf-h2">Gift vouchers</h2>
          <p className="wf-lead mt-4 text-[18px]">For flowers, an orchid or a workshop place, let them choose. Emailed with your personal message.</p>
          <div className="mt-8 grid flex-1 grid-cols-[1fr_1.2fr] items-center gap-6 bg-rose-pale p-6">
            <Photo k="e8" caption={false} ratio="3/4" />
            <div>
              <p className="font-serif text-[40px] italic leading-none text-ink">$50 to $200</p>
              <p className="mt-2 text-[16px] text-ink-soft">or choose your own amount</p>
              <Button className="mt-6" onClick={() => go('vouchers')}>Buy a gift voucher</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  const [i, setI] = useState(0)
  const t = testimonials[i]
  const n = testimonials.length
  return (
    <section className="bg-sage text-white">
      <div className="wrap py-16 md:py-20">
        <SectionTitle light>Kind words from clients</SectionTitle>
        <div className="relative mx-auto mt-10 max-w-[760px] border-y border-white/90 px-10 py-10 md:px-14">
          <button onClick={() => setI((i - 1 + n) % n)} aria-label="Previous review" className="absolute -left-2 top-1/2 -translate-y-1/2 md:-left-16"><ChevronLeft size={34} strokeWidth={1} /></button>
          <blockquote key={i} className="fade-in text-center">
            <p className="font-caps text-[11.5px] uppercase leading-[2] tracking-[0.18em] md:text-[12px]">{t.text}</p>
            <footer className="mt-6 font-serif text-[18px] italic tracking-[0.08em]">{t.names}</footer>
          </blockquote>
          <button onClick={() => setI((i + 1) % n)} aria-label="Next review" className="absolute -right-2 top-1/2 -translate-y-1/2 md:-right-16"><ChevronRight size={34} strokeWidth={1} /></button>
        </div>
        <div className="mt-6 flex justify-center gap-2">{testimonials.map((_, k) => <button key={k} aria-label={`Review ${k + 1}`} onClick={() => setI(k)} className={`h-1.5 w-1.5 rounded-full ${k === i ? 'bg-white' : 'bg-white/40'}`} />)}</div>
      </div>
    </section>
  )
}

const SERVICES_OPT = ['Wedding flowers', 'Event flowers', 'Bouquet / custom order', 'Private workshop', 'Something else']

export function ContactSection({ standalone }) {
  const [f, setF] = useState({ name: '', email: '', phone: '', date: '', location: '', service: '', florals: '', delivery: '', vision: '' })
  const [err, setErr] = useState({})
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const x = {}
    if (!f.name.trim()) x.name = 'Please add your name'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Please add a valid email'
    if (!f.service) x.service = 'Choose a floral service'
    if (!f.date) x.date = 'Add a date (an estimate is fine)'
    if (!f.location.trim()) x.location = 'Add the event location or suburb'
    if (!f.florals.trim()) x.florals = 'Tell us what florals you need'
    if (!f.delivery) x.delivery = 'Let us know about delivery or setup'
    setErr(x); if (!Object.keys(x).length) setSent(true)
  }
  const box = (k) => `field text-center ${err[k] ? '!border-clay' : ''}`
  const Err = ({ k }) => (err[k] ? <p className="mt-1 text-center text-[14px] italic text-clay">{err[k]}</p> : null)
  return (
    <section className="bg-ivory" id="contact-us">
      <div className="wrap max-w-[760px] py-16 md:py-20">
        <SectionTitle as={standalone ? 'h1' : 'h2'}>Contact us</SectionTitle>
        <p className="wf-lead mx-auto mt-5 max-w-[62ch] text-center text-[18px]">Planning a wedding, event or need a bouquet? Fill out the enquiry form below to request a quote or check availability, otherwise if you prefer feel free to give me a call.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-serif text-[18px] italic text-ink-soft">
          <a href={`tel:${contact.tel}`} className="flex items-center gap-2 hover:text-sage"><Phone size={20} strokeWidth={1.3} className="text-sage" />{contact.phone}</a>
          <span className="flex items-center gap-3">
            <a href={contact.facebook} aria-label="Facebook" className="text-sage hover:text-forest-deep"><Facebook size={20} strokeWidth={1.3} /></a>
            <a href={contact.instagram} aria-label="Instagram" className="text-sage hover:text-forest-deep"><Instagram size={22} strokeWidth={1.3} /></a>
            <span>Follow along</span>
          </span>
        </div>
        {sent ? (
          <div className="mt-10 border border-sage p-10 text-center">
            <p className="font-serif text-[24px] italic">Thank you, {f.name.split(' ')[0]}, your enquiry has been received.</p>
            <p className="mt-2 text-ink-soft">Lora will be in touch soon.</p>
            <DemoNote className="mt-6 text-left">Demo form. On the live site this enquiry would land in the studio’s enquiry dashboard (see Studio admin) and could be quoted through Xero.</DemoNote>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-10 space-y-4">
            <div><input aria-label="Your name" placeholder="Your Name*" value={f.name} onChange={set('name')} className={box('name')} autoComplete="name" /><Err k="name" /></div>
            <div><input aria-label="Your email" type="email" placeholder="Your Email*" value={f.email} onChange={set('email')} className={box('email')} autoComplete="email" /><Err k="email" /></div>
            <input aria-label="Phone number" type="tel" placeholder="Phone Number" value={f.phone} onChange={set('phone')} className={box('phone')} autoComplete="tel" />
            <div>
              <select aria-label="What floral service?" value={f.service} onChange={set('service')} className={`${box('service')} ${f.service ? '' : 'italic text-ink-mute'}`}>
                <option value="">What floral service?*</option>{SERVICES_OPT.map((o) => <option key={o}>{o}</option>)}
              </select><Err k="service" />
            </div>
            <div><input aria-label="Event date" type={f.date ? 'date' : 'text'} onFocus={(e) => (e.target.type = 'date')} placeholder="Event Date*" value={f.date} onChange={set('date')} className={box('date')} /><Err k="date" /></div>
            <div><input aria-label="Event location" placeholder="Event Location*" value={f.location} onChange={set('location')} className={box('location')} /><Err k="location" /></div>
            <div><input aria-label="What florals do you need?" placeholder="What florals do you need?*" value={f.florals} onChange={set('florals')} className={box('florals')} /><Err k="florals" /></div>
            <div>
              <select aria-label="Delivery or setup required?" value={f.delivery} onChange={set('delivery')} className={`${box('delivery')} ${f.delivery ? '' : 'italic text-ink-mute'}`}>
                <option value="">Delivery or setup required?*</option><option>Delivery only</option><option>Delivery and setup</option><option>I’ll collect</option><option>Not sure yet</option>
              </select><Err k="delivery" />
            </div>
            <textarea aria-label="Tell us more" rows={4} placeholder="Tell us more about your event or floral vision:" value={f.vision} onChange={set('vision')} className="field resize-none text-center" />
            <div className="flex justify-center pt-4"><Button type="submit" className="w-[200px]">Submit</Button></div>
          </form>
        )}
      </div>
    </section>
  )
}
