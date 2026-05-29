import db from "../lib/database";

console.log("🔧 Running migration: add-wedding-columns");

// Add new columns to weddings table
const columns = [
  { name: "akad_time", type: "TEXT", default: null },
  { name: "resepsi_time", type: "TEXT", default: null },
  { name: "quote", type: "TEXT", default: null },
  { name: "quote_source", type: "TEXT", default: null },
  { name: "bride_parents", type: "TEXT", default: null },
  { name: "groom_parents", type: "TEXT", default: null },
  { name: "hero_image", type: "TEXT", default: null },
  { name: "bride_photo", type: "TEXT", default: null },
  { name: "groom_photo", type: "TEXT", default: null },
  { name: "gallery_1", type: "TEXT", default: null },
  { name: "gallery_2", type: "TEXT", default: null },
  { name: "gallery_3", type: "TEXT", default: null },
  { name: "gallery_4", type: "TEXT", default: null },
  { name: "gallery_5", type: "TEXT", default: null },
  { name: "gallery_6", type: "TEXT", default: null },
  { name: "music_url", type: "TEXT", default: null },
  { name: "font_family", type: "TEXT", default: "'serif'" },
  { name: "primary_color", type: "TEXT", default: "'#1a1a1a'" },
  { name: "secondary_color", type: "TEXT", default: "'#f5f5f5'" },
  { name: "accent_color", type: "TEXT", default: "'#d4d4d4'" },
  { name: "gmaps_url", type: "TEXT", default: null },
  { name: "gmaps_embed", type: "TEXT", default: null },
];

for (const col of columns) {
  try {
    const defaultClause = col.default ? ` DEFAULT ${col.default}` : "";
    db.exec(`ALTER TABLE weddings ADD COLUMN ${col.name} ${col.type}${defaultClause}`);
    console.log(`✅ Added column: ${col.name}`);
  } catch (err: any) {
    if (err.message.includes("duplicate column name")) {
      console.log(`⏭️  Column ${col.name} already exists, skipping`);
    } else {
      throw err;
    }
  }
}

console.log("✅ Migration complete!");
