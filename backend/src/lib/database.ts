import Database from "better-sqlite3";
import path from "path";

const dbPath = process.env.DB_PATH || path.join(__dirname, "../../data/wedding.db");

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Initialize tables
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
    created_at TEXT DEFAULT (datetime('now'))
  );

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
  );

  CREATE TABLE IF NOT EXISTS guests (
    id TEXT PRIMARY KEY,
    wedding_id TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending','confirmed','declined')),
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (wedding_id) REFERENCES weddings(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_rsvps_wedding_id ON rsvps(wedding_id);
  CREATE INDEX IF NOT EXISTS idx_guests_wedding_id ON guests(wedding_id);
  CREATE INDEX IF NOT EXISTS idx_weddings_slug ON weddings(slug);
`);

// Add missing columns if they don't exist (for existing databases)
const addColumnIfNotExists = (table: string, column: string, type: string, defaultValue: string | null = null) => {
  try {
    const result = db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
    const exists = result.some((col) => col.name === column);
    if (!exists) {
      const defaultClause = defaultValue ? ` DEFAULT ${defaultValue}` : "";
      db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}${defaultClause}`);
    }
  } catch {
    // Column already exists or other error, ignore
  }
};

// Add all missing columns
addColumnIfNotExists("weddings", "akad_time", "TEXT");
addColumnIfNotExists("weddings", "resepsi_time", "TEXT");
addColumnIfNotExists("weddings", "quote", "TEXT");
addColumnIfNotExists("weddings", "quote_source", "TEXT");
addColumnIfNotExists("weddings", "bride_parents", "TEXT");
addColumnIfNotExists("weddings", "groom_parents", "TEXT");
addColumnIfNotExists("weddings", "hero_image", "TEXT");
addColumnIfNotExists("weddings", "bride_photo", "TEXT");
addColumnIfNotExists("weddings", "groom_photo", "TEXT");
addColumnIfNotExists("weddings", "gallery_1", "TEXT");
addColumnIfNotExists("weddings", "gallery_2", "TEXT");
addColumnIfNotExists("weddings", "gallery_3", "TEXT");
addColumnIfNotExists("weddings", "gallery_4", "TEXT");
addColumnIfNotExists("weddings", "gallery_5", "TEXT");
addColumnIfNotExists("weddings", "gallery_6", "TEXT");
addColumnIfNotExists("weddings", "music_url", "TEXT");
addColumnIfNotExists("weddings", "font_family", "TEXT", "'serif'");
addColumnIfNotExists("weddings", "primary_color", "TEXT", "'#1a1a1a'");
addColumnIfNotExists("weddings", "secondary_color", "TEXT", "'#f5f5f5'");
addColumnIfNotExists("weddings", "accent_color", "TEXT", "'#d4d4d4'");
addColumnIfNotExists("weddings", "gmaps_url", "TEXT");
addColumnIfNotExists("weddings", "gmaps_embed", "TEXT");

export default db;
