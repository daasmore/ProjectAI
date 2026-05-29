import { Router, Request, Response } from "express";
import crypto from "crypto";
import db from "../lib/database";

const router = Router();

// Simple hash function (in production, use bcrypt)
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "wedding-salt-2026").digest("hex");
}

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// POST /api/v1/auth/register
router.post("/register", (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: "Name, email, and password are required" });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: "Password must be at least 6 characters" });
      return;
    }

    // Check if email exists
    const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
    if (existing) {
      res.status(409).json({ error: "Email already registered" });
      return;
    }

    const userId = crypto.randomUUID();
    const passwordHash = hashPassword(password);

    db.prepare(
      "INSERT INTO users (id, name, email, password_hash, phone) VALUES (?, ?, ?, ?, ?)"
    ).run(userId, name, email, passwordHash, phone || "");

    const token = generateToken();

    res.json({
      success: true,
      message: "Registration successful",
      user: { id: userId, name, email, phone: phone || "" },
      token,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// POST /api/v1/auth/login
router.post("/login", (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const user = db.prepare("SELECT * FROM users WHERE email = ? AND is_active = 1").get(email) as
      | { id: string; name: string; email: string; phone: string; password_hash: string; role: string }
      | undefined;

    if (!user || user.password_hash !== hashPassword(password)) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = generateToken();

    res.json({
      success: true,
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// GET /api/v1/auth/me — Get current user info
router.get("/me", (req: Request, res: Response) => {
  try {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const user = db.prepare("SELECT id, name, email, phone, role, created_at FROM users WHERE id = ? AND is_active = 1").get(userId);
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: "Failed to get user info" });
  }
});

export default router;
