const Blog = require("../models/Blog");

exports.display = (req, res) => {
  const limitPerPage = req.query.limit ?? 10;
  const pageNo = req.query.page;
  if (pageNo) {
    Blog.find()
      .limit(limitPerPage)
      .skip(limitPerPage * eval(pageNo - 1))
      .then((blogs) => {
        console.log(blogs.length);
        if (blogs.length) res.status(200).send(blogs);
        else res.status(400).send({ error: "Not enough blogs to display " });
      })
      .catch((err) => res.status(401).send({ error: "Blogs not available" }));
  } else {
    Blog.find()
      .limit(limitPerPage)
      .then((blogs) => {
        res.status(200).send(blogs);
      })
      .catch((err) => res.status(401).send({ error: "Blogs not available" }));
  }
};
