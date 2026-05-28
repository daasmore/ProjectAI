# MEMORY.md — Frontend Long-Term Memory

> Curated memories for the Frontend Expert.
> Last updated: 2026-05-26 15:30 WIB (Jawa Wedding Theme implementation)

## Phase 0 — Complete (2026-05-25)
- Next.js 14+ project initialized with App Router
- Tailwind CSS + shadcn/ui configured
- Framer Motion, Zustand, Leaflet, RHF+Zod installed
- Base components: button, input, motion-div
- ESLint + Prettier + TypeScript strict mode configured
- Custom hooks: useDebounce, useMediaQuery
- Stores: auth.store, ui.store

## 🏯 JAWA WEDDING THEME — Implemented (2026-05-26)

### Color Palette — Inspired by Javanese Batik & Tradition
- **Soga Brown** (#5C3317): Primary text, buttons — batik earth tone
- **Gold Thread** (#C59732): Accents, headings — benang emas / songket
- **Warm Cream** (#FFF8E7): Backgrounds — aged lontar paper
- **Deep Green** (#2D5016): Secondary — Javanese nature / rice fields
- **Ceremonial Red** (#8B1A1A): Accents — upacara

### Components Created/Updated
| Component | File | Status |
|-----------|------|--------|
| `JawaDivider` | `components/jawa-ornaments.tsx` | ✅ SVG temple motif divider with gold lines |
| `JawaCornerFrame` | `components/jawa-ornaments.tsx` | ✅ Decorative corner frame with gold borders |
| `FloatingOrnament` | `components/jawa-ornaments.tsx` | ✅ Mega mendung cloud SVG with float animation |
| `BatikWavePattern` | `components/jawa-ornaments.tsx` | ✅ SVG wave pattern for top/bottom sections |
| `ParangPattern` | `components/jawa-ornaments.tsx` | ✅ CSS diagonal stripe batik pattern |
| `GamelanBell` | `components/jawa-ornaments.tsx` | ✅ SVG gamelan bell ornament |
| `CountdownTimer` | `components/countdown-timer.tsx` | ✅ With Javanese labels (Dinten, Jam, etc.) |
| `CoupleDetail` | `components/couple-detail.tsx` | ✅ With gold frame, initials avatar, heart divider |
| `RsvpForm` | `components/rsvp-form.tsx` | ✅ With Javanese attendance options (Rawuh/Mboten Rawuh) |
| `VenueMap` | `components/maps/venue-map.tsx` | ✅ With dynamic import wrapper (SSR-safe) |
| `Button` | `components/ui/button.tsx` | ✅ Soga brown primary theme |
| `Input` | `components/ui/input.tsx` | ✅ Gold border focus theme |

### Invite Page Sections (`app/invite/[slug]/page.tsx`)
1. **Hero** — Bismillah Arabic text, couple names with Framer Motion entrance, date badge
2. **Opening Quote** — Jawa Krama Inggil with decorative corner frame
3. **Couple Detail** — Gold-framed cards with initials, heart divider
4. **Countdown** — Live countdown with Javanese labels
5. **Upacara Adat Jawa** — 5 ceremony steps (Siraman, Midodareni, Akad, Panggih, Resepsi)
6. **Event Schedule** — Akad & Resepsi cards with gold/green themes
7. **Venue Map** — Leaflet with custom wedding icon, Google Maps link
8. **RSVP Form** — Name, guest count, attendance (Rawuh/Mboten Rawuh/Pangandikan), message
9. **Closing** — Blessing quote, "Keluarga Besar Mempelai", gamelan bells
10. **Footer** — Javanese closing phrase

### Mock Data — Authentic Javanese
- **Couple**: Raden Bagus Anom Surya Kusumo & Raden Ayu Pertiwi Hapsari Retno Dumilah
- **Venue**: Pendopo Agung Mangkunegaran, Surakarta (Solo)
- **Date**: 17 Agustus 2026
- **Quotes**: Krama Inggil (high Javanese) for opening/closing
- **Ceremonies**: Siraman, Midodareni, Akad Nikah, Panggih, Resepsi

### Animations — Javanese Court Dance Inspired
- `heroVariants` — Dramatic curtain reveal (1.2s)
- `coupleNameVariants` — Grand scale+fade entrance (1.4s)
- `ampersandVariants` — Gentle rotate+scale (1.6s)
- `ceremonyCardVariants` — Staggered fade up
- `floatSwayVariants` — Gentle 4s sway for ornaments
- `lineGrowVariants` — Horizontal line draw for dividers
- All transitions use custom easing [0.22, 1, 0.36, 1]

### CSS Patterns (globals.css)
- `.parang-pattern` — Diagonal batik stripes
- `.mega-mendung` — Radial cloud gradients
- `.kawung-pattern` — Geometric dot grid
- `.jawa-frame` — Gold border with inset shadow
- `.gold-shimmer` — Pulsing gold opacity
- `.float-gentle` — Vertical float animation
- `.jawa-divider` — Flex divider with gradient lines
- `.text-gradient-gold` — Gold gradient text

### Build Status
- ✅ `next build` — Clean, zero errors
- ✅ Dev server on port 3001 — Both `/` and `/invite/bagus-pertiwi-2026` return 200
- ⚠ Root project (`/data/openclawfice/`) has separate Next.js app — must use `node ./node_modules/next/dist/bin/next` from frontend dir
- ⚠ Root `instrumentation.ts` must be temporarily renamed when running frontend dev server

### Key Technical Decisions
1. **Leaflet SSR**: VenueMap uses dynamic import with `ssr: false` via wrapper component
2. **Zod v4**: `zodResolver` requires `as any` type assertion due to type incompatibility
3. **Framer Motion**: `exactOptionalPropertyTypes` conflicts with `motion.button` spread props — fixed by explicit prop passing
4. **Path aliases**: `@/*` maps to `./src/*` via tsconfig paths
5. **Root conflict**: Root project's `instrumentation.ts` and `.next` cache interfere with frontend builds

## Phase 1 — Complete (2026-05-26)
All Phase 1 tasks implemented with Javanese theme:
- F1.1 ✅ Public invitation page
- F1.2 ✅ Countdown timer
- F1.3 ✅ Couple detail
- F1.4 ✅ RSVP form (UI complete, API integration pending)
- F1.5 ✅ Leaflet map
- F1.6 ⚠ Multi-location map (pending Backend data model)
- F1.7 ✅ Google Maps directions
- F1.8 ⚠ RSVP success page (pending Backend API)
- F1.9 ✅ Page transition animations

## Overall Progress
- Phase 0: 9/9 ✅ (100%)
- Phase 1: 9/9 ✅ (100% — UI complete, 2 pending API)
- Phase 2: 0/6 ⏳ (WA Blast UI — not started)
- Phase 3: 0/9 ⏳ (Dashboard — not started)
- Phase 4: 0/8 ⏳ (Polish — not started)
- **Jawa Theme: ✅ Complete & Built**
