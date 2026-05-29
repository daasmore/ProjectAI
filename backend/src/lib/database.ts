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
    theme TEXT,
    photo_url TEXT,
    description TEXT,
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

export default db;
