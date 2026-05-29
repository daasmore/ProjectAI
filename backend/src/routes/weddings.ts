import { Router, Request, Response } from "express";
import crypto from "crypto";
import db from "../lib/database";

const router = Router();

// GET /api/v1/weddings — List all weddings
router.get("/", (_req: Request, res: Response) => {
  try {
    const weddings = db.prepare(
      "SELECT id, slug, bride_name, groom_name, wedding_date, venue, template_id, user_id, created_at FROM weddings ORDER BY created_at DESC"
    ).all();
    res.json({ success: true, weddings });
  } catch (err) {
    console.error("List weddings error:", err);
    res.status(500).json({ error: "Failed to list weddings" });
  }
});

// POST /api/v1/weddings — Create new wedding
router.post("/", (req: Request, res: Response) => {
  try {
    const { bride_name, groom_name, wedding_date, venue, slug, template_id } = req.body;

    if (!bride_name || !groom_name || !wedding_date || !venue) {
      res.status(400).json({ error: "bride_name, groom_name, wedding_date, venue are required" });
      return;
    }

    const id = crypto.randomUUID();
    const weddingSlug = slug || `${groom_name.toLowerCase().replace(/\s+/g, "-")}-${bride_name.toLowerCase().replace(/\s+/g, "-")}-${Date.now().toString(36)}`;

    db.prepare(
      `INSERT INTO weddings (id, slug, bride_name, groom_name, wedding_date, venue, template_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).run(id, weddingSlug, bride_name, groom_name, wedding_date, venue, template_id || "");

    const wedding = db.prepare("SELECT * FROM weddings WHERE id = ?").get(id);
    res.json({ success: true, wedding, message: "Wedding created" });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    if (msg.includes("UNIQUE")) {
      res.status(409).json({ error: "Slug already exists" });
    } else {
      console.error("Create wedding error:", err);
      res.status(500).json({ error: "Failed to create wedding" });
    }
  }
});

// GET /api/v1/weddings/:id — Get wedding by ID
router.get("/:id", (req: Request, res: Response) => {
  try {
    const wedding = db.prepare("SELECT * FROM weddings WHERE id = ?").get(req.params.id);
    if (!wedding) {
      res.status(404).json({ error: "Wedding not found" });
      return;
    }
    res.json(wedding);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wedding" });
  }
});

// GET /api/v1/weddings/slug/:slug — Get wedding by slug (public)
router.get("/slug/:slug", (req: Request, res: Response) => {
  try {
    const wedding = db.prepare("SELECT * FROM weddings WHERE slug = ?").get(req.params.slug);
    if (!wedding) {
      res.status(404).json({ error: "Wedding not found" });
      return;
    }
    res.json(wedding);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wedding" });
  }
});

// PUT /api/v1/weddings/:id — Update wedding
router.put("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const wedding = db.prepare("SELECT * FROM weddings WHERE id = ?").get(id);
    if (!wedding) {
      res.status(404).json({ error: "Wedding not found" });
      return;
    }

    const updates: string[] = [];
    const values: unknown[] = [];
    const allowed = ["bride_name", "groom_name", "wedding_date", "venue", "venue_address", "slug", "template_id", "primary_color", "secondary_color", "accent_color", "font_family", "quote", "quote_source", "hero_image", "bride_photo", "groom_photo", "gallery_1", "gallery_2", "gallery_3", "gallery_4", "gallery_5", "gallery_6", "music_url"];

    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        updates.push(`${key} = ?`);
        values.push(req.body[key]);
      }
    }

    if (updates.length > 0) {
      values.push(id);
      db.prepare(`UPDATE weddings SET ${updates.join(", ")} WHERE id = ?`).run(...values);
    }

    const updated = db.prepare("SELECT * FROM weddings WHERE id = ?").get(id);
    res.json({ success: true, wedding: updated });
  } catch (err) {
    console.error("Update wedding error:", err);
    res.status(500).json({ error: "Failed to update wedding" });
  }
});

// DELETE /api/v1/weddings/:id — Delete wedding
router.delete("/:id", (req: Request, res: Response) => {
  try {
    const wedding = db.prepare("SELECT id FROM weddings WHERE id = ?").get(req.params.id);
    if (!wedding) {
      res.status(404).json({ error: "Wedding not found" });
      return;
    }
    db.prepare("DELETE FROM weddings WHERE id = ?").run(req.params.id);
    res.json({ success: true, message: "Wedding deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete wedding" });
  }
});

export default router;
