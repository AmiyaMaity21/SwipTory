const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ errorMessage: "Bad request" });
    }
    const isExistingUser = await User.findOne({ username });
    if (isExistingUser) {
      return res.status(409).json({ errorMessage: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(201).json({
      success: true,
      token,
      userId: user._id,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Login User
const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter username and password" });
    }
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ errorMessage: "Please enter valid username and password" });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ errorMessage: "Please enter valid username and password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   strict: true,
    //   secure: true,
    //   sameSite: 'None',
    //   expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    // });
    res.status(201).json({
      success: true,
      token,
      userId: user._id,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Get User Detail
const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res
      .status(200)
      .json({ success: true, username: user.username, userId: user._id, user });
  } catch (error) {
    next(error);
  }
};

// Logout User
const logoutUser = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Successfully Logged Out",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, getUserDetails, logoutUser };
