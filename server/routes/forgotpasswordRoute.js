const express = require("express");
const { forgotPassword } = require("../controllers/forgotpassController.js");

const router = express.Router();

router.post("/", forgotPassword);

module.exports = router;
