import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";

const router = Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// POST /api/v1/upload — Accept base64 image data and save to disk
router.post("/", (req: Request, res: Response) => {
  try {
    const { image, filename } = req.body;

    if (!image) {
      res.status(400).json({ error: "No image data provided" });
      return;
    }

    // Extract base64 data
    let base64Data: string;
    let ext = "png";

    if (image.includes(",")) {
      const parts = image.split(",");
      const header = parts[0];
      base64Data = parts[1];

      if (header.includes("jpeg") || header.includes("jpg")) ext = "jpg";
      else if (header.includes("webp")) ext = "webp";
      else if (header.includes("png")) ext = "png";
    } else {
      base64Data = image;
    }

    // Generate filename
    const safeName = filename
      ? filename.replace(/[^a-zA-Z0-9_-]/g, "_").substring(0, 50)
      : `upload_${Date.now()}`;
    const outName = `${safeName}_${Date.now()}.${ext}`;
    const outPath = path.join(uploadsDir, outName);

    // Write file
    const buffer = Buffer.from(base64Data, "base64");
    fs.writeFileSync(outPath, buffer);

    const url = `/uploads/${outName}`;
    res.json({ url, filename: outName, size: buffer.length });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// Serve uploads statically
router.use("/files", (req, res, next) => {
  const filePath = path.join(uploadsDir, req.path);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    next();
  }
});

export default router;
