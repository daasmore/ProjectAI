# 💒 Wedding Invitation SaaS — Project Blueprint

> Version: 1.0.0 | Status: Draft | Last Updated: 2026-05-25

---

## 🏗️ Tech Stack

### Frontend
| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | **Next.js 14+** (App Router) | SSR untuk SEO undangan |
| Styling | **Tailwind CSS + shadcn/ui** | Rapid UI development |
| Animasi | **Framer Motion** | Smooth page transitions |
| State | **Zustand** or React Context | Lightweight state management |
| Maps | **Google Maps API** / Leaflet (OSM) | Pilih berdasarkan budget |
| Form | **React Hook Form + Zod** | Validasi RSVP yang robust |

### Backend
| Layer | Technology | Notes |
|-------|-----------|-------|
| Runtime | **Node.js** (Express / Fastify) atau **Go** | Pilih berdasarkan throughput WA blast |
| Database | **PostgreSQL** (primary) + **Redis** (cache/queue) | Reliable & performant |
| ORM | **Prisma** | Type-safe DB access |
| Queue | **BullMQ** (Redis-based) | Queue untuk WhatsApp blast |
| Auth | **NextAuth.js** atau **JWT + bcrypt** | Session-based auth |
| File Storage | **S3-compatible** (MinIO / AWS S3) | Foto & media undangan |
| Logging | **Pino** atau **Winston** | Structured logging |

### WhatsApp Integration
| Layer | Technology | Notes |
|-------|-----------|-------|
| API | **WhatsApp Business API** (Meta official) via Cloud API | Hindari unofficial API untuk production |
| Fallback | **WABA** (WhatsApp Business Account) | Multi-device support |
| Message Template | Pre-approved Meta templates | Wajib untuk blast ke non-contact |

### DevOps & Infrastructure
| Layer | Technology | Notes |
|-------|-----------|-------|
| Hosting | **Hostinger VPS** (existing) | Port 8080 (app), 9999 (monitoring) |
| Container | **Docker + Docker Compose** | Reproducible deployments |
| Reverse Proxy | **Nginx** | SSL termination, rate limiting |
| CI/CD | **GitHub Actions** | Auto-deploy ke VPS |
| Monitoring | **Uptime Kuma** (port 9999) + **PM2** | Healthcheck & process management |
| SSL | **Let's Encrypt** (Certbot) | Free, auto-renewal |

---

## 🚀 MVP Features

### 1. RSVP Online
- **Deskripsi:** Tamu dapat konfirmasi kehadiran via link unik yang dikirim melalui undangan.
- **Fitur:**
  - Form Nama, Jumlah Tamu, Konfirmasi Hadir/Tidak
  - Countdown & wedding detail page
  - Dashboard untuk memantau response rate
  - Export data tamu ke CSV/Excel
  - Notifikasi real-time ke pemilik undangan

### 2. Integrasi Maps
- **Deskripsi:** Menampilkan lokasi acara (gedung, gereja, outdoor venue) dengan peta interaktif.
- **Fitur:**
  - Embed Google Maps / OpenStreetMap
  - Directions button (buka di Google Maps app)
  - Multi-location support (akad + resepsi di tempat berbeda)
  - Estimated travel time dari lokasi pengguna (opsional)

### 3. WhatsApp Blast + Spam Mitigation
- **Deskripsi:** Kirim undangan ke banyak nomor WhatsApp sekaligus, dengan kontrol spam.
- **Fitur:**
  - Bulk send dari CSV/contact list
  - Personalisasi pesan per nama tamu
  - **Spam Mitigation:**
    - ⏱️ Rate limiting: max 1 pesan/detik per device
    - 📝 Hanya gunakan Meta-approved message templates
    - 🔄 Queue system dengan exponential backoff
    - 🚫 Auto-block jika akun dilaporkan
    - 📊 Delivery tracking (sent / delivered / failed)
    - ✋ Opt-out ("STOP") handling
    - ⏰ Timezone-aware scheduling

---

## 🔄 Agent Workflow & Communication

### Alur Kerja Umum

```
User Request
    │
    ▼
┌──────────────┐
│ Orchestrator │  ← Identifikasi agent yang tepat
│   (OWL)       │  ← Cek dependencies
└──────┬───────┘
       │
       ├──────────────────────────────────┐
       ▼                                  ▼
[Agent Assignee]                    [Project Lead]
    │                                    │
    ▼                                    ▼
Selesaikan tugas                  Dokumentasi & Validasi
    │                                    │
    └──────────────┬─────────────────────┘
                   ▼
            ┌──────────────┐
            │ Orchestrator │  ← Laporan ke user
            └──────────────┘
```

### Komunikasi Antar Agent

| Trigger | Dari | Ke | Deskripsi |
|---------|------|----|-----------|
| DB schema selesai | Backend | Frontend | API contract & types siap |
| UI component ready | Frontend | Backend | Butuh API endpoint tertentu |
| Deploy selesai | DevOps | Project Lead | Notifikasi untuk QA check |
| Feature complete | Agent manapun | Project Lead | Request review & validasi |
| Bug ditemukan | Project Lead | Agent terkait | Bug report & fix request |
| Infrastructure ready | DevOps | Backend | Server ready untuk API deploy |

### Dependency Rules
1. **Frontend** menunggu **Backend** menyelesaikan API contract sebelum integrasi
2. **DevOps** menyiapkan environment **sebelum** Backend deploy
3. **Project Lead** memvalidasi **setelah** agent selesai, **sebelum** release
4. **Orchestrator** memastikan semua dependensi terpenuhi sebelum assign task

---

## 📅 MVP Timeline (Estimasi)

| Phase | Deliverables | Duration |
|-------|-------------|----------|
| **Phase 0** | Setup repos, CI/CD, DB schema | Minggu 1 |
| **Phase 1** | RSVP form + database + Maps embed | Minggu 2-3 |
| **Phase 2** | WhatsApp blast + queue + spam mitigation | Minggu 3-4 |
| **Phase 3** | Dashboard, template undangan, testing | Minggu 5 |
| **Phase 4** | UAT, bug fix, production deploy | Minggu 6 |

---

## 🔐 Security Considerations

- WA API keys disimpan di env vars, **bukan** di codebase
- Rate limiting di Nginx level (nginx.conf)
- Input sanitization pada semua form (RSVP)
- CORS policy yang ketat
- Database credentials rotated regularly
- Session tokens dengan expiry & refresh mechanism

---

## 📝 Catatan

- Semua API keys & credentials dikelola oleh DevOps via environment variables
- Setiap agent wajib update `status.md` di folder workspace masing-masing saat mengerjakan task
- Project Lead memelihara `changelog.md` di `/data/openclawfice/changelog.md`
