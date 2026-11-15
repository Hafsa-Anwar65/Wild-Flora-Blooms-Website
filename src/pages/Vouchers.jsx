import { useState } from 'react'
import { Mail, Printer } from 'lucide-react'
import { voucherAmounts, fmt2 } from '../data'
import { Button, Field, DemoNote, Ph } from '../components/ui'
import { LOGO } from '../data'
import { useStore } from '../store'

export default function Vouchers() {
  const { add } = useStore()
  const [amount, setAmount] = useState(100)
  const [custom, setCustom] = useState('')
  const [useCustom, setUseCustom] = useState(false)
  const [f, setF] = useState({ recipient: '', sender: '', message: '', delivery: 'email', recipientEmail: '', sendDate: '' })
  const [err, setErr] = useState({})
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const value = useCustom ? Number(custom) || 0 : amount

  const submit = (e) => {
    e.preventDefault()
    const x = {}
    if (useCustom && (!Number.isFinite(Number(custom)) || Number(custom) < 25 || Number(custom) > 1000)) x.amount = 'Enter an amount between $25 and $1,000 (demo limits)'
    if (!f.recipient.trim()) x.recipient = 'Who is the voucher for?'
    if (!f.sender.trim()) x.sender = 'Add your name so they know who it’s from'
    if (f.delivery === 'email' && !/^\S+@\S+\.\S+$/.test(f.recipientEmail)) x.recipientEmail = 'Enter the recipient’s email address'
    setErr(x)
    if (Object.keys(x).length) return
    add({ kind: 'voucher', productId: 'voucher', size: `$${value}`, price: value, qty: 1, options: { recipient: f.recipient, sender: f.sender, message: f.message, delivery: f.delivery, recipientEmail: f.recipientEmail, sendDate: f.sendDate } })
  }

  return (
    <div className="bg-rose-pale/60">
      <div className="wrap grid gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p className="font-serif text-[19px] italic text-ink-soft">Gift vouchers</p>
          <h1 className="mt-3 wf-h1">Flower & workshop gift vouchers</h1>
          <p className="mt-4 max-w-[48ch] text-[19px] text-ink-soft">Redeemable for flowers, plants or a workshop place. We email it with your message, ready to forward or print.</p>
          <div className="mt-10 lg:sticky lg:top-[170px]">
            <div className="mx-auto max-w-[520px] -rotate-1 transition-transform"><VoucherCard amount={value || 0} to={f.recipient || 'Someone lovely'} from={f.sender || 'You'} message={f.message} /></div>
            <p className="mt-6 text-center text-[15px] text-ink-mute">Live preview · validity period <Ph>to confirm</Ph></p>
          </div>
        </div>

        <form onSubmit={submit} noValidate className="lg:col-span-6">
          <div className="border border-linen bg-ivory p-6 md:p-10">
            <fieldset>
              <legend className="label">Choose an amount</legend>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {voucherAmounts.map((a) => (
                  <button type="button" key={a} onClick={() => { setAmount(a); setUseCustom(false) }} aria-pressed={!useCustom && amount === a}
                    className={`h-12 rounded-[2px] border text-[17px] ${!useCustom && amount === a ? 'border-forest bg-forest text-ivory' : 'border-linen bg-white/60 hover:border-forest'}`}>${a}</button>
                ))}
                <button type="button" onClick={() => setUseCustom(true)} aria-pressed={useCustom} className={`h-12 rounded-[2px] border text-[17px] ${useCustom ? 'border-forest bg-forest text-ivory' : 'border-linen bg-white/60 hover:border-forest'}`}>Other</button>
              </div>
              {useCustom && (
                <Field label="Custom amount (AUD)" error={err.amount} className="mt-4">
                  <div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-mute">$</span><input autoFocus inputMode="numeric" value={custom} onChange={(e) => setCustom(e.target.value.replace(/[^\d]/g, ''))} className={`field pl-8 ${err.amount ? 'field-err' : ''}`} placeholder="120" /></div>
                </Field>
              )}
            </fieldset>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Field label="Recipient’s name" error={err.recipient}><input value={f.recipient} onChange={set('recipient')} className={`field ${err.recipient ? 'field-err' : ''}`} /></Field>
              <Field label="Your name" error={err.sender}><input value={f.sender} onChange={set('sender')} className={`field ${err.sender ? 'field-err' : ''}`} /></Field>
              <Field label="Personal message" className="sm:col-span-2" hint={`${f.message.length}/240`}><textarea rows={3} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value.slice(0, 240) })} className="field resize-none font-serif text-[18px] italic" placeholder="Happy birthday! Treat yourself to something lovely." /></Field>
            </div>

            <fieldset className="mt-8">
              <legend className="label">How should it arrive?</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {[{ id: 'email', icon: Mail, t: 'Email it to them', d: 'On a date you choose' }, { id: 'self', icon: Printer, t: 'Email it to me', d: 'To print or forward' }].map((o) => (
                  <label key={o.id} className={`flex cursor-pointer items-start gap-3 rounded-[2px] border p-4 ${f.delivery === o.id ? 'border-forest bg-white' : 'border-linen bg-white/50'}`}>
                    <input type="radio" name="vd" className="mt-1 accent-forest" checked={f.delivery === o.id} onChange={() => setF({ ...f, delivery: o.id })} />
                    <o.icon size={18} strokeWidth={1.5} className="mt-0.5 text-forest" /><span><span className="block text-[17px]">{o.t}</span><span className="text-[15px] text-ink-mute">{o.d}</span></span>
                  </label>
                ))}
              </div>
              {f.delivery === 'email' && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="Recipient’s email" error={err.recipientEmail}><input type="email" value={f.recipientEmail} onChange={set('recipientEmail')} className={`field ${err.recipientEmail ? 'field-err' : ''}`} /></Field>
                  <Field label="Send on" hint="Leave blank to send straight away"><input type="date" value={f.sendDate} onChange={set('sendDate')} className="field" /></Field>
                </div>
              )}
            </fieldset>

            <Button type="submit" size="lg" className="mt-8 w-full">Add voucher to bag · {fmt2(value || 0)}</Button>
            <DemoNote className="mt-4">Voucher codes and emails are sent automatically once the shop is live.</DemoNote>
          </div>
        </form>
      </div>
    </div>
  )
}

export function VoucherCard({ amount = 100, to = 'Someone lovely', from = 'You', message, className = '' }) {
  return (
    <div className={`relative aspect-[1.6/1] w-full overflow-hidden bg-ivory p-6 shadow-[0_30px_60px_-36px_rgba(0,0,0,.45)] sm:p-8 ${className}`}>
      <div className="absolute inset-3 border border-sage" />
      <div className="relative flex h-full flex-col items-center text-center">
        <img src={LOGO} alt="" className="h-[38%] w-auto" />
        <p className="mt-auto font-serif text-[46px] italic leading-none text-ink sm:text-[56px]">${amount}</p>
        <p className="mt-2 font-caps text-[10.5px] uppercase tracking-[0.2em] text-ink-soft">Gift voucher · for {to} · from {from}</p>
        {message && <p className="mt-1 line-clamp-1 font-serif text-[15px] italic text-ink-soft">“{message}”</p>}
      </div>
    </div>
  )
}
