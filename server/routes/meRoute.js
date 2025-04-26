

const express = require("express");
const { getUserProfile } = require("../controllers/meController");
const { authMiddleware } = require("../authMiddleWare");

const router = express.Router();

// Protected route: Get user profile
router.get("/", getUserProfile);

module.exports = router;
