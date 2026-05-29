import { Router, Request, Response } from "express";
import db from "../lib/database";
import { generateId } from "../lib/utils";

const router = Router();

// POST /api/v1/rsvp — Terima RSVP dari tamu
router.post("/", (req: Request, res: Response) => {
  const { wedding_id, guest_name, email, guest_count, status, message } = req.body;

  // Validation
  if (!wedding_id || !guest_name) {
    res.status(400).json({ error: "wedding_id and guest_name are required" });
    return;
  }

  // Verify wedding exists
  const wedding = db
    .prepare("SELECT id FROM weddings WHERE id = ?")
    .get(wedding_id);
  if (!wedding) {
    res.status(404).json({ error: "Wedding not found" });
    return;
  }

  const validStatuses = ["confirmed", "declined", "pending"];
  const rsvpStatus = validStatuses.includes(status) ? status : "pending";
  const count = Number.isInteger(guest_count) && guest_count > 0 ? guest_count : 1;

  const id = generateId();
  db.prepare(
    `INSERT INTO rsvps (id, wedding_id, guest_name, email, guest_count, status, message)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(id, wedding_id, guest_name, email || null, count, rsvpStatus, message || null);

  const rsvp = db.prepare("SELECT * FROM rsvps WHERE id = ?").get(id);

  res.status(201).json(rsvp);
});

// GET /api/v1/rsvp/:slug — Return daftar semua RSVP untuk wedding tertentu
router.get("/:slug", (req: Request, res: Response) => {
  const { slug } = req.params;

  const wedding = db
    .prepare("SELECT id FROM weddings WHERE slug = ?")
    .get(slug) as { id: string } | undefined;

  if (!wedding) {
    res.status(404).json({ error: "Wedding not found" });
    return;
  }

  const rsvps = db
    .prepare(
      `SELECT id, wedding_id, guest_name, email, guest_count, status, message, created_at
       FROM rsvps WHERE wedding_id = ? ORDER BY created_at DESC`
    )
    .all(wedding.id);

  res.json(rsvps);
});

// DELETE /api/v1/rsvp/:id — Hapus RSVP
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const existing = db.prepare("SELECT id FROM rsvps WHERE id = ?").get(id);
  if (!existing) {
    res.status(404).json({ error: "RSVP not found" });
    return;
  }

  db.prepare("DELETE FROM rsvps WHERE id = ?").run(id);
  res.json({ message: "RSVP deleted successfully" });
});

export default router;
