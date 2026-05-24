import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export interface AuthPayload {
  adminId: string;
  email: string;
}

export interface AuthRequest extends Request {
  admin?: AuthPayload;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, env.jwtSecret) as AuthPayload;
    req.admin = payload;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
