import { Router, Request, Response } from "express";
import db from "../lib/database";
import { generateId } from "../lib/utils";

const router = Router();

// POST /api/v1/guests — Input tamu manual dari dashboard
router.post("/", (req: Request, res: Response) => {
  const { wedding_id, name, email, phone, status } = req.body;

  // Validation
  if (!wedding_id || !name) {
    res.status(400).json({ error: "wedding_id and name are required" });
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

  const validStatuses = ["pending", "confirmed", "declined"];
  const guestStatus = validStatuses.includes(status) ? status : "pending";

  const id = generateId();
  db.prepare(
    `INSERT INTO guests (id, wedding_id, name, email, phone, status)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(id, wedding_id, name, email || null, phone || null, guestStatus);

  const guest = db.prepare("SELECT * FROM guests WHERE id = ?").get(id);

  res.status(201).json(guest);
});

// GET /api/v1/guests/:slug — List guests by wedding slug
router.get("/list/:slug", (req: Request, res: Response) => {
  const { slug } = req.params;

  const wedding = db
    .prepare("SELECT id FROM weddings WHERE slug = ?")
    .get(slug) as { id: string } | undefined;

  if (!wedding) {
    res.status(404).json({ error: "Wedding not found" });
    return;
  }

  const guests = db
    .prepare(
      `SELECT id, wedding_id, name, email, phone, status, created_at
       FROM guests WHERE wedding_id = ? ORDER BY created_at DESC`
    )
    .all(wedding.id);

  res.json(guests);
});

export default router;
