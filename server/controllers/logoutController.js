// controllers/userController.js

exports.Logout = async (req, res) => {
  try {
    return res.json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
