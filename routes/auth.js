const express = require("express");
const router = express.Router();
//* contains all logic for authentication
const authController = require("../controller/authController");

//* routes for authentication of the user
router.route("/register").post(authController.registerUser);
router.route("/login").post(authController.loginUser);

module.exports = router;
