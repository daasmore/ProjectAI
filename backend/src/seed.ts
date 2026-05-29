import db from "./lib/database";
import { generateId } from "./lib/utils";

console.log("🌱 Seeding database...");

// Clean existing data (order matters for FK)
db.prepare("DELETE FROM guests").run();
db.prepare("DELETE FROM rsvps").run();
db.prepare("DELETE FROM weddings").run();

// ─── Wedding ────────────────────────────────────────────────────────────────
const weddingId = generateId();
const weddingSlug = "bagus-pertiwi-2026";

db.prepare(
  `INSERT INTO weddings (id, slug, bride_name, groom_name, wedding_date, venue, venue_address, theme, photo_url, description)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
).run(
  weddingId,
  weddingSlug,
  "Pertiwi Sari",         // bride_name
  "Bagus Pratama",         // groom_name
  "2026-08-15",            // wedding_date (masa depan)
  "Gedung Serba Guna Melati", // venue
  "Jl. Mawar No. 45, Bandung, Jawa Barat", // venue_address
  "elegant-gold",           // theme
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=800", // photo_url
  "Dengan penuh sukacita, kami mengundang Bapak/Ibu/Sahabat untuk menghadiri pernikahan kami." // description
);

console.log(`✅ Wedding created: ${weddingSlug} (id: ${weddingId})`);

// ─── RSVP Dummy Data ─────────────────────────────────────────────────────────
const dummyRsvps = [
  {
    guest_name: "Ahmad Fauzi",
    email: "ahmad@example.com",
    guest_count: 2,
    status: "confirmed",
    message: "Selamat ya! Insyaa Allah hadir.",
  },
  {
    guest_name: "Siti Nurhaliza",
    email: "siti@example.com",
    guest_count: 1,
    status: "confirmed",
    message: "Alhamdulillah, sangat Bahagia untuk kalian berdua!",
  },
  {
    guest_name: "Budi Santoso",
    email: "budi@example.com",
    guest_count: 3,
    status: "pending",
    message: "Insyaa Allah datang, akan konfirmasi lagi.",
  },
  {
    guest_name: "Dewi Lestari",
    email: "dewi@example.com",
    guest_count: 1,
    status: "declined",
    message: "Maaf, tidak bisa hadir karena ada acara keluarga.",
  },
  {
    guest_name: "Rizky Hidayat",
    email: "rizky@example.com",
    guest_count: 2,
    status: "confirmed",
    message: "Selamat menempuh hidup baru!",
  },
];

for (const rsvp of dummyRsvps) {
  const id = generateId();
  db.prepare(
    `INSERT INTO rsvps (id, wedding_id, guest_name, email, guest_count, status, message)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(id, weddingId, rsvp.guest_name, rsvp.email, rsvp.guest_count, rsvp.status, rsvp.message);
}
console.log(`✅ Inserted ${dummyRsvps.length} RSVP records`);

// ─── Guest Input Manual ──────────────────────────────────────────────────────
const dummyGuests = [
  { name: "Hengki Wijaya", email: "hengki@example.com", phone: "+6281234567890", status: "confirmed" },
  { name: "Maya Angelina", email: "maya@example.com", phone: "+6289876543210", status: "pending" },
  { name: "Rudi Hartono", email: "rudi@example.com", phone: "+6281112223334", status: "declined" },
];

for (const guest of dummyGuests) {
  const id = generateId();
  db.prepare(
    `INSERT INTO guests (id, wedding_id, name, email, phone, status)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(id, weddingId, guest.name, guest.email, guest.phone, guest.status);
}
console.log(`✅ Inserted ${dummyGuests.length} manual guest records`);

console.log("\n🎉 Seed complete! Wedding slug: bagus-pertiwi-2026");
