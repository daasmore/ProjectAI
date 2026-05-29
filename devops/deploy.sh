#!/usr/bin/env bash
# ══════════════════════════════════════════════════════════════
# Deploy Script — Wedding Invitation SaaS
# ══════════════════════════════════════════════════════════════
#
# Usage:
#   ./devops/deploy.sh [env]
#
# Example:
#   ./devops/deploy.sh        # Default deploy
#   ./devops/deploy.sh prod   # Production with prune
#
set -euo pipefail

# ── Configuration ──────────────────────────────────────────────
PROJECT_DIR="/tmp/ProjectAI"
COMPOSE_FILE="${PROJECT_DIR}/docker-compose.yml"
HEALTH_WAIT=30
HEALTH_INTERVAL=2
ENV="${1:-default}"

# ── Colors ─────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

info()  { echo -e "${BLUE}[INFO]${NC}  $*"; }
ok()    { echo -e "${GREEN}[OK]${NC}    $*"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $*"; }
error() { echo -e "${RED}[ERROR]${NC} $*"; }

# ── Pre-flight ─────────────────────────────────────────────────
preflight() {
    info "Running pre-flight checks..."

    # Check Docker
    if ! command -v docker &>/dev/null; then
        error "Docker is not installed"
        exit 1
    fi

    # Check Docker Compose
    if ! docker compose version &>/dev/null 2>&1; then
        error "Docker Compose is not available"
        exit 1
    fi

    # Check Docker daemon
    if ! docker info &>/dev/null 2>&1; then
        error "Docker daemon is not running"
        exit 1
    fi

    # Check compose file exists
    if [ ! -f "${COMPOSE_FILE}" ]; then
        error "Compose file not found: ${COMPOSE_FILE}"
        exit 1
    fi

    ok "Pre-flight checks passed"
}

# ── Git Pull ───────────────────────────────────────────────────
pull_latest() {
    info "Pulling latest code from Git..."

    cd "${PROJECT_DIR}"

    # Stash any local changes (config files etc.)
    git stash push -m "deploy-autostash-$(date +%s)" --quiet 2>/dev/null || true

    # Pull latest
    if git pull origin main --quiet 2>/dev/null; then
        ok "Code updated to latest $(git rev-parse --short HEAD)"
    else
        warn "Git pull failed or no remote. Using local code."
    fi
}

# ── Build & Deploy ─────────────────────────────────────────────
deploy() {
    info "Building Docker images..."
    docker compose -f "${COMPOSE_FILE}" build --no-cache 2>&1 | tail -20

    info "Starting services..."
    if [ "${ENV}" = "prod" ]; then
        # Production: prune old images
        docker compose -f "${COMPOSE_FILE}" up -d --force-recreate --remove-orphans
        docker image prune -f &>/dev/null || true
    else
        docker compose -f "${COMPOSE_FILE}" up -d --force-recreate --remove-orphans
    fi

    ok "Services started"
}

# ── Health Check ───────────────────────────────────────────────
health_check() {
    info "Waiting for services to be healthy (max ${HEALTH_WAIT}s)..."

    local elapsed=0
    local all_healthy=false

    while [ ${elapsed} -lt ${HEALTH_WAIT} ]; do
        sleep ${HEALTH_INTERVAL}
        elapsed=$((elapsed + HEALTH_INTERVAL))

        # Check all services
        local unhealthy
        unhealthy=$(docker compose -f "${COMPOSE_FILE}" ps --format json 2>/dev/null | \
            grep -c '"Health":"unhealthy"' 2>/dev/null || echo "0")

        local starting
        starting=$(docker compose -f "${COMPOSE_FILE}" ps --format json 2>/dev/null | \
            grep -c '"Health":"starting"' 2>/dev/null || echo "0")

        if [ "${unhealthy}" = "0" ] && [ "${starting}" = "0" ]; then
            all_healthy=true
            break
        fi
    done

    if [ "${all_healthy}" = true ]; then
        ok "All services are healthy (${elapsed}s)"
    else
        warn "Health check timed out after ${HEALTH_WAIT}s"
        warn "Check logs: docker compose -f ${COMPOSE_FILE} logs"
    fi
}

# ── Verify API ─────────────────────────────────────────────────
verify_api() {
    info "Verifying API endpoints..."

    # Backend health
    local backend_status
    backend_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/api/v1/weddings/test 2>/dev/null || echo "000")

    if [ "${backend_status}" = "404" ] || [ "${backend_status}" = "200" ]; then
        ok "Backend API responding (HTTP ${backend_status})"
    else
        warn "Backend API check: HTTP ${backend_status}"
    fi

    # Frontend
    local frontend_status
    frontend_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/ 2>/dev/null || echo "000")

    if [ "${frontend_status}" = "200" ]; then
        ok "Frontend responding (HTTP ${frontend_status})"
    else
        warn "Frontend check: HTTP ${frontend_status}"
    fi
}

# ── Status ─────────────────────────────────────────────────────
show_status() {
    echo ""
    echo "═══════════════════════════════════════════════════════════"
    echo "  🚀 Wedding Invitation SaaS — Deploy Status"
    echo "═══════════════════════════════════════════════════════════"
    echo ""

    docker compose -f "${COMPOSE_FILE}" ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"

    echo ""
    info "Access points:"
    echo "  Frontend:  http://localhost/"
    echo "  API:       http://localhost/api/v1/"
    echo "  Health:    http://localhost/health"
    echo ""
    info "Useful commands:"
    echo "  Logs:     docker compose -f ${COMPOSE_FILE} logs -f"
    echo "  Restart:  docker compose -f ${COMPOSE_FILE} restart"
    echo "  Stop:     docker compose -f ${COMPOSE_FILE} down"
    echo "═══════════════════════════════════════════════════════════"
}

# ── Main ───────────────────────────────────────────────────────
main() {
    echo ""
    echo "🚀 Deploying Wedding Invitation SaaS..."
    echo "   Environment: ${ENV}"
    echo "   Timestamp:   $(date '+%Y-%m-%d %H:%M:%S')"
    echo ""

    preflight
    pull_latest
    deploy
    health_check
    verify_api
    show_status

    ok "Deploy complete! 🎉"
}

main "$@"
