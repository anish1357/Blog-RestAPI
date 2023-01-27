const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const passwordValidation = require("../validation/password") 
const emailValidation = require("../validation/email")
const usernameValidation = require("../validation/username")
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
    const {username,email,password} = req.body;

    if(!usernameValidation.validator(username)){
        res.status(400).send({ msg: "Incorrect parameters", username: usernameValidation.errMessage });
        return;
    }
    if(!emailValidation.validator(email)){
        res.status(400).send({ msg: "Incorrect parameters", email: emailValidation.errMessage });
        return;
    }

    if (!passwordValidation.validator(password)) {
        res.status(400).send({ msg: "Incorrect parameters", password: passwordValidation.errMessage });
        return;
    }

    bcrypt.hash(password,12).then(password => {
    const newUser = new User({
      username,
      email,
      password,
    })
    return newUser.save();
})
.then(result => {  
    const token = jwt.sign(
        {
            userId: result._id,
        },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: '24h' },  (err,data)=> {
            if(err)
            res.send({error : "Error in jwt token"});
            result.token = data;
            console.log(result);
        }
    );
     
    res.status(200).send({ message: 'User saved successfully' })
})
.catch(err => res.status(500).send({ error: 'Error saving user to database' }))
}

exports.login = (req,res) => {
    const {username,password} = req.body;
    let loadedUser = null;
    User.findOne({ username: username }).then(
        user => {
            if (!user) {
                return res.status(401).send({ msg: "User with this username does not exist" });
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (loadedUser === null)
                return;
            if (!isEqual) {
                return res.status(401).send({ msg: "Wrong Password" });
            }
            // console.log(loadedUser._id.toString());
            const token = jwt.sign(
                {
                    userId: loadedUser._id.toString()
                },
                process.env.JWT_PRIVATE_KEY,
                { expiresIn: '2h' },
                (err,data)=> {
                    if(err)
                    res.send({error : "Error in jwt token"});
                    loadedUser.token = data;
                    console.log(loadedUser.token);
                }
            );
            res.status(200).json("Login Successful");
        }).catch(err => {
            res.status(500).json("error occured");
        });
}