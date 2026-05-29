# 🐳 Docker Deployment Guide — Wedding Invitation SaaS

## Architecture

```
                    ┌─────────────────────────────────────┐
                    │           Port 80 / 443             │
                    │         Nginx Reverse Proxy         │
                    │     (SSL termination, caching)      │
                    └──────┬──────────────────┬───────────┘
                           │                  │
              /api/* ──────┘                  └──── / (everything else)
                           │                  │
                    ┌──────▼──────┐    ┌──────▼──────┐
                    │  Backend     │    │  Frontend   │
                    │  Express     │    │  Next.js    │
                    │  :3001       │    │  :3000      │
                    └──────┬──────┘    └─────────────┘
                           │
                    ┌──────▼──────┐
                    │  SQLite DB  │
                    │  (volume)   │
                    └─────────────┘
```

## Quick Start

```bash
# From the project root
docker compose up -d --build

# Check status
docker compose ps

# View logs
docker compose logs -f

# Stop everything
docker compose down
```

## URLs

| Service | URL |
|---------|-----|
| Frontend | `http://localhost/` |
| API | `http://localhost/api/v1/` |
| Health | `http://localhost/health` |

## Production Deploy

```bash
cd /tmp/ProjectAI
./devops/deploy.sh prod
```

## Services Details

### Nginx (Reverse Proxy)
- Port 80 → public-facing
- Routes `/api/*` → backend
- Routes everything else → frontend
- Gzip compression
- Static asset caching (1 year immutable for Next.js static)
- CORS headers for API
- Rate limiting: 30 req/s general, 5 req/s RSVP submit

### Frontend (Next.js 14)
- Standalone output for minimal container size
- Port 3000
- Env: `NEXT_PUBLIC_API_URL=/api/v1` (relative URL, works behind proxy)

### Backend (Express + SQLite)
- Port 3001
- SQLite database persisted via Docker volume (`backend_data`)
- CORS configured for frontend origin
- Healthcheck: `GET /health`

## Volumes

| Volume | Purpose | Data |
|--------|---------|------|
| `backend_data` | SQLite database | `/app/data/wedding.db` |
| `nginx_logs` | Nginx access/error logs | `/var/log/nginx/` |

## Troubleshooting

```bash
# Check all logs
docker compose logs -f

# Check specific service
docker compose logs -f backend

# Restart one service
docker compose restart backend

# Shell into a container
docker compose exec backend sh
docker compose exec frontend sh

# Check disk usage
docker system df

# Cleanup unused resources
docker system prune -a --volumes
```

## Cloudflare Tunnel (Optional)

For a stable public URL without opening firewall ports:

1. Install cloudflared and authenticate
2. Create tunnel: `cloudflared tunnel create wedding-saas`
3. Copy credentials to `devops/cloudflared/`
4. Update `devops/cloudflared/config.yml` with your tunnel ID
5. Add service to docker-compose.yml or run standalone

## Custom Domain + SSL

For production with a custom domain:

1. Point DNS A record to your server
2. Update `nginx.conf` `server_name` with your domain
3. Install certbot for Let's SSL:
   ```bash
   certbot --nginx -d yourdomain.com
   ```
4. Add SSL certificate paths to nginx.conf
