
const express = require("express");
const { body } = require("express-validator");

const authMiddleware = require("../middlewares/auth");

const productController = require("../controllers/product");
const dealController = require("../controllers/deal");
const notificationController = require("../controllers/notification");

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

router.get("/products/:id", authMiddleware, productController.getProductDetail);

router.post("/update-product", authMiddleware, productController.updateProduct);

router.delete("/delete/:id", authMiddleware, productController.deleteProduct);

router.post("/upload", authMiddleware, productController.uploadImage);

router.get("/get-images/:id", authMiddleware, productController.getSavedImages);

router.delete("/product/delete/:productId/:imgToDelete", authMiddleware, productController.deleteSavedImage);

router.post("/save-product/:id", authMiddleware, productController.saveProduct);

router.post("/unsave-product/:id", authMiddleware, productController.unsaveProduct);

router.get("/save-product", authMiddleware, productController.getSavedProducts);

router.post("/add-deal", authMiddleware, dealController.savedNewDeal);

router.get("/get-deals/:id", authMiddleware, dealController.getAllDealsById);

router.post("/notify", authMiddleware, notificationController.pushNotification);

router.get("/get-notification", authMiddleware, notificationController.getAllNotifications);

router.get("/noti-read/:id", authMiddleware, notificationController.notiReadUpdate);

router.get("/noti-count", authMiddleware, notificationController.getUnreadNotiCount);

router.get("/delete-noti/:id", authMiddleware, notificationController.deleteNotiById);

router.get("/delete/all-noti", authMiddleware, notificationController.deleteAllNoti);

module.exports = router;