const User = require("../models/userModel");

// Get all links for a user
exports.getLinks = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.links);
  } catch (error) {
    console.error("Error fetching links:", error);
    res.status(500).json({ error: error.message });
  }
};

// Add a new link (without duplicate checking)
exports.addLink = async (req, res) => {
  try {
    const { userId, linkItems } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Simply add the new link (no duplicate checking)
    user.links.push(linkItems);
    await user.save();

    res.json(user.links);
  } catch (error) {
    console.error("Error adding link:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update all links at once (for bulk operations)
// In your linkController.js
exports.updateLinks = async (req, res) => {
  try {
    const { userId, links } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Replace all links
    user.links = links;
    await user.save();

    res.json(user.links);
  } catch (error) {
    console.error("Error updating links:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific link by its index/ID
exports.deleteLink = async (req, res) => {
  try {
    const { userId, linkId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the link by its _id (MongoDB automatically adds this)
    user.links = user.links.filter((link) => link._id.toString() !== linkId);
    await user.save();

    res.json(user.links);
  } catch (error) {
    console.error("Error deleting link:", error);
    res.status(500).json({ error: error.message });
  }
};
