const express = require("express");
const router = express.Router();

//* contains all logics associated with blogs 
const blogController = require("../controller/blogController");
//* provides authorisation to protected resources
const auth = require("../middleware/auth");

//*routes to create, display, update, delete blogs(requires authentication) 
router.route("/").post(auth, blogController.createBlog);
router.route("/:id").get(blogController.displayBlog);
router.route("/:id").put(auth, blogController.updateBlog);
router.route("/:id").delete(auth, blogController.deleteBlog);

module.exports = router;
