# Kulcha King & Parantha Singh

A responsive restaurant website and online menu for Kulcha King & Parantha Singh in Mansarovar, Jaipur. Built with React, Vite, and Tailwind CSS.

## Features

- Restaurant home, about, and contact pages
- Searchable menu with categories, sorting, and filters
- Shopping cart, item customization, and checkout
- UPI payment links and WhatsApp order/status links
- Order-management page with browser notifications
- Privacy, terms, and refund policy pages

## Requirements

- Node.js 18 or later
- npm

## Getting started

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Build

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`. Vite builds separate HTML entry points for each page:

| Page | Entry point |
| --- | --- |
| Home | `index.html` |
| Menu | `menu.html` |
| About | `about.html` |
| Contact | `contact.html` |
| Order management | `admin.html` |
| Terms | `terms.html` |
| Privacy | `privacy.html` |
| Refund policy | `refund.html` |
| Not found | `404.html` |

## Project structure

- `src/pages/` — page components
- `src/components/` — shared interface and ordering components
- `src/data/` — restaurant details and menu items
- `src/context/CartContext.jsx` — shared cart state
- `src/lib/orderService.js` — browser-based order storage and order links
- `components/ui/` and `lib/` — reusable UI components and utilities
- `public/` — static assets

## Order handling notes

Orders are stored in the browser's `localStorage`; this project does not include a server-side order database. As a result, orders are not automatically shared between customers' devices and the order-management page. Email notifications use FormSubmit, while payment and messaging actions open UPI or WhatsApp links.

The order-management page's PIN check runs in client-side code and is not secure authentication. Do not use it to protect sensitive order or customer data without adding a properly secured backend.
