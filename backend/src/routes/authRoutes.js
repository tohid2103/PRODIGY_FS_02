const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin, updateProfile } = require("../controllers/authController");
const { loginValidationRules, handleValidationErrors } = require("../middleware/validate");
const { protect } = require("../middleware/auth");

router.post("/register", registerAdmin);
router.post("/login", loginValidationRules, handleValidationErrors, loginAdmin);
router.put("/profile", protect, updateProfile);

module.exports = router;