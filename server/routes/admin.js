const router = require("express").Router();

const authMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/isAdmin");

const adminController = require("../controllers/admin");

router.get("/admin/products", authMiddleware, adminMiddleware, adminController.getAllProducts);

module.exports = router;