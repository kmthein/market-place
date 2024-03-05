const router = require("express").Router();

const authMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/isAdmin");

const adminController = require("../controllers/admin");

router.get("/admin/products", authMiddleware, adminMiddleware, adminController.getAllProducts);

router.post("/admin-action/:type/:productId", authMiddleware, adminMiddleware, adminController.productAdminAction);

router.get("/admin/users", authMiddleware, adminMiddleware, adminController.getAllUsers);

router.post("/admin/user-action/:type/:userId", authMiddleware, adminMiddleware, adminController.userAdminAction);

module.exports = router;