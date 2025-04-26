const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");


exports.resetPassword = async (req, res) => {
  try {
  
    const { token, newpassword } = req.body;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.json({ error: "user not found" }, { status: 400 });
    }
    const salt = await bcryptjs.genSalt(10);
    const newHashedPassword = await bcryptjs.hash(newpassword, salt);
    console.log(user);

    user.password = newHashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return res.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error) {
    return res.json({ error: error.message }, { status: 500 });
  }
}
