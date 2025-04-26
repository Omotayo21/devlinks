// routes/authRoutes.js

const express = require("express");
const { loginUser } = require("../controllers/loginController");

const router = express.Router();

// Route for logging in
router.post("/", loginUser);

module.exports = router;
