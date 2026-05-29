import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";

const router = Router();

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// POST /api/v1/upload — Save image URL (for now) or handle base64 upload
// Body: { "url": "https://..." } or { "base64": "data:image/...", "filename": "photo.jpg" }
router.post("/", (req: Request, res: Response) => {
  const { url, base64, filename } = req.body as {
    url?: string;
    base64?: string;
    filename?: string;
  };

  // If URL provided, just return it
  if (url) {
    res.json({ success: true, url });
    return;
  }

  // If base64 provided, decode and save
  if (base64 && filename) {
    try {
      const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
      const timestamp = Date.now();
      const finalName = `${timestamp}_${safeName}`;
      const filePath = path.join(uploadDir, finalName);

      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/${finalName}`;
      res.json({ success: true, url: publicUrl });
    } catch {
      res.status(400).json({ error: "Failed to save image" });
    }
    return;
  }

  res.status(400).json({ error: "Provide url or base64+filename" });
});

export default router;
