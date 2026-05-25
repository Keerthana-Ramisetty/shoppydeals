import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDb } from "./config/db";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/categories.js";
import productRoutes from "./routes/products.js";
import clickRoutes from "./routes/clicks.js";
import analyticsRoutes from "./routes/analytics.js";
import uploadRoutes from "./routes/upload.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  await connectDb();

  const app = express();

  app.use(
    cors({
      origin: [env.clientUrl,"http://localhost:3000", "http://localhost:3001"],
      credentials: true,
    })
  );
  app.use(express.json({ limit: "2mb" }));
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", name: "Shoppy Deals API" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/clicks", clickRoutes);
  app.use("/api/analytics", analyticsRoutes);
  app.use("/api/upload", uploadRoutes);

  app.use(errorHandler);
  const PORT = process.env.PORT || env.port || 5000;

  app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
  });

}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
