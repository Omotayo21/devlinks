// controllers/authController.js

const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST: User login


exports.loginUser = async (req, res) => {
 // TOKEN_SECRET: "Rahman"
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }

    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Create token data
    const tokenData = {
      id: user.id,
    
      email: user.email,
    };

    // Create JWT token
    const token = jwt.sign(tokenData, "Rahman", {
      expiresIn: "1d",
    });

    // Send response with token in httpOnly cookie
    res.cookie("token", token, {
     httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({
      message: "Login successful",
      success: true,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error)
  }
};
