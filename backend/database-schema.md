# 💾 Database Schema — Wedding Invitation SaaS

## Prisma Schema

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Enums ───────────────────────────────────────────────────────────────────

enum Role {
  ADMIN
  OWNER
}

enum RsvpStatus {
  PENDING     // Belum merespond
  ATTENDING   // Hadir
  NOT_ATTENDING // Tidak hadir
  MAYBE       // Mungkin
}

enum InvitationStatus {
  DRAFT         // Belum dikirim
  QUEUED        // Di antrian pengiriman
  SENT          // Terkirim ke WhatsApp
  DELIVERED     // Terkirim ke device penerima
  READ          // Dibaca oleh penerima
  REPLIED       // Tamu membalas / submit RSVP
  FAILED        // Gagal kirim
  OPTED_OUT     // Tamu memilih STOP / opt-out
  BOUNCED       // Nomor tidak valid
}

enum BlastJobStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  CANCELLED
}

enum MessageCategory {
  INVITATION   // Template undangan
  REMINDER     // Template pengingat
  CUSTOM       // Template custom
}

// ─── User / Admin ───────────────────────────────────────────────────────────

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String    @map("password_hash")
  name          String
  phone         String?   // Optional: untuk notifikasi WA ke admin
  role          Role      @default(OWNER)
  
  // Relations
  weddings      Wedding[]
  
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  @@map("users")
}

// ─── Wedding Event ──────────────────────────────────────────────────────────

model Wedding {
  id              String   @id @default(cuid())
  userId          String   @map("user_id")
  
  // Couple info
  groomName       String   @map("groom_name")
  brideName       String   @map("bride_name")
  groomPhoto      String?  @map("groom_photo")  // S3 URL
  bridePhoto      String?  @map("bride_photo")   // S3 URL
  couplePhoto     String?  @map("couple_photo")  // S3 URL
  
  // Event slug for public URL
  slug            String   @unique  // e.g., "ahmad-siti-2026"
  
  // Story / description
  story           String?  @db.Text
  theme           String?  // Theme identifier for frontend
  
  // Relations
  user            User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  venues          Venue[]
  guests          Guest[]
  messageTemplates MessageTemplate[]
  blastJobs       BlastJob[]
  
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")

  @@index([userId])
  @@index([slug])
  @@map("weddings")
}

// ─── Venue (Multi-location support) ─────────────────────────────────────────

model Venue {
  id            String   @id @default(cuid())
  weddingId     String   @map("wedding_id")
  
  type          String   // "ceremony" | "reception" | "other"
  name          String   // e.g., "Gedung Serba Guna"
  address       String   @db.Text
  latitude      Float
  longitude     Float
  
  // Schedule
  startTime     DateTime @map("start_time")
  endTime       DateTime? @map("end_time")
  
  // Relations
  wedding       Wedding  @relation(fields: [weddingId], references: [id], onDelete: Cascade)
  
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  @@index([weddingId])
  @@map("venues")
}

// ─── Guest ──────────────────────────────────────────────────────────────────

model Guest {
  id                String   @id @default(cuid())
  weddingId         String   @map("wedding_id")
  
  // Guest info
  name              String
  whatsappNumber    String   @map("whatsapp_number")  // E.164 format: +6281234567890
  email             String?  // Optional
  
  // RSVP
  rsvpStatus        RsvpStatus @default(PENDING) @map("rsvp_status")
  guestCount        Int        @default(1) @map("guest_count")  // Jumlah tamu termasuk dirinya
  rsvpAt            DateTime?  @map("rsvp_at")
  rsvpNote          String?    @map("rsvp_note")  // Ucapan / catatan dari tamu
  
  // Unique link token
  invitationToken   String     @unique @default(cuid()) @map("invitation_token")
  
  // Custom greeting
  customGreeting    CustomGreeting?
  
  // Invitation tracking
  invitationStatus  InvitationStatus @default(DRAFT) @map("invitation_status")
  sentAt            DateTime?  @map("sent_at")
  deliveredAt       DateTime?  @map("delivered_at")
  readAt            DateTime?  @map("read_at")
  repliedAt         DateTime?  @map("replied_at")
  failedReason      String?    @map("failed_reason")
  
  // Relations
  wedding           Wedding    @relation(fields: [weddingId], references: [id], onDelete: Cascade)
  blastLogs         BlastLog[]
  
  createdAt         DateTime   @default(now()) @map("created_at")
  updatedAt         DateTime   @updatedAt @map("updated_at")

  @@index([weddingId])
  @@index([weddingId, rsvpStatus])
  @@index([weddingId, invitationStatus])
  @@index([whatsappNumber])
  @@index([invitationToken])
  @@unique([weddingId, whatsappNumber])  // No duplicate numbers per wedding
  @@map("guests")
}

