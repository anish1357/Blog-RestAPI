const mongoose = require("mongoose");

/**  
  * *Schema for a single User
  * username : username of the user(unique)
  * email : email id of the user(unique)
  * password : password for the user
  * blogs : array containing id of the blogs created by the current user
  * token : jwt token for authorisation
  * timestamps for creation time and last updated time 
  */  
const userSchema = new mongoose.Schema(
  {
    token: {
      type: String,
    },
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
          ref: "Blog",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
