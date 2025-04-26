const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  name: String,
  baseUrl: String,
  username: String,
  logo: String,
  color: String,
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  profilePicture: String,
  links: [linkSchema],
  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});
 

const User = mongoose.models.users || mongoose.model("users", userSchema);

module.exports = User;