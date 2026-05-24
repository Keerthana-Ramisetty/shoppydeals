import mongoose, { Schema, type Document, type Model, Types } from "mongoose";

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  image: string;
  originalPrice: number;
  dealPrice: number;
  discount: number;
  affiliateLink: string;
  category: Types.ObjectId;
  store: string;
  featured: boolean;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    image: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    dealPrice: { type: Number, required: true },
    discount: { type: Number, required: true },
    affiliateLink: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    store: { type: String, required: true },
    featured: { type: Boolean, default: false },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.index({ title: "text", description: "text" });
productSchema.index({ category: 1, createdAt: -1 });
productSchema.index({ featured: 1, createdAt: -1 });

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);
