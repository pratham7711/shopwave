import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { useCartStore } from '../store/cartStore'

export default function Cart() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCartStore()
  const navigate = useNavigate()

  const shipping = total >= 50 ? 0 : 9.99
  const tax = total * 0.08
  const orderTotal = total + shipping + tax

  if (items.length === 0) {
    return (
      <div className="page-wrapper" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        gap: 24,
      }}>
        {/* Empty cart illustration */}
        <div style={{
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '5rem',
          marginBottom: 8,
          position: 'relative',
        }}>
          🛍️
          <div style={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
          }}>
            ∅
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.8rem', marginBottom: 8 }}>
            Your cart is empty
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>
            Looks like you haven't added anything yet.
          </p>
          <Link to="/products" className="btn-primary">
            Start Shopping →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: 48, paddingBottom: 96 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
            Your Cart
          </h1>
          <button
            onClick={() => { clearCart(); toast.success('Cart cleared') }}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--error)'
              e.currentTarget.style.color = 'var(--error)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            Clear Cart
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: 40,
          alignItems: 'start',
        }} className="cart-layout">
          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <AnimatePresence initial={false}>
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: 'flex',
                    gap: 20,
                    padding: '24px 0',
                    borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
                    alignItems: 'center',
                  }}
                >
                  {/* Product image */}
                  <Link to={`/products/${item.id}`}>
                    <div style={{
                      width: 100,
                      height: 100,
                      borderRadius: 12,
                      background: item.image,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem',
                      flexShrink: 0,
                      border: '1px solid var(--border)',
                      transition: 'transform 0.2s',
                    }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
                    >
                      {item.category === 'Headphones' ? '🎧'
                        : item.category === 'Laptops' ? '💻'
                        : item.category === 'Phones' ? '📱'
                        : '⌚'}
                    </div>
                  </Link>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {item.category}
                    </span>
                    <Link to={`/products/${item.id}`}>
                      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.05rem', fontWeight: 700, margin: '4px 0 12px', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                      >
                        {item.name}
                      </h3>
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                      <div className="qty-control">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{ width: 36, height: 36 }}
                        >
                          −
                        </button>
                        <input className="qty-value" type="number" value={item.quantity} readOnly style={{ width: 44, height: 36 }} />
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{ width: 36, height: 36 }}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => { removeItem(item.id); toast.success(`${item.name} removed`) }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          padding: '4px 8px',
                          borderRadius: 6,
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--error)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                      >
                        ✕ Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent)' }}>
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                    {item.quantity > 1 && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        ${item.price} each
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px 24px',
            position: 'sticky',
            top: 'calc(var(--nav-height) + 24px)',
          }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.2rem', fontWeight: 700, marginBottom: 24 }}>
              Order Summary
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
              {[
                { label: 'Subtotal', value: `$${total.toFixed(2)}` },
                {
                  label: 'Shipping',
                  value: shipping === 0 ? 'Free 🎉' : `$${shipping.toFixed(2)}`,
                  valueStyle: shipping === 0 ? { color: 'var(--success)' } : {},
                },
                { label: 'Tax (8%)', value: `$${tax.toFixed(2)}` },
              ].map(({ label, value, valueStyle = {} }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{label}</span>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', ...valueStyle }}>{value}</span>
                </div>
              ))}
            </div>

            {shipping > 0 && (
              <div style={{
                background: 'rgba(251,191,36,0.08)',
                border: '1px solid var(--border-accent)',
                borderRadius: 8,
                padding: '10px 14px',
                marginBottom: 20,
                fontSize: '0.78rem',
                color: 'var(--accent)',
                fontWeight: 500,
              }}>
                Add ${(50 - total).toFixed(2)} more for free shipping!
              </div>
            )}

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 0',
              borderTop: '1px solid var(--border)',
              marginBottom: 20,
            }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700 }}>Total</span>
              <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>
                ${orderTotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginBottom: 12 }}
            >
              Checkout →
            </button>
            <Link
              to="/products"
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', textAlign: 'center', display: 'block', padding: '12px' }}
            >
              Continue Shopping
            </Link>

            {/* Security badges */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
              {['🔒 Secure', '💳 Encrypted', '✓ Safe'].map((b) => (
                <span key={b} style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:900px){.cart-layout{grid-template-columns:1fr !important;}}`}</style>
    </div>
  )
}
