const { Schema, model } = require("mongoose");

const dealSchema = new Schema({
    product_id: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    seller_id: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    dealer_id: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const dealModel = model("Deal", dealSchema);

module.exports = dealModel;