const { validationResult } = require("express-validator");

const Product = require("../models/product");

exports.sellProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(409).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }
  const { name, description, price, category, used_for, product_has } =
    req.body;
  try {
    const productDoc = await Product.create({
      name,
      description,
      price,
      category,
      used_for,
      product_has,
      seller: req.userId,
    });
    return res.status(201).json({
      success: true,
      message: "Product is created.",
      productDoc,
    });
  } catch (error) {
    return res.status(422).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const productDocs = await Product.find({ seller: req.userId });
    if (!productDocs) {
      throw new Error("Product Not Found.");
    }
    return res.status(200).json({
      success: true,
      message: "Products found.",
      productDocs,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
