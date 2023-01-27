const express = require("express");
const router = express.Router();
const defaultController = require("../controller/defaultController");

router.route("/").get(defaultController.display);

module.exports = router;
