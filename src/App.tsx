import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Nav from './components/Nav'
import Footer from './components/Footer'
// Home loads eagerly — it's the first thing users see
import Home from './pages/Home'

// All other pages are lazy-loaded so their JS is only fetched when navigated to
const Products    = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart        = lazy(() => import('./pages/Cart'))
const Checkout    = lazy(() => import('./pages/Checkout'))

/** Minimal skeleton shown while a lazy page chunk loads */
function PageSkeleton() {
  return (
    <div
      style={{
        minHeight: '60vh',
        padding: '48px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {/* Header row */}
      <div className="skeleton" style={{ height: 32, width: '30%', borderRadius: 8 }} />
      {/* Product grid skeleton */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 20,
          marginTop: 16,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="skeleton" style={{ height: 240, borderRadius: 12 }} />
            <div className="skeleton" style={{ height: 18, width: '70%', borderRadius: 6 }} />
            <div className="skeleton" style={{ height: 14, width: '40%', borderRadius: 6 }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1A1A1A',
            color: '#fff',
            border: '1px solid #262626',
            fontFamily: 'Inter, sans-serif',
          },
          success: {
            iconTheme: { primary: '#FBBF24', secondary: '#0C0C0C' },
          },
        }}
      />
      <Nav />
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/products"     element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart"         element={<Cart />} />
          <Route path="/checkout"     element={<Checkout />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  )
}
