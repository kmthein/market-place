const { validationResult } = require("express-validator");
const {v2: cloudinary} = require('cloudinary');
require("dotenv").config(); 

const Product = require("../models/product");

cloudinary.config({ 
  cloud_name: 'dvos6jlbp', 
  api_key: '941877997462755', 
  api_secret: process.env.CLOUD_SECRET 
});

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
    const productDocs = await Product.find({ seller: req.userId }).sort({createdAt: -1});
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
    if(!productDoc) {
      return res.status(401).json({
        success: false,
        message: "Product not found."
      })
    }
    if(req.userId.toString() != productDoc.seller.toString()) {
      throw new Error("Not Authorized.");
    } 

    if(productDoc.images && Array.isArray(productDoc.images)) {
      const deletePromise = productDoc.images.map((img) => {
        const publicId = img.substring(img.lastIndexOf("/") + 1, img.lastIndexOf("."));
        return new Promise((resolve, reject) => {
          cloudinary.uploader.destroy(publicId, (err, result) => {
            if(err) {
              reject(new Error("Destory Failed."));
            } else {
              resolve(result); 
            }
          })
        })
      })
      await Promise.all(deletePromise);
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

exports.uploadImage = (req, res) => {
  const productId = req.body.product_id;
  const productImages = req.files;
  let secureUrlArray = [];

  try {
    productImages.forEach(img => {
      cloudinary.uploader.upload(img.path, async (err, result) => {
        if(!err) {
          const url = result.secure_url;
          secureUrlArray.push(url);

          if(productImages.length == secureUrlArray.length) {
            await Product.findByIdAndUpdate(productId, {
              $push: { images: secureUrlArray }
            })
            return res.status(200).json({
              success: true,
              message: "Product images saved.",
              secureUrlArray
            })
          }

        } else {
          throw new Error("Cloud upload failed.");
        }
      })
    })
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    })
  }
}

exports.getSavedImages = (req, res) => {
  const {id} = req.params;
  return Product.findById(id).select("images").then((productImg) => {
    return res.status(200).json({
      success: true,
      message: "Product images found.",
      data: productImg
    })   
  }).catch((error) => {
    return res.status(401).json({
      success: false,
      message: error.message
    })
  });
}

exports.deleteSavedImage = async (req, res) => {
  try {
    const { productId, imgToDelete } = req.params;
    const decodeImgUrl = decodeURIComponent(imgToDelete)
    const productDoc = await Product.findByIdAndUpdate(productId, {$pull: {images: decodeImgUrl}});
    const publicId = decodeImgUrl.substring(decodeImgUrl.lastIndexOf("/") + 1, decodeImgUrl.lastIndexOf("."));
    await cloudinary.uploader.destroy(publicId);
    if(productDoc) {
      return res.status(200).json({
        success: true,
        message: "Image removed."
      })    
    } else {
      throw new Error("Image not found.");
    }

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    })
  }
}

exports.getApprovedProducts = async (req, res) => {
  try {
    const productDoc = await Product.find({ status: "approved" });
    if(productDoc) {
      return res.status(200).json({
        success: true,
        data: productDoc
      })  
    } else {
      throw new Error("Product not found.");
    }

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    })
  }
}