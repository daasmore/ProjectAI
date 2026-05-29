import { Router, Request, Response } from "express";
import db from "../lib/database";

const router = Router();

// FORBIDDEN_KEYS that cannot be updated via config
const FORBIDDEN_KEYS = ["id", "slug", "created_at", "updated_at"];

// Allowed columns in weddings table
const ALLOWED_COLUMNS = [
  "bride_name",
  "groom_name",
  "wedding_date",
  "venue",
  "venue_address",
  "theme",
  "photo_url",
  "description",
  "akad_time",
  "resepsi_time",
  "quote",
  "quote_source",
  "bride_parents",
  "groom_parents",
  "hero_image",
  "bride_photo",
  "groom_photo",
  "gallery_1",
  "gallery_2",
  "gallery_3",
  "gallery_4",
  "gallery_5",
  "gallery_6",
  "music_url",
  "font_family",
  "primary_color",
  "secondary_color",
  "accent_color",
];

// PUT /api/v1/weddings/:id/config — Save wedding config
router.put("/:id/config", (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  // Check wedding exists
  const existing = db
    .prepare("SELECT id FROM weddings WHERE id = ?")
    .get(id);

  if (!existing) {
    res.status(404).json({ error: "Wedding not found" });
    return;
  }

  // Filter allowed columns
  const validUpdates: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(updates)) {
    if (ALLOWED_COLUMNS.includes(key) && !FORBIDDEN_KEYS.includes(key) && value !== undefined) {
      validUpdates[key] = value;
    }
  }

  if (Object.keys(validUpdates).length === 0) {
    res.status(400).json({ error: "No valid fields to update" });
    return;
  }

  // Build dynamic UPDATE query
  const setClauses = Object.keys(validUpdates).map((key) => `${key} = ?`);
  const values = Object.values(validUpdates);

  db.prepare(
    `UPDATE weddings SET ${setClauses.join(", ")} WHERE id = ?`
  ).run(...values, id);

  // Return updated wedding
  const wedding = db.prepare("SELECT * FROM weddings WHERE id = ?").get(id);

  res.json({ success: true, wedding });
});

// GET /api/v1/weddings/:id/config — Get full config for admin
router.get("/:id/config", (req: Request, res: Response) => {
  const { id } = req.params;

  const wedding = db
    .prepare("SELECT * FROM weddings WHERE id = ?")
    .get(id) as Record<string, unknown> | undefined;

  if (!wedding) {
    res.status(404).json({ error: "Wedding not found" });
    return;
  }

  res.json(wedding);
});

export default router;
