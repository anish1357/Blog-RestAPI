
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Blog = require("../models/Blog");
const passwordValidation = require("../validation/password") 



exports.create = (req, res) => {
    const newBlog = new Blog(req.body);

    newBlog.save((err,data) => {
       if(err)
       res.status(500).send({ error: 'Error saving Blog to database' })
       
       
       User.findOne({username:req.body.username})
       .then(user =>{ 
        console.log(typeof data._id )
        console.log(typeof user.blogs )
        user.blogs.push(data._id)
        user.save(); 
    
       })
       .catch(err => res.send({error : "User not found"})) 
       res.status(200).send({ message: 'Blog saved successfully' });

    });

}



exports.display = (req,res) => {
    console.log(req.userId);
    res.json(req.userId);

}