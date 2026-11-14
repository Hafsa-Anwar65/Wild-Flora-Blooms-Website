import { StoreProvider, useStore } from './store'
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

function Router() {
  const { route } = useStore()
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
