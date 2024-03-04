const Product = require("../models/product");

exports.getAllProducts = async (req, res) => {
    try {
        const productDocs = await Product.find().populate("seller", "name");
        if(!productDocs) {
            throw new Error("Product not found.");
        }
        return res.status(200).json({
            success: true,
            message: "Products found.",
            data: productDocs
        })        
    } catch (error) {
        return res.status(402).json({
            success: false,
            message: error.message,
        })        
    }

}