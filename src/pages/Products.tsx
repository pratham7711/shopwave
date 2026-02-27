import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'
import type { Category } from '../data/products'

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'reviews'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCat, setSelectedCat] = useState<Category | 'All'>(
    (searchParams.get('cat') as Category) || 'All'
  )
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2200])
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState<SortKey>('featured')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat && [...categories, 'All'].includes(cat as Category | 'All')) {
      setSelectedCat(cat as Category | 'All')
    }
  }, [searchParams])

  const handleCatChange = (cat: Category | 'All') => {
    setSelectedCat(cat)
    if (cat === 'All') searchParams.delete('cat')
    else searchParams.set('cat', cat)
    setSearchParams(searchParams)
  }

  const filtered = useMemo(() => {
    let list = [...products]
    if (selectedCat !== 'All') list = list.filter((p) => p.category === selectedCat)
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    list = list.filter((p) => p.rating >= minRating)

    switch (sortBy) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'rating': list.sort((a, b) => b.rating - a.rating); break
      case 'reviews': list.sort((a, b) => b.reviews - a.reviews); break
      default: break
    }
    return list
  }, [selectedCat, priceRange, minRating, sortBy])

  const Sidebar = () => (
    <aside style={{
      width: 260,
      flexShrink: 0,
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '28px 24px',
      height: 'fit-content',
      position: 'sticky',
      top: 'calc(var(--nav-height) + 24px)',
    }}>
      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, marginBottom: 24 }}>
        Filter & Sort
      </h3>

      {/* Category */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
          Category
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {(['All', ...categories] as (Category | 'All')[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCatChange(cat)}
              style={{
                padding: '9px 14px',
                borderRadius: 8,
                border: '1px solid',
                borderColor: selectedCat === cat ? 'var(--accent)' : 'transparent',
                background: selectedCat === cat ? 'rgba(251,191,36,0.1)' : 'transparent',
                color: selectedCat === cat ? 'var(--accent)' : 'var(--text-secondary)',
                textAlign: 'left',
                fontSize: '0.875rem',
                fontWeight: 600,
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
          Max Price: <span style={{ color: 'var(--accent)' }}>${priceRange[1].toLocaleString()}</span>
        </p>
        <input
          type="range"
          min={0}
          max={2200}
          step={50}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          style={{
            width: '100%',
            accentColor: 'var(--accent)',
            cursor: 'pointer',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 4 }}>
          <span>$0</span>
          <span>$2,200</span>
        </div>
      </div>

      {/* Min rating */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
          Minimum Rating
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[0, 4, 4.5, 4.7].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              style={{
                padding: '9px 14px',
                borderRadius: 8,
                border: '1px solid',
                borderColor: minRating === r ? 'var(--accent)' : 'transparent',
                background: minRating === r ? 'rgba(251,191,36,0.1)' : 'transparent',
                color: minRating === r ? 'var(--accent)' : 'var(--text-secondary)',
                textAlign: 'left',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {r === 0 ? 'All Ratings' : `${r}★ & above`}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
          Sort By
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortKey)}
          style={{
            width: '100%',
            padding: '10px 14px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            color: 'var(--text-primary)',
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Highest Rated</option>
          <option value="reviews">Most Reviewed</option>
        </select>
      </div>

      {/* Reset */}
      {(selectedCat !== 'All' || priceRange[1] !== 2200 || minRating !== 0 || sortBy !== 'featured') && (
        <button
          onClick={() => {
            setSelectedCat('All')
            setPriceRange([0, 2200])
            setMinRating(0)
            setSortBy('featured')
            searchParams.delete('cat')
            setSearchParams(searchParams)
          }}
          style={{
            width: '100%',
            marginTop: 20,
            padding: '10px',
            background: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: 8,
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
            fontWeight: 600,
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
          Reset Filters
        </button>
      )}
    </aside>
  )

  return (
    <div className="page-wrapper">
      <div className="container" style={{ padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
            {filtered.length} products
          </p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: 0 }}>
            {selectedCat === 'All' ? 'All Products' : selectedCat}
          </h1>
        </div>

        {/* Mobile filter toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mobile-filter-btn"
          style={{
            display: 'none',
            marginBottom: 24,
            padding: '10px 20px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            color: 'var(--text-primary)',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            gap: 8,
            alignItems: 'center',
          }}
        >
          ⚙️ Filters
        </button>

        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
          {/* Sidebar desktop */}
          <div className="sidebar-desktop">
            <Sidebar />
          </div>

          {/* Mobile sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="sidebar-mobile"
                style={{
                  position: 'fixed',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 300,
                  background: 'var(--bg-secondary)',
                  zIndex: 200,
                  overflowY: 'auto',
                  padding: 24,
                  paddingTop: 80,
                  boxShadow: '4px 0 40px rgba(0,0,0,0.8)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    position: 'absolute',
                    top: 24,
                    right: 24,
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                  }}
                >
                  ×
                </button>
                <Sidebar />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product grid */}
          <div style={{ flex: 1 }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: 16 }}>🔍</div>
                <h3 style={{ marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>No products found</h3>
                <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters</p>
              </div>
            ) : (
              <motion.div
                layout
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 24,
                }}
                className="products-grid"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .products-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .products-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 900px) {
          .sidebar-desktop { display: none !important; }
          .mobile-filter-btn { display: flex !important; }
        }
        @media (min-width: 901px) {
          .sidebar-mobile { display: none !important; }
        }
      `}</style>
    </div>
  )
}
