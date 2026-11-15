import { Photo, Button } from '../components/ui'
import { useStore } from '../store'
import { contact } from '../data'

export default function About() {
  const { go } = useStore()
  return (
    <div>
      <section className="bg-sage text-white">
        <div className="wrap grid items-center gap-10 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-14 md:py-24">
          <div>
            <h1 className="wf-h1 !text-white">About Wild Flora Blooms, florist in Coogee</h1>
            <div className="wf-body mt-6 space-y-5 text-[18px] text-white/95">
              <p>Hi, I’m Lora, the florist behind Wild Flora Blooms, based in Coogee, just south of Perth.</p>
              <p>I create natural, seasonal floral arrangements using locally grown blooms wherever possible, with a focus on a more thoughtful and sustainable approach.</p>
              <p>From wedding flowers and event styling to handcrafted bouquets, I work closely with my clients to bring their ideas to life in a way that feels modern, earthy, and true to them.</p>
              <p>I also offer private floral workshops, including wreath making, create your own bouquets and flower crown sessions for hens parties, birthdays and special occasions.</p>
            </div>
          </div>
          <Photo k="lora" className="aspect-[425/476] w-full" position="center top" />
        </div>
      </section>
      <section className="wrap grid gap-10 py-16 md:grid-cols-3 md:py-20">
        {[['Seasonal & local', 'Locally grown blooms wherever possible, chosen for what the season is doing best.', 's4'], ['Thoughtful & sustainable', 'Prioritising local flowers to consciously reduce environmental impact.', 's8'], ['Made for you', 'Designs that feel modern, earthy and true to each client.', 'w5']].map(([t, d, k]) => (
          <div key={t} className="text-center">
            <Photo k={k} caption={false} ratio="4/5" />
            <h2 className="mt-6 font-serif text-[21px] italic tracking-[0.08em]">{t}</h2>
            <p className="mx-auto mt-3 max-w-[32ch] font-serif text-[17px] italic text-ink-soft">{d}</p>
          </div>
        ))}
      </section>
      <section className="border-t border-linen">
        <div className="wrap py-14 text-center">
          <p className="wf-lead mx-auto max-w-[56ch] text-[19px]">I’d love to hear from you and help create something beautiful for your moment.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={() => go('shop')}>Shop bouquets</Button>
            <Button onClick={() => go('contact')}>Get in touch</Button>
            <Button as="a" variant="outline" href={`tel:${contact.tel}`}>Call {contact.phone}</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
