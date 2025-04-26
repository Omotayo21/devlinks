// helpers/getTokenData.js

const jwt = require("jsonwebtoken");

exports.getTokenData = (req) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Get token after "Bearer"
    if (!token) throw new Error("Token not provided");

    const decodedToken = jwt.verify(token, "Rahman");
    return decodedToken.id;
  } catch (error) {
    throw new Error(error.message);
  }
};
