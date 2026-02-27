import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '../store/cartStore'

interface FormData {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  country: string
  zip: string
  cardNumber: string
  expiry: string
  cvv: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const initialForm: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  country: '',
  zip: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
}

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!form.firstName.trim()) errors.firstName = 'Required'
  if (!form.lastName.trim()) errors.lastName = 'Required'
  if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = 'Valid email required'
  if (!form.address.trim()) errors.address = 'Required'
  if (!form.city.trim()) errors.city = 'Required'
  if (!form.country.trim()) errors.country = 'Required'
  if (!form.zip.trim()) errors.zip = 'Required'
  if (!form.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) errors.cardNumber = '16-digit card number required'
  if (!form.expiry.match(/^\d{2}\/\d{2}$/)) errors.expiry = 'MM/YY format required'
  if (!form.cvv.match(/^\d{3,4}$/)) errors.cvv = '3-4 digits required'
  return errors
}

function formatCard(value: string) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ')
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return digits
}

function Field({
  label, name, form, errors, onChange, type = 'text', placeholder, format,
}: {
  label: string
  name: keyof FormData
  form: FormData
  errors: FormErrors
  onChange: (name: keyof FormData, value: string) => void
  type?: string
  placeholder?: string
  format?: (v: string) => string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
        {label}
      </label>
      <input
        type={type}
        value={form[name]}
        onChange={(e) => onChange(name, format ? format(e.target.value) : e.target.value)}
        placeholder={placeholder}
        style={{
          background: 'var(--bg-elevated)',
          border: `1px solid ${errors[name] ? 'var(--error)' : 'var(--border)'}`,
          borderRadius: 10,
          padding: '13px 16px',
          color: 'var(--text-primary)',
          fontSize: '0.9rem',
          transition: 'border-color 0.2s',
          width: '100%',
        }}
        onFocus={(e) => { if (!errors[name]) e.target.style.borderColor = 'var(--accent)' }}
        onBlur={(e) => { e.target.style.borderColor = errors[name] ? 'var(--error)' : 'var(--border)' }}
      />
      {errors[name] && (
        <span style={{ fontSize: '0.75rem', color: 'var(--error)', fontWeight: 500 }}>
          {errors[name]}
        </span>
      )}
    </div>
  )
}

