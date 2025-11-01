const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/adminModel"); // admin model ka path

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => { console.error(err); process.exit(1); });

const createAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: "admin@wowlahir.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    const admin = new Admin({
      email: "admin@gmail.com",
      password: "admin123", // plain text for now
      role: "admin"
    });

    await admin.save();
    console.log("✅ Admin user created successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
