import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { useCartStore } from '../store/cartStore'
import type { Product } from '../data/products'

interface Props {
  product: Product
  compact?: boolean
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="stars" aria-label={`${rating} stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width="12" height="12" viewBox="0 0 24 24">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={star <= Math.floor(rating) ? 'var(--accent)' : star - 0.5 <= rating ? 'var(--accent)' : 'var(--border)'}
            stroke="none"
          />
        </svg>
      ))}
    </span>
  )
}

export default function ProductCard({ product, compact = false }: Props) {
  const [hovered, setHovered] = useState(false)
  const [imgIdx, setImgIdx] = useState(0)
  const addItem = useCartStore((s) => s.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    })
    toast.success(`${product.name} added to cart`)
  }

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onHoverStart={() => { setHovered(true); setImgIdx(1) }}
      onHoverEnd={() => { setHovered(false); setImgIdx(0) }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        transition: 'border-color 0.3s',
        borderColor: hovered ? 'var(--border-accent)' : 'var(--border)',
      }}
    >
      <Link to={`/products/${product.id}`} style={{ display: 'block' }}>
        {/* Image area */}
        <div style={{
          height: compact ? 180 : 240,
          background: product.images[imgIdx],
          position: 'relative',
          overflow: 'hidden',
          transition: 'background 0.5s ease',
        }}>
          {/* Floating product icon */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: compact ? '3rem' : '4rem',
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
            transform: hovered ? 'scale(1.12) translateY(-4px)' : 'scale(1)',
            transition: 'transform 0.4s ease',
          }}>
            {product.category === 'Headphones' ? '🎧'
              : product.category === 'Laptops' ? '💻'
              : product.category === 'Phones' ? '📱'
              : '⌚'}
          </div>

          {/* Badge */}
          {product.badge && (
            <div style={{ position: 'absolute', top: 12, left: 12 }}>
              <span className={`badge badge-${product.badge.toLowerCase()}`}>
                {product.badge}
              </span>
            </div>
          )}

          {/* Discount pill */}
          {discount > 0 && (
            <div style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(239,68,68,0.9)',
              color: '#fff',
              padding: '3px 8px',
              borderRadius: 20,
              fontSize: '0.7rem',
              fontWeight: 700,
            }}>
              -{discount}%
            </div>
          )}

          {/* Quick view overlay */}
          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '16px',
              pointerEvents: hovered ? 'auto' : 'none',
            }}
          >
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#fff',
            }}>
              View Details →
            </span>
          </motion.div>
        </div>

        {/* Info */}
        <div style={{ padding: compact ? '16px' : '20px' }}>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {product.category}
            </span>
          </div>
          <h3 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: compact ? '0.95rem' : '1.05rem',
            fontWeight: 700,
            marginBottom: 8,
            color: 'var(--text-primary)',
          }}>
            {product.name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <StarRating rating={product.rating} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              ({product.reviews.toLocaleString()})
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: compact ? '1.1rem' : '1.25rem',
              fontWeight: 800,
              color: 'var(--accent)',
            }}>
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                textDecoration: 'line-through',
              }}>
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart */}
      <div style={{ padding: compact ? '0 16px 16px' : '0 20px 20px' }}>
        <motion.button
          onClick={handleAddToCart}
          whileTap={{ scale: 0.97 }}
          style={{
            width: '100%',
            padding: '11px',
            background: hovered ? 'var(--accent)' : 'var(--bg-elevated)',
            color: hovered ? 'var(--bg-primary)' : 'var(--text-primary)',
            border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 'var(--radius)',
            fontWeight: 700,
            fontSize: '0.8rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            transition: 'all 0.3s',
            cursor: 'pointer',
          }}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  )
}
