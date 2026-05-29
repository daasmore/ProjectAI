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
    ["tmpl_classic_gold", "Classic Gold", "classic-gold", "Elegan dengan tone emas klasik", "classic", "#C9A96E", "#1A1A1A", "#F5F0E8", "Playfair Display", "Lato", "0"],
    ["tmpl_garden_green", "Garden Fresh", "garden-fresh", "Segar dengan nuansa hijau taman", "nature", "#7D9B76", "#2C3E2D", "#F0F4EF", "Cormorant Garamond", "Lato", "0"],
    ["tmpl_modern_black", "Modern Black", "modern-black", "Minimalis dengan dominasi hitam", "modern", "#333333", "#000000", "#F8F8F8", "Montserrat", "Inter", "0"],
    ["tmpl_ocean_blue", "Ocean Blue", "ocean-blue", "Tenang dengan biru laut", "nature", "#4A90D9", "#1A3A5C", "#F0F6FC", "Playfair Display", "Source Sans Pro", "0"],
    ["tmpl_romantic_pink", "Romantic Blush", "romantic-blush", "Romantis dengan pink lembut", "romantic", "#D4A0A0", "#5C3D3D", "#FDF5F5", "Great Vibes", "Lato", "0"],
    ["tmpl_sunset_orange", "Sunset Warm", "sunset-warm", "Hangat dengan gradasi sunset", "nature", "#E07B39", "#4A2C17", "#FFF8F0", "Libre Baskerville", "Open Sans", "0"],
    ["tmpl_royal_purple", "Royal Purple", "royal-purple", "Mewah dengan ungu kerajaan", "classic", "#7B5EA7", "#2D1F40", "#F5F0FA", "Playfair Display", "Lato", "1"],
    ["tmpl_minimalist_white", "Minimalist White", "minimalist-white", "Sederhana dengan dominasi putih", "modern", "#A8A8A8", "#2A2A2A", "#FFFFFF", "Inter", "Inter", "0"],
    ["tmpl_champagne", "Champagne", "champagne", "Elegan dengan champagne gold", "classic", "#B8943E", "#2A2218", "#FBF8F0", "Cormorant Garamond", "Lato", "0"],
    ["tmpl_mint_fresh", "Mint Fresh", "mint-fresh", "Fresh dengan mint dan putih", "nature", "#88B5A0", "#2D4A3E", "#F4FAF7", "DM Serif Display", "DM Sans", "0"],
    ["tmpl_terracotta", "Terracotta", "terracotta", "Warm dengan warna tanah liat", "rustic", "#C47A5A", "#4A2E1F", "#FBF5F0", "Playfair Display", "Source Sans Pro", "1"],
    ["tmpl_lavender", "Lavender Dream", "lavender-dream", "Dreamy dengan lavender", "romantic", "#9B8EC4", "#3D3558", "#F7F5FC", "Libre Baskerville", "Lato", "1"],
  ];
  const insertMany = db.transaction((items: string[][]) => {
    for (const t of items) insert.run(...t);
  });
  insertMany(templates);
  console.log(`✅ ${templates.length} default templates seeded`);
}

export default db;
