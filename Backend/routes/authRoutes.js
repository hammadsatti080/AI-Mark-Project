// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { loginAdmin, getAdmin } = require("../controllers/authController");
const authadmin = require("../middleware/authMiddleware");

router.post("/login", loginAdmin);
router.get("/me", authadmin, getAdmin);

module.exports = router;
