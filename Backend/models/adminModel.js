// models/adminModel.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
  },
  token: {
    type: String,      // store JWT token (optional)
  },
  lastLogin: {
    type: Date,         // store last login time
  },
});

module.exports = mongoose.model("Admin", adminSchema);
