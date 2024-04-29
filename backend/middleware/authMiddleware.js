const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticatedUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ errorMessage: "Please Login to access this resource" });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {isAuthenticatedUser};
