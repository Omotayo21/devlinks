const express = require("express");
const {
 verifyMail
} = require("../controllers/verifyController.js");

const router = express.Router();

router.post("/", verifyMail);


module.exports = router;
