import Database from "better-sqlite3";
import path from "path";

const dbPath = process.env.DB_PATH || path.join(__dirname, "../../data/wedding.db");

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// ── Weddings table ──────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS weddings (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    bride_name TEXT NOT NULL,
    groom_name TEXT NOT NULL,
    wedding_date TEXT NOT NULL,
    venue TEXT NOT NULL,
    venue_address TEXT,
    theme TEXT DEFAULT 'minimalist',
    photo_url TEXT,
    description TEXT,
    akad_time TEXT,
    resepsi_time TEXT,
    quote TEXT,
    quote_source TEXT,
    bride_parents TEXT,
    groom_parents TEXT,
    hero_image TEXT,
    bride_photo TEXT,
    groom_photo TEXT,
    gallery_1 TEXT,
    gallery_2 TEXT,
    gallery_3 TEXT,
    gallery_4 TEXT,
    gallery_5 TEXT,
    gallery_6 TEXT,
    music_url TEXT,
    font_family TEXT DEFAULT 'serif',
    primary_color TEXT DEFAULT '#1a1a1a',
    secondary_color TEXT DEFAULT '#f5f5f5',
    accent_color TEXT DEFAULT '#d4d4d4',
    gmaps_url TEXT,
    gmaps_embed TEXT,
    template_id TEXT DEFAULT '',
    user_id TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

// ── Templates table ──────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS templates (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT DEFAULT '',
    thumbnail TEXT DEFAULT '',
    category TEXT DEFAULT 'classic',
    primary_color TEXT DEFAULT '#C9A96E',
    secondary_color TEXT DEFAULT '#1A1A1A',
    accent_color TEXT DEFAULT '#F5F0E8',
    font_family TEXT DEFAULT 'Playfair Display',
    font_body TEXT DEFAULT 'Lato',
    style_json TEXT DEFAULT '{}',
    is_active INTEGER DEFAULT 1,
    is_premium INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

// ── RSVPs table ──────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS rsvps (
    id TEXT PRIMARY KEY,
    wedding_id TEXT NOT NULL,
    guest_name TEXT NOT NULL,
    email TEXT,
    guest_count INTEGER DEFAULT 1,
    status TEXT DEFAULT 'pending' CHECK(status IN ('confirmed','declined','pending')),
    message TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (wedding_id) REFERENCES weddings(id) ON DELETE CASCADE
  )
`);

// ── Guests table ─────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS guests (
    id TEXT PRIMARY KEY,
    wedding_id TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    group_family TEXT DEFAULT 'general',
    invite_status TEXT DEFAULT 'pending',
    rsvp_status TEXT DEFAULT 'pending',
    rsvp_guests INTEGER DEFAULT 1,
    rsvp_message TEXT DEFAULT '',
    whatsapp_sent_at TEXT DEFAULT '',
    whatsapp_status TEXT DEFAULT 'pending',
    qr_code TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (wedding_id) REFERENCES weddings(id) ON DELETE CASCADE
  )
`);

// ── Indexes ──────────────────────────────────────────────────────────────────
db.exec(`
  
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone TEXT DEFAULT '',
    role TEXT DEFAULT 'user' CHECK(role IN ('user', 'admin', 'superadmin')),
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );
CREATE INDEX IF NOT EXISTS idx_rsvps_wedding_id ON rsvps(wedding_id);
  CREATE INDEX IF NOT EXISTS idx_guests_wedding_id ON guests(wedding_id);
  CREATE INDEX IF NOT EXISTS idx_weddings_slug ON weddings(slug);
  CREATE INDEX IF NOT EXISTS idx_templates_slug ON templates(slug);
  CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);
`);

