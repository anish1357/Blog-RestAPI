const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController")
const auth = require("../middleware/auth")

router.route("/").post(auth,blogController.create);
router.route("/").get(auth,blogController.display);
// router.route("/").delete(blogController.delete);





module.exports = router;