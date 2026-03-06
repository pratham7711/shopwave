# 🛍️ ShopWave

> **A full-featured e-commerce storefront — browse, cart, checkout, and pay, all in one slick React app.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-6366f1?style=for-the-badge&logo=vercel)](https://shopwave-green.vercel.app)

---

## ✨ Features

- 🛒 **Full shopping cart** — add, remove, and update quantities with persistent state via Zustand
- 💳 **Stripe checkout** — secure payment flow powered by `@stripe/stripe-js`
- 🔍 **Product browsing** — filterable product grid with category navigation and search
- 🔔 **Toast notifications** — instant feedback on cart actions via `react-hot-toast`
- 🧭 **Client-side routing** — smooth SPA navigation with React Router v7
- 🎬 **Animated UI** — page transitions and micro-interactions with Framer Motion and GSAP
- 📱 **Fully responsive** — mobile-optimized layout from product grid to checkout

---

## 🖼️ Screenshot

> _Add a screenshot here — e.g. `public/screenshot.png`_

![ShopWave Screenshot](public/screenshot.png)

---

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React%2019-61DAFB?style=flat-square&logo=react&logoColor=000)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=fff)
![Zustand](https://img.shields.io/badge/Zustand-FF6B35?style=flat-square)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=fff)
![React Router](https://img.shields.io/badge/React%20Router%20v7-CA4245?style=flat-square&logo=react-router&logoColor=fff)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=flat-square&logo=framer&logoColor=fff)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square)
![Vite](https://img.shields.io/badge/Vite%207-646CFF?style=flat-square&logo=vite&logoColor=fff)

---

## 🚀 Local Setup

### Prerequisites

- Node.js 18+
- A [Stripe](https://stripe.com) account (for test API keys)

### 1. Clone the repo

```bash
git clone https://github.com/pratham7711/shopwave.git
cd shopwave
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:4000    # optional backend URL
```

> **Note:** In demo mode (no backend), checkout simulates a payment without hitting Stripe.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🏗️ Build for Production

```bash
npm run build     # TypeScript compile + Vite bundle → dist/
npm run preview   # Preview the production build locally
```

Deploy the `dist/` folder to Vercel, Netlify, or any static host.

---

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components (Navbar, ProductCard, Cart)
├── pages/            # Route-level pages (Home, Products, Product, Checkout)
├── store/            # Zustand cart and auth stores
├── hooks/            # Custom React hooks
├── utils/            # Stripe helpers, formatters
└── types/            # TypeScript interfaces
```

---

## 📄 License

MIT — free to use, modify, and distribute.

---

<p align="center">Built by <a href="https://github.com/pratham7711">Pratham</a> · Powered by React + Zustand + Stripe</p>
