const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { check } = require("express-validator/check");

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Please enter a valid email"),
    check("password", "Invalid Password").isLength({ min: 1 }),
  ],
  authController.postLogin
);

router.post(
  "/register",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    check("password", "Invalid Password").isLength({ min: 1 }),
  ],
  authController.postRegister
);

module.exports = router;
