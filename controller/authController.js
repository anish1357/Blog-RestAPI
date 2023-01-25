const express = require("express");

const User = require("../models/User");


exports.register = (req, res) => {
    const user = req.body;
    console.log(user);
    const newUser = new User({
      username:req.body.username,
      email:req.body.email,
      password:req.body.password,
    })
    newUser.save( (err,data) => {
        if (err) {
            
            return res.status(500).send({ error: 'Error saving user to database' });
        }
        res.status(200).send({ message: 'User saved successfully' });
    });
}