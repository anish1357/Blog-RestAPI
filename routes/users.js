const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
//* for authorisation 
const auth = require("../middleware/auth");

//* routes for reseting password and displaying user 
router.route("/:username").get(userController.display);
router.route("/:id").put(auth, userController.update);

module.exports = router;
