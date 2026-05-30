import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/categories.js";
import productRoutes from "./routes/products.js";
import clickRoutes from "./routes/clicks.js";
import analyticsRoutes from "./routes/analytics.js";
import uploadRoutes from "./routes/upload.js";

/* ---------------- ESM FIX (__dirname replacement) ---------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------------- MAIN APP ---------------- */
async function main() {
  await connectDb();

  const app = express();

  /* ---------------- CORS ---------------- */
  app.use(
    cors({
      origin: ["https://shoppydeals.vercel.app"],
      credentials: true,
    })
  );

  /* ---------------- JSON BODY ---------------- */
  app.use(express.json({ limit: "2mb" }));

  /* ---------------- STATIC FILES ---------------- */
  app.use(
  "/uploads",
   express.static(path.join(process.cwd(), "../uploads"))
   );

  /* ---------------- HEALTH CHECK ---------------- */
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", name: "Shoppy Deals API" });
  });

  /* ---------------- ROUTES ---------------- */
  app.use("/api/auth", authRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/clicks", clickRoutes);
  app.use("/api/analytics", analyticsRoutes);
  app.use("/api/upload", uploadRoutes);

  /* ---------------- ERROR HANDLER ---------------- */
  app.use(errorHandler);

  /* ---------------- PORT ---------------- */
  const PORT = process.env.PORT || env.port || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 API running on port ${PORT}`);
  });
}

/* ---------------- START SERVER ---------------- */
main().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
