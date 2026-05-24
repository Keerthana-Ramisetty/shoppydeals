import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  icon: string;
  order: number;
  createdAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    icon: { type: String, default: "📦" },
    order: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Category: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", categorySchema);
