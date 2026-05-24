import slugifyLib from "slugify";
import { Product } from "../models/Product.js";

export function toSlug(text: string): string {
  return slugifyLib(text, { lower: true, strict: true });
}

export async function uniqueProductSlug(title: string, excludeId?: string): Promise<string> {
  let base = toSlug(title);
  if (!base) base = "product";
  let slug = base;
  let counter = 1;

  while (true) {
    const query: Record<string, unknown> = { slug };
    if (excludeId) query._id = { $ne: excludeId };
    const exists = await Product.findOne(query).select("_id").lean();
    if (!exists) return slug;
    slug = `${base}-${counter}`;
    counter++;
  }
}
