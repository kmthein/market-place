const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken");
require("dotenv").config();
 
const User = require("../models/user");

exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(409).json({
      success: false,
      message: errors.array()[0].msg
    })
  }

  const { name, email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if(userDoc) {
      throw new Error("Email is already existed.")
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name, 
      email,
      password: hashedPassword
    })
    return res.status(201).json({
      success: true,
      message: "User created"
    })
  } catch (error) {
    return res.status(409).json({
      success: false,
      message: error.message
    })
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(409).json({
      success: false,
      message: errors.array()[0].msg
    })
  }
  const { email, password } = req.body; 
  try {
    const userDoc = await User.findOne({email}); 
    if(!userDoc) {
      throw new Error("Email is not found.");
    } else {
      const isMatch = await bcrypt.compare(password, userDoc.password);
      if(!isMatch) {
        throw new Error("Wrong email or password.")
      } else {
        if(userDoc.status == "banned") {
          throw new Error("Your account is banned.");
        }
        const token = jwt.sign({ userId: userDoc._id }, process.env.JWT_KEY);
        return res.status(200).json({
          success: true,
          message: "Logged in successfully.",
          token,
          userDoc
        })
      }
    }
  } catch (error) {
    return res.status(409).json({
      success: false,
      message: error.message
    })
  }
}

exports.checkCurrentUser = async (req, res, next) => {
  try {
    const userDoc = await User.findById(req.userId);
    if(!userDoc) {
      throw new Error("Unauthorized.");
    }
    return res.status(200).json({
      success: true,
      message: "User authorized.",
      userDoc
    })
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    })
  }
}