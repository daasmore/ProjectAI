import express from "express";
import cors from "cors";
import path from "path";
import weddingRoutes from "./routes/weddings";
import rsvpRoutes from "./routes/rsvp";
import dashboardRoutes from "./routes/dashboard";
import guestRoutes from "./routes/guests";
import uploadRoutes from "./routes/upload";
import configRoutes from "./routes/config";

const app = express();
const PORT = Number(process.env.PORT) || 4001;

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

// ─── Healthcheck ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "wedding-backend" });
});

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/v1/weddings", configRoutes);
app.use("/api/v1/weddings", weddingRoutes);
app.use("/api/v1/rsvp", rsvpRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/guests", guestRoutes);
app.use("/api/v1/upload", uploadRoutes);

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ─── 404 ─────────────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ─── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Wedding backend running on http://localhost:${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/health`);
  console.log(`📍 API Base: http://localhost:${PORT}/api/v1`);
});

export default app;
