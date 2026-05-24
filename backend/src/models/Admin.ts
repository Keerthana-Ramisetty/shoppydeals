import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

const adminSchema = new Schema<IAdmin>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, default: "Admin" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", adminSchema);
