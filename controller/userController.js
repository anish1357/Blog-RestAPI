const bcrypt = require("bcrypt");
const User = require("../models/User");
const passwordValidation = require("../validation/password");

exports.update = (req, res) => {
  const { password } = req.body;
  if (req.userId.toString() == req.params.id) {
    if (!passwordValidation.validator(password)) {
      res
        .status(400)
        .send({
          msg: "Incorrect parameters",
          password: passwordValidation.errMessage,
        });
      return;
    }

    bcrypt.hash(password, 12).then((password) => {
      User.findByIdAndUpdate(
        req.params.id,
        { password: password })
        .then(data => res.status(200).send({ message: "User Password Updated " }))
      .catch(err=>res.status(500).send({ error: "Error while updating password" }))
    });
  
  }
   else {
    res.status(401).json("Login into your account to change password");
  }
};

exports.display = (req, res) => {
  User.findOne({ username: req.params.username }).then(data => {

    const { password, ...info } = data._doc;
    res.status(200).json(info);
  }).catch(err => res.status(500).send({ error: "User doesn't Exist " })) 
};
