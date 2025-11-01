// models/teamMemberModel.js
const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: String,
  post: String,
  image: String,
  experienceTime: String,
  startOfJoining: String,
  growthAreas: String,
  education: String,
  cnic: String,
  achievements: String,
});

module.exports = mongoose.model("TeamMember", teamSchema);
