const router = require("express").Router();

const productController = require("../controllers/product");

router.get("/products", productController.getApprovedProducts);

module.exports = router;