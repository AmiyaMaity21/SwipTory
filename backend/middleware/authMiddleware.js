const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticatedUser = async (req, res, next) => {
  try {
    // const token = req.cookies.token;
    // const token = req.header("Authorization");
    const authHeader = req.header("Authorization").split(" ");
    const token = authHeader[1];
    
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

module.exports = { isAuthenticatedUser };
