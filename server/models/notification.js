const { Schema, model } = require("mongoose");

const notiSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    owner_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    product_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    isRead: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

const notiModel = model("Notification", notiSchema);

module.exports = notiModel;