// ─── Custom Greeting per Guest ──────────────────────────────────────────────

model CustomGreeting {
  id          String   @id @default(cuid())
  guestId     String   @unique @map("guest_id")
  
  message     String   @db.Text  // e.g., "Bapak Ahmad, kami mengundang Bapak di acara..."
  
  // Relations
  guest       Guest    @relation(fields: [guestId], references: [id], onDelete: Cascade)
  
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("custom_greetings")
}

// ─── Message Template ───────────────────────────────────────────────────────

model MessageTemplate {
  id            String         @id @default(cuid())
  weddingId     String         @map("wedding_id")
  
  name          String         // e.g., "Undangan Utama", "Pengingat H-3"
  category      MessageCategory @default(INVITATION)
  
  // Template content (with placeholders)
  body          String         @db.Text
  // Placeholder: {{guest_name}}, {{groom_name}}, {{bride_name}}, {{ceremony_date}}, {{venue_name}}, {{invitation_link}}
  
  // Meta template info (for WA Business API)
  metaTemplateId String?       @map("meta_template_id")  // Meta's template ID
  metaLanguage   String?       @map("meta_language")     // e.g., "id", "en"
  
  // Relations
  wedding       Wedding        @relation(fields: [weddingId], references: [id], onDelete: Cascade)
  blastJobs     BlastJob[]
  
  createdAt     DateTime       @default(now()) @map("created_at")
  updatedAt     DateTime       @updatedAt @map("updated_at")

  @@index([weddingId])
  @@index([weddingId, category])
  @@map("message_templates")
}

// ─── Blast Job (Queue tracking) ─────────────────────────────────────────────

model BlastJob {
  id              String         @id @default(cuid())
  weddingId       String         @map("wedding_id")
  templateId      String         @map("template_id")
  
  // Job config
  status          BlastJobStatus @default(PENDING)
  scheduledAt     DateTime?      @map("scheduled_at")  // Timezone-aware scheduling
  
  // Progress tracking
  totalCount      Int            @default(0) @map("total_count")
  sentCount       Int            @default(0) @map("sent_count")
  deliveredCount  Int            @default(0) @map("delivered_count")
  readCount       Int            @default(0) @map("read_count")
  failedCount     Int            @default(0) @map("failed_count")
  optedOutCount   Int            @default(0) @map("opted_out_count")
  
  // Relations
  wedding         Wedding        @relation(fields: [weddingId], references: [id], onDelete: Cascade)
  template        MessageTemplate @relation(fields: [templateId], references: [id], onDelete: Cascade)
  logs            BlastLog[]
  
  createdAt       DateTime       @default(now()) @map("created_at")
  updatedAt       DateTime       @updatedAt @map("updated_at")
  completedAt     DateTime?      @map("completed_at")

  @@index([weddingId])
  @@index([status])
  @@index([scheduledAt])
  @@map("blast_jobs")
}

// ─── Blast Log (Per-message tracking) ───────────────────────────────────────

