import { useEffect } from 'react'
import { StoreProvider, useStore } from './store'
import { products, categories } from './data'
import { Header, Footer, CartDrawer, SearchOverlay, Toast, ProposalBadge } from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import Workshops from './pages/Workshops'
import Vouchers from './pages/Vouchers'
import Weddings from './pages/Weddings'
import About from './pages/About'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

// Local SEO: unique title + description per view.
const SEO = {
  home: ['Florist Coogee & Perth | Flower Delivery, Wedding & Event Flowers | Wild Flora Blooms', 'Seasonal florist in Coogee, just south of Perth. Order seasonal and native bouquets, orchids and Christmas wreaths for delivery, or enquire about wedding and event flowers.'],
  shop: ['Flower Delivery Perth & Coogee | Shop Bouquets Online | Wild Flora Blooms', 'Shop seasonal and native bouquets, Phalaenopsis orchids and Christmas wreaths online. Delivery across Coogee and surrounding Perth areas, or collect from the studio.'],
  weddings: ['Wedding Florist Perth & Coogee | Wedding & Event Flowers | Wild Flora Blooms', 'Seasonal wedding flowers in Coogee and Perth — bridal bouquets, ceremony arbours and reception styling. Send a wedding enquiry for a tailored quote.'],
  workshops: ['Floral Workshops Perth | Wreath Making & Flower Crowns | Wild Flora Blooms', 'Book wreath making, create-your-own bouquet and flower crown workshops in Coogee, or a private workshop for hens parties and birthdays.'],
  vouchers: ['Flower Gift Vouchers Perth | Wild Flora Blooms', 'Gift vouchers for flowers, orchids and workshops, emailed with your personal message.'],
  about: ['About Lora | Seasonal Florist in Coogee | Wild Flora Blooms', 'Meet Lora, the florist behind Wild Flora Blooms in Coogee — natural, seasonal arrangements using locally grown blooms.'],
  contact: ['Contact | Florist in Coogee & Perth | Wild Flora Blooms', 'Enquire about weddings, events or bouquets. Call 0407 219 797 or send an enquiry.'],
  checkout: ['Checkout | Wild Flora Blooms', ''], admin: ['Studio admin (demo) | Wild Flora Blooms', ''],
}
function useSeo(route) {
  useEffect(() => {
    let [t, d] = SEO[route] || []
    if (route.startsWith('product-')) { const p = products.find((x) => 'product-' + x.id === route); if (p) { t = `${p.name} | Flower Delivery Coogee & Perth | Wild Flora Blooms`; d = p.short } }
    else if (route.startsWith('shop-')) { const c = categories.find((x) => 'shop-' + x.id === route); if (c) { t = `${c.name} | Flower Delivery Perth | Wild Flora Blooms`; d = `${c.blurb}. Delivered across Coogee and surrounding Perth areas.` } }
    if (!t) [t, d] = SEO.home
    document.title = t
    let m = document.querySelector('meta[name="description"]')
    if (m && d) m.setAttribute('content', d)
  }, [route])
}

function Router() {
  const { route } = useStore()
  useSeo(route)
  if (route === 'shop' || route.startsWith('shop-')) return <Shop />
  if (route.startsWith('product-')) return <Product />
  const map = { checkout: Checkout, workshops: Workshops, vouchers: Vouchers, weddings: Weddings, about: About, contact: Contact, admin: Admin }
  const P = map[route] || Home
  return <P />
}

export default function App() {
  return (
    <StoreProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:bg-ivory focus:px-3 focus:py-2">Skip to content</a>
      <Header />
      <main id="main"><Router /></main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <Toast />
      <ProposalBadge />
    </StoreProvider>
  )
}
