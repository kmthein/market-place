const router = require("express").Router();

const productController = require("../controllers/product");

router.get("/products", productController.getApprovedProducts);

router.get("/products/filter", productController.getProductByFilter);

router.get("/products/detail/:id", productController.getProductDetailById);

module.exports = router;