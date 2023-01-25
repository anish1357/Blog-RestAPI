const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser :true,useUnifiedTopology:true})
.then(console.log("Connected to MongoDB")).catch(err => console.log(err));
app.get("/", (req,res)=>{
    console.log("HI");
})
app.listen("5000",()=>{
 console.log("server running on port 5000");
})