import { Router } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
     if (!req.file) {
  res.status(400).json({ message: "No image uploaded" });
  return;
}

const file = req.file;

const result = await new Promise<any>((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream(
    {
      folder: "shoppydeals",
    },
    (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }
  );

  stream.end(file.buffer);
});

      res.json({
        url: result.secure_url,
      });
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      res.status(500).json({
        message: "Upload failed",
      });
    }
  }
);

export default router;
