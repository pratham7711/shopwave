import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ProductCard from '../components/ProductCard'
import {
  featuredProducts,
  bestsellerProducts,
  categories,
  categoryIcons,
  products,
} from '../data/products'

gsap.registerPlugin(ScrollTrigger)

const marqueeText = 'FREE SHIPPING — 30-DAY RETURNS — 2-YEAR WARRANTY — CARBON NEUTRAL — FREE SHIPPING — 30-DAY RETURNS — 2-YEAR WARRANTY — CARBON NEUTRAL — '


export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroSubRef = useRef<HTMLParagraphElement>(null)
  const heroBtnsRef = useRef<HTMLDivElement>(null)
  const heroCardRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    tl.from(heroTitleRef.current, { y: 80, opacity: 0, duration: 1 })
      .from(heroSubRef.current, { y: 40, opacity: 0, duration: 0.8 }, '-=0.5')
      .from(heroBtnsRef.current, { y: 30, opacity: 0, duration: 0.7 }, '-=0.4')
      .from(heroCardRef.current, { x: 60, opacity: 0, duration: 0.9, rotation: -3 }, '-=0.7')

    // Floating animation
    gsap.to(heroCardRef.current, {
      y: -12,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    // Scroll-triggered sections
    gsap.from('.featured-card', {
      scrollTrigger: { trigger: featuredRef.current, start: 'top 80%' },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    })

    gsap.from('.category-card', {
      scrollTrigger: { trigger: '.categories-grid', start: 'top 80%' },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    })
  }, { scope: heroRef })

  // Horizontal scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > 0) return
      const atLeft = el.scrollLeft === 0
      const atRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2
      if ((e.deltaY < 0 && atLeft) || (e.deltaY > 0 && atRight)) return
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <div ref={heroRef}>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
      }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(251,191,36,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251,191,36,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: '-1px -1px',
        }} />
        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'center',
          paddingTop: 'var(--nav-height)',
          width: '100%',
          zIndex: 1,
        }}>
          {/* Left */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 16px',
                borderRadius: 20,
                border: '1px solid var(--border-accent)',
                background: 'rgba(251,191,36,0.05)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
                New Season 2026 Collection
              </span>
            </div>
            <h1
              ref={heroTitleRef}
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                marginBottom: 24,
              }}
            >
              POWER
              <br />
              <span className="gradient-text">YOUR</span>
              <br />
              LIFE.
            </h1>
            <p ref={heroSubRef} style={{
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              maxWidth: 440,
              lineHeight: 1.75,
              marginBottom: 40,
            }}>
              Premium tech engineered for the relentless. From studio headphones to flagship phones — everything you need to stay ahead.
            </p>
            <div ref={heroBtnsRef} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/products" className="btn-primary" style={{ fontSize: '0.875rem' }}>
                Shop Now →
              </Link>
              <Link to="/products?cat=Headphones" className="btn-secondary">
                Explore Audio
              </Link>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex',
              gap: 40,
              marginTop: 48,
              paddingTop: 40,
              borderTop: '1px solid var(--border)',
            }}>
              {[
                { value: '50K+', label: 'Customers' },
                { value: '4.9★', label: 'Avg Rating' },
                { value: '12', label: 'Products' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent)' }}>
                    {value}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 3D product card */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              ref={heroCardRef}
              style={{
                width: 320,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-accent)',
                borderRadius: 24,
                padding: 24,
                boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(251,191,36,0.1)',
                transform: 'perspective(800px) rotateY(-8deg) rotateX(3deg)',
                position: 'relative',
              }}
            >
              {/* Product image area */}
              <div style={{
                height: 220,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 55%, #A78BFA 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '6rem',
                marginBottom: 20,
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
              }}>
                🎧
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="badge badge-hot" style={{ marginBottom: 8, display: 'inline-block' }}>HOT</span>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 700 }}>
                    VOLT ANC Pro
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 4 }}>
                    40hr battery · ANC · Spatial Audio
                  </p>
                </div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent)' }}>
                  $299
                </div>
              </div>
              {/* Floating badges */}
              <div style={{
                position: 'absolute',
                top: -16,
                right: -16,
                background: 'var(--accent)',
                color: 'var(--bg-primary)',
                borderRadius: 12,
                padding: '8px 14px',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.05em',
                boxShadow: '0 8px 24px rgba(251,191,36,0.4)',
              }}>
                ⚡ BESTSELLER
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: 'var(--text-muted)',
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </motion.div>
          Scroll
        </div>

        <style>{`
          @media (max-width: 768px) {
            section > .container { grid-template-columns: 1fr !important; }
            section > .container > div:last-child { display: none !important; }
          }
        `}</style>
      </section>

      {/* ─── MARQUEE ──────────────────────────────────────────────────── */}
      <div style={{
        background: 'var(--accent)',
        padding: '14px 0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}>
        <div className="marquee-track" style={{ display: 'inline-block' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--bg-primary)',
          }}>
            {marqueeText}
          </span>
        </div>
      </div>

      {/* ─── FEATURED ─────────────────────────────────────────────────── */}
      <section className="section" ref={featuredRef}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <div>
              <p style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
                Hand-picked for you
              </p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>Featured Products</h2>
            </div>
            <Link to="/products" style={{ color: 'var(--accent)', fontSize: '0.875rem', fontWeight: 600 }}>
              View all →
            </Link>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }} className="featured-grid">
            {featuredProducts.map((product, i) => (
              <div key={product.id} className="featured-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){.featured-grid{grid-template-columns:1fr 1fr !important;}}@media(max-width:600px){.featured-grid{grid-template-columns:1fr !important;}}`}</style>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-secondary)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
              Browse by type
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>Shop Categories</h2>
          </div>
          <div className="categories-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
          }}>
            {categories.map((cat) => (
              <motion.div
                key={cat}
                className="category-card"
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.25 }}
              >
                <Link to={`/products?cat=${cat}`} style={{
                  display: 'block',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px 24px',
                  textAlign: 'center',
                  transition: 'border-color 0.3s',
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <div style={{ fontSize: '3rem', marginBottom: 16 }}>{categoryIcons[cat]}</div>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>
                    {cat}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {products.filter(p => p.category === cat).length} products
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){.categories-grid{grid-template-columns:repeat(2,1fr)!important;}}@media(max-width:480px){.categories-grid{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
      </section>

      {/* ─── PROMO BANNER ─────────────────────────────────────────────── */}
      <section style={{
        background: 'var(--accent)',
        padding: '64px 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', marginBottom: 12 }}>
            Weekend Special
          </p>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            color: 'var(--bg-primary)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: 24,
          }}>
            Up to 40% off
            <br />
            this weekend only.
          </h2>
          <Link to="/products" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '16px 40px',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius)',
            fontWeight: 700,
            fontSize: '0.875rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = ''
              ;(e.currentTarget as HTMLElement).style.boxShadow = ''
            }}
          >
            Shop Sale Items →
          </Link>
        </div>
      </section>

      {/* ─── BESTSELLERS ──────────────────────────────────────────────── */}
      <section className="section">
        <div className="container" style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <p style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
                Most popular
              </p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>Bestsellers</h2>
            </div>
            <Link to="/products" style={{ color: 'var(--accent)', fontSize: '0.875rem', fontWeight: 600 }}>
              View all →
            </Link>
          </div>
        </div>
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: 20,
            overflowX: 'auto',
            paddingLeft: 'max(24px, calc((100vw - 1280px) / 2))',
            paddingRight: 'max(24px, calc((100vw - 1280px) / 2))',
            paddingBottom: 16,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {bestsellerProducts.map((product) => (
            <div key={product.id} style={{ minWidth: 280, maxWidth: 280 }}>
              <ProductCard product={product} compact />
            </div>
          ))}
        </div>
        <style>{`div::-webkit-scrollbar{display:none}`}</style>
      </section>

      {/* ─── FEATURES STRIP ───────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-secondary)', padding: '64px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 32,
          }} className="features-strip">
            {[
              { icon: '🚀', title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: '↩️', title: '30-Day Returns', desc: 'No questions asked' },
              { icon: '🛡️', title: '2-Year Warranty', desc: 'On all products' },
              { icon: '⚡', title: '24/7 Support', desc: 'Always here for you' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem' }}>{icon}</span>
                <div>
                  <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>
                    {title}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){.features-strip{grid-template-columns:repeat(2,1fr)!important;}}@media(max-width:480px){.features-strip{grid-template-columns:1fr!important;}}`}</style>
      </section>
    </div>
  )
}
