import bcrypt from "bcryptjs";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";
import { Admin } from "./models/Admin.js";
import { Category } from "./models/Category.js";
import { Product } from "./models/Product.js";

const DEFAULT_CATEGORIES = [
  { name: "Mobiles", slug: "mobiles", icon: "📱", order: 1 },
  { name: "Electronics", slug: "electronics", icon: "💻", order: 2 },
  { name: "Fashion", slug: "fashion", icon: "👕", order: 3 },
  { name: "Kitchen", slug: "kitchen", icon: "🍳", order: 4 },
  { name: "Beauty", slug: "beauty", icon: "💄", order: 5 },
  { name: "Gadgets", slug: "gadgets", icon: "⌚", order: 6 },
];

const SAMPLE_PRODUCTS = [
  {
    title: "Samsung Galaxy M15 5G",
    description: "6.5\" display, 50MP camera, 6000mAh battery — best budget 5G phone deal.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
    originalPrice: 15999,
    dealprice: 12499,
    store: "Amazon",
    featured: true,
    categorySlug: "mobiles",
    affiliateLink: "https://www.amazon.in/",
  },
  {
    title: "boAt Rockerz 450 Bluetooth Headphones",
    description: "Wireless on-ear headphones with up to 15 hours playback.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    originalPrice: 3990,
    dealPrice: 1499,
    store: "Flipkart",
    featured: true,
    categorySlug: "electronics",
    affiliateLink: "https://www.flipkart.com/",
  },
  {
    title: "Men's Casual Cotton T-Shirt Pack",
    description: "Premium cotton tees — limited time fashion offer.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
    originalPrice: 1999,
    dealPrice: 699,
    store: "Myntra",
    featured: false,
    categorySlug: "fashion",
    affiliateLink: "https://www.myntra.com/",
  },
  {
    title: "Non-Stick Cookware Set 5 Pieces",
    description: "Durable non-stick pots and pans for everyday cooking.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=600&fit=crop",
    originalPrice: 3499,
    dealPrice: 1899,
    store: "Meesho",
    featured: true,
    categorySlug: "kitchen",
    affiliateLink: "https://www.meesho.com/",
  },
  {
    title: "Lakmé Face Serum Vitamin C",
    description: "Brightening serum for glowing skin — beauty bestseller.",
    image: "https://images.unsplash.com/photo-1620916564550-8b3c4ce6f1c1?w=600&h=600&fit=crop",
    originalPrice: 699,
    dealPrice: 399,
    store: "Ajio",
    featured: false,
    categorySlug: "beauty",
    affiliateLink: "https://www.ajio.com/",
  },
  {
    title: "Smart Watch Fitness Tracker",
    description: "Heart rate, SpO2, sleep tracking — affordable smartwatch deal.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
    originalPrice: 4999,
    dealPrice: 1999,
    store: "Amazon",
    featured: true,
    categorySlug: "gadgets",
    affiliateLink: "https://www.amazon.in/",
  },
];

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function seed() {
  await connectDb();

  const adminExists = await Admin.findOne({ email: env.adminEmail });
  if (!adminExists) {
    const hash = await bcrypt.hash(env.adminPassword, 12);
    await Admin.create({
      email: env.adminEmail,
      password: hash,
      name: "Shoppy Admin",
    });
    console.log(`Admin created: ${env.adminEmail}`);
  }

  for (const cat of DEFAULT_CATEGORIES) {
    await Category.findOneAndUpdate(
      { slug: cat.slug },
      { $setOnInsert: cat },
      { upsert: true, new: true }
    );
  }
  console.log("Categories seeded");

  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    const categories = await Category.find().lean();
    const catMap = Object.fromEntries(categories.map((c) => [c.slug, c._id]));

    for (const p of SAMPLE_PRODUCTS) {
      const discount = Math.round(
        ((p.originalPrice - p.dealPrice) / p.originalPrice) * 100
      );
      await Product.create({
        title: p.title,
        slug: slugify(p.title),
        description: p.description,
        image: p.image,
        originalPrice: p.originalPrice,
        dealPrice: p.dealPrice,
        discount,
        affiliateLink: p.affiliateLink,
        category: catMap[p.categorySlug],
        store: p.store,
        featured: p.featured,
      });
    }
    console.log("Sample products seeded");
  }

  console.log("Seed complete");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
