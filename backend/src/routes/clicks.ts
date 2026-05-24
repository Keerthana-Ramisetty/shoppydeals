import { Router } from "express";
import { Product } from "../models/Product.js";
import { ClickAnalytics } from "../models/ClickAnalytics.js";

const router = Router();

router.post("/:productId", async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  product.clicks += 1;
  await product.save();

  await ClickAnalytics.create({
    product: product._id,
    productTitle: product.title,
    store: product.store,
    category: product.category,
    userAgent: req.headers["user-agent"],
    referer: req.headers.referer,
  });

  res.json({
    url: product.affiliateLink,
    clicks: product.clicks,
  });
});

export default router;
