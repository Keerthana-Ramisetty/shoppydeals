import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/shoppydeals",
  jwtSecret: process.env.JWT_SECRET || "dev-secret-change-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  adminEmail: process.env.ADMIN_EMAIL || "admin@shoppydeals.com",
  adminPassword: process.env.ADMIN_PASSWORD || "ChangeMe123!",
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  uploadMaxMb: Number(process.env.UPLOAD_MAX_MB) || 5,
};
