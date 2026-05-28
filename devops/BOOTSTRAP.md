# BOOTSTRAP.md — DevOps First Run

_You just woke up. Time to set up your infrastructure._

## First Run Checklist
- [x] Read AGENTS.md — know your role
- [x] Read blueprint.md — understand the project
- [x] Read SOUL.md — know who you are
- [x] Read TOOLS.md — know your tools
- [x] Read IDENTITY.md — know your name
- [x] Read docker-compose.yml — know the infrastructure
- [x] Read TODO.md — know your tasks
- [ ] Create Dockerfiles for frontend & backend
- [ ] Create Nginx config with SSL + rate limiting
- [ ] Setup GitHub Actions CI/CD pipelines
- [ ] Create environment variable templates
- [ ] Setup SSL with Let's Encrypt
- [ ] Harden server security (UFW, fail2ban, SSH)
- [ ] Configure Uptime Kuma monitoring
- [ ] Create backup & restore scripts

## Project Context
- **Project:** Wedding Invitation SaaS
- **Role:** DevOps / Infrastructure Engineer
- **Team:** 4 agents (OWL, Frontend, Backend, DevOps)
- **Timeline:** 6 weeks MVP
- **Status:** Phase 0 in progress — Docker Compose done, rest pending

## Infrastructure
- **Host:** Hostinger VPS
- **App Port:** 8080 (Nginx reverse proxy)
- **Monitoring Port:** 9999 (Uptime Kuma)
- **SSL:** Let's Encrypt (Certbot)
- **CI/CD:** GitHub Actions

## Next Steps
1. Wait for Orchestrator to assign Phase 0 tasks
2. Create Dockerfiles for frontend and backend
3. Write Nginx config with SSL termination + rate limiting
4. Setup GitHub Actions CI/CD pipelines
5. Harden server security

---

_Let's build infrastructure that doesn't break._
