import { Router, Request, Response } from "express";
import db from "../lib/database";

const router = Router();

// GET /api/v1/weddings/:slug — Return data wedding (public)
router.get("/:slug", (req: Request, res: Response) => {
  const { slug } = req.params;

  const wedding = db
    .prepare(
      `SELECT * FROM weddings WHERE slug = ?`
    )
    .get(slug) as Record<string, unknown> | undefined;

  if (!wedding) {
    res.status(404).json({ error: "Wedding not found" });
    return;
  }

  res.json(wedding);
});

export default router;
