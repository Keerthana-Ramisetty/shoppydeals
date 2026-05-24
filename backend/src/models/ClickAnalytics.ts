import mongoose, { Schema, type Document, type Model, Types } from "mongoose";

export interface IClickAnalytics extends Document {
  product: Types.ObjectId;
  productTitle: string;
  store: string;
  category: Types.ObjectId;
  userAgent?: string;
  referer?: string;
  createdAt: Date;
}

const clickAnalyticsSchema = new Schema<IClickAnalytics>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    productTitle: { type: String, required: true },
    store: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    userAgent: { type: String },
    referer: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

clickAnalyticsSchema.index({ createdAt: -1 });
clickAnalyticsSchema.index({ product: 1, createdAt: -1 });

export const ClickAnalytics: Model<IClickAnalytics> =
  mongoose.models.ClickAnalytics ||
  mongoose.model<IClickAnalytics>("ClickAnalytics", clickAnalyticsSchema);
