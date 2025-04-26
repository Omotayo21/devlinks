const User = require("../models/userModel");

exports.profileUpdate = async (req, res) => {
  try {
    const { userId, firstName, lastName, profilePhoto } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update basic profile info
    user.firstName = firstName;
    user.lastName = lastName;

    // Only update profile photo if it was provided in the request
    if (profilePhoto) {
      // Basic validation for Base64 string
      if (profilePhoto.startsWith("data:image")) {
        user.profilePicture = profilePhoto;
      } else {
        return res.status(400).json({ error: "Invalid image format" });
      }
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.profileInfo = async (req, res) => {
  try {
    const { userId} = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
   
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
