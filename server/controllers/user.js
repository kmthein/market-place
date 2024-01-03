const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator")
 
const User = require("../models/user");

exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      message: errors.array()[0]
    })
  }

  const { name, email, password } = req.body;
  console.log(req.body);
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
      isSuccess: true,
      message: "User created"
    })

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      isSuccess: false,
      message: error.message
    })
  }
};
