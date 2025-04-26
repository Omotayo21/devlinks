

// controllers/userController.js

const User = require("../models/userModel");
const { getTokenData } = require("../helpers/getTokenData");

// GET: Retrieve user data
exports.getUserProfile = async (req, res) => {
  try {
    const userId = await getTokenData(req);
    const user = await User.findOne({ _id: userId }).select("-password");

    res.json({
      message: "User found",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
