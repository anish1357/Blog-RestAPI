const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");
const auth = require("../middleware/auth");

router.route("/").post(auth, blogController.create);
router.route("/").get(blogController.display);
router.route("/:id").put(auth, blogController.update);
router.route("/:id").delete(auth, blogController.delete);

module.exports = router;
