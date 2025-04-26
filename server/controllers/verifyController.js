
//import User from "../../../../models/userModel";
const User = require("../models/userModel.js")




exports.verifyMail = async (req, res) => {
  try {
    
    const { token } = req.body;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.json({ error: "invalid token" }, { status: 400 });
    }
    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    // send verification email

    return res.json({
      message: "Email verified successfully",
      sucess: true,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message }, { status: 500 });
  }
}
