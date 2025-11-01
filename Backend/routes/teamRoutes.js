// routes/teamRoutes.js
const express = require("express");
const router = express.Router();

const {
  getTeam,
  addTeamMember,
  deleteTeamMember,
} = require("../controllers/teamController");

const auth = require("../middleware/authMiddleware");

router.get("/", getTeam);
router.post("/", auth, addTeamMember);
router.delete("/:id", auth, deleteTeamMember);

module.exports = router;
