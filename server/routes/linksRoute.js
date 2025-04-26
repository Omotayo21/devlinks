

const express = require("express");
const { addLink, deleteLink, getLinks, updateLinks } = require("../controllers/linksController");

const router = express.Router();

// Route for logging in
router.post("/", addLink);
router.delete("/delete", deleteLink);
//router.get("/", getLinks);
router.put("/", updateLinks);

module.exports = router;