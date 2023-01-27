const User = require("../models/User");
const Blog = require("../models/Blog");

exports.createBlog = (req, res) => {
  const userId = req.userId;
  const newBlog = new Blog({ ...req.body, userId });
  newBlog.save((err, data) => {
    if (err) res.status(500).send({ error: "Error saving Blog to database" });
    User.findById(userId)
      .then((user) => {
        user.blogs.push(data._id);
        user.save();
      })
      .catch((err) => res.send({ error: "User not found" }));
    res.status(200).send({ message: "Blog saved successfully" });
  });
};

exports.displayBlog = (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      res.status(200).json(blog);
    })
    .catch((err) => res.status(501).send({ error: "Blog not found" }));
};

exports.updateBlog = (req, res) => {
  const { title, desc } = req.body;
  Blog.findById(req.params.id)
    .then((blog) => {
      if (req.userId === blog.userId.toString()) {
        Blog.findByIdAndUpdate(blog.id)
          .then((result) =>
            res.status(200).send({ msg: " Blog updated sucessfully " })
          )
          .catch((err) =>
            res.status(401).send({ error: "Cannot change to the given Title " })
          );
      } else
        res
          .status(400)
          .send({ error: "You dont have access to change this blog" });
    })
    .catch((err) => res.status(501).send({ error: "Blog not found" }));
};

exports.deleteBlog = (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      if (req.userId === blog.userId.toString()) {
        Blog.findByIdAndDelete(blog.id)
          .then((result) =>
            res.status(200).send({ msg: " Blog Deleted sucessfully " })
          )
          .catch((err) => res.status(401).send({ error: "Blog not found" }));
      } else {
        res
          .status(400)
          .send({ error: "You dont have access to delete this blog" });
      }
    })
    .catch((err) => res.status(401).send({ error: "Blog not found" }));
};
