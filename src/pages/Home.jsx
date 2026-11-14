import { useState } from 'react'
import { Instagram } from '../components/icons'
import { Photo, Button, Link, Ph } from '../components/ui'
import { ProductCard, QuickShop } from '../components/ProductCard'
import { categories, products, featuredIds, workshops, niceDate, fmt } from '../data'
import { useStore } from '../store'

export default function Home() {
  const [quick, setQuick] = useState(null)
  return (
    <>
      <Hero />
      <Categories />
      <Featured onQuick={setQuick} />
      <Weddings />
      <WorkshopsTeaser />
      <PlantsSeasonal />
      <Voucher />
      <Story />
      <Gallery />
      <QuickShop p={quick} onClose={() => setQuick(null)} />
    </>
  )
}

function Hero() {
  const { go } = useStore()
  return (
    <section className="relative">
      <Photo k="hero" caption={false} className="h-[78svh] min-h-[540px] md:h-[86vh] md:max-h-[880px]">
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/75 via-forest-deep/20 to-transparent md:bg-gradient-to-r md:from-forest-deep/70 md:via-forest-deep/25" />
        <div className="wrap relative flex h-full flex-col justify-end pb-12 md:justify-center md:pb-0">
          <div className="hero-in max-w-[640px] text-ivory">
            <p className="font-serif text-[18px] italic text-ivory/85">Wild Flora Blooms, Perth</p>
            <h1 className="mt-4 text-display">Flowers for the moments that matter.</h1>
            <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-ivory/85">Thoughtfully curated blooms, seasonal arrangements and beautiful floral styling for everyday moments and special occasions.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button variant="light" size="lg" onClick={() => go('shop')}>Shop Flowers</Button>
              <Button variant="outlineLight" size="lg" onClick={() => go('weddings')}>Explore Weddings</Button>
            </div>
          </div>
        </div>
      </Photo>
      {/* Editorial inset — this week at the studio */}
      <div className="wrap relative hidden lg:block">
        <Link to="product-seasonal-posy" className="absolute -top-[260px] right-12 block w-[250px] bg-ivory p-3 shadow-[0_24px_50px_-30px_rgba(0,0,0,.5)]">
          <Photo k="heroDetail" caption={false} ratio="4/5" />
          <p className="mt-3 font-serif text-[17px] leading-snug text-forest">This week’s posy</p>
          <p className="text-[13px] text-ink-mute">Ranunculus, sweet pea and garden roses · from {fmt(65)}</p>
        </Link>
      </div>
      <p className="wrap mt-3 text-[12px] text-ink-mute">Hero photograph: loose garden armful on the studio bench, side light — to be shot.</p>
    </section>
  )
}