model BlastLog {
  id              String           @id @default(cuid())
  blastJobId      String           @map("blast_job_id")
  guestId         String           @map("guest_id")
  
  // Message details
  messageBody     String           @map("message_body") @db.Text  // Actual rendered message
  waMessageId     String?          @map("wa_message_id")  // Meta's message ID
  
  // Status tracking
  status          InvitationStatus @default(QUEUED)
  sentAt          DateTime?        @map("sent_at")
  deliveredAt     DateTime?        @map("delivered_at")
  readAt          DateTime?        @map("read_at")
  failedAt        DateTime?        @map("failed_at")
  failedReason    String?          @map("failed_reason")
  
  // Retry logic
  retryCount      Int              @default(0) @map("retry_count")
  
  // Relations
  blastJob        BlastJob         @relation(fields: [blastJobId], references: [id], onDelete: Cascade)
  guest           Guest            @relation(fields: [guestId], references: [id], onDelete: Cascade)
  
  createdAt       DateTime         @default(now()) @map("created_at")
  updatedAt       DateTime         @updatedAt @map("updated_at")

  @@index([blastJobId])
  @@index([guestId])
  @@index([status])
  @@unique([blastJobId, guestId])  // One log entry per guest per blast job
  @@map("blast_logs")
}
```

## Entity Relationship Diagram

```
┌──────────┐     1:N     ┌──────────┐     1:N     ┌──────────┐
│   User   │────────────▶│ Wedding  │────────────▶│  Guest   │
└──────────┘             └──────────┘             └──────────┘
                              │  │                     │  │
                           1:N│  │1:N               1:1│  │1:N
                              ▼  ▼                     ▼  ▼
                        ┌──────────┐          ┌──────────────────┐
                        │  Venue   │          │ CustomGreeting   │
                        └──────────┘          └──────────────────┘
                              │
                           1:N│
                              ▼
                   ┌──────────────────┐
                   │ MessageTemplate  │
                   └──────────────────┘
                              │
                           1:N│
                              ▼
                   ┌──────────────────┐     1:N     ┌──────────┐
                   │   BlastJob      │────────────▶│ BlastLog │
                   └──────────────────┘             └──────────┘
```

## Indexes Summary

| Table | Index | Purpose |
|-------|-------|---------|
| `weddings` | `userId` | Fast lookup of user's weddings |
| `weddings` | `slug` | Public invitation page lookup |
| `guests` | `weddingId` | List all guests for a wedding |
| `guests` | `weddingId + rsvpStatus` | Dashboard RSVP stats |
| `guests` | `weddingId + invitationStatus` | Delivery tracking dashboard |
| `guests` | `whatsappNumber` | Opt-out lookup |
| `guests` | `invitationToken` | Unique RSVP link resolution |
| `guests` | `weddingId + whatsappNumber` (unique) | Prevent duplicate invites |
| `blast_jobs` | `weddingId` | List blasts for a wedding |
| `blast_jobs` | `status` | Worker job fetching |
| `blast_jobs` | `scheduledAt` | Scheduled blast processing |
| `blast_logs` | `blastJobId` | Job progress query |
| `blast_logs` | `status` | Status-based filtering |
| `blast_logs` | `blastJobId + guestId` (unique) | Idempotency |

## Spam Mitigation Notes

1. **Rate Limiting**: Application-level rate limiter enforces max 1 message/second per WhatsApp Business Account. This is implemented in the BullMQ worker, not at DB level.

2. **Template-Only Enforcement**: The `MessageTemplate.metaTemplateId` field links to pre-approved Meta templates. The blast worker validates that a valid `metaTemplateId` exists before sending. No free-text messages allowed.

3. **Opt-Out Handling**: When a guest replies "STOP", the WA webhook sets `Guest.invitationStatus = OPTED_OUT`. The blast worker skips all guests with this status. The `BlastJob.optedOutCount` tracks opt-outs per blast.

4. **Exponential Backoff**: Failed messages are retried with exponential backoff (1s → 2s → 4s → 8s → 16s, max 5 retries). Configured in the BullMQ worker job options.

5. **Timezone-Aware Scheduling**: `BlastJob.scheduledAt` stores UTC time. The worker checks the wedding's target timezone before sending to avoid sending at inappropriate hours (e.g., no sends between 22:00-08:00 local time).

6. **Bounce Detection**: Invalid WhatsApp numbers result in `InvitationStatus.BOUNCED`. These numbers are flagged and excluded from future blasts.

7. **Nginx-Level Rate Limiting**: Additional rate limiting at the reverse proxy level protects the API from abuse (configured by DevOps).

## Migration & Seed Plan

### Migration
```bash
npx prisma migrate dev --name init
```

### Seed Data (`prisma/seed.ts`)
- 1 demo admin user (email: `admin@wedding.app`, password: `changeme123`)
- 1 demo wedding ("Ahmad & Siti Wedding")
- 1 ceremony venue + 1 reception venue
- 5 sample guests with varied RSVP statuses
- 2 message templates (invitation + reminder)
- 1 completed blast job with logs
- 1 custom greeting for a VIP guest
```
