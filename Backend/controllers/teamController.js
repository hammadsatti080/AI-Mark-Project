// controllers/teamController.js
const TeamMember = require("../models/teamMemberModel");

exports.getTeam = async (req, res) => {
  try {
    const team = await TeamMember.find();
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: "Error fetching team" });
  }
};

exports.addTeamMember = async (req, res) => {
  try {
    const newMember = await TeamMember.create(req.body);
    res.json(newMember);
  } catch (err) {
    res.status(500).json({ message: "Error adding member" });
  }
};

exports.deleteTeamMember = async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: "Member deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting member" });
  }
};
