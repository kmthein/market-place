const { Schema, model, SchemaType } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    used_for: {
      type: String,
      required: true,
    },
    product_has: {
      type: Array,
    },
    images: {
      type: [String]
    },
    status: {
      type: String,
      default: "pending",
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = model("Product", productSchema);

module.exports = productModel;
