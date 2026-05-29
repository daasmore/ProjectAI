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
  `INSERT INTO weddings (
    id, slug, bride_name, groom_name, wedding_date, venue, venue_address, theme, photo_url, description,
    akad_time, resepsi_time, quote, quote_source, bride_parents, groom_parents,
    hero_image, bride_photo, groom_photo,
    gallery_1, gallery_2, gallery_3, gallery_4, gallery_5, gallery_6,
    music_url, font_family, primary_color, secondary_color, accent_color,
    gmaps_url, gmaps_embed
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
).run(
  weddingId,
  weddingSlug,
  "Sarah Putri",
  "Ahmad Rizky",
  "2026-08-15",
  "Gedung Serbaguna Melati Ballroom",
  "Jl. Bougenville No. 12, Kebayoran Baru, Jakarta Selatan",
  "minimalist",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
  "Dengan penuh sukacita, kami mengundang Bapak/Ibu/Sahabat untuk menghadiri pernikahan kami.",
  "09:00 WIB",
  "11:00 WIB",
  "Cinta sejati adalah ketika dua jiwa menjadi satu",
  "Rumi",
  "Bapak Suryanto & Ibu Dewi Lestari",
  "Bapak Ahmad Fauzi & Ibu Siti Aminah",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
  "https://images.unsplash.com/photo-1525258437537-f9a5a0f1e4e5?w=600",
  "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=600",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "serif",
  "#1a1a1a",
  "#f5f5f5",
  "#d4af37",
  "https://maps.google.com/?q=Gedung+Serbaguna+Melati+Ballroom+Jakarta",
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.8!3d-6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1"
);

console.log(`✅ Wedding created: ${weddingSlug} (id: ${weddingId})`);

// ─── RSVP Dummy Data ─────────────────────────────────────────────────────────
const dummyRsvps = [
  { guest_name: "Ahmad Fauzi", email: "ahmad@example.com", guest_count: 2, status: "confirmed", message: "Selamat ya! Insyaa Allah hadir." },
  { guest_name: "Siti Nurhaliza", email: "siti@example.com", guest_count: 1, status: "confirmed", message: "Alhamdulillah!" },
  { guest_name: "Budi Santoso", email: "budi@example.com", guest_count: 3, status: "pending", message: "Insyaa Allah datang." },
  { guest_name: "Dewi Lestari", email: "dewi@example.com", guest_count: 1, status: "declined", message: "Maaf, tidak bisa hadir." },
  { guest_name: "Rizky Hidayat", email: "rizky@example.com", guest_count: 2, status: "confirmed", message: "Selamat menempuh hidup baru!" },
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
