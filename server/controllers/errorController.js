// controllers/errorController.js
const AppError = require("../helpers/AppError");

const errorController = (err, req, res, next) => {
  // Set default error properties
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Send error response
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || "Something went wrong!",
  });
};

module.exports = errorController;
