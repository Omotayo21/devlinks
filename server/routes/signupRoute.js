// routes/authRoutes.js

const express = require("express");
const { registerUser } = require("../controllers/signupController");

const router = express.Router();

// Route for user registration
router.post("/", registerUser);

module.exports = router;
