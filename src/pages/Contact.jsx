import { ContactSection } from './Home'
import { contact } from '../data'

export default function Contact() {
  return (
    <>
      <ContactSection standalone />
      <section className="border-t border-linen">
        <div className="wrap grid gap-8 py-14 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[['Phone', <a key="p" href={`tel:${contact.tel}`} className="link-u">{contact.phone}</a>], ['Email', <a key="e" href={`mailto:${contact.email}`} className="link-u break-all">{contact.email}</a>], ['Office hours', contact.hours], ['Based in', contact.area]].map(([t, v]) => (
            <div key={t}><p className="label">{t}</p><p className="font-serif text-[19px] italic">{v}</p></div>
          ))}
        </div>
      </section>
    </>
  )
}
