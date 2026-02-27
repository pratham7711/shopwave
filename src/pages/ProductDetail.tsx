import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { useCartStore } from '../store/cartStore'
import { getProductById, products } from '../data/products'
import ProductCard from '../components/ProductCard'

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 3 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width={size} height={size} viewBox="0 0 24 24">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={star <= rating ? 'var(--accent)' : 'var(--border)'}
          />
        </svg>
      ))}
    </span>
  )
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const product = getProductById(id ?? '')
  const [imgIdx, setImgIdx] = useState(0)
  const [qty, setQty] = useState(1)
  const addItem = useCartStore((s) => s.addItem)

  if (!product) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>🔍</div>
        <h2 style={{ fontFamily: 'Syne, sans-serif', marginBottom: 8 }}>Product not found</h2>
        <Link to="/products" className="btn-primary" style={{ marginTop: 16 }}>Browse All Products</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      })
    }
    toast.success(`${qty}× ${product.name} added to cart`)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate('/cart')
  }

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: 48, paddingBottom: 96 }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>Home</Link>
          <span>/</span>
          <Link to="/products" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>Products</Link>
          <span>/</span>
          <Link to={`/products?cat=${product.category}`} style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>{product.category}</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-secondary)' }}>{product.name}</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'start',
        }} className="detail-grid">
          {/* ── Image carousel ── */}
          <div>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              {/* Main image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={imgIdx}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35 }}
                  className="product-main-image"
                  style={{
                    height: 480,
                    borderRadius: 'var(--radius-lg)',
                    background: product.images[imgIdx],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '8rem',
                    marginBottom: 16,
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
                  }}
                >
                  <span style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))' }}>
                    {product.category === 'Headphones' ? '🎧'
                      : product.category === 'Laptops' ? '💻'
                      : product.category === 'Phones' ? '📱'
                      : '⌚'}
                  </span>
                  {product.badge && (
                    <div style={{ position: 'absolute', top: 16, left: 16 }}>
                      <span className={`badge badge-${product.badge.toLowerCase()}`}>
                        {product.badge}
                      </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Thumbnails */}
              <div style={{ display: 'flex', gap: 12 }}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    style={{
                      flex: 1,
                      height: 80,
                      borderRadius: 10,
                      background: img,
                      border: `2px solid ${i === imgIdx ? 'var(--accent)' : 'var(--border)'}`,
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                    }}
                  >
                    {product.category === 'Headphones' ? '🎧'
                      : product.category === 'Laptops' ? '💻'
                      : product.category === 'Phones' ? '📱'
                      : '⌚'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Product info ── */}
          <div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {product.category}
              </span>
            </div>
            <h1 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              fontWeight: 800,
              marginBottom: 16,
              letterSpacing: '-0.02em',
            }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <StarRating rating={product.rating} />
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent)' }}>
                {product.rating}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent)' }}>
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span style={{ background: 'rgba(239,68,68,0.15)', color: 'var(--error)', padding: '3px 10px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 700 }}>
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 32, fontSize: '0.95rem' }}>
              {product.description}
            </p>

            {/* Specs */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '20px 24px',
              marginBottom: 32,
            }}>
              <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14 }}>
                Key Specs
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {product.specs.map((spec, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="detail-action-row" style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'center' }}>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <input className="qty-value" type="number" value={qty} readOnly />
                <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Add to Cart
              </motion.button>
            </div>

            <motion.button
              onClick={handleBuyNow}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              style={{
                width: '100%',
                padding: '16px',
                background: 'var(--accent)',
                color: 'var(--bg-primary)',
                border: 'none',
                borderRadius: 'var(--radius)',
                fontWeight: 800,
                fontSize: '0.9rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 8px 32px rgba(251,191,36,0.25)',
              }}
            >
              Buy Now — ${(product.price * qty).toLocaleString()}
            </motion.button>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 20, marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
              {[
                { icon: '🚀', text: 'Free shipping' },
                { icon: '↩️', text: '30-day returns' },
                { icon: '🛡️', text: '2-year warranty' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Related products ── */}
        {related.length > 0 && (
          <div style={{ marginTop: 96 }}>
            <div style={{ marginBottom: 40 }}>
              <p style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
                You might also like
              </p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>Related Products</h2>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(related.length, 4)}, 1fr)`,
              gap: 24,
            }} className="related-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 700px) { .related-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .related-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
