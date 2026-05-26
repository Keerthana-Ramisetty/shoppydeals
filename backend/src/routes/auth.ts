import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin";
import { env } from "../config/env";
import { authMiddleware, type AuthRequest } from "../middleware/auth";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) {
    res.status(400).json({ message: "Email and password required" });
    return;
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign(
    { adminId: admin._id.toString(), email: admin.email },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn } as jwt.SignOptions
  );

  res.json({
    token,
    admin: { id: admin._id, email: admin.email, name: admin.name },
  });
});

router.get("/me", authMiddleware, async (req: AuthRequest, res) => {
  const admin = await Admin.findById(req.admin!.adminId).select("-password");
  if (!admin) {
    res.status(404).json({ message: "Admin not found" });
    return;
  }
  res.json({ admin: { id: admin._id, email: admin.email, name: admin.name } });
});

export default router;
