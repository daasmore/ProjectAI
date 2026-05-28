# TOOLS.md — Backend Backend Notes

## Development Tools
- **Runtime:** Node.js + Express (REST API)
- **Database:** PostgreSQL 16 + Prisma ORM
- **Cache/Queue:** Redis 7 + BullMQ
- **Auth:** JWT + bcrypt
- **Logging:** Pino (structured JSON)
- **WhatsApp:** Meta Cloud API (WhatsApp Business API)
- **File Storage:** S3-compatible (MinIO/AWS S3)
- **Testing:** Vitest (unit), Supertest (API), Playwright (E2E)

## Project Structure
```
backend/
├── src/
│   ├── index.ts              # Entry point
│   ├── app.ts                # Express app setup
│   ├── config/               # Configuration (env vars)
│   ├── middleware/            # Express middleware
│   │   ├── auth.ts          # JWT auth middleware
│   │   ├── rateLimiter.ts   # Rate limiting
│   │   ├── validator.ts     # Input validation
│   │   └── errorHandler.ts  # Global error handler
│   ├── routes/              # API routes
│   │   ├── auth.ts          # Auth endpoints
│   │   ├── weddings.ts      # Wedding CRUD
│   │   ├── guests.ts        # Guest management
│   │   ├── rsvp.ts          # RSVP endpoints
│   │   ├── blast.ts         # WhatsApp blast
│   │   ├── dashboard.ts     # Dashboard stats
│   │   └── upload.ts        # File upload
│   ├── controllers/         # Route handlers
│   ├── services/            # Business logic
│   │   ├── waService.ts     # WhatsApp API integration
│   │   ├── queueService.ts  # BullMQ queue management
│   │   └── emailService.ts  # Email notifications
│   ├── models/              # Prisma models (see schema.prisma)
│   ├── queues/              # BullMQ workers
│   │   └── blastWorker.ts   # WA blast worker
│   ├── lib/                 # Utilities
│   │   ├── prisma.ts        # Prisma client
│   │   ├── redis.ts         # Redis client
│   │   └── logger.ts        # Pino logger
│   └── types/               # TypeScript types
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── migrations/          # Database migrations
│   └── seed.ts              # Seed data
├── tests/                   # Test files
├── .env.example             # Environment template
├── package.json
└── tsconfig.json
```

## API Design Conventions
- **RESTful endpoints** with consistent naming
- **Versioning:** `/api/v1/` prefix
- **Response format:** `{ success: boolean, data: any, error?: string }`
- **Pagination:** `?page=1&limit=20` query params
- **Error codes:** Standard HTTP status codes + custom error messages

## Rate Limiting Rules
- **WA Blast:** 1 message/second per device
- **API General:** 100 requests/minute per IP
- **Auth endpoints:** 10 requests/minute per IP
- **RSVP submission:** 5 requests/minute per IP

## Security Checklist
- [ ] All inputs validated (Zod schemas)
- [ ] SQL injection prevention (Prisma parameterized queries)
- [ ] XSS prevention (output encoding)
- [ ] CORS policy configured
- [ ] Rate limiting active (Nginx + app level)
- [ ] JWT tokens with expiry + refresh
- [ ] Credentials in env vars only
- [ ] HTTPS enforced
