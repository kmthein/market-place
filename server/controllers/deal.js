const Deal = require("../models/deal");

exports.savedNewDeal = async (req, res) => {
    const { message, phone, product_id, seller_id, dealer_id } = req.body;
    try {
        await Deal.create({
            product_id,
            seller_id,
            dealer_id,
            message,
            phone
        });
        return res.status(200).json({
            success: true,
            message: "Your deal was successfully sent."
        })
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
          });
    }
}

exports.getAllDealsById = async (req, res) => {
    const { id } = req.params;
    try {
        const dealDocs= await Deal.find({ product_id: id }).populate("dealer_id", "name email");
        if(!dealDocs) {
            throw new Error("No deal made yet.");
        }
        return res.status(200).json({
            success: true,
            data: dealDocs  
        })
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
          });
    }
} 