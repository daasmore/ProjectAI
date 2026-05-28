# ⚙️ Backend — Backend TODO

## Phase 0 — Setup & Foundation (Minggu 1)
- [ ] Initialize Node.js + Express project structure
- [ ] Setup Prisma with PostgreSQL connection
- [ ] Write initial database migration (all tables + enums)
- [ ] Write seed data script (demo wedding, admin user, sample guests)
- [ ] Setup Redis connection + BullMQ initialization
- [ ] Setup Pino logging with structured JSON output
- [ ] Create `.env.example` with all required environment variables
- [ ] Setup basic Express middleware (CORS, body parser, error handler)

## Phase 1 — Core API & RSVP (Minggu 2-3) 📋 DESIGNED, NOT YET IMPLEMENTED
- [x] API contract documentation (OpenAPI/Swagger or Markdown)
- [ ] Auth API (register, login, refresh token) — JWT + bcrypt — **BLOCKED: needs PostgreSQL**
- [ ] Wedding CRUD API (create, read, update wedding event) — **BLOCKED: needs PostgreSQL**
- [ ] Guest management API (CRUD, bulk import from CSV) — **BLOCKED: needs PostgreSQL**
- [ ] RSVP API (submit RSVP via unique link, update RSVP) — **BLOCKED: needs PostgreSQL**
- [ ] Maps data API (return venue coordinates + details) — **BLOCKED: needs PostgreSQL**
- [ ] Dashboard stats API (response rate, guest count, timeline) — **BLOCKED: needs PostgreSQL**
- [ ] Export API (CSV/Excel export of guest list + RSVPs) — **BLOCKED: needs PostgreSQL**
- [ ] Initialize Node.js + Express project (src/) — **BLOCKED: needs infrastructure**
- [ ] Setup Prisma + run migrations — **BLOCKED: needs PostgreSQL**
- [ ] Write + run seed data script — **BLOCKED: needs PostgreSQL**
- [ ] Setup Redis + BullMQ — **BLOCKED: needs Redis**
- [ ] Unit + integration tests — **BLOCKED: needs implementation first**

## Phase 2 — WhatsApp Blast & Queue (Minggu 3-4)
- [ ] WhatsApp Business API integration (Meta Cloud API)
- [ ] Message template management API
- [ ] BullMQ queue setup for WA blast jobs
- [ ] Blast sender worker (rate-limited: 1 msg/sec)
- [ ] Exponential backoff retry logic
- [ ] Delivery tracking webhook (sent → delivered → read → replied)
- [ ] Opt-out ("STOP") handler
- [ ] Timezone-aware scheduling
- [ ] Spam mitigation middleware (rate limit, template-only enforcement)
- [ ] Custom greeting per guest (personalized message rendering)

## Phase 3 — Dashboard & Templates (Minggu 5)
- [ ] Invitation template management API
- [ ] File upload API (S3/MinIO for photos & media)
- [ ] Real-time notification API (WebSocket or SSE for RSVP updates)
- [ ] Admin dashboard data endpoints
- [ ] Input sanitization middleware (all form inputs)

## Phase 4 — Security, Testing & Deploy (Minggu 6)
- [ ] Rate limiting middleware (Nginx + app level)
- [ ] CORS policy hardening
- [ ] Session token expiry + refresh mechanism
- [ ] Unit tests for critical paths (auth, RSVP, blast queue)
- [ ] Integration tests for WA API
- [ ] Production deployment checklist
- [ ] Database backup strategy

## Blockers / Waiting On
- 🔴 DevOps: PostgreSQL + Redis connection strings
- 🔴 DevOps: WA Business API credentials (Meta Cloud API)
- 🔴 DevOps: S3/MinIO credentials
- 🟡 Frontend: API contract review & sign-off before Phase 1 integration
