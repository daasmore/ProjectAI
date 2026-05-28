# 📋 DevOps TODO — Wedding Invitation SaaS

## Phase 0 — Infrastructure Setup (Minggu 1) — ✅ COMPLETE

### Docker & Containerization
- [x] Create `docker-compose.yml` with all core services
- [x] Create `Dockerfile` for Next.js frontend
- [x] Create `Dockerfile` for Backend API
- [x] Configure Docker networks & volumes persistence
- [x] Test full stack locally with `docker compose up`

### Nginx Reverse Proxy
- [x] Create `nginx/nginx.conf` with:
  - [x] SSL termination (Let's Encrypt certs)
  - [x] Rate limiting (WA blast protection)
  - [x] Gzip compression
  - [x] Security headers (CORS, X-Frame-Options, CSP)
  - [x] Routing: `/api/*` → backend:4000, `/` → frontend:3000
- [x] HTTP → HTTPS redirect
- [x] WebSocket support (for real-time RSVP notifications)

### CI/CD Pipeline (GitHub Actions)
- [x] Create `.github/workflows/ci.yml`:
  - [x] Lint & test on PR
  - [x] Build Docker images
  - [x] Push to container registry (GHCR or Docker Hub)
- [x] Create `.github/workflows/deploy-staging.yml`:
  - [x] Auto-deploy to staging on merge to `develop`
- [x] Create `.github/workflows/deploy-production.yml`:
  - [x] Deploy to production on merge to `main` / tag
  - [x] Rollback step included
- [x] Configure GitHub Secrets (SSH key, env vars)

### Environment Management
- [x] Create `.env.example` with all required variables
- [x] Create `.env.staging` template
- [x] Create `.env.production` template
- [x] Document all env vars in `ENVIRONMENT.md`

### SSL & Security
- [x] Set up Let's Encrypt with Certbot
- [x] Configure auto-renewal cron job
- [x] Harden Nginx SSL config (TLS 1.2+, strong ciphers)
- [x] Set up firewall rules (UFW): allow 80, 443, 22 only
- [x] Configure fail2ban for SSH brute-force protection
- [x] Disable root login, use SSH keys only

### Monitoring & Alerting
- [x] Configure Uptime Kuma (port 9999):
  - [x] Monitor frontend (port 3000)
  - [x] Monitor backend API (port 4000)
  - [x] Monitor PostgreSQL (port 5432)
  - [x] Monitor Redis (port 6379)
  - [x] Set up notification (Telegram / Discord webhook)
- [x] Set up PM2 process manager (if applicable)
- [x] Configure log rotation for all services

### Backup & Disaster Recovery
- [x] Create backup script for PostgreSQL (daily pg_dump)
- [x] Create backup script for Redis (RDB snapshot)
- [x] Set up off-site backup (S3-compatible / rsync)
- [x] Document recovery procedure
- [x] Test rollback: `docker compose down && docker compose up`

---

## Phase 1 — RSVP + Maps (Minggu 2) — ✅ COMPLETE

- [x] **DO-101**: Ensure DB migrations run on deploy (added migrate-staging + migrate-production jobs)
- [x] **DO-102**: Verify RSVP form → API → DB flow in staging (`verify-rsvp-flow.sh`)
- [x] **DO-103**: Set up Google Maps API key in env vars (all templates + docker-compose)
- [x] **DO-104**: Configure BullMQ worker monitoring in Uptime Kuma (monitors + health endpoint docs)
- [x] **DO-105**: Setup staging deployment pipeline (`deploy-staging.yml` with smoke tests)

---

## Phase 2-4 Support (Minggu 3-6)

### Phase 2 — WhatsApp Blast
- [ ] Configure BullMQ workers in Docker
- [ ] Set up WA API credentials securely
- [ ] Ensure rate limiting is active at Nginx level
- [ ] Monitor queue health via Uptime Kuma

### Phase 3 — Dashboard & Templates
- [ ] Deploy template storage (MinIO / S3)
- [ ] Verify file upload pipeline
- [ ] Load testing for dashboard

### Phase 4 — Production Deploy
- [ ] Final security audit
- [ ] Production environment ready
- [ ] DNS configuration
- [ ] Go-live checklist
- [ ] Post-deploy monitoring

---

## Completed
- [x] Initial `docker-compose.yml` created
- [x] `status.md` created
- [x] `TODO.md` created
- [x] All Phase 0 tasks complete (2026-05-25)
- [x] All Phase 1 tasks complete (2026-05-26)
