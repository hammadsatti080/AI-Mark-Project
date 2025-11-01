const TeamMember = require("../models/teamMemberModel");

// ✅ Get All
exports.getTeamMembers = async (req, res) => {
  const data = await TeamMember.find();
  res.json(data);
};

// ✅ Add New
exports.addTeamMember = async (req, res) => {
  try {
    const newMember = new TeamMember(req.body);
    await newMember.save();
    res.json(newMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Delete
exports.deleteTeamMember = async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: "Member deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
