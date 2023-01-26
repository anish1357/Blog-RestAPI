const express = require("express");
const router = express.Router();
const userController = require("../controller/userController")

router.route("/:id").put(userController.update);
router.route("/:id").put(userController.delete);




module.exports = router;