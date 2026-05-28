# 🎨 Frontend — Frontend TODO

> Task list untuk Frontend Agent. Diurutkan berdasarkan prioritas & dependency.

---

## 🔴 Phase 0 — Project Setup (Minggu 1)

- [x] **F0.1** Initialize Next.js 14+ project dengan App Router ✅
- [x] **F0.2** Setup Tailwind CSS + shadcn/ui base components ✅
- [x] **F0.3** Setup folder structure (`app/`, `components/`, `lib/`, `hooks/`, `stores/`, `templates/`) ✅
- [x] **F0.4** Setup Zustand store (initial boilerplate) ✅
- [x] **F0.5** Setup Framer Motion & global animation config ✅
- [x] **F0.6** Setup React Hook Form + Zod validation utilities ✅
- [x] **F0.7** Setup Leaflet (OpenStreetMap) base config ✅
- [x] **F0.8** Setup ESLint + Prettier + TypeScript strict mode ✅
- [x] **F0.9** Setup environment variable template (`.env.example`) ✅

---

## 🟠 Phase 1 — RSVP + Maps (Minggu 2-3)

- [x] **F1.1** Halaman undangan publik (`/invite/[slug]`) — layout dasar, mobile-first ✅
- [x] **F1.2** Komponen countdown timer menuju hari H ✅
- [x] **F1.3** Komponen detail pasangan & acara (nama, tanggal, waktu) ✅
- [ ] **F1.4** RSVP Form — Nama, Jumlah Tamu, Konfirmasi Hadir/Tidak Hadir
  - Validasi: React Hook Form + Zod schema
  - State: loading, success, error
- [x] **F1.5** Integrasi Leaflet map — single location (akad / resepsi) ✅ (VenueMap component)
- [ ] **F1.6** Multi-location map support (akad + resepsi berbeda tempat)
- [x] **F1.7** "Buka di Google Maps" directions button ✅ (in invite page)
- [ ] **F1.8** Halaman sukses RSVP + konfirmasi ke tamu
- [x] **F1.9** Animasi transisi halaman dengan Framer Motion ✅ (in invite page)

> ⚠️ **BLOCKED**: F1.4, F1.6, F1.8 menunggu Backend API contract (RSVP endpoint, Invitation CRUD)

---

## 🟡 Phase 2 — WhatsApp Blast UI (Minggu 3-4)

- [ ] **F2.1** Halaman upload CSV/contact list untuk blast
- [ ] **F2.2** Preview pesan dengan variabel personalisasi (`{{nama}}`)
- [ ] **F2.3** Blast progress UI — real-time sent/delivered/failed counter
- [ ] **F2.4** Delivery tracking table dengan status badges
- [ ] **F2.5** Timezone-aware scheduling UI (datetime picker + timezone selector)
- [ ] **F2.6** Opt-out / STOP handling notice

> ⚠️ **BLOCKED**: F2.1–F2.6 menunggu Backend API contract (Blast endpoint, Queue status)

---

## 🟢 Phase 3 — Dashboard & Templates (Minggu 5)

- [ ] **F3.1** Auth pages — Login & Register (session-based)
- [ ] **F3.2** Dashboard layout (sidebar navigation, responsive)
- [ ] **F3.3** Dashboard stats — response rate, total tamu, chart kehadiran
- [ ] **F3.4** Manajemen undangan — CRUD list, create, edit, delete
- [ ] **F3.5** Template undangan — minimal 2 tema (classic, modern)
- [ ] **F3.6** Template preview & selector
- [ ] **F3.7** Export data tamu ke CSV/Excel (frontend trigger)
- [ ] **F3.8** Notifikasi real-time (toast/popup) — WebSocket atau polling
- [ ] **F3.9** File upload UI untuk foto/media undangan

> ⚠️ **BLOCKED**: F3.1–F3.9 menunggu Backend API contract (Auth, Dashboard, Invitation CRUD, Upload)

---

## 🔵 Phase 4 — Polish & UAT (Minggu 6)

- [ ] **F4.1** Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] **F4.2** Mobile responsiveness audit (320px — 4K)
- [ ] **F4.3** Accessibility check (a11y — ARIA labels, keyboard nav, contrast)
- [ ] **F4.4** Performance optimization (Lighthouse score target: 90+)
- [ ] **F4.5** SEO meta tags & Open Graph untuk halaman undangan
- [ ] **F4.6** Error boundaries & fallback UI
- [ ] **F4.7** Loading states & skeleton screens
- [ ] **F4.8** Bug fix dari UAT feedback

---

## 📊 Progress Summary

| Phase | Total Tasks | Completed | Status |
|-------|------------|-----------|--------|
| Phase 0 — Setup | 9 | 9 | ✅ Complete |
| Phase 1 — RSVP + Maps | 9 | 6 | 🔄 In Progress |
| Phase 2 — WA Blast UI | 6 | 0 | ⏳ Blocked by Backend |
| Phase 3 — Dashboard & Templates | 9 | 0 | ⏳ Blocked by Backend |
| Phase 4 — Polish & UAT | 8 | 0 | ⏳ Not started |
| **Total** | **41** | **15** | **🔄 37% Complete** |
