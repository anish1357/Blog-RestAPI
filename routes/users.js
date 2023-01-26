const express = require("express");
const router = express.Router();
const userController = require("../controller/userController")


router.route("/:id").get(userController.display);
router.route("/:id").put(userController.update);





module.exports = router;