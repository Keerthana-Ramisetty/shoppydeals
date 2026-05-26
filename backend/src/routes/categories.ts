import { Router } from "express";
import { Category } from "../models/Category";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", async (_req, res) => {
  const categories = await Category.find().sort({ order: 1 }).lean();
  res.json({ categories });
});

router.post("/", authMiddleware, async (req, res) => {
  const { name, slug, icon, order } = req.body;
  if (!name || !slug) {
    res.status(400).json({ message: "Name and slug required" });
    return;
  }
  const category = await Category.create({ name, slug, icon, order });
  res.status(201).json({ category });
});

router.put("/:id", authMiddleware, async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!category) {
    res.status(404).json({ message: "Category not found" });
    return;
  }
  res.json({ category });
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    res.status(404).json({ message: "Category not found" });
    return;
  }
  res.json({ message: "Category deleted" });
});

export default router;
