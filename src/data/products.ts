export type Badge = 'NEW' | 'SALE' | 'HOT'
export type Category = 'Headphones' | 'Laptops' | 'Phones' | 'Accessories'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  category: Category
  rating: number
  reviews: number
  description: string
  specs: string[]
  images: [string, string, string]
  badge?: Badge
}

export const products: Product[] = [
  // ─── HEADPHONES ────────────────────────────────────────────────
  {
    id: 'volt-anc-pro',
    name: 'VOLT ANC Pro',
    price: 299,
    originalPrice: 399,
    category: 'Headphones',
    rating: 4.9,
    reviews: 2847,
    badge: 'HOT',
    description:
      'Industry-leading active noise cancellation meets audiophile-grade sound. 40-hour battery, spatial audio, and feather-light titanium build. The pinnacle of personal audio.',
    specs: [
      '40mm custom dynamic drivers',
      'Active Noise Cancellation (ANC)',
      '40-hour battery life',
      'Bluetooth 5.3 + multipoint',
      'Spatial audio & head tracking',
      'Titanium + leather build',
      'USB-C fast charging (10 min = 3h)',
    ],
    images: [
      'linear-gradient(135deg, #4C1D95 0%, #7C3AED 55%, #A78BFA 100%)',
      'linear-gradient(135deg, #2D1B69 0%, #5B21B6 55%, #8B5CF6 100%)',
      'linear-gradient(135deg, #1E0A3C 0%, #6D28D9 55%, #C4B5FD 100%)',
    ],
  },
  {
    id: 'volt-studio-50',
    name: 'VOLT Studio 50',
    price: 199,
    originalPrice: 249,
    category: 'Headphones',
    rating: 4.7,
    reviews: 1523,
    badge: 'NEW',
    description:
      'Studio-reference tuning in an everyday form factor. Closed-back design for isolation, with a flat response curve loved by producers and audiophiles alike.',
    specs: [
      '50mm planar magnetic drivers',
      'Studio-flat frequency response',
      'Foldable closed-back design',
      '32Ω impedance — amp-friendly',
      '30-hour battery (wireless)',
      'Detachable cable (3.5mm / 6.3mm)',
      'Ultra-padded memory foam earcups',
    ],
    images: [
      'linear-gradient(135deg, #1E1B4B 0%, #3730A3 55%, #818CF8 100%)',
      'linear-gradient(135deg, #0F0A2E 0%, #312E81 55%, #6366F1 100%)',
      'linear-gradient(135deg, #1E1B4B 0%, #4338CA 55%, #A5B4FC 100%)',
    ],
  },
  {
    id: 'volt-bass-x',
    name: 'VOLT Bass X',
    price: 129,
    originalPrice: 179,
    category: 'Headphones',
    rating: 4.5,
    reviews: 3102,
    badge: 'SALE',
    description:
      'Deep, powerful bass meets crisp highs. The Bass X is engineered for electronic music fans who want maximum impact without sacrificing clarity.',
    specs: [
      '45mm enhanced bass drivers',
      'Hybrid ANC + transparency mode',
      '25-hour battery life',
      'Bluetooth 5.2',
      'Built-in EQ app (iOS & Android)',
      'IPX4 water resistance',
      'USB-C charging',
    ],
    images: [
      'linear-gradient(135deg, #581C87 0%, #9333EA 55%, #D8B4FE 100%)',
      'linear-gradient(135deg, #3B0764 0%, #7E22CE 55%, #C084FC 100%)',
      'linear-gradient(135deg, #4A044E 0%, #A21CAF 55%, #E879F9 100%)',
    ],
  },

  // ─── LAPTOPS ───────────────────────────────────────────────────
  {
    id: 'volt-beam-15',
    name: 'VOLT Beam 15',
    price: 1499,
    originalPrice: 1799,
    category: 'Laptops',
    rating: 4.8,
    reviews: 986,
    badge: 'HOT',
    description:
      'A 15" powerhouse wrapped in aircraft-grade aluminum. The Beam 15 redefines what a portable workstation can be — all-day battery, OLED display, and next-gen performance.',
    specs: [
      'VOLT X9 12-core processor',
      '32GB LPDDR5 RAM',
      '1TB NVMe SSD (7000MB/s)',
      '15.6" 4K OLED 120Hz display',
      'NVIDIA RTX 5070 8GB',
      '100Wh battery — 18hr life',
      'Thunderbolt 5 × 2, USB-A × 2',
    ],
    images: [
      'linear-gradient(135deg, #0C4A6E 0%, #0284C7 55%, #7DD3FC 100%)',
      'linear-gradient(135deg, #082F49 0%, #0369A1 55%, #38BDF8 100%)',
      'linear-gradient(135deg, #0C4A6E 0%, #0EA5E9 55%, #BAE6FD 100%)',
    ],
  },
  {
    id: 'volt-air-pro',
    name: 'VOLT Air Pro',
    price: 1299,
    originalPrice: 1499,
    category: 'Laptops',
    rating: 4.7,
    reviews: 764,
    badge: 'NEW',
    description:
      'At just 1.1kg, the Air Pro is the world\'s thinnest performance laptop. 22-hour battery and a stunning 2.8K AMOLED display make it the ultimate travel companion.',
    specs: [
      'VOLT X8 10-core processor',
      '16GB LPDDR5X RAM',
      '512GB NVMe SSD',
      '14" 2.8K AMOLED 90Hz',
      'Intel Arc GPU',
      '75Wh battery — 22hr life',
      '11.4mm thin / 1.1kg',
    ],
    images: [
      'linear-gradient(135deg, #164E63 0%, #0891B2 55%, #67E8F9 100%)',
      'linear-gradient(135deg, #083344 0%, #0E7490 55%, #22D3EE 100%)',
      'linear-gradient(135deg, #164E63 0%, #06B6D4 55%, #A5F3FC 100%)',
    ],
  },
  {
    id: 'volt-workstation',
    name: 'VOLT Workstation',
    price: 2199,
    originalPrice: 2199,
    category: 'Laptops',
    rating: 4.9,
    reviews: 412,
    description:
      'Built for professionals who demand no compromises. Dual 4K display support, ECC RAM option, and ISV-certified GPU performance for creative and technical workloads.',
    specs: [
      'VOLT X9 Pro 16-core processor',
      '64GB DDR5 ECC RAM',
      '2TB NVMe RAID SSD',
      '16" Mini-LED 165Hz display',
      'NVIDIA RTX 5080 12GB',
      '120Wh battery — 12hr life',
      'SD card slot + HDMI 2.1',
    ],
    images: [
      'linear-gradient(135deg, #1E3A5F 0%, #1D4ED8 55%, #93C5FD 100%)',
      'linear-gradient(135deg, #172554 0%, #1E40AF 55%, #60A5FA 100%)',
      'linear-gradient(135deg, #1E3A5F 0%, #2563EB 55%, #BFDBFE 100%)',
    ],
  },

  // ─── PHONES ────────────────────────────────────────────────────
  {
    id: 'volt-x1',
    name: 'VOLT X1',
    price: 999,
    originalPrice: 1099,
    category: 'Phones',
    rating: 4.8,
    reviews: 4521,
    badge: 'HOT',
    description:
      'The VOLT X1 is our flagship — a statement device with a titanium frame, periscope camera system, and a Snapdragon 8 Elite processor that laughs at multitasking.',
    specs: [
      'Snapdragon 8 Elite',
      '12GB RAM / 256GB storage',
      '6.7" Dynamic AMOLED 2X 144Hz',
      '200MP main + 10x periscope zoom',
      '5100mAh — 100W wired charging',
      'IP68 water resistance',
      'Satellite SOS connectivity',
    ],
    images: [
      'linear-gradient(135deg, #7C2D12 0%, #EA580C 55%, #FED7AA 100%)',
      'linear-gradient(135deg, #431407 0%, #C2410C 55%, #FB923C 100%)',
      'linear-gradient(135deg, #7C2D12 0%, #F97316 55%, #FEF3C7 100%)',
    ],
  },
  {
    id: 'volt-edge',
    name: 'VOLT Edge',
    price: 799,
    originalPrice: 899,
    category: 'Phones',
    rating: 4.6,
    reviews: 2198,
    badge: 'NEW',
    description:
      'Curved edge-to-edge display meets a triple camera array that redefines mobile photography. The Edge is for creators who need more than a phone.',
    specs: [
      'Dimensity 9400',
      '12GB RAM / 256GB storage',
      '6.5" Curved AMOLED 120Hz',
      '108MP main + ultrawide + macro',
      '4800mAh — 80W fast charging',
      'IP67 water resistance',
      'Under-display fingerprint',
    ],
    images: [
      'linear-gradient(135deg, #831843 0%, #DB2777 55%, #F9A8D4 100%)',
      'linear-gradient(135deg, #500724 0%, #BE185D 55%, #F472B6 100%)',
      'linear-gradient(135deg, #831843 0%, #EC4899 55%, #FBCFE8 100%)',
    ],
  },
  {
    id: 'volt-lite',
    name: 'VOLT Lite',
    price: 499,
    originalPrice: 599,
    category: 'Phones',
    rating: 4.4,
    reviews: 5847,
    badge: 'SALE',
    description:
      'Premium in a compact body. The Volt Lite packs flagship DNA into an affordable form factor — fast performance, great camera, and a battery that lasts all day.',
    specs: [
      'Snapdragon 7s Gen 3',
      '8GB RAM / 128GB storage',
      '6.1" AMOLED 90Hz',
      '64MP main + 12MP ultrawide',
      '4000mAh — 45W fast charging',
      'IP67 water resistance',
      'Wireless charging 15W',
    ],
    images: [
      'linear-gradient(135deg, #713F12 0%, #D97706 55%, #FDE68A 100%)',
      'linear-gradient(135deg, #451A03 0%, #B45309 55%, #FCD34D 100%)',
      'linear-gradient(135deg, #78350F 0%, #F59E0B 55%, #FEF3C7 100%)',
    ],
  },

  // ─── ACCESSORIES ───────────────────────────────────────────────
  {
    id: 'volt-watch',
    name: 'VOLT Watch',
    price: 299,
    originalPrice: 349,
    category: 'Accessories',
    rating: 4.7,
    reviews: 1876,
    badge: 'NEW',
    description:
      'A precision-crafted smartwatch with an always-on AMOLED display, advanced health sensors, and a titanium case built to last. Track everything. Miss nothing.',
    specs: [
      'Always-on AMOLED 1.4" display',
      'ECG + SpO2 + skin temperature',
      '7-day battery life',
      '5ATM water resistance',
      'GPS + GLONASS',
      'NFC payments',
      'Works with iOS & Android',
    ],
    images: [
      'linear-gradient(135deg, #064E3B 0%, #059669 55%, #6EE7B7 100%)',
      'linear-gradient(135deg, #022C22 0%, #047857 55%, #34D399 100%)',
      'linear-gradient(135deg, #064E3B 0%, #10B981 55%, #A7F3D0 100%)',
    ],
  },
  {
    id: 'volt-hub-pro',
    name: 'VOLT Hub Pro',
    price: 89,
    originalPrice: 109,
    category: 'Accessories',
    rating: 4.6,
    reviews: 3421,
    badge: 'SALE',
    description:
      'Turn a single USB-C port into a complete workstation. The Hub Pro expands to 12 ports including dual 4K HDMI, 10Gbps USB-A, SD card, and 100W passthrough charging.',
    specs: [
      '12-in-1 USB-C hub',
      'Dual 4K@60Hz HDMI output',
      '100W USB-C PD passthrough',
      '10Gbps USB-A × 3',
      'SD / microSD card reader',
      '2.5Gbps Ethernet',
      'Aluminum housing with fan',
    ],
    images: [
      'linear-gradient(135deg, #134E4A 0%, #0D9488 55%, #5EEAD4 100%)',
      'linear-gradient(135deg, #042F2E 0%, #0F766E 55%, #2DD4BF 100%)',
      'linear-gradient(135deg, #134E4A 0%, #14B8A6 55%, #99F6E4 100%)',
    ],
  },
  {
    id: 'volt-charger-120w',
    name: 'VOLT Charger 120W',
    price: 59,
    originalPrice: 59,
    category: 'Accessories',
    rating: 4.8,
    reviews: 6234,
    badge: 'NEW',
    description:
      'One charger to rule them all. The 120W GaN III charger powers a laptop, phone, and tablet simultaneously. Pocketable. Powerful. The last charger you\'ll ever need.',
    specs: [
      '120W total output',
      'USB-C × 2 + USB-A × 1',
      'GaN III technology',
      'USB-C PD 3.1 (140W single)',
      'Universal voltage (100–240V)',
      'Smart power distribution',
      'Foldable plug design',
    ],
    images: [
      'linear-gradient(135deg, #022C22 0%, #15803D 55%, #86EFAC 100%)',
      'linear-gradient(135deg, #052E16 0%, #166534 55%, #4ADE80 100%)',
      'linear-gradient(135deg, #022C22 0%, #16A34A 55%, #BBF7D0 100%)',
    ],
  },
]

export const categories: Category[] = ['Headphones', 'Laptops', 'Phones', 'Accessories']

export const categoryIcons: Record<Category, string> = {
  Headphones: '🎧',
  Laptops: '💻',
  Phones: '📱',
  Accessories: '⌚',
}

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id)

export const getProductsByCategory = (cat: Category): Product[] =>
  products.filter((p) => p.category === cat)

export const featuredProducts = products.filter((p) =>
  ['volt-anc-pro', 'volt-beam-15', 'volt-x1'].includes(p.id)
)

export const bestsellerProducts = products.filter((p) =>
  ['volt-anc-pro', 'volt-bass-x', 'volt-lite', 'volt-hub-pro', 'volt-charger-120w', 'volt-watch'].includes(p.id)
)
