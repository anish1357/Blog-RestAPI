const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const blogRoute = require("./routes/blogs");
const defaultRoute = require("./routes/default");
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Blog = require("./models/Blog");

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/blogs", blogRoute);
app.use("/", defaultRoute);
dotenv.config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
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
