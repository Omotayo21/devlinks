const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const resetPasswordRoutes = require("./routes/resetpasswordRoute");
const forgotPasswordRoutes = require("./routes/forgotpasswordRoute");
const verifyMailRoutes = require("./routes/verifymailRoute");
const logoutRoutes = require("./routes/logoutRoute");

const loginRoutes = require("./routes/loginRoute")
const signupRoutes = require("./routes/signupRoute")
const meRoutes = require("./routes/meRoute");
const  profileRoutes  = require("./routes/profileRoute");
const linksRoutes = require("./routes/linksRoute");
const app = express();
app.use(cors({
 
}))
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use("/api/user", meRoutes); 
app.use("/api/login", loginRoutes) 
app.use("/api/signup", signupRoutes)
app.use("/api/resetpassword", resetPasswordRoutes);
app.use("/api/forgotpassword", forgotPasswordRoutes);
app.use("/api/verify", verifyMailRoutes);
app.use("/api/profile", profileRoutes)
app.use("/api/links", linksRoutes)

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

const uri =
  "mongodb+srv://Rahman:omotayo112@cluster0.uccinz3.mongodb.net/devlinks?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB database connection established successfully");
    app.listen(port,  () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err) => console.error("Could not connect to MongoDB...", err));
