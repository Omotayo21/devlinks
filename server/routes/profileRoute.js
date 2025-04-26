

const express = require("express");
const { profileUpdate } = require("../controllers/profileController");
const { profileInfo } = require("../controllers/profileController");
const router = express.Router();

// Route for logging in
router.post("/", profileUpdate);
router.post("/info", profileInfo);

module.exports = router;
