const Blog = require("../models/Blog");

/** 
* *Function to display  blogs 
* @param limit no of blogs to be sent in the query
* @param page page number
* @return an array containing blogs  
*/
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
        //! if there are no blogs in current page
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
