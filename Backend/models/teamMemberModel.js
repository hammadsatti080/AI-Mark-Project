const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  post: { type: String, required: true },
  image: { type: String },
  experienceTime: { type: String, required: true },
  startOfJoining: { type: String, required: true },
  growthAreas: { type: String },
  education: { type: String, required: true },
  cnic: { type: String, required: true },
  achievements: { type: String },
});

module.exports = mongoose.model("TeamMember", teamMemberSchema);
