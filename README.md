# AuroraShop

A modern, responsive e-commerce storefront design, built as a portfolio project.

This first phase focuses purely on the **frontend design** — a full shopping experience with mock data and no backend/database yet, so the UI/UX can be reviewed before wiring up real data and payments.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Material UI (MUI) v5** for components and theming
- **React Router v7** for client-side routing
- Cart and wishlist state persisted to `localStorage` (no backend yet)

## Pages

- Home (hero, categories, best sellers, deals, new arrivals)
- Product catalog with filters (category, price, rating) and sorting
- Product detail (gallery, color/quantity selection, tabs, related products)
- Cart
- Checkout (shipping → payment → review), with international card, local payment method (auto-suggested by country), PayPal, and cash-on-delivery options
- Order confirmation
- Login / Register
- Wishlist

Light and dark mode are both supported, and the layout is fully responsive from mobile to desktop.

## Running locally

```bash
cd frontend
npm install
npm run dev
```

## Next steps

- Node.js/Express backend + database (planned once the design is approved)
- Real authentication and payment integration
