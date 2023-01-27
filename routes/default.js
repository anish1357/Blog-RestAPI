const express = require("express");
const router = express.Router();
//* contains logic to display blogs 
const defaultController = require("../controller/defaultController");

//*route for home route
router.route("/").get(defaultController.display);

module.exports = router;
