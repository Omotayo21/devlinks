const nodemailer = require ('nodemailer')
const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");



exports.sendEmail = async ({email, emailType, userId}) => {
    try {
        // create a hashed toked
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)
     if(emailType === 'VERIFY') {
 await User.findByIdAndUpdate(userId,
        {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
     } else if(emailType === "RESET"){
         await User.findByIdAndUpdate(userId,
        {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
     }

     var transporter = nodemailer.createTransport({
       service: "gmail",

       auth: {
         user: process.env.NODEMAILER_MAIL,
         pass: process.env.NODEMAILER_PASS,
       },
     });
   //add credentials to environmentfile later
    const mainMessage =
      emailType === "VERIFY"
        ? "To complete your registration, please click on the button below to verify your email address:"
        : "To reset your password, please click on the button below:";

    const buttonLabel =
      emailType === "VERIFY" ? "Verify Email Address" : "Reset Password";

    const alternativeMessage =
      emailType === "VERIFY"
        ? "Alternatively, you can copy and paste the following link into your browser to verify your email:"
        : "Alternatively, you can copy and paste the following link into your browser to reset your password:";

   const mailOptions = {
     from: "Rahman devlinks",
     to: email,
     subject:
       emailType === "VERIFY"
         ? "Welcome to devlinks, pls verify your email"
         : "Reset your password",
     html: `<p> 
 <div style="background-color: #fafafa; padding: 20px; border-radius: 10px;">
    <h1 style="color: #633cff; margin-bottom: 20px;">${
      emailType === "VERIFY"
        ? "Welcome to Rahman's Devlinks"
        : "Reset Your Password"
    }</h1>
    <p style="color: #737373; margin-bottom: 15px;">Greetings from Devlinks! </p>
    <p style="color: #737373; margin-bottom: 15px;">${mainMessage}</p>
    <p style="text-align: center; margin-bottom: 20px;"><a href="https://rahman-devlinks.vercel.app/${
      emailType === "VERIFY" ? "verifyEmail" : "resetpassword"
    }?token=${hashedToken}" style="background-color: #633cff; color: #fafafa; padding: 10px 20px; border-radius: 5px; text-decoration: none;">${buttonLabel}</a></p>
    <p style="color: #737373; margin-bottom: 15px;">Alternatively, you can copy and paste the following link into your browser:</p>
    <p style="color: #737373; margin-bottom: 15px;"> https://rahman-devlinks.vercel.app/${
      emailType === "VERIFY" ? "verifyEmail" : "resetpassword"
    }?
     token=${hashedToken}</p>
    
  </div>
    </p>`,
   };
const mailResponse = await transporter.sendMail(mailOptions)
return mailResponse;  
} catch (error) {
      throw new Error(error.message)  
    }
}