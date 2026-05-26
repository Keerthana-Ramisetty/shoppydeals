import { Router } from "express";
import { ClickAnalytics } from "../models/ClickAnalytics";
import { Product } from "../models/Product";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(authMiddleware);

router.get("/dashboard", async (_req, res) => {
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - 7);

  const [
    totalProducts,
    totalClicks,
    clicksToday,
    clicksThisWeek,
    topProducts,
    recentClicks,
    clicksByStore,
  ] = await Promise.all([
    Product.countDocuments(),
    Product.aggregate([{ $group: { _id: null, total: { $sum: "$clicks" } } }]),
    ClickAnalytics.countDocuments({ createdAt: { $gte: startOfDay } }),
    ClickAnalytics.countDocuments({ createdAt: { $gte: startOfWeek } }),
    Product.find()
      .sort({ clicks: -1 })
      .limit(5)
      .select("title clicks store slug image dealPrice")
      .lean(),
    ClickAnalytics.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("product", "title slug")
      .lean(),
    ClickAnalytics.aggregate([
      { $group: { _id: "$store", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
    ]),
  ]);

  res.json({
    stats: {
      totalProducts,
      totalClicks: totalClicks[0]?.total ?? 0,
      clicksToday,
      clicksThisWeek,
    },
    topProducts,
    recentClicks,
    clicksByStore: clicksByStore.map((s) => ({
      store: s._id,
      count: s.count,
    })),
  });
});

export default router;
