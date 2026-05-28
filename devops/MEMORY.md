# MEMORY.md — DevOps Long-Term Memory

> Curated memories for the DevOps Expert.
> Last updated: 2026-05-26 08:52 WIB (Rapat Sinkronisasi Tim)

---

## Phase 0 — Complete (2026-05-25)

- Dockerfiles: Frontend (Next.js) + Backend (Express) — multi-stage builds
- Nginx config: SSL termination, rate limiting, security headers
- CI/CD: GitHub Actions (lint, test, build, deploy)
- Docker Compose: base + staging + production
- Environment templates: .env.example, .env.staging, .env.production
- Backup scripts: backup.sh, restore.sh, ssl-renew.sh
- Monitoring: Uptime Kuma config + alerting rules

## Phase 1 — Complete (2026-05-26)

Semua task DO-101–105 telah dikonfirmasi complete:

| Task | Description | Evidence |
|------|-------------|----------|
| DO-101 | DB migration on deploy | `projects/.github/workflows/ci.yml` — migrate-staging + migrate-production jobs; `projects/devops/scripts/run-migrations.sh` |
| DO-102 | RSVP flow verification | `projects/devops/scripts/verify-rsvp-flow.sh` — smoke test untuk form→API→DB |
| DO-103 | Google Maps API key | All env templates (`env.example`, staging, prod) + `docker-compose.yml` sudah menyertakan `GOOGLE_MAPS_API_KEY` |
| DO-104 | BullMQ worker monitoring | `projects/devops/monitoring/uptime-kuma-monitors.json` — konfigurasi monitor; `projects/devops/monitoring/bullmq-health-endpoint.md` — panduan implementasi health endpoint untuk Backend |
| DO-105 | Staging deployment pipeline | `projects/.github/workflows/deploy-staging.yml` — auto-deploy on merge ke `develop` dengan smoke tests |

**Total file infrastruktur Phase 1:** 9 files delivered.

---

## Phase 2 — WhatsApp Blast Infrastructure (Planning)

### Kebutuhan Infrastruktur

| # | Kebutuhan | Status | Notes |
|---|-----------|--------|-------|
| 1 | BullMQ workers dalam Docker | ❌Belum | Tambahkan service `worker` di `docker-compose.yml` (scale: 2-3 replica untuk blast queue) |
| 2 | WA API credentials (WA_API_KEY, WA_PHONE_NUMBER_ID) | ❌ Belum | Perlu Meta Business account + WhatsApp Business Platform approval. Credentials disimpan di GitHub Secrets |
| 3 | WA webhook endpoint (inbound messages) | ❌ Belum | Perlu expose endpoint `/api/wa/webhook` via Nginx. Verifikasi callback URL dari Meta |
| 4 | Rate limiting WA blast di Nginx | ⚠️ Parsial | Rate limit `burst` sudah ada di nginx.conf, perlu disesuaikan dengan WhatsApp rate limit (80 msg/s untuk on-prem) |
| 5 | Monitoring blast queue di Uptime Kuma | ❌ Belum | Monitor queue depth, failed jobs, worker uptime — memerlukan Backend expose `/api/queue/stats` |
| 6 | Redis memory upgrade | ❌ Belum | Redis saat ini 256M limit — untuk blast queue besar perlu minimal 512M |
| 7 | Log aggregation untuk blast | ❌ Belum | Perlu centralized logging (pino transport → file → optional ELK/Loki) untuk trace per-blast campaign |

### Blockers

1. **WA API Credentials** — Tergantung pada Meta Business verification (bisa 1-3 hari kerja). Backend tidak bisa mulai integrasi tanpa ini.
2. **Backend BullMQ Health Endpoint** — Dokumentasi sudah disiapkan (`bullmq-health-endpoint.md`), tapi implementasi ada di tangan Backend. Monitoring DevOps baru aktif setelah endpoint tersedia.
3. **Domain + SSL untuk Webhook** — WA webhook memerlukan HTTPS yang valid. Staging bisa pakai self-signed, tapi production perlu domain terdaftar + Let's Encrypt aktif.
4. **Redis Scalability** — Jika blast 1000+ penerima, single Redis instance bisa jadi bottleneck. Perlu evaluazione Redis Cluster atau partition.

### Estimasi Waktu Setup Infrastruktur Phase 2

| Task | Estimasi | Dependency |
|------|----------|------------|
| Add BullMQ worker service ke Docker Compose | 0.5 hari | None |
| Configure WA webhook endpoint di Nginx | 0.5 hari | Domain + SSL ready |
| Secure WA API credentials di GitHub Secrets/Vault | 0.25 hari | Meta approval |
| Redis memory upgrade + queue tuning | 0.25 hari | None |
| Monitoring: queue depth, failed jobs, worker uptime di Uptime Kuma | 1 hari | Backend health endpoint |
| Rate limiting tuning untuk WA blast pattern | 0.5 hari | None |
| Log aggregation setup untuk blast campaign | 1 hari | None |
| **Total estimasi** | **4 hari kerja** | |

---

## Dependencies for Phase 2

- WA API credentials needed for blast feature — blocked on Meta Business approval
- BullMQ queue health endpoint needs Backend implementation
- Staging needs Meta Business account for WA testing
- Domain registration + SSL for WA webhook (production)
- Redis memory upgrade (256M → 512M minimum)

## Lessons Learned

- Always run migrations before app container starts — race condition antara DB dan app container solved depends_on + healthcheck
- Smoke tests should clean up after themselves — verify-rsvp-flow.sh sekarang punya cleanup trap
- Uptime Kuma JSON import makes monitor setup easy — definisikan monitors di JSON, import sekali
- Staging pipeline should be separate from production — deploy-staging.yml punya smoke test wajib sebelum lanjut
- Docker internal networks are essential for DB/Redis security — core services di jaringan `backend` (internal: true)
- Environment templates harus di semua env (example, staging, prod) — jangan asumsikannya ada
- CI/CD pipeline tests are only as good as the test suite — jika Backend/Frontend tidak punya tests yang memadai, pipeline tetap lolos tapi keuntungan minimal

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Main orchestration (6+ services) |
| `docker-compose.staging.yml` | Staging overrides |
| `docker-compose.prod.yml` | Production overrides |
| `.github/workflows/ci.yml` | CI pipeline with migrations |
| `.github/workflows/deploy-staging.yml` | Staging deploy |
| `devops/scripts/run-migrations.sh` | Migration runner |
| `devops/scripts/verify-rsvp-flow.sh` | Smoke test |
| `devops/monitoring/uptime-kuma-monitors.json` | Monitor config |
| `devops/monitoring/bullmq-health-endpoint.md` | Backend guide |
