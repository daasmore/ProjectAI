# 💒 ProjectAI — Wedding Invitation SaaS

> AI-powered wedding invitation platform with RSVP, Maps Integration, and WhatsApp Blast.

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14+, Tailwind CSS, shadcn/ui |
| **Backend** | Node.js/Express, PostgreSQL, Redis (BullMQ) |
| **WhatsApp** | WhatsApp Business API (Meta Cloud API) |
| **DevOps** | Docker, Nginx, GitHub Actions, Uptime Kuma |

## 📁 Repository Structure

```
ProjectAI/
├── docs/           # Blueprints, PRD, team registry
├── frontend/       # Next.js wedding invitation app
│   └── workspace/  # Actual Next.js project
├── backend/        # API server (Express + Prisma)
├── devops/         # Docker, Nginx, CI/CD configs
└── .gitignore
```

## 🚀 MVP Features

1. **RSVP Online** — Guest confirmation form with Zod validation
2. **Maps Integration** — Google Maps location embedding
3. **WhatsApp Blast** — Bulk invitation via WABA with spam mitigation
4. **Admin Dashboard** — Event management for wedding organizers

## 📋 Development Phases

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 0 | ✅ Done | Setup, scaffolding, project structure |
| Phase 1 | 🔜 Next | Backend API + Database schema |
| Phase 2 | ⏳ Planned | Frontend pages + RSVP form |
| Phase 3 | ⏳ Planned | WhatsApp Blast + Spam mitigation |
| Phase 4 | ⏳ Planned | Deployment + Monitoring |

## 👥 AI Team

All development is orchestrated by OWL (Project Lead) and executed by specialized AI agents:

| Agent | Role | Workspace |
|-------|------|-----------|
| 🦉 OWL | Project Lead / Orchestrator | `docs/` |
| Frontend Expert | Next.js UI/UX | `frontend/` |
| Backend Expert | API, Database, WhatsApp | `backend/` |
| DevOps Expert | Docker, Nginx, CI/CD | `devops/` |

## 🔗 Links

- **GitHub:** https://github.com/daasmore/ProjectAI
- **Live Demo:** _(TBD)_

## 📄 License

See [docs/LICENSE](docs/LICENSE) for details.
