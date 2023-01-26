const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController")


router.route("/").post(blogController.create);
router.route("/").get(blogController.display);
// router.route("/").delete(blogController.delete);





module.exports = router;