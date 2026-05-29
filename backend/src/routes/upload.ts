import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";

const router = Router();

const uploadsDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// POST /api/v1/upload — Accept URL or base64 image data
router.post("/", (req: Request, res: Response) => {
  try {
    const { url, base64, image, filename } = req.body as {
      url?: string;
      base64?: string;
      image?: string;
      filename?: string;
    };

    // If URL provided, just return it
    if (url) {
      res.json({ success: true, url });
      return;
    }

    // Accept both "base64" and "image" field names
    const imageData = base64 || image;
    if (!imageData) {
      res.status(400).json({ error: "Provide url, base64, or image" });
      return;
    }

    // Extract base64 data
    let base64Data: string;
    let ext = "png";

    if (imageData.includes(",")) {
      const parts = imageData.split(",");
      const header = parts[0];
      base64Data = parts[1];
      if (header.includes("jpeg") || header.includes("jpg")) ext = "jpg";
      else if (header.includes("webp")) ext = "webp";
      else if (header.includes("png")) ext = "png";
    } else {
      base64Data = imageData;
    }

    const safeName = filename
      ? filename.replace(/[^a-zA-Z0-9._-]/g, "_").substring(0, 50)
      : `upload_${Date.now()}`;
    const outName = `${safeName}_${Date.now()}.${ext}`;
    const outPath = path.join(uploadsDir, outName);

    const buffer = Buffer.from(base64Data, "base64");
    fs.writeFileSync(outPath, buffer);

    const publicUrl = `/uploads/${outName}`;
    res.json({ success: true, url: publicUrl, filename: outName, size: buffer.length });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
