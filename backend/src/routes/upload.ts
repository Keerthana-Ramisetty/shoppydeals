import { Router } from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

// multer memory storage (correct for cloudinary stream)
const upload = multer({
  storage: multer.memoryStorage(),
});

// upload route
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      const file = req.file;

      // Cloudinary upload stream
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

      return res.json({
        url: result.secure_url,
        public_id: result.public_id,
      });

    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return res.status(500).json({
        message: "Upload failed",
      });
    }
  }
);

export default router;