// ── Migration: add missing columns ───────────────────────────────────────────
const addColumnIfNotExists = (table: string, column: string, type: string, defaultValue: string | null = null) => {
  try {
    const result = db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
    const exists = result.some((col) => col.name === column);
    if (!exists) {
      const defaultClause = defaultValue ? ` DEFAULT ${defaultValue}` : "";
      db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}${defaultClause}`);
    }
  } catch { /* ignore */ }
};

// Weddings: ensure all columns exist
const weddingCols: [string, string, string | null][] = [
  ["akad_time", "TEXT", null],
  ["resepsi_time", "TEXT", null],
  ["quote", "TEXT", null],
  ["quote_source", "TEXT", null],
  ["bride_parents", "TEXT", null],
  ["groom_parents", "TEXT", null],
  ["hero_image", "TEXT", null],
  ["bride_photo", "TEXT", null],
  ["groom_photo", "TEXT", null],
  ["gallery_1", "TEXT", null],
  ["gallery_2", "TEXT", null],
  ["gallery_3", "TEXT", null],
  ["gallery_4", "TEXT", null],
  ["gallery_5", "TEXT", null],
  ["gallery_6", "TEXT", null],
  ["music_url", "TEXT", null],
  ["font_family", "TEXT", "'serif'"],
  ["primary_color", "TEXT", "'#1a1a1a'"],
  ["secondary_color", "TEXT", "'#f5f5f5'"],
  ["accent_color", "TEXT", "'#d4d4d4'"],
  ["gmaps_url", "TEXT", null],
  ["gmaps_embed", "TEXT", null],
  ["template_id", "TEXT", "''"],
  ["user_id", "TEXT", "''"],
];
weddingCols.forEach(([col, type, def]) => addColumnIfNotExists("weddings", col, type, def));

// Guests: ensure all columns exist
const guestCols: [string, string, string | null][] = [
  ["group_family", "TEXT", "'general'"],
  ["invite_status", "TEXT", "'pending'"],
  ["rsvp_status", "TEXT", "'pending'"],
  ["rsvp_guests", "INTEGER", "1"],
  ["rsvp_message", "TEXT", "''"],
  ["whatsapp_sent_at", "TEXT", "''"],
  ["whatsapp_status", "TEXT", "'pending'"],
  ["qr_code", "TEXT", "''"],
  ["updated_at", "TEXT", null],
];
guestCols.forEach(([col, type, def]) => addColumnIfNotExists("guests", col, type, def));

// ── Seed templates ───────────────────────────────────────────────────────────
const templateCount = db.prepare("SELECT COUNT(*) as cnt FROM templates").get() as { cnt: number };
if (templateCount.cnt === 0) {
  const insert = db.prepare(`
    INSERT INTO templates (id, name, slug, description, category, primary_color, secondary_color, accent_color, font_family, font_body, is_premium)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const templates: string[][] = [
    // ═══ Suku Indonesia ═══
    ["tmpl_melayu", "Melayu", "melayu", "Megah dengan emas dan hijau, ornamen Melayu", "indonesia", "#C9A96E", "#1A3A2A", "#F5F0DC", "Playfair Display", "Lato", "0"],
    ["tmpl_jawa", "Jawa", "jawa", "Elegan coklat emas, motif parang keraton", "indonesia", "#5C3D2E", "#1A1A1A", "#F5E6D3", "Cormorant Garamond", "Lato", "0"],
    ["tmpl_sunda", "Sunda", "sunda", "Lembut biru langit, kesan alam Priangan", "indonesia", "#5B8FA8", "#2C4A5E", "#F0F5FA", "DM Serif Display", "DM Sans", "0"],
    ["tmpl_batak", "Batak", "batak", "Berani merah hitam emas, motif gorga", "indonesia", "#C23B22", "#1A1A1A", "#FFF5F0", "Playfair Display", "Lato", "1"],
    ["tmpl_minang", "Minangkabau", "minang", "Megah merah emas, terinspirasi rumah gadang", "indonesia", "#8B2500", "#2D1000", "#FFF0DC", "Libre Baskerville", "Open Sans", "0"],
    ["tmpl_bali", "Bali", "bali", "Sakral emas putih, ornamen ceplok pura", "indonesia", "#B8943E", "#2D2510", "#FFFBF0", "Playfair Display", "Source Sans Pro", "0"],
    ["tmpl_dayak", "Dayak", "dayak", "Buas kuning merah hitam, motif burung Enggang", "indonesia", "#DAA520", "#1A0A00", "#FFF8E1", "Playfair Display", "Lato", "1"],
    ["tmpl_bugis", "Bugis-Makassar", "bugis", "Anggun merah emas, terinspirasi phinisi", "indonesia", "#8B1A1A", "#2D0505", "#FFF0E8", "Playfair Display", "Lato", "1"],
    ["tmpl_aceh", "Aceh", "aceh", "Islami emas hijau, ornamen krawang meukutop", "indonesia", "#2E7D32", "#1B0A00", "#FFF5E0", "Amiri", "Lato", "1"],
    ["tmpl_papua", "Papua", "papua", "Alam coklat merah kuning, motif asmat tribal", "indonesia", "#8B4513", "#1A0A00", "#FFF0D4", "Playfair Display", "Lato", "1"],
    // ═══ Universal ═══
    ["tmpl_minimalist", "Minimalist", "minimalist", "Bersih dan sederhana, dominasi putih", "modern", "#757575", "#1A1A1A", "#FAFAFA", "Inter", "Inter", "0"],
    ["tmpl_modern_black", "Modern Black", "modern-black", "Glamor hitam emas", "modern", "#333333", "#000000", "#F8F8F8", "Montserrat", "Inter", "0"],
    ["tmpl_romantic", "Romantic Blush", "romantic", "Romantis pink lembut dan rose gold", "romantic", "#D4A0A0", "#3D2A2A", "#FDF5F5", "Great Vibes", "Lato", "0"],
    ["tmpl_sunset", "Sunset Warm", "sunset", "Hangat gradasi sunset oranye merah", "nature", "#E07B39", "#4A2C17", "#FFF8F0", "Libre Baskerville", "Open Sans", "0"],
  ];
  const insertMany = db.transaction((items: string[][]) => {
    for (const t of items) insert.run(...t);
  });
  insertMany(templates);
  console.log(`✅ ${templates.length} default templates seeded`);
}

export default db;
