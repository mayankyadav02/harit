# HARIT — India's Green Mission
## Premium 3D Environmental Platform — Frontend UI

A production-grade, visually outstanding frontend application for **HARIT — India's Green Mission**, uniting urban green-roof services, verified smallholder organic farmers, avian conservation, eco-commerce, and citizen ecological learning.

---

## 🌿 Brand Identity & Design System

The platform's design language is extracted directly from the HARIT official emblem:
- **Forest Green** (`#073D25`) — Lush Indian forests & nocturnal canopy depth
- **Deep Forest** (`#052F1D` / `#031E12`) — Card backdrops & grounded natural contrast
- **Emerald** (`#176B43` / `#228B57`) — Sculpted living landscapes & vitality
- **Leaf Green** (`#8EBE3F`) — Fresh growth, seedlings & success indicators
- **Golden Yellow** (`#F2B52C` / `#F8C85E`) — Radiant Indian sun & sunflower emblem
- **Warm Ivory** (`#F6F0DA`) — Warm wordmarks & editorial typography
- **Natural Cream** (`#F7F5EC`) — Daytime editorial cards & paper tones
- **River Blue** (`#2788E8` / `#5AA5F0`) — Flowing river waters & hydration pans
- **Dark Text** (`#173A29`) — High-contrast accessible text

### Central Reusable Brand Component
The logo component is centrally implemented in `src/components/common/BrandLogo.tsx`.
- **Configurable Logo Path**: Defaults to `/images/harit-logo.png`.
- **Graceful Fallback**: If the file is not yet placed in `public/images/harit-logo.png`, the component automatically renders an artistic, sculpted SVG emblem featuring the golden sun, sunflower, tiered emerald hills, river, eco house, trees, deer, and flying birds with zero layout distortion.

---

## 🗺️ Functional Routes & Experiences

### Public Website
| Route | Page | Key Features |
|---|---|---|
| `/` | **Home** | Interactive 3D mouse parallax hero landscape, national conservation pulse, service highlights, farmer previews, eco-store items, sparrow conservation spotlight, live campaigns, testimonials |
| `/about` | **About HARIT** | Mission & vision, sacred circle brand emblem story, four strategic pillars, national leadership & advisory board |
| `/green-roofs` | **Green Roof Services** | 4 structural systems (Extensive Sedum, Intensive Agro-Farm, Pollinator Haven, Commercial Biosolar), before/after transformation gallery, 5-step project journey, **interactive cost & cooling calculator**, working feasibility enquiry form |
| `/farmer-market` | **Farmer Marketplace** | Verified Indian growers, category tabs, state filters, sorting, product detail modal with farmer stories, quantity selector, add-to-cart, wishlist toggle |
| `/eco-store` | **Eco-Store** | Terracotta Pakshi Jalpatra (bird water pots), cedar Gauraiya nestboxes, Bokashi kitchen composter, cold-pressed neem spray, wishlist filter, cart drawer integration |
| `/conservation` | **Avian & Biodiversity** | Indian species identification (House Sparrow, Purple Sunbird, Bulbul, Mormon butterfly), water pot initiative, **working live contribution logger** that updates national counts in local state |
| `/education` | **Learning Hub** | Searchable knowledge base, full article reader view with agronomist pro tips, seasonal planting calendar (Kharif, Rabi, Zaid), simulated PDF guide download |
| `/campaigns` | **Community Campaigns** | Pan-India missions with goal progress bars, weekend distribution event calendar, **interactive Green Champion volunteer registration modal** |
| `/contact` | **Contact & Directorate** | Validated enquiry form with instant feedback state, regional centers (Delhi, Bengaluru, Pune), interactive FAQ accordion |
| `/login` & `/register` | **Demo Authentication** | **1-click quick persona switchers** (Customer, Farmer, Admin) and interactive form validation |

### 3 Distinct Dashboard Experiences
| Route | Dashboard | Unique Features |
|---|---|---|
| `/dashboard/customer` | **Citizen / Customer** | My Green Roof installations with health scores (94/100), payment milestone visualization (30/40/30 escrow stages), courier shipment stepper, personal environmental contribution summary, interactive terrace care reminder checklist, photo timeline |
| `/dashboard/farmer` | **Organic Producer** | Certified grower profile banner, revenue metrics (monthly earnings ₹48,500), **interactive Recharts harvest sales graph**, product & inventory manager with working **"List New Harvest" modal** and delete actions, customer orders table with fulfillment status switcher (Harvest Pending ➔ Packed ➔ Dispatched ➔ Delivered) |
| `/dashboard/admin` | **National Directorate** | High-level platform GMV (₹18.4 Lakhs), verified grower counts, **Recharts city-wise green canopy increase graph**, weekly farmer escrow approval desk with 1-click batch payout release, live order audit logs, campaign directive governance |

---

## 🛠️ Technology Stack

- **React 19** with **Vite 8**
- **TypeScript 6** (Strict mode, zero errors)
- **Tailwind CSS 3** with custom Indian green design tokens & 3D shadow system
- **React Router DOM 7** with client-side routing & deep linking
- **Framer Motion 14** for smooth 3D tilt, parallax layers, and drawer animations
- **Recharts 3** for responsive charts in Farmer & Admin dashboards
- **Zustand 5** with localStorage persistence (`harit_cart`, `harit_wishlist`, `harit_contributions`, `harit_farmer_products`, `harit_campaigns`, `harit_current_user`)
- **Lucide React** for clean iconography
- **Oxlint** with **0 warnings and 0 errors**

---

## 🚀 Running the Project

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Check linting (0 warnings, 0 errors)
npm run lint

# 4. Production build check
npm run build

# 5. Preview production build
npm run preview
```

---

## ⚠️ Demonstration Disclaimers & Limitations

- **Frontend Only**: HARIT is an interactive frontend demonstration built with client-side state and mock data.
- **No Real Payments or APIs**: No financial transactions, bank transfers, government filings, commercial contracts, or emails are processed or sent.
- **Sample Data**: All metrics, prices, orders, and farmer identities are simulated demonstration data designed to showcase next-generation environmental user experiences.
