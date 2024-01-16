const express = require("express");
const { body } = require("express-validator");

const authMiddleware = require("../middlewares/auth");

const productController = require("../controllers/product");

const router = express.Router();

router.post("/create-product", [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("name is required."),
    body("description")
        .trim()
        .notEmpty()
        .withMessage("description is required."),
    body("price")
        .trim()
        .notEmpty()
        .withMessage("price is required."),
    body("category")
        .trim()
        .notEmpty()
        .withMessage("category is required."),
    body("used_for")
        .trim()
        .notEmpty()
        .withMessage("product used time is required."),
], authMiddleware, productController.sellProduct);

router.get("/products", authMiddleware, productController.getProducts);

module.exports = router;