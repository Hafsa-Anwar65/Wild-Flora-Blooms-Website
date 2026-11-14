# Wild Flora Blooms — proposed website redesign (interactive mockup)

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
Every image is an art-directed placeholder plate with a shot brief. To use real photos,
set `src` for the matching key in `photos` (src/data.js), e.g.
    hero: { src: '/images/hero.jpg', shot: '…', tones: [...] }

## What is demo-only
Prices, sessions, enquiries, delivery fee, payment gateway, Xero integration, emails and
newsletter are mock/placeholder. Dashed-outline text marks details the studio must confirm.
