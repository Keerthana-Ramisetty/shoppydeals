import mongoose from "mongoose";
import bcrypt from "bcryptjs";

async function createAdmin() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect("mongodb+srv://shoppydeals:admin123@cluster0.mzzgpaj.mongodb.net/shoppydeals?appName=Cluster0");

    // 2. Define schema
    const adminSchema = new mongoose.Schema(
      {
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        name: { type: String, default: "Admin" },
      },
      { timestamps: true }
    );

    const Admin =
      mongoose.models.Admin || mongoose.model("Admin", adminSchema);

    // 3. Hash password
    const hashedPassword = await bcrypt.hash("shoppydeals@0327", 10);

    // 4. Check if admin already exists
    const existing = await Admin.findOne({ email: "admin@gmail.com" });

    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    // 5. Create admin
    await Admin.create({
      email: "admin@gmail.com",
      password: hashedPassword,
      name: "Admin",
    });

    console.log("Admin created successfully");
    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();
