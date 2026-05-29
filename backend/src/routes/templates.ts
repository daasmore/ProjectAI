import { Router, Request, Response } from "express";
import db from "../lib/database";

const router = Router();

// GET /api/v1/templates — list all active templates
router.get("/", (_req: Request, res: Response) => {
  try {
    const templates = db.prepare(
      "SELECT * FROM templates WHERE is_active = 1 ORDER BY category, name"
    ).all();
    res.json({ success: true, templates });
  } catch (err) {
    console.error("Templates list error:", err);
    res.status(500).json({ error: "Failed to fetch templates" });
  }
});

// GET /api/v1/templates/:id — get single template
router.get("/:id", (req: Request, res: Response) => {
  try {
    const template = db.prepare("SELECT * FROM templates WHERE id = ?").get(req.params.id);
    if (!template) {
      res.status(404).json({ error: "Template not found" });
      return;
    }
    res.json({ success: true, template });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch template" });
  }
});

// GET /api/v1/templates/slug/:slug — get template by slug
router.get("/slug/:slug", (req: Request, res: Response) => {
  try {
    const template = db.prepare("SELECT * FROM templates WHERE slug = ?").get(req.params.slug);
    if (!template) {
      res.status(404).json({ error: "Template not found" });
      return;
    }
    res.json({ success: true, template });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch template" });
  }
});

// PUT /api/v1/weddings/:id/template — set template for a wedding
router.put("/weddings/:id/template", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { template_id } = req.body;

    if (!template_id) {
      res.status(400).json({ error: "template_id required" });
      return;
    }

    // Verify template exists
    const tmpl = db.prepare("SELECT id, name FROM templates WHERE id = ?").get(template_id);
    if (!tmpl) {
      res.status(404).json({ error: "Template not found" });
      return;
    }

    // Verify wedding exists
    const wedding = db.prepare("SELECT id FROM weddings WHERE id = ?").get(id);
    if (!wedding) {
      res.status(404).json({ error: "Wedding not found" });
      return;
    }

    db.prepare("UPDATE weddings SET template_id = ? WHERE id = ?")
      .run(template_id, id);

    res.json({ success: true, message: `Template "${(tmpl as { name: name }).name}" applied` });
  } catch (err) {
    console.error("Template assign error:", err);
    res.status(500).json({ error: "Failed to assign template" });
  }
});

export default router;
