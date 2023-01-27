const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

//* all routes 
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const blogRoute = require("./routes/blogs");
const defaultRoute = require("./routes/default");



app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/blogs", blogRoute);
app.use("/", defaultRoute);


mongoose.set("strictQuery", true);
//* MONGODB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


app.listen("5000", () => {
  console.log("server running on port 5000");
});
