const express = require("express");
const router = express.Router();

const {
  getTeamMembers,
  addTeamMember,
  deleteTeamMember,
} = require("../controllers/teamMemberController");

const adminAuth = require("../middleware/adminAuth");

// ✅ Public — GET
router.get("/", getTeamMembers);

// ✅ Protected — POST + DELETE
router.post("/", adminAuth, addTeamMember);
router.delete("/:id", adminAuth, deleteTeamMember);

module.exports = router;
