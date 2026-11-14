# Wild Flora Blooms — website rebuild (React)

Rebuilt in code to match the look of the current live site (Cormorant + Cantarell, #FAF5F5 / #A2AC86), with the new shop, checkout, workshops, vouchers, wedding enquiry and Xero admin concept added.

React 18 + Tailwind CSS 3 + Lucide icons, built with Vite.

## Run
    npm install
    npm run dev          # local dev server
    npm run build        # production build -> dist/
    npm run build:single # one self-contained HTML file -> dist-single/

## Structure
    src/data.js              mock products, workshops, enquiries, store settings, photo briefs
    src/store.jsx            hash router, cart state, toasts
    src/components/ui.jsx    design-system primitives (Photo, Button, Field, Ph placeholder, DemoNote…)
    src/components/Layout.jsx  announcement bar, header/mega-menu, mobile menu, search, cart drawer, footer
    src/components/ProductCard.jsx  product card + quick-shop modal
    src/pages/*              Home, Shop, Product, Checkout, Workshops, Vouchers, Weddings, About, Contact, Admin
    tailwind.config.js       colour + type tokens

## Photography
Photos are the client's own images, loaded from the live site's image CDN (static.showit.co).
Before launch, download them into /public/images and update `src` in `photos` (src/data.js).
Orchid, native bouquet and voucher photos are still placeholders (src: null) — studio to supply.

## What is demo-only
Prices, sessions, enquiries, delivery fee, payment gateway, Xero integration, emails and
newsletter are mock/placeholder. Dashed-outline text marks details the studio must confirm.
