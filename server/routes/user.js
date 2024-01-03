const { Router } = require("express");
const {body} = require("express-validator");

const userControllers = require("../controllers/user");

const router = Router();

router.post("/register", [
    body("name").trim().isLength({min: 3}).withMessage("Name must be at least 3."),
    body("password").trim().isLength({min: 3}).withMessage("Password must be filled."),
    body("email").trim().isEmail().withMessage("Pleas enter a valid email."),
], userControllers.register);

module.exports = router;
