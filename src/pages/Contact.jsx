import { useState } from 'react'
import { Check, MapPin } from 'lucide-react'
import { Photo, Button, Field, Ph, DemoNote } from '../components/ui'

export default function Contact() {
  const [f, setF] = useState({ name: '', email: '', topic: 'An order', msg: '' })
  const [err, setErr] = useState({})
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const x = {}
    if (!f.name.trim()) x.name = 'Enter your name'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Enter a valid email address'
    if (f.msg.trim().length < 10) x.msg = 'Tell us a little more (at least 10 characters)'
    setErr(x); if (!Object.keys(x).length) setSent(true)
  }
  return (
    <div className="wrap grid gap-14 py-14 md:py-20 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="font-serif text-[17px] italic text-ink-soft">Contact</p>
        <h1 className="mt-3 text-h1 text-forest">Say hello.</h1>
        <p className="mt-4 max-w-[42ch] text-[17px] text-ink-soft">For orders, custom requests, corporate flowers or anything else. For weddings, the wedding enquiry form helps us reply with more detail.</p>
        <dl className="mt-10 space-y-5 border-t border-linen pt-8 text-[15.5px]">
          <div><dt className="text-[13px] text-ink-mute">Phone</dt><dd><Ph>studio phone number</Ph></dd></div>
          <div><dt className="text-[13px] text-ink-mute">Email</dt><dd><Ph>studio email address</Ph></dd></div>
          <div><dt className="text-[13px] text-ink-mute">Studio & collection</dt><dd><Ph>address or pickup point</Ph></dd></div>
          <div><dt className="text-[13px] text-ink-mute">Hours</dt><dd><Ph>opening hours</Ph></dd></div>
          <div><dt className="text-[13px] text-ink-mute">Delivery areas</dt><dd><Ph>suburbs / zones</Ph></dd></div>
        </dl>
        <div className="relative mt-10">
          <Photo k="story2" caption={false} ratio="16/9" />
          <span className="absolute inset-0 grid place-items-center"><span className="flex items-center gap-2 rounded-[2px] bg-ivory/90 px-3 py-2 text-[13px] text-ink-soft"><MapPin size={15} /> Map embed placeholder</span></span>
        </div>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        {sent ? (
          <div className="border border-linen bg-ivory-deep p-10">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-sage-pale text-forest"><Check size={22} /></span>
            <p className="mt-5 font-serif text-[30px] text-forest">Thanks, {f.name.split(' ')[0]}. Message received.</p>
            <DemoNote className="mt-6">Demo form — nothing was sent.</DemoNote>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="grid gap-5 border border-linen bg-ivory-deep p-6 md:p-10">
            <Field label="Your name" error={err.name}><input value={f.name} onChange={set('name')} className={`field ${err.name ? 'field-err' : ''}`} /></Field>
            <Field label="Email" error={err.email}><input type="email" value={f.email} onChange={set('email')} className={`field ${err.email ? 'field-err' : ''}`} /></Field>
            <Field label="What’s it about?"><select value={f.topic} onChange={set('topic')} className="field">{['An order', 'A custom arrangement', 'Corporate or recurring flowers', 'Workshops', 'Something else'].map((t) => <option key={t}>{t}</option>)}</select></Field>
            <Field label="Message" error={err.msg}><textarea rows={6} value={f.msg} onChange={set('msg')} className={`field resize-none ${err.msg ? 'field-err' : ''}`} /></Field>
            <Button type="submit" size="lg">Send message</Button>
          </form>
        )}
      </div>
    </div>
  )
}
