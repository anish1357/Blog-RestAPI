const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const auth = require("../middleware/auth");

router.route("/:username").get(auth, userController.display);
router.route("/:id").put(auth, userController.update);

module.exports = router;
