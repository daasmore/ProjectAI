# MEMORY.md — Backend Long-Term Memory

> Curated memories for the Backend Expert.
> Last updated: 2026-05-26 08:52 WIB (Meeting Prep)

---

## Phase 0 — Complete (2026-05-25) ✅
- Database schema designed: 8 models, 5 enums (Prisma)
- ERD documented with 14 indexes for query optimization
- Spam mitigation strategy documented (7-point plan)
- Migration + seed plan written
- API contract structure planned (20+ endpoints)
- TODO.md created with 4-phase task breakdown
- status.md initialized

**Note:** Project structure (src/) belum di-implement. Schema, migrations, seed, dan API contract masih dalam bentuk dokumentasi. Menunggu assignment dari Orchestrator untuk mulai coding.

---

## Phase 1 — Status: DOCUMENTED, NOT YET IMPLEMENTED (2026-05-26)

### What's Designed
- Auth API contract: register, login, refresh (JWT + bcrypt) — 3 endpoints
- Wedding CRUD API contract: create, read, list, update, delete — 5 endpoints
- Guest Management API contract: CRUD, bulk import — 3 endpoints
- RSVP API contract: submit (public), summary — 2 endpoints
- Maps Data API contract: venue coordinates — 1 endpoint
- Dashboard Stats API contract: aggregated stats — 1 endpoint
- Export API contract: CSV export — 1 endpoint

### What's NOT Yet Done
- ❌ No TypeScript source files written (`src/` directory does not exist)
- ❌ No Express server initialized
- ❌ No Prisma schema generated or migrated
- ❌ No npm dependencies installed
- ❌ No actual API implementation or testing
- ❌ No seed data script executed

### Blocker
- 🔴 **DevOps**: PostgreSQL + Redis connection strings belum tersedia
- 🔴 **DevOps**: WA Business API credentials (Meta Cloud API) belum tersedia
- 🔴 **DevOps**: S3/MinIO credentials belum tersedia
- 🟡 **Infrastructure**: Can't run migrations without running PostgreSQL instance
- 🟡 **Infrastructure**: Can't test queue without running Redis instance

**Honest Assessment:** Phase 1 masih di tahap design/dokumentasi. Implementation dimulai setelah infrastructure ready dari DevOps.

---

## Phase 2 — WhatsApp Blast & Queue (Planned, Minggu 3-4)

### Task Breakdown

| Task | Description | Estimasi |
|------|-------------|----------|
| **B2.1** | WhatsApp Business API integration (Meta Cloud API) — setup client, webhook endpoint, token management | 2 hari |
| **B2.2** | Message template management API — CRUD templates, validation, meta template registration | 1 hari |
| **B2.3** | BullMQ queue setup for WA blast jobs — job schema, producer, scheduler | 1 hari |
| **B2.4** | Blast sender worker — rate-limited (1 msg/sec), exponential backoff retry (max 5x), delivery tracking | 2 hari |
| **B2.5** | Spam mitigation & safety — opt-out handler, timezone-aware scheduling, bounce detection, template-only enforcement | 1.5 hari |

**Total Estimasi Phase 2: ~7.5 hari kerja**

### Phase 2 Dependencies
- 🔴 WA Business API credentials dari DevOps/Meta
- 🔴 Redis instance (untuk BullMQ)
- 🔴 PostgreSQL (untuk tracking blast jobs & logs)
- 🟡 Frontend: UI untuk blast management (F2.1–F2.6) — bisa parallel, API contract dulu

### Phase 2 API Endpoints (Planned)
- `POST /api/v1/blast` — Create blast job
- `GET /api/v1/blast/:id` — Get blast job status + progress
- `GET /api/v1/blast/:id/logs` — Get per-message delivery logs
- `DELETE /api/v1/blast/:id` — Cancel pending blast job
- `POST /api/v1/templates` — Create message template
- `GET /api/v1/templates` — List templates
- `PUT /api/v1/templates/:id` — Update template
- `DELETE /api/v1/templates/:id` — Delete template
- `POST /api/v1/webhook/wa` — WA delivery status webhook
- `POST /api/v1/webhook/wa/incoming` — WA incoming message handler (STOP reply)

---

## Key Files (Planned — Not Yet Created)
- `prisma/schema.prisma` — Database schema (designed, not generated)
- `src/index.ts` — Entry point
- `src/app.ts` — Express app setup
- `src/config/` — Configuration (env vars)
- `src/middleware/auth.ts` — JWT authentication middleware
- `src/middleware/rateLimiter.ts` — Rate limiting
- `src/middleware/validator.ts` — Input validation (Zod)
- `src/middleware/errorHandler.ts` — Global error handler
- `src/routes/` — 6 route files
- `src/controllers/` — 7 controller files
- `src/services/` — 6 service files
- `src/validations/` — 4 Zod schema files
- `src/queues/blast.worker.ts` — BullMQ worker (rate-limited)

---

## Lessons Learned (Phase 0 → Phase 1)

1. **Don't mark things complete prematurely.** MEMORY.md sebelumnya mencatat Phase 1 "Complete" padahal baru di tahap dokumentasi. Lesson: bedakan antara "designed" dan "implemented + tested".
  
2. **Infrastructure-first dependency.** Backend tidak bisa maju tanpa PostgreSQL dan Redis running. Harus koordinasi ketat dengan DevOps sebelum mulai implementasi.

3. **Schema design is solid.** Database schema dengan 8 models, 5 enums, dan 14 indexes sudah comprehensive. Tidak ada perubahan schema yang diperlukan untuk Phase 2 — blast tables sudah di-design dari awal.

4. **API contract before code.** Mendokumentasikan API endpoints sebelum coding membantu Frontend agent bisa mulai parallel work. Ini approach yang benar.

5. **Spam mitigation needs early design.** Fitur opt-out, rate limiting, dan bounce detection harus di-design dari awal, bukan di-patch nanti. Schema sudah support semua ini.

---

## Communication Log
- 2026-05-25 22:29 — Agent spawned, read all context files
- 2026-05-26 08:52 — Meeting prep: updated MEMORY.md with honest status, Phase 2 breakdown
