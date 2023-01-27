
const bcrypt = require("bcrypt");
const User = require("../models/User");
const passwordValidation = require("../validation/password") 



exports.update = (req, res) => {
    const {password} = req.body;

    if(req.body.userId == req.params.id){

        if (!passwordValidation.validator(password)) {
            res.status(400).send({ msg: "Incorrect parameters", password: passwordValidation.errMessage });
            return;
        } 

        bcrypt.hash(password,12).then(password => {
            User.findByIdAndUpdate(req.params.id,{password : password} ,(err,data) =>{
             if(err)
             res.status(500).send({ error: 'Error while updating password' }) })
             res.status(200).send({ message: 'User Password Updated ' })

            })
        }
       
    else {
        res.status(401).json("Login into your account to change password");
    }
}

exports.display = (req,res) => {
 
    User.findOne({username : req.params.username},(err,data)=>{
        if(err)
        res.status(500).send({ error: "User doesn't Exist " });
        
        const {password,username ,...info} = data; 
        console.log(data.token);
        res.status(200).json(data);
    })
}