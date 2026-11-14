import { useMemo, useState } from 'react'
import { Bell, ChevronLeft, FileText, Send, CheckCircle2, Receipt, CircleDollarSign, Eye, Inbox, AlertCircle, Clock, Link2 } from 'lucide-react'
import { enquiries as seed, workflowSteps, niceDate } from '../data'
import { DemoNote, Link } from '../components/ui'
import { useStore } from '../store'

const QUOTE = { 'not-started': ['Not started', 'bg-linen text-ink-soft'], draft: ['Draft in Xero', 'bg-rose-pale text-rose-deep'], sent: ['Quote sent', 'bg-sage-pale text-forest'], accepted: ['Accepted', 'bg-forest text-ivory'] }
const FOLLOW = { none: ['—', 'text-ink-mute'], scheduled: ['Scheduled', 'text-ink-soft'], due: ['Due today', 'text-rose-deep'], overdue: ['Overdue', 'text-clay'] }
const OWNER = ['site', 'site', 'owner', 'xero', 'xero', 'auto', 'site', 'xero', 'xero']
const OWNER_LABEL = { site: 'Website', owner: 'Studio owner', xero: 'Xero', auto: 'Automation' }

export default function Admin() {
  const { flash } = useStore()
  const [list, setList] = useState(seed)
  const [tab, setTab] = useState('overview')
  const [activeId, setActiveId] = useState(seed[0].id)
  const [mobileDetail, setMobileDetail] = useState(false)
  const [filter, setFilter] = useState('all')
  const active = list.find((e) => e.id === activeId)

  const stats = useMemo(() => ({
    total: list.length,
    pending: list.filter((e) => e.quote === 'not-started' || e.quote === 'draft' || e.quote === 'sent').length,
    accepted: list.filter((e) => e.quote === 'accepted').length,
    outstanding: list.filter((e) => e.invoice === 'awaiting').length,
    reminders: list.filter((e) => e.followUp === 'due' || e.followUp === 'overdue').length,
    newOnes: list.filter((e) => e.stage <= 2).length,
  }), [list])

  const update = (id, patch, msg) => { setList((l) => l.map((e) => (e.id === id ? { ...e, ...patch } : e))); if (msg) flash(msg) }
  const filtered = list.filter((e) => filter === 'all' || (filter === 'new' && e.stage <= 2) || (filter === 'reminders' && (e.followUp === 'due' || e.followUp === 'overdue')) || (filter === 'quotes' && e.quote !== 'accepted' && e.stage > 2))

  return (
    <div className="min-h-screen bg-[#F2EEE6]">
      <div className="border-b border-linen bg-ivory">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-5">
          <div>
            <p className="text-[13px] text-ink-mute"><Link to="home" className="link-u">Website</Link> / Studio admin</p>
            <h1 className="mt-1 font-serif text-[30px] text-forest">Enquiries & quoting</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-[2px] border border-dashed border-sage px-3 py-2 text-[13px] text-ink-soft"><Link2 size={14} /> Xero: not connected — proposed integration</span>
          </div>
        </div>
        <div className="wrap flex gap-1">
          {[['overview', 'Overview'], ['enquiries', `Enquiries (${list.length})`]].map(([id, l]) => (
            <button key={id} onClick={() => setTab(id)} className={`-mb-px border-b-2 px-4 py-3 text-[14.5px] ${tab === id ? 'border-forest text-forest' : 'border-transparent text-ink-soft hover:text-forest'}`}>{l}</button>
          ))}
        </div>
      </div>

      <div className="wrap py-8 md:py-10">
        <DemoNote className="mb-8">This dashboard is a visual concept showing how wedding enquiries could flow into Xero quotes and invoices. All data is fictional; buttons update the mockup only and do not contact Xero or send email.</DemoNote>

        {tab === 'overview' ? (
          <>
            {/* KPI ledger */}
            <div className="grid grid-cols-2 gap-px border border-linen bg-linen sm:grid-cols-3 lg:grid-cols-5">
              {[['Total enquiries', stats.total, Inbox, 'all'], ['Pending quotations', stats.pending, FileText, 'quotes'], ['Accepted quotations', stats.accepted, CheckCircle2, 'all'], ['Outstanding invoices', stats.outstanding, Receipt, 'all'], ['Follow-up reminders', stats.reminders, Bell, 'reminders']].map(([l, v, Icon, f], i) => (
                <button key={l} onClick={() => { setTab('enquiries'); setFilter(f) }} className={`group bg-ivory p-5 text-left hover:bg-white md:p-6 ${i === 4 ? 'col-span-2 sm:col-span-1' : ''}`}>
                  <span className="flex items-center gap-2 text-[13px] text-ink-mute"><Icon size={15} strokeWidth={1.6} />{l}</span>
                  <span className={`mt-3 block font-serif text-[40px] leading-none ${l.startsWith('Follow') && v ? 'text-clay' : 'text-forest'}`}>{v}</span>
                </button>
              ))}
            </div>

            {/* Workflow */}
            <section className="mt-10 border border-linen bg-ivory p-6 md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-serif text-[24px] text-forest">Enquiry to invoice workflow</h2>
                <div className="flex flex-wrap gap-4 text-[12.5px] text-ink-mute">
                  {Object.entries(OWNER_LABEL).map(([k, l]) => <span key={k} className="flex items-center gap-1.5"><span className={`h-2.5 w-2.5 rounded-full ${dot(k)}`} />{l}</span>)}
                </div>
              </div>
              <ol className="mt-8 grid gap-0 md:grid-cols-9">
                {workflowSteps.map((s, i) => {
                  const count = list.filter((e) => e.stage === i + 1).length
                  return (
                    <li key={s} className="relative flex gap-4 pb-6 md:block md:pb-0 md:pr-3">
                      <div className="flex flex-col items-center md:flex-row">
                        <span className={`relative z-[1] grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] ${dot(OWNER[i])} ${OWNER[i] === 'xero' || OWNER[i] === 'site' ? 'text-ivory' : 'text-ink'}`}>{i + 1}</span>
                        {i < 8 && <span className="w-px flex-1 bg-linen md:h-px md:w-full md:flex-1" />}
                      </div>
                      <div className="md:mt-3">
                        <p className="text-[14px] leading-snug text-ink">{s}{(i === 5) && <span className="block text-[12px] text-ink-mute">where supported</span>}</p>
                        <p className="mt-1 text-[12px] text-ink-mute">{OWNER_LABEL[OWNER[i]]}{count ? ` · ${count} here` : ''}</p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </section>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <section className="border border-linen bg-ivory p-6 md:p-8">
                <h2 className="flex items-center gap-2 font-serif text-[22px] text-forest"><Bell size={18} strokeWidth={1.6} /> Follow-up reminders</h2>
                <ul className="mt-5 divide-y divide-linen">
                  {list.filter((e) => e.followUp !== 'none').map((e) => (
                    <li key={e.id} className="flex items-center justify-between gap-4 py-3.5">
                      <div><p className="text-[15px]">{e.name}</p><p className="text-[13px] text-ink-mute">{e.id} · {QUOTE[e.quote][0]}</p></div>
                      <div className="flex items-center gap-3"><span className={`text-[13px] ${FOLLOW[e.followUp][1]}`}>{FOLLOW[e.followUp][0]}</span>
                        <button onClick={() => { setActiveId(e.id); setTab('enquiries'); setMobileDetail(true) }} className="text-[13px] text-forest link-u">Open</button></div>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="border border-linen bg-ivory p-6 md:p-8">
                <h2 className="flex items-center gap-2 font-serif text-[22px] text-forest"><CircleDollarSign size={18} strokeWidth={1.6} /> Invoices (from Xero)</h2>
                <ul className="mt-5 divide-y divide-linen">
                  {list.filter((e) => e.invoice).map((e) => (
                    <li key={e.id} className="flex items-center justify-between py-3.5">
                      <div><p className="text-[15px]">{e.name}</p><p className="text-[13px] text-ink-mute">Wedding {niceDate(e.date, { day: 'numeric', month: 'short', year: 'numeric' })}</p></div>
                      <span className={`rounded-[2px] px-2 py-1 text-[12.5px] ${e.invoice === 'paid' ? 'bg-sage-pale text-forest' : 'bg-rose-pale text-rose-deep'}`}>{e.invoice === 'paid' ? 'Paid' : 'Awaiting payment'}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[12.5px] text-ink-mute">Payment status would sync from Xero. Amounts are not shown in this concept.</p>
              </section>
            </div>
          </>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
            {/* List */}
            <section className={`border border-linen bg-ivory ${mobileDetail ? 'hidden lg:block' : ''}`}>
              <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-linen p-3">
                {[['all', 'All'], ['new', `New (${stats.newOnes})`], ['quotes', 'Quotes in progress'], ['reminders', `Reminders (${stats.reminders})`]].map(([id, l]) => (
                  <button key={id} onClick={() => setFilter(id)} className={`h-8 shrink-0 rounded-[2px] px-3 text-[13.5px] ${filter === id ? 'bg-forest text-ivory' : 'text-ink-soft hover:bg-forest/5'}`}>{l}</button>
                ))}
              </div>
              <ul className="divide-y divide-linen">
                {filtered.map((e) => (
                  <li key={e.id}>
                    <button onClick={() => { setActiveId(e.id); setMobileDetail(true) }} className={`flex w-full items-start gap-3 px-4 py-4 text-left hover:bg-white ${e.id === activeId ? 'lg:bg-white lg:shadow-[inset_3px_0_0_#22372A]' : ''}`}>
                      <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${e.stage <= 2 ? 'bg-rose-deep' : 'bg-transparent'}`} aria-label={e.stage <= 2 ? 'New' : undefined} />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline justify-between gap-3"><span className="truncate text-[15px] text-ink">{e.name}</span><span className="shrink-0 text-[12.5px] text-ink-mute">{niceDate(e.received, { day: 'numeric', month: 'short' })}</span></span>
                        <span className="mt-0.5 block text-[13px] text-ink-mute">Wedding {niceDate(e.date, { day: 'numeric', month: 'short', year: 'numeric' })} · {e.guests} guests · {e.budget}</span>
                        <span className="mt-2 flex flex-wrap items-center gap-2">
                          <span className={`rounded-[2px] px-2 py-0.5 text-[12px] ${QUOTE[e.quote][1]}`}>{QUOTE[e.quote][0]}</span>
                          {(e.followUp === 'due' || e.followUp === 'overdue') && <span className={`flex items-center gap-1 text-[12px] ${FOLLOW[e.followUp][1]}`}><AlertCircle size={12} />Follow-up {FOLLOW[e.followUp][0].toLowerCase()}</span>}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
                {!filtered.length && <li className="p-6 text-[14px] text-ink-soft">No enquiries in this view.</li>}
              </ul>
            </section>

            {/* Detail */}
            {active && (
              <section className={`border border-linen bg-ivory ${mobileDetail ? '' : 'hidden lg:block'}`}>
                <div className="border-b border-linen p-5 md:p-7">
                  <button onClick={() => setMobileDetail(false)} className="mb-3 flex items-center gap-1 text-[13px] text-ink-soft lg:hidden"><ChevronLeft size={15} /> All enquiries</button>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[13px] text-ink-mute">{active.id} · received {niceDate(active.received, { day: 'numeric', month: 'long' })}</p>
                      <h2 className="mt-1 font-serif text-[28px] leading-tight text-forest">{active.name}</h2>
                    </div>
                    <span className={`rounded-[2px] px-2.5 py-1 text-[12.5px] ${QUOTE[active.quote][1]}`}>{QUOTE[active.quote][0]}</span>
                  </div>
                  <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-[14.5px] md:grid-cols-3">
                    <Info t="Wedding date" v={niceDate(active.date, { day: 'numeric', month: 'long', year: 'numeric' })} />
                    <Info t="Venue" v={active.venue} />
                    <Info t="Guests" v={active.guests} />
                    <Info t="Budget" v={active.budget} />
                    <Info t="Email" v={active.email} />
                    <Info t="Phone" v={active.phone} />
                  </dl>
                  <div className="mt-5"><p className="text-[13px] text-ink-mute">Floral requirements</p><div className="mt-2 flex flex-wrap gap-1.5">{active.requirements.map((r) => <span key={r} className="rounded-full border border-linen px-3 py-1 text-[13px]">{r}</span>)}</div></div>
                  {active.notes && <p className="mt-5 border-l-2 border-rose pl-4 font-serif text-[16px] italic text-ink-soft">“{active.notes}”</p>}
                </div>

                {/* Progress */}
                <div className="border-b border-linen p-5 md:p-7">
                  <p className="text-[13px] text-ink-mute">Progress</p>
                  <div className="mt-3 flex gap-1" aria-label={`Step ${active.stage} of 9`}>
                    {workflowSteps.map((s, i) => <span key={s} title={s} className={`h-1.5 flex-1 rounded-full ${i < active.stage ? 'bg-forest' : 'bg-linen'}`} />)}
                  </div>
                  <p className="mt-2 text-[14px]">Step {active.stage} of 9: <span className="text-forest">{workflowSteps[active.stage - 1]}</span></p>
                </div>

                {/* Actions */}
                <div className="grid gap-6 p-5 md:grid-cols-2 md:p-7">
                  <div>
                    <p className="label">Next action</p>
                    <NextAction e={active} update={update} />
                  </div>
                  <div className="space-y-4">
                    <label className="block"><span className="label">Quote status</span>
                      <select value={active.quote} onChange={(ev) => update(active.id, { quote: ev.target.value })} className="field h-11 py-2">
                        {Object.entries(QUOTE).map(([k, [l]]) => <option key={k} value={k}>{l}</option>)}
                      </select></label>
                    <label className="block"><span className="label">Follow-up</span>
                      <select value={active.followUp} onChange={(ev) => update(active.id, { followUp: ev.target.value })} className="field h-11 py-2">
                        <option value="none">No follow-up needed</option><option value="scheduled">Scheduled</option><option value="due">Due today</option><option value="overdue">Overdue</option>
                      </select></label>
                    {(active.followUp === 'due' || active.followUp === 'overdue') && (
                      <p className={`flex items-center gap-2 text-[13px] ${FOLLOW[active.followUp][1]}`}><Clock size={14} /> Reminder: follow up with {active.name.split(' ')[0]} {active.followUp === 'overdue' ? '— this is overdue' : 'today'}.</p>
                    )}
                  </div>
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function dot(k) { return { site: 'bg-forest', owner: 'bg-rose', xero: 'bg-[#2C6E8E]', auto: 'bg-sage-light' }[k] }
function Info({ t, v }) { return <div><dt className="text-[13px] text-ink-mute">{t}</dt><dd className="mt-0.5 break-words">{v}</dd></div> }

function NextAction({ e, update }) {
  const A = ({ icon: Icon, label, patch, msg, variant = 'primary' }) => (
    <button onClick={() => update(e.id, patch, msg)} className={`flex h-11 w-full items-center justify-center gap-2 rounded-[2px] text-[14.5px] ${variant === 'primary' ? 'bg-forest text-ivory hover:bg-forest-deep' : 'border border-forest/60 text-forest hover:bg-forest/5'}`}><Icon size={16} strokeWidth={1.6} />{label}</button>
  )
  const steps = {
    1: <A icon={Eye} label="Mark as reviewed" patch={{ stage: 3 }} msg="Marked as reviewed" />,
    2: <A icon={Eye} label="Mark as reviewed" patch={{ stage: 3 }} msg="Marked as reviewed" />,
    3: <A icon={FileText} label="Create quote in Xero" patch={{ stage: 4, quote: 'draft' }} msg="Demo: draft quote would be created in Xero" />,
    4: <A icon={Send} label="Send quote to customer" patch={{ stage: 6, quote: 'sent', followUp: 'scheduled' }} msg="Demo: quote sent and follow-up scheduled" />,
    5: <A icon={Send} label="Send quote to customer" patch={{ stage: 6, quote: 'sent', followUp: 'scheduled' }} msg="Demo: quote sent and follow-up scheduled" />,
    6: <><A icon={CheckCircle2} label="Mark quote accepted" patch={{ stage: 7, quote: 'accepted', followUp: 'none' }} msg="Quote marked accepted" /><div className="mt-2"><A variant="outline" icon={Bell} label="Send follow-up reminder" patch={{ followUp: 'scheduled' }} msg="Demo: follow-up email would be sent" /></div></>,
    7: <A icon={Receipt} label="Generate invoice in Xero" patch={{ stage: 8, invoice: 'awaiting' }} msg="Demo: invoice would be generated in Xero" />,
    8: <A icon={CircleDollarSign} label="Record payment (sync)" patch={{ stage: 9, invoice: 'paid' }} msg="Demo: payment status synced from Xero" />,
    9: <p className="flex items-center gap-2 text-[14.5px] text-forest"><CheckCircle2 size={17} /> Paid — nothing left to do.</p>,
  }
  return <div>{steps[e.stage]}<p className="mt-3 text-[12.5px] text-ink-mute">Actions update this mockup only.</p></div>
}
