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

exports.getProductDetail = async (req, res) => {
  const {id} = req.params;
  try {
    const productDoc = await Product.findById(id);
    return res.status(200).json({
      success: true,
      message: "Product details found.",
      productDoc
    })
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
}

exports.updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(409).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }
  const {_id, sellerId, name, description, price, category, used_for, product_has} = req.body;
  try {
    if(req.userId.toString() != sellerId) {
      throw new Error("Authorization failed.");
    } else {
      const productDoc = await Product.findOne({_id});
      productDoc.name = name;
      productDoc.description= description;
      productDoc.price = price;
      productDoc.category = category;
      productDoc.used_for = used_for;
      productDoc.product_has = product_has;
      productDoc.status = "pending";
      productDoc.save();
      return res.status(201).json({
        success: true,
        message: "Product updated."
      })
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
}

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productDoc = await Product.findOne({ _id: id });
    console.log(req.userId.toString());
    console.log(productDoc.seller.toString());
    if(req.userId.toString() != productDoc.seller.toString()) {
      throw new Error("Not Authorized.");
    } 
    await Product.findByIdAndDelete(id);
    return res.status(202).json({
      success: true,
      message: "Product deleted."
    })
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    })
    
  }
}