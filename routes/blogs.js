const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");
const auth = require("../middleware/auth");

router.route("/").post(auth, blogController.createBlog);
router.route("/:id").get(blogController.displayBlog);
router.route("/:id").put(auth, blogController.updateBlog);
router.route("/:id").delete(auth, blogController.deleteBlog);

module.exports = router;
