# TOOLS.md — DevOps DevOps Notes

## Infrastructure Overview

| Component | Technology | Port | Purpose |
|-----------|-----------|------|---------|
| Hostinger VPS | Ubuntu Server | — | Primary host |
| Docker Compose | v3.9 | — | Container orchestration |
| Next.js Frontend | Node.js | 3000 | SSR wedding invitation pages |
| Backend API | Node.js + Express | 4000 | REST API |
| PostgreSQL | 16-alpine | 5432 | Primary database |
| Redis | 7-alpine | 6379 | Cache + BullMQ queue |
| Nginx | 1.26-alpine | 8080→80, 443 | Reverse proxy, SSL termination |
| Uptime Kuma | v1 | 9999→3001 | Monitoring dashboard |

## Project Structure
```
devops/
├── docker-compose.yml        # Main orchestration
├── docker-compose.staging.yml    # Staging overrides
├── docker-compose.prod.yml       # Production overrides
├── nginx/
│   ├── nginx.conf            # Main Nginx config
│   └── conf.d/
│       └── wedding.conf      # App-specific config
├── monitoring/
│   ├── uptime-kuma/          # Uptime Kuma config
│   └── alerting/             # Alert webhook configs
├── scripts/
│   ├── backup.sh             # Database backup script
│   ├── restore.sh            # Database restore script
│   └── ssl-renew.sh          # SSL renewal script
├── .env.example              # Environment template
└── ci-cd/
    └── .github/workflows/
        ├── ci.yml            # CI pipeline
        ├── deploy-staging.yml    # Staging deploy
        └── deploy-production.yml # Production deploy
```

## Docker Compose Services (6 services)
1. **frontend** — Next.js 14+, port 3000, memory limit 512M
2. **backend** — Node.js API, port 4000, memory limit 512M
3. **postgres** — PostgreSQL 16, port 5432, memory limit 1G
4. **redis** — Redis 7, port 6379, memory limit 256M, AOF persistence
5. **nginx** — Reverse proxy, port 8080/443, memory limit 128M
6. **uptime-kuma** — Monitoring, port 9999, memory limit 256M

## Security Hardening Checklist
- [ ] UFW firewall: allow 80, 443, 22 only
- [ ] Fail2ban for SSH brute-force protection
- [ ] SSH keys only, no password auth
- [ ] Root login disabled
- [ ] Docker internal networks for DB/Redis
- [ ] Rate limiting at Nginx level
- [ ] Security headers (CSP, X-Frame-Options, HSTS)
- [ ] Let's Encrypt SSL with auto-renewal
- [ ] Credentials in env vars only, never in repo

## Backup Strategy
- **PostgreSQL:** Daily `pg_dump` at 2 AM, kept for 7 days
- **Redis:** RDB snapshot every 6 hours
- **Off-site:** rsync to backup server / S3-compatible storage
- **Recovery:** Documented restore procedure, tested monthly

## Monitoring (Uptime Kuma on port 9999)
- Frontend health (port 3000) — 30s interval
- Backend API health (port 4000) — 30s interval
- PostgreSQL health (port 5432) — 15s interval
- Redis health (port 6379) — 15s interval
- Alerts → Telegram/Discord webhook

## CI/CD Pipeline (GitHub Actions)
1. **CI** — On PR: lint, test, build Docker images
2. **Staging** — Merge to `develop`: auto-deploy to staging
3. **Production** — Merge to `main`: deploy with rollback step
