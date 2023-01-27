
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Blog = require("../models/Blog");
const passwordValidation = require("../validation/password") 



exports.create = (req, res) => {
    const userId = req.userId ;
    const newBlog = new Blog({...req.body, userId});
    newBlog.save((err,data) => {
       if(err)
       res.status(500).send({ error: 'Error saving Blog to database' })
       User.findById(userId)
       .then(user =>{ 
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

exports.update = (req,res) => {
    const {title, desc} =req.body;
    Blog.findById(req.params.id).then(blog =>  {
        Blog.findByIdAndUpdate(blog.id,{title,desc},(err,blog) => {
            if(err)
            res.status(501).send({error :"Cannot change to the given Title "});
            res.status(200).send({msg :" Blog updated sucessfully "});
            
        })
    }).catch(err => res.status(501).send({error : "Blog not found"}))
   
}

exports.delete = (req,res) =>{
    Blog.findByIdAndDelete(req.params.id,(err) => {
        if(err)
        res.status(501).send({error :"Blog not found"});
        res.status(200).send({msg :" Blog Deleted sucessfully "});
        
    })
}