function Categories() {
  const span = ['md:col-span-5 md:row-span-2', 'md:col-span-4', 'md:col-span-3', 'md:col-span-3', 'md:col-span-4']
  return (
    <section className="wrap pt-20 md:pt-28">
      <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
        <h2 className="text-h2 text-forest">Shop by flower</h2>
        <Link to="shop" className="hidden text-[15px] text-ink-soft link-u sm:inline">See the whole shop</Link>
      </div>
      <div className="no-scrollbar -mx-5 flex snap-x scroll-pl-5 md:scroll-pl-0 gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-12 md:auto-rows-[340px] md:gap-5 lg:auto-rows-[380px] md:overflow-visible md:px-0">
        {categories.map((c, i) => (
          <Link key={c.id} to={`shop-${c.id}`} className={`group block w-[66vw] max-w-[300px] shrink-0 snap-start md:flex md:w-auto md:max-w-none md:flex-col ${span[i]}`}>
            <Photo k={c.photo} caption={false} className="aspect-[3/4] md:aspect-auto md:min-h-0 md:flex-1" />
            <div className="mt-3 flex items-baseline justify-between">
              <h3 className="text-[21px] leading-tight group-hover:text-forest">{c.name}</h3>
              <span className="text-[13px] text-ink-mute">{products.filter((p) => p.category === c.id).length} styles</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function Featured({ onQuick }) {
  const items = featuredIds.map((id) => products.find((p) => p.id === id))
  const [lead, ...rest] = [items[2], items[0], items[1], items[3], items[4]]
  return (
    <section className="wrap pt-24 md:pt-32">
      <div className="grid gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-4 md:pr-8">
          <h2 className="text-h2 text-forest">Made to bring a little joy.</h2>
          <p className="mt-4 max-w-[38ch] text-ink-soft">Designed in the studio each morning with what’s best at market. Every bouquet is a little different — that’s rather the point.</p>
          <Link to="shop" className="mt-6 inline-block text-[15px] text-forest link-u">Shop all flowers</Link>
          <p className="mt-10 hidden text-[12px] text-ink-mute md:block">Prices shown are illustrative for this mockup.</p>
        </div>
        <div className="md:col-span-8">
          <ProductCard p={lead} ratio="5/4" large onQuick={onQuick} />
        </div>
      </div>
      <div className="no-scrollbar -mx-5 mt-14 flex snap-x scroll-pl-5 md:scroll-pl-0 gap-5 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0">
        {rest.map((p, i) => (
          <div key={p.id} className={`w-[72vw] max-w-[320px] shrink-0 snap-start md:w-auto md:max-w-none ${i % 2 ? 'md:mt-16' : ''}`}>
            <ProductCard p={p} onQuick={onQuick} />
          </div>
        ))}
      </div>
    </section>
  )
}

function Weddings() {
  const { go } = useStore()
  return (
    <section className="mt-28 bg-forest text-ivory md:mt-36">
      <div className="wrap grid gap-12 py-20 md:grid-cols-12 md:gap-8 md:py-28">
        <div className="order-2 md:order-1 md:col-span-5 md:self-center">
          <p className="font-serif text-[17px] italic text-ivory/70">Weddings & events</p>
          <h2 className="mt-3 text-h1">Flowers that tell your story.</h2>
          <p className="mt-6 max-w-[44ch] text-[17px] leading-relaxed text-ivory/80">From intimate celebrations to unforgettable wedding days, we create thoughtful floral designs that bring your vision to life.</p>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ivory/15 pt-8 text-[15px]">
            {[['Bridal party', 'Bouquets, buttonholes, flower crowns'], ['Ceremony', 'Arbours, aisle meadows, signage florals'], ['Reception', 'Long tables, bud vases, centrepieces'], ['Installations', 'Hanging florals and statement pieces']].map(([t, d]) => (
              <div key={t}><dt className="font-serif text-[19px] text-ivory">{t}</dt><dd className="mt-1 text-ivory/65">{d}</dd></div>
            ))}
          </dl>
          <Button variant="light" size="lg" className="mt-10" onClick={() => go('weddings')}>Enquire About Wedding Flowers</Button>
        </div>
        <div className="order-1 grid grid-cols-6 grid-rows-[auto_auto] gap-3 md:order-2 md:col-span-7 md:gap-4">
          <Photo k="wedding1" className="col-span-4 row-span-2 aspect-[3/4]" />
          <Photo k="wedding2" className="col-span-2 aspect-[3/4]" caption={false} />
          <Photo k="wedding3" className="col-span-2 aspect-[3/4]" caption={false} />
        </div>
      </div>
    </section>
  )
}

function WorkshopsTeaser() {
  const { go } = useStore()
  const sessions = workshops.flatMap((w) => w.sessions.map((s) => ({ ...s, w }))).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4)
  return (
    <section className="wrap grid gap-12 pt-24 md:grid-cols-12 md:gap-10 md:pt-32">
      <div className="md:col-span-5">
        <Photo k="workshop" ratio="4/5" />
      </div>
      <div className="md:col-span-7 md:pl-6 md:pt-6">
        <h2 className="text-h2 text-forest">Create something beautiful.</h2>
        <p className="mt-4 max-w-[52ch] text-ink-soft">Small-group workshops in the studio. We supply the flowers, tools and a grazing plate; you leave with something you made and a few tricks for the vase at home.</p>
        <ul className="mt-10 border-t border-linen">
          {sessions.map((s) => {
            const left = s.capacity - s.booked
            const full = left <= 0
            return (
              <li key={s.id} className="grid grid-cols-[64px_1fr] items-center gap-4 border-b border-linen py-5 sm:grid-cols-[72px_1fr_auto]">
                <div className="text-center leading-none">
                  <span className="block font-serif text-[34px] text-forest">{new Date(s.date + 'T00:00').getDate()}</span>
                  <span className="text-[12px] text-ink-mute">{niceDate(s.date, { month: 'short' })}</span>
                </div>
                <div>
                  <p className="font-serif text-[20px] leading-tight">{s.w.title}</p>
                  <p className="mt-1 text-[14px] text-ink-mute">{niceDate(s.date, { weekday: 'long' })}, {s.time} · {fmt(s.w.price)}</p>
                  <p className={`mt-1 text-[13px] ${full ? 'text-clay' : left <= 2 ? 'text-rose-deep' : 'text-sage'}`}>{full ? 'Fully booked' : `${left} of ${s.capacity} places left`}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Button size="sm" variant={full ? 'ghost' : 'outline'} disabled={full} onClick={() => go(`workshops`)}>{full ? 'Waitlist only' : 'Book a place'}</Button>
                </div>
              </li>
            )
          })}
        </ul>
        <Link to="workshops" className="mt-6 inline-block text-[15px] text-forest link-u">All workshops and dates</Link>
      </div>
    </section>
  )
}

function PlantsSeasonal() {
  return (
    <section className="mt-28 bg-sage-pale md:mt-36">
      <div className="wrap grid gap-10 py-20 md:grid-cols-12 md:gap-8 md:py-24">
        <div className="md:col-span-7 md:order-2">
          <Photo k="plantsHero" className="aspect-[4/3] md:aspect-[5/4]" />
        </div>
        <div className="flex flex-col md:col-span-5 md:order-1 md:pr-8">
          <p className="font-serif text-[17px] italic text-ink-soft">Indoor plants</p>
          <h2 className="mt-3 text-h2 text-forest">Orchids that outlast the bouquet.</h2>
          <p className="mt-4 max-w-[44ch] text-ink-soft">Our Phalaenopsis orchids arrive potted in simple ceramic with a care card. Give them bright, indirect light and a little water once a week, and they’ll flower for months.</p>
          <div className="mt-6 flex gap-4">
            <Button onClick={() => (window.location.hash = 'product-phalaenopsis-orchid')}>Shop orchids</Button>
            <Button variant="outline" onClick={() => (window.location.hash = 'shop-plants')}>All plants</Button>
          </div>
          <div className="mt-auto pt-14">
            <Link to="shop-seasonal" className="group grid grid-cols-[112px_1fr] items-center gap-5 border-t border-sage-light pt-6">
              <Photo k="seasonal" caption={false} ratio="1/1" />
              <div>
                <p className="text-[13px] text-ink-mute">The seasonal collection</p>
                <p className="mt-1 font-serif text-[22px] leading-tight group-hover:text-forest">What’s in the buckets this week — it changes as the season does.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function VoucherCard({ amount = 100, to = 'Someone lovely', from = 'You', message, className = '' }) {
  return (
    <div className={`relative aspect-[1.6/1] w-full overflow-hidden bg-ivory p-6 shadow-[0_30px_60px_-36px_rgba(30,40,32,.55)] sm:p-8 ${className}`}>
      <div className="absolute inset-3 border border-rose-deep/30" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div className="leading-none text-forest"><span className="font-serif text-[15px] tracking-[0.28em]">WILD FLORA</span><span className="mt-1 block text-[8px] tracking-[0.6em]">BLOOMS</span></div>
          <span className="font-serif text-[15px] italic text-rose-deep">Gift voucher</span>
        </div>
        <p className="mt-auto font-serif text-[52px] leading-none text-forest sm:text-[64px]">${amount}</p>
        <p className="mt-3 truncate text-[13px] text-ink-soft">For {to || '—'} · from {from || '—'}</p>
        {message && <p className="mt-1 line-clamp-1 font-serif text-[14px] italic text-ink-soft">“{message}”</p>}
      </div>
    </div>
  )
}

function Voucher() {
  const { go } = useStore()
  return (
    <section className="bg-rose-pale">
      <div className="wrap grid items-center gap-12 py-20 md:grid-cols-2 md:py-24">
        <div className="mx-auto w-full max-w-[460px] -rotate-2">
          <VoucherCard amount={150} to="Mum" from="Ellie" />
        </div>
        <div className="md:pl-6">
          <h2 className="text-h2 text-forest">A little something beautiful.</h2>
          <p className="mt-4 max-w-[44ch] text-ink-soft">For flowers, plants or a workshop place — let them choose. Vouchers are emailed with your personal message, so they work for last-minute birthdays too.</p>
          <Button className="mt-8" variant="rose" onClick={() => go('vouchers')}>Explore Gift Vouchers</Button>
        </div>
      </div>
    </section>
  )
}

function Story() {
  return (
    <section className="wrap grid gap-12 py-24 md:grid-cols-12 md:gap-8 md:py-32">
      <div className="relative md:col-span-5">
        <Photo k="story" ratio="4/5" className="w-[82%]" />
        <div className="absolute -bottom-10 right-0 w-[44%] border-[6px] border-ivory"><Photo k="story2" ratio="1/1" caption={false} /></div>
      </div>
      <div className="md:col-span-6 md:col-start-7 md:self-center">
        <p className="font-serif text-[17px] italic text-ink-soft">Our studio</p>
        <p className="mt-5 font-serif text-[26px] leading-[1.35] text-forest md:text-[32px]">We think flowers look best when they look a little like they were picked: loose, layered and moving the way they grow.</p>
        <div className="mt-8 max-w-[56ch] space-y-4 text-ink-soft" style={{ lineHeight: 1.75 }}>
          <p>Every arrangement starts with what’s good that week. We buy from local growers wherever we can, condition every stem by hand and design without floral foam, so nothing goes to waste that doesn’t have to.</p>
          <p>Native Australian flowers have a special place in the studio — banksia, kangaroo paw and gum sit happily next to garden roses and sweet peas.</p>
        </div>
        <p className="mt-8 text-[14px] text-ink-mute">— <Ph>Founder’s name</Ph>, florist & owner</p>
        <Link to="about" className="mt-6 inline-block text-[15px] text-forest link-u">Read our story</Link>
      </div>
    </section>
  )
}

function Gallery() {
  const tiles = ['ig1', 'ig2', 'ig3', 'ig4', 'ig6']
  return (
    <section className="wrap pb-24 md:pb-28">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-h2 text-forest">From the studio bench</h2>
        <a href="https://instagram.com" className="flex items-center gap-2 text-[15px] text-ink-soft link-u"><Instagram size={17} strokeWidth={1.5} /> Follow along <Ph>@instagram handle</Ph></a>
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:grid-rows-2 md:gap-3">
        {tiles.map((t, i) => (
          <a key={t} href="https://instagram.com" className={`group block ${i === 0 ? 'col-span-2 row-span-2' : ''}`} aria-label="Instagram post">
            <Photo k={t} caption={i === 0} className="aspect-square h-full transition-opacity group-hover:opacity-90" />
          </a>
        ))}
      </div>
    </section>
  )
}
