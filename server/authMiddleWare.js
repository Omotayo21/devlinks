const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "Rahman");
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};
