import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
});

const Admin = mongoose.model("Admin", adminSchema);

async function createAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);
  const hashedPassword = await bcrypt.hash("shoppydeals0327", 10);

  const admin = new Admin({
    email: "admin@gmail.com",
    password: hashedPassword,
    name: "Admin",
  });

  await admin.save();

  console.log("Admin created successfully");

  process.exit();
}

createAdmin();
