import { Router, Request, Response } from "express";
import db from "../lib/database";

const router = Router();

// GET /api/v1/dashboard/:slug — Return statistik RSVP
router.get("/:slug", (req: Request, res: Response) => {
  const { slug } = req.params;

  const wedding = db
    .prepare("SELECT id, slug, bride_name, groom_name FROM weddings WHERE slug = ?")
    .get(slug) as { id: string; slug: string; bride_name: string; groom_name: string } | undefined;

  if (!wedding) {
    res.status(404).json({ error: "Wedding not found" });
    return;
  }

  const stats = db
    .prepare(
      `SELECT
         COUNT(*) as total,
         SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed,
         SUM(CASE WHEN status = 'declined' THEN 1 ELSE 0 END) as declined,
         SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
         SUM(CASE WHEN status = 'confirmed' THEN guest_count ELSE 0 END) as total_guests_confirmed
       FROM rsvps
       WHERE wedding_id = ?`
    )
    .get(wedding.id) as {
    total: number;
    confirmed: number;
    declined: number;
    pending: number;
    total_guests_confirmed: number;
  };

  const guestStats = db
    .prepare(
      `SELECT
         COUNT(*) as total_manual_guests,
         SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed_guests,
         SUM(CASE WHEN status = 'declined' THEN 1 ELSE 0 END) as declined_guests,
         SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_guests
       FROM guests
       WHERE wedding_id = ?`
    )
    .get(wedding.id) as {
    total_manual_guests: number;
    confirmed_guests: number;
    declined_guests: number;
    pending_guests: number;
  };

  res.json({
    wedding: {
      id: wedding.id,
      slug: wedding.slug,
      bride_name: wedding.bride_name,
      groom_name: wedding.groom_name,
    },
    rsvp_stats: {
      total: stats.total,
      confirmed: stats.confirmed,
      declined: stats.declined,
      pending: stats.pending,
      total_guests_confirmed: stats.total_guests_confirmed,
    },
    guest_stats: {
      total: guestStats.total_manual_guests,
      confirmed: guestStats.confirmed_guests || 0,
      declined: guestStats.declined_guests || 0,
      pending: guestStats.pending_guests || 0,
    },
  });
});

export default router;
