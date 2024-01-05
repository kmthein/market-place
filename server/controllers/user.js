const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator")
 
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
    if(!useDoc) {
      throw new Error("Email is not found.");
    } else {
      const isMatch = await bcrypt.match(password, userDoc.password);
    }
    if(!isMatch) {
      throw new Error("Wrong email or password.")
    }
  } catch (error) {
    return res.status(409).json({
      success: false,
      message: error.message
    })
  }
}