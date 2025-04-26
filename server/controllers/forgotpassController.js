const User = require("../models/userModel");
const { sendEmail } = require("../helpers/mailer");



exports.forgotPassword = async (req, res) => {
   try {
     
     const { email } = req.body;
    
     if (!email) {
       return res.json(
         { error: "pls enter your email please " },
         { status: 400 }
       );
     }
     const user = await User.findOne({ email });
     if (!user) {
       return res.json({ error: "user not found" }, { status: 400 });
     }
     console.log(user);

     const response = await sendEmail({
       email,
       emailType: "RESET",
       userId: user._id,
     });
     return res.json({
       message: "Password reset successfully",
       success: true,
     });
   } catch (error) {
     return res.status(500).json({ error: error.message }, { status: 500 });
   }
};
