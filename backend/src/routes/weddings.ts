import { Router, Request, Response } from "express";
import db from "../lib/database";

const router = Router();

// GET /api/v1/weddings/:slug — Return data wedding
router.get("/:slug", (req: Request, res: Response) => {
  const { slug } = req.params;

  const wedding = db
    .prepare(
      `SELECT id, slug, bride_name, groom_name, wedding_date, venue, venue_address, theme, photo_url, description, created_at
       FROM weddings WHERE slug = ?`
    )
    .get(slug) as Record<string, unknown> | undefined;

  if (!wedding) {
    res.status(404).json({ error: "Wedding not found" });
    return;
  }

  res.json({
    id: wedding.id,
    slug: wedding.slug,
    bride_name: wedding.bride_name,
    groom_name: wedding.groom_name,
    wedding_date: wedding.wedding_date,
    venue: wedding.venue,
    venue_address: wedding.venue_address,
    theme: wedding.theme,
    photo_url: wedding.photo_url,
    description: wedding.description,
    created_at: wedding.created_at,
  });
});

export default router;
