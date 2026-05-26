import express from "express";
import cors from "cors";
import path from "path";
import { connectDb } from "./config/db";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/auth";
import categoryRoutes from "./routes/categories";
import productRoutes from "./routes/products";
import clickRoutes from "./routes/clicks";
import analyticsRoutes from "./routes/analytics";
import uploadRoutes from "./routes/upload";
const __dirname = path.resolve();

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
  const PORT = process.env.PORT ||
   env.port || 5000;

  app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
  });

}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
