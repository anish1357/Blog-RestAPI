const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const passwordValidation = require("../validation/password") 
const emailValidation = require("../validation/email")
const usernameValidation = require("../validation/username")
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
.then(result =>res.status(200).send({ message: 'User saved successfully' }))
.catch(err => res.status(500).send({ error: 'Error saving user to database' }))
}

