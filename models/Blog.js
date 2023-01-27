const mongoose = require("mongoose");
/**  
  * *Schema for a single Blog
  * title : title of the blog
  * desc : description of the blog
  * photo : photo attached with blog(not required)
  * userId : owner of the blog (who can modify blogs)
  * timestamps for creation time and last updated time 
  */  
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