export default function Checkout() {
  const { items, total, clearCart } = useCartStore()
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [placed, setPlaced] = useState(false)
  const [orderNumber] = useState(() => `VOLT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`)

  const shipping = total >= 50 ? 0 : 9.99
  const tax = total * 0.08
  const orderTotal = total + shipping + tax

  const handleChange = (name: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setPlaced(true)
    clearCart()
  }

  if (items.length === 0 && !placed) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', gap: 20 }}>
        <div style={{ fontSize: '4rem' }}>🛒</div>
        <h2 style={{ fontFamily: 'Syne, sans-serif' }}>Nothing to checkout</h2>
        <p style={{ color: 'var(--text-muted)' }}>Your cart is empty.</p>
        <Link to="/products" className="btn-primary">Shop Now</Link>
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      <AnimatePresence mode="wait">
        {placed ? (
          // ── Success screen ──
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '80vh',
              padding: '60px 24px',
              textAlign: 'center',
            }}
          >
            {/* Animated checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 32,
                boxShadow: '0 24px 60px rgba(251,191,36,0.35)',
              }}
            >
              <motion.svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
              >
                <motion.path
                  d="M10 26l12 12 20-22"
                  stroke="#0C0C0C"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                />
              </motion.svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
                Order Confirmed
              </p>
              <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 16 }}>
                Thank you!
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 480, margin: '0 auto 24px' }}>
                Your order has been placed. We'll send a confirmation to your email shortly.
              </p>

              {/* Order number */}
              <div style={{
                display: 'inline-block',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-accent)',
                borderRadius: 'var(--radius)',
                padding: '16px 32px',
                marginBottom: 40,
              }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Order Number
                </p>
                <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)', letterSpacing: '0.05em' }}>
                  {orderNumber}
                </p>
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/" className="btn-primary">Back to Home</Link>
                <Link to="/products" className="btn-secondary">Continue Shopping</Link>
              </div>
            </motion.div>

            {/* Confetti-like dots */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [1, 0],
                  scale: [1, 0.5],
                  x: Math.cos((i / 8) * Math.PI * 2) * 120,
                  y: Math.sin((i / 8) * Math.PI * 2) * 120,
                }}
                transition={{ delay: 0.3 + i * 0.05, duration: 1, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: i % 2 === 0 ? 'var(--accent)' : '#fff',
                  pointerEvents: 'none',
                }}
              />
            ))}
          </motion.div>
        ) : (
          // ── Checkout form ──
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container"
            style={{ paddingTop: 48, paddingBottom: 96 }}
          >
            <div style={{ marginBottom: 40 }}>
              <p style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
                Step 1 of 1
              </p>
              <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
                Checkout
              </h1>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 380px',
                gap: 40,
                alignItems: 'start',
              }} className="checkout-layout">
                {/* Left: form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                  {/* Contact info */}
                  <section style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 24px' }}>
                    <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent)', color: 'var(--bg-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>1</span>
                      Contact Information
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <Field label="First Name" name="firstName" form={form} errors={errors} onChange={handleChange} placeholder="John" />
                      <Field label="Last Name" name="lastName" form={form} errors={errors} onChange={handleChange} placeholder="Doe" />
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <Field label="Email Address" name="email" form={form} errors={errors} onChange={handleChange} type="email" placeholder="john@example.com" />
                    </div>
                  </section>

                  {/* Shipping address */}
                  <section style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 24px' }}>
                    <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent)', color: 'var(--bg-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>2</span>
                      Shipping Address
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <Field label="Street Address" name="address" form={form} errors={errors} onChange={handleChange} placeholder="123 VOLT Street" />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <Field label="City" name="city" form={form} errors={errors} onChange={handleChange} placeholder="San Francisco" />
                        <Field label="ZIP / Postal Code" name="zip" form={form} errors={errors} onChange={handleChange} placeholder="94102" />
                      </div>
                      <Field label="Country" name="country" form={form} errors={errors} onChange={handleChange} placeholder="United States" />
                    </div>
                  </section>

                  {/* Payment */}
                  <section style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 24px' }}>
                    <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent)', color: 'var(--bg-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>3</span>
                      Payment Details
                    </h2>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 20 }}>
                      🔒 Demo only — no real payment is processed.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <Field
                        label="Card Number"
                        name="cardNumber"
                        form={form}
                        errors={errors}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        format={formatCard}
                      />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <Field
                          label="Expiry Date"
                          name="expiry"
                          form={form}
                          errors={errors}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          format={formatExpiry}
                        />
                        <Field
                          label="CVV"
                          name="cvv"
                          form={form}
                          errors={errors}
                          onChange={handleChange}
                          placeholder="123"
                          type="password"
                        />
                      </div>
                    </div>
                  </section>
                </div>

                {/* Right: order summary */}
                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px 24px',
                  position: 'sticky',
                  top: 'calc(var(--nav-height) + 24px)',
                }}>
                  <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>
                    Order Summary
                  </h2>

                  {/* Items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20, maxHeight: 220, overflowY: 'auto' }}>
                    {items.map((item) => (
                      <div key={item.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{
                          width: 48,
                          height: 48,
                          borderRadius: 8,
                          background: item.image,
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.3rem',
                        }}>
                          {item.category === 'Headphones' ? '🎧'
                            : item.category === 'Laptops' ? '💻'
                            : item.category === 'Phones' ? '📱'
                            : '⌚'}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 2 }}>{item.name}</p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty: {item.quantity}</p>
                        </div>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent)' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 16, borderTop: '1px solid var(--border)', marginBottom: 20 }}>
                    {[
                      { label: 'Subtotal', value: `$${total.toFixed(2)}` },
                      { label: 'Shipping', value: shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}` },
                      { label: 'Tax (8%)', value: `$${tax.toFixed(2)}` },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{label}</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{value}</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                      <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>Total</span>
                      <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: 'var(--accent)' }}>
                        ${orderTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
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
                      fontSize: '0.875rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      boxShadow: '0 8px 32px rgba(251,191,36,0.3)',
                    }}
                  >
                    Place Order ⚡
                  </motion.button>

                  <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>🔒</span>
                    <span>SSL encrypted · 256-bit security</span>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@media(max-width:900px){.checkout-layout{grid-template-columns:1fr !important;}}`}</style>
    </div>
  )
}
