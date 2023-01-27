const bcrypt = require("bcrypt");
const User = require("../models/User");
const passwordValidation = require("../validation/password");

/** 
* *Function to update password of a user 
* *takes password in the request object , hashes it and replaces existing password
* @param id user id of the user 
*/
exports.update = (req, res) => {
  const { password } = req.body;
  if (req.userId.toString() == req.params.id) {
    //! checks for password validation 
    if (!passwordValidation.validator(password)) {
      res.status(400).send({
        msg: "Incorrect parameters",
        password: passwordValidation.errMessage,
      });
      return;
    }

    bcrypt.hash(password, 12).then((password) => {
      User.findByIdAndUpdate(req.params.id, { password: password })
        .then((data) =>
          res.status(200).send({ message: "User Password Updated " })
        )
        .catch((err) =>
          res.status(500).send({ error: "Error while updating password" })
        );
    });
  } else {
    //! if someone tries to change password of other user
    res.status(401).send({error :"Login into your account to change password"});
  }
};

/** 
* *Function to display information  of a user 
* @param username username of the user 
* @return information about the mentioned user
*/
exports.display = (req, res) => {
  User.findOne({ username: req.params.username })
    .then((data) => {
      const { password, ...info } = data._doc;
      res.status(200).json(info);
    })
    .catch((err) => res.status(500).send({ error: "User doesn't Exist " }));
};
