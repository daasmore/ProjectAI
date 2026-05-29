import { Router, Request, Response } from "express";
import db from "../lib/database";

const router = Router();

// Columns that exist in the weddings table
const ALLOWED_COLUMNS = [
  "bride_name", "groom_name", "wedding_date", "venue", "venue_address",
  "theme", "photo_url", "description",
  "akad_time", "resepsi_time", "quote", "quote_source",
  "bride_parents", "groom_parents",
  "hero_image", "bride_photo", "groom_photo",
  "gallery_1", "gallery_2", "gallery_3", "gallery_4", "gallery_5", "gallery_6",
  "music_url", "font_family", "primary_color", "secondary_color", "accent_color",
  "gmaps_url", "gmaps_embed",
  "template_id",
];

// PUT /api/v1/weddings/:id/config — Save wedding config
router.put("/:id/config", (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  const existing = db.prepare("SELECT id FROM weddings WHERE id = ?").get(id);
  if (!existing) {
    res.status(404).json({ error: "Wedding not found" });
    return;
  }

  const validUpdates: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(updates)) {
    if (ALLOWED_COLUMNS.includes(key) && value !== undefined) {
      validUpdates[key] = value;
    }
  }

  if (Object.keys(validUpdates).length === 0) {
    res.status(400).json({ error: "No valid fields to update" });
    return;
  }

  const setClauses = Object.keys(validUpdates).map((key) => `${key} = ?`);
  const values = Object.values(validUpdates);

  db.prepare(`UPDATE weddings SET ${setClauses.join(", ")} WHERE id = ?`).run(...values, id);

  const wedding = db.prepare("SELECT * FROM weddings WHERE id = ?").get(id);
  res.json({ success: true, wedding });
});

// GET /api/v1/weddings/:id/config — Get full config for admin
router.get("/:id/config", (req: Request, res: Response) => {
  const { id } = req.params;
  const wedding = db.prepare("SELECT * FROM weddings WHERE id = ?").get(id) as Record<string, unknown> | undefined;

  if (!wedding) {
    // Return default config
    res.json({
      bride_name: "Sarah Putri",
      groom_name: "Ahmad Rizky",
      wedding_date: "2026-08-15",
      venue: "Gedung Serbaguna Melati Ballroom",
      venue_address: "Jl. Bougenville No. 12, Kebayoran Baru, Jakarta Selatan",
      theme: "minimalist",
      photo_url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      description: "Dengan penuh sukacita, kami mengundang Bapak/Ibu/Sahabat.",
      akad_time: "08:00 WIB",
      resepsi_time: "11:00 - 14:00 WIB",
      quote: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri.",
      quote_source: "QS. Ar-Rum: 21",
      bride_parents: "Bapak ... & Ibu ...",
      groom_parents: "Bapak ... & Ibu ...",
      hero_image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
      bride_photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      groom_photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      gallery_1: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80",
      gallery_2: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
      gallery_3: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
      gallery_4: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80",
      gallery_5: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
      gallery_6: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80",
      font_family: "serif",
      primary_color: "#1a1a1a",
      secondary_color: "#f5f5f5",
      accent_color: "#d4d4d4",
      gmaps_url: "https://maps.google.com/?q=Jakarta",
      gmaps_embed: "",
    });
    return;
  }

  res.json(wedding);
});

export default router;
