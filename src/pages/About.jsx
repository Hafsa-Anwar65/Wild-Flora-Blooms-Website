import { Photo, Ph, Link, Button } from '../components/ui'
import { useStore } from '../store'

export default function About() {
  const { go } = useStore()
  return (
    <div>
      <section className="wrap grid gap-10 pb-16 pt-14 md:grid-cols-12 md:pt-20">
        <div className="md:col-span-6">
          <p className="font-serif text-[17px] italic text-ink-soft">About the studio</p>
          <h1 className="mt-3 text-h1 text-forest">A small studio with a big love of what’s in season.</h1>
        </div>
        <p className="self-end text-[17px] leading-relaxed text-ink-soft md:col-span-5 md:col-start-8">Wild Flora Blooms is a floral studio in Perth making bouquets, wedding flowers, wreaths and workshops. This page is a template for the studio’s own story — the placeholders below mark the details only the owner can write.</p>
      </section>
      <Photo k="story" className="h-[60vh] min-h-[380px] w-full" />
      <section className="wrap grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <p className="font-serif text-[28px] leading-[1.3] text-forest md:text-[34px]">“We want flowers to feel the way they do in a garden — a little wild, never fussy.”</p>
          <p className="mt-4 text-[14px] text-ink-mute">— <Ph>Founder’s name</Ph></p>
        </div>
        <div className="space-y-5 text-[16.5px] text-ink-soft md:col-span-6 md:col-start-7" style={{ lineHeight: 1.8 }}>
          <p><Ph>How the studio began — a paragraph in the owner’s own words.</Ph></p>
          <p>We design with whatever the season is doing best, buying from local growers where we can and pairing native Australian flowers with garden-style blooms. Every stem is conditioned by hand, and we arrange without floral foam.</p>
          <p>Alongside everyday bouquets we style weddings and events, make Christmas wreaths each December and run small workshops in the studio.</p>
          <div className="grid grid-cols-2 gap-6 border-t border-linen pt-8">
            {[['Seasonal first', 'We design to what’s best at market, not a fixed catalogue.'], ['Foam-free', 'Reusable mechanics instead of single-use floral foam.'], ['Native & garden', 'Banksia beside garden roses — we love both.'], ['Made by hand', 'Every bouquet, card and wreath, in the studio.']].map(([t, d]) => (
              <div key={t}><p className="font-serif text-[20px] text-ink">{t}</p><p className="mt-1 text-[14.5px]">{d}</p></div>
            ))}
          </div>
          <Button className="mt-6" onClick={() => go('shop')}>Shop flowers</Button>
        </div>
      </section>
    </div>
  )
}
