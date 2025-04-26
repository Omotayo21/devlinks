const express = require("express");
const {
 Logout
} = require("../controllers/logoutController.js");

const router = express.Router();

router.get("/", Logout );


module.exports = router;
