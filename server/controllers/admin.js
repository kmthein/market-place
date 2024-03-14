const Product = require("../models/product");
const User = require("../models/user");

exports.getAllProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;

    try {
        const productDocs = await Product.find().populate("seller", "name").sort({createdAt: -1}).skip((page - 1) * perPage).limit(perPage);
        const totalProducts = await Product.find().countDocuments();
        const totalPages = Math.ceil(totalProducts / perPage);
        if(!productDocs) {
            throw new Error("Product not found.");
        }
        return res.status(200).json({
            success: true,
            message: "Products found.",
            data: productDocs,
            totalProducts,
            currentPage: page,
            totalPages
        })        
    } catch (error) {
        return res.status(402).json({
            success: false,
            message: error.message,
        })        
    }
}

exports.productAdminAction = async (req, res) => {
    const {type, productId} = req.params;
    try {
        const productDoc = await Product.findById(productId);
        if(!productDoc) {
            throw new Error("Product not found.")            
        }
            if(type == "approve") {
                productDoc.status = "approved";
            } else if(type == "reject") {
                productDoc.status = "rejected";
            } else {
                productDoc.status = "pending";
            }
            productDoc.save();
            return res.status(200).json({
                success: true,
                message: `Product is ${type}.`
            })
    } catch (error) {
        return res.status(402).json({
            success: false,
            message: error.message,
        })  
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const userDoc = await User.find().select("id name email role createdAt status").sort({createdAt: -1});
        if(!userDoc) {
            throw new Error("Users not found.");
        }
        return res.status(200).json({
            success: true,
            message: "Users found.",
            data: userDoc
        })
    } catch (error) {
        return res.status(402).json({
            success: false,
            message: error.message,
        })  
    }
}

exports.userAdminAction = async (req, res) => {
    const { type, userId } = req.params;
    try {
        const userDoc = await User.findById(userId).sort({createdAt: -1});
        if(!userDoc) {
            throw new Error("User not found.");
        }
            if(type == "ban") {
                userDoc.status = "banned";
            } else {
                userDoc.status = "active";
            }
            await userDoc.save();
        return res.status(200).json({
            success: true,
            message: `User is ${type}.`
        })
    } catch (error) {
        return res.status(402).json({
            success: false,
            message: error.message,
        })  
    }
}