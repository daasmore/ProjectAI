import { Router, Request, Response } from "express";
import db from "../lib/database";

const router = Router();

// Columns that exist in the weddings table
const ALLOWED_COLUMNS = [
  "bride_name", "groom_name", "wedding_date", "venue", "venue_address",
  "theme", "photo_url", "description",
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
    // Return default config even if no DB record
    res.json({
      bride_name: "Sarah Putri",
      groom_name: "Ahmad Rizky",
      wedding_date: "2026-08-15",
      venue: "Gedung Serbaguna Melati Ballroom",
      venue_address: "Jl. Bougenville No. 12, Kebayoran Baru, Jakarta Selatan",
      theme: "minimalist",
      photo_url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      description: "Dengan penuh sukacita, kami mengundang Bapak/Ibu/Sahabat.",
    });
    return;
  }

  res.json(wedding);
});

export default router;
