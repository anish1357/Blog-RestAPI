const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    blogs: [
      {
          blog_id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Blog'
          }
      }
  ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
