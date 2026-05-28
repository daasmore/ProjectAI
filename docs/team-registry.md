# 🎯 Wedding Invitation SaaS — Team Registry

> Orchestrator: OWL
> Project: Wedding Invitation SaaS Platform
> Last Updated: 2026-05-25 22:35

---

## 👥 Team Roster

| Agent | ID | Role | Status | Workspace |
|-------|----|------|--------|-----------|
| **Project Lead** | OWL | Koordinasi, dokumentasi, validasi | ✅ Active | `/data/openclawfice/` |
| **Frontend Expert** | OWL-FE | Next.js UI/UX, RSVP form, Maps | ✅ Online | `/data/openclawfice/agents/frontend/` |
| **Backend Expert** | OWL-BE | API, PostgreSQL, WhatsApp blast | ✅ Online | `/data/openclawfice/agents/backend/` |
| **DevOps Expert** | OWL-DO | Docker, Nginx, CI/CD, monitoring | ✅ Online | `/data/openclawfice/agents/devops/` |

---

## 📋 Status Legend

| Icon | Meaning |
|------|---------|
| ✅ | Active / Ready |
| 🔄 | Working on task |
| ⏳ | Blocked / Waiting on dependency |
| 🚫 | Unavailable |

---

## 🔄 Active Tasks

| Task ID | Description | Assignee | Status | Dependencies |
|---------|-------------|----------|--------|--------------|
| T-001 | Project setup & team registry | OWL | ✅ Done | — |
| T-002 | Blueprint & tech stack | OWL | ✅ Done | — |
| T-003 | Database schema design | OWL-BE | ✅ Done | T-002 |
| T-004 | Custom Greeting analysis | OWL | ✅ Done | T-002 |
| T-005 | Docker Compose setup | OWL-DO | ✅ Done | T-002 |
| T-006 | Agent workspace files setup | OWL (sub) | 🔄 In Progress | T-001 |
| T-007 | Phase 0 — Project scaffolding | OWL-FE, OWL-BE, OWL-DO | ⏳ Pending | T-006 |

---

## 📡 Cara Assign Task

Orchestrator (OWL) assign task via `sessions_send`:
- Frontend → sessions_spawn dengan workspace frontend
- Backend → sessions_spawn dengan workspace backend
- DevOps → sessions_spawn dengan workspace devops
- Project Lead → langsung oleh OWL

---

## 📐 Blueprint Reference
- Blueprint: `/data/openclawfice/blueprint.md`
- DB Schema: `/data/openclawfice/agents/backend/database-schema.md`
- Custom Greeting Analysis: `/data/openclawfice/agents/project-lead/docs/custom-greeting-analysis.md`
- Docker Compose: `/data/openclawfice/agents/devops/docker-compose.yml`
- Frontend TODO: `/data/openclawfice/agents/frontend/TODO.md`
- Backend TODO: `/data/openclawfice/agents/backend/TODO.md`
- DevOps TODO: `/data/openclawfice/agents/devops/TODO.md`
- Office Dashboard: `/data/openclawfice/OFFICE.md`
