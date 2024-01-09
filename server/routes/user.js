const { Router } = require("express");
const {body} = require("express-validator");

const authMiddleware = require("../middlewares/auth");

const userControllers = require("../controllers/user");

const router = Router();

router.post("/register", [
    body("name").trim().isLength({min: 3}).withMessage("Name must be at least 3 characters."),
    body("password").trim().isLength({min: 3}).withMessage("Password must be at least 3 characters."),
    body("email").trim().isEmail().withMessage("Pleas enter a valid email."),
], userControllers.register);

router.post("/login", [
    body("password").trim().isLength({min: 3}).withMessage("Password must be at least 3 characters."),
    body("email").trim().isEmail().withMessage("Pleas enter a valid email."),
], userControllers.login);

router.get("/get-current-user", authMiddleware, userControllers.checkCurrentUser);

module.exports = router;
