import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

async function resetAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);

  const adminSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
  });

  const Admin = mongoose.model("Admin", adminSchema);

  const hashedPassword = await bcrypt.hash("shoppydeals@0327", 10);

  await Admin.updateOne(
    { email: "admin@gmail.com" },
    {
      $set: {
        email: "admin@gmail.com",
        password: hashedPassword,
        name: "Admin",
      },
    },
    { upsert: true }
  );

  console.log("Admin updated successfully");
  process.exit();
}

resetAdmin();
